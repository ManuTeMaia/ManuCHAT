import Block from "./Block";
import renderDOM from "../helpers/renderDOM";
import isEqual from "../helpers/isEqual";

export type ChildrenType =
	{ block: typeof Block; query: string} | undefined;

export type checkAuthType =
	(next: () => void, route: Route | undefined) => void;

class Route {
	pathname: string;
	_blockClass: typeof Block;
	_block: Block | null;
	_rootQuery: string;
	_child: ChildrenType;
	needAuth: boolean;

	constructor(pathname: string, view:  typeof Block , rootQuery: string, child?: ChildrenType, needAuth = false) {
		this.pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._child = child;
		this._rootQuery = rootQuery;
		this.needAuth = needAuth;
	}

	navigate(pathname: string): void {
		if (this.match(pathname)) {
			this.pathname = pathname;
			this.render();
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this.pathname);
	}

	render(): void {
		if (!this._block) {
			this._block = new this._blockClass;
			renderDOM(this._rootQuery, <Block>this._block);
		}
		if (this._child && this._block) {
			const child = this._child;
			this._block = new child.block;
			renderDOM(child.query, <Block>this._block);
		}
		if (this._child && !this._block) {
			this._block = new this._blockClass;
			renderDOM(this._rootQuery, <Block>this._block);
			const child = this._child;
			this._block = new child.block;
			renderDOM(child.query, <Block>this._block);
		}


	}
}

class Router {
	private history: History;
	private routes: Route[];
	private _rootQuery: string;
	needAuth: boolean;
	private static __instance: InstanceType<new () => Router>;
	onCheckAuth: checkAuthType | undefined;

	constructor(rootQuery = ".root") {
		if (Router.__instance) {
			return Router.__instance;
		}
		this.routes = [];
		this.history = window.history;
		this._rootQuery = rootQuery;
		Router.__instance = this;

	}

	use(pathname: string, block: typeof Block, childQuery?: string, child?: ChildrenType, needAuth = false): this {
		const query = childQuery ? childQuery : this._rootQuery;
		const route = new Route(pathname, block, query, child, needAuth);
		this.needAuth = needAuth;
		this.routes.push(route);
		return this;
	}

	start(): void {
		window.onpopstate = async () => {
			this._onRoute(window.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string): void {
		const route = this.getRoute(pathname);
		if (this.onCheckAuth) {
			return this.onCheckAuth(() => {
				if (!route) {
					return;
				}
				route.render();
			}, route);
		}


	}

	go(pathname: string): void {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	checkAuth(func: checkAuthType): this {
		this.onCheckAuth = func;

		return this;
	}

	back(): void {
		this.history.back();
	}

	forward(): void {
		this.history.forward();
	}

	getRoute(pathname: string): Route | undefined {
		return this.routes.find(route => route.match(pathname));
	}
}

export default Router;
export function withRouter(Component: typeof Block): typeof Block {
	return class WithRouter extends Component {
		constructor(props: any) {
			const router = new Router();

			super({...props, router: router});
		}
	};
}
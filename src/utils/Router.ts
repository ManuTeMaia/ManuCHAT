import Block from "./Block";
import renderDOM from "../helpers/renderDOM";

export type ChildrenType =
	{ childBlock: typeof Block; childQuery: string} | undefined;

export type checkAuthType =
	(next: () => void, route: Route | undefined) => void;

class Route {
	pathname: string;
	_blockClass: typeof Block;
	_block: Block | null;
	_rootQuery: string;
	_child: ChildrenType;
	_childBlock: Block | null;
	needAuth: boolean;

	constructor(pathname: string, view:  typeof Block , rootQuery: string, child?: ChildrenType, needAuth = false) {
		this.pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._child = child;
		this._childBlock = null;
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
		const url = new URL(pathname, window.location.origin);
		return url.pathname === this.pathname;
	}

	render(): void {

			this._block = new this._blockClass;
			renderDOM(this._rootQuery, <Block>this._block);

			if (this._child) {
				const child = this._child;
				this._childBlock = new child.childBlock;
				//console.log(this._childBlock);
				renderDOM(child.childQuery, <Block>this._childBlock);
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

	use(pathname: string, block: typeof Block, rootQuery?: string, child?: ChildrenType, needAuth = false): this {
		const query = rootQuery ? rootQuery : this._rootQuery;
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
export function withRouter(Component: typeof Block): any {
	return class WithRouter extends Component {
		constructor(props: any) {
			const router = new Router();
			super({...props, router: router});
		}
	};
}
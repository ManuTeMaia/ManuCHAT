import Block from "./Block";
import renderDOM from "../helpers/renderDOM";
import isEqual from "../helpers/isEqual";

type ChildrenType =
	{ block: { new(): Block }; query: string} | undefined;

class Route {
	_pathname: string;
	_blockClass: new () => Block;
	_block: Block | null;
	_rootQuery: string;
	_child: ChildrenType;

	constructor(pathname: string, view: { new(): Block }, rootQuery: string, child?: ChildrenType) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._child = child;
		this._rootQuery = rootQuery;
	}

	navigate(pathname: string): void {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this._pathname);
	}

	render(): void {
		if (!this._block) {
			this._block = new this._blockClass;
			renderDOM(this._rootQuery, <Block>this._block);
		}
		if (this._child) {
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
	private static __instance: InstanceType<new () => Router>;

	constructor(rootQuery = ".root") {
		if (Router.__instance) {
			return Router.__instance;
		}
		this.routes = [];
		this.history = window.history;
		this._rootQuery = rootQuery;
		Router.__instance = this;

	}

	use(pathname: string, block: { new(): Block }, childQuery?: string, child?: ChildrenType): this {
		const query = childQuery ? childQuery : this._rootQuery;
		const route = new Route(pathname, block, query, child);
		this.routes.push(route);
		return this;
	}

	start(): void {
		window.onpopstate = event => {
			if (event) {
				this._onRoute((event.currentTarget as Window).location.pathname);
			}
		};
		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string): void {
		const route = this.getRoute(pathname);
		if (!route) {
			return;
		}

		route.render();
	}

	go(pathname: string): void {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
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
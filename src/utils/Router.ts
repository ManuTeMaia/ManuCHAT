import Block from "./Block";
import Route from "./Route";

export type ChildrenType =
	{ pathname: string, block: { new(): Block }; query: string}[] | undefined;

class Router {
	private history: History;
	private routes: Route[];
	private _rootQuery: string;

	constructor(rootQuery = ".root") {
		if (Router.__instance) {
			return Router.__instance;
		}
		this.routes = [];
		this.history = window.history;
		this._rootQuery = rootQuery;
		Router.__instance = this;

	}

	use(pathname: string, block: { new(): Block }, childQuery?: string, children?: ChildrenType): this {
		const query = childQuery ? childQuery : this._rootQuery;
		const route = new Route(pathname, block, query, children);
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
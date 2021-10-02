import Block from "./Block";
import Route from "./Route";

class Router {
	private routes: Route[];
	private history: History;
	private readonly _rootQuery: string;

	constructor(rootQuery = ".root") {

		this.routes = [];
		this.history = window.history;
		this._rootQuery = rootQuery;

	}

	use(pathname: string, block: new () => Block,  parent?: new () => Block ): this {
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});
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
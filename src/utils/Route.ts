import Block from "./Block";
import renderDOM from "../helpers/renderDOM";
import isEqual from "../helpers/isEqual";
import Router, {ChildrenType} from "./Router";


class Route {
	_pathname: string;
	_blockClass: new () => Block;
	_block: Block | null;
	_rootQuery: string;
	_children: ChildrenType;

	constructor(pathname: string, view: { new(): Block }, rootQuery: string, children?: ChildrenType) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._children = children;
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
			console.log("block:", this._rootQuery, this._block);
			renderDOM(this._rootQuery, <Block>this._block);
		}
		if (this._children) {
			Array.from(this._children).forEach(child => {
				console.log(child.block, child.query, child.pathname);
				new Router().use(child.pathname, child.block, child.query);
			});

		}

	}
}

export default Route;
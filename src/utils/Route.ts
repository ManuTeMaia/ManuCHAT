import Block from "./Block";
import renderDOM from "../helpers/renderDOM";
import isEqual from "../helpers/isEqual";

class Route {
	_pathname: string;
	_blockClass: new () => Block;
	_block: Block | null;
	_props: Record<string, string>;

	constructor(pathname: string, view: new () => Block, props:Record<string, string>) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
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
			console.log(this._props.rootQuery, this._block);
			renderDOM(this._props.rootQuery, <Block>this._block);
			return;
		}
		this._block = new this._blockClass;
		console.log("--", this._props.rootQuery, this._block);
		renderDOM(this._props.rootQuery, <Block>this._block);
	}
}

export default Route;
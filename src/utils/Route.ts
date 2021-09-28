import Block from "./Block";

function isEqual(lhs: string, rhs: string): boolean {
	return lhs === rhs;
}

function render(query: string, block: Block): Element {
	const root = document.querySelector(query);

	if(!root) {
		throw new Error("Root not found");
	}

	root.innerHTML = "";

	const newBlock  = block.getContent();
	root.appendChild(newBlock);

	return root;
}

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

	leave(): void {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this._pathname);
	}

	render(): void {
		/*if (!this._block) {
			this._block = new this._blockClass;
			console.log(this._props.rootQuery, this._block);
			render(this._props.rootQuery, <Block>this._block);
			return;
		}*/
		this._block = new this._blockClass;
		console.log("--", this._props.rootQuery, this._block);
		render(this._props.rootQuery, <Block>this._block);
	}
}

export default Route;
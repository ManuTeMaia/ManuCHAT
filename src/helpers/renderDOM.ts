import Block from "../utils/Block";

function renderDOM(query: string, block: Block): Element {
	const root = document.querySelector(query);

	if(!root) {
		throw new Error("Root not found");
	}

	root.innerHTML = "";

	const newBlock  = block.getContent();
	root.appendChild(newBlock);

	return root;
}

export default renderDOM;
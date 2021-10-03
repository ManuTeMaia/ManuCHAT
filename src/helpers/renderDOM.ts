import Block from "../utils/Block";

function renderDOM(query: string, block: Block): Element {
	console.log(query);
	const root = document.querySelector(query);

	if(!root) {
		throw new Error("Root not found");
	}

	root.innerHTML = "";

	const newBlock  = block.getContent();
	root.appendChild(newBlock);
console.log(newBlock);
	return root;
}

export default renderDOM;
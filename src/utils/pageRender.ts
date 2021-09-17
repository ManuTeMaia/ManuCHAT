import Block from "./Block";

function pageRender (query:string, block:Block): Element {
	const root = document.querySelector(query);

	if(!root) {
		throw new Error("Root not found");
	}

	root.innerHTML = "";
	
	const newblock  = block.getContent();
	root.appendChild(newblock);
	
	return root;
}

export default pageRender;
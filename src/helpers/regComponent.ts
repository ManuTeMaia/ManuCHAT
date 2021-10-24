import Block from "../utils/Block";
import Handlebars, { HelperOptions } from "handlebars";

interface BlockConstructable<P = any> {
	new(props: P): Block;
}

function regComponent(Component: BlockConstructable): void {

	Handlebars.registerHelper(Component.name, function ({ hash: { ref, ...hash }, data }: HelperOptions) {

		if (!data.root.children) {
			data.root.children = {};
		}

		if (!data.root.refs) {
			data.root.refs = {};
		}

		const { children, refs } = data.root;

		const component = new Component(hash);

		children[component.id] = component;

		if (ref) {
			refs[ref] = component.getContent();
		}

		return `<div data-id="${component.id}"></div>`;
	});
}

export default regComponent;
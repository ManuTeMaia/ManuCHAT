import Block from "../utils/Block";
import Handlebars, { HelperOptions } from "handlebars";

export interface BlockConstructable<Props = any> {
	new (props: Props): Block<Props>;
	getName: () => string;
}

function regComponent(Component: BlockConstructable): void {

	Handlebars.registerHelper(Component.getName(), function ({ hash: { ref, ...hash }, data }: HelperOptions) {

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
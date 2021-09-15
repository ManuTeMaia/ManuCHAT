import EventBus from "./EventBus";
import { nanoid } from "nanoid";

export default class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	eventBus: () => EventBus;

	_element: HTMLElement;

	_meta: {
		tagName: string;
		props: Record<string, unknown>;
	};

	props: Record<string, unknown>;

	constructor(tagName = "div", props = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
	}

	_registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources(): void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init(): void {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidUpdate(
		oldProps: Record<string, unknown>,
		newProps: Record<string, unknown>,
	): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	componentDidUpdate(
		oldProps: Record<string, unknown>,
		newProps: Record<string, unknown>,
	): boolean {
		// TODO: Правильно сравнить объекты
		return oldProps === newProps || true;
	}

	setProps = (nextProps: unknown): void => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	_addEvents():void {
		const events: Record<string, () => void> = this.props.events;
		if (!events) {
			return;
		}
		Object.entries(events).forEach(([event, listener]) => {
			this._element.addEventListener(event, listener);
		});
	}

	_removeEvents():void {
		const events: Record<string, () => void> = this.props.events;
		if (!events) {
			return;
		}
		Object.entries(events).forEach(([event, listener]) => {
			this._element.removeEventListener(event, listener);
		});
	}

	get element(): HTMLElement | Record<string, unknown>{
		return this._element;
	}

	_render():void{
		this.element.innerHTML = "";
		this._removeEvents();
		this._element.appendChild = this.render();
		this._addEvents();
	}

	render(): DocumentFragment {
    return new DocumentFragment;
  }

	compile(
		template: (hbsTemplate: string) => Record<string, unknown>, context: Record<string, unknown>): DocumentFragment {
		const fragment = document.createElement("template");
		const components: Record<string, Block> = {};
		const id = nanoid(6);

		Object.entries(context).forEach(([key, value]) => {
			if (value instanceof Block) {
				components[id] = value;
				context[key] = `<div id="id-${id}"></div>`;
			}
		});

		fragment.innerHTML = template(context);

		Object.entries(components).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`#id-${id}`);

			stub?.replaceWith(component.render());
		});

		return fragment.content;
	}

	getContent(): HTMLElement | Record<string, unknown> {
		return this.element;
	}

	_makePropsProxy(props: Record<string, unknown>): Record<string, unknown> {
		return new Proxy(props, {
			get(target: Record<string, unknown>, prop: string) {
				if (prop.indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					const value: unknown = target[prop];
					return typeof value === "function"
						? value.bind(target)
						: value;
				}
			},
			set(
				target: Record<string, unknown>,
				prop: string,
				value: unknown,
			): boolean {
				if (prop.indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					target[prop] = value;
					return true;
				}
			},
			deleteProperty(
				target: Record<string, unknown>,
				prop: string,
			): boolean {
				if (prop.indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					delete target[prop];
					return true;
				}
			},
		});
	}

	_createDocumentElement(tagName: string): HTMLElement {
		// Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
		return document.createElement(tagName);
	}
}
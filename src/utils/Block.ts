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
		props: any;
	};
	props: any;
	id =  nanoid(6);

	constructor(tagName = "div", props = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
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

	_componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this._render;
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
		const {events = {}} = this.props;

		if (!events) {
			console.warn("Can't find any event");
			return;
		}
		
		Object.keys(events).forEach(eventName => {
			this._element.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents():void {
		const {events = {}} = this.props;
		
		if (!events) {
			console.warn("Can't find any event");
			return;
		}
		Object.keys(events).forEach(eventName => {
			this._element.removeEventListener(eventName, events[eventName]);
		});
	}

	get element(): HTMLElement {
		return this._element;
	}
	
	compile(tmpl: (ctx: Record<string, unknown>) => string, props: Record<string, unknown>): DocumentFragment {
    
		const fragment = document.createElement("template");
		const components: Record<string, Block> = {};

		Object.entries(props).forEach(([name, value]) => {
			if (value instanceof Block) {
			components[value.id] = value; 
			props[name] = `<div id="id-${value.id}"></div>`;
		}
		});

		fragment.innerHTML = tmpl(props); 
		
		Object.entries(components).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`#id-${id}`);
	
			if(stub) {
				stub.replaceWith(component.render());
			} else {
				return;
			}
		});
		
		return fragment.content;
	}

	_render():void{
		this._removeEvents();
		this._element.innerHTML = "";

		this._element.appendChild(this.render());
		this._addEvents();
	}

	render(): DocumentFragment {
    return new DocumentFragment;
  }


	getContent(): HTMLElement {
		return this.element;
	}

	_makePropsProxy(props: Record<string, unknown>): Record<string, unknown> {
		return new Proxy(props, {
			get(target: Record<string, unknown>, prop: string) {
				if (prop.indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					const value: unknown = target[prop];
					return typeof value === "function"? value.bind(target) : value;
				}
			},
			set(target: Record<string, unknown>,prop: string,value: unknown): boolean {
				if (prop.indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					target[prop] = value;
					return true;
				}
			},
			deleteProperty(target: Record<string, unknown>, prop: string): boolean {
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
		return document.createElement(tagName);
	}
}
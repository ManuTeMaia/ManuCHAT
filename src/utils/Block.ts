import EventBus from "./EventBus";
import { nanoid } from "nanoid";

interface BlockMeta<P = any> {
	props: P;
}
type Events = Values<typeof Block.EVENTS>;

class Block <P = any> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	eventBus: EventBus<Events>;
	protected readonly _meta: BlockMeta;
	protected _element: HTMLElement;
	public props: P | Record<string, unknown>;
	protected state: any = {};

	id = nanoid(6);

	constructor(props?: P) {

		this._meta = {
			props,
		};

		this.getStateFromProps();

		this.props = this._makePropsProxy(props || {} as P);
		this.state = this._makePropsProxy(this.state);

		this.eventBus = new EventBus<Events>();
		this._registerEvents(this.eventBus);

		this.eventBus.emit(Block.EVENTS.INIT, this.props);
	}

	_registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources(): void {
		this._element = this._createDocumentElement("div");
	}

	init(): void {
		this._createResources();
		this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
	}

	protected getStateFromProps(): void {
		this.state = {};
	}

	_componentDidMount(props?: P): void {
		this.componentDidMount(props);
	}

	componentDidMount(props?: P) {
		//
	}

	_componentDidUpdate(oldProps: P, newProps: P): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(_oldProps: P, _newProps: P): boolean {
		return true;
	}

	setProps = (nextProps: P): void => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	setState = (nextState: P): void => {
		if (!nextState) {
			return;
		}

		Object.assign(this.state, nextState);
	};

	_removeEvents(): void {
		const events: Record<string, () => void> = (this.props as any).events;

		if (!events || !this._element) {
			return;
		}


		Object.entries(events).forEach(([event, listener]) => {
			this._element?.removeEventListener(event, listener);
		});
	}

	_addEvents(): void {
		const events: Record<string, () => void> = (this.props as any).events;

		if (!events) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element?.addEventListener(event, listener);
		});
	}

	get element(): Element | null {
		return this._element;
	}
	
	compile(tmpl: (ctx: Record<string, unknown>) => string, props: Record<string, any>): DocumentFragment {
    
		const fragment = document.createElement("template");
		const components: Record<string, Block> = {};

			Object.entries(props).forEach(([name, value]) => {
				if(Array.isArray(value)) {
					value.forEach((obj, i) => {
						if (obj instanceof Block) {
							components[obj.id] = obj;
							props[name][i] = `<div id="id-${obj.id}"></div>`;
						}
					});
				}

				if (value instanceof Block) {
					components[value.id] = value;
					props[name] = `<div id="id-${value.id}"></div>`;
				}
			});

			fragment.innerHTML = tmpl(props);

		Object.entries(components).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`#id-${id}`);
			if(stub) {
				stub.replaceWith(component.getContent());
			} else {
				return;
			}
		});

		return fragment.content;
	}

	_render(): void {
		const fragment = this.render().firstElementChild as HTMLElement;

		this._removeEvents();
		this._element.innerHTML = "";

		this._element = fragment;
		this._addEvents();
	}

	render(): DocumentFragment {
    return new DocumentFragment;
  }


	getContent(): HTMLElement {
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE ) {
					this.eventBus.emit(Block.EVENTS.FLOW_CDM);
				}
			}, 100);
		}

		return <HTMLElement>this._element;
	}

	_makePropsProxy(props: any): any {
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

	hide(): void {
		this.getContent().innerHTML = "";
	}
}

export default Block;
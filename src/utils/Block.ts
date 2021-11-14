import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { nanoid } from "nanoid";
import isEqual from "../helpers/isEqual";

export interface BlockMeta<P = any> {
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
	protected children: {[id: string]: Block} = {};
	protected refs: {[key: string]: HTMLElement} = {};

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
	}

	protected getStateFromProps(): void {
		this.state = {};
	}

	_componentDidMount(props?: P): void {
		this.componentDidMount(props);
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount(props?: P): typeof props{
		return props;
	}

	_componentDidUpdate(oldProps: P, newProps: P): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(oldProps: P, newProps: P): boolean {
		return isEqual(oldProps, newProps);
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

	_compile(): DocumentFragment {
		const fragment = document.createElement("template");
		const template = Handlebars.compile(this.render());

		fragment.innerHTML = template({...this.state, ...this.props, children: this.children, refs: this.refs});

		Object.entries(this.children).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`[data-id="${id}"]`);
			//console.log(stub);
			if (!stub) {
				return;
			}

			stub.replaceWith(component.getContent());
		});

		return fragment.content;
	}

	_render(): void {
		const fragment = this._compile();

		this._removeEvents();
		const newElement = fragment?.firstElementChild;

		this._element?.replaceWith(newElement as HTMLElement);

		this._element = newElement as HTMLElement;
		this._addEvents();
	}

	render(): string {
    return "";
  }

	getContent(): HTMLElement {
		// Хак, чтобы вызвать CDM только после добавления в DOM
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (this.element?.parentNode?.nodeType !==  Node.DOCUMENT_FRAGMENT_NODE ) {
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
			set(target: Record<string, unknown>,prop: string, value: unknown): boolean {
				if (prop.indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					target[prop] = value;
					new EventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
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
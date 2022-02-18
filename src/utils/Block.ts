import EventBus from "./EventBus";
import Handlebars from "handlebars";
import isEqual from "../helpers/isEqual";
import {BlockConstructable} from "../helpers/regComponent";
import { nanoid } from "nanoid";

export type Indexed = { [key: string]: any };

class Block <TProps = any> {

	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	} as const;

	eventBus = new EventBus();
	protected readonly _meta: {props: TProps | undefined};
	protected _element: HTMLElement | undefined;
	public default: BlockConstructable | undefined;
	public props: TProps;
	protected state: Partial<TProps>;
	protected children: {[id: string]: Block<TProps>} = {};
	protected refs: {[key: string]: HTMLElement} = {};

	id = nanoid(6);

	constructor(props?: TProps | undefined) {

		this._meta = {
			props,
		};

		this.getStateFromProps(props);

		this.props = this._makePropsProxy(props || {} as TProps);
		this.state = this._makePropsProxy(this.state);

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

	protected getStateFromProps(props?:TProps): void {
		this.state = {...props};
	}


	_componentDidMount(props: TProps): void {
		this.componentDidMount(props);
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount(props: TProps): typeof props | Promise<Indexed | void | typeof props> {
		return props;
	}

	_componentDidUpdate(oldProps: TProps, newProps: TProps): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
		return isEqual(oldProps, newProps);
	}

	setProps(nextProps: TProps | unknown): void {
			if (!nextProps) {
				return;
			}
			const oldProps = { ...this.props };
			Object.assign(this.props, nextProps);
			this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
	}

	setState(nextState: Partial<TProps>): void {
		if (!nextState) {
			return;
		}

		const oldState = { ...this.state };
		Object.assign(this.props, nextState);
		this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldState, this.state);
	}

	_removeEvents(): void {
		const events: Record<string, () => void> = (this.props as Indexed).events;

		if (!events || !this._element) {
			return;
		}


		Object.entries(events).forEach(([event, listener]) => {
			this._element?.removeEventListener(event, listener);
		});
	}

	_addEvents(): void {
		const events: Record<string, () => void> = (this.props as Indexed).events;

		if (!events) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element?.addEventListener(event, listener);
		});
	}

	get element(): Element | undefined {
		return this._element;
	}

	_compile(): DocumentFragment {
		const fragment = document.createElement("template");
		const template = Handlebars.compile(this.render());

		fragment.innerHTML = template({...this.state, ...this.props, children: this.children, refs: this.refs});

		Object.entries(this.children).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`[data-id="${id}"]`);
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
		return <HTMLElement>this._element;
	}

	_makePropsProxy(props: TProps | any): TProps {
		return new Proxy(props, {
			get(target: Indexed, prop: string) {
				if (prop.toString().indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					const value: unknown = target[prop];
					return typeof value === "function"? value.bind(target) : value;
				}
			},
			set(target: Indexed, prop: string, value: unknown): boolean {
				prop.toString();
				if (prop.toString().indexOf("_") === 0) {
					throw new Error("Нет прав");
				} else {
					target[prop] = value;
					new EventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
					return true;

				}
			},
			deleteProperty(target: Indexed, prop: string): boolean {
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
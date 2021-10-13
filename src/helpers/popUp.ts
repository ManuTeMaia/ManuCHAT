class PopUp {
	el: HTMLDivElement;
	listeners: any;

	constructor() {
		this.el = document.createElement("div");
		this.el.style.position = "absolute";

		this.el.classList.add(this.name);
		document.body.appendChild(this.el);

		this.onHide = this.onHide.bind(this);
		this.listeners =[];
	}

	get name() {
		return "PopUp";
	}

	get indent() {
		return 5;
	}

	delegate(eventName: string, element: HTMLElement, cssSelector: string, callback: (e:  Event) => void) {
		const fn = (event: Event): void => {
			if (!(event.target as HTMLDivElement).matches(cssSelector)) {
				return;
			}
			callback(event);
		};

		element.addEventListener(eventName, fn);
		this.listeners.push({ fn, element, eventName });
		return this;
	}

	onShow = (event: Event) => {
		// Элемент, на который пользователь навёл мышкой
		const sourceEl = event.target as HTMLElement;

		// HTML тултипа задаём из data-аттрибута
		this.el.innerHTML = sourceEl.getAttribute("data-popup") as string;

		// Добавляем класс _active, чтобы отобразить тултип
		this.el.classList.add(`${this.name}_active`);

		const sourceElRect = sourceEl.getBoundingClientRect();
		const elRect = this.el.getBoundingClientRect();

		let top = sourceElRect.bottom + this.indent;
		const left = sourceElRect.left;

		// Если тултип не влезает по высоте, то поднимаем его над элементом
		if (top + elRect.height > document.documentElement.clientHeight) {
			top = sourceElRect.top - elRect.height - this.indent;
		}

		this.el.style.top = `${top + window.scrollY}px`;
		this.el.style.left = `${left + window.scrollX}px`;

	}

	onHide() {
		this.el.classList.remove(`${this.name}_active`);
	}

	attach(root: HTMLElement) {
		this.delegate("mouseover", root, "[data-popup]", this.onShow);
		this.delegate("mouseout", root, "[data-popup]", this.onHide);
	}

	detach() {
		for (const {fn, element, eventName} of this.listeners) {
			element.removeEventListener(eventName, fn);
		}

		this.listeners = [];
	}
}

export default new PopUp();


import Block from "../../utils/Block";
import template from "./error.hbs";
import "./error.pcss";

type ErrorType = {
	letter1st: number;
	letter2nd: number;
	letter3rd: number;
	errMessage: string;
}

class Error404 extends Block <ErrorType> {

	constructor() {
		super();
	}

	render():DocumentFragment {
		return this.compile(template, {
			letter1st: 4,
			letter2nd: 0,
			letter3rd: 4,
			errMessage: "Упс... Здесь ничего нет."
		});
	}
}

class Error500 extends Block <ErrorType> {

	constructor() {
		super();
	}

	render():DocumentFragment {
		return this.compile(template, {
			letter1st: 5,
			letter2nd: 0,
			letter3rd: 0,
			errMessage: "Без паники! Мы уже спешим на помощь."
		});
	}
}

export { Error404, Error500 };
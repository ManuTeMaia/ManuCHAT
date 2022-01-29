import Block from "../../utils/Block";
import "./error.pcss";

export class Error404 extends Block {

	constructor() {
		super();
	}

	static getName(): string {
		return "Error404";
	}

	render(): string {
		//language-hbs
		return `
				<div class="wrapper  error--block">
					<div class="error--block-letter letter-1st">4</div>
					<div class="error--block-letter letter-2nd">0</div>
					<div class="error--block-letter letter-3rd">4</div>
					<h3 class="error--block-message">"Упс! Нет такой страницы."</h3>
					<a href="/chats" class="error--block-link-back">Назад к чатам</a>
				</div>
	`;
	}
}
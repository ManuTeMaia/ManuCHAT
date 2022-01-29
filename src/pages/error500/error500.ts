import Block from "../../utils/Block";
import "../error404/error.pcss";

export class Error500 extends Block {

	constructor() {
		super();
	}

	static getName(): string {
		return "Error500";
	}

	render(): string {
		//language-hbs
		return `
				<div class="wrapper  error--block">
					<div class="error--block-letter letter-1st">5</div>
					<div class="error--block-letter letter-2nd">0</div>
					<div class="error--block-letter letter-3rd">0</div>
					<h3 class="error--block-message">"Без паники! Мы уже спешим на помощь."</h3>
					<a href="/chats" class="error--block-link-back">Назад к чатам</a>
				</div>
	`;
	}

}

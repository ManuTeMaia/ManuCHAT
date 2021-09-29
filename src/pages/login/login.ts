import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import Router from "../../utils/Router";
import submitEmulator from "../../helpers/formActions";
import InputWrapper from "../../modules/inputs-wrapper/inputs-wrapper";
import Button from "../../components/buttons/submit-button";
import Heading from "../../components/headings/headings";
import Link from "../../components/links/links";
import template from "./login.hbs";
import "./login.pcss";

class LoginPage extends Block {
	validator: Validator;
	router: Router;

	constructor() {
		super("div", {
			events: {
				submit: (e: Event) => submitEmulator(e, "/chats"),
			}
		});
		this.validator = new Validator();
		this.router = new Router();
	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
	}

	render(): DocumentFragment {
		const heading = new Heading({
			text: "Вход"
		});

		const login = new InputWrapper({
			label: "Логин",
			name: "login",
			type: "text",
			placeholder: "Имя пользователя",
			validationType: "login",
			required: true,
			events: {
				blur: (e) => this.validate((e.currentTarget as HTMLInputElement)),
			}
		});

		const password = new InputWrapper({
			label: "Пароль",
			name: "password",
			type: "password",
			placeholder: "***********",
			validationType: "password",
			required: true,
			events: {
				blur: (e) => this.validate((e.currentTarget as HTMLInputElement)),
			}
		});

        const submit = new Button({
			class: "form--login-submit",
			name: "login-submit",
			title: "Авторизоваться",
			events: {
				//click: (e) => submitEmulator(e, ".root", "chats")
				}
		});

		const link = new Link({
			url:"",
			class:"form--login-register-link",
			text:"Нет аккаунта?",
			events: {
				click: (e) => {
					e.preventDefault();
					this.router.go("/signup");
					}
				}
		});

		return this.compile(template, {
			heading,
			login,
			password,
			submit,
			link
		});
	}
}

export default LoginPage;
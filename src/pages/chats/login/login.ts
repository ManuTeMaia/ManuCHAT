import Block from "../../../utils/Block";
import pageRender from "../../../helpers/PageRender";
import InputWrapper from  "../../../modules/inputs-wrapper/inputs-wrapper";
import Button from "../../../components/buttons/submit-button";
import Heading from "../../../components/headings/headings";
import Link from "../../../components/links/links";
import template from "./login.hbs";
import "./login.pcss";

class LoginPage extends Block {

	constructor(){
		super("div"); 
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
			validationtype: "login",
			required: true,
			events: {
				focus: () => this.validate(),
				blur: () => this.validate(),
			}
		});
		const password = new InputWrapper({
			label: "Пароль",
			name: "password",
			type: "password",
			placeholder: "***********",
			validationtype: "password",
			required: true,
			events: {
				focus: () => this.validate(),
				blur: () => this.validate(),
			}
		});
        const submit = new Button({
			class: "form--login-submit",
			name: "login-submit",
			title: "Авторизоваться",
			events: {
				click: (e) => this.onSubmit(e)
				}
		});
		const link = new Link({
			url:"",
			class:"form--login-register-link",
			text:"Нет аккаунта?",
			events: {
				click: (e) => {
					e.preventDefault();
					pageRender(".root","registration");
					}
				}
		});

		return this.compile(template, {
			heading:heading,
			login:login,
			password:password,
			submit:submit,
			link:link
		});
    }

	getFormData(): void {
		const data: Record<string, unknown> = {};
		const inputFields = document.querySelectorAll("input");
		inputFields.forEach((input: HTMLInputElement) => data[input.name] = input.value);
		console.log(data);
	}

	onSubmit(e: Event): void {
		e.preventDefault();
		this.validate();
		const hasErrors =  document.querySelectorAll(".invalid").length;
		console.log(hasErrors);
		if(!hasErrors) {
			this.getFormData();
			pageRender(".root","chats");
		}
	}
}

export default LoginPage;
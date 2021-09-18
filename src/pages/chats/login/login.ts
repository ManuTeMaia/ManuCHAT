import Block from "../../../utils/Block";
import pageRender from "../../../utils/pageRender";
import ChatPage from "../chat/chat";
import RegistrationPage from "../register/register";
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
			events: {
				focus: () => console.log("focused"),
			}
		});
		const password = new InputWrapper({
			label: "Пароль",
			name: "password",
			type: "password",
			placeholder: "***********",
			events: {
				focus: () => console.log("focused"),
			}
		});
        const submit = new Button({
			class: "form--login-submit",
			name: "login-submit",
			title: "Авторизоваться",
			events: {
				click: (e) => {
					e.preventDefault();
					pageRender(".root",new ChatPage());
					}
				}
		});
		const link = new Link({
			url:"",
			class:"form--login-register-link",
			text:"Нет аккаунта?",
			events: {
				click: (e) => {
					e.preventDefault();
					pageRender(".root",new RegistrationPage());
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
}

export default LoginPage;
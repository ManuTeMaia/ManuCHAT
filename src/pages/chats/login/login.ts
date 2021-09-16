import Block from "../../../utils/Block";
import TextInput from  "../../../components/inputs/text-input";
import Button from "../../../components/buttons/submit-button";
import Heading from "../../../components/headings/headings";
import template from "./login.hbs";
import "./login.pcss";

class LoginPage extends Block {
	constructor(){
		super("div");
	}
	render(): DocumentFragment {
		const heading = new Heading({
			class: "heading3",
			text: "Вход"
		});
		const login = new TextInput({
			label: "Логин",
			type: "text",
			name: "login",
			placeholder: "Имя пользователя",
			events: {
				focus: () => console.log("focused"),
			}
		});
		const password = new TextInput({
			label: "Пароль",
			type: "password",
			name: "password",
			placeholder: "***********",
		});
        const submit = new Button({
			class: "form--login-submit",
			name: "login-submit",
			title: "Авторизоваться",
			events: {
				click: (e) => {
					e.preventDefault();
					alert("EventClick");
					}
				}
		});
		const somebutton = new Button({
			class: "submit",
			name: "submit",
			title: "eventtest",
			events: {
				click: (e) => {
					e.preventDefault();
					alert("EventClick");
					}
				}
		});

		return this.compile(template, {
			heading:heading,
			somebutton:somebutton,
			login:login,
			password:password,
			submit:submit,

			
		});
    }
}

export default LoginPage;
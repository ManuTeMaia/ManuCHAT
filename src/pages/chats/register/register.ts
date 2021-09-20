import Block from "../../../utils/Block";
import pageRender from "../../../helpers/PageRender";
import ChatPage from "../chat/chat";
import LoginPage from "../login/login";
import InputWrapper from  "../../../modules/inputs-wrapper/inputs-wrapper";
import Button from "../../../components/buttons/submit-button";
import Heading from "../../../components/headings/headings";
import Link from "../../../components/links/links";
import template from "./register.hbs";
import "./register.pcss";

class RegistrationPage extends Block {
	constructor(){
		super("div");
	}
	render(): DocumentFragment {
		const heading = new Heading({
			text: "Регистрация"
		});
		const textInputs = [
			{
				label: "E-mail",
				type: "email",
				name: "email",
				placeholder: "email",
				validationtype: "email",
				required: true
			},
			{
				label: "Логин",
				type: "text",
				name: "login",
				placeholder: "Имя пользователя",
				validationtype: "login",
				required: true
			},
			{
				label: "Имя",
				type: "text",
				name: "first_name",
				placeholder: "Ваше имя",
				validationtype: "name",
				required: true
			},
			{
				label: "Фамилия",
				type: "text",
				name: "second_name",
				placeholder: "Ваша фамилия",
				validationtype: "name",
				required: true
			},
			{
				label: "Телефон",
				type: "tel",
				name: "phone",
				placeholder: "+7 (000)-000-00-00",
				validationtype: "phone",
				required: true
			},
			{
				label: "Пароль",
				type: "password",
				name: "password",
				placeholder: "***********",
				validationtype: "password",
				required: true
			},
			{
				label: "Повторите пароль",
				type: "password",
				name: "repeat-password",
				placeholder: "***********",
				validationtype: "password",
				required: true
			}
		];
		const textinputs = textInputs.map(
			(textinput) => new InputWrapper(textinput)
		);
		
        const submit = new Button({
			class: "form--register-submit",
			name: "registration-submit",
			title: "Зарегистрироваться",
			events: {
				submit: (e) => {
					e.preventDefault();
					pageRender(".root",new ChatPage());
					}
				}
		});
		const link = new Link({
			url:"",
			class:"form--register-login-link",
			text:"Войти",
			events: {
				click: (e) => {
					e.preventDefault();
					pageRender(".root",new LoginPage());
					}
				}
		});
		return this.compile(template, {
			heading:heading,
			textinputs:textinputs,
			submit:submit,
			link:link
		});
    }
}

export default RegistrationPage;

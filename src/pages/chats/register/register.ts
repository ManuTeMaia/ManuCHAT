import Block from "../../../utils/Block";
import pageRender from "../../../utils/pageRender";
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
			class: "heading3",
			text: "Регистрация"
		});
		const textInputs = [
			{
				label: "E-mail",
				type: "email",
				name: "email",
				placeholder: "email",
				required: "reqiured"
			},
			{
				label: "Логин",
				type: "text",
				name: "login",
				placeholder: "Имя пользователя",
				required: "reqiured"
			},
			{
				label: "Имя",
				type: "text",
				name: "first_name",
				placeholder: "Ваше имя",
				required: "reqiured"
			},
			{
				label: "Фамилия",
				type: "text",
				name: "second_name",
				placeholder: "Ваша фамилия",
				required: ""
			},
			{
				label: "Телефон",
				type: "tel",
				name: "phone",
				placeholder: "+7 (000)-000-00-00",
				required: "reqiured"
			},
			{
				label: "Пароль",
				type: "password",
				name: "password",
				placeholder: "***********",
				required: "required"
			},
			{
				label: "Повторите пароль",
				type: "password",
				name: "repeat-password",
				placeholder: "***********",
				required: "required"
			}

		];
		const textInput = textInputs.map(
			(textInput) => new InputWrapper(textInput)
		);
		
        const submit = new Button({
			class: "form--register-submit",
			name: "registration-submit",
			title: "Зарегистрироваться",
			events: {
				click: (e) => {
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
			textinput:textInput,
			submit:submit,
			link:link

			
		});
    }
}

export default RegistrationPage;

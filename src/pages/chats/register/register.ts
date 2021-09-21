import Block from "../../../utils/Block";
import pageRender from "../../../helpers/pageRender";
import submitEmulator from "../../../helpers/formActions";
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
		const textinputs = [
			{
				label: "E-mail",
				type: "email",
				name: "email",
				placeholder: "email",
				validationtype: "email",
				required: true,
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Логин",
				type: "text",
				name: "login",
				placeholder: "Имя пользователя",
				validationtype: "login",
				required: true,
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Имя",
				type: "text",
				name: "first_name",
				placeholder: "Ваше имя",
				validationtype: "name",
				required: true,
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Фамилия",
				type: "text",
				name: "second_name",
				placeholder: "Ваша фамилия",
				validationtype: "name",
				required: true,
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Телефон",
				type: "tel",
				name: "phone",
				placeholder: "+7 (000)-000-00-00",
				validationtype: "phone",
				required: true,
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Пароль",
				type: "password",
				name: "password",
				placeholder: "***********",
				validationtype: "password",
				required: true,
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Повторите пароль",
				type: "password",
				name: "repeat-password",
				placeholder: "***********",
				validationtype: "password",
				required: true,
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			}
		].map(
			(textinput) => new InputWrapper(textinput)
		);
		
        const submit = new Button({
			class: "form--register-submit",
			name: "registration-submit",
			title: "Зарегистрироваться",
			events: {
				click: (e: Event) => submitEmulator(e, ".root", "chats")
				}
		});
		const link = new Link({
			url:"",
			class:"form--register-login-link",
			text:"Уже есть аккаунт",
			events: {
				click: (e: Event) => {
					e.preventDefault();
					pageRender(".root", "login");
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

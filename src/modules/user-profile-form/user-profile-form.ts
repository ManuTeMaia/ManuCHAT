import Block from "../../utils/Block";
import Button from "../../components/buttons/submit-button";
import Heading from "../../components/headings/headings";
import InputWrapper from "../../modules/inputs-wrapper/inputs-wrapper";
import template from "./user-profile-form.hbs";
import "./user-profile-form.pcss";

class ProfileFormPage extends Block {
	constructor(){
		super("div");
	}
	render(): DocumentFragment {
		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: "Изменить данные"
		});

		const formclass = "form--user-profile-info";

		const textinputs = [
			{
				label: "E-mail",
				type: "email",
				name: "email",
				validationtype: "email",
				placeholder: "dragonfly@123.com"
			},
			{
				label: "Логин",
				type: "text",
				name: "login",
				validationtype: "login",
				placeholder: "dragonfly"
			},
			{
				label: "Имя",
				type: "text",
				name: "first_name",
				validationtype: "name",
				placeholder: "Джейн"
			},
			{
				label: "Фамилия",
				type: "text",
				name: "second_name",
				placeholder: "Доу"
			},
			{
				label: "Имя в чате",
				type: "text",
				name: "display_name",
				placeholder: "Джейн Доу"
			},
			{
				label: "Телефон",
				type: "tel",
				name: "phone",
				validationtype: "phone",
				placeholder: "+7 (000)-000-00-00"
			}
		].map((textinput) => new InputWrapper(textinput));
		
		const submit = new Button({
			class: "form--user-profile-info-submit",
			name: "user-profile-info-submit",
			title: "Cохранить"
		});

		return this.compile(template, {
			heading:heading,
			formclass:formclass,
			textinputs:textinputs,
			submit:submit
		});

	}
}

class ProfileFormPasswordPage extends Block {
	constructor(){
		super("div");
	}
	render(): DocumentFragment {
		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: "Изменить пароль"
		});
		
		const formclass = "form--user-profile-password";

		const textinputs = [
			{
				label: "Текущий пароль",
				type: "password",
				name: "current-password",
				placeholder: "***********",
				validationtype: "password",
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
		].map((textinput) => new InputWrapper(textinput));
		
		const submit = new Button({
			class: "form--user-profile-password-submit",
			name: "user-profile-password-submit",
			title: "Изменить"
		});

		return this.compile(template, {
			heading:heading,
			formclass:formclass,
			textinputs:textinputs,
			submit:submit
		});

	}
}

export { ProfileFormPage, ProfileFormPasswordPage };
import Block from "../../utils/Block";
import submitEmulator from "../../helpers/formActions";
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
				placeholder: "dragonfly@123.com",
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Логин",
				type: "text",
				name: "login",
				validationtype: "login",
				placeholder: "dragonfly",
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Имя",
				type: "text",
				name: "first_name",
				validationtype: "name",
				placeholder: "Джейн",
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Фамилия",
				type: "text",
				name: "second_name",
				validationtype: "name",
				placeholder: "Доу",
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Имя в чате",
				type: "text",
				name: "display_name",
				placeholder: "Джейн Доу",
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Телефон",
				type: "tel",
				name: "phone",
				validationtype: "phone",
				placeholder: "+7 (000)-000-00-00",
				events: {
					focus: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			}
		].map((textinput) => new InputWrapper(textinput));
		
		const submit = new Button({
			class: "form--user-profile-info-submit",
			name: "user-profile-info-submit",
			title: "Cохранить",
			events: {
				click: (e) => submitEmulator(e, ".chat--wrap", "profile")
				}
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
		].map((textinput) => new InputWrapper(textinput));
		
		const submit = new Button({
			class: "form--user-profile-password-submit",
			name: "user-profile-password-submit",
			title: "Изменить",
			events: {
				click: (e) => submitEmulator(e, ".chat--wrap", "profile")
				}
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
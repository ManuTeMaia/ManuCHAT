import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import submitEmulator from "../../../helpers/formActions";
import Button from "../../../components/buttons/submit-button";
import Heading from "../../../components/headings/headings";
import InputWrapper from "../../../modules/inputs-wrapper/inputs-wrapper";
import template from "./user-profile-form.hbs";
import "./user-profile-form.pcss";
import Validator from "../../../utils/Validator";

class ProfileFormPage extends Block {
	validator: Validator;
	router: Router;

	constructor() {
		super("div", {
			events: {
				click: (e: Event) => submitEmulator(e, "/settings")
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
			class: "main--page-user-profile user-profile-heading",
			text: "Изменить данные"
		});

		const formClass = "form--user-profile-info";

		const textInputs = [
			{
				label: "E-mail",
				type: "email",
				name: "email",
				validationType: "email",
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
				validationType: "login",
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
				validationType: "name",
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
				validationType: "name",
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
				validationType: "phone",
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
			title: "Cохранить"
		});

		return this.compile(template, {
			heading,
			formClass,
			textInputs,
			submit
		});

	}
}

class ProfileFormPasswordPage extends Block {
	validator: Validator;
	constructor() {
		super("div", {
			events: {
				click: (e: Event) => submitEmulator(e, "/settings")
			}
		});

		this.validator = new Validator();
	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
	}

	render(): DocumentFragment {
		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: "Изменить пароль"
		});
		
		const formClass = "form--user-profile-password";

		const textInputs = [
			{
				label: "Текущий пароль",
				type: "password",
				name: "current-password",
				placeholder: "***********",
				validationType: "password",
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
				validationType: "password",
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
				validationType: "password",
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
			title: "Изменить"
		});

		return this.compile(template, {
			heading,
			formClass,
			textInputs,
			submit
		});

	}
}

export { ProfileFormPage, ProfileFormPasswordPage };
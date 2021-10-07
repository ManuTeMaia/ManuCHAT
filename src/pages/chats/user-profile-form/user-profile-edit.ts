import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import submitEmulator from "../../../helpers/formActions";
import Button from "../../../components/buttons/submit-button";
import Avatar from "../../../components/avatar/avatar";
import Heading from "../../../components/headings/headings";
import InputWrapper from "../../../modules/inputs-wrapper/inputs-wrapper";
import template from "./user-profile-form.hbs";
import "./user-profile-form.pcss";

class ProfileFormPage extends Block {
	validator: Validator;

	constructor() {
		super({
			events: {
				submit: (e: Event) => submitEmulator(e, "/settings")
			}
		});
		this.validator = new Validator();
	}
	
	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
	}
	
	render(): DocumentFragment {
		const avatar = new Avatar({
			divClass: "main--page-user-profile user-profile-avatar",
			imageSrc: "/noimage.png",
			imageTitle: "Avatar",
			events: {
				click: () => alert("Позже тут можно будет загрузить аватар")
			}
		});
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
			avatar,
			heading,
			formClass,
			textInputs,
			submit
		});

	}
}

export default ProfileFormPage;
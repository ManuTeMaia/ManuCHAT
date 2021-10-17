import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import UserController from "../../../controllers/user";
import { getFormData } from "../../../helpers/formActions";
import Button from "../../../components/buttons/submit-button";
import AvatarForm from "../../../modules/avatar-form/avatar-form";
import Heading from "../../../components/headings/headings";
import InputWrapper from "../../../modules/inputs-wrapper/inputs-wrapper";
import template from "../user-profile-form.hbs";
import "../user-profile-form.pcss";

class ProfilePageEdit extends Block {
	validator: Validator;

	constructor(props: any) {
		console.log(props);
		super({
			props,
			events: {
				submit: async (e: Event) => {
					e.preventDefault();
					const data: any = {};
					const refs = getFormData(e.target as HTMLFormElement);
					Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
						data[key] = input;
					});
					const hasErrors = document.querySelector("[error-for]");
					new Validator().formValidate();
					if (!hasErrors) {
						await UserController.update(data);
					}
				}
			}
		});
		this.validator = new Validator();
	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
	}

	render():DocumentFragment {
		const user = this.props.props.user;
		console.log(this.props);
		const avatarForm = new AvatarForm({...this.props});

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
				placeholder: user.profile.email,
				value: user.profile.email,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Логин",
				type: "text",
				name: "login",
				validationType: "login",
				placeholder: user.profile.login,
				value: user.profile.login,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Имя",
				type: "text",
				name: "first_name",
				validationType: "name",
				placeholder: user.profile.first_name,
				value: user.profile.first_name,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Фамилия",
				type: "text",
				name: "second_name",
				validationType: "name",
				placeholder: user.profile.second_name,
				value: user.profile.second_name,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Имя в чате",
				type: "text",
				name: "display_name",
				placeholder: user.profile.display_name,
				value: user.profile.display_name,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Телефон",
				type: "tel",
				name: "phone",
				validationType: "phone",
				placeholder: user.profile.phone,
				value: user.profile.phone,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			}
		].map((textinput) => new InputWrapper(textinput));
		
		const submit = new Button({
			buttonClass: "form--user-profile-info-submit",
			name: "user-profile-info-submit",
			title: "Cохранить"
		});

		return this.compile(template, {
			avatarForm,
			heading,
			formClass,
			textInputs,
			submit
		});

	}
}

export default ProfilePageEdit;
import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import UserController from "../../../controllers/user";
import { getFormData } from "../../../helpers/formActions";
import Button from "../../../components/buttons/submit-button";
import Avatar from "../../../components/avatar/avatar";
import Heading from "../../../components/headings/headings";
import InputWrapper from "../../../modules/inputs-wrapper/inputs-wrapper";
import template from "./user-profile-form.hbs";
import "./user-profile-form.pcss";

class ProfileEditPasswordPage extends Block {
	validator: Validator;
	constructor(props: any) {
		super({ props,
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
						await UserController.changePassword(data);
					}
				}
			}
		});

		this.validator = new Validator();
	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
	}
	componentDidMount(): void {
		if (!this.props.user) {
			this.props.router.go("/");
		}
	}

	componentDidUpdate(): boolean {
		if (!this.props.user) {
			this.props.router.go("/");
		}

		return true;
	}

	render():DocumentFragment {
		const user = this.props.user;
		const avatarSrc = user.profile.avatar || "/noimage.png";
		console.log(user);
		const avatar = new Avatar({
			divClass: "main--page-user-profile user-profile-avatar",
			imageSrc: avatarSrc,
			imageTitle: "Avatar",
			events: {
				click: () => alert("Позже тут можно будет загрузить аватар")
			}
		});
		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: "Изменить пароль"
		});
		
		const formClass = "form--user-profile-password";

		const textInputs = [
			{
				label: "Текущий пароль",
				type: "password",
				name: "oldPassword",
				placeholder: "***********",
				validationType: "password",
				required: true,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Пароль",
				type: "password",
				name: "newPassword",
				placeholder: "***********",
				validationType: "password",
				required: true,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			},
			{
				label: "Повторите пароль",
				type: "password",
				name: "newPasswordRepeat",
				placeholder: "***********",
				validationType: "password",
				required: true,
				events: {
					blur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
				}
			}
		].map((textinput) => new InputWrapper(textinput));
		
		const submit = new Button({
			buttonClass: "form--user-profile-password-submit",
			name: "user-profile-password-submit",
			title: "Изменить"
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

export default ProfileEditPasswordPage;
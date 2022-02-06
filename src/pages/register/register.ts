import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import AuthController from "../../controllers/auth";
import { getFormData } from "../../helpers/formActions";
import "./register.pcss";
import {HeadingType} from "../../components/elements/heading/heading";
import {InputWrapperType} from "../../components/modules/input-wrapper/input-wrapper";
import {ButtonProps} from "../../components/elements/buttons/button";
import {LinkType} from "../../components/elements/link/link";
import {SignupData, UserData} from "../../api/authAPI";
import Router from "../../utils/Router";

export interface SignInPageType {
	heading: HeadingType;
	formInputs: InputWrapperType[];
	button: ButtonProps;
	link: LinkType;
	onRegister: (e: Event) => Promise<void>;
	user: { profile: UserData };
	router: Router;
}


class RegistrationPage extends Block<SignInPageType> {
	validator = new Validator();

	protected getStateFromProps(): void {
		const onBlur = (e: Event) => {
			this.validator.validate(<HTMLInputElement>e.currentTarget);
		};

		this.state = {
			formInputs: [
				{
					label: "E-mail",
					name: "email",
					input:
						{
							type: "email",
							inputName: "email",
							placeholder: "email",
							validationType: "email",
							required: true,
							onChange: onBlur
						}
				},
				{
					label: "Логин",
					name: "login",
					input:
						{
							type: "text",
							inputName: "login",
							placeholder: "логин",
							validationType: "login",
							required: true,
							onChange: onBlur
						}
				},
				{
					label: "Имя",
					name: "first_name",
					input:
						{
							type: "text",
							inputName: "first_name",
							placeholder: "Ваше имя",
							validationType: "name",
							required: true,
							onChange: onBlur
						}
				},
				{
					label: "Фамилия",
					name: "second_name",
					input:
						{
							type: "text",
							inputName: "second_name",
							placeholder: "Ваша фамилия",
							validationType: "name",
							required: true,
							onChange: onBlur
						}
				},
				{
					label: "Телефон",
					name: "phone",
					input:
						{
							type: "tel",
							inputName: "phone",
							placeholder: "+7 (000)-000-00-00",
							validationType: "phone",
							required: true,
							onChange: onBlur
						}
				},
				{
					label: "Пароль",
					name: "password",
					input:
						{
							type: "password",
							inputName: "password",
							placeholder: "***********",
							validationType: "password",
							required: true,
							onChange: onBlur
						}
				},
				{
					label: "Повторите пароль",
					name: "repeat-password",
					input:
						{
							type: "password",
							inputName: "repeat-password",
							placeholder: "***********",
							validationType: "password",
							required: true,
							onChange: onBlur
						}
				}
				],

			onRegister: async (e: Event) => {
				e.preventDefault();
				const data = {} as SignupData & Indexed;
				const form = document.querySelector("#regForm");
				const refs = getFormData(<HTMLFormElement>form);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[key] = input;
				});
				const hasErrors = document.querySelector("[error-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await AuthController.signup(data);
				}
			}
		};
	}

	componentDidMount(props: SignInPageType): typeof props{
		if (props.user.profile) {
			props.router.go("/chats");
		}
		return props;
	}

	render(): string {
		//language=hbs
		return `
			<section class="wrapper">
				<div class="form--register-wrap">
					{{{Heading text="Регистрация"}}}
					<form id="regForm" action="" method="post" class="form--register">
			            {{#each formInputs}}
                            {{{InputWrapper label=this.label name=this.name input=this.input}}}
                        {{/each}}
                        {{#if user.response.error }}
                            <div class="input-error">{{user.response.error }}</div>
                        {{/if}}
			            {{{Button title="Зарегистрироваться" buttonClass="form--register-submit" name="registration-submit" onClick=onRegister}}}
					</form>
					{{{Link text="Уже есть аккаунт" class="form--register-login-link" url="/"}}}
				</div>
            </section>
		`;
    }
}

export default RegistrationPage;
import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import AuthController from "../../controllers/auth";
import { getFormData } from "../../helpers/formActions";
import "./login.pcss";
import {InputWrapperType} from "../../components/modules/input-wrapper/input-wrapper";
import {ButtonProps} from "../../components/elements/buttons/button";
import {HeadingType} from "../../components/elements/heading/heading";
import {LinkType} from "../../components/elements/link/link";

export interface LoginPageType {
	heading: HeadingType;
	formInputs: InputWrapperType[];
	button: ButtonProps;
	link: LinkType;
	onLogin: (e: Event) => Promise<void>;
}

class LoginPage extends Block<LoginPageType> {
	validator = new Validator();

	protected getStateFromProps(): void {
		const onBlur = (e: Event) => {
			this.validator.validate(<HTMLInputElement>e.currentTarget);
		};

		this.state = {
			formInputs: [
				{
					name: "login",
					label: "Логин",
					input:
						{
							inputName: "login",
							placeholder: "логин",
							required: true,
							type: "text",
							validationType: "login",
							onChange: onBlur
						}
				},
				{
					name: "password",
					label: "Пароль",
					input:
						{
							inputName: "password",
							placeholder: "***********",
							required: true,
							type: "password",
							validationType: "password",
							onChange: onBlur
						}
				}
			],
			onLogin: async (e: Event) => {
				e.preventDefault();
				const form = document.querySelector("#loginForm");
				const fields = getFormData(<HTMLFormElement>form);
				const loginData = {
					login: fields.login as string,
					password: fields.password as string
				};

				const hasErrors = document.querySelector("[error-for]");
				this.validator.formValidate();
					if(!hasErrors) {
						await AuthController.login(loginData);
					}
			}
		};
	}

	render(): string {
		//language=hbs
		return `
		<section class="wrapper">
			<div class="form--login-wrap">
				{{{Heading text="Вход"}}}
				<form id="loginForm" action="" method="post" class="form--login" enctype="multipart/form-data">
					{{#each formInputs}}
						{{{InputWrapper label=this.label name=this.name input=this.input}}}
					{{/each}}
                    {{#if user.response.error }}
                        <div class="input-error">{{user.response.error}}</div>
                    {{/if}}
                    {{{Button title="Авторизоваться" buttonClass="form--login-submit" name="login-submit" onClick=onLogin}}}
				</form>
                {{{Link text="Нет аккаунта?" class="form--login-register-link" url="/signup"}}}
			</div>
		</section>
		`;
	}
}

export default LoginPage;

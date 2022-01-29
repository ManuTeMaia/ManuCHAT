import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import AuthController from "../../controllers/auth";
import { getFormData } from "../../helpers/formActions";
import "./login.pcss";

class LoginPage extends Block {
	validator = new Validator();

	protected getStateFromProps(): void {
		const onBlur = (e: Event) => {
			this.validator.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			formInputs: [
				{
					name: "login",
					label: "Логин",
					input:
						{
							name: "login",
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
							name: "password",
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
				const fields = getFormData(form as HTMLFormElement);
				const loginData = {
					login: fields.login as string,
					password: fields.password as string
				};

				const hasErrors = document.querySelector("[error404-for]");
				this.validator.formValidate();
					if(!hasErrors) {
						await AuthController.login(loginData);
					}
			}
		};
	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
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
                    {{#if user.error }}
                        <div class="input-error">{{user.error.reason}}</div>
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

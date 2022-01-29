import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import AuthController from "../../controllers/auth";
import { getFormData } from "../../helpers/formActions";
import "./register.pcss";

class RegistrationPage extends Block {
	validator = new Validator();

	protected getStateFromProps() {
		const onBlur = (e: Event) => {
			this.validator.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			formInputs: [
				{
					label: "E-mail",
					name: "email",
					input:
						{
							name: "email",
							type: "email",
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
							name: "login",
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
							name: "first_name",
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
							name: "second_name",
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
							name: "phone",
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
							name: "password",
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
							name: "repeat-password",
							placeholder: "***********",
							validationType: "password",
							required: true,
							onChange: onBlur
						}
				}
				],

			onRegister: async (e: Event) => {
				e.preventDefault();
				const data: any = {};
				const form = document.querySelector("#regForm");
				const refs = getFormData(form as HTMLFormElement);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[key] = input;
				});
				const hasErrors = document.querySelector("[error404-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await AuthController.signup(data);
				}
			}
		};
	}

	componentDidMount() {
		if (this.props.user.profile) {
			this.props.router.go("/chats");
		}
	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
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
                        {{#if user.error }}
                            <div class="input-error">{{user.error.reason}}</div>
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
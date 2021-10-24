import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import AuthController from "../../controllers/auth";
import { getFormData } from "../../helpers/formActions";
import "./register.pcss";

class RegistrationPage extends Block {

	protected getStateFromProps() {
		this.state = {
			onRegister: async (e: Event) => {
				e.preventDefault();
				const data: any = {};
				const refs = getFormData(e.target as HTMLFormElement);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[key] = input;
				});
				const hasErrors = document.querySelector("[error-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await AuthController.signup(data);
				}
			},
			onBlur: (e: Event) => this.validate((e.currentTarget as HTMLInputElement)),
		};
	}

	componentDidMount() {
		if (this.props.user.profile) {
			this.props.router.go("/chats");
		}
	}

	validate(input: HTMLInputElement): void {
		return new Validator().validate(input);
	}

	render(): string {
		//language=hbs
		return `
			<section class="wrapper">
				<div class="form--register-wrap">
					{{{Heading text="Регистрация"}}}
					<form action="" method="post" class="form--register" novalidate>
			            {{{TextInput label="E-mail" type="email" name="email" placeholder="email" validationType="email" required= true onBlur=onBlur ref="email"}}}
			            {{{TextInput label="Логин" type="text" name="login" placeholder="Имя пользователя" validationType="login" required= true onBlur=onBlur ref="login"}}}
			            {{{TextInput label="Имя" type="text" name="first_name" placeholder="Ваше имя" validationType="name" required=true onBlur=onBlur ref="first_name"}}}
			            {{{TextInput label="Фамилия" type="text" name="second_name" placeholder="Ваша фамилия" validationType="name" onBlur=onBlur ref="second_name"}}}
			            {{{TextInput label="Телефон" type="tel" name="phone" placeholder="+7 (000)-000-00-00" validationType="phone" required=true onBlur=onBlur ref="phone"}}}
			            {{{TextInput label="Пароль" type="password" name="password" placeholder="***********" validationType="password" required=true onBlur=onBlur ref="password"}}}
			            {{{TextInput label="Пароль" type="password" name="repeat-password" placeholder="***********" validationType="password" required=true onBlur=onBlur ref="repeat-password"}}}
			            
						{{#if user.error }}
			                <span style="color: red">{{user.error.reason}}</span>
			            {{/if}}
						
			            {{{Button title="Зарегистрироваться" buttonClass="form--register-submit" name="registration-submit" onClick=onRegister}}}
					</form>
					{{{Link text="Уже есть аккаунт" class="form--register-login-link" url="/signin"}}}
				</div>
            </section>
		`;
    }
}

export default RegistrationPage;
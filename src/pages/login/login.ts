import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import Router from "../../utils/Router";
import AuthController from "../../controllers/auth";
import { getFormData } from "../../helpers/formActions";
import "./login.pcss";

class LoginPage extends Block {
	validator = new Validator();
	router = new Router();

	protected getStateFromProps() {
		this.state = {
			onLogin: async (e: Event) => {
					e.preventDefault();
					const refs = getFormData(e.target as HTMLFormElement);
					const loginData = {
						login: refs.login as string,
						password: refs.password as string
					};

					const hasErrors = document.querySelector("[error-for]");
					new Validator().formValidate();
					if(!hasErrors) {
						await AuthController.login(loginData);
						//this.router.go("/chats");
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
		return this.validator.validate(input);
	}

	render(): string {

		//language=hbs
		return `
		<section class="wrapper">
			<div class="form--login-wrap">
				{{{Heading text="Вход"}}}
				<form action="" method="post" class="form--login" enctype="multipart/form-data">
                    {{{TextInput label="Логин" name="login" type="text" placeholder="Имя пользователя" validationType="login" required=true onBlur=onBlur ref="login"}}}
                    {{{TextInput label="Пароль" name="password" type="password" placeholder="***********" validationType="password" required=true onBlur=onBlur ref="password"}}}
                    {{#if user.error }}
                        <span style="color: red">{{user.error.reason}}</span>
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

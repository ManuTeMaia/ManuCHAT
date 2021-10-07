import Block from "../../utils/Block";
import Validator from "../../utils/Validator";
import Router, {withRouter} from "../../utils/Router";
import AuthController from "../../controllers/auth";
import { getFormData } from "../../helpers/formActions";
import InputWrapper from "../../modules/inputs-wrapper/inputs-wrapper";
import Button from "../../components/buttons/submit-button";
import Heading from "../../components/headings/headings";
import Link from "../../components/links/links";
import template from "./login.hbs";
import "./login.pcss";
import {connect} from "../../store";

class LoginPage extends Block {
	validator: Validator;
	router: Router;

	constructor() {
		super( {
			events: {
				submit: async (e: Event) => {
					e.preventDefault();
					const refs = getFormData(e.target as HTMLFormElement);
					const loginData = {
						login: refs.login as string,
						password: refs.password as string
					};
					console.log(refs);
					await new AuthController().login(loginData);
					await this.router.go("/chats");
				}
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
			text: "Вход"
		});

		const login = new InputWrapper({
			label: "Логин",
			name: "login",
			type: "text",
			placeholder: "Имя пользователя",
			validationType: "login",
			required: true,
			events: {
				blur: (e) => this.validate((e.currentTarget as HTMLInputElement)),
			}
		});

		const password = new InputWrapper({
			label: "Пароль",
			name: "password",
			type: "password",
			placeholder: "***********",
			validationType: "password",
			required: true,
			events: {
				blur: (e) => this.validate((e.currentTarget as HTMLInputElement)),
			}
		});

        const submit = new Button({
			class: "form--login-submit",
			name: "login-submit",
			title: "Авторизоваться"
		});

		const link = new Link({
			url:"/signup",
			class:"form--login-register-link",
			text:"Нет аккаунта?"
		});

		return this.compile(template, {
			heading,
			login,
			password,
			submit,
			link
		});
	}
}

//export default LoginPage;
export default withRouter(connect((state: any) => ({user: state.user || {}}), LoginPage));
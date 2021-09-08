import "../../../components/buttons/submit-button";
import "../../../components/headings/headings";
import "../../../components/inputs/text-input";
import template from "./login.hbs";

export function addLoginPage():string {

	const loginFormData = {
		heading: {
			level: "3",
			class: "",
			text: "Вход"
		},
		textInputs: {
			login: {
				label: "Логин",
				type: "text",
				name: "login",
				placeholder: "Имя пользователя",
				required: "reqiured"
			},
			password: {
				label: "Пароль",
				type: "password",
				name: "password",
				placeholder: "***********",
				required: "required"
			}
		},
		submit: {
			class: "form--login-submit",
			name: "login-submit",
			title: "Авторизоваться"
		}
	};
	return document.querySelector(".root").innerHTML = template(loginFormData);
}
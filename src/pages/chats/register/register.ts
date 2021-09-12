import "../../../components/buttons/submit-button";
import "../../../components/headings/headings";
import "../../../components/inputs/text-input";
import template from "./register.hbs";
import "./register.pcss";

export function addRegisterPage():string {

	const regFormData = {
		heading: {
			level: "3",
			class: "",
			text: "Регистрация"
		},
		textInputs: {
			email: {
				label: "E-mail",
				type: "email",
				name: "email",
				placeholder: "email",
				required: "reqiured"
			},
			login: {
				label: "Логин",
				type: "text",
				name: "login",
				placeholder: "Имя пользователя",
				required: "reqiured"
			},
			firstname: {
				label: "Имя",
				type: "text",
				name: "first_name",
				placeholder: "Ваше имя",
				required: "reqiured"
			},
			lastname: {
				label: "Фамилия",
				type: "text",
				name: "second_name",
				placeholder: "Ваша фамилия"
			},
			phone: {
				label: "Телефон",
				type: "tel",
				name: "phone",
				placeholder: "+7 (000)-000-00-00",
				required: "reqiured"
			},
			password: {
				label: "Пароль",
				type: "password",
				name: "password",
				placeholder: "***********",
				required: "required"
			},
			passwordrepeat: {
				label: "Повторите пароль",
				type: "password",
				name: "repeat-password",
				placeholder: "***********",
				required: "required"
			}

		},
		submit: {
			class: "form--register-submit",
			name: "registration-submit",
			title: "Зарегистрироваться"
		}
	};

	const WrapElement = document.querySelector(".root") as HTMLElement;
	return WrapElement.innerHTML = template(regFormData);
}
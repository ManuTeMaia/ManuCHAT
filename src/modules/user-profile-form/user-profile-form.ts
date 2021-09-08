import "../../components/buttons/submit-button";
import "../../components/headings/headings";
import "../../components/inputs/text-input";
import template from "./user-profile-form.hbs";

function addProfileFormPage():string {

	const profileFormData = {
		heading: {
			level: "3",
			class: "",
			text: "Изменить данные"
		},
		formclass: "form--user-profile-info",
		textInputs: {
			email: {
				label: "E-mail",
				type: "email",
				name: "email",
				placeholder: "dragonfly@123.com"
			},
			login: {
				label: "Логин",
				type: "text",
				name: "login",
				placeholder: "dragonfly"
			},
			firstname: {
				label: "Имя",
				type: "text",
				name: "first_name",
				placeholder: "Иветта"
			},
			lastname: {
				label: "Фамилия",
				type: "text",
				name: "second_name",
				placeholder: "Сидорова"
			},
			displayname: {
				label: "Имя в чате",
				type: "text",
				name: "display_name",
				placeholder: "Иветта Сидорова"
			},
			phone: {
				label: "Телефон",
				type: "tel",
				name: "phone",
				placeholder: "+7 (000)-000-00-00"
			}
		},
		submit: {
			class: "form--user-profile-info-submit",
			name: "user-profile-штащ-submit",
			title: "Cохранить"
		}

	};
	return document.querySelector(".main--page-user-profile-fields").innerHTML = template(profileFormData);
}

function addProfileFormPasswordPage():string {

	const profileFormData = {
		heading: {
			level: "3",
			class: "",
			text: "Изменить пароль"
		},
		form: "form--user-profile-password",
		textInputs: {
			currentpassword: {
				label: "Текущий пароль",
				type: "password",
				name: "current-password",
				placeholder: "***********",
				required: "required"
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
			class: "form--user-profile-password-submit",
			name: "user-profile-password-submit",
			title: "Изменить"
		}

	};
	return document.querySelector(".main--page-user-profile-fields").innerHTML = template(profileFormData);
}

export { addProfileFormPage, addProfileFormPasswordPage };
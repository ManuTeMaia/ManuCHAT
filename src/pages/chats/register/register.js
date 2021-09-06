import "../../../components/buttons/submit-button";
import "../../../components/headings/headings";
import "../../../components/inputs/text-input";
import template from "./register.hbs";

export function addRegisterPage() {

    const regFormData = {
        heading: {
            level: '3',
            class: "",
            text: "Регистрация"
        },
        textInputs: {
            email: {
                label: "E-mail",
                type: "email",
                name: "email",
                placeholder: "email",
                req: "reqiured"
            },
            login: {
                label: "Логин",
                type: "text",
                name: "login",
                placeholder: "Имя пользователя",
                req: "reqiured"
            },
            firstname: {
                label: "Имя",
                type: "text",
                name: "first_name",
                placeholder: "Ваше имя",
                req: "reqiured"
            },
            lastname: {
                label: "Фамилия",
                type: "text",
                name: "second_name",
                placeholder: "Ваша фамилия",
            },
            phone: {
                label: "Телефон",
                type: "tel",
                name: "phone",
                placeholder: "+7 (000)-000-00-00",
                req: "reqiured"
            },
            password: {
                label: "Пароль",
                type: "password",
                name: "password",
                placeholder: "***********",
                req: "required"
            },
            passwordrepeat: {
                label: "Повторите пароль",
                type: "password",
                name: "repeat-password",
                placeholder: "***********",
                req: "required"
            }

        },
        submit: {
            class: "form--register-submit",
            name: "registration-submit",
            title: "Зарегистрироваться"
        }
    }
    document.querySelector('.root').innerHTML = template(regFormData);
};
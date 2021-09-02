import "../../../components/buttons/submit-button";
import "../../../components/headings/headings";
import "../../../components/inputs/text-input";
import template from "./login.hbs";
document.addEventListener('DOMContentLoaded', () => {
    const formData = {
        heading: {
            level: '3',
            class: "",
            text: "Вход"
        },
        textInputs: {
            login: {
                label: "Логин",
                type: "text",
                name: "user-login",
                placeholder: "Имя пользователя",
                req: "reqiured"
            },
            password: {
                label: "Пароль",
                type: "password",
                name: "user-password",
                placeholder: "***********",
                req: "required"
            }

        },
        submit: {
            сlass: "form--login-submit",
            name: "login-submit",
            title: "Авторизоваться"
        }
    };
    document.querySelector('.root').innerHTML = template(formData);
});
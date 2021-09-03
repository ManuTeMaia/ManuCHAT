import "../../../components/headings/headings";
import template from "./main.hbs";

export function addMainPage() {

    const mainPage = template({
        heading: {
            level: '3',
            class: "",
            text: "Регистрация"
        },
        textInputs: {
            email: {
                label: "E-mail",
                type: "email",
                name: "user-email",
                placeholder: "email",
                req: "reqiured"
            },
            login: {
                label: "Логин",
                type: "text",
                name: "user-login",
                placeholder: "Имя пользователя",
                req: "reqiured"
            },
            firstname: {
                label: "Имя",
                type: "text",
                name: "user-login",
                placeholder: "Ваше имя",
                req: "reqiured"
            },
            secondname: {
                label: "Фамилия",
                type: "text",
                name: "user-login",
                placeholder: "Ваша фамилия",
            },
            phone: {
                label: "Телефон",
                type: "tel",
                name: "user-phone",
                placeholder: "+7 (000)-000-00-00",
                req: "reqiured"
            },
            password: {
                label: "Пароль",
                type: "password",
                name: "user-password",
                placeholder: "***********",
                req: "required"
            },
            passwordrepeat: {
                label: "Повторите пароль",
                type: "password",
                name: "user-password",
                placeholder: "***********",
                req: "required"
            }

        },
        submit: {
            class: "form--register-submit",
            name: "registration-submit",
            title: "Зарегистрироваться"
        }
    });
    document.querySelector('.root').innerHTML = mainPage;
};
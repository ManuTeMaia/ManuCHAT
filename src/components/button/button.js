import "./button.pcss";
import template from "./button.hbs";
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = template({
        class: "button--login",
        name: "login",
        title: "Войти"
    });
    return loginButton;
});
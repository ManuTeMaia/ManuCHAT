import "../../../components/buttons/button-submit";
import template from "./login.hbs";
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.root').innerHTML = template({ сlass: "form--login-submit", name: "login-submit", title: "Войти" });
});
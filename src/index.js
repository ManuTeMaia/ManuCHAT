import "./style.pcss";
import { addLoginPage } from "../src/pages/chats/login/login";
import { addRegisterPage } from "../src/pages/chats/register/register";
import { addMainPage } from "../src/pages/chats/main/main";
document.addEventListener('DOMContentLoaded', () => {
    addLoginPage();
    const regLink = document.querySelector('.form--login-register-link');
    regLink.addEventListener("click", (e) => {
        e.preventDefault();
        addRegisterPage();
    });
    const form = document.querySelector('form');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addMainPage();
    });
});
import "../src/common/common.pcss";
import "../src/components/buttons/buttons.pcss";
import "../src/components/inputs/inputs.pcss";
import "../src/components/headings/headings.pcss"
import "../src/components/avatar/avatar.pcss"
import "../src/pages/chats/login/login.pcss";
import "../src/pages/chats/register/register.pcss";

import { addLoginPage } from "../src/pages/chats/login/login";
import { addRegisterPage } from "../src/pages/chats/register/register";
document.addEventListener('DOMContentLoaded', () => {
    addLoginPage();
    const regLink = document.querySelector('.form--login-register-link');
    regLink.addEventListener("click", (e) => {
        e.preventDefault();
        addRegisterPage();
    });

});
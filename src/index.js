import "./style.pcss";
import { addLoginPage } from "../src/pages/chats/login/login";
import { addRegisterPage } from "../src/pages/chats/register/register";
import { addMainPage } from "../src/pages/chats/main/main";
import { addProfilePage } from "../src/pages/chats/user_profile/user-profile";
document.addEventListener('DOMContentLoaded', () => {
    addLoginPage();
    const regLink = document.querySelector('.form--login-register-link');
    regLink.addEventListener("click", (e) => {
        e.preventDefault();
        addRegisterPage();
    });
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        const target = e.target;
        console.log(target);
        const loginForm = document.querySelector('.form--login');
        const regForm = document.querySelector('.form--register');
        if (target == loginForm || target == regForm) {
            addMainPage();
            document.addEventListener("click", (e) => {
                e.preventDefault();
                const target = e.target;
                console.log(target);
                const userAvatar = document.querySelector('.profile-card-avatar img');
                if (target == userAvatar) {
                    addProfilePage();

                }
            });
        }
    });



});
import "./common/common";
import { addLoginPage } from "./pages/chats/login/login";
import { addRegisterPage } from "./pages/chats/register/register";
import { addMainPage } from "./pages/chats/main/main";
import { addProfilePage } from "./pages/chats/user-profile/user-profile";
import * as profile from "./modules/user-profile-form/user-profile-form";

document.addEventListener("DOMContentLoaded", () => {
	addLoginPage();
	const regLink = document.querySelector(".form--login-register-link") as HTMLElement;
	regLink.addEventListener("click", (e) => {
		e.preventDefault();
		addRegisterPage();
	});
	document.addEventListener("submit", (e) => {
		e.preventDefault();
		const target = e.target;
		const loginForm = document.querySelector(".form--login");
		const regForm = document.querySelector(".form--register");
		if (target == loginForm || target == regForm) {
			addMainPage();
			document.addEventListener("click", (e) => {
				e.preventDefault();
				const target = e.target;
				const userAvatar = document.querySelector(".profile-card-avatar img");
				if (target == userAvatar) {
					addProfilePage();
					document.addEventListener("click", (e) => {
						e.preventDefault();
						const target = e.target;
						console.log(target);
						const changeData = document.querySelector(".link-change-data");
						const changePassw = document.querySelector(".link-change-pass");
						const logOut = document.querySelector(".link-logout");
						if (target == changeData) {
							profile.addProfileFormPage();
						} else if (target == changePassw) {
							profile.addProfileFormPasswordPage();
						} else if (target == logOut) {
							addMainPage();
						}
					});
				}
			});
		}
	});
});
require("babel-polyfill");
//import AuthController from "./controllers/auth";
import "./common/common";
import Router from "./utils/Router";
import LoginPage from "./pages/login/login";
import RegistrationPage from "./pages/register/register";
import ChatPage from "./pages/chats/chat/chat";
import ChatBodyPage from "./pages/chats/chat-body/chat-body";
import ProfilePage from "./pages/profile/user-profile";
import ProfilePageEdit from "./pages/profile/user-profile-edit";
import ProfileEditPasswordPage from "./pages/profile/user-profile-password";
import {Error404, Error500} from "./pages/error/error";
import AuthController from "./controllers/auth";


AuthController.fetchUser()
	.then(() => {
		const router = new Router();
		router
			.use("/", LoginPage)
			.use("/signup", RegistrationPage)
			.use("/400", Error404)
			.use("/500", Error500)
			.use("/chats", ChatPage)
			.use("/settings", ChatPage, ".root", {block: ProfilePage, query: ".chat--wrap"})
			.use("/chat", ChatPage, ".root", {block: ChatBodyPage, query: ".chat--wrap"})
			.use("/settings/edit", ChatPage, ".root", {block: ProfilePageEdit, query: ".chat--wrap"})
			.use("/settings/pwd", ChatPage, ".root", {block: ProfileEditPasswordPage, query: ".chat--wrap"})
			.start();
	});
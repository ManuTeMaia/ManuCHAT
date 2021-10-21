require("babel-polyfill");

import AuthController from "./controllers/auth";
import ChatController from "./controllers/chat";
import "./common/common";
import Router, { checkAuthType } from "./utils/Router";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/register";
import ChatPage from "./pages/chats/chat";
import ChatBodyPage from "./pages/chats/chat-body";
import ProfilePage from "./pages/profile/user-profile";
import ProfilePageEdit from "./pages/profile/user-profile-edit";
import ProfileEditPasswordPage from "./pages/profile/user-profile-password";
import {Error404, Error500} from "./pages/error/error";

const router = new Router();

const checkAuth: checkAuthType = async (next, currentRoute): Promise<void> => {
	const user = await AuthController.fetchUser();

	if (!currentRoute) {
		return next();
	}

	if (currentRoute.pathname === "/") {
		if (user) {
			//await ChatController.getChatList();
			return router.go("/chats");
		}
		return next();
	} else {
		if (user || !currentRoute.needAuth) {
			return next();
		}
		return router.go("/");
	}
};

router
	.checkAuth(checkAuth)
	.use("/", LoginPage)
	.use("/signup", RegistrationPage)
	.use("/400", Error404)
	.use("/500", Error500)
	.use("/chats", ChatPage,undefined,undefined,true)
	.use("/settings", ChatPage, ".root", {block: ProfilePage, query: ".chat--wrap"}, true)
	.use("/chat", ChatPage, ".root", {block: ChatBodyPage, query: ".chat--wrap"}, true)
	.use("/settings/edit", ChatPage, ".root", {block: ProfilePageEdit, query: ".chat--wrap"}, true)
	.use("/settings/pwd", ChatPage, ".root", {block: ProfileEditPasswordPage, query: ".chat--wrap"}, true)
	.start();
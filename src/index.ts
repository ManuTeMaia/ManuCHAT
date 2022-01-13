import ChatController from "./controllers/chat";

require("babel-polyfill");

import AuthController from "./controllers/auth";
import "./common/common";
import Router, { checkAuthType } from "./utils/Router";
import regComponent from "./helpers/regComponent";
import Block from "./utils/Block";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/register";
import ChatPage from "./pages/chats/chat";
import ChatBodyPage from "./pages/chats/chat-body";
import ProfilePage from "./pages/profile/user-profile";
import ProfilePageEdit from "./pages/profile/user-profile-edit";
import ProfileEditPasswordPage from "./pages/profile/user-profile-password";
import Error404 from "./pages/error/";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const components = require("./components/**/index.ts") as {[key: string]: { default: typeof Block }};

Object.values(components).forEach((component) => {
	Object.values(component).forEach(element => regComponent(element.default));
});

const router = new Router();

const checkAuth: checkAuthType = async (next, currentRoute): Promise<void> => {
	const user = await AuthController.fetchUser();
	if (user) {
		await ChatController.getChatList();
	}
	if (!currentRoute) {
		return next();
	}

	if (currentRoute.pathname === "/") {
		if (user) {
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
	.use("/", LoginPage)
	.use("/signup", RegistrationPage)
	.use("/404", Error404)
	//.use("/500", Error500)
	.use("/chats", ChatPage,undefined,undefined,true)
	.use("/settings", ChatPage, ".root", {childBlock: ProfilePage, childQuery: ".chat--wrap"}, true)
	.use("/chat/", ChatPage, ".root", {childBlock: ChatBodyPage, childQuery: ".chat--wrap"}, true)
	.use("/settings/edit", ChatPage, ".root", {childBlock: ProfilePageEdit, childQuery: ".chat--wrap"}, true)
	.use("/settings/pwd", ChatPage, ".root", {childBlock: ProfileEditPasswordPage, childQuery: ".chat--wrap"}, true)
	.checkAuth(checkAuth)
	.start();
require("babel-polyfill");
import "/static/images/favicon.ico";
import "/static/images/noimage.png";
import "./helpers/hbsHelpers";
import ChatController from "./controllers/chat";
import AuthController from "./controllers/auth";
import "./common/common";
import Router, { checkAuthType } from "./utils/Router";
import regComponent, {BlockConstructable} from "./helpers/regComponent";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/register";
import ChatPage from "./pages/chats/chat";
import ChatBodyPage from "./pages/chats/chat-body";
import ProfilePage from "./pages/profile/user-profile";
import ProfilePageEdit from "./pages/profile/user-profile-edit";
import ProfileEditPasswordPage from "./pages/profile/user-profile-password";
import Error404 from "./pages/error404/";
import Error500 from "./pages/error500";

const contextElements = require.context("./components/elements", true, /index\.ts/ );
const contextModules = require.context("./components/modules", true, /index\.ts/ );

const componentsEl = contextElements.keys().map(key => contextElements(key));
const componentsMo = contextModules.keys().map(key => contextModules(key));
const components = componentsEl.concat(componentsMo);

Object.values(components).forEach((component) => {
	regComponent(<BlockConstructable>component.default);
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
	.use("/chats", ChatPage,undefined,undefined,true)
	.use("/settings", ChatPage, ".root", {childBlock: ProfilePage, childQuery: ".chat--wrap"}, true)
	.use("/chat/", ChatPage, ".root", {childBlock: ChatBodyPage, childQuery: ".chat--wrap"}, true)
	.use("/settings/edit", ChatPage, ".root", {childBlock: ProfilePageEdit, childQuery: ".chat--wrap"}, true)
	.use("/settings/pwd", ChatPage, ".root", {childBlock: ProfileEditPasswordPage, childQuery: ".chat--wrap"}, true)
	.use("/500", Error500)
	.useError("/404", Error404)
	.checkAuth(checkAuth)
	.start();
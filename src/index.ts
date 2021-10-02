import "./common/common";
import Router from "./utils/Router";
import LoginPage from "./pages/login/login";
import RegistrationPage from "./pages/register/register";
import ChatPage from "./pages/chats/chat/chat";
import ChatBodyPage from "./pages/chats/chat-body/chat-body";
import ProfilePage from "./pages/chats/user-profile/user-profile";
import {ProfileFormPage, ProfileFormPasswordPage} from "./pages/chats/user-profile-form/user-profile-form";
import {Error404, Error500} from "./pages/error/error";


const router = new Router();

router
	.use("/", LoginPage)
	.use("/chats", ChatPage)
	.use("/signup", RegistrationPage)
	.use ("/400", Error404)
	.use ("/500", Error500)
	.use("/chat", ChatBodyPage, ChatPage)
	.use("/settings", ProfilePage, ChatPage)
	.use("/settings/edit", ProfileFormPage, ProfilePage)
	.use("/settings/pwd", ProfileFormPasswordPage, ProfilePage)
	.start();
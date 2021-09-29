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
	.use ("/5**", Error500)
	.use("/chat", ChatBodyPage, ".chat--wrap")
	.use("/settings", ProfilePage, ".chat--wrap")
	.use("/settings/edit", ProfileFormPage, ".main--page-user-profile-fields")
	.use("/settings/pwd", ProfileFormPasswordPage, ".main--page-user-profile-fields")
	.start();
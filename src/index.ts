import "./common/common";
import Router from "./utils/Router";
import LoginPage from "./pages/chats/login/login";
import RegistrationPage from "./pages/chats/register/register";
import ChatPage from "./pages/chats/chat/chat";
import ChatBodyPage from "./pages/chats/chat-body/chat-body";
import ProfilePage from "./pages/chats/user-profile/user-profile";

//history.pushState({}, "", "/");
const routerOne = new Router();
const routerTwo = new Router(".chat--wrap");

routerOne
	.use("/", LoginPage)
	.use("/chats", ChatPage)
	.use("/signup", RegistrationPage)
	.start();

routerTwo
	.use("/chat", ChatBodyPage)
	.use("/settings", ProfilePage)
	.start();

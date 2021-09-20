import Block from "../utils/Block";
import ChatPage from "../pages/chats/chat/chat";
import ChatBody from "../pages/chats/chat-body/chat-body";
import LoginPage from "../pages/chats/login/login";
import RegistrationPage from "../pages/chats/register/register";
import ProfilePage from "../pages/chats/user-profile/user-profile";
import { ProfileFormPage, ProfileFormPasswordPage } from "../modules/user-profile-form/user-profile-form";


function pageRender(query: string, block: string): Element {

	const root = document.querySelector(query);
	let page: Block = new Block;

	if(!root) {
		throw new Error("Root not found");
	}

	switch (block) {
		case "login":
			page = new LoginPage;
			break;
		case "registration":
			page = new RegistrationPage;
			break;
		case "chats":
			page = new ChatPage;
			break;
		case "chat":
			page = new ChatBody;
			break;
		case "profile":
			page = new ProfilePage;
			break;
		case "profile-change":
			page = new ProfileFormPage;
			break;
		case "profile-password":
			page = new ProfileFormPasswordPage;
			break;
		default:
			page = new ChatPage;
			break;
	}

	root.innerHTML = "";
	
	const newblock  = page.getContent();
	root.appendChild(newblock);
	
	return root;
}

export default pageRender;
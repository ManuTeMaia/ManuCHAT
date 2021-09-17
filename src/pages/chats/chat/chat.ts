import Block from "../../../utils/Block";
import pageRender from "../../../utils/pageRender";
import ChatProfileCard from "../../../modules/chat-list-profile-card/chat-list-profile-card";
import ProfilePage from "../user-profile/user-profile";
import template from "./chat.hbs";
import "./chat.pcss";

class ChatPage extends Block {
	constructor(){
		super("div");
	}
	render(): DocumentFragment {
		
		const profilecard = new ChatProfileCard({
			imagesrc: "/noimage.png",
			divclass: "chat-list-profile-card profile-card-avatar",
			imagetitle: "Изменить данные профиля",
			events: {
				click: () => pageRender(".chat--wrap",new ProfilePage())
			},
			class: "chat-list-profile-card profile-card-search",
			name: "search",
			placeholder: "Поиск"
		});

		return this.compile(template, {
			profilecard:profilecard,
		});
	}
}
export default ChatPage;
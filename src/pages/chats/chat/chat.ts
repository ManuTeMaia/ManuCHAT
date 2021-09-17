import Block from "../../../utils/Block";
import SearchInput from "../../../components/inputs/search-input";
import Avatar from "../../../components/avatar/avatar";
import ChatProfileCard from "../../../modules/chat-list-profile-card/chat-list-profile-card";
import template from "./chat.hbs";
import "./chat.pcss";

class ChatPage extends Block {
	constructor(){
		super("div");
	}
	render(): DocumentFragment {
		const avatar =  new Avatar({
			imagesrc: "/noimage.png",
			divclass: "chat-list-profile-card profile-card-avatar",
			imagetitle: "Изменить данные профиля",
			events: {
				click: () => console.log("clicked")
			}
		});
		const search = new SearchInput({
			class: "chat-list-profile-card profile-card-search",
			name: "search",
			placeholder: "Поиск"
		});
		const profilecard = new ChatProfileCard({
			avatar:avatar,
			textinput:search,
		});

		return this.compile(template, {
			profilecard:profilecard,
		});
	}
}
export default ChatPage;
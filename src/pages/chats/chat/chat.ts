import Block from "../../../utils/Block";
import pageRender from "../../../utils/pageRender";
import ChatBodyPage from "../../../pages/chats/chat-body/chat-body";
import ChatProfileCard from "../../../modules/chat-list-profile-card/chat-list-profile-card";
import ChatListCard from "../../../modules/chat-list-card/chat-list-card";
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

		const chatsList = [
			{
				imagesrc: "/noimage.png",
				divclass: "chat-list-card card-avatar",
				imagetitle: "Super Chat",
				time: "13:10",
				title: "Super Chat",
				lastmessage: "Изображение",
				unread: "3"
			},
			{
				imagesrc: "/noimage.png",
				divclass: "chat-list-card card-avatar",
				imagetitle: "Nikon Lensesя",
				time: "08:23",
				title: "Nikon Lenses",
				ismine: "Вы",
				lastmessage: "Какой-то текст про никон"
			},
			{
				imagesrc: "/noimage.png",
				divclass: "chat-list-card card-avatar",
				imagetitle: "Киноклуб",
				time: "Вчера",
				title: "Киноклуб",
				lastmessage: "Стикер",
				unread: "1"
			},
			{
				imagesrc: "/noimage.png",
				divclass: "chat-list-card card-avatar",
				imagetitle: "Андрей",
				time: "Вчера",
				title: "Андрей",
				lastmessage: "Ты даже не представляешь как...",
			},
			{
				imagesrc: "/noimage.png",
				divclass: "chat-list-card card-avatar",
				imagetitle: "Marvell",
				time: "Вчера",
				title: "Marvell",
				lastmessage: "Что-то непонятное",
				unread: "2",
				events: {
					click: (e:Event) => {
						(<HTMLElement> e.currentTarget).classList.add("active");
						pageRender(".chat--wrap",new ChatBodyPage());
					}
				}
			},	
		];
		const chatlist = chatsList.map(
			(chatlist) => new ChatListCard(chatlist)
		);

		return this.compile(template, {
			profilecard:profilecard,
			chatlist:chatlist,
		});
	}
}
export default ChatPage;
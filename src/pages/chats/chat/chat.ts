import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import ChatProfileCard from "../../../modules/chat-list-profile-card/chat-list-profile-card";
import ChatListCard from "../../../modules/chat-list-card/chat-list-card";
import template from "./chat.hbs";
import "./chat.pcss";

class ChatPage extends Block {
	router: Router;

	constructor(){
		super();
		this.router = new Router();
	}
	render(): DocumentFragment {

		const profileCard = new ChatProfileCard({...this.props});

		const chatsList = [
			{
				imageSrc: "/noimage.png",
				divClass: "chat-list-card card-avatar",
				imageTitle: "Super Chat",
				time: "13:10",
				title: "Super Chat",
				lastMessage: "Изображение",
				unread: 1
			},
			{
				imageSrc: "/noimage.png",
				divClass: "chat-list-card card-avatar",
				imageTitle: "Marvell",
				time: "15:02",
				title: "Marvell (кликабельно)",
				lastMessage: "Что-то непонятное",
				unread: 2,
				events: {
					click: (e:Event) => {
						(<HTMLElement> e.currentTarget).classList.add("active");
						this.router.go("/chat");
					}
				}
			},	
			{
				imageSrc: "/noimage.png",
				divClass: "chat-list-card card-avatar",
				imageTitle: "Nikon Lenses",
				time: "08:23",
				title: "Nikon Lenses",
				mine: "Вы",
				lastMessage: "Какой-то текст про никон"
			},
			{
				imageSrc: "/noimage.png",
				divClass: "chat-list-card card-avatar",
				imageTitle: "Киноклуб",
				time: "Вчера",
				title: "Киноклуб",
				lastMessage: "Стикер",
				unread: 1
			},
			{
				imageSrc: "/noimage.png",
				divClass: "chat-list-card card-avatar",
				imageTitle: "Андрей",
				time: "Вчера",
				title: "Андрей",
				mine: "Вы",
				lastMessage: "Ты даже не представляешь как...",
			}
		];
		const chatList = chatsList.map(
			(chatList) => new ChatListCard(chatList)
		);

		return this.compile(template, {
			profileCard,
			chatList
		});
	}
}
export default ChatPage;
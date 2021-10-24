import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import ChatProfileCard from "../../../modules/chat-list-profile-card/chat-list-profile-card";
import ChatListCard from "../../../modules/chat-list-card/chat-list-card";
import template from "./chat.hbs";
import "./chat.pcss";
//import ChatController from "../../../controllers/chat";
import ChatWS from "../../../api/chatWS";
import Link from "../../../components/links/links";

class ChatPage extends Block {
	router = new Router();
	ws = new ChatWS();

	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		this.ws = new ChatWS();
		//await ChatController.getChatList();
	}

	render(): DocumentFragment {

		let chatCards = this.props.chats;
		console.log(chatCards);
		const profileCard = new ChatProfileCard({...this.props});

		//chatCards.map((chatCard) => console.log(chatCard.title));

		chatCards = chatCards.map((chatCard) => new ChatListCard({
			imageSrc: chatCard.avatar,
			imageTitle: chatCard.title,
			time: chatCard.time,
			title: chatCard.title,
			lastMessage: chatCard.content,
			unread: chatCard.unread_count,
			events: {
				click: (e: Event) => {
					(<HTMLElement>e.currentTarget).classList.toggle("active");
					this.router.go(`/chat?id=${chatCard.id}`);
				}
			}
		})
		);

		return this.compile(template, {
			profileCard,
			chatCards
		});
	}
}
export default ChatPage;
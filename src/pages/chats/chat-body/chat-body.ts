import Block from "../../../utils/Block";
import { submitEmulator } from "../../../helpers/formActions";
import Avatar from "../../../components/elements/avatar/avatar";
import ChatMessage from "../../../components/elements/chat-message/chat-message";
import TextInput from "../../../components/elements/inputs/text-input";
import Button from "../../../components/elements/buttons/button";
import template from "./chat-body.hbs";
import "./chat-body.pcss";
import ChatContextMenu from "../../../modules/chat-context-menu/chat-context-menu";

class ChatBodyPage extends Block{

	constructor(props) {
		super(props);
	}

    render():DocumentFragment {
	    const chats = this.props.chats;
	    console.log(chats);

		const contextMenu = new ChatContextMenu({...this.props});

		const avatar = new Avatar({
			divClass: "main--page-chat-avatar chat-avatar",
			imageSrc: "/noimage.png",
			imageTitle: "This Chat",
		});

		const chatName = "Marvell";

		const textInput = new TextInput({
				type: "text",
				name: "message",
				class: "message-input-form-input",
				placeholder: "Пишите..."
		});

        const send = new Button({
			buttonClass: "main--page-chat-send",
			name: "send-submit",
			events: {
				click: (e) => submitEmulator(e, "")
				}
		});

		const chatMessages = [
			{
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at neque commodo, mattis sapien bibendum, fringilla lacus. Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend vulputate gravida. Sed sodales diam eget mauris mattis, in rutrum sapien auctor. Aenean sed justo vel mauris gravida mollis eget eu velit. Vivamus ut auctor libero. Maecenas eu ipsum id sapien accumsan feugiat. Donec sit amet condimentum felis, ut tincidunt mauris. Sed nec luctus lorem. Aliquam id blandit urna. Phasellus mauris ipsum, blandit a lacus nec, finibus tempus odio. Quisque sollicitudin viverra dapibus.",
				time: "13:15"
			},
			{
				isMine: true,
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at neque commodo, mattis sapien bibendum, fringilla lacus. Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend vulputate gravida. Sed sodales diam eget mauris mattis, in rutrum sapien auctor. Aenean sed justo vel mauris gravida mollis eget eu velit. Vivamus ut auctor libero. Maecenas eu ipsum id sapien accumsan feugiat. Donec sit amet condimentum felis, ut tincidunt mauris. Sed nec luctus lorem.",
				time: "13:35",
				isRecieved: true
			},
			{
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at neque commodo, mattis sapien bibendum, fringilla lacus. Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend vulputate gravida. Sed sodales diam eget mauris mattis, in rutrum sapien auctor. Aenean sed justo vel mauris gravida mollis eget eu velit. Vivamus ut auctor libero. Maecenas eu ipsum id sapien accumsan feugiat. Donec sit amet condimentum felis, ut tincidunt mauris. Sed nec luctus lorem. Aliquam id blandit urna. Phasellus mauris ipsum, blandit a lacus nec, finibus tempus odio. Quisque sollicitudin viverra dapibus.",
				time: "13:15"
			},
			{
				isMine: true,
				content: "Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend",
				time: "13:35",
				isRecieved: true
			},
			{
				content: "%)",
				time: "15:00"
			},
			{
				content: "Что-то непонятное",
				time: "15:02"
			}
		].map((chatMessage) => new ChatMessage(chatMessage));

        return this.compile(template, {
			chatName,
			avatar,
	        contextMenu,
			chatMessages,
			textInput,
			send,
		});
    }

}
export default ChatBodyPage;
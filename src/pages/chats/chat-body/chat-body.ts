import Block from "../../../utils/Block";
import Avatar from "../../../components/avatar/avatar";
import ChatMessage from "../../../components/chat-message/chat-message";
import TextInput from "../../../components/inputs/text-input";
import Button from "../../../components/buttons/submit-button";
import template from "./chat-body.hbs";
import "./chat-body.pcss";

class ChatBodyPage extends Block{
	constructor() {
        super("div");
    }
    render():DocumentFragment {
		const avatar = new Avatar({
			divclass: "main--page-chat-avatar chat-avatar",
			imagesrc: "/noimage.png",
			imagetitle: "This Chat",
		});
		const chatname = "Marvell";
		const textinput = new TextInput({
				type: "text",
				name: "message",
				class: "message-input-form-input",
				placeholder: "Пишите..."
		});
        const send = new Button({
			class: "main--page-chat-send",
			name: "send-submit",
			events: {
				click: (e) => {
					e.preventDefault();
					}
				}
		});
		const chatmessages = [
			{
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at neque commodo, mattis sapien bibendum, fringilla lacus. Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend vulputate gravida. Sed sodales diam eget mauris mattis, in rutrum sapien auctor. Aenean sed justo vel mauris gravida mollis eget eu velit. Vivamus ut auctor libero. Maecenas eu ipsum id sapien accumsan feugiat. Donec sit amet condimentum felis, ut tincidunt mauris. Sed nec luctus lorem. Aliquam id blandit urna. Phasellus mauris ipsum, blandit a lacus nec, finibus tempus odio. Quisque sollicitudin viverra dapibus.",
			time:"13:15"
			},
			{
			ismine:"mine",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at neque commodo, mattis sapien bibendum, fringilla lacus. Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend vulputate gravida. Sed sodales diam eget mauris mattis, in rutrum sapien auctor. Aenean sed justo vel mauris gravida mollis eget eu velit. Vivamus ut auctor libero. Maecenas eu ipsum id sapien accumsan feugiat. Donec sit amet condimentum felis, ut tincidunt mauris. Sed nec luctus lorem.",
			time:"13:35",
			isrecieved: "+"
			},
			{
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at neque commodo, mattis sapien bibendum, fringilla lacus. Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend vulputate gravida. Sed sodales diam eget mauris mattis, in rutrum sapien auctor. Aenean sed justo vel mauris gravida mollis eget eu velit. Vivamus ut auctor libero. Maecenas eu ipsum id sapien accumsan feugiat. Donec sit amet condimentum felis, ut tincidunt mauris. Sed nec luctus lorem. Aliquam id blandit urna. Phasellus mauris ipsum, blandit a lacus nec, finibus tempus odio. Quisque sollicitudin viverra dapibus.",
			time:"13:15"
			},
			{
			ismine:"mine",
			text: "Pellentesque est metus, sollicitudin a vulputate a, luctus at mi. Maecenas eleifend",
			time:"13:35",
			isrecieved: "+"
			},
			{
			text:"%)",
			time:"15:00"
			},
			{
			text:"Что-то непонятное",
			time:"15:02"
			}
		].map((chatmessage) => new ChatMessage(chatmessage));

        return this.compile(template, {
			chatname:chatname,
			avatar:avatar,
			chatmessages:chatmessages,
			textinput:textinput,
			send:send,
			
		});
    }

}
export default ChatBodyPage;
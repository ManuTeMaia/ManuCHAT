import Block from "../../../utils/Block";
import Avatar from "../../../components/avatar/avatar";
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
		const textinput = new TextInput({
				type: "text",
				name: "message",
				placeholder: "Пишите..."
		});
        const send = new Button({
			class: "main--page-chat-send",
			name: "send-submit",
			title: "Send",
			events: {
				click: (e) => {
					e.preventDefault();
					}
				}
		});
		const chatmessages = new ChatMessage({
			label: "Email",
			data: "dragonfly@123.com"
		});

        return this.compile(template, {
			avatar:avatar,
			textinput:textinput,
			send:send,
			
		});
    }

}
export default ChatBodyPage;
import Block from "../../../utils/Block";
import {ChatMessageProps} from "../../../api/chatAPI";
import {UserData} from "../../../api/authAPI";
import ChatController from "../../../controllers/chat";

export type MessagesType = {
	chatId: number;
	message: ChatMessageProps;
	chatUsers: UserData[];
};

export class Messages extends Block{
	constructor(props: MessagesType) {
		super(props);
		console.log(props);
	}

	componentDidMount(props: MessagesType | undefined): typeof props {
		this.scrollMessages(this.getContent());
		if (props?.chatId) {
			const searchUsers = ChatController.getChatUsers({chatId: props.chatId as number});
			return {searchUsers, ...props} as MessagesType;
		}
	}

	static getName(): string {
		return "Messages";
	}

	//messages: this.element;
	scrollMessages(element: Element): void {
		const messages = element;
		console.log(messages);
		const shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
		console.log(shouldScroll, messages.scrollHeight, messages.scrollTop, messages.clientHeight);
		if (!shouldScroll) {
			messages.scrollTop = messages.scrollHeight;
		}
	}

	render(): string {
		//language=hbs
		return `
            <div class="main--page-chat-body-messages" data-messages={{chat.messages.length}}>
                {{#each chat.messages}}
                    {{{ChatMessage message=this user=../user chatId=../chatId chatUsers=../chatUsers}}}
                {{/each}}
            </div>
        `;
	}

}
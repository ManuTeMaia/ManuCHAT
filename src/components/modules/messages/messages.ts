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
		if (props?.chatId) {
			const searchUsers = ChatController.getChatUsers({chatId: props.chatId as number});
			return {searchUsers, ...props} as MessagesType;
		}
	}
	componentDidUpdate(): boolean {
		return false;
	}
	static getName(): string {
		return "Messages";
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
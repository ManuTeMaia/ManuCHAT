import Block from "../../../utils/Block";
import {ChatMessageProps} from "../../../api/chatAPI";
import {UserData} from "../../../api/authAPI";

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

	componentDidUpdate(): boolean {
		return false;
	}

	static getName(): string {
		return "Messages";
	}

	scrollMessages(): void {
		const messages = document.querySelector(".main--page-chat-body-messages");
		//const messages = this.element;
		console.log(messages, messages.lastChild.previousSibling);
		messages.lastChild.previousSibling.scrollIntoView(true);
	}

	render(): string {
		//this.scrollMessages();
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
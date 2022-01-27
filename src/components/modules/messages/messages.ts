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
		this.scrollMessages(this.element as HTMLElement);
		return false;
	}

	static getName(): string {
		return "Messages";
	}

	scrollMessages(element: HTMLElement): void {
		const lastMessage = element.lastChild?.previousSibling as HTMLElement;
		if (lastMessage) {
			lastMessage.scrollIntoView(true);
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
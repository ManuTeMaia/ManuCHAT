import Block from "../../../utils/Block";
import {ChatMessage} from "../../../api/chatAPI";

export type MessagesType = {
	message: ChatMessage;
};

export class Messages extends Block{
	constructor(props: MessagesType) {
		super(props);
		console.log(props);
	}

	static getName(): string {
		return "Messages";
	}

	render(): string {
		//language=hbs
		return `
            <div class="main--page-chat-body-messages" data-messages={{chat.messages.length}}>
                {{#each chat.messages}}
                    {{{ChatMessage user=../user message=this}}}
                {{/each}}
            </div>
        `;
	}

}
import Block from "../../../utils/Block";
import { ChatMessage } from "../../../api/chatAPI";
import { UserData } from "../../../api/authAPI";
import "./chat.pcss";

export interface ChatProps {
	id: number;
	title: string;
	avatar?: string;
	unread_count?: number;
	last_message?: LastMessage;
	messages?: ChatMessage[];
}

interface LastMessage {
	user: UserData;
	time: string;
	content: string;
}

class ChatPage extends Block {
	constructor(props: ChatProps) {
		super(props);
	}

	render(): string {
		//language=hbs
		return `
            <div class="main--page-wrap">
                <div class="chat--list-wrap">
                        {{{ChatProfileCard}}}
                    <div class="chat--list-chats">
                            {{#each chats}}
                                {{{ChatListCard chat=this onClick=../onChatSelect}}}
                            {{/each}}
                    </div>
                </div>
                <div class="chat--wrap">Выберите чат чтобы отправить сообщение
                </div>
            </div>
		`;
	}
}
export default ChatPage;
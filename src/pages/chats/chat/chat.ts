import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import ChatController from "../../../controllers/chat";
import ChatWS, {MessageResponse} from "../../../api/chatWS";
import { ChatMessage } from "../../../api/chatAPI";
import { UserData } from "../../../api/authAPI";
import {isArray} from "../../../helpers/isArray";
import {UserProps} from "../../profile/user-profile/user-profile";
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
		console.log(props);
	}
	router = new Router();
	ws = new ChatWS();

	onMessage = (response: MessageResponse): void => {
		ChatController.addMessage(response.content);
		const totalMessages = isArray(response.content) ? response.content.length : 1;
		this.ws?.increaseOffsetBy(totalMessages);
	};

	onChatClick = (userId: number, chatId: number, token: string): void => {
		ChatController.setChat(chatId);
		if (!this.ws) {
			this.ws = new ChatWS();
		}
		this.ws.shutdown();
		const path = `/${userId}/${chatId}/${token}`;
		this.ws.setup(path, this.onMessage);
	};

	getStateFromProps(props: UserProps): void {
		this.state = {
			avatar: props.user.avatar !== null ?`https://ya-praktikum.tech/api/v2/resources${props.user.avatar}` : "/noimage.png",
			onChatSelect: async (e: Event, chat: ChatProps) => {
				e.preventDefault();
				const response = await ChatController.getToken({ chatId: chat.id });
				if (response?.token) {
					this.router.go(`/chat/?chatid=${chat.id}`);
					this.onChatClick(this.props.user.id, chat.id, response.token);
					}
				},
		};
	}

	render(): string {
		//language=hbs
		return `
            <div class="main--page-wrap">
                <div class="chat--list-wrap">
	                {{#if avatar}}
                        {{{ChatProfileCard avatar=avatar}}}
	                {{else}}
        				{{{ChatProfileCard}}}
	                {{/if}}
                    <div class="chat--list-chats">
                            {{#each chats}}
                                {{{ChatListCard chat=this imageSrc=../chatAvatar onClick=../onChatSelect}}}
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
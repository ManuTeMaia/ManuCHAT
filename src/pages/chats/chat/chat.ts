import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import ChatController from "../../../controllers/chat";
import "./chat.pcss";
import ChatWS from "../../../api/chatWS";
import {store} from "../../../store";

class ChatPage extends Block {
	router = new Router();
	ws = new ChatWS();

	getStateFromProps(): void {
		this.state = {
			onChatSelect: () => {
				console.log("test ref "+this.refs.chatCard);
			}
		};
	}

	async componentDidMount() {
		//this.ws = new ChatWS();
		await ChatController.getChatList();
		store.on("changed", () => this.eventBus.emit("flow:render"));

	}

	render(): string {
		//console.log(this.props.chats);
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
                                {{{ChatListCard chat=this onClick=this.onChatSelect ref=this.chatCard}}}
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
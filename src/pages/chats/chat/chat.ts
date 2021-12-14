import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import ChatController from "../../../controllers/chat";
import "./chat.pcss";
import ChatWS from "../../../api/chatWS";

class ChatPage extends Block {
	router = new Router();
	ws = new ChatWS();

	getStateFromProps(): void {

		//const chatCards = chats;

		this.state = {
		};
	}

	async componentDidMount() {
		//this.ws = new ChatWS();
		const chats = await ChatController.getChatList();

	}

	render(): string {
		console.log(chats);
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
                                {{{ChatListCard chat=this}}}
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
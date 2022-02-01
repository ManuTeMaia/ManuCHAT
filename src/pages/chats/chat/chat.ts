import Block from "../../../utils/Block";
import "./chat.pcss";
import {ChatProps} from "../../../components/modules/chat-list/chat-list";


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
	                {{{ChatList chats=this}}}
                </div>
	            <div class="chat--wrap">
		            <div>
			            Выберите чат чтобы отправить сообщение <br />
		            	или создайте новый чат, нажав на иконку <span class="icon-in-text"><i class="ch-chat-new"></i></span> на боковой панели.
	            	</div>
                </div>
            </div>
		`;
	}
}
export default ChatPage;
import Block from "../../../utils/Block";
import "./chat-list.pcss";
import Router from "../../../utils/Router";
import {UserData} from "../../../api/authAPI";
import {ChatMessageProps} from "../../../api/chatAPI";

export interface ChatProps {
    id: number;
    title: string;
    avatar?: string;
    unread_count?: number;
    last_message?: LastMessage;
    messages?: ChatMessageProps[];
}

interface LastMessage {
    user: UserData;
    time: string;
    content: string;
}

export class ChatList extends Block<ChatProps>{
    router = new Router();

    constructor(props: ChatProps) {
        super(props);
    }

    static getName(): string {
        return "ChatList";
    }

    render(): string {
        //language=hbs
        return `
            <div class="chat--list-chats">
                {{#each chats}}
                    {{{ChatListCard chat=this}}}
                {{/each}}
            </div>
        `;
    }
}
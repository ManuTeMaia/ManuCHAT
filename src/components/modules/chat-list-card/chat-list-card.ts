import Block from "../../../utils/Block";
import "./chat-list-card.pcss";
import { ChatProps } from "../../../pages/chats/chat/chat";
import ChatController from "../../../controllers/chat";
import Router from "../../../utils/Router";
import ChatWS, {MessageResponse} from "../../../api/chatWS";
import {isArray} from "../../../helpers/isArray";
import {UserData} from "../../../api/authAPI";

type ChatCardType = {
    chat: ChatProps;
    user: UserData;
    time: string;
    title:string;
    unread_count?: number;
    onClick: (e: Event, chat: ChatProps) => void;
};

export class ChatListCard extends Block {
    router = new Router();
    ws = new ChatWS();

    constructor(props: ChatCardType) {
        super({ ...props,
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    const response = await ChatController.getToken({ chatId: props.chat.id });
                    if (response?.token) {
                        this.router.go(`/chat/?chatid=${props.chat.id}`);
                        this.onChatClick(props.user.id, props.chat.id, response.token);
                    }
                },
            }
        });
    }

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

    static getName(): string {
        return "ChatListCard";
    }

    render(): string {
        //language=hbs
        return `
            <div class="chat--list-card-wrap chat-{{chat.id}}">
                <div class="avatar-wrap">
                    <img
                        {{#if chat.avatar}}
                        src="https://ya-praktikum.tech/api/v2/resources{{chat.avatar}}"
                        {{else}}
                        src="/noimage.png"
                        {{/if}}
                        alt="{{chat.title}}"
                    >
                </div>
                <div class="chat--list-card-time">{{chat.last_message.time}}</div>  
                <div class="chat--list-card-text">
                    <div class="chat--list-card-title">{{chat.title}}</div>
                    <div class="chat--list-card-lastmessage">
                        {{#if chat.last_message}}
                            {{#if (self_message chat.last_message.user.login user.login)}}
                                <span>Вы: </span>
                            {{/if}}
                            {{chat.last_message.content}}
                        {{else}}
                            Нет сообщений
                        {{/if}}</div>
                </div> 
                {{#if chat.unread_count}}<div class="chat--list-card-unread">{{{chat.unread_count}}}</div>{{/if}}
            </div>
        `;
    }
}
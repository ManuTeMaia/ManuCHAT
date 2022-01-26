import Block from "../../../utils/Block";
import "./chat-list-card.pcss";
import { ChatProps } from "../../../pages/chats/chat/chat";
import Router from "../../../utils/Router";
import {UserData} from "../../../api/authAPI";
import ChatController from "../../../controllers/chat";
import isEqual from "../../../helpers/isEqual";

type ChatCardType = {
    chat: ChatProps;
    user: UserData;
};

export class ChatListCard extends Block {
    router = new Router();

    constructor(props: ChatCardType) {
        super({ ...props,
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    await ChatController.setChat(props.chat.id);
                    this.router.go(`/chat/?chatid=${props.chat.id}`);

                },
            }
        });
    }

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps) {
        return !isEqual(oldProps, newProps);
    }

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
                <div class="chat--list-card-time">{{convert_message_date chat.last_message.time}}</div>  
                <div class="chat--list-card-text">
                    <div class="chat--list-card-title">{{chat.title}}</div>
                    <div class="chat--list-card-lastmessage">
                        {{#if chat.last_message}}
                            {{#if (self_message chat.last_message.user.login user.login)}}
                                <span>Вы: </span>
                            {{else}}
                                <span>{{chat.last_message.user.login}}: </span>
                            {{/if}}
                            {{slice_message chat.last_message.content}}
                        {{else}}
                            Нет сообщений
                        {{/if}}</div>
                </div> 
                {{#if chat.unread_count}}<div class="chat--list-card-unread">{{{chat.unread_count}}}</div>{{/if}}
            </div>
        `;
    }
}
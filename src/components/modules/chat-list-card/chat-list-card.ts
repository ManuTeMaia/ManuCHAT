import Block from "../../../utils/Block";
import "./chat-list-card.pcss";
import Router from "../../../utils/Router";
import {UserData} from "../../../api/authAPI";
import ChatController from "../../../controllers/chat";
import {ChatProps} from "../chat-list/chat-list";
import {RESOURCE_URL} from "../../../common/global-consts";

type ChatCardType = {
    chat: ChatProps;
    user: UserData;
    avatarSrc: string;
    events: { click: (e: Event) => Promise<void> };
};

export class ChatListCard extends Block<ChatCardType> {
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

    protected getStateFromProps(props: ChatCardType): void {

        this.state = {
            avatarSrc: props.chat.avatar !== null ? `${RESOURCE_URL}${props.chat.avatar}` : "/assets/noimage.png",
        };
    }

    static getName(): string {
        return "ChatListCard";
    }

    render(): string {
        //language=hbs
        return `
            <div class="chat--list-card-wrap chat-{{chat.id}}">
                {{{Avatar imageSrc=avatarSrc imageTitle=chat.title}}}
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
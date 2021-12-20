import Block from "../../../utils/Block";
import "./chat-list-card.pcss";

type ChatCardType = {
    time: string;
    title:string;
    unread_count?: number;
    onClick: (e: Event) => void;
};

export class ChatListCard extends Block {
    constructor({onClick, ...props}: ChatCardType) {
        super({events: {click: onClick}, ...props});
    }
    render(): string {
        //language=hbs
        return `
            <div class="chat--list-card-wrap chat-{{chat.id}}">
                {{{Avatar imageSrc=chat.avatar imageTitle=chat.title divClass="chat-list-card chat-card-avatar"}}} 
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
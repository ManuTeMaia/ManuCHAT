import Block from "../../../utils/Block";
import "./chat-list-card.pcss";

type ChatCardType = {
    time: string;
    title:string;
    unread?: number;
};

export class ChatListCard extends Block {
    constructor(props: ChatCardType) {
        super(props);
    }
    render(): string {
        console.log(this.props);
        //language=hbs
        return `
            <div class="chat--list-card-wrap chat-{{chat.id}}">
                {{{Avatar imageSrc=chat.avatar imageTitle=chat.title divClass="chat-list-card chat-card-avatar"}}} 
                <div class="chat--list-card-time">{{chat.last_message.time}}</div>  
                <div class="chat--list-card-text">
                    <div class="chat--list-card-title">{{chats.title}}</div>
                    <div class="chat--list-card-lastmessage">
                        {{#if chat.last_message}}
                            {{#if (self_message chat.last_message.user.login user.login)}}
                                <span>Вы: </span>
                            {{/if}}
                            {{chat.last_message.content}}
                        {{else}}
                            Пусто
                        {{/if}}</div>
                </div> 
                {{#if unread}}<div class="chat--list-card-unread">{{{unread}}}</div>{{/if}}
            </div>
        `;
    }
}
import Block from "../../../utils/Block";
import "./chat-message.pcss";
import {UserData} from "../../../api/authAPI";

type MessageTypes = {
    user: UserData;
    message: ChatMessage;
}
export class ChatMessage extends Block<MessageTypes> {
    constructor(props: MessageTypes) {
        super(props);
        console.log(props);
    }

    static getName(): string {
        return "ChatMessage";
    }

    render():string {
        //language=hbs
        return `
            <div class="message-wrap{{#if (self_message user.id message.user_id)}} mine{{/if}}">
                {{#unless (self_message user.id message.user_id)}}
                    <em>{{user.login}}</em>
                {{/unless}}
                {{message.content}}
                <div class="message-time">
                    {{#if (self_message user.id message.user_id)}}
                        {{#if (message_sended status)}}
                                <i class="ch-sent gray"></i>
                        {{else if (message_recieved status) }}
                                <i class="ch-sent gray"></i>
                        {{else if (message_readed status) }}
                                <i class="ch-sent green"></i>
                        {{/if}}
                    {{/if}}
                    {{convert_message_date message.time}}
                </div>
            </div>
        `;
    }

}
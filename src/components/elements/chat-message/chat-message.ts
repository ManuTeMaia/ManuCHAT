import Block from "../../../utils/Block";
import "./chat-message.pcss";
import {UserData} from "../../../api/authAPI";
import {ChatMessageProps} from "../../../api/chatAPI";

type MessageTypes = {
    user: UserData;
    chatUsers: UserData[];
    message: ChatMessageProps;
    messageUserLogin: string;
}
export class ChatMessage extends Block<MessageTypes> {
    constructor(props: MessageTypes) {
        super(props);

    }
    protected getStateFromProps(props: MessageTypes): void {
        this.state = {
            messageUserLogin: this.getMessageUserData(props.message.user_id, props.chatUsers)
        };
    }

    static getName(): string {
        return "ChatMessage";
    }

    getMessageUserData (messageUserId: number, chatUsers: Array<UserData>): string {
        const MessageUser = (chatUsers as Array<UserData>).filter((user: UserData) => user.id === messageUserId);
        return MessageUser[0].display_name ? MessageUser[0].display_name : MessageUser[0].first_name;
}

    render():string {
        //language=hbs
        return `
            <div class="message-wrap{{#if (self_message user.id message.user_id)}} mine{{/if}}">
                {{#unless (self_message user.id message.user_id)}}
                    <em>{{messageUserLogin}}</em><br />
                {{/unless}}
                {{message.content}}
                <div class="message-time">
                    {{#if (self_message user.id message.user_id)}}
                            <i class="ch-sent green"></i>
                    {{/if}}
                    {{convert_message_date message.time}}
                </div>
            </div>
        `;
    }

}
import Block from "../../../utils/Block";
import "./chat-message.pcss";

type MessageTypes = {
    isMine?: boolean;
    content: string,
    isRecieved?: boolean,
    time: string
}
export class ChatMessage extends Block {
    constructor(props: MessageTypes) {
        super(props);
    }

    static getName(): string {
        return "ChatMessage";
    }

    render():string {
        //language=hbs
        return `
            <div class="message-wrap{{#if isMine}} mine{{/if}}">
                {{content}}
                <div class="message-time{{#if isRecieved}} recieved{{/if}}">
                    {{#if isMine}}
                        {{#if isRecieved}}
                            <i class="ch-sent"></i>
                        {{/if}}
                    {{/if}}
                    {{time}}
                </div>
            </div>
        `;
    }

}
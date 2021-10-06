import Block from "../../utils/Block";
import template from "./chat-message.hbs";
import "./chat-message.pcss";

type MessageTypes = {
    isMine?: boolean;
    content: string,
    isRecieved?: boolean,
    time: string
}
class ChatMessage extends Block <MessageTypes> {
    constructor(props:MessageTypes) {
        super(props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default ChatMessage;
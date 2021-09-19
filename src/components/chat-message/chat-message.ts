import Block from "../../utils/Block";
import template from "./chat-message.hbs";
import "./chat-message.pcss";

class ChatMessage extends Block {
    constructor(props:Props) {
        super("avatar", props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default ChatMessage;
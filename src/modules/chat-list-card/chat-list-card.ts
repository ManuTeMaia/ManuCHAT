import Block from "../../utils/Block";

import Avatar from "../../components/avatar/avatar";
import template from "./chat-list-card.hbs";
import "./chat-list-card.pcss";

class ChatListCard extends Block {
    constructor(props:Props) {
        super("div", props);
    }
    render():DocumentFragment{
        const avatar = new Avatar({...this.props});
        
        return this.compile(template, {
            ...this.props,
            avatar:avatar
        });
    }
}

export default ChatListCard;
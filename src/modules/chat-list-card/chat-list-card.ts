import Block from "../../utils/Block";
import Avatar, {AvatarProps} from "../../components/elements/avatar/avatar";
import template from "./chat-list-card.hbs";
import "./chat-list-card.pcss";

type ChatCardType = {
    time: string;
    title:string;
    mine?: string;
    lastMessage: string;
    unread?: number;
};

class ChatListCard extends Block {
    constructor(props: AvatarProps | ChatCardType) {
        super(props);
    }
    render():DocumentFragment{
        const avatar = new Avatar({...this.props});
        
        return this.compile(template, {
            ...this.props,
            avatar
        });
    }
}

export default ChatListCard;
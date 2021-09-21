import Block from "../../utils/Block";
import SearchInput from "../../components/inputs/search-input";
import Avatar from "../../components/avatar/avatar";
import template from "./chat-list-profile-card.hbs";
import "./chat-list-profile-card.pcss";

class ChatProfileCard extends Block {
    constructor(props:Props) {
        super("div", props);
    }
    render():DocumentFragment{
        const search = new SearchInput({...this.props});
        const avatar = new Avatar({...this.props});
        
        return this.compile(template, {
            avatar:avatar,
            search:search
        });
    }

}
export default ChatProfileCard;
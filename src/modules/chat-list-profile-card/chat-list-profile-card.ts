import Block from "../../utils/Block";
import TextInput from "../../components/inputs/text-input";
import Avatar from "../../components/avatar/avatar";
import template from "./chat-list-profile-card.hbs";
import "./chat-list-profile-card.pcss";
import pageRender from "../../helpers/PageRender";

class ChatProfileCard extends Block {
    constructor(props:TextInput | Avatar) {
        super("div", props);
    }
    render():DocumentFragment{
        const avatar = new Avatar({
                imageSrc: "/noimage.png",
                divClass: "chat-list-profile-card profile-card-avatar",
                imageTitle: "Изменить данные профиля",
                events: {
                    click: () => pageRender(".chat--wrap", "profile")
                }

            });
        const search = new TextInput({
            type: "search",
            class: "chat-list-profile-card profile-card-search",
            name: "search",
            placeholder: "Поиск"});
        
        return this.compile(template, {
            avatar,
            search
        });
    }

}
export default ChatProfileCard;
import Block from "../../utils/Block";
import TextInput from "../../components/inputs/text-input";
import Avatar from "../../components/avatar/avatar";
import template from "./chat-list-profile-card.hbs";
import "./chat-list-profile-card.pcss";
import Router from "../../utils/Router";

class ChatProfileCard extends Block {
    router: Router;

    constructor(props:TextInput | Avatar) {
        super(props);
        this.router = new Router();
    }

    render():DocumentFragment{
        const avatar = new Avatar({
                imageSrc: "/noimage.png",
                divClass: "chat-list-profile-card profile-card-avatar",
                imageTitle: "Изменить данные профиля",
                events: {
                    click: () => this.router.go("/settings")
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
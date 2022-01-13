import Block from "../../../utils/Block";
import "./user-list-card.pcss";
import { ChatProps } from "../../../pages/chats/chat/chat";
import {UserData} from "../../../api/authAPI";

type UserCardType = {
    user: UserData;
    chat: ChatProps;
    onClick: (e: Event, chat: ChatProps, user: UserData) => void;
};

export class UserListCard extends Block {
    constructor({onClick, ...props}: UserCardType) {
        super({events: { click: (e: Event) => onClick?.(e, props.chat, props.user) }, ...props});
    }

    render(): string {

        //language=hbs
        return `
            <div>
                <input type="checkbox" id={{user.id}} name={{user.id}}>
                <label for={{user.id}}>{{user.login}}: {{user.first_name}}</label>
            </div>
        `;
    }
}
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
            <div class="chat--user-card-wrap user-{{user.id}}">
                <div class="avatar-wrap">
                    <img
                        {{#if user.avatar}}
                        src="https://ya-praktikum.tech/api/v2/resources{{user.avatar}}"
                        {{else}}
                        src="/noimage.png"
                        {{/if}}
                        alt="{{user.login}}"
                    >
                </div>
                <div class="chat--list-card-text">
                    <div class="chat--list-card-title">{{user.login}}: {{user.first_name}}</div>
            </div>
        `;
    }
}
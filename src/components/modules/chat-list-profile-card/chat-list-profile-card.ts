import Block from "../../../utils/Block";
import "./chat-list-profile-card.pcss";
import Router from "../../../utils/Router";
import {AvatarProps} from "../../elements/avatar/avatar";
import NewChatPopup from "../chat-popup";
import {TextInputType} from "../../elements/inputs/text-input";

export type ProfileCardType = {
	avatar: AvatarProps;
	newChatPopup?: NewChatPopup;
	search: TextInputType;
};

export class ChatProfileCard extends Block {
	router = new Router();

	constructor(props: ProfileCardType) {
		super(props);
	}

	getStateFromProps():void {
		this.state = {
			onPopupOpen: (e: Event) => {
			e.preventDefault();
			const newChat = this.refs.newChat;
				newChat.classList.remove("hidden");
			},
			goProfile: () => this.router.go("/settings"),
		};
	}

	render(): string {

		//language=hbs
		return `
			<div class="chat--list-profile-card-wrap">
				<div class="chat--list-profile-card-actions">
					{{{Avatar imageSrc=avatar imageTitle="Изменить данные профиля" divClass="chat-list-profile-card profile-card-avatar" onClick=goProfile}}}
						<div class="chat--list-profile-card-actions card-actions-icons">
							{{{Button type="button" buttonIcon="ch-chat-new" buttonClass="chat-list-profile-card profile-card-action" onClick=onPopupOpen}}}
                            {{{Button type="button" buttonIcon="ch-cogs" buttonClass="chat-list-profile-card profile-card-action"}}}
						</div>
                    {{{NewChatPopup popupName="newChat" popupTitle="Создать новый чат" ref="newChat"}}}
					</div>
				{{{TextInput type="search" name="search" placeholder="Поиск" class="chat-list-profile-card profile-card-search"}}}
			</div>
		`;
	}

}
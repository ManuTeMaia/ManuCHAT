import Block from "../../../utils/Block";
import "./chat-list-profile-card.pcss";
import Router from "../../../utils/Router";
import NewChatPopup from "../chat-popup";
import {TextInputType} from "../../elements/inputs/text-input";
import {UserData} from "../../../api/authAPI";
import {RESOURCE_URL} from "../../../common/global-consts";

export type ProfileCardType = {
	newChatPopup?: NewChatPopup;
	search: TextInputType;
	user: UserData;
	avatarSrc: string;
	onPopupOpen: (e: Event) => void;
	goProfile: (e: Event) => void;
};

export class ChatProfileCard extends Block<ProfileCardType> {
	router = new Router();

	constructor(props: ProfileCardType) {
		super(props);
	}

	getStateFromProps(props: ProfileCardType):void {

		this.state = {
			avatarSrc: props.user && props.user.avatar !== null ?`${RESOURCE_URL}${props.user.avatar}` : "/assets/noimage.png",
			onPopupOpen: (e: Event) => {
			e.preventDefault();
			const newChat = this.refs.newChat;
				newChat.classList.remove("hidden");
			},
			goProfile: () => this.router.go("/settings"),
		};
	}

	static getName(): string {
		return "ChatProfileCard";
	}

	render(): string {

		//language=hbs
		return `
			<div class="chat--list-profile-card-wrap">
				<div class="chat--list-profile-card-actions">
					{{{Avatar imageSrc=avatarSrc imageTitle="Изменить данные профиля" divClass="chat-list-profile-card profile-card-avatar" onClick=goProfile}}}
						<div class="chat--list-profile-card-actions card-actions-icons">
							{{{Button type="button" buttonIcon="ch-chat-new" buttonClass="chat-list-profile-card profile-card-action" onClick=onPopupOpen}}}
                            {{{Button type="button" buttonIcon="ch-cogs" buttonClass="chat-list-profile-card profile-card-action"}}}
						</div>
                    {{{NewChatPopup popupName="newChat" popupTitle="Создать новый чат" ref="newChat"}}}
					</div>
				{{{TextInput type="search" title="Заглушка" name="search" placeholder="Поиск" class="chat-list-profile-card profile-card-search"}}}
			</div>
		`;
	}

}
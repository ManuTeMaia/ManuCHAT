import Block from "../../utils/Block";
import TextInput from "../../components/elements/inputs/text-input";
import Avatar from "../../components/elements/avatar/avatar";
import template from "./chat-list-profile-card.hbs";
import { store } from "../../store";
import "./chat-list-profile-card.pcss";
import Router from "../../utils/Router";
import Link from "../../components/elements/link/link";
import PopupWrapper from "../popup-wrapper/popup-wrapper";

class ChatProfileCard extends Block {
	router = new Router();

	getStateFromProps() {
		this.state = {
			//
		};
	}

	render():DocumentFragment {
		const user = store.getState().user;

		let avatarSrc = "/noimage.png";
		if (user.profile.avatar !== null) {
			avatarSrc = `https://ya-praktikum.tech/api/v2/resources${user.profile.avatar}`;
		}

		const avatar = new Avatar({
			imageSrc: avatarSrc,
			divClass: "chat-list-profile-card profile-card-avatar",
			imageTitle: "Изменить данные профиля",
			events: {
				click: () => this.router.go("/settings")
			}

		});

		const newChatPopup = new PopupWrapper({
			popupName: "newChat",
			popupTitle: "Создать новый чат",
			popupChoice: "newChatPopup"
		});

		const newChatLink = new Link({
			text: "",
			url: "",
			class: "chat-list-profile-card profile-card",
			linkIcon: "ch-chat",
			events: {
				click: (e: Event) => {
					e.preventDefault();
					document.querySelector(`[data-popup=${newChatPopup.props.popupName}]`)?.classList.remove("hidden");
				}
			}
		});
		const search = new TextInput({
			type: "search",
			class: "chat-list-profile-card profile-card-search",
			name: "search",
			placeholder: "Поиск"});

		return this.compile(template, {
			avatar,
			newChatPopup,
			newChatLink,
			search
		});
	}

}
export default ChatProfileCard;
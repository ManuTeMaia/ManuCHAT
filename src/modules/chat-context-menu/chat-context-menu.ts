import Block from "../../utils/Block";
import template from "./chat-context-menu.hbs";
import "./chat-context-menu.pcss";
import Link from "../../components/links/links";

class ChatContextMenu extends Block {
	constructor(props:Link) {
		super(props);
	}
	render():DocumentFragment {
		const menuLinks = [
			{
				url:"",
				class:"context-menu-chat add-new-user",
				text:"Добавить пользователя",
				linkIcon: "ch-add-user",
			},
			{
				url:"",
				class:"context-menu-chat delete-user",
				text:"Удалить пользователя",
				linkIcon: "ch-delete-user",
			},
			{
				url:"",
				class:"context-menu-chat delete-chat",
				text:"Удалить чат",
				linkIcon: "ch-garbage",
			},

		].map((link) => new Link(link));

		return this.compile(template, {menuLinks});
	}
}

export default ChatContextMenu;
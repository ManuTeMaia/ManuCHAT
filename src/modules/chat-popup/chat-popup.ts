import Block from "../../utils/Block";
import InputWrapper from "../inputs-wrapper/inputs-wrapper";
import Button from "../../components/buttons/submit-button";
import template from "./chat-popup.hbs";
import "./chat-popup.pcss";
//import UserController from "../../controllers/user";


class NewChatPopup extends Block {
	constructor(props: any) {
		super({
			props,
			events: {
				submit: async (e: Event) => {
					e.preventDefault();
					const formData = new FormData(e.target as HTMLFormElement);
					//await UserController.updateAvatar(formData);
				}
			}
		});
	}

	render():DocumentFragment {
		const nameInput = new InputWrapper({
			type: "text",
			label: "Название чата",
			name: "title",
			class: "new-chat-form-input",
			placeholder: "Название...",
			validationType: "notnull",
			required: true
		});

		const create = new Button({
			buttonClass: "new-chat-submit",
			name: "new-chat-submit",
			title: "Создать чат"
		});

		return this.compile(template, {
			popupClass: "new-chat",
			nameInput,
			create
		});
	}
}
export default NewChatPopup;
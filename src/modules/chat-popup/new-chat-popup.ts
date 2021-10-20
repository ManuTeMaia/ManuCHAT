import Block from "../../utils/Block";
import InputWrapper from "../inputs-wrapper/inputs-wrapper";
import Button from "../../components/buttons/submit-button";
import ChatController from "../../controllers/chat";
import {getFormData} from "../../helpers/formActions";
import Validator from "../../utils/Validator";
import template from "./new-chat-popup.hbs";
import "./new-chat-popup.pcss";

class NewChatPopup extends Block {
	constructor(props: any) {
		super({
			props,
			events: {
				submit: async (e: Event) => {
					e.preventDefault();
					const data: any = {};
					const refs = getFormData(e.target as HTMLFormElement);
					Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
						data[key] = input;
					});
					const hasErrors = document.querySelector("[error-for]");
					new Validator().formValidate();
					if (!hasErrors) {
						await ChatController.createChat(data);
					}
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
			placeholder: "Мой новый чат...",
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
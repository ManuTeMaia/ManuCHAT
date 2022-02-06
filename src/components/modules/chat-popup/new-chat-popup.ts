import Block from "../../../utils/Block";
import ChatController from "../../../controllers/chat";
import {getFormData} from "../../../helpers/formActions";
import Validator from "../../../utils/Validator";
import "./new-chat-popup.pcss";

export class NewChatPopup extends Block {
	validator = new Validator();

	protected getStateFromProps(): void {
		const onBlur = (e: Event) => {
			console.log(e.currentTarget);
			this.validator.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			formInputs:
				{
					label: "Название чата",
					name: "title",
					input:
						{
							name: "title",
							type: "text",
							placeholder: "Название...",
							validationType: "notnull",
							required: true,
							onChange: onBlur
						}
				},

			popupClose: (e: Event) => {
				e.preventDefault();
				document.querySelector("#newChat")?.classList.add("hidden");
			},

			createChat: async (e: Event) => {
				e.preventDefault();
				const data: any = {};
				const form = document.querySelector("#newChatForm");
				const refs = getFormData(form as HTMLFormElement);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[key] = input;
				});
				const hasErrors = document.querySelector("[error404-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await ChatController.createChat(data);
					document.querySelector("#newChat")?.classList.add("hidden");
				}
			}
		};
	}

	static getName(): string {
		return "NewChatPopup";
	}

	render(): string {
		//language=hbs
		return `
            <div class="popup hidden" id="newChat" data-popup="{{popupName}}">
                <div class="popup-overlay"></div>
                <div class="popup-wrapper">
                    {{{Button type="button" buttonIcon="ch-close" buttonClass="popup-close" onClick=popupClose}}}
                    <h4>Создать новый чат</h4>
					<div class="popup-content newChat">
						<form action="" class="create-new-chat-form" id="newChatForm">
		                    {{{InputWrapper label=formInputs.label name=formInputs.name input=formInputs.input}}}
							{{{Button buttonClass="new-chat-submit" name="new-chat-submit" title="Создать чат" onClick=createChat}}}
						</form>
					</div>
                </div>
            </div>
		`;

	}
}
import Block from "../../../utils/Block";
import { getFormData } from "../../../helpers/formActions";
import "./chat-body.pcss";
import Validator from "../../../utils/Validator";
import ChatController from "../../../controllers/chat";

export class ChatBodyPage extends Block{
	validator = new Validator();

	protected getStateFromProps() {
		const onBlur = (e: Event) => {
			console.log(e.currentTarget);
			this.validator.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			formInputs:
				{
					name: "message",
					input:
						{
							name: "message",
							type: "text",
							placeholder: "Пишите...",
							validationType: "notnull",
							required: true,
							onChange: onBlur
						}
				},
			sendMessage: async (e: Event) => {
				e.preventDefault();
				const data: any = {};
				const form = document.querySelector("#chatMessageForm");
				const refs = getFormData(form as HTMLFormElement);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[key] = input;
				});
				const hasErrors = document.querySelector("[error-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await ChatController.addMessage(data);
				}
			}
		};
	}

	render(): string {
		// language=hbs
		return `
		<div class="main--page-chat-body-wrap">
    <div class="main--page-chat-body-header">
        <div class="main--page-chat-body-header-chatname">
        {{{Avatar imageSrc=chat.avatar imageTitle=chat.title}}}
        {{{Heading title=chat.title}}}
        </div>
        <i class="ch-more"></i>
        {{{contextMenu}}}
    </div>
    <div class="main--page-chat-body-messages">
        {{#each chatMessages}}
            {{{ChatMessage this}}}
        {{/each}}
    </div>
    <div class="main--page-chat-body-footer">
        <i class="ch-attachment"></i>
        <form action="" class="create-new-chat-form" id="chatMessageForm">
            {{{InputWrapper label=formInputs.label name=formInputs.name input=formInputs.input}}}
            {{{Button buttonClass="main--page-chat-sendt" name="send-submit" title="Отправить" onClick=sendMessage}}}
        </form>
    </div>
</div>
		`;
}

}
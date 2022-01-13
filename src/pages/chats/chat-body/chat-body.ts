import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import ChatWS from "../../../api/chatWS";
import {ChatProps} from "../chat/chat";
import ChatController from "../../../controllers/chat";
import {DeleteChatData} from "../../../api/chatAPI";
import Router from "../../../utils/Router";
import "./chat-body.pcss";

interface ChatBodyProps {
	chat: ChatProps;
}

export class ChatBodyPage extends Block {

	constructor(props: ChatBodyProps) {
		super(props);
		console.log(props);
	}

	router = new Router();
	validator = new Validator();
	ws = new ChatWS();


	protected getStateFromProps(props: ChatBodyProps) {

		const onBlur = (e: Event) => {
			this.validator.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			avatarSrc: props.chat.avatar!==null ? `https://ya-praktikum.tech/api/v2/resources${props.chat.avatar}` : "/noimage.png",
			formInputs:
				{
					name: "message",
					input:
						{
							name: "message",
							type: "text",
							placeholder: "Пишите...",
							inputClass: "message-input-form-input",
							validationType: "notnull",
							required: true,
							onChange: onBlur
						}
				},
			onChatOptions: (e: Event) => {
				e.preventDefault();
				document.querySelector(".chat-options")?.classList.toggle("hidden");
			},
			onAddUser: (e: Event) => {
				e.preventDefault();
				const addUserPopup = this.refs.addChatUser;
				addUserPopup.classList.remove("hidden");
			},
			onDeleteUser: (e: Event) => {
				e.preventDefault();
				const deleteUserPopup = this.refs.deleteChatUser;
				deleteUserPopup.classList.remove("hidden");
			},
			onDeleteChat: async (e: Event) => {
				e.preventDefault();
				const delConfirm = confirm("Вы действительно хотите удалить этот чат?");
				if (delConfirm) {
					const chatId = { chatId: props.chat.id } as DeleteChatData;
					this.router.go("/chats");
					await ChatController.deleteChat(chatId);
				}
			},
			onMessageSend: (e: Event, message: string) => {
				e.preventDefault();
				this.ws?.sendMessage(message);
			},
			setAvatar: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=uploadAvatar]")?.classList.remove("hidden");
			}
		};
	}

	render(): string {

		// language=hbs
		return `
		<div class="main--page-chat-body-wrap">
   			 <div class="main--page-chat-body-header">
		        <div class="main--page-chat-body-header-chatname">
			        {{{AvatarPopup popUpName="uploadChatAvatar" popUpTitle="Загрузить аватар" chatId=chat.id}}}
		            {{{Avatar imageSrc=avatarSrc imageTitle=chat.title onClick=setAvatar}}}
		            {{{Heading text=chat.title}}}
		        </div>
                 {{{Button type="button" buttonClass="main--page-chat-options" buttonIcon="ch-more" name="chat-options" title="" onClick=onChatOptions ref="menuButton"}}}
                 <div class="context-menu-wrapper chat-options hidden">
                     {{{ChatUserPopup popUpName="addChatUser" popUpTitle="Добавить пользователя" buttonName="add-chat-user" buttonTitle="Добавить" chatId=chat.id  ref="addChatUser"}}}
                     {{{ChatUserPopup popUpName="deleteChatUser" popUpTitle="Удалить пользователя" buttonName="delete-chat-user" buttonTitle="Удалить" chatId=chat.id ref="deleteChatUser"}}}
                     {{{Button type="button" buttonClass="main--page-user-add aslink" buttonIcon="ch-user-add" name="add-user" title="Добавить пользователя" onClick=onAddUser}}}
                     {{{Button type="button" buttonClass="main--page-user-add aslink" buttonIcon="ch-user-delete" name="delete-user" title="Удалить пользователя" onClick=onDeleteUser}}}
                     {{{Button type="button" buttonClass="main--page-delete-chat aslink" buttonIcon="ch-trash" name="delete-chat" title="Удалить чат" onClick=onDeleteChat}}}
                 </div>
    		</div>
	    <div class="main--page-chat-body-messages">
	        {{#each chatMessages}}
	            {{{ChatMessage this}}}
	        {{/each}}
	    </div>
	    <div class="main--page-chat-body-footer">
	        <i class="ch-attach"></i>
	        <form action="" class="create-new-message-form" id="chatMessageForm">
	            {{{InputWrapper label=formInputs.label name=formInputs.name input=formInputs.input}}}
	            {{{Button buttonClass="main--page-chat-send" buttonIcon="ch-send" name="send-submit" title="" onClick=onMessageSend}}}
	        </form>
	    </div>
</div>
		`;
}

}
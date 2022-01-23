import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import ChatWS, {MessageResponse} from "../../../api/chatWS";
import {ChatProps} from "../chat/chat";
import ChatController from "../../../controllers/chat";
import {DeleteChatData} from "../../../api/chatAPI";
import Router from "../../../utils/Router";
import "./chat-body.pcss";
import {getFormData} from "../../../helpers/formActions";
import {isArray} from "../../../helpers/isArray";
import {UserData} from "../../../api/authAPI";

interface ChatBodyProps {
	chat: ChatProps;
	user: UserData;
	messages: [];
}

export class ChatBodyPage extends Block {

	constructor(props: ChatBodyProps) {
		super(props);
		//console.log(props.chat);
	}

	router = new Router();
	validator = new Validator();
	ws = new ChatWS();

	protected getStateFromProps(props: ChatBodyProps) {
		this.state = {
			messages: props.chat.messages,
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
						}
				},
			onChatOptions: (e: Event) => {
				e.preventDefault();
				document.querySelector(".chat-options")?.classList.toggle("hidden");
			},
			onAddUser: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=addChatUser]")?.classList.toggle("hidden");
			},
			onDeleteUser: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=deleteChatUser]")?.classList.toggle("hidden");
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

			onMessageSend: (e: Event) => {
				e.preventDefault();
				const form = document.querySelector("#chatMessageForm");
				const fields = getFormData(form as HTMLFormElement);
				const message = fields.message as string;
				const hasErrors = document.querySelector("[error-for]");
				this.validator.formValidate();
				if(!hasErrors) {
					this.ws.sendMessage(message);

					(this.refs.message.querySelector("input") as HTMLInputElement).value = "";
				}

			},

			setAvatar: (e: Event) => {
				e.preventDefault();
				const uploadChatAvatar = this.refs.uploadChatAvatar;
				uploadChatAvatar.classList.remove("hidden");
			}
		};
		console.log(this.state);
	}

	componentDidMount(props: ChatBodyProps): typeof props {
		ChatController.setChat(props.chat.id);
		this.onChatSetup(props);
		return props;
	}

	componentDidUpdate(): boolean {
		return true;
	}

	onMessage = (response: MessageResponse): void => {
		ChatController.addMessage(response.content);
		const totalMessages = isArray(response.content) ? response.content.length : 1;
		this.ws?.increaseOffsetBy(totalMessages);
	};

	async onChatSetup(props: ChatBodyProps) {
		const response = await ChatController.getToken({ chatId: props.chat.id });
		if (response?.token) {
			if (!this.ws) {
				this.ws = new ChatWS();
			}
			this.ws.shutdown();
			const path = `/${props.user.id}/${props.chat.id}/${response.token}`;
			this.ws.setup(path, this.onMessage);
		}
	}

	render(): string {

		// language=hbs
		return `
		<div class="main--page-chat-body-wrap">
   			 <div class="main--page-chat-body-header">
		        <div class="main--page-chat-body-header-chatname">
			        {{{AvatarPopup popUpName="uploadChatAvatar" popUpTitle="Загрузить аватар" chatId=chat.id ref="uploadChatAvatar"}}}
		            {{{Avatar imageSrc=avatarSrc imageTitle=chat.title onClick=setAvatar}}}
		            {{{Heading text=chat.title}}}
		        </div>
               {{{Button type="button" buttonClass="main--page-chat-options" buttonIcon="ch-more" name="chat-options" title="" onClick=onChatOptions ref="menuButton"}}}
                 <div class="context-menu-wrapper chat-options hidden">
                     {{{Button type="button" buttonClass="main--page-user-add aslink" buttonIcon="ch-user-add" name="add-user" title="Добавить пользователя" onClick=onAddUser}}}
                     {{{Button type="button" buttonClass="main--page-user-add aslink" buttonIcon="ch-user-delete" name="delete-user" title="Удалить пользователя" onClick=onDeleteUser}}}
                     {{{Button type="button" buttonClass="main--page-delete-chat aslink" buttonIcon="ch-trash" name="delete-chat" title="Удалить чат" onClick=onDeleteChat}}}
                 </div>
                 {{{AddUserPopup chatId=chat.id  ref="addChatUser"}}}
                 {{{DeleteUserPopup chatId=chat.id ref="deleteChatUser"}}}
             </div>
		    <div class="main--page-chat-body-messages" data-messages={{chat.messages.length}}>
                {{#each chat.messages}}
                    {{{ChatMessage user=../user message=this}}}
                {{/each}}
		    </div>
		    <div class="main--page-chat-body-footer">
		        <i class="ch-attach"></i>
		        <form action="" class="create-new-message-form" id="chatMessageForm">
		            {{{InputWrapper label=formInputs.label name=formInputs.name input=formInputs.input ref="message"}}}
		            {{{Button buttonClass="main--page-chat-send" buttonIcon="ch-send" name="send-submit" title="" onClick=onMessageSend}}}
		        </form>
		    </div>
		</div>
		`;
	}
}
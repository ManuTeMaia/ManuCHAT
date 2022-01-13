import Block from "../../../utils/Block";
import "./chat-user-popup.pcss";
import UserController from "../../../controllers/user";
import ChatController from "../../../controllers/chat";
import {UserData} from "../../../api/authAPI";


export interface ChatUsersPopupProps {
	popUpName: string;
	popUpTitle: string;
	chatId: number;
	buttonName: string;
	buttonTitle: string;
	searchUser: UserData | undefined;
	search: UserData | undefined;
}

export class ChatUserPopup extends Block<ChatUsersPopupProps> {
	constructor(props: ChatUsersPopupProps) {
		super(props);
	}

	protected getStateFromProps(props: ChatUsersPopupProps) {

		this.state = {
			formInputs:
				{
					label: "Поиск пользователя",
					name: "avatar",
					input:
						{
							type: "search",
							name: "user",
							class: "search-chat-user-form-input",
							placeholder: "Найти пользователя...",
						}
				},

			popupClose: (e: Event) => {
				e.preventDefault();
				document.querySelector(`[data-popup=${props.popUpName}]`)?.classList.add("hidden");
			},

			onUserSearch: async (e: Event) => {

				if(props.popUpName === "addChatUser") {
					const searchString = (e.target as HTMLInputElement).value;
					await UserController.search({ login: searchString });

				} else if (props.popUpName === "deleteChatUser") {
					await ChatController.getChatUsers({chatId: props.chatId});
				}
			},

			chatUserAction: async (e: Event) => {
				e.preventDefault();
				//const form = document.querySelector("#chatUserActions");
				//const formData = new FormData(form as HTMLFormElement);
				if(props.popUpName === "addChatUser") {
					//await ChatController.addUsersToChat(data);
					document.querySelector("[data-popup=addChatUser]")?.classList.add("hidden");
				} else if (props.popUpName === "deleteChatUser") {
					//await ChatController.setAvatar(formData);
					document.querySelector("[data-popup=deleteChatUser]")?.classList.add("hidden");
				}
			}
		};
	}

	render(): string {
		//language=hbs
		return `
            <div class="popup hidden" id="chatUsers" data-popup={{{popUpName}}}>
                <div class="popup-overlay"></div>
                <div class="popup-wrapper">
                    {{{Button type="button" buttonIcon="ch-close" buttonClass="popup-close" onClick=popupClose}}}
                    <h4>{{popUpTitle}}</h4>
					<div class="popup-content">
                        {{{TextInput type="search" name="search" placeholder="Поиск пользователя" class="chat-user-search" onInput=onUserSearch}}}
                        <form id="chatUserActions" action="" class="file-upload-form" enctype="multipart/form-data">
	                            {{#each search}}
                            {{{Checkbox id=this.id name=this.login label=this.first_name }}}
	                            {{/each}}
	                        {{#if chatId}}
	                        	{{{TextInput type="hidden" name="chatId" value=chatId}}}
            				{{/if}}
							{{{Button buttonClass="chat-user-actions-submit" name=buttonName title=buttonTitle onClick=chatUserAction}}}
						</form>
					</div>
                </div>
            </div>
		`;
	}
}
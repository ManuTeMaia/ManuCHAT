import Block from "../../../utils/Block";
import "./chat-user-popup.pcss";
import UserController from "../../../controllers/user";
import ChatController from "../../../controllers/chat";


export interface ChatUsersPopupProps {
	popUpName: string;
	popUpTitle: string;
	chatId: number;
	buttonName: string;
	buttonTitle: string;
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
							placeholder: "Найти пользователя..."
						}
				},

			popupClose: (e: Event) => {
				e.preventDefault();
				document.querySelector("#chatUsers")?.classList.add("hidden");
			},

			chatUserAction: async (e: Event) => {
				e.preventDefault();
				const form = document.querySelector("#chatUserActions");
				const formData = new FormData(form as HTMLFormElement);
					if(props.popUpName === "addUserToChat") {
						await UserController.updateAvatar(formData);

					} else if (props.popUpName === "uploadChatAvatar") {
						await ChatController.setAvatar(formData);
					}
				document.querySelector("[data-popup=chatUsers]")?.classList.add("hidden");
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
					<div class="popup-content addUserToChat">
                        <form id="chatUserActions" action="" class="file-upload-form" enctype="multipart/form-data">
		                    {{{InputWrapper label=formInputs.label name=formInputs.name input=formInputs.input}}}
	                            {{#each foundUser}}
                            {{{UserListCard}}}
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
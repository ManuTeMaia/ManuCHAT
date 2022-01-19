import Block from "../../../utils/Block";
import UserController from "../../../controllers/user";
import ChatController from "../../../controllers/chat";
import {UserData} from "../../../api/authAPI";
import {getFormData} from "../../../helpers/formActions";
import {AddUsersData} from "../../../api/chatAPI";

export interface ChatUsersPopupProps {
	popUpName: string;
	popUpTitle: string;
	chatId: number;
	buttonName: string;
	buttonTitle: string;
	search: UserData | undefined;
}

export class AddUserPopup extends Block<ChatUsersPopupProps> {
	constructor(props: ChatUsersPopupProps) {
		super(props);
	}

	protected getStateFromProps(props: ChatUsersPopupProps) {

		this.state = {
			search: props.search,
			formInputs: {
				label: "Поиск пользователя",
				name: "avatar",
				input: {
					type: "search",
					name: "user",
					class: "search-chat-user-form-input",
					placeholder: "Найти пользователя...",
					}
				},

			popupClose: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=addChatUser]")?.classList.add("hidden");
			},

			onUserSearch: async (e: Event) => {
				const searchString = (e.target as HTMLInputElement).value;
				await UserController.search({ login: searchString });
				document.querySelector("[data-popup=addChatUser]")?.classList.remove("hidden");
			},

			chatUserAdd: async (e: Event) => {
				e.preventDefault();
				const form = document.querySelector("#addChatUser");
				const fields = getFormData(form as HTMLFormElement);
				const users = Object.values(fields);
				const searchData = {chatId: props.chatId, users: users} as AddUsersData;
				await ChatController.addUsersToChat(searchData);
				document.querySelector("[data-popup=addChatUser]")?.classList.remove("hidden");
			}
		};
	}

	static getName(): string {
		return "AddUserPopup";
	}

	render(): string {
		//language=hbs
		return `
            <div class="popup hidden" data-popup="addChatUser">
                <div class="popup-overlay"></div>
                <div class="popup-wrapper">
                    {{{Button type="button" buttonIcon="ch-close" buttonClass="popup-close" onClick=popupClose}}}
                    <h4>Добавить пользователя</h4>
					<div class="popup-content">
                        {{{TextInput type="search" name="search" placeholder="Поиск пользователя" class="chat-user-search" onInput=onUserSearch}}}
                        <form id="addChatUser" action="" class="file-upload-form" enctype="multipart/form-data">
            				{{{SearchResults search=search ref="searchResults"}}}
	                        {{{Button buttonClass="chat-user-actions-submit" name="add-chat-user" title="Добавить" onClick=chatUserAdd}}}
						</form>
	                    {{#if response.error }}
	                    <div class="input-error">{{response.error.reason}}</div>
			            {{/if}}
			            {{#if response.success }}
	                    <div class="input-success">{{response.success.success}}</div>
	                    {{/if}}
					</div>
                </div>
            </div>
		`;
	}
}


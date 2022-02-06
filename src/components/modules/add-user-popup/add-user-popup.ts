import Block from "../../../utils/Block";
import UserController from "../../../controllers/user";
import ChatController from "../../../controllers/chat";
import {UserData} from "../../../api/authAPI";
import {getFormData} from "../../../helpers/formActions";
import {AddUsersData} from "../../../api/chatAPI";

export interface ChatUsersPopupProps {
	chatId: number;
	search: UserData | undefined;
	response: {error?: string, success?: string};
	popupClose: (e: Event) => void;
	onUserSearch: (e: Event) => void;
	chatUserAdd: (e: Event) => void;
}

export class AddUserPopup extends Block<ChatUsersPopupProps> {
	constructor(props: ChatUsersPopupProps) {
		super(props);
	}

	protected getStateFromProps(props: ChatUsersPopupProps): void {
		this.state = {
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
				const fields = getFormData(<HTMLFormElement>form);
				const users = Object.values(fields);
				const searchData = <AddUsersData>{chatId: props.chatId, users: users};
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
            				{{{SearchResults result=this}}}
	                        {{{Button buttonClass="chat-user-actions-submit" name="add-chat-user" title="Добавить" onClick=chatUserAdd}}}
						</form>
	                    {{#if response.error }}
	                    <div class="input-error">{{response.error}}</div>
			            {{/if}}
			            {{#if response.success }}
	                    <div class="input-success">{{response.success}}</div>
	                    {{/if}}
					</div>
                </div>
            </div>
		`;
	}
}


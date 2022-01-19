import {
	AddUsersData,
	ChatAPI,
	ChatMessage,
	ChatTokenData,
	ChatTokenResponse,
	ChatUsersData,
	CreateChatData,
	DeleteChatData,
} from "../api/chatAPI";
import { store } from "../store";
import {addChat, deleteChat, setChats, addMessage, setChat, setChatAvatar} from "../store/chat.store";
import { isArray } from "../helpers/isArray";
import {setResponse} from "../store/respose.store";
import {setUserSearch} from "../store/chat.store";

class ChatController {
	private api: ChatAPI;

	constructor() {
		this.api = new ChatAPI();
	}

	async getChatList() {
		try {
			const chats = await this.api.read();
			store.dispatch(setChats(chats as []));
		} catch (e) {
			console.log(e);
		}
	}

	async createChat(data: CreateChatData): Promise<number | undefined> {
		try {
			const { id } = await this.api.create(data);
			const newChat = { id, title: data.title };
			store.dispatch(addChat(newChat));
			return id;
		} catch (e) {
			console.log(e);
		}
	}

	async setAvatar(data: FormData) {
		try {
			const avatar = await this.api.setAvatar(data);
			store.dispatch(setChatAvatar(avatar));
			store.dispatch(setResponse({ success: "Updated" }));
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async addUsersToChat(data: AddUsersData) {
		try {
			await this.api.update(data);
			store.dispatch(setResponse({ success: "Пользователь(-и) добавлен(-ы)" }));
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async deleteUsersFromChat(data: AddUsersData) {
		try {
			await this.api.deleteUsers(data);
			store.dispatch(setResponse({ success: "Пользователь(-и) удален(-ы)" }));
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async deleteChat(data: DeleteChatData) {
		try {
			await this.api.delete(data);
			store.dispatch(deleteChat(data.chatId));
		} catch (e) {
			console.log(e);
		}
	}

	async getToken(data: ChatTokenData): Promise<ChatTokenResponse | undefined> {
		try {
			return this.api.token(data);
		} catch (e) {
			console.log(e);
		}
	}

	async getChatUsers(data: ChatUsersData) {
		try {
			const users = await this.api.users(data);
			if (users) {
				store.dispatch(setUserSearch(users));
			}

		} catch (e) {
			console.log("Shit happense. Again.");
		}
	}

	setChat(chatId: number) {
		store.dispatch(setChat(chatId));
	}

	addMessage(message: ChatMessage | ChatMessage[]) {
		if (isArray(message)) {
			for (let i = message.length - 1; i >= 0; i--) {
				store.dispatch(addMessage(message[i]));
			}
			console.log(message);
		} else {
			store.dispatch(addMessage(message as ChatMessage));
			console.log(message);
		}
	}
}

export default new ChatController();
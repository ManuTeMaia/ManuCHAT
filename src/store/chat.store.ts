import { Action } from "../utils/Store";
import { IChat } from "../components/Chat";
import { ChatMessage } from "../api/chatAPI";
import { UserData } from "../api/authAPI";

const SET_CHATS = "chats/SET";
const SET_SEARCH = "chats/SET_SEARCH";
const SET_CHAT = "chats/SET_CHAT";
const ADD_CHAT = "chats/ADD_CHAT";
const DELETE_CHAT = "chats/DELETE_CHAT";
const ADD_MESSAGE = "chats/ADD_MESSAGE";

const defaultState: ChatState = { chats: [], search: [], chat: undefined };

export interface ChatState {
	chats: [];
	search: [];
	chat: IChat | undefined;
}

export const setChats = (chats: IChat[]) => ({
	type: SET_CHATS,
	payload: chats,
});

export const setChat = (chat: IChat) => ({
	type: SET_CHAT,
	payload: chat,
});

export const addChat = (chat: IChat) => ({
	type: ADD_CHAT,
	payload: chat,
});

export const deleteChat = (chatId: number) => ({
	type: DELETE_CHAT,
	payload: chatId,
});

export const setSearch = (search: UserData[]) => ({
	type: SET_SEARCH,
	payload: search,
});

export const addMessage = (message: ChatMessage) => ({
	type: ADD_MESSAGE,
	payload: message,
});

export default (state = defaultState, action: Action) => {
	switch (action.type) {
		case SET_CHATS:
			return { ...state, chats: action.payload };
		case SET_SEARCH:
			return { ...state, search: action.payload };
		case SET_CHAT:
			return { ...state, chat: action.payload };
		case ADD_CHAT:
			return { ...state, chats: [action.payload, ...state.chats] };
		case DELETE_CHAT:
			const chatIndex = state.chats.findIndex(({ id }) => id === action.payload);
			const newChats = [...state.chats];
			if (chatIndex !== -1) {
				newChats.splice(chatIndex, 1);
			}

			return { ...state, chats: newChats };
		case ADD_MESSAGE:
			const newChat = { ...state.chat } as IChat;
			if (!newChat.messages) {
				newChat.messages = [];
			}

			newChat.messages.push(action.payload);
			return { ...state, chat: newChat };
		default:
			return state;
	}
};

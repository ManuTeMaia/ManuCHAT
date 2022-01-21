import {Action} from "../utils/Store";
import {ChatMessage} from "../api/chatAPI";
import {UserData} from "../api/authAPI.js";
import {ChatProps} from "../pages/chats/chat/chat";

const SET_CHATS = "chats/SET";
const SET_USER_SEARCH = "chats/SET_USER_SEARCH";
const SET_CHAT = "chats/SET_CHAT";
const SET_CHAT_AVATAR = "chats/SET_CHAT_AVATAR";
const ADD_CHAT = "chats/ADD_CHAT";
const DELETE_CHAT = "chats/DELETE_CHAT";
const ADD_MESSAGE = "chats/ADD_MESSAGE";


const defaultState: ChatState = {chats: [], chat: undefined};

export interface ChatState {
	chats: [];
	chat: ChatProps | undefined;
}

export const setChats = (chats: ChatProps[]) => ({
	type: SET_CHATS,
	payload: chats,
});

export const setChat = (chatId: number) => ({
	type: SET_CHAT,
	payload: chatId,
});

export const setChatAvatar = (chat: ChatProps ) => ({
	type: SET_CHAT_AVATAR,
	payload: chat.avatar,
});

export const addChat = (chat: ChatProps) => ({
	type: ADD_CHAT,
	payload: chat,
});

export const deleteChat = (chatId: number) => ({
	type: DELETE_CHAT,
	payload: chatId,
});

export const setUserSearch = (searchuser: UserData[]) => ({
	type: SET_USER_SEARCH,
	payload: searchuser,
});

export const addMessage = (message: ChatMessage) => ({
	type: ADD_MESSAGE,
	payload: message,
});

export default (state = defaultState, action: Action) => {
	const chatIndex = state.chats.findIndex(({id}) => id === action.payload);
	const newChats = [...state.chats];
	const currentChatId = state.chats[chatIndex] as ChatProps;
	const currentChat = {...state.chat};

	switch (action.type) {
		case SET_CHATS:
			return {...state, chats: action.payload};
		case SET_USER_SEARCH:
			return {...state, searchuser: action.payload};
		case SET_CHAT:
			return {...state, chat: currentChatId};
		case SET_CHAT_AVATAR:
			return {...state, chat: action.payload};
		case ADD_CHAT:
			return {...state, chats: [action.payload, ...state.chats]};
		case DELETE_CHAT:
			if (chatIndex !== -1) {
				newChats.splice(chatIndex, 1);
			}
			return {...state, chats: newChats};
		case ADD_MESSAGE:

			if (!currentChat.messages) {
				currentChat.messages = [];
			}
			currentChat.messages.push(action.payload);
			console.log(action.payload);
			return {...state, chat: currentChat};
		default:
			return state;
	}
};

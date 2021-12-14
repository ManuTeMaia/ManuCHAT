import {Action} from "../utils/Store";
import {ChatMessage} from "../api/chatAPI";
import {UserData} from "../api/authAPI.js";

const SET_CHATS = "chats/SET";
const SET_SEARCH = "chats/SET_SEARCH";
const SET_CHAT = "chats/SET_CHAT";
const ADD_CHAT = "chats/ADD_CHAT";
const DELETE_CHAT = "chats/DELETE_CHAT";
const ADD_MESSAGE = "chats/ADD_MESSAGE";

export type ChatProps = any;//TBD

const defaultState: ChatState = {chats: [], search: [], single_chat: undefined};

export interface ChatState {
	chats: [];
	search: [];
	single_chat: ChatProps | undefined;
}

export const setChats = (chats: ChatProps[]) => ({
	type: SET_CHATS,
	payload: chats,
});

export const setChat = (single_chat: ChatProps) => ({
	type: SET_CHAT,
	payload: single_chat,
});

export const addChat = (single_chat: ChatProps) => ({
	type: ADD_CHAT,
	payload: single_chat,
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
	const chatIndex = state.chats.findIndex(({id}) => id === action.payload);
	const newChats = [...state.chats];
	const newChat = {...state.single_chat} as ChatProps;

	switch (action.type) {
		case SET_CHATS:
			return {...state, chats: action.payload};
		case SET_SEARCH:
			return {...state, search: action.payload};
		case SET_CHAT:
			return {...state, single_chat: action.payload};
		case ADD_CHAT:
			return {...state, chats: [action.payload, ...state.chats]};
		case DELETE_CHAT:
			if (chatIndex !== -1) {
				newChats.splice(chatIndex, 1);
			}
			return {...state, chats: newChats};
		case ADD_MESSAGE:
			if (!newChat.messages) {
				newChat.messages = [];
			}

			newChat.messages.push(action.payload);
			return {...state, single_chat: newChat};
		default:
			return state;
	}
};

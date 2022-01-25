import { Action } from "../utils/Store";
import { UserData } from "../api/AuthAPI";

const SET_USER = "user/SET";
const DELETE_USER = "user/DELETE";
const SET_SEARCH = "user/SEARCH";
const SET_RESPONSE = "user/SET_RESPONSE";


export const setUser = (user: UserData) => ({
	type: SET_USER,
	payload: user,
});

export const deleteUser = () => ({
	type: DELETE_USER,
});

export const setResponse = (response: { success?: string; error?: string }) => ({
	type: SET_RESPONSE,
	payload: response,
});

export const setSearch = (search: UserData[]) => ({
	type: SET_SEARCH,
	payload: search,
});

export default (state = { profile: null, response: null, search: [] }, action: Action): Record<string, unknown> => {
	switch (action.type) {
		case SET_USER:
			return { error: null, profile: action.payload };
		case DELETE_USER:
			return { profile: null, error: null };
		case SET_SEARCH:
			return {...state, search: action.payload};
		case SET_RESPONSE:
			return { response: action.payload };
		default:
			return state;
	}
};
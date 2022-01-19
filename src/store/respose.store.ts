import {Action} from "../utils/Store";

const SET_RESPONSE = "response/SET";
const SET_ERROR = "response/SET_ERROR";

export const setResponse = (response: { success?: string; error?: string }) => ({
	type: SET_RESPONSE,
	payload: response,
});

export default (state = { error: null, success: null }, action: Action) => {
	switch (action.type) {
		case SET_RESPONSE:
			return { error: null, success: action.payload };
		case SET_ERROR:
			return { error: action.payload, success: null };
		default:
			return state;
	}
};
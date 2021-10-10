import {Action} from "../utils/Store";

const SET_PROFILE_RESPONSE = "profile/SET";
const SET_ERROR = "profile/SET_ERROR";

export const setResponse = (response: { success?: string; error?: string }) => ({
	type: SET_PROFILE_RESPONSE,
	payload: response,
});

export default (state = { error: null, success: null }, action: Action) => {
	switch (action.type) {
		case SET_PROFILE_RESPONSE:
			return { error: null, profile: action.payload };
		case SET_ERROR:
			return { error: action.payload, profile: null };
		default:
			return state;
	}
};
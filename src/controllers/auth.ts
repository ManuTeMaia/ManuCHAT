import {AuthAPI, LoginData, SignupData, UserData} from "../api/authAPI";
import Router from "../utils/Router";
import { store } from "../store";
import {deleteUser, setResponse, setUser} from "../store/user.store";

class AuthController {
	private api: AuthAPI;
	router = new Router();

	constructor() {
		this.api = new AuthAPI();
	}

	async signup(data: SignupData) {
		try {
			await this.api.signup(data);
			await this.fetchUser();
			this.router.go("/chats");
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async login(data: LoginData) {
		try {
			await this.api.login(data);
			await this.fetchUser();
			this.router.go("/chats");
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async logout() {
		try {
			await this.api.logout();
			store.dispatch(deleteUser());
			this.router.go("/");
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async fetchUser(): Promise<UserData | void> {
		try {
			const user = await this.api.read();
			store.dispatch(setUser(user));
			return user;
		} catch (e) {
			store.dispatch(deleteUser());
		}
	}
}

export default new AuthController();
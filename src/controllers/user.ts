import { UserAPI, UpdateProfileData, UpdatePasswordData, SearchData } from "../api/userAPI";
import { store } from "../store";
import { setUser } from "../store/user.store";
import { setResponse } from "../store/profile.store";
import { setSearch } from "../store/user.store";
import { UserData } from "api/AuthAPI.js";
import Router from "../utils/Router";

class UserController {
	private api: UserAPI;
	router = new Router();

	constructor() {
		this.api = new UserAPI();
	}

	async update(data: UpdateProfileData) {
		try {
			const user = await this.api.update(data);
			store.dispatch(setUser(user));
			store.dispatch(setResponse({ success: "Updated" }));
			this.router.go("/settings");
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async updateAvatar(data: FormData) {
		try {
			const user = await this.api.updateAvatar(data);
			store.dispatch(setUser(user));
			store.dispatch(setResponse({ success: "Updated" }));
			this.router.go("/settings");
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async changePassword(data: UpdatePasswordData) {
		try {
			await this.api.changePassword(data);
			store.dispatch(setResponse({ success: "Updated" }));
			this.router.go("/settings");
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}

	async search(data: SearchData) {
		const users = await this.searchUsers(data);
		if (users) {
			store.dispatch(setSearch(users));
		}
	}

	async searchUsers(data: SearchData): Promise<UserData[] | undefined> {
		if (!data.login) {
			return [];
		}
		try {
			return this.api.search(data);
		} catch (e) {
			store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
		}
	}
}

export default new UserController();
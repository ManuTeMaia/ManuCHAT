import BaseAPI from "./baseAPI";
import { UserData } from "./authAPI.js";

export interface SearchData {
	login: string;
}

export type SearchResponse = [];

export class UserAPI extends BaseAPI {
	constructor() {
		super("/user");
	}

	update(data: Record<string, unknown>): Promise<UserData> {
		return this.http.put("/profile", data);
	}

	updateAvatar(data: FormData): Promise<UserData> {
		return this.http.put("/profile/avatar", data, true);
	}

	changePassword(data: Record<string, unknown>): Promise<void> {
		return this.http.put("/password", data);
	}

	search(data: SearchData): Promise<SearchResponse> {
		return this.http.post("/search", data);
	}

	read: undefined;
	delete: undefined;
	create: undefined;
}
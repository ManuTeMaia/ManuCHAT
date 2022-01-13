import BaseAPI from "./baseAPI";
import { UserData } from "./authAPI.js";

export interface UpdateProfileData {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	display_name: string;
	phone: string;
}

export interface UpdatePasswordData {
	oldPassword: string;
	newPassword: string;
}

export interface SearchData {
	login: string;
}

export type SearchResponse = [];

export class UserAPI extends BaseAPI {
	constructor() {
		super("/user");
	}

	update(data: UpdateProfileData): Promise<UserData> {
		return this.http.put("/profile", data);
	}

	updateAvatar(data: FormData): Promise<UserData> {
		return this.http.put("/profile/avatar", data, true);
	}

	changePassword(data: UpdatePasswordData): Promise<void> {
		return this.http.put("/password", data);
	}

	search(data: SearchData): Promise<SearchResponse> {
		return this.http.post("/search", data);
	}

	read: undefined;
	delete: undefined;
	create: undefined;
}
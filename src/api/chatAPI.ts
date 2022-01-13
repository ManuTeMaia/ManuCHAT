import BaseAPI from "./baseAPI";
import { UserData } from "./authAPI";
import {ChatProps} from "../pages/chats/chat/chat";

export interface CreateChatData {
	title: string;
}

export interface AddUsersData {
	chatId: number;
	users: number[];
}

export interface DeleteChatData {
	chatId: number;
}

export interface ChatTokenData {
	chatId: number;
}

export interface ChatUsersData {
	chatId: number;
}

export interface ChatTokenResponse {
	token: string;
}

export interface ChatAvatarData {
	chatId: number;
	avatar: string;
}

export interface ChatMessage {
	chat_id: number;
	time: string;
	type: string;
	user_id: string;
	content: string;
	file?: ChatFile;
}

export interface ChatFile {
	id: number;
	user_id: number;
	path: string;
	filename: string;
	content_type: string;
	content_size: number;
	upload_date: string;
}

export class ChatAPI extends BaseAPI {
	constructor() {
		super("/chats");
	}

	read() {
		return this.http.get();
	}

	create(data: CreateChatData): Promise<{ id: number }> {
		return this.http.post("", data);
	}

	update(data: AddUsersData): Promise<void> {
		return this.http.put("/users", data);
	}

	delete(data: DeleteChatData): Promise<void> {
		return this.http.delete("", data);
	}

	setAvatar(data: FormData): Promise<ChatProps> {
		return this.http.put("/avatar", data, true);
	}

	token({ chatId }: ChatTokenData): Promise<ChatTokenResponse> {
		return this.http.post(`/token/${chatId}`);
	}

	users({ chatId }: ChatUsersData): Promise<UserData[]> {
		return this.http.get(`/${chatId}/users`);
	}

	deleteUsers(data: AddUsersData): Promise<void> {
		return this.http.delete("/users", data);
	}
}

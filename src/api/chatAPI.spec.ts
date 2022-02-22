import {AddUsersData, ChatAPI, ChatTokenData, ChatUsersData, CreateChatData, DeleteChatData} from "./chatAPI";
import * as sinon from "sinon";
import { API_URL } from "../common/global-consts";

describe("Chat API", () => {
	const requests: sinon.SinonFakeXMLHttpRequest[] = [];
	beforeEach(() => {
		let xhr: sinon.SinonFakeXMLHttpRequestStatic;
		(global as any).XMLHttpRequest = xhr = sinon.useFakeXMLHttpRequest();

		xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
			requests.push(request);
		};
	});

	afterEach(() => {
		(global as any).XMLHttpRequest.restore();
		requests.length = 0;
	});

	it("should create chat", () => {
		const api = new ChatAPI;
		const data: CreateChatData = {
			title: "Super Chat"
		};

		api.create(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Post");
		expect(requests[0].requestBody).toEqual(JSON.stringify(data));
		expect(requests[0].respond).not.toBeNull();
		expect(requests[0].url).toEqual(`${API_URL}/chats`);
	});

	it("should get available chats", () => {
		const api = new ChatAPI;

		api.read();

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Get");
		expect(requests[0].url).toEqual(`${API_URL}/chats/`);
	});

	it("should delete chat", () => {
		const api = new ChatAPI;
		const data: DeleteChatData = {
			chatId: 2
		};

		api.delete(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Delete");
		expect(requests[0].url).toEqual(`${API_URL}/chats`);
	});

	it("should get chat users", () => {
		const api = new ChatAPI;
		const data: ChatUsersData = {
			chatId: 2,
		};

		api.users(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Get");
		expect(requests[0].respond).toBeDefined();
		expect(requests[0].url).toEqual(`${API_URL}/chats/2/users`);
	});

	it("should add multiple users to chat", () => {
		const api = new ChatAPI;
		const data: AddUsersData = {
			chatId: 2,
			users: [23, 12, 3]
		};

		api.update(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Put");
		expect(requests[0].url).toEqual(`${API_URL}/chats/users`);
	});

	it("should delete multiple users from chat", () => {
		const api = new ChatAPI;
		const data: AddUsersData = {
			chatId: 2,
			users: [23, 12, 3]
		};

		api.deleteUsers(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Delete");
		expect(requests[0].url).toEqual(`${API_URL}/chats/users`);
	});

	it("should get chat token", () => {
		const api = new ChatAPI;
		const data: ChatTokenData = {
			chatId: 2,
		};

		api.token(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Post");
		expect(requests[0].respond).toBeDefined();
		expect(requests[0].url).toEqual(`${API_URL}/chats/token/2`);
	});

});
import {AddUsersData, ChatAPI, ChatTokenData, ChatUsersData, CreateChatData, DeleteChatData} from "./ChatAPI";
import sinon from "sinon";
import { expect } from "chai";
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

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Post");
		expect(requests[0].requestBody).to.eq(JSON.stringify(data));
		expect(requests[0].respond).to.not.null;
		expect(requests[0].url).to.eq(`${API_URL}/chats`);
	});

	it("should get available chats", () => {
		const api = new ChatAPI;

		api.read();

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Get");
		expect(requests[0].url).to.eq(`${API_URL}/chats/`);
	});

	it("should delete chat", () => {
		const api = new ChatAPI;
		const data: DeleteChatData = {
			chatId: 2
		};

		api.delete(data);

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Delete");
		expect(requests[0].url).to.eq(`${API_URL}/chats`);
	});

	it("should get chat users", () => {
		const api = new ChatAPI;
		const data: ChatUsersData = {
			chatId: 2,
		};

		api.users(data);

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Get");
		expect(requests[0].respond).to.not.undefined;
		expect(requests[0].url).to.eq(`${API_URL}/chats/2/users`);
	});

	it("should add multiple users to chat", () => {
		const api = new ChatAPI;
		const data: AddUsersData = {
			chatId: 2,
			users: [23, 12, 3]
		};

		api.update(data);

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Put");
		expect(requests[0].url).to.eq(`${API_URL}/chats/users`);
	});

	it("should delete multiple users from chat", () => {
		const api = new ChatAPI;
		const data: AddUsersData = {
			chatId: 2,
			users: [23, 12, 3]
		};

		api.deleteUsers(data);

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Delete");
		expect(requests[0].url).to.eq(`${API_URL}/chats/users`);
	});

	it("should get chat token", () => {
		const api = new ChatAPI;
		const data: ChatTokenData = {
			chatId: 2,
		};

		api.token(data);

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Post");
		expect(requests[0].respond).to.not.undefined;
		expect(requests[0].url).to.eq(`${API_URL}/chats/token/2`);
	});

});
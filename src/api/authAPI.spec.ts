import {AuthAPI, LoginData, SignupData} from "./authAPI";
import * as sinon from "sinon";
import { API_URL } from "../common/global-consts";

describe("Auth API", () => {
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

	it("should login", () => {
		const api = new AuthAPI;
		const data: LoginData = {
			login: "janed",
			password: "cheBuratino713"
		};

		api.login(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Post");
		expect(requests[0].requestBody).toEqual(JSON.stringify(data));
		expect(requests[0].url).toEqual(`${API_URL}/auth/signin`);
	});

	it("should signup", () => {
		const api = new AuthAPI;
		const data: SignupData = {
			email: "test@test.info",
			first_name: "Jane",
			second_name: "Doe",
			login: "janed",
			password: "cheBuratino713",
			phone: "123456789",
		};

		api.signup(data);

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Post");
		expect(requests[0].requestBody).toEqual(JSON.stringify(data));
		expect(requests[0].url).toEqual(`${API_URL}/auth/signup`);
	});

	it("should logout", () => {
		const api = new AuthAPI;

		api.logout();

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Post");
		expect(requests[0].url).toEqual(`${API_URL}/auth/logout`);
	});

	it("should read user's data", () => {
		const api = new AuthAPI;

		api.read();

		expect(requests.length).toEqual(1);
		expect(requests[0].method).toEqual("Get");
		expect(requests[0].url).toEqual(`${API_URL}/auth/user`);
	});
});
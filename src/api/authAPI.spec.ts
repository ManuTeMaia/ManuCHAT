import {AuthAPI, LoginData, SignupData} from "./authAPI";
import sinon from "sinon";
import { expect } from "chai";
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

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Post");
		expect(requests[0].requestBody).to.eq(JSON.stringify(data));
		expect(requests[0].url).to.eq(`${API_URL}/auth/signin`);
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

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Post");
		expect(requests[0].requestBody).to.eq(JSON.stringify(data));
		expect(requests[0].url).to.eq(`${API_URL}/auth/signup`);
	});

	it("should logout", () => {
		const api = new AuthAPI;

		api.logout();

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Post");
		expect(requests[0].url).to.eq(`${API_URL}/auth/logout`);
	});

	it("should read user's data", () => {
		const api = new AuthAPI;

		api.read();

		expect(requests.length).to.eq(1);
		expect(requests[0].method).to.eq("Get");
		expect(requests[0].url).to.eq(`${API_URL}/auth/user`);
	});
});
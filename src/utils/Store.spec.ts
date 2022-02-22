import Store, {Action} from "./Store";

describe("Store", () => {
	const userReducer = (state = null, action: Action) => {
		switch (action.type) {
			case "user/SET":
				return action.payload;
			case "user/DELETE":
				return null;
			default:
				return state;
		}
	};

	it("should init with reducer", () => {
		const store = new Store({
			user: userReducer
		});

		const state = store.getState();

		expect(state.user).toBeDefined();
		expect(state.user).toBeNull();
	});

	it("should call nested reducer on dispatch", () => {
		const store = new Store({
			user: userReducer
		});

		const user =  {
			name: "John",
			surname: "Doe"
		};

		store.dispatch({
			type: "user/SET",
			payload: user,
		});

		const state = store.getState();

		expect(state.user).toEqual(user);
	});
});
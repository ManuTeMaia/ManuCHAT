import EventBus from "../EventBus";
import {expect} from "chai";

describe("EventBus", () => {
	let eventBus: EventBus;

	beforeEach(() => {
		eventBus = new EventBus();
	});

	it("should set new event", () => {
		const event = jest.fn();
		eventBus.on("event", event);

		expect(eventBus.listeners.event).toContain(event);
	});

	it("should remove event from listeners", () => {
		const event = jest.fn();
		const anotherEvent = jest.fn();
		eventBus.on("event", event);
		eventBus.on("event", anotherEvent);
		eventBus.off("event", event);

		expect(eventBus.listeners.event).not.toContain(event);
		expect(eventBus.listeners.event).toContain(anotherEvent);
	});

	it("should not call callback fn", () => {
		const event = jest.fn();
		eventBus.on("event", event);
		eventBus.emit("test", {});

		expect(event).not.toHaveBeenCalled();
	});

	it("should call callback fn with args", () => {
		const event = jest.fn();
		const args = ["first", "second"];
		eventBus.on(
			"event", event);
		eventBus.emit("event", ...args);

		expect(event).toHaveBeenCalled();
		expect(event).toHaveBeenCalledWith(...args);
	});
});
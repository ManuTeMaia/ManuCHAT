import Block from "./Block";
import { expect, assert } from "chai";
import jsdom from "jsdom-global";

interface DummyType {
  test: string;
  test2?: string;
}

class Dummy extends Block<DummyType> {
  constructor(props: DummyType) {
    super(props);
  }
  render() {
    return `<div id='test'>${this.props.test}</div>`;
  }
}

describe("Test Block", () => {
	before(function() {
		this.jsdom = jsdom("<html lang='ru'></html><body><div class='.root'></div></body></html>", {
			url: "http://localhost"
		});
	});
	const createInstance = (props: DummyType) => new Dummy(props);

	it("should have string random id", () => {
		const props = { test: "test" };

		const instance = createInstance(props);

		expect(typeof instance.id).to.be.a("string");
	});

	it("should have props from constructor", () => {
		const props = { test: "test" };

		const instance = createInstance(props);
		expect(instance.props).to.deep.equal(props);
	});

	it("setProps: should set new props to props", () => {
		const props = { test: "test" };
		const newProps = { test: "test3", test2: "test2" };
		const instance = createInstance(props);

		instance.setProps(newProps);

		expect(instance.props).to.deep.equal({ ...props, ...newProps });
	});

	it("setState: should set new props to props", () => {
		const state = { test: "test" };
		const newState = { test: "test3", test2: "test2" };
		const instance = createInstance(state);

		instance.setState(newState);

		expect(instance.props).to.deep.equal({ ...state, ...newState });
	});

	it("render: should return properly tagname", () => {
		const props = { test: "test" };

		const instance = createInstance(props);

		assert.equal(instance.element?.tagName, "DIV");
	});

	it("render: should return properly element with props", () => {
		const props = { test: "test" };

		const instance = createInstance(props);
		console.log(instance.element);

		assert.equal(instance.element?.innerHTML, "test");
	});

});

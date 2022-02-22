/**
 * @jest-environment jsdom
 */

import Block from "./Block";

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

	const createInstance = (props: DummyType) => new Dummy(props);

	it("should have string random id", () => {
		const props = { test: "test" };

		const instance = createInstance(props);

		expect(typeof instance.id).toBe("string");
	});

	it("should have props from constructor", () => {
		const props = { test: "test" };

		const instance = createInstance(props);
		expect(instance.props).toEqual(props);
	});

	it("setProps: should set new props to props", () => {
		const props = { test: "test" };
		const newProps = { test: "test3", test2: "test2" };
		const instance = createInstance(props);

		instance.setProps(newProps);

		expect(instance.props).toEqual({ ...props, ...newProps });
	});

	it("setState: should set new props to props", () => {
		const state = { test: "test" };
		const newState = { test: "test3", test2: "test2" };
		const instance = createInstance(state);

		instance.setState(newState);

		expect(instance.props).toEqual({ ...state, ...newState });
	});

	it("render: should return properly tagname", () => {
		const props = { test: "test" };

		const instance = createInstance(props);

		expect(instance.element?.tagName).toEqual("DIV");
	});

	it("render: should return properly element with props", () => {
		const props = { test: "test" };

		const instance = createInstance(props);

		expect(instance.element?.innerHTML).toEqual("test");
	});

});

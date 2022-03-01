//import "regenerator-runtime/runtime";
import Router from "./Router";
import Block from "./Block";

class Dummy extends Block{
  static getContent() {
    const div = document.createElement("div");

    div.id = "test";

    return div;
  }
}

describe("Test Router", () => {
  beforeEach(() => {
    const router = new Router();
    router
        .use("/dummy", Dummy)
        .start();

    window.history.pushState({ name: "Dummy" }, "dummy", "http://localhost/dummy");
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("should be a singleton",() => {
    const router = new Router();

    expect(new Router()).toEqual(router);
  });

  it("use: should return router instance", () => {
    const router = new Router();

    const result = router.use("/", Dummy as any);

    expect(result).toEqual(router);
  });

  it("useError: should return router instance", () => {
    const router = new Router();

    const result = router.useError("/", Dummy as any);

    expect(result).toEqual(router);
  });

  it("back: should return previos pathname ", done => {
    const expectedResult = "http://localhost/dummy";
    new Router().back();
    window.onpopstate = () => {
      expect(window.location.href).toEqual(expectedResult);
      done();
    };
  });

  it("go: should return choosen pathname", () => {
    const expectedResult = "/dummy";
    new Router().go(expectedResult);

    expect(window.location.href).toEqual(`http://localhost${expectedResult}`);
  });
});


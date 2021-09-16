import Block from "../../utils/Block";
import template from "./submit-button.hbs";
import "./buttons.pcss";

class Button extends Block {
    constructor(props:Record<string, unknown>) {
        super("button", props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Button;
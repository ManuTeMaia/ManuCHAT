import Block from "../../utils/Block";
import template from "./text-input.hbs";
import "./inputs.pcss";

class TextInput extends Block {
    constructor(props:Record<string,unknown>) {
        super("div", props);
    }
    render():DocumentFragment{
        return this.compile(template, {...this.props});
    }

}
export default TextInput;
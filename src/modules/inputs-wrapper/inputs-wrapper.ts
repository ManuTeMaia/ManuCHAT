import Block from "../../utils/Block";
import TextInput from "../../components/inputs/text-input";
import template from "./inputs-wrapper.hbs";
import "./inputs-wrapper.pcss";

class InputWrapper extends Block {
    constructor(props:Props) {
        super("div", props);
    }
    render():DocumentFragment{
        const textinput = new TextInput({...this.props});
        
        return this.compile(template, {
            ...this.props,
            textinput:textinput
        });
    }

}
export default InputWrapper;
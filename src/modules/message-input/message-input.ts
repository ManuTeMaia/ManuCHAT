import Block from "../../utils/Block";
import TextInput from "../../components/inputs/text-input";
import Button from "../../components/buttons/submit-button";
import template from "./message-input.hbs";
import "./message-input.pcss";

class MessageInput extends Block {
    constructor(props:Props) {
        super("div", props);
    }
    render():DocumentFragment{
        const textinput = new TextInput({...this.props});
        const button = new Button({...this.props});

        return this.compile(template, {
            textinput:textinput,
            button:button
        });
    }

}
export default MessageInput;
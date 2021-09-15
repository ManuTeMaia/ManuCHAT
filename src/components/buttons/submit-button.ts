import Block from "../../utils/Block";
import template from "./submit-button.hbs";
import "./buttons.pcss";

class Button extends Block {
    constructor(props:{class:string, name:string, title:string, events?: {click: () => void}}) {
        super("button", props);
    }
    render():DocumentFragment{
    return template(this.props);
}

}
export default Button;
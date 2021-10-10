import Block from "../../utils/Block";
import template from "./submit-button.hbs";
import "./buttons.pcss";

type ButtonProps = {
    name: string,
    title?: string,
    buttonClass?: string,
    onSubmit: (e: Event) => void,
};

class Button extends Block {
    constructor({name, buttonClass, title, onSubmit}: ButtonProps) {
        super({name, buttonClass, title, events: {click: onSubmit}});
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Button;
import Block from "../../utils/Block";
import template from "./submit-button.hbs";
import "./buttons.pcss";

type ButtonProps = {
    name: string,
    title?: string,
    buttonClass?: string,
    events?: {
        click?: (e: Event) => void,
    }
};

class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Button;
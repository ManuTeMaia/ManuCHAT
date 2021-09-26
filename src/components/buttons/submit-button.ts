import Block from "../../utils/Block";
import template from "./submit-button.hbs";
import "./buttons.pcss";

type ButtonProps = {
    name: string,
    title?: string,
    class?: string,
    events?: {
        click?: (e: Event) => void,
        submit?: (e: Event) => void,
    };
};

class Button extends Block <ButtonProps>{
    constructor(props:ButtonProps) {
        super("button", props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Button;
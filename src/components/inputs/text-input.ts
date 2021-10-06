import Block from "../../utils/Block";
import template from "./text-input.hbs";
import "./inputs.pcss";

type TextInputType = {
    name?: string;
    class?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    type?: string;
    validationType?: string;
    events?: {
        click?: (e:Event) => void,
        focus?: (e:Event) => void,
        blur?: (e:Event) => void
    };
};

class TextInput extends Block <TextInputType>{
    constructor(props: TextInputType) {
        super(props);
    }
    render():DocumentFragment{
        return this.compile(template, {...this.props});
    }

}
export default TextInput;
import Block from "../../utils/Block";
import TextInput from "../../components/inputs/text-input";
import template from "./inputs-wrapper.hbs";
import "./inputs-wrapper.pcss";

type InputsWrapperType = {
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
    label: string;
}

class InputWrapper extends Block <InputsWrapperType>{
    constructor(props: TextInput | InputsWrapperType ) {
        super("div", props);
    }
    render():DocumentFragment{
        const textInput = new TextInput({...this.props});
        
        return this.compile(template, {
            ...this.props,
            textInput
        });
    }

}
export default InputWrapper;
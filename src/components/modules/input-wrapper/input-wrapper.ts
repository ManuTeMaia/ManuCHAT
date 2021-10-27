import Block from "../../../utils/Block";
import TextInput from "../../elements/inputs";
import "./input-wrapper.pcss";

export type InputWrapperType = {
	input: TextInput;
	ref: string;
	name: string;
	label?: string;
};

export class InputWrapper extends Block{
	constructor(props: InputWrapperType) {
		super(props);
	}

	render(): string {
		//language=hbs
		return `
            <div class="input-wrapper">
                {{#if label}}<label for="{{name}}">{{label}}</label>{{/if}}
                {{{TextInput  ref=input.name
                              name=input.name
                              inputClass=input.inputClass
                              placeholder=input.placeholder
                              required=input.required
                              value=input.value
                              type=input.type
                              validationType=input.validationType
                              autoComplete=input.autoComplete
                              onChange=input.onChange}}}
            </div>
        `;
	}

}
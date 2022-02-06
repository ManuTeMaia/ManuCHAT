import Block from "../../../utils/Block";
import "./input-wrapper.pcss";
import {TextInputType} from "../../elements/inputs/text-input";

export type InputWrapperType = {
	input: TextInputType;
	label?: string;
	name: string;
};

export class InputWrapper extends Block{
	constructor(props: InputWrapperType) {
		super(props);
	}

	static getName(): string {
		return "InputWrapper";
	}

	render(): string {
		//language=hbs
		return `
            <div class="input-wrapper">
                {{#if label}}<label for="{{name}}">{{label}}</label>{{/if}}
                {{{TextInput  ref=input.name
                              inputName=input.inputName
                              inputClass=input.inputClass
                              placeholder=input.placeholder
                              required=input.required
                              value=input.value
                              type=input.type
                              validationType=input.validationType
                              autoComplete=input.autoComplete
                              onChange=input.onChange
                              onInput=input.onInput}}}
            </div>
        `;
	}

}
import Block from "../../../utils/Block";
import "./input.pcss";

export type TextInputType = {
    name: string;
    label?: string;
    inputClass?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    type: string;
    validationType?: string;
    autoComplete?: string;
    onBlur: (e:Event) => void;
};

export class TextInput extends Block{
    constructor({name, label, inputClass, placeholder, required, value, type, validationType, autoComplete, onBlur}: TextInputType) {
        super({name, label, inputClass, placeholder, required, value, type, validationType, autoComplete,  events: {blur: onBlur}});
    }

    static getName(): string {
        return "TextInput";
    }

    render(): string {
        //language=hbs
        return `
            <div class="input-wrapper">
                {{#if label}}<label for="{{name}}">{{label}}</label>{{/if}}
                <input
                    type="{{type}}"
                    {{#if class}}
                        class="{{class}}"
                    {{/if}}
                        name="{{name}}" placeholder="{{placeholder}}" value="{{value}}" autocomplete="{{autoComplete}}"
                    {{#if validationType}}
                        valtype="{{validationType}}"
                    {{/if}}
                    {{#if required}}
                        required
                    {{/if}}>
            </div>
        `;
    }

}
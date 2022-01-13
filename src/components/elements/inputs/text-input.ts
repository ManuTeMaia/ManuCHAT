import Block from "../../../utils/Block";
import "./input.pcss";

export type TextInputType = {
    name: string;
    inputClass?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    type: string;
    validationType?: string;
    autoComplete?: string;
    onChange: (e:Event) => void;
    onInput?: () => void;
};

export class TextInput extends Block{
    constructor({ onChange, onInput, ...props}: TextInputType) {
        super({events: {blur: onChange, input: onInput}, ...props});
    }

    static getName(): string {
        return "TextInput";
    }

    render(): string {
        //language=hbs
        return `
                <input
                    type="{{type}}"
                    {{#if inputClass}}
                        class="{{inputClass}}"
                    {{/if}}
                        name="{{name}}" placeholder="{{placeholder}}" value="{{value}}" autocomplete="{{autoComplete}}"
                    {{#if validationType}}
                        valtype="{{validationType}}"
                    {{/if}}
                    {{#if required}}
                        required
                    {{/if}}>
        `;
    }

}
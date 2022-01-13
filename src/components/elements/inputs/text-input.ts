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
};

export class TextInput extends Block{
    constructor({ onChange, ...props}: TextInputType) {
        super({events: {blur: onChange}, ...props});
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
import Block from "../../../utils/Block";
import "./input.pcss";

export type TextInputType = {
    inputName: string;
    inputClass?: string;
    placeholder?: string;
    value?: string;
    type: string;
    validationType?: string;
    autoComplete?: string;
    onChange: (e:Event) => void;
    onInput?: () => void;
    events?: {
        blur: ((e:Event) => void) | undefined,
        input: (() => void) | undefined;
    }
    required?: boolean;
};

export class TextInput extends Block<TextInputType>{
    constructor({ onChange, onInput, ...props}: TextInputType) {
        super({onChange, events: {blur: onChange, input: onInput}, ...props});
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
                        name="{{inputName}}" placeholder="{{placeholder}}" value="{{value}}" autocomplete="{{autoComplete}}"
                    {{#if validationType}}
                        valtype="{{validationType}}"
                    {{/if}}
                    {{#if required}}
                        required
                    {{/if}}>
        `;
    }

}
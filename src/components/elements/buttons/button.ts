import Block from "../../../utils/Block";
import "./button.pcss";

export type ButtonProps = {
    name: string;
    type: string;
    title?: string;
    buttonIcon?: string;
    buttonClass?: string;
    onClick: (e: Event) => void;
    events: {click: (e: Event) => void };
};

export class Button extends Block<ButtonProps> {
    constructor({type="submit", onClick, ...props}: ButtonProps) {
        super({...props, type, onClick, events: {click: onClick }});
    }

    static getName(): string {
        return "Button";
    }

    render():string {
        //language=hbs
        return `
            <button type={{type}} class="{{buttonClass}}" name="{{name}}">
                {{#if buttonIcon}}
                    <i class="{{buttonIcon}}"></i>
                {{/if}}
                {{title}}
            </button>
        `;
    }

}
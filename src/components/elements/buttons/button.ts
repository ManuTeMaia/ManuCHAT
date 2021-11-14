import Block from "../../../utils/Block";
import "./button.pcss";

export type ButtonProps = {
    name: string;
    type: string;
    title?: string;
    buttonIcon?: string;
    buttonClass?: string;
    onClick: (e: Event) => void;
};

export class Button extends Block {
    constructor({name, type="submit", title, buttonClass, buttonIcon, onClick}: ButtonProps) {
        super({name, type, title, buttonClass, buttonIcon, events: {click: onClick}});
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
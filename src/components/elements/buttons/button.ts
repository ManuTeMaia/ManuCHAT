import Block from "../../../utils/Block";
import "./button.pcss";

export type ButtonProps = {
    name: string;
    title: string;
    buttonClass?: string;
    onClick: (e: Event) => void;
};

export class Button extends Block {
    constructor({name, title, buttonClass, onClick}: ButtonProps) {
        super({name, title, buttonClass, events: {click: onClick}});
    }

    static getName(): string {
        return "Button";
    }

    render():string {
        //language=hbs
        return `
            <button type="submit" class="{{buttonClass}}" name="{{name}}">
                {{title}}
            </button>
        `;
    }

}
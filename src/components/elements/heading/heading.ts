import Block from "../../../utils/Block";
import "./heading.pcss";

type HeadingTypes = {
    class?: string;
    text: string;
}

export class Heading extends Block {
    constructor(props: HeadingTypes) {
        super(props);
    }

    static getName(): string {
        return "Heading";
    }

    render(): string {
        //language=hbs
        return `
            <h3 {{#if class}}class="{{class}}"{{/if}}>{{text}}</h3>
        `;
    }

}
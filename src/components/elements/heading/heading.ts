import Block from "../../../utils/Block";
import "./heading.pcss";

export type HeadingType = {
    class?: string;
    text: string;
}

export class Heading extends Block<HeadingType> {
    constructor(props: HeadingType) {
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
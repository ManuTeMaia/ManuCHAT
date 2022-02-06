import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import "./link.pcss";

export type LinkType = {
    url: string;
    class?: string;
    text: string;
    linkIcon?: string;
    onClick: (e: Event) => void;
    events: {click: (e: Event) => void};
}

export class Link extends Block<LinkType>{
    constructor(props: LinkType) {
        const onClick = (e: MouseEvent) => {
            const router = new Router();

            router.go(this.props.url);

            e.preventDefault();
        };

        super({...props, events: {click: onClick}});
    }

    static getName(): string {
        return "Link";
    }

    render(): string {
        //language=hbs
        return `
        <div>
            <a href="{{url}}"{{#if class}} class="{{class}}"{{/if}}>
                {{#if linkIcon}}
                    <i class="{{linkIcon}}"></i>
                {{/if}}
                {{text}}
            </a>
        </div>
        `;
    }

}
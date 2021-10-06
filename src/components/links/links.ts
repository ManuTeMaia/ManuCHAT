import Block from "../../utils/Block";
import template from "./links.hbs";
import "./links.pcss";

type LinkType = {
    url: string;
    class?: string;
    text: string;
    events?: {
        click: (e: Event) => void;
    }
}

class Link extends Block <LinkType>{
    constructor(props: LinkType) {
        super(props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Link;
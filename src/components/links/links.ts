import Block from "../../utils/Block";
import template from "./links.hbs";
import "./links.pcss";

class Link extends Block {
    constructor(props:Props) {
        super("divr", props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Link;
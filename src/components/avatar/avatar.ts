import Block from "../../utils/Block";
import template from "./avatar.hbs";
import "./avatar.pcss";

class Avatar extends Block {
    constructor(props:Props) {
        super("avatar", props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Avatar;
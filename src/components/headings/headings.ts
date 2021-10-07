import Block from "../../utils/Block";
import template from "./headings.hbs";
import "./headings.pcss";

type HeadingTypes = {
    class?: string;
    text: string;
}

class Heading extends Block <HeadingTypes>{
    constructor(props: HeadingTypes) {
        super(props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default Heading;
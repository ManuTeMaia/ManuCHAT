import Block from "../../utils/Block";
import template from "./search-input.hbs";
import "./inputs.pcss";

class SearchInput extends Block {
    constructor(props:Props) {
        super("div", props);
    }
    render():DocumentFragment{
        return this.compile(template, {...this.props});
    }

}
export default SearchInput;
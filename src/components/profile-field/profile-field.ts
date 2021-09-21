import Block from "../../utils/Block";
import template from "./profile-field.hbs";
import "./profile-field.pcss";

class ProfileField extends Block {
    constructor(props:Props) {
        super("div", props);
    }
    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default ProfileField;
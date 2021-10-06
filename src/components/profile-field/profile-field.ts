import Block from "../../utils/Block";
import template from "./profile-field.hbs";
import "./profile-field.pcss";

type ProFieldTypes = {
    label: string;
    data: string;
}

class ProfileField extends Block <ProFieldTypes>{
    constructor(props:ProFieldTypes) {
        super(props);
    }

    render():DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
export default ProfileField;
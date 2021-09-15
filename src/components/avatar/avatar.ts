import Block from "../../utils/Block";
import template from "./avatar.hbs";
import "./avatar.pcss";

class Avatar extends Block {
    constructor(props:{divclass:string, imagesrc:string,imagetitle:string }) {
        super("avatar", props);
    }
    render():DocumentFragment{
    return template(this.props);
}

}
export default Avatar;
import Block from "../../utils/Block";
import template from "./attach-popup.hbs";
import "./attach-popup.pcss";

type AvatarProps = {
	imageSrc: string;
	divClass?: string;
	imageTitle?: string;
	events?: {
		click?: (e:Event) => void,
	}
}

class AttachPopup extends Block <AvatarProps> {
	constructor(props:AvatarProps) {
		super(props);
	}
	render():DocumentFragment {
		return this.compile(template, {...this.props});
	}

}
export default AttachPopup;
import Block from "../../utils/Block";
import template from "./avatar-popup.hbs";
import "./avatar-popup.pcss";

type AvatarProps = {
	imageSrc: string;
	divClass?: string;
	imageTitle?: string;
	events?: {
		click?: (e:Event) => void,
	}
}

class AvatarPopup extends Block <AvatarProps> {
	constructor(props:AvatarProps) {
		super(props);
	}
	render():DocumentFragment {
		return this.compile(template, {...this.props});
	}

}
export default AvatarPopup;
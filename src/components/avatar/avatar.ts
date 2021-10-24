import Block from "../../utils/Block";
import template from "./avatar.hbs";
import "./avatar.pcss";

export type AvatarProps = {
	imageSrc: string;
	divClass?: string;
	imageTitle?: string;
	events?: {
		click?: (e:Event) => void,
	}
}

class Avatar extends Block <AvatarProps> {
	constructor(props:AvatarProps) {
		super(props);
	}
	render():DocumentFragment {
		return this.compile(template, {...this.props});
	}

}
export default Avatar;
import Block from "../../utils/Block";
import template from "./chat-popup.hbs";
import "./chat-popup.pcss";

type AvatarProps = {
	imageSrc: string;
	divClass?: string;
	imageTitle?: string;
	events?: {
		click?: (e:Event) => void,
	}
}

class ChatPopup extends Block <AvatarProps> {
	constructor(props:AvatarProps) {
		super(props);
	}
	render():DocumentFragment {
		return this.compile(template, {...this.props});
	}

}
export default ChatPopup;
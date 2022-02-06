import Block from "../../../utils/Block";
import "./avatar.pcss";

export type AvatarProps = {
	imageSrc: string;
	divClass?: string;
	imageTitle?: string;
	onClick: (e:Event) => void;
	events: {click: (e:Event) => void };
}

export class Avatar extends Block<AvatarProps> {
	constructor({imageSrc="/noimage.png", divClass, imageTitle, onClick}: AvatarProps) {
		super({imageSrc, divClass, imageTitle, onClick, events: {click: onClick}});
	}

	static getName(): string {
		return "Avatar";
	}

	render(): string {
		//language=hbs
		return `
            <div class="avatar-wrap {{divClass}}">
                <img src="{{imageSrc}}" title="{{imageTitle}}" alt="{{imageTitle}}">
            </div>
        `;
	}

}
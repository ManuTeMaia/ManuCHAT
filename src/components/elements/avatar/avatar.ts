import Block from "../../../utils/Block";
import "./avatar.pcss";

export type AvatarProps = {
	imageSrc: string;
	divClass?: string;
	imageTitle?: string;
	onClick: (e:Event) => void;
}

export class Avatar extends Block {
	constructor({imageSrc, divClass, imageTitle, onClick}: AvatarProps) {
		super({imageSrc, divClass, imageTitle, events: {click: onClick}});
	}

	static getName(): string {
		return "Avatar";
	}

	render(): string {
		//language=hbs
		return `
            <div class="avatar-wrap {{divClass}}">
                <img src="https://ya-praktikum.tech/api/v2/resources{{imageSrc}}" title="{{imageTitle}}" alt="{{imageTitle}}">
            </div>
        `;
	}

}
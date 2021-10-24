import Block from "../../utils/Block";
import TextInput from "../../components/elements/inputs/text-input";
import Button from "../../components/elements/buttons/button";
import template from "./avatar-popup.hbs";
import "./avatar-popup.pcss";
import UserController from "../../controllers/user";


class AvatarPopup extends Block {
	constructor(props: any) {
		super({
			props,
			events: {
				submit: async (e: Event) => {
					e.preventDefault();
					const formData = new FormData(e.target as HTMLFormElement);
					await UserController.updateAvatar(formData);
				}
			}
		});
	}

	render():DocumentFragment {
		const fileInput = new TextInput({
			type: "file",
			name: "avatar",
			class: "avatar-upload-form-input",
			placeholder: "Загрузите файл..."
		});

		const upload = new Button({
			buttonClass: "avatar-upload-submit",
			name: "upload-submit",
			title: "Загрузить"
		});

		return this.compile(template, {
			popupClass: "profile-avatar-upload",
			fileInput,
			upload
		});
	}
}
export default AvatarPopup;
import Block from "../../../utils/Block";
import "./avatar-popup.pcss";
import UserController from "../../../controllers/user";
import ChatController from "../../../controllers/chat";


export interface AvatarPopupProps {
	popUpName: string;
	popUpTitle: string;
	chatId?: number;
}

export class AvatarPopup extends Block<AvatarPopupProps> {
	constructor(props: AvatarPopupProps) {
		super(props);
	}

	protected getStateFromProps(props: AvatarPopupProps) {

		this.state = {
			formInputs:
				{
					label: "Загрузка аватара",
					name: "avatar",
					input:
						{
							type: "file",
							name: "avatar",
							class: "avatar-upload-form-input",
							placeholder: "Загрузите файл..."
						}
				},

			popupClose: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=uploadAvatar]")?.classList.add("hidden");
			},

			uploadAvatar: async (e: Event) => {
				e.preventDefault();
				const form = document.querySelector("#avatarUpload");
				const formData = new FormData(form as HTMLFormElement);
					if(props.popUpName === "uploadUserAvatar") {
						await UserController.updateAvatar(formData);

					} else if (props.popUpName === "uploadChatAvatar") {
						console.log(formData);
						await ChatController.setAvatar(formData);
					}
				document.querySelector("[data-popup=uploadAvatar]")?.classList.add("hidden");
				}
		};
	}

	render(): string {
		//language=hbs
		return `
            <div class="popup hidden" data-popup="uploadAvatar">
                <div class="popup-overlay"></div>
                <div class="popup-wrapper">
                    {{{Button type="button" buttonIcon="ch-close" buttonClass="popup-close" onClick=popupClose}}}
                    <h4>Загрузить аватар</h4>
					<div class="popup-content uploadAvatar">
                        <form id="avatarUpload"  data-popup={{{popUpName}}} action="" class="file-upload-form" enctype="multipart/form-data">
		                    {{{InputWrapper input=formInputs.input}}}
	                        {{#if chatId}}
	                        	{{{TextInput type="hidden" name="chatId" value=chatId}}}
            				{{/if}}
							{{{Button buttonClass="avatar-upload-submit" name="upload-submit" title="Загрузить" onClick=uploadAvatar}}}
						</form>
					</div>
                </div>
            </div>
		`;
	}
}
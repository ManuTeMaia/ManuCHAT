import Block from "../../../utils/Block";
import "./avatar-popup.pcss";
import UserController from "../../../controllers/user";
import Validator from "../../../utils/Validator";


export class AvatarPopup extends Block {
	validator = new Validator();

	protected getStateFromProps() {
		const onBlur = (e: Event) => {
			console.log(e.currentTarget);
			this.validator.validate((e.currentTarget as HTMLInputElement));
		};

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
							placeholder: "Загрузите файл...",
							validationType: "notnull",
							required: true,
							onChange: onBlur
						}
				},

			popupClose: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=uploadAvatar]")?.classList.add("hidden");
			},

			uploadAvatar: async (e: Event) => {
				e.preventDefault();
				//const data: any = {};
				//const form = document.querySelector("#newChatForm");
				//const refs = getFormData(form as HTMLFormElement);
				//Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
				//	data[key] = input;
				//});
				const formData = new FormData(e.target as HTMLFormElement);
				const hasErrors = document.querySelector("[error-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await UserController.updateAvatar(formData);
					document.querySelector("[data-popup=uploadAvatar]")?.classList.add("hidden");
				}
			}
		};
	}

	render(): string {
		//language=hbs
		return `
            <div class="popup hidden" data-popup="uploadAvatar">
                <div class="popup-overlay"></div>
                <div class="popup-wrapper">
                    {{{Button type="button" buttonIcon="ch-exit" buttonClass="popup-close" onClick=popupClose}}}
                    <h4>Загрузить аватар</h4>
					<div class="popup-content uploadAvatar">
                        <form action="" class="file-upload-form" enctype="multipart/form-data">
		                    {{{InputWrapper label=formInputs.label name=formInputs.name input=formInputs.input}}}
							{{{Button buttonClass="avatar-upload-submit" name="upload-submit" title="Загрузить" onClick=uploadAvatar}}}
						</form>
					</div>
                </div>
            </div>
		`;
	}
}
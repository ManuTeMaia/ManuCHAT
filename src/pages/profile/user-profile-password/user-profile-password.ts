import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import UserController from "../../../controllers/user";
import { getFormData } from "../../../helpers/formActions";
import "../user-profile-form.pcss";
import {UpdatePasswordData} from "../../../api/userAPI";

class ProfileEditPasswordPage extends Block {
	validator = new Validator();

	protected getStateFromProps() {
		const onBlur = (e: Event) => {
			console.log(e.currentTarget);
			this.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			formInputs: [
				{
					label: "Текущий пароль",
					name: "oldPassword",
					input: {
						type: "password",
						name: "oldPassword",
						placeholder: "***********",
						validationType: "password",
						required: true,
						autoComplete: "current-password",
						onChange: onBlur
					}
				},
				{
					label: "Пароль",
					name: "newPassword",
					input: {
						type: "password",
						name: "newPassword",
						placeholder: "***********",
						validationType: "password",
						required: true,
						autoComplete: "new-password",
						onChange: onBlur
					}
				},
				{
					label: "Повторите пароль",
					name: "newPasswordRepeat",
					input: {
						type: "password",
						name: "newPasswordRepeat",
						placeholder: "***********",
						validationType: "password",
						required: true,
						autoComplete: "new-password",
						onChange: onBlur
					}
				}
			],
			onSave: async (e: Event) => {
				e.preventDefault();
				const data = {} as UpdatePasswordData;
				const form = document.querySelector("#changePwdForm");
				const refs = getFormData(form as HTMLFormElement);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[key] = input;
				});
				const hasErrors = document.querySelector("[error-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await UserController.changePassword(data);
				}
			},
			uploadAvatar: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=uploadAvatar]")?.classList.remove("hidden");
			}
		};

	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
	}

	render(): string {

		//language=hbs
		return `
			<section class="main--page-user-profile-wrap">
                {{{AvatarPopup popupName="uploadUserAvatar" popupTitle="Загрузить аватар"}}}
                {{{Avatar imageSrc=avatarSrc imageTitle=imageTitle divClass="main--page-user-profile user-profile-avatar" onClick=uploadAvatar}}}
                {{{Heading class="main--page-user-profile user-profile-heading" text="Изменить пароль"}}}
				  <div class="main--page-user-profile-form">
				    <form id="changePwdForm"  action="" method="post" class="form--user-profile-password" enctype="multipart/form-data">
                        {{#each formInputs}}
                            {{{InputWrapper label=this.label name=this.name input=this.input}}}
                        {{/each}}
                        {{#if user.error }}
                            <span style="color: red">{{user.error.reason}}</span>
                        {{/if}}
                        {{{Button title="Изменить пароль" buttonClass="form--user-profile-password-submit" name="user-profile-password-submit" onClick=onSave}}}
				    </form>
				  </div>
			</section>
		`;

	}
}

export default ProfileEditPasswordPage;
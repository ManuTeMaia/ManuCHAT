import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import UserController from "../../../controllers/user";
import { getFormData } from "../../../helpers/formActions";
import "../user-profile-form.pcss";
import {UpdatePasswordData} from "../../../api/userAPI";
import {RESOURCE_URL} from "../../../common/global-consts";
import {UserProps} from "../user-profile/user-profile";

class ProfileEditPasswordPage extends Block {
	validator = new Validator();

	protected getStateFromProps(props: UserProps) {
		const onBlur = (e: Event) => {
			this.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			headingText: props.user.display_name || `${props.user.first_name} ${props.user.second_name}`,
			imageTitle: props.user.first_name || "Загрузите аватар",
			avatarSrc: props.user.avatar !== null ? `${RESOURCE_URL}${props.user.avatar}` : "/noimage.png",
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
				const form = document.querySelector<HTMLFormElement>("#changePwdForm");
				const refs = getFormData(form);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[(key as keyof UpdatePasswordData)] = input;
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
                            <div class="input-error">{{user.error.reason}}</div>
                        {{/if}}
                        {{{Button title="Изменить пароль" buttonClass="form--user-profile-password-submit" name="user-profile-password-submit" onClick=onSave}}}
				    </form>
				  </div>
			</section>
		`;

	}
}

export default ProfileEditPasswordPage;
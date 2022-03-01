import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import UserController from "../../../controllers/user";
import { getFormData } from "../../../helpers/formActions";
import "../user-profile-form.pcss";
import {UpdateProfileData} from "../../../api/userAPI";
import {UserProps} from "../user-profile/user-profile";
import {RESOURCE_URL} from "../../../common/global-consts";

	class ProfilePageEdit extends Block {

	constructor(props: UserProps) {
		super(props);
	}

	validator = new Validator;

	getStateFromProps(props: UserProps): void {
		const onBlur = (e: Event) => {
			this.validator.validate((e.currentTarget as HTMLInputElement));
		};

		this.state = {
			headingText: props.user.display_name || `${props.user.first_name} ${props.user.second_name}`,
			imageTitle: props.user.first_name || "Загрузите аватар",
			avatarSrc: props.user.avatar !== null ? `${RESOURCE_URL}${props.user.avatar}` : "/assets/noimage.png",
			formInputs: [
				{
					label: "E-mail",
					name: "email",
					input: {
						inputName: "email",
						type: "email",
						validationType: "email",
						placeholder: props.user.email,
						value: props.user.email,
						onChange: onBlur
					}
				},
				{
					label: "Логин",
					name: "login",
					input: {
						inputName: "login",
						type: "text",
						validationType: "login",
						placeholder: props.user.login,
						value: props.user.login,
						onChange: onBlur
					}
				},
				{
					label: "Имя",
					name: "first_name",
					input: {
						inputName: "first_name",
						type: "text",
						validationType: "name",
						placeholder: props.user.first_name,
						value: props.user.first_name,
						onChange: onBlur
					}
				},
				{
					label: "Фамилия",
					name: "second_name",
					input: {
						type: "text",
						inputName: "second_name",
						validationType: "name",
						placeholder: props.user.second_name,
						value: props.user.second_name,
						onChange: onBlur
					}
				},
				{
					label: "Имя в чате",
					name: "display_name",
					input: {
						type: "text",
						inputName: "display_name",
						placeholder: props.user.display_name,
						value: props.user.display_name,
						onChange: onBlur
					}
				},
				{
					label: "Телефон",
					name: "phone",
					input: {
						type: "tel",
						inputName: "phone",
						validationType: "phone",
						placeholder: props.user.phone,
						value: props.user.phone,
						onChange: onBlur
					}
				}
			],
			onSave: async (e: Event) => {
				e.preventDefault();
				const data = {} as UpdateProfileData;
				const form = document.querySelector("#editUserForm");
				const refs = getFormData(<HTMLFormElement>form);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[(key as keyof UpdateProfileData)] = input;
				});
				const hasErrors = document.querySelector("[error-for]");
				new Validator().formValidate();
				if (!hasErrors) {
					await UserController.update(data);
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
                {{{AvatarPopup popUpName="uploadUserAvatar" popupTitle="Загрузить аватар"}}}
                {{{Avatar imageSrc=avatarSrc imageTitle=imageTitle divClass="main--page-user-profile user-profile-avatar" onClick=uploadAvatar}}}
                {{{Heading class="main--page-user-profile user-profile-heading" text="Изменить данные"}}}
				  <div class="main--page-user-profile-form">
				    <form id="editUserForm" action="" method="post" class="user-profile-form" enctype="multipart/form-data">
                        {{#each formInputs}}
                            {{{InputWrapper label=this.label name=this.name input=this.input}}}
                        {{/each}}
                        {{#if user.error}}
                            <div class="input-error">{{user.error.reason}}</div>
                        {{/if}}
                        {{{Button title="Сохранить" buttonClass="form--user-profile-info-submit" name="user-profile-info-submit" onClick=onSave}}}
				    </form>
				  </div>
			</section>
		`;

	}
}

export default ProfilePageEdit;
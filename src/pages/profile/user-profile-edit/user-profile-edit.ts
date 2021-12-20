import Block from "../../../utils/Block";
import Validator from "../../../utils/Validator";
import UserController from "../../../controllers/user";
import { getFormData } from "../../../helpers/formActions";
import "../user-profile-form.pcss";
import {ProfileCardType} from "../../../components/modules/chat-list-profile-card/chat-list-profile-card";

class ProfilePageEdit extends Block {

	constructor(props: ProfileCardType) {
		super(props);

	}

	validator = new Validator;

	onBlur = (e: Event): void => {
		this.validator.validate((e.currentTarget as HTMLInputElement));
	};

	getStateFromProps(): void {

		this.state = {
			onSave: async (e: Event) => {
				e.preventDefault();
				const data: Record<string, unknown> = {};
				const form = document.querySelector("#editUserForm");
				const refs = getFormData(form as HTMLFormElement);
				Object.entries(refs as { [key: string]: string }).forEach(([key, input]) => {
					data[key] = input;
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
console.log(this.state);
	}

	validate(input: HTMLInputElement): void {
		return this.validator.validate(input);
	}

	render(): string {
		//language=hbs
		return `
			<section class="main--page-user-profile-wrap">
                {{{AvatarPopup popupName="uploadAvatar" popupTitle="Загрузить аватар"}}}
                {{{Avatar imageSrc=avatarSrc imageTitle=imageTitle divClass="main--page-user-profile user-profile-avatar" onClick=uploadAvatar}}}
                {{{Heading class="main--page-user-profile user-profile-heading" text="Изменить данные"}}}
				  <div class="main--page-user-profile-form">
				    <form id="editUserForm" action="" method="post" class="{{{formClass}}}" enctype="multipart/form-data">
                        {{#each formInputs}}
                            {{{InputWrapper label=this.label name=this.name input=this.input}}}
                        {{/each}}
                        {{#if user.error}}
                            <span style="color: red">{{user.error.reason}}</span>
                        {{/if}}
                        {{{Button title="Сохранить" buttonClass="form--user-profile-info-submit" name="user-profile-info-submit" onClick=onSave}}}
				    </form>
				  </div>
			</section>
		`;

	}
}

export default ProfilePageEdit;
import Block from "../../../utils/Block";
import AuthController from "../../../controllers/auth";
import Router from "../../../utils/Router";
import {UserData} from "../../../api/authAPI";
import "./user-profile.pcss";

export interface UserProps {
	user: UserData;
}

class ProfilePage extends Block {
	router: Router = new Router();

	protected getStateFromProps(props: UserProps ) {

		this.state = {
			headingText: props.user.display_name || `${props.user.first_name} ${props.user.second_name}`,
			imageTitle: props.user.first_name || "Загрузите аватар",
			avatarSrc: props.user.avatar !== null ?`https://ya-praktikum.tech/api/v2/resources${props.user.avatar}` : "/noimage.png",
			profileFields: [
				{
					label: "Email",
					data: props.user.email
				},
				{
					label: "Логин",
					data: props.user.login
				},
				{
					label: "Имя",
					data: props.user.first_name
				},
				{
					label: "Фамилия",
					data: props.user.second_name
				},
				{
					label: "Телефон",
					data: props.user.phone
				}
			],
			onLogout: async () => {
							this.router.go("/");
							await AuthController.logout();
							},

			uploadAvatar: (e: Event) => {
				e.preventDefault();
				document.querySelector("[data-popup=uploadAvatar]")?.classList.remove("hidden");
			}
		};
		
	}

	render():string {

		//language=hbs
		return `
            <div class="main--page-user-profile-wrap">
                {{{AvatarPopup popUpName="uploadUserAvatar" popupTitle="Загрузить аватар"}}}
                {{{Avatar imageSrc=avatarSrc imageTitle=imageTitle divClass="main--page-user-profile user-profile-avatar" onClick=uploadAvatar}}}
                <div class="main--page-user-profile-fields">
                    {{{Heading class="main--page-user-profile user-profile-heading" text=headingText}}}
                    {{#each profileFields}}
                        {{{ProfileField label=this.label data=this.data}}}
                    {{/each}}
                    <div class="main--page-user-profile-actions">
	                    {{{Link url="/settings/edit" class="main--page-user-profile user-profile-link link-change-data" text="Изменить данные"}}}
                        {{{Link url="/settings/pwd" class="main--page-user-profile user-profile-link link-change-pass" text="Изменить пароль"}}}
                        {{{Button title="Выйти" type="button" buttonClass="main--page-user-profile user-profile-link link-logout aslink" name="logout-submit" onClick=onLogout}}}
                    </div>
                </div>
            </div>
		`;
    }

}

export default ProfilePage;
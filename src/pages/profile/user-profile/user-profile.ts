import Block from "../../../utils/Block";
import AuthController from "../../../controllers/auth";
import Router from "../../../utils/Router";
import "./user-profile.pcss";

class ProfilePage extends Block {
	router: Router = new Router();

	protected getStateFromProps() {

		this.state = {
			onLogout: async () => {
							await AuthController.logout();
							this.router.go("/");

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
                {{{AvatarPopup popupName="uploadAvatar" popupTitle="Загрузить аватар"}}}
                {{{Avatar imageSrc=avatarSrc imageTitle=imageTitle divClass="main--page-user-profile user-profile-avatar" onClick=uploadAvatar}}}
                <div class="main--page-user-profile-fields">
                    {{{Heading class="main--page-user-profile user-profile-heading" text=headingText}}}
                    {{#each profileFields}}
                        {{{ProfileField label=this.label data=this.data}}}
                    {{/each}}
                    <div class="main--page-user-profile-actions">
	                    {{{Link url="/settings/edit" class="main--page-user-profile user-profile-link link-change-data" text="Изменить данные"}}}
                        {{{Link url="/settings/pwd" class="main--page-user-profile user-profile-link link-change-pass" text="Изменить пароль"}}}
                        {{{Link url="/" class="main--page-user-profile user-profile-link link-logout" text="Выйти" onClick=onLogout}}}
                        {{{Button title="Выйти" buttonClass="main--page-user-profile user-profile-link link-logout" name="logout-submit" onClick=onLogout}}}
                    </div>
                </div>
            </div>
		`;
    }

}

export default ProfilePage;
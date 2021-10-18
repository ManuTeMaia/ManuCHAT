import Block from "../../../utils/Block";
import AuthController from "../../../controllers/auth";
import Router from "../../../utils/Router";
import ProfileField from "../../../components/profile-field/profile-field";
import Avatar from "../../../components/avatar/avatar";
import PopupWrapper from "../../../modules/popup-wrapper/popup-wrapper";
import Heading from "../../../components/headings/headings";
import Link from "../../../components/links/links";
import template from "./user-profile.hbs";
import "./user-profile.pcss";



class ProfilePage extends Block {
	router: Router = new Router();

	constructor(props: any) {
		super(props);
	}

	render():DocumentFragment {
		const user = this.props.user;
		const avatarSrc = `https://ya-praktikum.tech/api/v2/resources${user.profile.avatar}` || "/noimage.png";

		const popupWrapper = new PopupWrapper({
			popupName: "upload",
			popupTitle: "Загрузить аватар",
			popupChoice: "avatarPopup"
		});

		const avatar = new Avatar({
			divClass: "main--page-user-profile user-profile-avatar",
			imageSrc: avatarSrc,
			imageTitle: user.profile.first_name || "Avatar",
			events: {
				click: (e: Event) => {
					e.preventDefault();
					document.querySelector(".popup")?.classList.remove("hidden");
				}
			}
		});

		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: user.profile.display_name || user.profile.first_name
		});

		const profileFields = [
			{
				label: "Email",
				data: user.profile.email
			},
			{
				label: "Логин",
				data: user.profile.login
			},
			{
				label: "Имя",
				data: user.profile.first_name
			},
			{
				label: "Фамилия",
				data: user.profile.second_name
			},
			{
				label: "Телефон",
				data: user.profile.phone
			}

		].map((profileField) => new ProfileField(profileField));
		
		const links = [
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-change-data",
				text:"Изменить данные",
				events: {
					click: (e: Event) => {
						e.preventDefault();
						this.router.go("/settings/edit");
					}
				}
			},
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-change-pass",
				text:"Изменить пароль",
				events: {
					click: (e: Event) => {
						e.preventDefault();
						this.router.go("/settings/pwd");
					}
				}
			},
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-logout",
				text:"Выйти",
				events: {
					click: (e: Event) => {
						e.preventDefault();
						AuthController.logout().then(() => this.router.go("/"));
					}
				}
			},
		].map((link) => new Link(link));

		return this.compile(template, {
			popupWrapper,
			avatar,
			heading,
			profileFields,
			links
		});
    }

}

export default ProfilePage;
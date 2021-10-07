import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import ProfileField from "../../../components/profile-field/profile-field";
import Avatar from "../../../components/avatar/avatar";
import Heading from  "../../../components/headings/headings";
import Link from "../../../components/links/links";
import template from "./user-profile.hbs";
import "./user-profile.pcss";
import AuthController from "../../../controllers/auth";

class ProfilePage extends Block{
	router: Router;

	constructor() {
        super();
		this.router = new Router();
    }

    render():DocumentFragment {
		const avatar = new Avatar({
			divClass: "main--page-user-profile user-profile-avatar",
			imageSrc: "/noimage.png",
			imageTitle: "Avatar",
			events: {
				click: () => alert("Позже тут можно будет загрузить аватар")
			}
		});
		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: "Джейн Доу"
		});
		const profileFields = [
			{
				label: "Email",
				data: "dragonfly@123.com"
			},
			{
				label: "Логин",
				data: "dragonfly"
			},
			{
				label: "Имя",
				data: "Джейн"
			},
			{
				label: "Фамилияя",
				data: "Доу"
			},
			{
				label: "Телефон",
				data: "+7 (000)-000-00-00"
			}

		].map((profileField) => new ProfileField(profileField));
		
		const links = [
			{
				url:"/settings/edit",
				class:"main--page-user-profile user-profile-link link-change-data",
				text:"Изменить данные"
			},
			{
				url:"/settings/pwd",
				class:"main--page-user-profile user-profile-link link-change-pass",
				text:"Изменить пароль"
			},
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-logout",
				text:"Выйти",
				events: {
					click: (e: Event) => {
						e.preventDefault();
						new AuthController().logout().then(() => this.router.go("/"));
					}
				}
			},
		].map((link) => new Link(link));

        return this.compile(template, {
			avatar,
			heading,
			profileFields,
			links
		});
    }

}

export default ProfilePage;
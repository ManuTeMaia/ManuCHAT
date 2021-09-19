import Block from "../../../utils/Block";
import pageRender from "../../../utils/pageRender";
import LoginPage from "../../../pages/chats/login/login";
import { ProfileFormPage, ProfileFormPasswordPage } from "../../../modules/user-profile-form/user-profile-form";
import ProfileField from "../../../components/profile-field/profile-field";
import Avatar from "../../../components/avatar/avatar";
import Heading from  "../../../components/headings/headings";
import Link from "../../../components/links/links";
import template from "./user-profile.hbs";
import "./user-profile.pcss";

class ProfilePage extends Block{
	constructor() {
        super("div");
    }
    render():DocumentFragment {
		const avatar = new Avatar({
			divclass: "main--page-user-profile user-profile-avatar",
			imagesrc: "/noimage.png",
			imagetitle: "Avatar",
			events: {
				click: () => alert("Позже тут можно будет загрузить аватар")
			}
		});
		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: "Джейн Доу"
		});
		const profilefields = [
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

		].map((profilefield) => new ProfileField(profilefield));
		
		const links = [
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-change-data",
				text:"Изменить данные",
				events: {
					click: (e:Event) => {
						e.preventDefault();
						pageRender(".main--page-user-profile-fields",new ProfileFormPage());
					}
				}
			},
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-change-pass",
				text:"Изменить пароль",
				events: {
					click: (e:Event) => {
						e.preventDefault();
						pageRender(".main--page-user-profile-fields",new ProfileFormPasswordPage());
					}
				}
			},
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-logout",
				text:"Выйти",
				events: {
					click: (e:Event) => {
						e.preventDefault();
						pageRender(".root",new LoginPage());
					}
				}
			},
		].map((link) => new Link(link));

        return this.compile(template, {
			avatar:avatar,
			heading:heading,
			profilefields:profilefields,
			links:links

		});
    }

}
export default ProfilePage;
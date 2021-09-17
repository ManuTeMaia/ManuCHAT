import Block from "../../../utils/Block";
import ProfileField from "../../../components/profile-field/profile-field";
import Avatar from "../../../components/avatar/avatar";
import Heading from  "../../../components/headings/headings";
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
		const email = new ProfileField({
			label: "Email",
			data: "dragonfly@123.com"
		});
		const login = new ProfileField({
			label: "Логин",
			data: "dragonfly"
		});
		const firstname = new ProfileField({
			label: "Имя",
			data: "Джейн"
		});
		const lastname = new ProfileField({
			label: "Фамилияя",
			data: "Доу"
		});
		const phone = new ProfileField({
			label: "Телефон",
			data: "+7 (000)-000-00-00"
		});

        return this.compile(template, {
			avatar:avatar,
			heading:heading,
			email:email,
			login:login,
			firstname:firstname,
			lastname:lastname,
			phone:phone
		});
    }

}
export default ProfilePage;
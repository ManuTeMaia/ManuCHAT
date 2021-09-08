import "../../../components/profile-field/profile-field";
import "../../../components/avatar/avatar";
import "../../../components/headings/headings";
import template from "./user-profile.hbs";

export function addProfilePage():string {

	const profilePageData = {
		userpic: {
			imagesrc: "/noimage.png",
			divclass: "main--page-user-profile user-profile-avatar"
		},
		username: {
			level: "3",
			class: "main--page-user-profile user-profile-heading",
			text: "Иветта Сидорова"
		},
		profileFields: {
			email: {
				label: "E-mail",
				data: "dragonfly@123.com"
			},
			login: {
				label: "Логин",
				data: "dragonfly"
			},
			firstname: {
				label: "Имя",
				data: "Иветта"
			},
			lastname: {
				label: "Фамилия",
				data: "Сидорова"
			},
			phone: {
				label: "Телефон",
				data: "+7 (000)-000-00-00"
			}
		}
	};

	return document.querySelector(".chat--wrap").innerHTML = template(profilePageData);
}
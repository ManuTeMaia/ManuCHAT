import "../../../modules/chat-list-profile-card/chat-list-profile-card";
import template from "./main.hbs";

export function addMainPage():string {

	const mainPageData = {
		card: {
			avatar: {
				imagesrc: "/noimage.png",
				divclass: "chat-list-profile-card profile-card-avatar",
				imagetitle: "Изменить данные профиля"
			},
			search: {
				class: "chat-list-profile-card profile-card-search",
				name: "search",
				placeholder: "Поиск"

			}
		}

	};
	return document.querySelector(".root").innerHTML = template(mainPageData);
}
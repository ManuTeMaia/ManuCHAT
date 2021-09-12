import "../../../modules/chat-list-profile-card/chat-list-profile-card";
import template from "./main.hbs";
import "./main.pcss";

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
	const WrapElement = document.querySelector(".root") as HTMLElement;
	return WrapElement.innerHTML = template(mainPageData);
}
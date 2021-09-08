import "../../../modules/chat-list-profile-card/chat-list-profile-card";
import template from "./main.hbs";

export function addMainPage() {

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

    }
    document.querySelector('.root').innerHTML = template(mainPageData);
};
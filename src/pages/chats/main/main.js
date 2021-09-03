import "../../../modules/chat-list-profile-card/chat-list-profile-card";
import template from "./main.hbs";

export function addMainPage() {

    const mainPageData = {
        card: {
            avatar: {
                imagesrc: "../../../../static/img/noimage.png",
                imageclass: "chat-list-profile-card profile-card-avatar",
            },
            search: {
                name: "search",
                placeholder: "Поиск",
            }
        }

    }
    document.querySelector('.root').innerHTML = template(mainPageData);
};
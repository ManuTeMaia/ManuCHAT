import "../../../components/headings/headings";
import "../../../modules/chat-list-profile-card/chat-list-profile-card";
import template from "./main.hbs";

export function addMainPage() {

    const mainPage = template({
        profileCard: {
            avatar: {
                src: "",
                class: "",
            },
            searchInput: {
                name: "search",
                placeholder: "Поиск",
            }
        }
    });
    document.querySelector('.root').innerHTML = mainPage;
};
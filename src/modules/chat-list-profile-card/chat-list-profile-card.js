import Handlebars from "handlebars/dist/handlebars.runtime";
import "../../components/inputs/search-input";
import "../../components/avatar/avatar";
import template from "./chat-list-profile-card.hbs";

Handlebars.registerPartial("profileCard", template);
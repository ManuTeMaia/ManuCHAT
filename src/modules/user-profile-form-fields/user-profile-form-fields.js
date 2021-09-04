import Handlebars from "handlebars/dist/handlebars.runtime";
import "../../components/buttons/submit-button";
import "../../components/headings/headings";
import "../../components/inputs/text-input";
import template from "./user-profile-form-fields.hbs";
Handlebars.registerPartial("profileForm", template);
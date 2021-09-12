import Handlebars from "handlebars/dist/handlebars.runtime";
import template from "./headings.hbs";
import "./headings.pcss";

Handlebars.registerPartial("heading", template);
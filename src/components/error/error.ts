import template from "./error.hbs";
import "./error.pcss";

const err500Block = template({ letter1st: "5", letter2nd: "0", letter3rd: "0", errMessage: "Без паники! Мы уже спешим на помощь" });
const err404Block = template({ letter1st: "4", letter2nd: "0", letter3rd: "4", errMessage: "Упс... Здесь ничего нет." });

export { err500Block, err404Block };
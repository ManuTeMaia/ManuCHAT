import "../../common/common.pcss";
import "../../components/error/error.pcss";
import { err404Block } from "../../components/error/error";

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".root").innerHTML = err404Block;
});
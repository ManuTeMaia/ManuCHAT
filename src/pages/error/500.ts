import "../../common/common.pcss";
import "../../components/error/error.pcss";
import { err500Block } from "../../components/error/error";

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".root").innerHTML = err500Block;
});
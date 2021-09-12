import "../../common/common.pcss";
import "../../components/error/error.pcss";
import { err500Block } from "../../components/error/error";

document.addEventListener("DOMContentLoaded", () => {
	const  WrapElement = document.querySelector(".root") as HTMLElement;
	WrapElement.innerHTML = err500Block;
});
import pageRender from "./pageRender";
import Validator from "../utils/Validator";

function getFormData(): void {
    const data: Record<string, unknown> = {};
    const inputFields = document.querySelectorAll("form input");
    inputFields.forEach((input: HTMLInputElement) => data[input.name] = input.value);
    console.log(data);
}

function submitEmulator(e: Event, query: string, block: string): void {
    e.preventDefault();
    new Validator().formValidate();
    const hasErrors =  document.querySelectorAll(".invalid").length;
    if(!hasErrors) {
        getFormData();
        pageRender(query, block);
    }
}

export default submitEmulator;
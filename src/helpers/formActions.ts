import Router from "../utils/Router";
import Validator from "../utils/Validator";

const router = new Router();

function getFormData(): void {
    const data: Record<string, unknown> = {};
    const inputFields = document.querySelectorAll("form input");
    inputFields.forEach((input: HTMLInputElement) => data[input.name] = input.value);
    console.log(data);
}

function submitEmulator(e: Event, path: string): void {
    e.preventDefault();
    const hasErrors = document.querySelector("[error-for]");
    new Validator().formValidate();
    if(!hasErrors) {
        getFormData();
        router.go(path);
    }
}

export default submitEmulator;
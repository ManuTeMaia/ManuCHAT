import Router from "../utils/Router";
import Validator from "../utils/Validator";

function getFormData(form: HTMLFormElement): void {
    console.log(form);
    const formData = new FormData(form);
    const consoleData: Record<string, unknown> = {};

    for(const [name, value] of formData) {
        consoleData[name] =  value;
    }
    console.log(consoleData);
}

function submitEmulator(e: Event, path: string): void {
    e.preventDefault();
    const hasErrors = document.querySelector("[error-for]");
    new Validator().formValidate();
    if(!hasErrors) {
        getFormData(e.target as HTMLFormElement);
        console.log(e.target);
        new Router().go(path);
    }
}

export default submitEmulator;
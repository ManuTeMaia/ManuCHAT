import Router from "../utils/Router";
import Validator from "../utils/Validator";

function getFormData(form: HTMLFormElement): Record<string, unknown> {
    const formData = new FormData(form);
    const consoleData: Record<string, unknown> = {};

    for(const [name, value] of formData) {
        consoleData[name] =  value;
    }

    return consoleData;
}

function submitEmulator(e: Event, path: string): void {
    e.preventDefault();
    const hasErrors = document.querySelector("[error404-for]");
    new Validator().formValidate();
    if(!hasErrors) {
        getFormData(e.target as HTMLFormElement);
        new Router().go(path);
    }
}

export { submitEmulator, getFormData };
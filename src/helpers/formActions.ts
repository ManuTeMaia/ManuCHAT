import pageRender from "./pageRender";

function getFormData(): void {
    const data: Record<string, unknown> = {};
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input: HTMLInputElement) => data[input.name] = input.value);
    console.log(data);
}

function submitEmulator(e: Event): void {
    e.preventDefault();
    this.validate();
    const hasErrors =  document.querySelectorAll(".invalid").length;
    console.log(hasErrors);
    if(!hasErrors) {
        getFormData();
        pageRender(".root","chats");
    }
}

export default submitEmulator;
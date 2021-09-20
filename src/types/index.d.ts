declare module "handlebars/dist/handlebars.runtime";
declare module "*.hbs";

type Props = {
    name?: string,
    title?: string,
    class?: string,
    placeholder?: string,
    required?: boolean,
    value?: string,
    label?: string,
    type?: string,
    imagesrc?: string,
    divclass?: string,
    imagetitle?: string,
    data?: string,
    text?: string,
    url?: string,
    time?: string,
    validationtype?: string
    textinput?: any,
    avatar?: any,
    events?: {
        click?: (e:Event) => void,
        submit?: (e:Event) => void,
        focus?: () => void,
        blur?: () => void
    }
}
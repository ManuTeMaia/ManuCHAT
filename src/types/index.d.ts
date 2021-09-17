declare module "handlebars/dist/handlebars.runtime";
declare module "*.hbs";

type Props = {
    name?: string,
    title?: string,
    class?: string,
    placeholder?: string,
    value?: string,
    label?: string,
    type?: string,
    imagesrc?: string,
    divclass?: string,
    imagetitle?: string,
    data?: string,
    textinput?: any,
    avatar?: any,
    events?: {
        click?: () => void,
        submit?: () => void,
        focus?: () => void,
        blur?: () => void
    }
}
declare module "handlebars/dist/handlebars.runtime" {
    export type Template<T> = string;
    export default function registerPartial(name:string,fn:Template): string;

}

declare module "*.hbs" {
    export default function (fn: Template): string;
}

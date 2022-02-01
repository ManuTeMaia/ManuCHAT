declare module "handlebars/dist/handlebars.runtime";
declare module "*.hbs";

type Nullable<T> = T | null;

type Keys<T extends Record<string, unknown>> = keyof T;
type Values<T extends Record<string, unknown>> = T[Keys<T>];
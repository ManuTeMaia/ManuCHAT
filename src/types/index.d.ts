declare module "handlebars/dist/handlebars.runtime";

type Indexed = { [key: string]: any };

type Keys<T extends Record<string, unknown>> = keyof T;
type Values<T extends Record<string, unknown>> = T[Keys<T>];
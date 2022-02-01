import Block from "../../../utils/Block";
import "./checkbox.pcss";

export type CheckboxType = {
    id: number;
    name: string;
    label: string;
    value?: string;
    onChange: (e:Event) => void;
};

export class CheckboxInput extends Block{
    constructor({ onChange, ...props}: CheckboxType) {
        super({events: {checked: onChange}, ...props});
    }

    static getName(): string {
        return "Checkbox";
    }

    render(): string {
        //language=hbs
        return `
            <div>
                <input type="checkbox" id={{id}} name={{name}} value={{id}}>
                <label for={{name}}>{{label}}</label>
            </div>
        `;
    }

}
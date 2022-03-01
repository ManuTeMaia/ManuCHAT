import Block from "../../../utils/Block";
import "./checkbox.pcss";

export type CheckboxType = {
    id: number;
    name: string;
    label: string;
    value?: string;
    onChange: (e:Event) => void;
    events: {checked: (e: Event) => void};
};

export class CheckboxInput extends Block<CheckboxType>{
    constructor({id, name, label, value, onChange}: CheckboxType) {
        super({id, name, label, value, onChange, events: {checked: onChange}});
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
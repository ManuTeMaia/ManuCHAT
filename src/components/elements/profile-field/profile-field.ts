import Block from "../../../utils/Block";
import "./profile-field.pcss";

type ProFieldTypes = {
    label: string;
    data: string;
}

export class ProfileField extends Block <ProFieldTypes>{
    constructor(props:ProFieldTypes) {
        super(props);
    }

    static getName(): string {
        return "Link";
    }

    render(): string {
        //language=hbs
        return `
            <div class="profile-field-wrap">
                <div class="profile-field-label">{{label}}</div>
                <div class="profile-field-data">{{data}}</div>
            </div>
        `;
    }
}
import "../../../modules/user-profile-form-fields/user-profile-form-fields";
import template from "./user-profile-form.hbs";

export function addProfileFormPage() {

    const profileFormData = {
        heading: {
            level: '3',
            class: "",
            text: "Изменить данные"
        },
        form: {
            textInputs: {
                email: {
                    label: "E-mail",
                    type: "email",
                    name: "email",
                    placeholder: "dragonfly@123.com"
                },
                login: {
                    label: "Логин",
                    type: "text",
                    name: "login",
                    placeholder: "dragonfly"
                },
                firstname: {
                    label: "Имя",
                    type: "text",
                    name: "first_name",
                    placeholder: "Иветта"
                },
                lastname: {
                    label: "Фамилия",
                    type: "text",
                    name: "second_name",
                    placeholder: "Сидорова"
                },
                displayname: {
                    label: "Имя в чате",
                    type: "text",
                    name: "display_name",
                    placeholder: "Сидорова"
                },
                phone: {
                    label: "Телефон",
                    type: "tel",
                    name: "phone",
                    placeholder: "+7 (000)-000-00-00"
                }
            },
            submit: {
                class: "form--user-profile-submit",
                name: "user-profile-submit",
                title: "Cохранить"
            }
        }
    }
    document.querySelector('.chat--wrap').innerHTML = template(profileFormData);
};
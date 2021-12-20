import ProfilePageEdit from "./user-profile-edit";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default withRouter(connect((state: any) => ({
	user: state.user.profile || {},
	headingText: state.user.profile.display_name || `${state.user.profile.first_name} ${state.user.profile.second_name}`,
	imageTitle: state.user.profile.first_name || "Загрузите аватар",
	avatarSrc: `https://ya-praktikum.tech/api/v2/resources${state.user.profile.avatar}` || "/noimage.png",
	formInputs: [
		{
			label: "E-mail",
			name: "email",
			input: {
				name: "email",
				type: "email",
				validationType: "email",
				placeholder: state.user.profile.email,
				value: state.user.profile.email,
				
			}
		},
		{
			label: "Логин",
			name: "login",
			input: {
				name: "login",
				type: "text",
				validationType: "login",
				placeholder: state.user.profile.login,
				value: state.user.profile.login,

			}
		},
		{
			label: "Имя",
			name: "first_name",
			input: {
				name: "first_name",
				type: "text",
				validationType: "name",
				placeholder: state.user.profile.first_name,
				value: state.user.profile.first_name,

			}
		},
		{
			label: "Фамилия",
			name: "second_name",
			input: {
				type: "text",
				name: "second_name",
				validationType: "name",
				placeholder: state.user.profile.second_name,
				value: state.user.profile.second_name,

			}
		},
		{
			label: "Имя в чате",
			name: "display_name",
			input: {
				type: "text",
				name: "display_name",
				placeholder: state.user.profile.display_name,
				value: state.user.profile.display_name,

			}
		},
		{
			label: "Телефон",
			name: "phone",
			input: {
				type: "tel",
				name: "phone",
				validationType: "phone",
				placeholder: state.user.profile.phone,
				value: state.user.profile.phone,

			}
		}
	],
}), ProfilePageEdit as typeof Block));
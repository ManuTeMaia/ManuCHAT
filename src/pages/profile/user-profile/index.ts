import ProfilePage from "./user-profile";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default withRouter(connect((state: any) => ({
	user: state.user.profile || {},
	headingText: state.user.profile.display_name || `${state.user.profile.first_name} ${state.user.profile.second_name}`,
	imageTitle: state.user.profile.first_name || "Загрузите аватар",
	avatarSrc: `https://ya-praktikum.tech/api/v2/resources${state.user.profile.avatar}` || "/noimage.png",
	profileFields: [
		{
			label: "Email",
			data: state.user.profile.email
		},
		{
			label: "Логин",
			data: state.user.profile.login
		},
		{
			label: "Имя",
			data: state.user.profile.first_name
		},
		{
			label: "Фамилия",
			data: state.user.profile.second_name
		},
		{
			label: "Телефон",
			data: state.user.profile.phone
		}
	]
}), ProfilePage as typeof Block));

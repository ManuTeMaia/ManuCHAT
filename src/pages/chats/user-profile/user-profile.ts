import Block from "../../../utils/Block";
import Router, {withRouter} from "../../../utils/Router";
import ProfileField from "../../../components/profile-field/profile-field";
import Avatar from "../../../components/avatar/avatar";
import Heading from  "../../../components/headings/headings";
import Link from "../../../components/links/links";
import template from "./user-profile.hbs";
import "./user-profile.pcss";
import AuthController from "../../../controllers/auth";
import {connect} from "../../../store";

class ProfilePage extends Block {
	router: Router;

	constructor() {
		super();
		this.router = new Router();
	}

	componentDidMount() {
		console.log(this.props.user);
		console.log(this.props.user);
		if (!this.props.user) {
			//this.props.router.go("/");
		}
	}

	componentDidUpdate() {
		console.log(this.props.user);
		if (!this.props.user) {
			//this.props.router.go("/");
		}

		return true;
	}

    render():DocumentFragment {
		const avatar = new Avatar({
			divClass: "main--page-user-profile user-profile-avatar",
			imageSrc: "/noimage.png",
			imageTitle: "Avatar",
			events: {
				click: () => alert("Позже тут можно будет загрузить аватар")
			}
		});
		const heading = new Heading({
			class: "main--page-user-profile user-profile-heading",
			text: "Джейн Доу"
		});
		const profileFields = [
			{
				label: "Email",
				data: "dragonfly@123.com"
			},
			{
				label: "Логин",
				data: "dragonfly"
			},
			{
				label: "Имя",
				data: "user.profile.first_name"
			},
			{
				label: "Фамилияя",
				data: "Доу"
			},
			{
				label: "Телефон",
				data: "+7 (000)-000-00-00"
			}

		].map((profileField) => new ProfileField(profileField));
		
		const links = [
			{
				url:"/settings/edit",
				class:"main--page-user-profile user-profile-link link-change-data",
				text:"Изменить данные"
			},
			{
				url:"/settings/pwd",
				class:"main--page-user-profile user-profile-link link-change-pass",
				text:"Изменить пароль"
			},
			{
				url:"",
				class:"main--page-user-profile user-profile-link link-logout",
				text:"Выйти",
				events: {
					click: (e: Event) => {
						e.preventDefault();
						AuthController.logout().then(() => this.router.go("/"));
					}
				}
			},
		].map((link) => new Link(link));

        return this.compile(template, {
			avatar,
			heading,
			profileFields,
			links
		});
    }

}

export {ProfilePage};
export default withRouter(connect((state: any) => ({user: state.user.profile}), ProfilePage));
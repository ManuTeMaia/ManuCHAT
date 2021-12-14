import Avatar from "../../components/elements/avatar/avatar";
import Block from "../../utils/Block";
import template from "../../pages/profile/user-profile/user-profile.hbs";
import {store} from "../../store";
import Link from "../../components/elements/link/link";
import AvatarPopup from "../../components/modules/avatar-popup/avatar-popup";

class AvatarForm extends Block {
	constructor(props: any) {
		super(props);
	}

	render(): DocumentFragment {
		const user = store.getState().user;

		const avatar = new Avatar({
			divClass: "main--page-user-profile user-profile-avatar",
			imageSrc: `https://ya-praktikum.tech/api/v2/resources/${user.profile.avatar}` || "/noimage.png",
			imageTitle: `${user.profile.first_name} ${user.profile.second_name}` || "Avatar",
			events: {
				click: (e) => {
					e.preventDefault();
					document.querySelector("[data-popup=upload]")?.classList.remove("hidden");
				}
			}
		});

		const closeLink = new Link({
			url:"",
			class:"popup-close",
			text:"X",
			events: {
				click: (e: Event) => {
					e.preventDefault();
					document.querySelector(".popup")?.classList.add("hidden");
				}
			}
		});
		const popupContent =  new AvatarPopup({...this.props});

		return this.compile(template, {
			avatar,
			popupTitle: "Загрузить аватар",
			popupName: "upload",
			closeLink,
			popupContent
		});
	}
}

export default AvatarForm;
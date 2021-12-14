import ChatPage from "./chat";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default withRouter(connect((state: any) => ({
	user: state.user.profile || {},
	avatar: `https://ya-praktikum.tech/api/v2/resources${state.user.profile.avatar}` || {},
	chats: state.chats || {}
}), ChatPage as typeof Block));

import ChatPage from "./chat";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default withRouter(connect((state: any) => ({
	//user: state.user.profile || {},
	chats: state.chats.chats || {},
}), ChatPage as typeof Block));

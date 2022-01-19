import ChatPage from "./chat";
import {withRouter} from "../../../utils/Router";
import Block from "../../../utils/Block";
import {connect} from "../../../store";

export default withRouter(connect((state: any) => ({
	chats: state.chats.chats || {},
 }), ChatPage as typeof Block));

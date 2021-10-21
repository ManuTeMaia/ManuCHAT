import ChatBodyPage from "./chat-body";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";

export default withRouter(connect((state: any) => ({
	user: state.user,
	chats: state.chats
}), ChatBodyPage));
import { ChatBodyPage } from "./chat-body";
import { withRouter } from "../../../utils/Router";
import { connect } from "../../../store";

export default withRouter(connect((state: any) => ({
	user: state.user.profile,
	chat: state.chats.single_chat
}), ChatBodyPage));
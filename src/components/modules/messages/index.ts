import {connect} from "../../../store";
import {Messages} from "./messages";

export default connect((state: any) => ({
	chat: state.chats.chat,
	user: state.user.profile,
	chatUsers: state.chats.chatUsers,
}), Messages);
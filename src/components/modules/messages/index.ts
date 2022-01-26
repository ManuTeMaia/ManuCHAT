import {connect} from "../../../store";
import {Messages} from "./messages";
import Block from "../../../utils/Block";

export default connect((state: any) => ({
	user: state.user.profile,
	chatUsers: state.chats.chatUsers,
	chat: state.chats.chat
}), Messages as typeof Block);
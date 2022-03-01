import {connect} from "../../../store";
import {Messages} from "./messages";
import Block from "../../../utils/Block";
import {ChatProps} from "../chat-list/chat-list";
import {UserData} from "../../../api/authAPI";

export default connect((state: { chats: {chat: ChatProps, chatUsers: UserData}, user: {profile: UserData}}) => ({
	chat: state.chats.chat,
	user: state.user.profile,
	chatUsers: state.chats.chatUsers,
}), <typeof Block>Messages);
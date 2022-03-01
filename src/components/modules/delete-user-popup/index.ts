import {connect} from "../../../store";
import { DeleteUserPopup } from "./delete-user-popup";
import Block from "../../../utils/Block";
import {ChatProps} from "../chat-list/chat-list";
import {UserData} from "../../../api/authAPI";

export default connect((state: { chats: {response: ChatProps, chatUsers: UserData}} ) => ({
	response: state.chats.response,
	chatUsers: state.chats.chatUsers,
}), <typeof Block>DeleteUserPopup);
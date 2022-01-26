import {connect} from "../../../store";
import Block from "../../../utils/Block";
import { DeleteUserPopup } from "./delete-user-popup";

export default connect((state: any) => ({
	response: state.chats.response,
	chatUsers: state.chats.chatUsers,
}), DeleteUserPopup as typeof Block);
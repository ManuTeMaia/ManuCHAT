import {connect} from "../../../store";
import Block from "../../../utils/Block";
import {ChatListCard} from "./chat-list-card";

export default connect((state: any) => ({
	user: state.user.profile || {},
	chats: state.chats.chats || {},
}), ChatListCard as typeof Block);
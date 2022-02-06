import {connect} from "../../../store";
import {ChatListCard} from "./chat-list-card";
import Block from "../../../utils/Block";

export default connect((state: any) => ({
	user: state.user.profile || {},
	chats: state.chats.chats || {},
}), <typeof Block>ChatListCard);
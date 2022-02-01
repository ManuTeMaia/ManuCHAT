import {connect} from "../../../store";
import {ChatListCard} from "./chat-list-card";

export default connect((state: any) => ({
	user: state.user.profile || {},
	chats: state.chats.chats || {},
}), ChatListCard);
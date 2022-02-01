import {connect} from "../../../store";
import {ChatList} from "./chat-list";

export default connect((state: any) => ({
	chats: state.chats.chats || {},
}), ChatList);
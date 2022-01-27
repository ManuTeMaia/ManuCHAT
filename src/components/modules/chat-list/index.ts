import {connect} from "../../../store";
import Block from "../../../utils/Block";
import {ChatList} from "./chat-list";

export default connect((state: any) => ({
	chats: state.chats.chats || {},
}), ChatList as typeof Block);
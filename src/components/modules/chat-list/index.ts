import {connect} from "../../../store";
import {ChatList} from "./chat-list";
import Block from "../../../utils/Block";

export default connect((state: any) => ({
	chats: state.chats.chats || {},
}), <typeof Block>ChatList);
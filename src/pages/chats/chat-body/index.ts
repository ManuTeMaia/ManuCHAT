import { ChatBodyPage } from "./chat-body";
import { withRouter } from "../../../utils/Router";
import Block from "../../../utils/Block";
import {connect} from "../../../store";

const url = new URL(window.location.href, window.location.origin);
const chatId = url.searchParams.get("chatid");

export default withRouter(connect((state: any) => ({
	chat: state.chats.chat ? state.chats.chat : state.chats.chats[state.chats.chats.findIndex((item: Record<string, unknown> ) => item.id == chatId)],
	user: state.user.profile,
	searchUser: state.chats.searchuser,
}), ChatBodyPage as typeof Block));


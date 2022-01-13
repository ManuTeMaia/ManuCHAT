import { ChatBodyPage } from "./chat-body";
import { withRouter } from "../../../utils/Router";
import { connect } from "../../../store";
import Block from "../../../utils/Block";

const url = new URL(window.location.href, window.location.origin);
const chatId = url.searchParams.get("chatid");

export default withRouter(connect((state: any) => ({
	user: state.user.profile,
	chat: state.chats.chat ? state.chats.chat : state.chats.chats[state.chats.chats.findIndex((item: Record<string, unknown> ) => item.id == chatId)],
	search: state.search || state.user.search,
}), ChatBodyPage as typeof Block));
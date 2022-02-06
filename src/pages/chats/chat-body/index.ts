import { ChatBodyPage } from "./chat-body";
import { withRouter } from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";
import {ChatProps} from "../../../components/modules/chat-list/chat-list";
import {UserData} from "../../../api/authAPI";

const url = new URL(window.location.href, window.location.origin);
const chatId = url.searchParams.get("chatid") ? parseInt(<string>url.searchParams.get("chatid"), 10) : "";

export default withRouter(connect((state: { chats: {chats: ChatProps[], chat: ChatProps}, user: {profile: UserData}}) => ({
	chat: state.chats.chat ? state.chats.chat : state.chats.chats[state.chats.chats.findIndex((item: ChatProps) => item.id == chatId)],
	user: state.user.profile,
}), <typeof Block>ChatBodyPage));


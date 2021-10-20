import ChatPage from "./chat";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";

export default withRouter(connect(({
		 messenger: { chats, search, chat },
		 user: { profile },
	 }: {
		messenger: MessengerState;
		user: { profile: UserData };
	}) => ({
		chats: chats || [],
		search: search || [],
		user: profile,
		chat: chat,
		...messengerState,
	}), ChatPage));
import { AddUserPopup } from "./add-user-popup";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default connect((state: any) => ({
	response: state.chats.response,
	search: state.user.search,
}), AddUserPopup as typeof Block);

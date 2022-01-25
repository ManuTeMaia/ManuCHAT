import {connect} from "../../../store";
import Block from "../../../utils/Block";
import { DeleteUserPopup } from "./delete-user-popup";

export default connect((state: any) => ({
	response: state.chats.response,
	searchuser: state.chats.searchuser,
}), DeleteUserPopup as typeof Block);
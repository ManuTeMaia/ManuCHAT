import { AddUserPopup } from "./add-user-popup";
import {connect} from "../../../store";

export default connect((state: any) => ({
	response: state.chats.response,
	search: state.user.search,
}), AddUserPopup);

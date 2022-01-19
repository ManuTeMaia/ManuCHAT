import {connect} from "../../../store";
import Block from "../../../utils/Block";
import {ChatProfileCard} from "./chat-list-profile-card";

export default connect((state: any) => ({
	user: state.user.profile || {},
}), ChatProfileCard as typeof Block);
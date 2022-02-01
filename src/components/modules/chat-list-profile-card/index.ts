import {connect} from "../../../store";
import {ChatProfileCard} from "./chat-list-profile-card";

export default connect((state: any) => ({
	user: state.user.profile || {},
}), ChatProfileCard);
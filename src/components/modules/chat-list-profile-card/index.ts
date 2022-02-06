import {connect} from "../../../store";
import {ChatProfileCard} from "./chat-list-profile-card";
import Block from "../../../utils/Block";

export default connect((state: any) => ({
	user: state.user.profile || {},
}), <typeof Block>ChatProfileCard);
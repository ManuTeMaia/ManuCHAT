import ProfilePageEdit from "./user-profile-edit";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";
import {UserData} from "../../../api/authAPI";

export default withRouter(connect((state: {user: {profile: UserData}}) => ({
	user: state.user.profile || {},
}), <typeof Block>ProfilePageEdit));
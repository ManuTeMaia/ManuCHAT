import ProfilePageEdit from "./user-profile-edit";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default withRouter(connect((state: any) => ({
	user: state.user.profile || {},
}), ProfilePageEdit as typeof Block));
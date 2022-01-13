import ProfilePage from "./user-profile";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default withRouter(connect((state: any) => ({
	user: state.user.profile || {},
}), ProfilePage as typeof Block));

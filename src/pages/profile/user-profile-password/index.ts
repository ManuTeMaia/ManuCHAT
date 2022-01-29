import ProfileEditPasswordPage from "./user-profile-password";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";
import Block from "../../../utils/Block";

export default withRouter(connect((state: any) => ({
	user: state.user
}), ProfileEditPasswordPage as typeof Block));
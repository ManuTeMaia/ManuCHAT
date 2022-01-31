import ProfileEditPasswordPage from "./user-profile-password";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";

export default withRouter(connect((state: any) => ({
	user: state.user.profile || {}
}), ProfileEditPasswordPage));
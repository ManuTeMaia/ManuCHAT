import ProfilePage from "./user-profile";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";

export default withRouter(connect((state: any) => ({
	user: state.user
}), ProfilePage));
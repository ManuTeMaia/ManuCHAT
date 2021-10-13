import ProfilePageEdit from "./user-profile-edit";
import {withRouter} from "../../../utils/Router";
import {connect} from "../../../store";

export default withRouter(connect((state: any) => ({
	user: state.user
}), ProfilePageEdit));
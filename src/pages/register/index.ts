import RegistrationPage from "./register";
import {connect} from "../../store";
import {withRouter} from "../../utils/Router";

export default withRouter(connect((state: any) => ({
	user: state.user || {}
}), RegistrationPage));
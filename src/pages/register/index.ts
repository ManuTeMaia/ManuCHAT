import RegistrationPage from "./register";
import {connect} from "../../store";
import {withRouter} from "../../utils/Router";
import Block from "../../utils/Block";

export default withRouter(connect((state: any) => ({
	user: state.user || {}
}), RegistrationPage as typeof Block));
import RegistrationPage from "./register";
import Block from "../../utils/Block";
import {connect} from "../../store";
import {withRouter} from "../../utils/Router";
import {UserData} from "../../api/authAPI";

export default withRouter(connect((state: {user: UserData}) => ({
	user: state.user || {}
}), <typeof Block>RegistrationPage));
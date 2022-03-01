import LoginPage from "./login";
import {connect} from "../../store";
import {withRouter} from "../../utils/Router";
import Block from "../../utils/Block";
import {UserProps} from "../profile/user-profile/user-profile";

export default withRouter(connect((state: UserProps) => ({
	user: state.user || {}
}), <typeof Block>LoginPage));
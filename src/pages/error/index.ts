import { Error404 } from "./error";
import {connect} from "../../store";
import {withRouter} from "../../utils/Router";

export default withRouter(connect((state: any) => ({user: state.user || {}}), Error404));
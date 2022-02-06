import ChatPage from "./chat";
import {withRouter} from "../../../utils/Router";
import Block from "../../../utils/Block";

export default withRouter(<typeof Block>ChatPage);

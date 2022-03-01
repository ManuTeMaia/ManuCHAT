import {connect} from "../../../store";
import { SearchResults } from "./search-results";
import Block from "../../../utils/Block";

export default connect((state) => ({
	result: state.user.search || [],
}), <typeof Block>SearchResults);
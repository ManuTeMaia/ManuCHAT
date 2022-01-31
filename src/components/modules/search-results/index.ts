import {connect} from "../../../store";
import { SearchResults } from "./search-results";

export default connect((state: string) => ({
	result: state.user.search || [],
}), SearchResults);
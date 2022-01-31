import {connect} from "../../../store";
import { SearchResults } from "./search-results";

export default connect((state: any) => ({
	search: state.user.search,
}), SearchResults);
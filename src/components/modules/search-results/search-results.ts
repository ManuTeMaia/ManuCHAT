import Block from "../../../utils/Block";
import "./search-results.pcss";
import {UserData} from "../../../api/authAPI";
import {connect, store} from "../../../store";
import {withRouter} from "../../../utils/Router";
import {ChatBodyPage} from "../../../pages/chats/chat-body/chat-body";

interface SearchResultsProps {
	search: UserData | undefined;
}

export class SearchResults extends Block<SearchResultsProps> {
	constructor(props: SearchResultsProps) {
		super({...props});
		console.log(props);
	}

	static getName(): string {
		return "SearchResults";
	}

componentDidMount(props?: SearchResultsProps): typeof props {
	const searchResult = store.getState().search;
	props = {...props, search: searchResult};
	return props;
}

	render(): string {
		//language=hbs
		return `
	            {{#each search}}
	                {{{Checkbox id=this.id name=this.login label=this.first_name}}}
	            {{/each}}       
		`;
	}
}

export default withRouter(connect((state: any) => ({
	search: state.search || state.user.search,
}), ChatBodyPage as typeof Block));

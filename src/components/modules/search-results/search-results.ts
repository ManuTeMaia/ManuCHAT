import Block from "../../../utils/Block";
import {UserData} from "../../../api/authAPI";
import isEqual from "../../../helpers/isEqual";
import {ChatUsersPopupProps} from "../add-user-popup/add-user-popup";

interface SearchResultsProps {
	search: UserData[];
}

export class SearchResults extends Block<SearchResultsProps> {
	constructor(props: SearchResultsProps) {
		super({...props});
	}

	protected getStateFromProps(props: SearchResultsProps) {
		this.state = {
			result: props.search
		};
	}

	componentDidUpdate(oldProps: SearchResultsProps, newProps: SearchResultsProps) {
		return isEqual(oldProps, newProps);
	}

	static getName(): string {
		return "SearchResults";
	}

	render(): string {
		//language=hbs
		return `
			<div>
	            {{#each result}}
	                {{{Checkbox id=this.id name=this.login label=this.first_name}}}
	            {{/each}}
			</div>
		`;
	}
}
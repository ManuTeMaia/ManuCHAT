import Block from "../../../utils/Block";
import {UserData} from "../../../api/authAPI";
import isEqual from "../../../helpers/isEqual";

interface SearchResultsProps {
	result: UserData[];
}

export class SearchResults extends Block<SearchResultsProps> {
	constructor(props: SearchResultsProps) {
		super({...props});
	}

	componentDidUpdate(oldProps:SearchResultsProps, newProps:SearchResultsProps): boolean {
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
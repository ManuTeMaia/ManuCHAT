import Store from "../utils/Store";
import Block from "../utils/Block";
import user from "./user.store";
import chats from "./chat.store";
import response from "./respose.store";

export const store = new Store({
	user,
	chats,
	response
});


export function connect(stateToProps: (state: any) => any, Component: typeof Block): any {
	return class WithStore extends Component {
		constructor(props: any) {
			super({...props, ...stateToProps(store.getState())});
		}

		componentDidMount(props: any) {
			super.componentDidMount(props);

			store.on("changed", () => {
				//console.log(stateToProps(store.getState()));
				this.setProps({
					...this.props,
					...stateToProps(store.getState())
				});
			});
		}
	};
}
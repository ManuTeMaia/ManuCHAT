import Store from "../utils/Store";
import Block from "../utils/Block";
import profile from "./profile.store";
import user from "./user.store";

export const store = new Store({
	user,
	profile
});


export function connect(stateToProps: (state: any) => any, Component: typeof Block) {
	return class WithStore extends Component {
		constructor(props: any) {
			super({...props, ...stateToProps(store.getState())});
		}

		componentDidMount(props: any) {
			super.componentDidMount(props);

			store.on("changed", () => {
				//console.log(...stateToProps(store.getState()));
				this.setProps({
					...this.props,
					...stateToProps(store.getState())
				});
			});
		}
	};
}
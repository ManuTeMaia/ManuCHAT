import Store from "../utils/Store";
import Block, {Indexed} from "../utils/Block";
import user from "./user.store";
import chats from "./chat.store";

export const store = new Store({
	user,
	chats
});


export function connect(stateToProps: (state: Indexed) => Indexed, Component: typeof Block): any {
	return class WithStore extends Component {
		constructor(props: any) {
			super({...props, ...stateToProps(store.getState())});
		}

		componentDidMount(props: any) {
			super.componentDidMount(props);

			store.on("changed", () => {

				this.setProps({
					...this.props,
					...stateToProps(store.getState())
				});
			});
		}
	};
}
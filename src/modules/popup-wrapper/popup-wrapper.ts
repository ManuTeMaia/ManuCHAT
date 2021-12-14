import Block from "../../utils/Block";
import template from "./popup-wrapper.hbs";
import "./popup-wrapper.pcss";
import AvatarPopup from "../../components/modules/avatar-popup/avatar-popup";
import NewChatPopup from "../../components/modules/chat-popup/new-chat-popup";
import AttachPopup from "../attach-popup/attach-popup";
import Link from "../../components/elements/link/link";

type PopupWrapperType = {
    popupName: string;
    popupTitle: string;
    popupChoice: "avatarPopup" | "newChatPopup" | "chatUsersPopup";
    events?: {
        click: (e: Event) => void;
    }
}

class PopupWrapper extends Block <PopupWrapperType>{
    constructor(props: PopupWrapperType) {
        super(props);
    }
    getStateFromProps() {
        this.state = {
            popupClose: (e: Event) => {
                e.preventDefault();
                console.log(this.props.popupName);
                document.querySelector(`[data-popup=${this.props.popupName}]`)?.classList.add("hidden");
            }
        };
    }
    render(): string {

        let popupContent = {};
        switch (this.props.popupChoice) {
            case "avatarPopup":
                popupContent =  new AvatarPopup({...this.props});
                break;
            case "newChatPopup":
                popupContent  = new NewChatPopup({...this.props});
                break;
            case "chatUsersPopup":
                popupContent = new AttachPopup({...this.props});
                break;

        }
        //language=hbs
        return `
            <div class="popup hidden" data-popup="{{popupName}}">
                <div class="popup-overlay"></div>
                <div class="popup-wrapper">
                    {{{Link url="" class="popup-close" text="" onClick=popupClose}}}
                    <h4>{{popupTitle}}</h4>
                    {{{popupContent}}}
                </div>
            </div>
        `;
    }

}
export default PopupWrapper;
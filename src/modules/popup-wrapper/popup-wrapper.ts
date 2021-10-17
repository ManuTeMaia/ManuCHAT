import Block from "../../utils/Block";
import template from "./popup-wrapper.hbs";
import "./popup-wrapper.pcss";
import AvatarPopup from "../avatar-popup/avatar-popup";
import ChatPopup from "../chat-popup/chat-popup";
import AttachPopup from "../attach-popup/attach-popup";
import Link from "../../components/links/links";

type PopupWrapperType = {
    popupName: string;
    popupTitle: string;
    popupChoice: "avatarPopup" | "chatPopup" | "attachPopup";
    events?: {
        click: (e: Event) => void;
    }
}

class PopupWrapper extends Block <PopupWrapperType>{
    constructor(props: PopupWrapperType) {
        super(props);
    }

    render():DocumentFragment {

       const closeLink = new Link({
           url:"",
           class:"popup-close",
           text:"X",
           events: {
               click: (e: Event) => {
                   e.preventDefault();
                   document.querySelector(".popup")?.classList.add("hidden");
               }
           }
       });

        let popupContent = {};
        switch (this.props.popupChoice) {
            case "avatarPopup":
                popupContent =  new AvatarPopup({...this.props});
                break;
            case "chatPopup":
                popupContent  = new ChatPopup({...this.props});
                break;
            case "attachPopup":
                popupContent = new AttachPopup({...this.props});
                break;

        }

        return this.compile(template, {
            ...this.props,
            closeLink,
            popupContent
        });
    }

}
export default PopupWrapper;
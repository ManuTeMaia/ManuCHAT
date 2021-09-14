import Handlebars from "handlebars/dist/handlebars.runtime";
import template from "./avatar.hbs";
import "./avatar.pcss";

//Handlebars.registerPartial("avatar", template);

class Avatar extends Block {
    render() {
        const fragment = compile(
          this.tmpl,
          { 
            name: "John Doe", 
            button: new Button({ 
              label: "Logout", 
              events: { click: this.logout }
            })
          }
        );
      
        this.root.appendChild(fragment); // this.root — корневой элемент компонента, можно брать просто fragment.firstChild например
        
        // можем тут навешивать ивенты, дергать lifecycle хуки, манипулировать DOM и тд и тп
      
        return this.root;
      }
}
export default Avatar;
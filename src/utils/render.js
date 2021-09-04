export default class Render {
    constructor(el, action) {
        this._el = el;
        this._action = action;
        el.onclick = this.onClick.bind(this);
    }

    save() {
        alert('сохраняю');
    }

    load() {
        alert('загружаю');
    }

    search() {
        alert('ищу');
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

new Render(menu);
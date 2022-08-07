export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItems(items){
        this._initialArray = items;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems () {
        this._initialArray.reverse().forEach(item => {
            this._renderer(item); 
        });

    }

}
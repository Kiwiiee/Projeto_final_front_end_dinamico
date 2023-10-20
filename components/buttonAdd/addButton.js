class addButton extends HTMLElement{

    connectedCallback(){
        this.innerHTML = /*html*/`
            <div id="buto">
                <p> + </p>
            </div>
        `
    }
}

customElements.define("add-button", addButton)
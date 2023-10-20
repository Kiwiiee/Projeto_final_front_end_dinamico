class Card extends HTMLElement{

    connectedCallback(){
        this.innerHTML = /*html*/`
            <div class="card">
                <h3>${this.title}</h3>
            </div>
        `
        this.style.color = "red"
    }
}

customElements.define("component-card", Card)
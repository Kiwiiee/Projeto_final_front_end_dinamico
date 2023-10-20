class Card extends HTMLElement{

    connectedCallback(){
        this.innerHTML = /*html*/`
            <div class="card" draggable="true">
                
                <h3>${this.title}</h3>

                <div class="status">
                
                </div>
                <div class="content">
                
                </div>
            </div>
        `
        this.style.color = "red"
    }
}

customElements.define("component-card", Card)
class Card extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add("card");
        this.draggable = true;
        this.innerHTML = /*html*/`
            <div  class="card-content">
                <h3>${this.title}</h3>

                <div class="status">
                
                </div>
                <div class="content">
                
                </div>
            </div>
        `
    }
}

customElements.define("component-card", Card);

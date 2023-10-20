const butt = document.querySelector("add-button")
const columns = document.getElementById("column")
const modal = document.getElementById("modal")


butt.addEventListener("click", () => {
    modal.classList.add("modalVisible");
})


// modal.addEventListener("click", () => {
//     modal.classList.remove("modalVisible");
// })
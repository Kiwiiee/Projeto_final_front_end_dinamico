const butt = document.querySelector("add-button");
const columns = document.getElementById("column");
const modal = document.getElementById("modal");
const modaldois = document.getElementById("modaldois");

butt.addEventListener("click", () => {
  modal.classList.add("modalVisible");
});


async function updatedCardsWithFirebase() {
  const tasks = await getDocs(collection(store, uid));
  clearDropzone();

  tasks.forEach((doc) => {
    const data = doc.data();
    const element = document.createElement("component-card");
    element.title = data.name;
    if (data.column == "todo") {
      todo.appendChild(element);
    } else if (data.column == "progress") {
      progress.appendChild(element);
    } else if (data.column == "done") {
      done.appendChild(element);
    }
  });
}

function clearDropzone() {
  const dropzones = document.querySelectorAll(".dropzone");

  dropzones.forEach((dropzone) => {
    dropzone.innerHTML = "";
  });
}

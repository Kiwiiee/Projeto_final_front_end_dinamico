import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getFirestore, getDocs, updateDoc,deleteDoc , collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");
const modal = document.getElementById("modal");
const modaldois = document.getElementById("modaldois");
const modaldoisForm = document.getElementById("modaldois-form");

const firebaseConfig = {
    apiKey: "AIzaSyCg9aild2T5jd9b9WJBxVWfrBoopwn4fCs",
    authDomain: "goada-d6121.firebaseapp.com",
    projectId: "goada-d6121",
    storageBucket: "goada-d6121.appspot.com",
    messagingSenderId: "630141478826",
    appId: "1:630141478826:web:39fd58178453ca968cadd3"
};

const uid = localStorage.getItem("uid");
if (uid == "" || uid == undefined) {
    window.location.href = "/index.html"
}
const app = initializeApp(firebaseConfig);

const store = getFirestore(app);
updatedCardsWithFirebase();

modaldoisForm.addEventListener("submit", async(e)=>{
    e.preventDefault()
    const id = modaldois.getAttribute("data-uid");
    const docRef = doc(store, uid, id);

    const title = document.getElementById("modaldois-titulo").value;
    const priority = document.getElementsByName("modaldois-prioridad");
    let priorityValue = "";

    for (let i = 0; i < priority.length; i++) {
        if (priority[i].checked)
            priorityValue = priority[i].value;
    }
    modaldois.classList.remove("modalVisible")
    const conclusion = document.getElementById("modaldois-data").value;
    const description = document.getElementById("modaldois-descricao").value;

    const updateTimestamp = await updateDoc(docRef, {
        name: title,
        priority: priorityValue,
        description: description,
        conclusion: new Date(conclusion)
    });
    updatedCardsWithFirebase()
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    modal.classList.remove("modalVisible")
    const title = document.getElementById("titulo").value;
    const priority = document.getElementsByName("prioridad");
    let priorityValue = "";

    for (let i = 0; i < priority.length; i++) {
        if (priority[i].checked)
            priorityValue = priority[i].value;
    }
    const conclusion = document.getElementById("data").value;
    const description = document.getElementById("descricao").value;
    const id = firestoreAutoId();

    await setDoc(doc(store, uid, id), {
        id: id,
        name: title,
        priority: priorityValue,
        column: "todo",
        description: description,
        conclusion: new Date(conclusion).toISOString().substring(0,10)
    });
    updatedCardsWithFirebase()
})

function firestoreAutoId() {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let autoId = ''

    for (let i = 0; i < 20; i++) {
        autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
        )
    }
    return autoId
}

async function updatedCardsWithFirebase() {

    const tasks = await getDocs(collection(store, uid));
    clearDropzone();

    tasks.forEach((doc) => {

        const data = doc.data();
        const element = document.createElement("component-card");
        element.addEventListener("dblclick", (e)=>{
            const el = e.target;
            const id = el.getAttribute("data-uid");
            modaldois.setAttribute("data-uid", id);
            modaldois.classList.add("modalVisible");

            document.getElementById("modaldois-titulo").value = data.name;
            const prio = document.getElementsByName("modaldois-prioridad");

            for (let i = 0; i < prio.length; i++) {
                console.log(prio[i].value, data.priority)
                if (prio[i].value == data.priority)
                    prio[i].checked = true
            }
            console.log((new Date(data.conclusion)).toISOString().substring(0,10))
            document.getElementById("modaldois-data").value = (new Date(data.conclusion)).toISOString().substring(0,10);
            document.getElementById("modaldois-descricao").value = data.description;
            
        })
        element.title = data.name;
        element.uid = data.id;
        element.priority = data.priority;
        

        if (data.column == "todo") {
            todo.querySelector("div").appendChild(element)
        } else if (data.column == "progress") {
            progress.querySelector("div").appendChild(element)
        } else if (data.column == "done") {
            done.querySelector("div").appendChild(element)
        }

    })

    const cards = document.querySelectorAll(".card");
    const dropzones = document.querySelectorAll(".dropzone");

    cards.forEach((card) => {
        card.addEventListener("dragstart", dragstart);
        card.addEventListener("dragend", dragend);
    });

    function dragstart() {
        dropzones.forEach((dropzone) => dropzone.classList.add("highlight"));

        this.classList.add("is-dragging");
    }

    function dragend() {
        dropzones.forEach((dropzone) => dropzone.classList.remove("highlight"));
        this.classList.remove("is-dragging");

        const column = this.parentElement.getAttribute("data-name");
        const id = this.uid;
        updateColumn(id, column)
    }

    dropzones.forEach((dropzone) => {
        dropzone.addEventListener("dragover", dragover);
        dropzone.addEventListener("dragleave", dragleave);
        dropzone.addEventListener("drop", drop);
    });

    function dragover() {
        this.classList.add("over");

        const cardBeingDragged = document.querySelector(".is-dragging");

        this.appendChild(cardBeingDragged);
    }

    function dragleave() {
        this.classList.remove("over");
    }

    function drop() {
        this.classList.remove("over");
    }
}

async function updateColumn(id, column) {
    const docRef = doc(store, uid, id);

    const updateTimestamp = await updateDoc(docRef, {
        column: column
    });
}
function clearDropzone() {
    const dropzones = document.querySelectorAll('.dropzone');

    dropzones.forEach(dropzone => {
        dropzone.innerHTML = "";
    })
}

document.getElementById("removeButton").addEventListener("click", (e)=>{
    e.preventDefault();
    const id = modaldois.getAttribute("data-uid");
    modaldois.classList.remove("modalVisible");
    deleteDoc(doc(store, uid, id));
    updatedCardsWithFirebase()
})

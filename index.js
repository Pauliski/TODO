const addButton = document.querySelector("#btn");
const allNote = document.querySelector("#allNote");
let LIST, id;
// Retrieving previous todo and assigning to a const data
let data = localStorage.getItem("TODO");

//if data is not an empty string then convert it to a JSON object
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach((item) => {
    addToDo(item.task, item.id, item.trash);
  });
}

function addToDo(toDo, id, trash) {
  if (trash) {
    return;
  }

  const eachItem = `<span class="item"><input value="${toDo}" id="${id}" class="txt" job="" disabled><button class="editBtn btn" id="${id}" job="edit">Edit</button><button class="deleteBtn btn"  job="delete" id="${id}">Delete</button><span>`;
  allNote.insertAdjacentHTML("beforeend", eachItem);
}

addButton.addEventListener("click", addNote);

function addNote() {
  const toDo = document.querySelector("#Note").value;

  if (toDo) {
    addToDo(toDo, id, false);
    LIST.push({
      task: toDo,
      id: id,
      trash: false,
    });
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
    document.querySelector("#Note").value = "";
  }
}

function removeNote(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

function editNote(element) {
  if (element.innerHTML == "Edit") {
    element.parentNode.querySelector(".txt").disabled = false;
    element.innerHTML = "Save";
    element.attributes.job.value = "save";
  } else if (element.innerHTML == "Save") {
    element.parentNode.querySelector(".txt").disabled = true;
    element.innerHTML = "Edit";
    element.attributes.job.value = "edit";
    LIST[element.id].task = element.parentNode.querySelector(".txt").value;
  }
}
allNote.addEventListener("click", editDel);
function editDel(e) {
  const element = e.target;
  console.log(element);
  const elementJob = element.attributes.job.value;

  if (elementJob == "edit") {
    editNote(element);
  } else if (elementJob == "save") {
    editNote(element);
  } else if (elementJob == "delete") {
    removeNote(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

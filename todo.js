const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function sortId(ul, array) {
  for (const i in array) {
    const parseI = parseInt(i, 10);
    ul.childNodes[parseI].id = parseI + 1;
    array[parseI].id = parseI + 1;
  }
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  console.dir();
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  sortId(ul, toDos);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(deleteBtn);
  li.appendChild(span);
  li.id = newId;
  li.className = "toDo";
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

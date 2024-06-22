const taskInput = document.querySelector(".task-input");
const submitButton = document.querySelector(".submit-btn");
const taskList = document.querySelector(".task-list");

taskInput.addEventListener("keypress", handleSubmit);

function handleSubmit(e) {
  if (e.key === "Enter") {
    if (!e.shiftKey) {
      e.preventDefault();
      if (taskInput.value === "") return;
      const val = taskInput.value;
      handleTaskInsertion(val);

      taskInput.value = "";
      taskInput.focus();
    }
  }
}

function handleTaskInsertion(val, localStorageID) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const span = document.createElement("span");
  span.textContent = val;

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit-icon");
  editIcon.addEventListener("click", handleEdit);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");
  deleteIcon.addEventListener("click", handleDelete);

  const div = document.createElement("div");
  div.classList.add("icons");
  div.appendChild(editIcon);
  div.appendChild(deleteIcon);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("check-box");
  checkBox.addEventListener("click", handleCheck);

  taskItem.appendChild(checkBox);

  taskItem.appendChild(span);
  taskItem.appendChild(div);
  taskList.appendChild(taskItem);
}

function handleDelete(e) {
  const taskItem = e.target.parentElement.parentElement;
  taskList.removeChild(taskItem);
}

function handleEdit(e) {
  e.target.classList.add("hidden");

  const taskItem = e.target.parentElement.parentElement;
  const span = taskItem.querySelector("span");
  const val = span.innerText;

  const newTextArea = document.createElement("textarea");
  newTextArea.value = val;
  newTextArea.classList.add("task-input");

  taskItem.querySelector(".check-box").classList.add("hidden");

  taskItem.replaceChild(newTextArea, span);
  newTextArea.addEventListener("keypress", handleSave);
}

function handleSave(e) {
  if (e.key === "Enter") {
    if (!e.shiftKey) {
      e.preventDefault();
      const taskItem = e.target.parentElement;
      const textarea = taskItem.querySelector("textarea");
      if (textarea.value === "") return;

      const span = document.createElement("span");
      span.innerText = textarea.value;

      const checkBox = taskItem.querySelector(".check-box");
      checkBox.classList.remove("hidden");
      checkBox.checked = false;

      taskItem.querySelector(".edit-icon").classList.remove("hidden");
      taskItem.replaceChild(span, textarea);
    }
  }
}

function handleCheck(e) {
  const label = e.target.nextElementSibling;
  if (e.target.checked) {
    label.classList.add("strikethrough");
  } else {
    label.classList.remove("strikethrough");
  }
}

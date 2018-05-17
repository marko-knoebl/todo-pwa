const todos = [
  { text: "groceries", done: false },
  { text: "gardening", done: true },
  { text: "taxes", done: false }
];

const mainElement = document.getElementById("main");
const inputElement = document.getElementById("new-todo");
const formElement = document.getElementById("new-todo-form");

const renderTodos = () => {
  mainElement.innerHTML = "";
  for (let [index, todo] of todos.entries()) {
    const todoElement = document.createElement("div");
    const prefix = todo.done ? "DONE: " : "TODO: ";
    todoElement.innerHTML = prefix + todo.text;
    todoElement.classList.add("todo");
    if (todo.done) {
      todoElement.classList.add("done");
    }
    todoElement.addEventListener("click", () => {
      toggleTodo(index);
    });
    mainElement.appendChild(todoElement);
  }
};

const addTodo = todoText => {
  todos.push({ text: todoText, done: false });
};

const toggleTodo = todoIndex => {
  todos[todoIndex].done = !todos[todoIndex].done;
  renderTodos();
};

const handleSubmit = submitEvent => {
  submitEvent.preventDefault();
  const newTodoText = inputElement.value;
  inputElement.value = "";
  todos.push({ text: newTodoText, done: false });
  renderTodos();
};
formElement.addEventListener("submit", handleSubmit);

const setupServiceWorker = () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register("./service-worker.js").then(
      () => {
        console.log("service worker registered");
      },
      () => {
        console.log("failed");
      }
    );
  }
};

setupServiceWorker();

renderTodos();

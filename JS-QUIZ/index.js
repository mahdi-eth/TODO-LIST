import { handleCreateNewTodo } from "./modules/controller/handleCreateTodo.js";

const submitTodoButton = document.getElementById("submit");
submitTodoButton.addEventListener("click", handleCreateNewTodo);

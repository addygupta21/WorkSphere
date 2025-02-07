import bridge from "../../shared/bridges/bridge";
import todoService from "../service/todo/todo.service";
import { Todo } from "../../types";

export const registerTodoListeners = () => {
  bridge.subscribe("addTodo", (todo: Todo) => {
    console.log("Listener: 'addTodo' event received", todo);
    todoService.addTodo(todo);
  });

  bridge.subscribe("updateTodo", (todo: Todo) => {
    console.log("Listener: 'updateTodo' event received", todo);
    todoService.updateTodo(todo);
  });

  bridge.subscribe("deleteTodo", (id: number) => {
    console.log("Listener: 'deleteTodo' event received", id);
    todoService.removeTodo(id);
  });
};

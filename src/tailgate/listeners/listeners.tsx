import bridge from "../../shared/bridges/bridge";
import todoService from "../service/todo/todo.service";
import { Todo } from "../../types";
import { EVENTS } from "../../shared/constants/events";

export const registerTodoListeners = () => {
  bridge.subscribe(EVENTS.ADD_TODO, (todo: Todo) => {
    console.log("Listener: 'addTodo' event received", todo);
    todoService.addTodo(todo);
  });

  bridge.subscribe(EVENTS.UPDATE_TODO, (todo: Todo) => {
    console.log("Listener: 'updateTodo' event received", todo);
    todoService.updateTodo(todo);
  });

  bridge.subscribe(EVENTS.DELETE_TODO, (id: number) => {
    console.log("Listener: 'deleteTodo' event received", id);
    todoService.removeTodo(id);
  });
};

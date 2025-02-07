import bridge from "../../shared/bridges/bridge";
import todoService from "../service/todo/todo.service";
import { Todo } from "../../types";

export const registerTodoListeners = () => {
  bridge.subscribe(
    "addTodo",
    (topic, todo: Todo) => {
      console.log("Listener: addTodo event received", todo);
      todoService.addTodo(todo);
    },
    "addTodoListener"
  );

  bridge.subscribe(
    "updateTodo",
    (topic, todo: Todo) => {
      console.log("Listener: 'updateTodo' event received", todo);
      todoService.updateTodo(todo);
    },
    "updateTodoListener"
  );
  bridge.subscribe(
    "deleteTodo",
    (topic, id: number) => {
      console.log("Listener: 'deleteTodo' event received", id);
      todoService.removeTodo(id);
    },
    "deleteTodoListener"
  );

  bridge.subscribe(
    "fetchTodos",
    (topic, args) => {
      console.log("Listener: 'fetchTodos' event received", args);
      // In this setup, the liveQuery is already publishing "todosFetched"
      // so an explicit fetch may not be needed.
    },
    "fetchTodosListener"
  );
};

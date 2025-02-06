import { Todo } from "../../../types";
import * as TodoRepo from "./todo.repo";
import { db } from "./todo.repo";
import { liveQuery } from "dexie";
import { Subscription } from "dexie";
// import store from "../../../vanguard/redux/store";
import { updateTodoList } from "../../../vanguard/redux/todo.store";

export const setupTodoSubscription = liveQuery(() => db.todos.toArray());

class TodoService {
  subscription?: Subscription;
  public async addTodo(todo: Todo) {
    try {
      console.log("AddTodo Service Worked");
      await TodoRepo.addTodo(todo);
    } catch (err) {
      throw err;
    }
  }

  public async updateTodo(todo: Todo) {
    try {
      console.log("UpdateTodo Service Worked");
      await TodoRepo.updateTodo(todo);
    } catch (err) {
      throw err;
    }
  }
  public async removeTodo(id: number) {
    try {
      if (!id) {
        throw new Error("Correct ID is required");
      }
      console.log("DelteTodo Service Worked");
      await TodoRepo.deleteTodo(id);
    } catch (err) {
      throw err;
    }
  }
  public setupSubscription(filter: string, sort: string, dispatch?: any) {
    // 1 cleanup old subscription;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // 2 setup new subscription;
    // this.liveQueryObservable = TodoRepo.setupLiveQuery();
    // 3 subscribe => redux store update
    this.subscription = TodoRepo.setupLiveQuery(filter, sort).subscribe(
      (todos: Todo[]) => {
        if (todos) {
          console.log("live todos update from service", todos);
          dispatch(updateTodoList(todos));
        }
      },
      (err) => {
        throw err;
      }
    );
    // 4 use live query to sort and filter todo's
  }
}

export default new TodoService();

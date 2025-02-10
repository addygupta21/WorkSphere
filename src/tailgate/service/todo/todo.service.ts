import { Todo } from "../../../types";
import * as TodoRepo from "./todo.repo";
import { db } from "./todo.repo";
import { liveQuery } from "dexie";
import { Subscription } from "dexie";
import bridge from "../../../shared/bridges/bridge";
import { EVENTS } from "../../../shared/constants/events";

export const setupTodoSubscription = liveQuery(() => db.todos.toArray());

class TodoService {
  subscription?: Subscription;
  public async addTodo(todo: Todo) {
    try {
      console.log("AddTodo Service Worked");
      await TodoRepo.addTodo(todo);
    } catch (err) {
      console.error("Error in addTodo service:", err);
      throw new Error("Failed to add todo in service.");
    }
  }

  public async updateTodo(todo: Todo) {
    try {
      console.log("UpdateTodo Service Worked");
      await TodoRepo.updateTodo(todo);
    } catch (err) {
      console.error("Error in updateTodo service:", err);
      throw new Error("Failed to update todo in service.");
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
      console.error("Error in removeTodo service:", err);
      throw new Error("Failed to remove todo in service.");
    }
  }
  public setupSubscription(filter: string, sort: string, dispatch?: any) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = TodoRepo.setupLiveQuery(filter, sort).subscribe(
      (todos: Todo[]) => {
        if (todos) {
          console.log("live todos update from service", todos);
          bridge.publish(EVENTS.TODOS_FETCHED, todos);
        }
      },
      (err) => {
        console.error("Error in live query subscription:", err);
        throw new Error("Failed to subscribe to live todos.");
      }
    );
  }
}

export default new TodoService();

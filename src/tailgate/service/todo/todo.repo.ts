import Dexie, { type Table } from "dexie";
import { Todo } from "../../../types";
import { SORTING } from "../../../shared/constants/sorting";
import { STATUS } from "../../../shared/constants/status";
// import bridge from "../../../shared/bridges/bridge";

const DB_NAME = "todoDBase";
class Todo_DB extends Dexie {
  todos: Table<Todo, number>;

  constructor() {
    super(DB_NAME);
    this.version(4).stores({
      todos:
        "++id, item, description, dueDate, priority, status, completed, subTodos",
    });
    this.todos = this.table("todos");
  }
}

export const db = new Todo_DB();

export const addTodo = async (todo: Todo) => {
  db.transaction("rw", db.todos, async () => {
    const id = await db.todos.add(todo);
    return { ...todo, id };
  })
    .then(() => {
      console.log("Transaction committed after addTodo");
      // bridge.publish("todoAdded", todo);
    })
    .catch((err) => {
      console.log("Transaction error in addTodo:", err);
      // bridge.publish("addingTodoFailed", err);
      throw err;
    });
};

export const updateTodo = async (todo: Todo) => {
  return db
    .transaction("rw", db.todos, async () => {
      if (todo.id === undefined) {
        throw new Error("Todo ID is required for update");
      }
      await db.todos.put(todo);
    })
    .then(() => {
      console.log("Transaction committed after updateTodo");
      // bridge.publish("todoUpdated", todo);
    })
    .catch((error) => {
      console.error("Transaction error in updateTodo:", error);
      // bridge.publish("editingTodoFailed", error);
      throw error;
    });
};

export const deleteTodo = async (id: number) => {
  return db
    .transaction("rw", db.todos, async () => {
      await db.todos.delete(id);
    })
    .then(() => {
      console.log("Transaction committed after deleteTodo");
      // bridge.publish("todoDeleted", id);
    })
    .catch((error) => {
      console.error("Transaction error in deleteTodo:", error);
      // bridge.publish("deletingTodoFailed", error);
      throw error;
    });
};

export const setupLiveQuery = (filter: string, sort: string) => {
  return Dexie.liveQuery(async () => {
    let collection: Dexie.Collection<Todo, number>;
    if (filter !== STATUS.ALL) {
      collection = db.todos.where("status").equals(filter);
    } else {
      collection = db.todos.toCollection();
    }

    console.log(collection);
    const todos = await collection.toArray();

    // Sorting logic for priority (High > Medium > Low)
    if (sort === SORTING.PRIORITY) {
      return todos.sort((a, b) => {
        const priorityOrder: { [key: string]: number } = {
          high: 3,
          medium: 2,
          low: 1,
        };
        const priorityA = a.priority ? a.priority.toLowerCase() : "low";
        const priorityB = b.priority ? b.priority.toLowerCase() : "low";
        return priorityOrder[priorityB] - priorityOrder[priorityA]; // Sort in descending order (High > Medium > Low)
      });
    } else if (sort === SORTING.DUE_DATE) {
      return todos.sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }
    // If no sort option is selected, return all todos
    else {
      return todos;
    }
  });
};

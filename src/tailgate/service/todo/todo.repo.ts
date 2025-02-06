import Dexie, { type Table } from "dexie";
import { Todo } from "../../../types";
import { SORTING } from "../../../shared/constants/sorting";
import { STATUS } from "../../../shared/constants/status";

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
    })
    .catch((err) => {
      console.log("Transaction error in addTodo:", err);
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
    })
    .catch((error) => {
      console.error("Transaction error in updateTodo:", error);
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
    })
    .catch((error) => {
      console.error("Transaction error in deleteTodo:", error);
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
    if (sort === SORTING.PRIORITY) {
      return await collection.sortBy("priority");
      // console.log(todo1);
      console.log(collection.sortBy("priority"));
      // return todo1;
    } else if (sort === SORTING.DUE_DATE) {
      return await collection.sortBy("dueDate");
    } else {
      return await collection.toArray();
    }
  });
};

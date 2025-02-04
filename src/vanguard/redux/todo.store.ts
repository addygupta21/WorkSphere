import {
  createSlice,
  PayloadAction,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as TodoRepo from "../../tailgate/service/indexedDB";

interface Todo {
  id: number;
  item: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  completed: boolean;
  subTodos: Todo[];
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (todo: Todo) => {
    try {
      await TodoRepo.addTodo(todo);
    } catch (err) {
      throw err;
    }
  }
);

export const removeTodoThunk = createAsyncThunk(
  "todos/removeTodo",
  async (id: number) => {
    try {
      await TodoRepo.deleteTodo(id);
    } catch (err) {
      throw err;
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    try {
      await TodoRepo.updateTodo(todo);
    } catch (err) {
      throw err;
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // addTodo(state, action: PayloadAction<Todo>) {
    //   TodoRepo.addTodo(action.payload);
    // },
    // removeTodo(state, action: PayloadAction<number>) {
    //   TodoRepo.deleteTodo(action.payload);
    // },
    // updateTodo(state, action: PayloadAction<Todo>) {
    //   TodoRepo.updateTodo(action.payload);
    // },
    // completeTodos(state, action: PayloadAction<number>) {
    //   const todo = state.todos.find((todo) => todo.id === action.payload);
    //   if (todo) {
    //     todo.completed = !todo.completed;
    //     todo.status = todo.completed ? "Done" : "Not Started";
    //     TodoRepo.updateTodo(todo);
    //   }
    // },
    updateTodoList(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
  },
});

export const {
  //   addTodo,
  //   removeTodo,
  //   updateTodo,
  //   completeTodos,
  updateTodoList,
} = todosSlice.actions;

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const reducer = todosSlice.reducer;

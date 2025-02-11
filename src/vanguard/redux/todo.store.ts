import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import bridge from "../../shared/bridges/bridge";
import { EVENTS } from "../../shared/constants/events";
import { Todo } from "../../types";

interface TodosState {
  todo_list: Todo[];
}

const initialState: TodosState = {
  todo_list: [],
};

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (todo: Todo) => {
    try {
      bridge.publish(EVENTS.ADD_TODO, todo);
    } catch (err) {
      throw err;
    }
  }
);

export const removeTodoThunk = createAsyncThunk(
  "todos/removeTodo",
  async (id: number) => {
    try {
      bridge.publish(EVENTS.DELETE_TODO, id);
    } catch (err) {
      throw err;
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    try {
      bridge.publish(EVENTS.UPDATE_TODO, todo);
    } catch (err) {
      throw err;
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodoList(state, action: PayloadAction<Todo[]>) {
      state.todo_list = [...action.payload];
    },
  },
});

export const { updateTodoList } = todosSlice.actions;
export default todosSlice.reducer;

export const selectTodoList = (state: { todos: TodosState }) =>
  state.todos.todo_list;

export const selectTodos = createSelector(
  [selectTodoList],
  (todo_list) => todo_list
);

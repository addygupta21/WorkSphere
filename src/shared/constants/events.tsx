export const EVENTS = {
  ADD_TODO: 'addTodo',
  UPDATE_TODO: 'updateTodo',
  DELETE_TODO: 'deleteTodo',
  TODOS_FETCHED: 'todosFetched',
} as const;

export type EventTypes = keyof typeof EVENTS;

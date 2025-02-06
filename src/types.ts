export interface Todo {
  id: number;
  item: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  completed: boolean;
  subTodos: Todo[];
}

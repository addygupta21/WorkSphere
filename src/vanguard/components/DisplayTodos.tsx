import React, { useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { STATUS } from "../constants/status";
import { SORTING } from "../constants/sorting";
import { GoPlus } from "react-icons/go";
import AddTodoModal from "./AddTodoModal";
import { Todo } from "../../types";

interface RootState {
  todos: Todo[];
}

const DisplayTodos: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  // const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>(STATUS.ALL);
  const [sort, setSort] = useState<string>(SORTING.PRIORITY);
  const [showModal, setShowModal] = useState<boolean>(false);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case STATUS.ALL:
        return true;
      case STATUS.COMPLETED:
        return todo.status === STATUS.COMPLETED;
      case STATUS.IN_PROGRESS:
        return todo.status === STATUS.IN_PROGRESS;
      case STATUS.NOT_STARTED:
        return todo.status === STATUS.NOT_STARTED;
      default:
        return true;
    }
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === SORTING.PRIORITY) {
      const priorityA = a.priority || "";
      const priorityB = b.priority || "";
      return priorityA.localeCompare(priorityB);
    }
    if (sort === SORTING.DUE_DATE) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  return (
    <div className="displayTodos">
      <div className="filter-contained">
        <div className="filters">
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value={STATUS.ALL}>All</option>
            <option value={STATUS.COMPLETED}>Completed</option>
            <option value={STATUS.IN_PROGRESS}>In Progress</option>
            <option value={STATUS.NOT_STARTED}>Not Started</option>
          </select>
          <select onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value={SORTING.PRIORITY}>Sort by Priority</option>
            <option value={SORTING.DUE_DATE}>Sort by Due Date</option>
          </select>
          <button
            className="add-btn-1"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            <GoPlus />
          </button>
        </div>
      </div>
      <ul>
        {sortedTodos.map(
          (
            todo // it's  a kind of a for loop only .......!!
          ) => (
            <TodoItem key={todo.id} item={todo} />
          )
        )}
      </ul>
      {showModal && <AddTodoModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DisplayTodos;

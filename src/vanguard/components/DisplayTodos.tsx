import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { STATUS } from "../constants/status";
import { SORTING } from "../constants/sorting";
import { GoPlus } from "react-icons/go";
import AddTodoModal from "./AddTodoModal";
import { Todo } from "../../types";
import { AppDispatch } from "../redux/store";
import todoService, {
} from "../../tailgate/service/todo/todo.service";
import { selectTodos } from "../redux/todo.store";

interface RootState {
  todos: {
    todo_list: Todo[];
  };
}

const DisplayTodos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos1 = useSelector(selectTodos);
  const [filter, setFilter] = useState<string>(STATUS.ALL);
  const [sort, setSort] = useState<string>(SORTING.PRIORITY);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    todoService.setupSubscription(filter, sort, dispatch);
  }, [dispatch, filter, sort]);

  return (
    <div className="displayTodos">
      
      <div className="filter-contained">
        {/* <div className="head"> <h1> Todo APP</h1></div> */}
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
        {(todos1 && Array.isArray(todos1) ? todos1 : []).map((todo) => (
          <TodoItem key={todo.id} item={todo} />
        ))}
      </ul>
      {showModal && <AddTodoModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DisplayTodos;

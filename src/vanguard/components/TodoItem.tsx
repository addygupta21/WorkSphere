import React, { useState } from "react";
import type { FC } from "react";
import { STATUS } from "../../shared/constants/status";
import { FaCircle, FaSpinner, FaCheckCircle } from "react-icons/fa";
import AddTodoModal from "./AddTodoModal";
import { removeTodoThunk, updateTodoThunk } from "../redux/todo.store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Todo } from "../../types";
import { PRIORITY } from "../../shared/constants/priority";

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { item } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const enableEditing = () => {
    setShowModal(true);
  };

  const handleStatusChange = () => {
    let newStatus: string;
    let newCompleted: boolean = false;

    switch (item.status) {
      case STATUS.NOT_STARTED:
        newStatus = STATUS.IN_PROGRESS;
        break;
      case STATUS.IN_PROGRESS:
        newStatus = STATUS.COMPLETED;
        newCompleted = true;
        break;
      case STATUS.COMPLETED:
        const confirmReset = window.confirm(
          'Do you want to revert the status to "Not Started"?'
        );
        if (confirmReset) {
          newStatus = STATUS.NOT_STARTED;
          newCompleted = false;
        } else {
          return;
        }
        break;
      default:
        newStatus = STATUS.NOT_STARTED;
        newCompleted = false;
    }

    dispatch(
      updateTodoThunk({
        id: item.id,
        item: item.item,
        description: item.description,
        status: newStatus,
        completed: newCompleted,
        dueDate: item.dueDate,
        priority: item.priority,
        subTodos: [],
      })
    );
  };

  const getStatusIcon = () => {
    switch (item.status) {
      case STATUS.NOT_STARTED:
        return <FaCircle className="status-icon" color="white" />;
      case STATUS.IN_PROGRESS:
        return <FaSpinner className="status-icon" color="#ff6f3c" />;
      case STATUS.COMPLETED:
        return <FaCheckCircle className="status-icon" color="#2ecc71" />;
      default:
      case STATUS.NOT_STARTED:
        return <FaCircle className="status-icon" color="white" />;
    }
  };

  const getPriorityIndicator = () => {
    switch (item.priority) {
      case PRIORITY.HIGH:
        return (
          <span
            className="priority-indicator high"
            style={{
              marginLeft: "8px",
              padding: "2px 6px",
              borderRadius: "4px",
              color: "#ff4d4f",
              fontWeight: "bold",
              animation: "pulse 1s infinite",
            }}
          >
            High
          </span>
        );
      case PRIORITY.MEDIUM:
        return (
          <span
            className="priority-indicator medium"
            style={{
              marginLeft: "8px",
              padding: "2px 6px",
              borderRadius: "4px",
              color: "#faad14",

              fontWeight: "bold",
            }}
          >
            Medium
          </span>
        );
      case PRIORITY.LOW:
        return (
          <span
            className="priority-indicator low"
            style={{
              marginLeft: "8px",
              padding: "2px 6px",
              borderRadius: "4px",
              color: "#52c41a",
              fontWeight: "bold",
            }}
          >
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <li className="todo-item">
      <div className="contained-1">

        <div className="todo-item-container-1">
          <div
            className="div-1"
            onClick={handleStatusChange}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
          >
            {getStatusIcon()}
            <div className="input-1">{item.item}</div>
          </div>
          <button onClick={enableEditing} className="edit-button">
            Edit
          </button>
        </div>

        <div className="todo-item-container-3">
          <div className="input-2">
            {item.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="todo-item-container-4">
          <div className="due-date">
            <span></span>
            <span>{item.dueDate}</span>
          </div>
          {getPriorityIndicator()}
          <button
            onClick={() => dispatch(removeTodoThunk(item.id))}
            className="delete-button"
          >
            Delete
          </button>
        </div>
        
      </div>
      {showModal && (
        <AddTodoModal onClose={() => setShowModal(false)} todo={{ ...item }} />
      )}
    </li>
  );
};

export default TodoItem;

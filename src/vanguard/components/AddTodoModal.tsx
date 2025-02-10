import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoThunk, updateTodoThunk } from "../redux/todo.store";
import { GoX } from "react-icons/go";
import { AppDispatch } from "../redux/store";
import { Todo } from "../../types";
import { PRIORITY } from "../../shared/constants/priority";

interface AddTodoModalProps {
  onClose: () => void;
  todo?: 
    Todo,
}

const AddTodoModal: React.FC<AddTodoModalProps> = (props) => {
  const { onClose, todo } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(todo?.item || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [dueDate, setDueDate] = useState(todo?.dueDate || "");
  const [priority, setPriority] = useState(todo?.priority || "High");

  const handleSaveTodo = () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate.trim() === "" ||
      priority.trim() === ""
    )
      return;
    try{
 if (todo) {
      dispatch(
        updateTodoThunk({
          id: todo.id,
          item: title,
          description,
          dueDate,
          priority,
          status: todo.status,
          completed: todo.completed,
          subTodos: [],
        })
      );
    } else {
      dispatch(
        addTodoThunk({
          id: Date.now(),
          item: title,
          description,
          dueDate,
          priority,
          status: "Not Started",
          completed: false,
          subTodos: [],
        })
      );
    }
    onClose();
  }
  catch(err){
    console.error("Error saving todo:", err);
      alert("Failed to save the todo.");
  }
    }
   
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Todo</h2>
          <button className="close-btn" onClick={onClose}>
            <GoX />
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-1">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="todo-input-1"
            />
          </div>
          <div className="modal-2">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="todo-input-2"
            />
          </div>
          <div className="modal-3">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="todo-input-3"
            />
            <select
              value={priority}
              onChange={(e) => {
                console.log("priority: ", e.target.value);
                setPriority(e.target.value);
              }}
              className="todo-input-4"
            >
              <option value= {PRIORITY.HIGH}>High</option>
              <option value={PRIORITY.MEDIUM}>Medium</option>
              <option value={PRIORITY.LOW}>Low</option>
            </select>
          </div>

          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSaveTodo}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;

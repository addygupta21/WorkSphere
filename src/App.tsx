import React from "react";
import "./vanguard/styles/main3.css";
import DisplayTodos from "./vanguard/components/DisplayTodos";
import "./index.css";
import { useEffect } from "react";
import { registerTodoListeners } from "./tailgate/listeners/listeners";

const App: React.FC = () => {
  useEffect(() => {
    // Register the tailgate listeners so that published events are handled.
    registerTodoListeners();
  }, []);
  return (
    <div className="App">
      <h1 className="text" style={{ color: "black" }}>
        Todo App
      </h1>
      <DisplayTodos />
    </div>
  );
};

export default App;

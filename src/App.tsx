import React from "react";
import "./vanguard/styles/main.css";
import DisplayTodos from "./vanguard/components/DisplayTodos";
import "./index.css";
import { useEffect } from "react";
import { registerTodoListeners } from "./tailgate/listeners/listeners";

const App: React.FC = () => {
  useEffect(() => {
    registerTodoListeners();
  }, []);
  return (
    <div className="App">
      <h1 className="text" style={{ color: "black" }}>
    
      </h1>
      <DisplayTodos />
    </div>
  );
};

export default App;

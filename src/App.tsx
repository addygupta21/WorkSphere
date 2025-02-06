import React from "react";
import "./vanguard/styles/main3.css";
import DisplayTodos from "./vanguard/components/DisplayTodos";
import "./index.css";

const App: React.FC = () => {
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

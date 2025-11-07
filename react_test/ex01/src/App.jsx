import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="container">
      <h1 className="title">카운터 앱</h1>
      <div className="countDisplay">{count}</div>
      <div className="buttonGroup">
        <button className="button" onClick={handleIncrement}>
          증가
        </button>
        <button className="button" onClick={handleDecrement}>
          감소
        </button>
        <button className="button" onClick={handleReset}>
          초기화
        </button>
      </div>
    </div>
  );
}

export default App;

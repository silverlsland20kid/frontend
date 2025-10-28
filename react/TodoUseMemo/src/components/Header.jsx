import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <h3>오늘은 📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
}

// React.memo()
// 컴포넌트 메모 기능
// - 부모가 리렌더링되어도 props가 바뀌지 않았다면 다시 렌더링하지 않음
// - 즉, “불필요한 리렌더링” 방지용 (성능 최적화)
export default React.memo(Header);

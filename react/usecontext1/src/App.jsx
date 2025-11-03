import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Child from "./Child";
export default function App() {
  // useState로 theme 상태를 관리 ("light" 또는 "dark")
  const [theme, setTheme] = useState("light");
  // 테마를 토글하는 함수 (light <-> dark 전환)
  const toggleTheme = () => {
    // prev: 이전 상태값을 안전하게 가져오는 콜백
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    // ThemeContext.Provider : Context를 통해 하위 컴포넌트에 데이터 전달
    // value 속성에 공유하고 싶은 값(여기선 theme과 toggleTheme)을 객체로 담음
    // Provider 하위에 있는 모든 컴포넌트가 theme와 toggleTheme를 useContext(ThemeContext)로 받아 쓸 수 있게 만든다.라는 뜻임
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          background: theme === "light" ? "#fff" : "#333",
          color: theme === "light" ? "#000" : "#fff",
          height: "100vh",
          padding: "20px",
        }}
      >
        <h1>Current Theme: {theme}</h1>
        {/* 하위 컴포넌트에 ThemeContext가 전달됨 */}
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

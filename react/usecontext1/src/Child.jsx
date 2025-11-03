import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Child() {
  // useContext 훅을 사용해 ThemeContext의 값(theme, toggleTheme)을 받아옴
  // App의 <ThemeContext.Provider value={{ theme, toggleTheme }}> 에서 전달된 객체가 여기로 들어옴
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <h2>Child Component</h2>
      {/* 부모(App)로부터 전달된 theme 값 표시 */}
      <p>Theme from Context: {theme}</p>

      {/* toggleTheme 함수 실행 → theme 상태가 light ↔ dark 전환 */}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

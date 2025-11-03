import React from "react";
import { createContext } from "react";

// ThemeContext.js
// 이 파일은 App 전체에서 공통으로 사용할 '테마 데이터'를 담는 컨테이너 역할을 함

// Context란?
//   - React에서 컴포넌트 간 데이터 전달 시 props를 단계마다 넘기지 않아도
//     전역적으로 데이터를 공유할 수 있게 해주는 기능

// createContext()
//   - '창고(Context)'를 하나 만드는 함수
//   - Provider(데이터 공급자)와 Consumer(데이터 수신자)를 함께 생성함
//   - 여기서는 ThemeContext.Provider와 ThemeContext.Consumer가 자동으로 만들어짐
// *** Provider(데이터 공급자)가 하위 컴포넌트(Child 등)에 전달하는 “데이터”임. 공유하고 싶은 값을 전역으로 보낼 때 쓰는 객체

// 초기값(null)
//   - createContext(null)은 기본값이 '없다'는 의미
//   - 나중에 App.jsx에서 <ThemeContext.Provider value={{theme, toggleTheme}}> 로 실제 데이터를 채우게 됌

// export로 내보내서 다른 컴포넌트(App, Child 등)에서 import해 사용
export const ThemeContext = createContext(null);

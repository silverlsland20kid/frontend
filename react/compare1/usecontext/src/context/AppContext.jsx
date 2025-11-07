import React, { createContext, useState, useContext } from "react";

// createContext()는 전역적으로 데이터를 공유하기 위한 "컨테이너" 같은 역할을 함
const AppContext = createContext();

// context Provider 컴포넌트
export default function AppProvider({ children }) {
  // 위의 전역함수를 담아 상태관리할 함수
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({
    name: "홍길동",
    age: 25,
  });

  // 상태 변경 함수들 (Context에서 공유할 로직)
  // 스프레드 연산자(...)로 기존 user 객체를 복사한 뒤 특정 속성만 갱신
  const updateUserName = (name) => setUser({ ...user, name });
  const updateUserAge = (age) => setUser({ ...user, age });

  // count 조작 할 수 있는 함수
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);
  const resetCount = () => setCount(0);

  // value 객체: Provider로 전달할 데이터 묶음
  // 이 안의 모든 데이터와 함수가 자식 컴포넌트 어디서든 사용 가능해짐
  const value = {
    count,
    user,
    incrementCount,
    decrementCount,
    resetCount,
    updateUserName,
    updateUserAge,
  };

  // Provider 컴포넌트 반환
  // children: Provider 안에 감싸진 모든 하위 컴포넌트들
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom Hook (Context 사용을 간단히 하기 위한 함수)
// 전역데이터를 꺼내쓰는 전용 훅. 어디서든 전역상태를 가져올 수 있음
export function useAppContext() {
  // useContext로 AppContext의 값을 가져옴
  const context = useContext(AppContext);

  // Provider 밖에서 사용될 경우 에러 발생시킴 → 안정성 확보
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}

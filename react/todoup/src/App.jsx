import React, { useRef, useReducer, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

// useReduce => 상태관리 (useState) 해주는 장치. 가독성높고 유지보수 쉬움
// const [state, dispatch] = useReducer(reducer, initalstate)
// state => 현재 상태값, dispatch => 상태변경 명령(액션)을 보낼 함수
// reducer => 상태를 실제로 변경하는 '로직함수' , initalstate => 초기상태값

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "react 공부하긔",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];

// 상태변화 로직
// reducer => 현재 상태에 +명령(action)을 받아서 새로운 상태(state)로 반환
// dispatch 실행 -> reducer 함수 호출 -> type: CREATE로 분기 -> return[action.newItem, ...state]; 실행되는 순서
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);
    default:
      return state;
  }
}

// 사용자가 클릭(입력) 동작을 하면 -> onCreate/onUpdate/onDelete -> disfatch([type:"..."]) 함수 실행
// reducer(state, action) 함수 호출 -> 새로운 state(todo)생성됨 -> 컴포넌트가 자동렌더링

export default function App() {
  // todo => 현재 할 일 목록
  // dispatch => 상태변경 명령(액션)을 보낼 함수
  // reducer => 상태를 실제로 변경하는 '로직함수'
  // mockTodo => 초기값
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });

    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({ type: "UPDATE", targetId });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({ type: "DELETE", targetId });
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />{" "}
      {/* 할 일 추가 입력창 (자식에게 onCreate 전달) */}
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />{" "}
      {/* 할 일 리스트 (현재 todo 상태 전달), 체크박스 클릭 시 해당 id의 isDone을 토글하도록 부모에게 요청*/}
    </div>
  );
}

import React, { useRef, useState } from 'react'
import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';

const mockTodo = [
  {
    id:0,
    isDone : false,
    content: "react 공부하긔",
    createdDate : new Date().getTime(),
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
]

export default function App() {

  // useState: 상태(state) 선언
  // todo : 할 일 목록 배열 (현재 상태)
  // setTodo : todo를 변경할 때 사용하는 함수
  const [todo, setTodo] = useState(mockTodo);
  
  // useRef: 렌더링 없이 값 저장용 변수 (변경되어도 컴포넌트가 다시 그려지지 않음)
  // 다음 아이템에 부여할 id를 기억함
  const idRef = useRef(3); // 현재 mockTodo의 마지막 id가 2이므로 다음은 3부터 시작

  // 새 Todo 생성 함수 (자식 컴포넌트에서 실행됨)
  const onCreate = (content) => {
    // 새로 입력받은 content를 기반으로 객체 생성
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    }
    // 기존 todo 배열 앞에 새 아이템 추가
    // [newItem, ...todo] → 새 항목이 맨 위로 올라오게 함
    setTodo([newItem, ...todo]);
      idRef.current += 1;  // useRef는 .current로 접근해야 함. 렌더링 없이 idRef 값만 +1 증가
  };

  // onUpdate 함수를 만들어 배열을 직접 수정하지 않고 새로운 배열을 만들어 교체
  const onUpdate = (targetId) => {
    // targetId => 클릭된 Todo 고유 id값 전달
    setTodo(todo.map((it) => {

      // 현재 항목의 id가 클릭된 id와 일치하는지 확인
      // 기존 항목(it)을 복사(spread)하고, isDone만 반대로 토글 => isDone값을 반전 시킴 (false-> true, true-> false) 
      return it.id === targetId ? {...it, isDone : !it.isDone} : it
    }))
  };

  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (
    <div className='App'>
      <Header/>
      <TodoEditor onCreate={onCreate}/> {/* 할 일 추가 입력창 (자식에게 onCreate 전달) */}
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/> {/* 할 일 리스트 (현재 todo 상태 전달), 체크박스 클릭 시 해당 id의 isDone을 토글하도록 부모에게 요청*/}
    </div>
  ) 
}
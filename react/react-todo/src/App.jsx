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

  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(3); 

  const onCreate = (content) => {

    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    }
    setTodo([newItem, ...todo]);
      idRef.current += 1;
  };

  return (
    <div className='App'>
      <Header/>
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo}/>
    </div>
  ) 
}
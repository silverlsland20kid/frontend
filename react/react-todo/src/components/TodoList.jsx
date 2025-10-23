import React from 'react'
import './TodoList.css';
import TodoItem from './TodoItem';

export default function TodoList({todo}) {
  return (
    <div className='TodoList'>
        <h4>Todo List 🍁</h4>
        <input className='searchbar' placeholder='검색어를 입력하세요'/>
        <div className='list_wrapper'>
            {todo.map((it)=>(
                  // <TodoItem key={it.id} {...it}/>
                  <TodoItem key={it.id} id={it.id} content={it.content} isDone={it.isDone} createdDate={it.createdDate}/>
            ))}
        </div>
    </div>
  )
}

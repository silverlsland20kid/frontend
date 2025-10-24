import React, { useState } from 'react'
import './TodoList.css';
import TodoItem from './TodoItem';


// 부모(App)에서 내려받은 props인 todo를 구조분해할당으로 바로 받음
export default function TodoList({todo, onUpdate, onDelete}) {

  const [search, setsearch] = useState("");

  // input 입력 시 호출되는 함수
  const onChangeSearch = (e) => {
    setsearch(e.target.value);   // e.target.value: 이벤트가 발생한 input 요소의 현재 값
    console.log(e.target.value);
  }

  // 검색 결과를 필터링해서 반환하는 함수
  const getSearchResult = () => {
    // search가 빈 문자열("")이면 전체 todo를 반환
    // includes(search): 문자열 안에 search 값이 포함되어 있으면 true
    return search === "" ? todo : todo.filter((it) => it.content.includes(search));
  };


  return (
    <div className='TodoList'>
        <h4>Todo List 🍁</h4>
        <input 
        className='searchbar' 
        placeholder='검색어를 입력하세요'
        onChange={onChangeSearch}
        value={search}
        />

        <div className='list_wrapper'>
            {/* getSearchResult()로 필터링된 결과를 map으로 순회 렌더링 */}
            {getSearchResult().map((it)=>(
                  <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/> // 전개 연산자(spread) → props를 한 번에 넘김
            ))}
        </div>
    </div>
  )
}

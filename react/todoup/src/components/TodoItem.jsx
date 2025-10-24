import React from 'react'
import './TodoItem.css';

// props 구조분해할당
// App → TodoList → TodoItem 으로 전달된 각 todo 객체의 속성들이 들어옴
export default function TodoItem({id, content, isDone, createdDate, onUpdate, onDelete}) {

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDelete = () => {
    onDelete(id);
  };

  return (
    <div className='TodoItem'>
        <div className='checkbox_col'>
            <input type="checkbox" 
            checked={isDone}
            onChange={onChangeCheckbox}
            />
        </div>
        <div className='title_col'>{content}</div>
        <div className='date_col'>{new Date(createdDate).toLocaleDateString()}</div>
        <div className='btn_col'>
            <button onClick={onClickDelete}>삭제</button>
        </div>
    </div>
  )
}
import React from 'react'
import './Card.css'
import './App.css'

// Card.js가 props를 받아서 하나의 카드 UI로 렌더링
// props는 {} 안에서 구조분해 할당으로 받아 사용함. 즉, App → Card로 데이터가 아래 방향으로 흐름
export default function Card({title, content, imageUrl,backgroundColor}) {
  return (
    <div className='card' style={{backgroundColor:backgroundColor}}>
        <div className='card-image'>
            <img src={imageUrl} alt={title}/>
        </div>
        <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{content}</p>
        </div>
    </div>
  )
}

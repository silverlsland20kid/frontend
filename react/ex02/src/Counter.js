import React, {useState} from 'react'

export default function Counter () {

  // 동적 state 상태를 관리하는 useState
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    // setNumber(number+1);
    // 함수형 업데이트
    setNumber(preNumber => preNumber+1);
  }

  const onDecrease = () => {
    // setNumber(number-1);
    setNumber(preNumber => preNumber-1);
  }

  return (
    <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
    </div>
  )
}

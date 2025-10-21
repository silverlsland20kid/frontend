import React, {useState} from 'react'

export default function Counter () {

  // number → 상태(state) 값
  // setNumber → 상태를 바꾸는 함수(update 함수)
  // useState() => 초기값. useState()라는 React Hook 함수를 통해 한 쌍으로 생성된 변수들
  // state — 현재 상태값을 저장하는 변수
  // setState() — 그 값을 변경하는 전용 함수

  // *React 컴포넌트 안에서 상태(state) 를 저장하고 바꾸기 위해 useState()가 반환해주는 특별한 변수와 함수의 쌍
  const [number, setNumber] = useState(0); 

  const onIncrease = () => {
    // setNumber(number+1);
    // 함수형 업데이트
    // setNumber()를 실행 → React가 number를 1 증가시킴. 
    // preNumber는 현재의 number 값을 의미 (즉, 기존 상태값). 버튼을 누를 때마다 number가 1씩 증가
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

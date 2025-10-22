import React, { useEffect } from 'react'

// props로 전달받은 user 객체를 화면에 표시하는 역할
export default function User({user, onRemove, onToggle}) {

  // useEffect: React의 생명주기 훅(Hook)
  //   → user 값이 바뀔 때마다 실행되는 “부수효과(side effect)”를 정의
  //   → [user] : **의존성 배열(dependency array)**
  //   이 배열 안의 값이 바뀔 때마다 useEffect 내부 함수가 실행됨
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);

    //  return() 내부의 함수는 cleanup 함수
    //    → 컴포넌트가 사라지거나(user가 변경될 때 이전 user를 정리)
    //      다음 useEffect가 실행되기 전에 수행됨
    return() => {
      console.log('user가 바뀌기 전');
      console.log(user);
    } 
  },[user]); // <- user 값이 변경될 때만 useEffect 실행

  return (
    <div>
        <b style={{cursor:'pointer',color: user.active ? 'green' : 'black'}} onClick={() => onToggle(user.id)}>{user.username}</b>
        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  )
}

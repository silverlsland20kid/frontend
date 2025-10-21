import React from 'react'


// App으로부터 전달받은 props를 이용해
// 입력창 2개(username, email)와 "등록" 버튼을 렌더링하는 입력 전용 컴포넌트
export default function CreateUser({username, email, onChange, onCreate}) { // 소괄호 안의 중괄호는 props 객체에서 필요한 값만 꺼내서 변수로 받는 구조
  return (
    <div>
      {/* 
        [1] name="username" : input의 고유 이름. onChange 함수에서 e.target.name으로 구분됨
        [2] placeholder='계정명' : 입력창에 회색 안내문 표시
        [3] onChange={onChange} : 입력 시 상위(App)의 상태(inputs)를 업데이트
        [4] value={username} : 현재 state 값(입력된 이름)을 반영 — 제어 컴포넌트 구조
      */}
      <input 
        name="username"
        placeholder='계정명'
        onChange={onChange}
        value={username}
      />

      {/* 
        두 번째 입력창: 이메일 입력
        [1] name="email" : onChange 핸들러에서 'email' 필드로 구분됨
        [2] placeholder='이메일' : 안내문 표시
        [3] value={email} : App의 state.email을 그대로 표시
        [4] onChange : 입력 시 실시간으로 state 갱신
      */}
      <input 
        name="email"
        placeholder='이메일'
        onChange={onChange}
        value={email}
      />

        {/* [1] <button> : 클릭 시 등록(onCreate) 실행
            [2] onClick={onCreate} : 상위(App)에서 전달된 onCreate 함수를 호출
              → 새로운 user 객체를 생성 후 users 배열에 추가
              → 입력창 초기화 */}
      <button onClick={onCreate}>등록</button>
    </div>
  )
}

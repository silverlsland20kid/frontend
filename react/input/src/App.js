import React, { useRef, useState } from 'react'
import UserList2 from './UserList2'
import CreateUser from './CreateUser';


export default function App() {

  // inputs: 입력창에 입력되는 값을 객체로 관리 (username, email)
  // setInputs: 입력값을 변경할 때 사용하는 함수
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });

  // 비구조화 할당으로 inputs 객체 내부 값 분리
  const {username, email} = inputs;
  const onChange = (e) => {
    // e.target.name → 'username' 또는 'email'
    // e.target.value → 입력된 실제 문자열
    const{name, value} = e.target;
    setInputs({
      ...inputs, // ...inputs => 기존 상태 복사

      // [name]: value에서 name은 input 요소의 name 속성값(즉, 'username' 또는 'email')이고, 
      // value값은 input에 새로 입력한 문자열 텍스트 그내용을 말하는거임
      [name]:value 
    });
  }


  // users: 사용자 목록을 상태(state)로 관리
  // setUsers: 새로운 사용자를 추가할 때 사용하는 함수
  const [users, setUsers] = useState([
    { id:1, username:'velopert', email:'public.velopert@gmail.com' },
    { id:2, username:'tester',   email:'tester@example.com' },
    { id:3, username:'liz',      email:'liz@example.com' }
  ]);

    // useRef: 렌더링과 상관없이 값이 유지되는 변수
    const nextId = useRef(4);

    // onCreate 변수를 통해 새로운 user 객체를 만들어 users 배열에 추가
    const onCreate = () => {
      // 새로운 사용자 정보 구성을 변수로 저장
      const user = { 
      id: nextId.current, 
      username, 
      email 
    }; 
    // 기존 users 배열에 새로운 user 추가 (concat은 새 배열 반환하는 속성임)
    setUsers(users.concat(user)); 

      // 입력창 초기화
      setInputs({
        username:'',
        email:'',
      });
      // 다음에 등록될 사용자의 id 증가
      nextId.current += 1;
    };

  return (
    <div>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList2 users={users}/> {/* 사용자 목록을 props로 전달 */}
    </div>
  );
};

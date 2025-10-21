import React, { useState } from 'react'

export default function Inputsample1() {
    // inputs라는 객체 상태를 관리하고, setInputs로 값을 바꿀 수 있게 설정
    const [inputs,setInputs] = useState({ // 대괄호 [] = > 순서가 있는 값들의 리스트형 데이터를 표현할 때 or 배열 비구조화 할당으로 요소를 꺼낼 때 사용
        name:'',
        nickname:'',
    });

    // 비구조 할당방식으로 inputs,setInputs 를 변수화해야함
    // 중괄호 {} => 이름(key)과 값(value)의 쌍으로 이루어진 데이터 묶음을 표현할 때 사용
    const {name,nickname} = inputs; 

    const onChange = (e) => {
        // e.target.name : 어떤 input인지 확인 ('name' 또는 'nickname')
        // e.target.value : 현재 입력한 값
        const {value , name} = e.target; 
        setInputs({
            ...inputs, 
            [name] : value
        });
    };
    const onReset = () => {
        setInputs({
            name:'',
            nickname:'',
        })
    };

  return (
    <div>
        <input name='name' placeholder='이름' onChange={onChange} value={name}/>
        <input name='nickname' placeholder='닉네임' onChange={onChange} value={nickname}/>
        <button onClick={onReset}>초기화</button>
        <div>
            <b>값: </b>
            {name} ({nickname})
        </div>
    </div>
  )
};

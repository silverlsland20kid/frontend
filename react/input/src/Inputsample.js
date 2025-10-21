import React, { useState } from 'react'

export default function Inputsample() {
    const [text, setText] = useState(''); 

    // e => 이벤트 객체, 파라미터(매개변수)로 받아올 수 있음.
    // e.target => 현재 이벤트가 발생하는 input창
    // e.target.value => input창에 적힌 글씨의 값을 받아옴
    // useState(''); 안에 '' 기호를 사용함으로 빈 문자값으로 두겠다는 뜻으로 해석함요
    const onChange = (e) => {
        setText(e.target.value);
    };

    const onReset = () => {
        setText('');
    };

  return (
    <div>
        <input onChange={onChange} value={text}/>
        <button onClick={onReset}>초기화</button>
        <div>
            <b>값: {text}</b>
        </div>
    </div>
  )
};

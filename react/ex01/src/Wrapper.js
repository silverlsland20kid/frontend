import React from 'react'


// children은 리액트가 자동으로 제공하는 특별한 props
// children이 될 수 있는 것
// 문자열/숫자: <Wrapper>텍스트</Wrapper>
// 노드 하나: <Wrapper><Hello/></Wrapper>
// 배열(여러 노드): <Wrapper>{[<A/>, <B/>]}</Wrapper> (map 결과)
// 함수(render prop): <Wrapper>{(data)=> <View data={data}/>}</Wrapper>

export default function Wrapper({children}) {

    const style = {
        border:'2px solid #eee',
        padding: '16px',
    };


  return (
    <div style={style}>
        {children}
    </div>
  )
}

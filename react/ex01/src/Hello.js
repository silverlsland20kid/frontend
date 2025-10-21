import React from 'react'

//  소괄호 안 중괄호 ({}) =>  props 객체에서 필요한 값만 꺼내서 변수로 받는 구조
// { color, name, isSpecial }는 props 객체를 비구조화 할당으로 받아온 것
function Hello({color,name='이름없음',isSpecial}) {
  return (
    // 중괄호 두개 사용 => react JSx의 문법. 
    // 첫번째 중괄호 => 자바스크립트 표현식
    // 두번째 중괄호 => 자바스크립트 객체리터럴
    <div style={{color}}>
      {isSpecial ? <b>*</b> : null}
      안녕하세요 {name} 
    </div>
  )
}

export default Hello; 

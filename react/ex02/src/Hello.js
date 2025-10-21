import React from 'react'

function Hello({color,name='이름없음',isSpecial}) {
  return (
    // 중괄호 두개 react JSx의 문법. 첫번째 중괄호 => 자바스크립트 표현식.문법임 / 두번째 줄괄호 => 자바스크립트 객체리터럴
    <div style={{color}}>
      {isSpecial ? <b>*</b> : null}
      안녕하세요 {name} 
    </div>
  )
}

export default Hello; 


import React from 'react'
import Hello from './Hello'
import Wrapper from './Wrapper'

export default function App() {
  return (
    <Wrapper>
      {/* Hello 컴포넌트를 사용할때 name 이라는 값을 전달하고 싶다는 가정하에 props.name 을 입력하면 조회 가능*/}
      {/* true/false 는 자바스크립트 값이므로 중괄호 사용함 */}
      {/* isSpecial={true} 으로 작성하는게 정석이긴 하지만 isSpecial만 적어도 됌 */}
      {/* isSpecial은 내가 임의로 만든 불리언 props(속성) */}
      {/* hildren은 Wrapper 태그 안쪽에 들어간 모든 JSX(Hello 컴포넌트 2개) 를 자동으로 받아오는것임 */}
      <Hello name="react" color="red" isSpecial />
      <Hello color="pink"/>
    </Wrapper>
  )
}

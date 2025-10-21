import React from 'react'

// props로 전달받은 user 객체를 화면에 표시하는 역할
export default function User({user}) {
  return (
    <div>
        <b>{user.username}</b><span>({user.email})</span>
    </div>
  )
}

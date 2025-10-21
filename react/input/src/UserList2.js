import React from 'react'
import User from './User'


// props로 전달받은 users 배열을 순회(map)하여
// 각 사용자 정보를 User 컴포넌트에 전달하는 역할
export default function UserList2({users}) {

  return (
    <div>
      {/* users 의 배열을 map으로 순회하면서 각 user 객체를 개별 User 컴포넌트에 전달함
        user: 현재 순회 중인 사용자 객체 / key: React가 각 요소를 구분하기 위한 고유 식별자 (필수)*/}
        {users.map(user=>(
            <User user={user} key={user.id} />
        ))}
    </div>
  )
}

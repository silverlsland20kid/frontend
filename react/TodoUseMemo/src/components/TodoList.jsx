import React, { useMemo, useState } from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";

// 부모(App)에서 내려받은 props인 todo를 구조분해할당으로 바로 받음
export default function TodoList({ todo, onUpdate, onDelete }) {
  const [search, setsearch] = useState("");

  // input 입력 시 호출되는 함수
  const onChangeSearch = (e) => {
    setsearch(e.target.value); // e.target.value: 이벤트가 발생한 input 요소의 현재 값
    console.log(e.target.value);
  };

  // 검색 결과를 필터링해서 반환하는 함수
  const getSearchResult = () => {
    // search가 빈 문자열("")이면 전체 todo를 반환

    return search === ""
      ? todo
      : // includes(search): 문자열 안에 search 값이 포함되어 있으면 true
        // filter => 배열 메서드: 조건을 만족하는 요소만 남겨 새 배열 반환.
        todo.filter((it) => it.content.includes(search));
  };

  // useMemo => 통계값 계산 (todo가 바뀔 때만 재계산)
  // 복잡한 계산(예: 통계)을 메모이제이션하여 todo가 바뀔 때만 재계산하게 함
  // 즉, search 입력만 바뀔 때는 아래 함수가 재실행되지 않음 → 성능 최적화
  const analyzeTodo = useMemo(() => {
    console.log("몇번 호출 할까요?");

    // 전체 항목 수
    const totalCount = todo.length;
    // 완료된 항목만 필터링한 개수
    const doneCount = todo.filter((it) => it.isDone).length;
    // 미완료 개수 = 전체 - 완료
    const notDoneCount = totalCount - doneCount;

    // 이 값을 return하면, useMemo가 이 객체를 기억(cache)함
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]); // ** 의존성 배열: todo가 바뀔 때만 위 코드 재실행

  // 구조분해할당으로 객체 값 꺼내쓰기
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  return (
    <div className="TodoList">
      <h4>Todo List 🍁</h4>
      <div>
        <div>총 개수 : {totalCount}</div>
        <div>완료된 할 일: {doneCount}</div>
        <div>아직 완료하지못한 할 일 : {notDoneCount}</div>
      </div>
      <input
        className="searchbar"
        placeholder="검색어를 입력하세요"
        onChange={onChangeSearch}
        value={search}
      />

      <div className="list_wrapper">
        {/* getSearchResult()로 필터링된 결과를 map으로 순회 렌더링 */}
        {getSearchResult().map((it) => (
          <TodoItem
            key={it.id}
            {...it}
            onUpdate={onUpdate}
            onDelete={onDelete}
          /> // 전개 연산자(spread) → props를 한 번에 넘김
        ))}
      </div>
    </div>
  );
}

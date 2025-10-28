import React, { useState } from "react";
import "./App.css";

export default function App() {
  // const {result, setResult} = useState<number/>(0);

  // 배열과 객체 예제
  const numbers: number[] = [1, 2, 3, 4, 5];
  const fruits: Array<string> = ["사과", "바나나", "오렌지"];

  // 인터페이스
  interface Person {
    name: string;
    age: number;
    email?: string; // ? => 선택적 속성. 이메일 있어도 없어도 괜춘
  }

  // Person인터페이스를 상속한 **person1** 객체 라고 함
  const person1: Person = {
    name: "홍길동",
    age: 30,
  };

  const person2: Person = {
    name: "김철수",
    age: 25,
    email: "kim@example.com",
  };

  return (
    <div className="App">
      <header>
        <h1>react TypeScript 예제</h1>
        <div className="container">
          {/* 기본 타입 섹션 */}
          <section className="card">
            <h2>1. 기본 타입</h2>
            <div className="content">
              <p>
                <strong>name:</strong> {"TypeScript"}
              </p>
              <p>
                <strong>age:</strong> {13}
              </p>
              <p>
                <strong>isActive:</strong> {true ? "true" : "false"}
              </p>
            </div>
          </section>

          <section className="card">
            <h2>2. 배열 타입</h2>
            <div className="content">
              <p>
                <strong>숫자배열</strong> [{numbers.join(",")}]
              </p>
              <p>
                <strong>과일배열</strong> [{fruits.join(",")}]
              </p>
            </div>
          </section>

          <section className="card">
            <h2>3. 인터페이스 타입</h2>
            <div className="content">
              <div className="person-card">
                <h3>{person1.name}</h3>
                <p>나이:{person1.age}</p>
                <p>이메일:{person1.email}</p>
              </div>
              <div className="person-card">
                <h3>{person2.name}</h3>
                <p>나이:{person2.age}</p>
                <p>이메일:{person2.email}</p>
              </div>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}

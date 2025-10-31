import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // handleChange => 모든 입력 필드에 공용으로 쓰는 변경 핸들러
  // e.target.name : <input name="...">의 name 값
  // e.target.value : 현재 입력 값
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // [e.target.name] → name/email/message 중 하나가 동적으로 키가 됨
      [e.target.name]: e.target.value, // 해당 name 키만 갱신
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("메세지가 전송되었습니다.");
    // 제출 후 입력값 초기화(컨트롤드 컴포넌트니까 state만 비우면 UI도 초기화됨)
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact">
      <h1>연락처</h1>

      <div className="contact-container">
        <div className="contact-info">
          <h2>연락 정보</h2>
          <div className="info-item">
            <h3>📧 이메일</h3>
            <p>contact@reactapp.com</p>
          </div>
          <div className="info-item">
            <h3>📞 전화</h3>
            <p>02-1234-5678</p>
          </div>
          <div className="info-item">
            <h3>📍 주소</h3>
            <p>서울시 강남구 테헤란로 123</p>
          </div>
        </div>

        {/* onSubmit: 폼 제출 시 호출될 핸들러 지정 
        (Enter 키로도 제출되며, 버튼 type="submit"과 연동) */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>문의하기</h2>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">메시지</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          {/* ✅ type="submit" → 폼의 onSubmit 트리거, 버튼 클릭 또는 Enter로 제출 가능 */}
          <button type="submit" className="submit-button">
            전송하기
          </button>
        </form>
      </div>
    </div>
  );
}

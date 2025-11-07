import React from "react";
import { useState } from "react";
import "./App.css";

export default function App() {
  //상태관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    number: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    number: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const valiDateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const valiDatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const valiDateName = (name) => {
    return name.trim().length >= 2;
  };

  const valiDateNumber = (number) => {
    const numberRegex = /^01[016789]-\d{3,4}-\d{4}$/;
    return numberRegex.test(number);
  };

  //에러메세지
  const getErrors = () => {
    const errors = {};

    if (touched.email && !valiDateEmail(formData.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (touched.password && !valiDatePassword(formData.password)) {
      errors.password =
        "비밀번호는 8자리 이상, 대+소문자+숫자를 포함해야 합니다.";
    }

    if (
      touched.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (touched.name && !valiDateName(formData.name)) {
      errors.name = "이름은 2글자 이상이어야 합니다.";
    }

    if (touched.number && !valiDateNumber(formData.number)) {
      errors.number = "올바른 전화번호 형식이 아닙니다. (010-1234-1234)";
    }

    return errors;
  };

  const errors = getErrors();

  //유효성검사
  const isFormValid = () => {
    return (
      valiDateEmail(formData.email) &&
      valiDatePassword(formData.password) &&
      formData.password === formData.confirmPassword &&
      valiDateName(formData.name) &&
      valiDateNumber(formData.number)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        number: "",
      });

      setTouched({
        email: false,
        password: false,
        confirmPassword: false,
        name: false,
        number: false,
      });
    }

    triggerSuccess();
    console.log("회원가입데이터", formData);
  };

  return (
    <div className="container">
      {/* ✅ showSuccess가 true일 때만 오버레이 렌더링 */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="checkmark">✅</div>
            <div className="success-title">가입완료!</div>
            <div className="success-desc">환영합니다 🎉</div>
          </div>
        </div>
      )}

      <div className="formCard">
        <h1 className="title">회원가입</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            {/* 이메일 */}
            <label htmlFor="email" className="label">
              이메일
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="example@gmail.com"
              style={{ borderColor: errors.email ? "#dc3545" : "#ddd" }}
              autoComplete="email"
            />
            {errors.email && <p className="errorText">❌ {errors.email}</p>}
            {touched.email && !errors.email && formData.email && (
              <p className="successText">✅ 올바른 이메일 형식입니다.</p>
            )}
          </div>

          <div className="formGroup">
            {/* 비밀번호 */}
            <label htmlFor="password" className="label">
              비밀번호
            </label>

            <div className="passwordContainer">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="대+소문자+숫자 8자 이상"
                style={{ borderColor: errors.password ? "#dc3545" : "#ddd" }}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="toggleButton"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.password && (
              <p className="errorText">❌ {errors.password}</p>
            )}
            {touched.password && !errors.password && formData.password && (
              <p className="successText">✅ 올바른 비밀번호입니다.</p>
            )}
          </div>

          <div className="formGroup">
            {/* 비밀번호 확인 */}
            <label htmlFor="confirmPassword" className="label">
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="비밀번호 재입력"
              style={{
                borderColor: errors.confirmPassword ? "#dc3545" : "#ddd",
              }}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="errorText">❌ {errors.confirmPassword}</p>
            )}
            {touched.confirmPassword &&
              !errors.confirmPassword &&
              formData.confirmPassword && (
                <p className="successText">✅ 비밀번호가 일치합니다.</p>
              )}
          </div>

          <div className="formGroup">
            {/* 이름 */}
            <label htmlFor="name" className="label">
              이름
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="홍길동"
              style={{ borderColor: errors.name ? "#dc3545" : "#ddd" }}
              autoComplete="name"
            />
            {errors.name && <p className="errorText">❌ {errors.name}</p>}
            {touched.name && !errors.name && formData.name && (
              <p className="successText">✅ 올바른 이름입니다.</p>
            )}
          </div>

          <div className="formGroup">
            {/* 핸드폰번호 */}
            <label htmlFor="number" className="label">
              휴대폰 번호
            </label>
            <input
              id="number"
              type="tel"
              inputMode="numeric"
              name="number"
              maxLength={13}
              value={formData.number}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="010-1234-5678"
              style={{ borderColor: errors.number ? "#dc3545" : "#ddd" }}
              autoComplete="tel-national"
            />
            {errors.number && <p className="errorText">❌ {errors.number}</p>}
            {touched.number && !errors.number && formData.number && (
              <p className="successText">✅ 올바른 전화번호 형식입니다.</p>
            )}
          </div>

          <button
            className="submitButton"
            type="submit"
            disabled={!isFormValid()}
            style={{
              backgroundColor: isFormValid() ? "#28a745" : "#ccc",
              cursor: isFormValid() ? "pointer" : "not-allowed",
            }}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

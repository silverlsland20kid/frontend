import React, { useState } from "react";

export default function App() {
  // 폼데이터 상태관리 (사용자 입력값)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    number: "",
  });

  // touched 상태관리 (사용자가 필드 건드렸는지)
  // 처음부터 에러 보여주지 않기 위해 false로 설정
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    number: false,
  });

  // 비밀번호 상태관리 (보기 / 숨기기)
  const [showPassword, setShowPassword] = useState(false);

  // 성공시 애니메이션 상태
  const [showSuccess, setShowSuccess] = useState(false);

  // 유효성 검사 함수 (이메일검사)
  // username => 공백, @ 포함할 수 없고 하나 이상 문자 존재해야함
  // domain => 공백, @ 포함할 수 없고 문자로 이루어져야함
  // extention => 공백, @ 포함할 수 없고 문자로 이루어져야함, 마침표로 구분
  // test => 일치하면 true, 아니면 false(에러발생)
  const validataEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validNumber = (number) => {
    const numberRegex = /^01[016789]-\d{3,4}-\d{4}$/;
    return numberRegex.test(number);
  };

  // 에러발생시 메세지 보내기
  const getErrors = () => {
    // 일단 빈 객체 배열 생성해두기. 여기에 아래의 에러메세지를 저장할것임
    const errors = {};

    if (touched.email && !validataEmail(formData.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (touched.password && !validatePassword(formData.password)) {
      errors.password =
        "비밀번호는 8자 이상, 대문자+소문자+숫자를 포함해야 합니다.";
    }

    if (
      touched.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (touched.name && !validateName(formData.name)) {
      errors.name = "이름은 2자 이상이어야 합니다.";
    }

    if (touched.number && !validNumber(formData.number)) {
      errors.number = "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)";
    }

    return errors;
  };

  const errors = getErrors();

  // 폼 유효성 검사(모든필드가 유효한지), 제출버튼 활성화조건들, 값이 맞으면 준비끝.
  const isFormValid = () => {
    return (
      validataEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword &&
      validateName(formData.name) &&
      validNumber(formData.number)
    );
  };

  // 입력 변경 핸들러
  // 회원가입폼 작성할때 (여러개의 입력창을 실시간으로 입력,반영)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 블러 핸들러 (필드에서 포커스가 벗어날 때)
  // 예를 들어 사용자가 이메일을 입력 후 빠져나올때 touched.email 값이 true인지 false인지 검사하는 함수
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 성공시 애니메이션 트리거
  const triggerSuccess = () => {
    setShowSuccess(true);
    // 1.6초 후 자동 닫기
    setTimeout(() => setShowSuccess(false), 1600);
  };

  // 제출버튼 클릭시 실행하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // 회원가입 다 완료했으니 그 다음화면을 보여줄때 폼 입력창을 모두 초기화
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

      triggerSuccess();
      console.log("회원가입 데이터", formData);
    }
  };

  return (
    <div style={styles.container}>
      {/* 회원가입 성공 애니메이션 추가 */}
      <style>{successCss}</style>
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="checkmark">✓</div>
            <div className="success-title">가입 완료!</div>
            <div className="success-desc">
              {formData.name
                ? `${formData.name}님, 환영합니다!`
                : "회원가입이 성공적으로 처리되었습니다."}
            </div>
          </div>
        </div>
      )}

      <div style={styles.formCard}>
        <h1 style={styles.title}>회원가입</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            {/* 이메일 */}
            <label htmlFor="email" style={styles.label}>
              이메일 *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...styles.input,
                borderColor: errors.email ? "#dc3545" : "#ddd",
              }}
              placeholder="example@email.com"
            />
            {errors.email && <p style={styles.errorText}> ❌ </p>}
            {touched.email && !errors.email && formData.email && (
              <p style={styles.successText}>
                ✅ 올바른 이메일 형식입니다. {errors.email}
              </p>
            )}
          </div>
          {/* 비밀번호 */}
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              비밀번호 *
            </label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...styles.input,
                  borderColor: errors.password ? "#dc3545" : "#ddd",
                }}
                placeholder="8자 이상,대문자+소문자+숫자"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p style={styles.errorText}>❌ {errors.password}</p>
            )}
            {touched.password && !errors.password && formData.password && (
              <p style={styles.successText}>✅ 안전한 비밀번호입니다</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              비밀번호 확인 *
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 재입력"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...styles.input,
                borderColor: errors.confirmPassword ? "#dc3545" : "#ddd",
              }}
            />
            {errors.confirmPassword && (
              <p style={styles.errorText}>❌ {errors.confirmPassword}</p>
            )}
            {touched.confirmPassword &&
              !errors.confirmPassword &&
              formData.confirmPassword && (
                <p style={styles.successText}>✅ 비밀번호가 일치합니다. </p>
              )}
          </div>

          {/* 이름 */}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              이름 *
            </label>
            <input
              id="name"
              value={formData.name}
              type="text"
              name="name"
              placeholder="홍길동"
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...styles.input,
                borderColor: errors.name ? "#dc3545" : "#ddd",
              }}
            />
            {errors.name && <p style={styles.errorText}>❌ {errors.name}</p>}
            {touched.name && !errors.name && formData.name && (
              <p style={styles.successText}>✅ 유효한 이름입니다</p>
            )}
          </div>

          {/* 핸드폰번호 */}
          <div style={styles.formGroup}>
            <label htmlFor="number" style={styles.label}>
              핸드폰 *
            </label>
            <input
              id="number"
              value={formData.number}
              type="tel"
              name="number"
              inputMode="numeric"
              placeholder="010-1234-5678"
              maxLength={13}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...styles.input,
                borderColor: errors.number ? "#dc3545" : "#ddd",
              }}
            />
            {errors.number && (
              <p style={styles.errorText}>❌ {errors.number}</p>
            )}
            {touched.number && !errors.number && formData.number && (
              <p style={styles.successText}>✅ 전화번호 형식이 맞습니다.</p>
            )}
          </div>

          {/* 제출버튼 */}
          <button
            type="submit"
            disabled={!isFormValid()}
            style={{
              ...styles.submitButton,
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

//성공 오버레이용 CSS (키프레임 포함)
const successCss = `
.success-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.3);
  animation: fadeIn .25s ease-out;
  z-index: 1000;
}
.success-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 6px 24px rgba(0,0,0,0.15);
  animation: popIn .25s ease-out;
}
.checkmark {
  color: #28a745;
  font-size: 42px;
  font-weight: bold;
  animation: checkFade .5s ease-out;
}
.success-title {
  margin-top: 6px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
}
.success-desc {
  color: #555;
  margin-top: 4px;
  line-height: 1.4;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes popIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes checkFade {
  0% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 1; transform: scale(1); }
}
`;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  formCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "2.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "2rem",
    fontSize: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    color: "#333",
    fontWeight: "bold",
    fontSize: "0.95rem",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  toggleButton: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
    margin: "0.5rem 0 0 0",
  },
  successText: {
    color: "#28a745",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
    margin: "0.5rem 0 0 0",
  },
  submitButton: {
    padding: "14px",
    fontSize: "1.1rem",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "1rem",
    transition: "background-color 0.3s",
    fontWeight: "bold",
  },
};

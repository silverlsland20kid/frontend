## 라우팅 전환 변경 사항 요약

원페이지(스크롤) 방식에서 라우터 기반의 다중 페이지 구조로 전환했습니다. 스크롤 이벤트와 섹션 이동 로직을 제거하고, 각 섹션을 개별 경로로 분리했습니다.

### 변경 목적
- 스크롤 이벤트 제거 및 유지보수성 향상
- URL 기반 내비게이션 제공(`/`, `/about`, `/skills`, `/projects`, `/contact`)

---

### 설치 변경
```bash
npm i react-router-dom
```

---

### 변경된 파일 목록
- `src/main.jsx`: 앱을 `BrowserRouter`로 감쌌습니다.
- `src/App.jsx`: 스크롤 관련 상태/이펙트 제거, `Routes`/`Route`로 페이지 구성.
- `src/components/Navbar.jsx`: 스크롤 이동 버튼 제거, `NavLink` 기반 내비게이션으로 교체.

---

### 상세 변경 내용

#### 1) `src/main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

#### 2) `src/App.jsx`
```jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}
```

변경 포인트:
- `useEffect`, `useState`로 관리하던 스크롤 감지 및 활성 섹션 로직 제거
- `Routes/Route`로 각 컴포넌트를 경로에 매핑

#### 3) `src/components/Navbar.jsx`
```jsx
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="logo-text">Portfolio</span>
          </div>

          <div className="desktop-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-items">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `mobile-nav-button ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

변경 포인트:
- 버튼+스크롤 이동(`scrollIntoView`) 제거, `NavLink`로 교체
- `activeSection` prop 제거, `isActive`로 활성 스타일 처리

---

### 라우팅 경로 요약
- `/` → `Hero`
- `/about` → `About`
- `/skills` → `Skills`
- `/projects` → `Projects`
- `/contact` → `Contact`

---

### 실행 방법
```bash
npm run dev
```

브라우저에서 내비게이션 메뉴를 사용해 페이지 간 이동할 수 있습니다.



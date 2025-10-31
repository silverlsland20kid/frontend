import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./navbar.css";

export default function Navbar() {
  // - 모바일에서는 햄버거 버튼 클릭 시 열리고, 닫기 버튼으로 닫힘
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //isMenuOpen : 모바일 메뉴가 열려 있는지여부(true - 열림, false - 닫힘)
  //setIsMenuOpen 메뉴 상태를 바꿈

  // 네비게이션 항목 목록 (경로 + 표시 텍스트)
  // 나중에 항목을 추가/수정할 때 이 배열만 바꾸면 됨
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

          {/* Desktop Navigation 
          - CSS에서 media query로 숨김 처리됨 (예: max-width:768px)*/}
          <div className="desktop-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)} // 클릭 시 모바일 메뉴 닫기
                // NavLink는 isActive(활성화 여부)를 자동으로 전달해줌
                // isActive === true → 현재 경로와 동일할 때
                className={({ isActive }) =>
                  `nav-button ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button (햄버거/닫기 버튼)
              - 작은 화면일 때만 보임 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // 클릭 시 true↔false 토글
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            {/* ✅ 조건부 렌더링
                메뉴가 열렸다면(X 아이콘 표시), 닫혀있다면(≡ 아이콘 표시) */}
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-items">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `mobile-nav-button ${isActive ? "active" : ""}`
                  }
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

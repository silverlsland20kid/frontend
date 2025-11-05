import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // 메뉴 열림 여부(모바일 네비 상태), true면 컨테이너를 왼쪽으로 밀고(.mobile_nav.active) 오버레이도 켜짐
  const [mobileNavActive, setMobileNavActive] = useState(false);
  // 오버레이(투명 배경) 표시 여부. 사실상 mobileNavActive와 1:1로 움직이는 "파생 상태"
  const [transparencyActive, setTransparencyActive] = useState(false);
  // PC GNB에서 ul에 over 클래스를 줄지 여부(hover 상태)
  const [navOver, setNavOver] = useState(false);
  // 현재 뷰포트가 모바일 기준(<=850px)인지 여부
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 리사이즈될 때마다 모바일/데스크톱 여부를 판정하고 상태를 정리하는 핸들러 함수
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width <= 850;

      setIsMobile(mobile); // 화면 크기 상태 업데이트

      // width가 850 이상이라서 데스크톱으로 전환하게 되면, 모바일 메뉴/오버레이 강제 닫기
      if (!mobile) {
        setMobileNavActive(false);
        setTransparencyActive(false);
      }
    };
    handleResize(); // ✅ (1) 마운트 직후 즉시 리사이징 1회 실행
    window.addEventListener("resize", handleResize); // ✅ (2) 이후 리사이즈 될 때마다 리사이징 실행

    // 클린업: 컴포넌트 언마운트 시(또는 effect 재실행 전) 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize); // ✅ (3) 컴포넌트 사라질 때 정리
    };
  }, []); // 의존성 배열이 빈 배열 → "마운트 시 1회" 등록

  // 모바일 햄버거 탭 클릭 함수 → 메뉴/오버레이 "열기"
  const handleMobileTabClick = (e) => {
    e.preventDefault();
    setMobileNavActive(true);
    setTransparencyActive(true);
  };

  // 오버레이 클릭 함수 → 메뉴/오버레이 "닫기"
  const handleTransparencyClick = (e) => {
    e.preventDefault();
    setMobileNavActive(false);
    setTransparencyActive(false);
  };

  // PC GNB에 마우스 hover 효과
  const handleNavMouseEnter = () => {
    setNavOver(true);
  };

  const handleNavMouseLeave = () => {
    setNavOver(false);
  };

  // 모바일 네비 안에서 "1뎁스 a"를 클릭했을 때 서브 목록(.sub) 토글되도록 함수
  const handleMobileNavClick = (e) => {
    e.preventDefault();
    // e.target 다음 형제(nextElementSibling)를 바로 .sub로 가정
    const subMenu = e.target.nextElementSibling;

    // 클릭한 요소의 다음 형제가 존재하고, 그 형제의 클래스 이름에 'sub'가 들어 있으면 실행해라
    if (subMenu && subMenu.classList.contains("sub")) {
      const isDisplayed = subMenu.style.display === "block";
      // 모든 .sub 닫고(초기화) → 클릭한 대상만 필요 시 열기
      const allSubs = document.querySelectorAll(".mobile_nav .sub");

      allSubs.forEach((sub) => {
        sub.style.display = "none";
      });
      // .sub 닫혀 있었으면 이번에 연다
      if (!isDisplayed) {
        subMenu.style.display = "block";
      }
    }
  };

  // *****  추가설명. 읽고 지우셈
  // React의 state와 DOM의 style은 완전히 다름
  // 브라우저에서 subMenu.style.display는 “문자열”을 반환합니다.
  // 그 문자열이 "block"이면 true,
  // 그게 아니면 false로 판별하는 단순 비교문이에요.

  // 1 메뉴 클릭 시 handleMobileNavClick 실행
  // 2 subMenu.style.display가 "block"인지 확인 → 현재 열려있는지(true/false)
  // 3 모든 서브를 닫고(display = "none")
  // 4 현재 클릭한 서브가 닫혀 있었다면(!isDisplayed) 다시 열기(display = "block")

  // 즉, 현재 열려 있는지 판단은 스타일 속성값으로 직접 확인하는 것이에요.
  // React 상태가 아니라 DOM의 현재 상태를 기준으로 삼는 로직인 거죠.

  return (
    <>
      <div
        className="container"
        style={{ left: mobileNavActive ? "-220px" : "0" }}
      >
        {/* header */}
        <div className="header">
          <div className="social">
            <ul>
              <li>
                <a href="">
                  <img src="images/social_icon1.gif" alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src="images/social_icon2.gif" alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src="images/social_icon3.gif" alt="" />
                </a>
              </li>
            </ul>
            <div className="mileage_btn">
              <a href="">
                <img src="images/btn_mileage.gif" alt="" />
              </a>
            </div>
          </div>
          <div className="signature">
            <a href="">
              <img src="images/signature.gif" alt="" />
            </a>
          </div>
          <div className="location">
            <ul>
              <li>
                <a href="">Login</a>
              </li>
              <li>
                <a href="">Join</a>
              </li>
              <li>
                <a href="">개인정보취급방침</a>
              </li>
            </ul>
          </div>
        </div>
        {/* header end */}

        {/* mobile tab */}
        <div className="mobile_tab">
          <a href="#" onClick={handleMobileTabClick}>
            <img src="images/gnb_btn.png" alt="Mobile Tab" />
          </a>
        </div>
        {/* 모바일 네비: 상태에 따라 active 클래스 부여 → CSS 전환(right:-220px→0) */}
        <div className={`mobile_nav ${mobileNavActive ? "active" : ""}`}>
          <ul>
            <li>
              {/* 각 1뎁스: href="#" + 클릭 시 서브 토글 */}
              <a href="#" onClick={handleMobileNavClick}>
                ZISHEN
              </a>
              <ul className="sub">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Lookbook</a>
                </li>
                <li>
                  <a href="">Catalogue</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={handleMobileNavClick}>
                ZISHEN HOMME
              </a>
              <ul className="sub">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Lookbook</a>
                </li>
                <li>
                  <a href="">Catalogue</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={handleMobileNavClick}>
                MEDIA
              </a>
              <ul className="sub">
                <li>
                  <a href="">Movie</a>
                </li>
                <li>
                  <a href="">News</a>
                </li>
                <li>
                  <a href="">Event</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={handleMobileNavClick}>
                SERVICE
              </a>
              <ul className="sub">
                <li>
                  <a href="">Faq</a>
                </li>
                <li>
                  <a href="">1:1 Service</a>
                </li>
                <li>
                  <a href="">Group Order</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={handleMobileNavClick}>
                SHOP INFO
              </a>
              <ul className="sub">
                <li>
                  <a href="">Shop Info</a>
                </li>
                <li>
                  <a href="">Open Guide</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={handleMobileNavClick}>
                COMPANY
              </a>
              <ul className="sub">
                <li>
                  <a href="">Company</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* mobile tab end */}

        {/* pc nav */}
        <div className="nav">
          <ul
            className={navOver ? "over" : ""}
            onMouseEnter={handleNavMouseEnter}
            onMouseLeave={handleNavMouseLeave}
          >
            <li>
              <a href="">ZISHEN</a>
              <ul className="sub">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Lookbook</a>
                </li>
                <li>
                  <a href="">Catalogue</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="">ZISHEN HOMME</a>
              <ul className="sub">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Lookbook</a>
                </li>
                <li>
                  <a href="">Catalogue</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="">MEDIA</a>
              <ul className="sub">
                <li>
                  <a href="">Movie</a>
                </li>
                <li>
                  <a href="">News</a>
                </li>
                <li>
                  <a href="">Event</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="">SERVICE</a>
              <ul className="sub">
                <li>
                  <a href="">Faq</a>
                </li>
                <li>
                  <a href="">1:1 Service</a>
                </li>
                <li>
                  <a href="">Group Order</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="">SHOP INFO</a>
              <ul className="sub">
                <li>
                  <a href="">Shop Info</a>
                </li>
                <li>
                  <a href="">Open Guide</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="">COMPANY</a>
              <ul className="sub">
                <li>
                  <a href="">Company</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* pc nav end  */}

        <div className="hero">
          <img src="images/hero.jpg" alt="" />
        </div>
      </div>
      {/* container end */}

      {/* transparency */}
      {/* 오버레이: 메뉴 열림에 연동해서 보임. 클릭 시 닫기 */}
      <div
        className={`transparency ${transparencyActive ? "active" : ""}`}
        onClick={handleTransparencyClick}
      ></div>

      {/* main content */}
      <div className="main_content">
        {/* BEST ITEMS Section */}
        <section className="items_section">
          <div className="section_header">
            <h2>BEST ITEMS</h2>
            <p>가장 인기 있는 상품을 만나보세요</p>
          </div>

          <div className="items_grid">
            <div className="item_card">
              <div className="item_image">
                <img src="/images/best1.jpg" alt="Best Item1" />
                <div className="item_overlay">
                  <button className="view_btn">VIEW DETAIL</button>
                </div>
              </div>

              <div className="item_info">
                <h3>Premium Wool coat</h3>
                <div className="item_price"> ￦350,000 </div>
                <div className="item_rating">★★★★★</div>
              </div>
            </div>

            <div className="item_card">
              <div className="item_image">
                <img src="/images/best2.jpg" alt="Best Item 2" />
                <div className="item_overlay">
                  <button className="view_btn">VIEW DETAIL</button>
                </div>
              </div>
              <div className="item_info">
                <h3>Cashmere Sweater</h3>
                <p className="item_price">₩280,000</p>
                <div className="item_rating">★★★★★</div>
              </div>
            </div>

            <div className="item_card">
              <div className="item_image">
                <img src="/images/best3.jpg" alt="Best Item 3" />
                <div className="item_overlay">
                  <button className="view_btn">VIEW DETAIL</button>
                </div>
              </div>
              <div className="item_info">
                <h3>Designer Handbag</h3>
                <p className="item_price">₩420,000</p>
                <div className="item_rating">★★★★★</div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS Section */}
        <section className="items_section new_items">
          <div className="section_header">
            <h2>NEW ARRIVALS</h2>
            <p>새롭게 출시된 최신 상품</p>
          </div>
          <div className="items_grid">
            <div className="item_card">
              <div className="item_image">
                <span className="new_badge">NEW</span>
                <img src="/images/new1.jpg" alt="New Item 1" />
                <div className="item_overlay">
                  <button className="view_btn">VIEW DETAIL</button>
                </div>
              </div>
              <div className="item_info">
                <h3>Modern Blazer</h3>
                <p className="item_price">₩320,000</p>
                <p className="item_date">2025.11.01</p>
              </div>
            </div>

            <div className="item_card">
              <div className="item_image">
                <span className="new_badge">NEW</span>
                <img src="/images/new2.jpg" alt="New Item 2" />
                <div className="item_overlay">
                  <button className="view_btn">VIEW DETAIL</button>
                </div>
              </div>
              <div className="item_info">
                <h3>Leather Shoes</h3>
                <p className="item_price">₩260,000</p>
                <p className="item_date">2025.11.01</p>
              </div>
            </div>

            <div className="item_card">
              <div className="item_image">
                <span className="new_badge">NEW</span>
                <img src="/images/new3.jpg" alt="New Item 3" />
                <div className="item_overlay">
                  <button className="view_btn">VIEW DETAIL</button>
                </div>
              </div>
              <div className="item_info">
                <h3>Classic Watch</h3>
                <p className="item_price">₩580,000</p>
                <p className="item_date">2025.11.02</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* footer */}
      <footer className="footer">
        <div className="footer_content">
          <div className="footer_section">
            <h3>ABOUT ZISHEN</h3>
            <p>
              지센은 현대적이고 세련된 패션을 추구하는
              <br />
              프리미엄 브랜드입니다.
            </p>
            <div className="footer_social">
              <a href="">
                <img src="/images/social_icon1.gif" alt="Facebook" />
              </a>
              <a href="">
                <img src="/images/social_icon2.gif" alt="Twitter" />
              </a>
              <a href="">
                <img src="/images/social_icon3.gif" alt="Instagram" />
              </a>
            </div>
          </div>

          <div className="footer_section">
            <h3>CUSTOMER SERVICE</h3>
            <ul>
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="">배송 안내</a>
              </li>
              <li>
                <a href="">교환 및 반품</a>
              </li>
              <li>
                <a href="">1:1 문의</a>
              </li>
            </ul>
          </div>

          <div className="footer_section">
            <h3>COMPANY INFO</h3>
            <ul>
              <li>
                <a href="">회사 소개</a>
              </li>
              <li>
                <a href="">매장 안내</a>
              </li>
              <li>
                <a href="">개인정보처리방침</a>
              </li>
              <li>
                <a href="">이용약관</a>
              </li>
            </ul>
          </div>

          <div className="footer_section">
            <h3>CONTACT</h3>
            <ul className="footer_contact">
              <li>
                <strong>고객센터</strong>
              </li>
              <li>1588-0000</li>
              <li>평일 10:00 - 18:00</li>
              <li className="footer_email">help@zishen.com</li>
            </ul>
          </div>
        </div>

        <div className="footer_bottom">
          <p className="footer_copyright">
            Copyright © 2025 ZISHEN. All rights reserved.
          </p>
          <p className="footer_info">
            상호: 주식회사 지센 | 대표: 홍길동 | 사업자등록번호: 123-45-67890
            <br />
            주소: 서울특별시 강남구 테헤란로 123 | 통신판매업신고:
            2025-서울강남-0000
          </p>
        </div>
      </footer>
    </>
  );
}

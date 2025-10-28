import React from "react";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./App.css";

export default function App() {
  // 현재 활성화된 섹션의 인덱스를 저장하는 state
  // - 메뉴의 active 클래스 표시를 제어함
  const [activeSection, setActiveSection] = useState(0);

  // useRef() → HTML 요소에 직접 접근할 수 있는 '참조 객체'를 생성
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  // 메뉴 클릭 시 해당 섹션으로 스무스하게 스크롤 이동하는 함수
  // scrollIntoView()는 브라우저 내장 메서드로, 특정 요소가 화면에 보이도록 스크롤시켜줌
  const scrollToSection = (index) => {
    // 배열로 관리하면 인덱스로 섹션을 다루기 쉬움
    const sections = [heroRef, aboutRef, servicesRef, portfolioRef, contactRef];

    // ?. (Optional chaining): 객체가 null이 아닐 때만 다음 속성 접근
    // ex) sections[index]?.current?.scrollIntoView → 안전하게 DOM 접근
    sections[index]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 스크롤 이벤트로 현재 보고 있는 섹션 감지
  useEffect(() => {
    // 이벤트 핸들러 함수 시작
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");

      // 현재 스크롤 위치를 계산
      // window.pageYOffset: 문서 상단으로부터 스크롤된 픽셀 값
      // window.innerHeight / 3: 화면의 1/3 지점을 기준으로 판정 (중앙쯤)
      const scrollPosition = window.pageYOffset + window.innerHeight / 3;

      // 각 섹션별로 화면에 보이는지 판단
      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        // 현재 스크롤 위치가 섹션의 top~bottom 사이에 들어오면 활성화
        if (scrollPosition >= top && scrollPosition < bottom) {
          // setState: activeSection을 업데이트 → 리렌더링 발생
          setActiveSection(index);
        }
      });
    };

    // 브라우저 스크롤 이벤트 등록
    // addEventListener('scroll', handleScroll)
    window.addEventListener("scroll", handleScroll);

    // useEffect의 return문은 컴포넌트가 사라질 때 실행됨
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // 빈 배열 → 처음 마운트 시에만 이벤트 등록

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">Scroll Navigation</h1>
          <ul className="nav-menu">
            <li
              className={activeSection === 0 ? "active" : ""}
              onClick={() => scrollToSection(0)} // 클릭 시 해당 섹션으로 이동
            >
              Home
            </li>
            <li
              className={activeSection === 1 ? "active" : ""}
              onClick={() => scrollToSection(1)}
            >
              About
            </li>
            <li
              className={activeSection === 2 ? "active" : ""}
              onClick={() => scrollToSection(2)}
            >
              Services
            </li>
            <li
              className={activeSection === 3 ? "active" : ""}
              onClick={() => scrollToSection(3)}
            >
              Portfolio
            </li>
            <li
              className={activeSection === 4 ? "active" : ""}
              onClick={() => scrollToSection(4)}
            >
              Contact
            </li>
          </ul>
        </div>
      </nav>

      {/* ✅ 각 섹션의 ref 연결 → scrollIntoView나 offsetTop 계산에 사용 */}
      <section ref={heroRef} className="section section-hero">
        <div className="section-content">
          <h2 className="fade-in">Welcome to One-page Scroll</h2>
          <p className="fade-in-delay">스크롤 효과를 경험해보세요</p>
        </div>
      </section>

      <section ref={aboutRef} className="section section-about">
        <div className="section-content">
          <h2 className="slide-in-left">About us</h2>
          <p className="slide-in-left">
            스크롤 할때마다 부드러운 효과가 적용되긔
          </p>
          <div className="cards">
            <div className="card card-fade">Card1</div>
            <div className="card card-fade">Card2</div>
            <div className="card card-fade">Card3</div>
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="section section-services">
        <div className="section-content">
          <h2 className="slide-in-right">Our Services</h2>
          <p className="slide-in-right">다양한 서비스를 제공합니다.</p>
        </div>
      </section>

      <section ref={portfolioRef} className="section section-portfolio">
        <div className="section-content">
          <h2 className="fade-in">Portfolio</h2>
          <p className="fade-in-delay">저희작업물들을 소개합니다.</p>
          <div className="swiper-container">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              spaceBetween={30}
              className="portfolio-swiper"
            >
              <SwiperSlide>
                <div className="portfolio-item">
                  <div className="portfolio-image">Project 1</div>
                  <h3>프로젝트 1</h3>
                  <p>React와 TypeScript를 사용한 웹 애플리케이션</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="portfolio-item">
                  <div className="portfolio-image">Project 2</div>
                  <h3>프로젝트 2</h3>
                  <p>Node.js 기반 RESTful API 서버</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="portfolio-item">
                  <div className="portfolio-image">Project 3</div>
                  <h3>프로젝트 3</h3>
                  <p>모바일 반응형 웹 디자인</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="portfolio-item">
                  <div className="portfolio-image">Project 4</div>
                  <h3>프로젝트 4</h3>
                  <p>데이터 시각화 대시보드</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="portfolio-item">
                  <div className="portfolio-image">Project 5</div>
                  <h3>프로젝트 5</h3>
                  <p>실시간 채팅 애플리케이션</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="portfolio-item">
                  <div className="portfolio-image">Project 6</div>
                  <h3>프로젝트 6</h3>
                  <p>E-commerce 플랫폼</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section ref={contactRef} className="section section-contact">
        <div className="section-content">
          <h2 className="zoom-in">Contact us</h2>
          <p className="zoom-in">
            연락을 주시면 빠른 시일 내에 답변 드리겠습니다.
          </p>
        </div>
      </section>
    </div>
  );
}

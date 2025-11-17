import React, { useCallback, useMemo, useRef, useState } from "react";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import SectionFour from "./components/SectionFour";
import SectionFive from "./components/SectionFive";
import SectionSix from "./components/SectionSix";
import FixAnimation from "./components/FixAnimation";
import NavigationDots from "./components/NavigationDots";
import Header from "./components/Header";
import OverlayMenu from "./components/OverlayMenu";

const SECTION_CONFIG = [
  { id: "section1", label: "Main", theme: "dark" },
  { id: "section2", label: "Our Value", theme: "light" },
  { id: "section3", label: "What we do", theme: "dark" },
  { id: "section4", label: "Nasreport", theme: "light" },
  { id: "section5", label: "Let's be Together", theme: "dark" },
  { id: "section6", label: "Contact", theme: "dark" },
];

// 섹션 총 갯수
const SECTION_COUNT = SECTION_CONFIG.length;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  const wheelLock = useRef(false);
  // const touchStartY = useRef(null);

  const changeSection = useCallback(
    (next) => {
      if (showIntro || isMenuOpen) {
        return;
      }
      setActiveSection((prev) => {
        const clamped = Math.max(0, Math.min(SECTION_COUNT - 1, next(prev)));
        return clamped;
      });
    },
    [isMenuOpen, showIntro]
  );

  const handleWheel = useCallback((event) => {
    // 햄버거 메뉴(isMenuOpen) 클릭시 메뉴가 열려있을때 마우스 휠 금지 함수 실행
    // wheelLock.current => 휠처리 중복방지 (1초간 추가 휠 이벤트 금지)
    // showIntro => 홈페이지 열릴때 인트로 애니메이션 중 휠 이벤트 무시
    if (wheelLock.current || isMenuOpen || showIntro) {
      return;
    }

    const delta = event.deltaY;
    if (delta === 0) return;
    console.log(
      "마우스 휠 deltaY:",
      delta,
      delta > 0 ? "(아래로 스크롤)" : "(위로 스크롤)" // 밑으로 스크롤시 양수, 위로 음수
    );
    wheelLock.current = true; // 휠금지
    // 인덱스 0번~5번으로만 움직일 수있도록 제한하는 함수
    changeSection((prev) => (delta > 0 ? prev + 1 : prev - 1));
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 1000);
  });

  const fullCoverStyle = useMemo(
    () => ({
      transform: `translateY(-${activeSection * 100}vh)`,
      transition: `transform 1s ease`,
    }),
    [activeSection]
  );

  // 현재 활성화된 섹션의 인덱스(0~5)
  const sections = useMemo(() => SECTION_CONFIG, []);

  return (
    <div className={`app-root${isMenuOpen ? " menu-open" : ""}`}>
      <FixAnimation
        visible={showIntro}
        onFinished={() => setShowIntro(false)}
      />
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        isLightBackground={sections[activeSection]?.theme === "light"}
      />
      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <NavigationDots
        sections={sections}
        activeIndex={activeSection}
        onSelect={(index) => changeSection(() => index)}
      />
      <div id="fullpage" onWheel={handleWheel}>
        <div className="full_cover" style={fullCoverStyle}>
          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <SectionFour />
          <SectionFive />
          <SectionSix />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import type { FocusEvent, MouseEvent } from "react";
import { Link, NavLink } from "react-router-dom";

//  exact?: boolean  → react-router v6에서는 NavLink의 'end' prop으로 대체됨
// (정확히 path가 일치할 때만 active 처리)
type NavItem = {
  label: string;
  path: string;
  exact?: boolean;
  subItems: { label: string; to: string }[];
};

const navItems: NavItem[] = [
  {
    label: "홈",
    path: "/", // "/"는 모든 경로의 prefix라 end=true가 아니면 항상 활성됨
    exact: true,
    subItems: [
      { label: "브랜드 소개", to: "/#brand" },
      { label: "오늘의 수프", to: "/#soup" },
      { label: "온라인 주문", to: "/#order" },
      { label: "지점 찾기", to: "/#stores" },
    ],
  },
  {
    label: "메뉴소개",
    path: "/menu",
    subItems: [
      { label: "샌드위치", to: "/menu#sandwich" },
      { label: "랩ㆍ기타", to: "/menu#wrap" },
      { label: "샐러드", to: "/menu#salad" },
      { label: "아침메뉴", to: "/menu#breakfast" },
      { label: "스마일 썹", to: "/menu#smile-sub" },
    ],
  },
  {
    label: "이용방법",
    path: "/how-to-order",
    subItems: [
      { label: "써브웨이 이용방법", to: "/how-to-order#guide" },
      { label: "빵 & 재료 소개", to: "/how-to-order#ingredients" },
      { label: "앱 주문 안내", to: "/how-to-order#app" },
      { label: "단체 주문", to: "/how-to-order#group" },
    ],
  },
  {
    label: "새소식",
    path: "/news",
    subItems: [
      { label: "이벤트 · 프로모션", to: "/news#event" },
      { label: "뉴스 · 공지사항", to: "/news#notice" },
      { label: "광고 영상", to: "/news#media" },
      { label: "브랜드 캠페인", to: "/news#campaign" },
    ],
  },
  {
    label: "가맹점",
    path: "/franchise",
    subItems: [
      { label: "가맹 절차", to: "/franchise#process" },
      { label: "투자 비용", to: "/franchise#investment" },
      { label: "지사 안내", to: "/franchise#branch" },
      { label: "사업 설명회", to: "/franchise#seminar" },
      { label: "FAQ", to: "/franchise#faq" },
    ],
  },
];

export default function SiteNav() {
  // hoveredItem: 데스크톱 메가메뉴에서 현재 호버/포커스된 Top 항목 label (없으면 null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  // isMobileNavOpen: 모바일 내비 전체 열림/닫힘 상태
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // expandedMobileItem: 모바일 아코디언에서 펼쳐진 Top 항목의 label (없으면 null)
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null
  );

  //  isMobileNavOpen(모바일메뉴 열림/닫힘)
  //  expandedMobileItem(서브 메뉴 전환에 필요한 상태) - 모바일 메뉴 중 어떤 항목 펼쳐졌는지 추적(아코디언제어)
  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
    setExpandedMobileItem(null);
  };
  //isMobileNavOpen 은 모바일 메뉴가 열렸는지(true), 닫혔는지(false) 상태를 저장
  //true - 메뉴열기  false = 메뉴닫기
  //expandedMobileItem 모바일 메뉴안의 펼쳐진 서브 메뉴 항복을 관리하는 state
  //null로 초기화하면 -> 모든 서브메뉴가 접힙니다.

  /** 모바일 링크 클릭 핸들러
   *  - MouseEvent<HTMLAnchorElement> 타입으로, a 요소 전용 이벤트 타입 안전성 확보
   *  - event.currentTarget: 핸들러가 바인딩된 '그' 요소 (버블링 중 다른 자식이 아닌)
   *  - .closest('.mobile-nav'): 해당 링크가 모바일 내비 내부인지 확인
   *  - 내부라면 클릭 시 내비 닫고 아코디언 초기화
   */
  const handleMobileLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget; //클릭된 <a>요소를 가져옴
    if (target.closest(".mobile-nav")) {
      //해당 <a>요소가 .mobile-nav 내부에 있는지확인
      setIsMobileNavOpen(false); //모바일 내비 메뉴 닫기
      setExpandedMobileItem(null); //확장된 메뉴 상태 초기화
    }
  };

  const handleMobileItemToggle = (label: string) => {
    setExpandedMobileItem((prev) => (prev === label ? null : label));
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container brand-container">
          <div className="brand">
            <span className="brand-primary">Subway</span>
            <span className="brand-secondary">Fresh Choice</span>
          </div>
        </div>
      </div>
      <div
        className="header-nav"
        onMouseLeave={() => setHoveredItem(null)}
        onBlur={(event: FocusEvent<HTMLDivElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setHoveredItem(null);
          }
        }}
        //onMouseLeave -> 마우스가 메뉴 영역밖으로 나가면 닫힘
        //onBlur : 키보드 탐색중 포커스가 다른 요소로 이동해도 닫힘
        // null 어떤값도 선택되지 않은상태
        // 메뉴에서 마우스가 벗어나면 상태를 초기화
      >
        <div className="container desktop-nav-container">
          <nav className="site-nav desktop-nav">
            <ul className="top-nav">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="nav-item"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onFocus={() => setHoveredItem(item.label)}
                  // hoveredItem상태가 업데이트됨 -> 서브(메가메뉴 열림)
                >
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={(
                      { isActive } // 활성화 상태에 따라 클래스 동적 부여
                    ) => (isActive ? "active" : undefined)}
                  >
                    {item.label}
                  </NavLink>
                  {/* navItems 기반으로 상단 1뎁스 링크 자동 생성 */}
                  {/* navItem 배열을 기반으로 홈, 메뉴소개, 회사소개 이용방법, 새소식 등 링크를 생성 */}
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-expanded={isMobileNavOpen} // 보조기기에게 열림 상태 전달(true/false)
            onClick={toggleMobileNav}
          >
            <span className="sr-only">메뉴 열기</span>
            {/* sr-only 엡접근성 */}
            {/* sr-only: 시각적으로 숨기고 스크린리더에만 읽힘 */}
            {/* aria-hidden: 장식 요소(햄버거 바)는 스크린리더가 무시 */}
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <nav
          className="mobile-nav"
          data-open={isMobileNavOpen ? "true" : "false"} // CSS에서 [data-open="true"]로 상태 스타일 제어중
        >
          <ul>
            {navItems.map((item, index) => {
              const isExpanded = expandedMobileItem === item.label; // 현재 펼쳐진 항목인지
              const panelId = `mobile-sub-nav-${index}`; // 아코디언 패널 index(=고유값)
              return (
                <li
                  key={item.label}
                  className="mobile-nav-item"
                  data-expanded={isExpanded ? "true" : "false"}
                >
                  <div className="mobile-nav-top">
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) =>
                        isActive ? "active" : undefined
                      }
                      onClick={handleMobileLinkClick} // 링크 클릭 시 모바일 내비 닫기
                    >
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      className="mobile-accordion-trigger"
                      aria-expanded={isExpanded} // 이 버튼이 제어하는 패널이 펼쳐졌는지
                      aria-controls={panelId} // 제어 대상 패널 id와 연결 (접근성 규약)
                      onClick={() => handleMobileItemToggle(item.label)}
                    >
                      <span className="sr-only">
                        {isExpanded
                          ? `${item.label} 메뉴 닫기`
                          : `${item.label} 메뉴 열기`}
                      </span>
                      <span aria-hidden="true" />
                    </button>
                  </div>
                  <ul
                    id={panelId} // 위의 aria-controls와 1:1 연결되어야 함
                    className="mobile-sub-nav"
                    data-open={isExpanded ? "true" : "false"} // CSS로 슬라이드,높이 전환 등 제어중
                  >
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          to={subItem.to}
                          className="dropdown-link"
                          onClick={handleMobileLinkClick} // 서브 링크 클릭 시도 닫기
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 데스크톱 메가메뉴: hoveredItem 존재시 열림 */}
        {/* [data-open="true"] 상태시 mega-menu가 표시 */}
        <div className="mega-menu" data-open={hoveredItem ? "true" : "false"}>
          <div className="mega-menu-inner">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`mega-column${
                  hoveredItem === item.label ? " mega-column-active" : ""
                }`}
                onMouseEnter={() => setHoveredItem(item.label)} // 마우스로 컬럼 이동 시도 활성 유지
                onFocus={() => setHoveredItem(item.label)} // 키보드 포커스 진입 시도 활성
              >
                <span className="mega-heading">{item.label}</span>
                <ul>
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link to={subItem.to} className="dropdown-link">
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

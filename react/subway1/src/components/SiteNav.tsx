import { useState } from "react";
import type { FocusEvent } from "react";
import { NavLink, Link } from "react-router-dom";

// 메뉴 구조를 정의
// NavItem: 상위 메뉴의 label, path, 하위 메뉴(subItems) 구조를 가짐
// exact : “이 경로가 정확히 일치할 때만 활성화될지”를 결정하는 불리언(Boolean) 속성
// ?는 “이 속성이 선택적(optional)”이라는 뜻. NavItem 객체를 만들 때 꼭 exact를 쓸 필요는 없음
type NavItem = {
  label: string;
  path: string;
  exact?: boolean; // NavLink의 end 속성과 연결 → true면 "정확히 일치"할 때만 활성화됨
  subItems: { label: string; to: string }[]; // 하위 링크 목록
};

// 실제 네비게이션 메뉴 데이터
const navItems: NavItem[] = [
  {
    label: "홈",
    path: "/",
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
  // 현재 마우스로 올리거나 포커스된 메뉴 이름을 저장하는 상태
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
      {/* 
          - header-nav는 전체 네비게이션 래퍼
          - onMouseLeave: 마우스가 영역 밖으로 나가면 메뉴 닫기
          - onBlur: 키보드 포커스가 빠질 때 닫기
        */}
      <div
        className="header-nav"
        onMouseLeave={() => setHoveredItem(null)} // 마우스가 나가면(null) 열려 있던 메뉴 닫기
        onBlur={(event: FocusEvent<HTMLDivElement>) => {
          // FocusEvent: 포커스가 이동할 때 발생하는 이벤트 타입
          // event.currentTarget → 지금 블러가 걸린 요소(header-nav)
          // event.relatedTarget → 새로 포커스를 받은 요소
          if (!event.currentTarget.contains(event.relatedTarget)) {
            // 새 포커스가 header-nav 내부가 아닐 경우 닫기
            setHoveredItem(null);
          }
        }}
        // null 어떤값도 선택되지 않은상태
        // 메뉴에서 마우스가 벗어나면 상태를 초기화
      >
        <div className="container">
          <nav className="site-nav">
            <ul className="top-nav">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="nav-item"
                  onMouseEnter={() => setHoveredItem(item.label)} // 마우스 hover시 해당 메뉴를 열기
                  onFocus={() => setHoveredItem(item.label)} // 키보드 포커스 접근 시도 (탭키)
                  // hoveredItem상태가 업데이트됨 -> 서브(메가메뉴 열림)
                >
                  <NavLink
                    to={item.path}
                    end={item.exact} // exact=true일 경우, path 완전히 일치해야 활성화됨
                    className={({ isActive }) =>
                      // isActive: NavLink의 상태를 알려주는 boolean
                      // 활성 상태일 때 className="active" 적용
                      isActive ? "active" : undefined
                    }
                  >
                    {item.label}
                  </NavLink>
                  {/* navItem 배열을 기반으로 홈, 메뉴소개, 회사소개 이용방버 새소식 등 링크를 생성 */}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 
            - mega-menu: 하위 메뉴 드롭다운 전체 영역
            - data-open 속성은 CSS에서 [data-open="true"] 식으로 하위 메뉴 드롭다운 제어 가능
          */}
        <div className="mega-menu" data-open={hoveredItem ? "true" : "false"}>
          <div className="mega-menu-inner">
            {navItems.map((item) => (
              <div
                key={item.label}
                // 조건부 클래스 추가: 활성된 메뉴일 때 'mega-column-active' 추가
                className={`mega-column${
                  hoveredItem === item.label ? " mega-column-active" : ""
                }`}
                // 하위 메뉴로 마우스를 이동해도 닫히지 않게 유지
                onMouseEnter={() => setHoveredItem(item.label)}
                // 키보드 포커스 접근 시 열기 유지
                onFocus={() => setHoveredItem(item.label)}
              >
                {/* 각 카테고리의 제목 */}
                <span className="mega-heading">{item.label}</span>
                {/* 하위 링크 목록 */}
                <ul>
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      {/* 
                          Link: react-router-dom의 클라이언트 라우팅용 링크
                          - 페이지 전체 새로고침 없이 내부 이동 가능
                          - 해시(#)가 있는 경우 스크롤 이동을 트리거할 수 있음
                        */}
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

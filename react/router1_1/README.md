# React Router 완벽 가이드 (Vite)

React Router를 활용한 단일 페이지 애플리케이션(SPA) 개발을 위한 종합 가이드 사이트입니다.

## 📚 학습 내용

### 기초
- React Router 소개 및 설치
- BrowserRouter와 Routes
- Link와 NavLink 사용법
- 기본적인 라우팅 패턴

### 중급
- URL 파라미터와 쿼리 스트링
- 프로그래밍 방식 네비게이션
- useLocation 훅
- 중첩 라우팅 (Nested Routes)
- 인덱스 라우트

### 고급
- Lazy Loading & Code Splitting
- Protected Routes (보호된 라우트)
- 커스텀 훅 만들기
- 동적 라우트 생성
- 에러 경계
- SEO 최적화

### 실전 예제
- 인증 시스템
- 상품 카탈로그
- 검색 기능
- 다국어 지원
- 모달 라우팅

## 🚀 시작하기

### 설치

```bash
npm install
```

### 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)를 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프리뷰 (빌드된 결과물)

```bash
npm run preview
```

## 📦 사용된 기술

- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.8

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Navi.jsx          # 네비게이션 컴포넌트
│   ├── Navi.css          # 네비게이션 스타일
│   └── LazyComponent.jsx # 지연 로딩 예제 컴포넌트
├── pages/
│   ├── Home.jsx          # 홈 페이지
│   ├── Basics.jsx        # 기초 설명 페이지
│   ├── Intermediate.jsx  # 중급 설명 페이지
│   ├── Advanced.jsx      # 고급 설명 페이지
│   ├── Examples.jsx      # 실전 예제 페이지
│   └── PageStyle.css     # 페이지 공통 스타일
├── App.jsx               # 메인 앱 컴포넌트
├── App.css               # 앱 스타일
├── main.jsx              # 진입점
└── index.css             # 글로벌 스타일
```

## ✨ 주요 기능

- 📖 단계별 상세 설명
- 💻 실제 동작하는 예제 코드
- 🎨 모던하고 반응형 UI
- 🧪 인터랙티브 데모
- 📝 자세한 코드 주석
- 💡 실용적인 팁 제공

## 🔥 Vite의 장점

- ⚡️ 빠른 개발 서버 시작
- 🔥 핫 모듈 교체 (HMR)
- 📦 최적화된 빌드
- 🎯 자동 코드 스플리팅
- 🛠️ 타입스크립트 지원

## 📖 상세 가이드

자세한 내용은 [GUIDE.md](GUIDE.md) 파일을 참조하세요.

## 📝 라이선스

MIT

import MainContent from "./components/MainContent";
import Header from "./components/Header";
import "./App.css";
export default function App() {
  return (
    <div className="app">
      <Header />
      <MainContent />
    </div>
  );
}

// Redux
// 앱전체가 공유하는 데이터창고
// 어디서든 데이터를 읽고(useSelector), 변경(dispatch) 할 수 있음
// props를 3단계이상, 컴포넌트 50개이상 연결할때 사용
// stroe(창고) + useSelector(읽기) + dispatch(쓰기) => 핵심개념

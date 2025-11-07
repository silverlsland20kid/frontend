import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  // 사용자의 데이터를 받아와서 저장
  const [users, setUsers] = useState([]);
  // 로딩여부 데이터를 받아와서 저장
  const [loading, setLoading] = useState(false);
  // 에러여부 데이터를 받아와서 저장
  const [error, setError] = useState(null);
  // 사용자카드 호버 상태 관리
  const [hoveredCard, setHoveredCard] = useState(null);

  // 사용자 데이터들 가져오긔
  const axiosUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      // fetch와 다르게 axios는 자동으로 json파싱을 해주므로
      // response.data 함수를 적지 않아도 바로 데이터로 접근 가능하묘
      setUsers(response.data);
    } catch (err) {
      if (err.response) {
        setError(`서버오류 : ${err.response.status}`);
      } else if (err.request) {
        //요청은 전송됐으나 응답 못받은경우
        setError("서버로부터 응답이 없습니다.");
      } else {
        setError(`요청 오류 : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트시 데이터 로드되게 실행
  useEffect(() => {
    axiosUsers();
  }, []);

  // 새로고침시 핸들러 함수 실행해서 다시 데이터 로드
  const handleRefresh = () => {
    axiosUsers();
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <header style={styles.header}>
        <h1 style={styles.title}>사용자 목록</h1>
        <button style={styles.refreshButton} onClick={handleRefresh}>
          🔄 새로고침
        </button>
      </header>

      {/* 로딩 상태 */}
      {loading && (
        <div style={styles.messageContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>로딩중...</p>
        </div>
      )}

      {/* 에러 상태 */}
      {error && (
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>⚠️ {error}</p>
          <button onClick={handleRefresh} style={styles.retryButton}>
            다시 시도
          </button>
        </div>
      )}

      {/* 사용자 목록 */}
      {!loading && !error && (
        <div style={styles.userGrid}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                ...styles.userCard,
                ...(hoveredCard === user.id ? styles.userCardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(user.id)} // 마우스 올림
              onMouseLeave={() => setHoveredCard(null)} // 마우스 벗어남
            >
              {/* charAt => user.name 문자열의 첫 번째 문자를 가져오는 코드, 0은 문자열의 첫 번째 문자를 의미 */}
              <div style={styles.userAvatar}>{user.name.charAt(0)}</div>
              <h3 style={styles.userName}>{user.name}</h3>
              <p style={styles.userEmail}>📧 {user.email}</p>
              <p style={styles.userCompany}>🏢 {user.company.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* 데이터가 없을 때 */}
      {!loading && !error && users.length === 0 && (
        <div style={styles.messageContainer}>
          <p style={styles.emptyText}>사용자 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    color: "#333",
    fontSize: "2rem",
  },
  refreshButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#9E9E9E",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #9E9E9E",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "1rem",
    fontSize: "1.2rem",
    color: "#464646",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  retryButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  userGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    textAlign: "center",
  },
  userCardHover: {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#9E9E9E",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0 auto 1rem",
  },
  userName: {
    margin: "0.5rem 0",
    color: "#333",
    fontSize: "1.2rem",
  },
  userEmail: {
    color: "#666",
    fontSize: "0.9rem",
    margin: "0.5rem 0",
  },
  userCompany: {
    color: "#888",
    fontSize: "0.85rem",
    margin: "0.5rem 0",
  },
  emptyText: {
    fontSize: "1.2rem",
    color: "#999",
  },
};

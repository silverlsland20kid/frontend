import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      setUsers(response.data);
    } catch (err) {
      if (err.response) {
        setError(`서버오류 : ${err.response.status}`);
      } else if (err.request) {
        setError("서버로부터 응답이 없습니다.");
      } else {
        setError(`요청 오류 : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosUsers();
  }, []);

  const handleRefresh = () => {
    axiosUsers();
  };

  return (
    <div className="container">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <header className="header">
        <h1 className="title">사용자 목록</h1>
        <button className="refreshButton" onClick={handleRefresh}>
          새로고침
        </button>
      </header>

      {loading && (
        <div className="messageContainer">
          <div className="spinner"></div>
          <p className="loadingText">로딩중</p>
        </div>
      )}

      {!loading && !error && (
        <div className="userGrid">
          {users.map((user) => (
            <div key={user.id} className="userCard">
              <div className="userAvatar">{user.name.charAt(0)}</div>
              <h3 className="userName">{user.name}</h3>
              <p className="userEmail">📧 {user.email}</p>
              <p className="userCompany">🏢 {user.company.name}</p>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="errorContainer">
          <p className="errorText">⚠️ {error}</p>
          <button className="retryButton" onClick={handleRefresh}>
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

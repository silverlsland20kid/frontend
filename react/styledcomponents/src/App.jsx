import React from "react";
import styled from "styled-components";

export default function App() {
  const Button = styled.button`
    background: #4f46e5;
    color: white;
    font-size: 16px;
    padding: 10px 20px;
    font-weight: 600;
    transition: 0.2s;
    cursor: pointer;
    border-radius: 8px;
    border: none;

    &:hover {
      background: #3f3ab9;
    }
  `;

  return <Button>기본버튼</Button>;
}

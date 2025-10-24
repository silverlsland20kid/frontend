import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import "./App.css";
import About from "./components/About";
import Service from "./components/Service";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect } from "react";

export default function App() {
  // 컴포넌트가 처음 화면에 나타날때 한번 실행되는 코드
  useEffect(() => {
    // mount => 처음 렌더링 될때
    const handleScroll = () => {
      document.querySelectorAll(".slideanim").forEach((el) => {
        const pos = el.getBoundingClientRect().top; // offset().top; 과 비슷한 기능
        const winHeight = window.innerHeight;
        if (pos < winHeight - 100) {
          el.classList.add("slide");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트가 사라질때
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Service />
      <Portfolio />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}

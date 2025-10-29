import React, { useEffect, useState } from "react";
import { FiDownload, FiChevronDown } from "react-icons/fi";
import "./hero.css";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // window.scrollY => 화면에서 스크롤된 y축 거리
    // 컴포넌트가 사라질때(unmount) 이벤트 리스너를 정리해줌
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div
        className="blob blob1"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`,
          animation: "pulse 8s ease-in-out infinite",
        }}
      ></div>
      <div
        className="blob blob-2"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
          animation: "pulse 8s ease-in-out infinite",
          animationDelay: "2s",
        }}
      ></div>

      <div className="hero-content">
        <div className="hero-greeting">
          <div className="greeting-text">Hello, I`m </div>
        </div>

        <h1 className="hero-name">Your Name</h1>
        <h2 className="hero-title">Full Stack Developer</h2>
        <p className="hero-description">
          I create beautiful and functional web experiences. Passionate about
          clean code and modern design.
        </p>

        <div className="hero-buttons">
          <button onClick={scrollToContact} className="btn-primary">
            Get In Touch
          </button>
          <button
            className="btn-secondary"
            onClick={() => window.open("/cv.pdf", "_blank")}
          >
            <FiDownload />
            Download CV
          </button>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-content">
            <span className="scroll-text">Scroll down</span>
            <FiChevronDown size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}

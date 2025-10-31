import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useState } from "react";
import "./projects.css";

export default function Projects() {
  // hoveredIndex: 현재 마우스가 올라간 카드(index)를 기억하는 state
  // 기본값 null → 아무 카드에도 hover하지 않은 상태
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce application with payment integration, user authentication, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates, drag-and-drop interface, and team collaboration features.",
      tech: ["React", "Firebase", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media metrics with data visualization, export features, and customizable reports.",
      tech: ["Next.js", "Chart.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Weather App",
      description:
        "Beautiful weather application with forecast data, interactive maps, and location-based services.",
      tech: ["React", "OpenWeather API", "Leaflet"],
      image:
        "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Portfolio Website",
      description:
        "Responsive portfolio website with animations, dark mode, and modern UI/UX design.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Chat Application",
      description:
        "Real-time chat application with rooms, file sharing, emoji support, and message history.",
      tech: ["Socket.io", "Node.js", "React"],
      image:
        "https://images.unsplash.com/photo-1586999768265-24af89630739?w=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
  ];

  return (
    // id="projects" → 네비게이션 스크롤링 시 anchor로 이동 가능
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            My <span className="highlight">Projects</span>
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            A collection of my recent work showcasing my skills and experience
          </p>
        </div>
        <div className="projects-grid">
          {/* map() : projects 배열의 각 요소를 순회하며 JSX 생성 */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              // 마우스가 카드 위로 올라갔을 때 현재 index 저장
              onMouseEnter={() => setHoveredIndex(index)}
              // 마우스가 카드 밖으로 나가면 null로 초기화
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay"></div>
                {/* 조건부 렌더링: hoveredIndex === index → 현재 hover 중인 카드에만 overlay(아이콘) 표시 */}
                {hoveredIndex === index && (
                  // 카드에 hover시 순회하는 index 번호화 호버시 index 번호가 같으면 실행
                  <div className="project-hover-overlay">
                    <a
                      href={project.github}
                      target="_blank"
                      class="project-link"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      class="project-link"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                )}
              </div>
              {/* content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {/* Tech stack */}
                <div className="project-tech">
                  {/* project.tech의 배열을 다시 map()으로 순회 */}
                  {project.tech.map((t, tIndex) => (
                    <span key={tIndex} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

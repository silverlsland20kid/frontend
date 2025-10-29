import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useState } from "react";
import "./projects.css";

export default function Projects() {
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
          {/* map()을 이용해 projects 배열의 각 요소를 반복 렌더링 */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              // 마우스가 올라가면 hoveredIndex를 현재 카드 index로 변경
              onMouseEnter={() => setHoveredIndex(index)}
              // 마우스가 나가면 hover 상태 해제 (null)
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay"></div>
                {/* hover overLay */}
                {/* 조건부 렌더링: hoveredIndex가 현재 카드 index일 경우에만 아래의 div가 보임
                    → 즉, 현재 마우스가 올라간 카드만 아이콘 표시*/}
                {hoveredIndex === index && (
                  <div className="project-hover-overlay">
                    <a
                      href={project.github}
                      target="_blank"
                      className="project-link"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      className="project-link"
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
                <div className="project-tech">
                  {/* * 중첩 map() — tech 배열을 순회하며 각 기술 이름을 뱃지(span)로 렌더링
                   * tIndex를 key로 부여 (React가 각 요소를 효율적으로 업데이트하기 위해 필요) */}
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

import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaGitAlt,
  FaPython,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
} from "react-icons/si";
import "./skills.css";

export default function Skills() {
  // 내부에 title(카테고리명)과 skills 배열(각 기술 이름, 아이콘, 색상)을 포함
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", icon: FaHtml5, color: "orange" },
        { name: "CSS3", icon: FaCss3Alt, color: "blue" },
        { name: "JavaScript", icon: FaJs, color: "yellow" },
        { name: "React", icon: FaReact, color: "cyan" },
        { name: "Next.js", icon: SiNextdotjs, color: "white" },
        { name: "Tailwind", icon: SiTailwindcss, color: "lightcyan" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNode, color: "green" },
        { name: "Express", icon: SiExpress, color: "gray" },
        { name: "Python", icon: FaPython, color: "lightyellow" },
        { name: "MongoDB", icon: SiMongodb, color: "lightgreen" },
        { name: "Docker", icon: FaDocker, color: "lightblue" },
        { name: "AWS", icon: FaAws, color: "orange" },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "darkorange" },
        { name: "GitHub", icon: FaGitAlt, color: "lightgray" },
        { name: "Docker", icon: FaDocker, color: "lightblue" },
        { name: "AWS", icon: FaAws, color: "orange" },
      ],
    },
  ];

  // getProgressWidth: 인덱스에 따라 숙련도 퍼센트(width%)를 반환하는 함수
  const getProgressWidth = (index) => {
    const percentage = [95, 90, 85, 88, 82, 80, 92, 85, 78, 75];
    return percentage[index] || 80; // 인덱스가 배열 범위를 넘어가면 기본값 80%으로 보여줘라
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            My <span className="highlight">Skills</span>
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Technologies and tools I work with to build amazing applications
          </p>
        </div>

        <div className="skills-grid">
          {/* skillCategories.map() → 카테고리 배열을 순회하며 각각의 카드 렌더링 */}
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category-card">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid-inner">
                {/* 각 카테고리 안의 기술(skill)들을 또 한 번 map()으로 출력 */}
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    {/* skill.icon은 import된 컴포넌트 자체를 변수로 참조함<FaHtml5 />처럼 직접 JSX로 사용 가능 */}
                    <skill.icon className={`skill-icon skill-${skill.color}`} />
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-bars">
          <div className="skills-bars-title">Proficiency Levels</div>
          {/* 기술 이름 배열을 순회하며, getProgressWidth()로 width 계산 */}
          {/* 배열을 변수에 담지 않고, 즉시 만들어서 바로 map()을 실행해버렸음..*/}
          {/* 이런식으로 만든 배열은 메모리에 한 번 만들어지고 바로 사라지는 임시 값임 */}
          {[
            "JavaScript",
            "React",
            "Node.js",
            "TypeScript",
            "MongoDB",
            "Git",
            "Python",
            "CSS",
            "HTML",
            "Express.js",
          ].map((skill, index) => {
            const width = getProgressWidth(index);
            return (
              <div key={index} className="skill-bar-container">
                {/* 스킬명 + % 값 */}
                <div className="skill-bar-header">
                  <span className="skill-bar-label">{skill}</span>
                  <span className="skill-bar-value">{width}%</span>
                </div>
                {/* 회색 트랙(배경) */}
                <div className="skill-bar-track">
                  {/* 실제 채워지는 막대 부분 (width에 따라 길이 달라짐) */}
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${width}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

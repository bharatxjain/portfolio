import "./styles/SkillsMarquee.css";
import { useEffect } from "react";

import {
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiFastapi,
  SiDocker,
  SiGit,
  SiPalantir,
  SiMysql,
  SiStreamlit,
  SiPandas,
  SiNumpy,
} from "react-icons/si";

import {
  FaBrain,
  FaRobot,
  FaNetworkWired,
  FaDatabase,
  FaChartPie,
  FaChartBar,
  FaCubes,
  FaAws,
} from "react-icons/fa";

const skills = [
  { name: "Machine Learning", icon: <FaBrain color="#c2a4ff" /> },
  { name: "Python", icon: <SiPython color="#3776AB" /> },
  { name: "Deep Learning", icon: <FaNetworkWired color="#c2a4ff" /> },
  { name: "NLP", icon: <FaRobot color="#20B2AA" /> },
  { name: "Feature Engineering", icon: <FaCubes color="#FF7F50" /> },
  { name: "Generative AI", icon: <FaBrain color="#FF69B4" /> },
  { name: "RAG", icon: <FaDatabase color="#4DB33D" /> },
  { name: "AWS Bedrock", icon: <FaAws color="#FF9900" /> },
  { name: "Agentic Workflows", icon: <FaRobot color="#00CED1" /> },
  { name: "NumPy", icon: <SiNumpy color="#013243" /> },
  { name: "Pandas", icon: <SiPandas color="#150458" /> },
  { name: "Scikit-learn", icon: <SiScikitlearn color="#F7931E" /> },
  { name: "PyTorch", icon: <SiPytorch color="#EE4C2C" /> },
  { name: "Matplotlib", icon: <FaChartPie color="#11557c" /> },
  { name: "Seaborn", icon: <FaChartBar color="#3776ab" /> },
  { name: "Streamlit", icon: <SiStreamlit color="#FF4B4B" /> },
  { name: "Pydantic", icon: <FaCubes color="#E92063" /> },
  { name: "FastAPI", icon: <SiFastapi color="#009688" /> },
  { name: "Docker", icon: <SiDocker color="#2496ED" /> },
  { name: "SQL", icon: <FaDatabase color="#336791" /> },
  { name: "Git", icon: <SiGit color="#F05032" /> },
  { name: "Palantir", icon: <SiPalantir color="#ffffff" /> },
  { name: "AWS", icon: <FaAws color="#FF9900" /> },
  { name: "MySQL Workbench", icon: <SiMysql color="#4479A1" /> },
];

const SkillsMarquee = () => {
  // add scroll-triggered reveal: we set per-item transition delays inline
  // and toggle `in-view` on the grid when it enters the viewport
  useEffect(() => {
    const grid = document.querySelector(".skills-grid");
    if (!grid) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            grid.classList.add("in-view");
          } else {
            grid.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="skills-grid-section section-container" id="skills">
      <div className="skills-grid-container">
        <h3 className="skills-grid-subtitle">
          Hover over a skill for its name
        </h3>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-grid-item group"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="skill-grid-icon-wrapper">{skill.icon}</div>
              <div className="skill-grid-overlay">
                <div className="skill-grid-overlay-content">
                  <p className="skill-grid-name">{skill.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;

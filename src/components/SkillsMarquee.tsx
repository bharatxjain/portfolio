import "./styles/SkillsMarquee.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  SiDocker,
  SiGit,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPalantir,
  SiPython,
  SiScikitlearn,
  SiStreamlit,
  SiTensorflow,
} from "react-icons/si";
import {
  FaAws,
  FaBrain,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaDatabase,
  FaNetworkWired,
  FaRobot,
  FaTable,
  FaTerminal,
} from "react-icons/fa";

const skills = [
  { name: "Python", icon: <SiPython color="#3776ab" /> },
  { name: "SQL", icon: <FaDatabase color="#4db6e8" /> },
  { name: "Pandas", icon: <SiPandas color="#c2a4ff" /> },
  { name: "NumPy", icon: <SiNumpy color="#70b7d8" /> },
  { name: "Excel", icon: <FaTable color="#31b77a" /> },
  { name: "MySQL", icon: <SiMysql color="#4479a1" /> },
  { name: "Scikit-learn", icon: <SiScikitlearn color="#f7931e" /> },
  { name: "XGBoost", icon: <FaChartLine color="#f2a65a" /> },
  { name: "TensorFlow", icon: <SiTensorflow color="#ff8a3d" /> },
  { name: "Machine Learning", icon: <FaBrain color="#c2a4ff" /> },
  { name: "Deep Learning", icon: <FaBrain color="#ff69b4" /> },
  { name: "Predictive Analytics", icon: <FaChartLine color="#42d7d0" /> },
  { name: "Generative AI", icon: <FaBrain color="#ff69b4" /> },
  { name: "LLMs", icon: <FaTerminal color="#c2a4ff" /> },
  { name: "AI Agents", icon: <FaRobot color="#20b2aa" /> },
  { name: "Prompt Engineering", icon: <FaTerminal color="#f6c453" /> },
  { name: "RAG", icon: <FaDatabase color="#4db33d" /> },
  { name: "LangChain", icon: <FaNetworkWired color="#42d7d0" /> },
  { name: "AWS", icon: <FaAws color="#ff9900" /> },
  { name: "AWS Bedrock", icon: <FaAws color="#ffb347" /> },
  { name: "Palantir", icon: <SiPalantir color="#ffffff" /> },
  { name: "Docker", icon: <SiDocker color="#2496ed" /> },
  { name: "Git", icon: <SiGit color="#f05032" /> },
  { name: "Matplotlib", icon: <FaChartPie color="#70b7d8" /> },
  { name: "Streamlit", icon: <SiStreamlit color="#ff4b4b" /> },
  { name: "Data Visualization", icon: <FaChartBar color="#c2a4ff" /> },
];

const skillGroups = [
  {
    label: "Programming & Data",
    skills: skills.slice(0, 6),
  },
  {
    label: "Machine Learning",
    skills: skills.slice(6, 12),
  },
  {
    label: "Generative AI",
    skills: skills.slice(12, 18),
  },
  {
    label: "Cloud & Platforms",
    skills: skills.slice(18, 23),
  },
  {
    label: "Visualization & Development",
    skills: skills.slice(23),
  },
];

const SkillsMarquee = () => {
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const grid = document.querySelector(".skills-grid");
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        gsap.fromTo(
          skillRefs.current,
          { opacity: 0, y: 28, scale: 0.86 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.045,
            ease: "power3.out",
            overwrite: true,
          },
        );
        observer.unobserve(grid);
      },
      { threshold: 0.12 },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const handleSkillEnter = (item: HTMLDivElement) => {
    gsap.to(item, {
      scale: 1.08,
      boxShadow: "0 0 24px rgba(194, 164, 255, 0.42)",
      duration: 0.25,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(item.querySelector(".skill-grid-icon-wrapper"), {
      filter: "brightness(1.3)",
      scale: 1.12,
      duration: 0.25,
      overwrite: true,
    });
  };

  const handleSkillLeave = (item: HTMLDivElement) => {
    gsap.to(item, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(item.querySelector(".skill-grid-icon-wrapper"), {
      filter: "brightness(1)",
      scale: 1,
      duration: 0.3,
      overwrite: true,
    });
  };

  return (
    <div className="skills-grid-section section-container" id="skills">
      <div className="skills-grid-container">
        <h2 className="skills-grid-heading">Tech Stack</h2>
        <h3 className="skills-grid-subtitle">
          Hover over a skill for its name
        </h3>
        <div className="skills-groups">
          {skillGroups.map((group) => (
            <section className="skills-group" key={group.label}>
              <div className="skills-group-heading">
                <span>{group.label}</span>
                <i />
              </div>
              <div className="skills-grid">
                {group.skills.map((skill) => {
                  const index = skills.indexOf(skill);
                  return (
                    <div
                      key={skill.name}
                      ref={(item) => {
                        skillRefs.current[index] = item;
                      }}
                      className="skill-grid-item"
                      onMouseEnter={(event) =>
                        handleSkillEnter(event.currentTarget)
                      }
                      onMouseLeave={(event) =>
                        handleSkillLeave(event.currentTarget)
                      }
                    >
                      <div className="skill-grid-icon-wrapper">
                        {skill.icon}
                      </div>
                      <p className="skill-grid-name">{skill.name}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;

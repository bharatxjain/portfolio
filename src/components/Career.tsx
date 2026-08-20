import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  useEffect(() => {
    const timelineEl = document.querySelector(".career-timeline");
    const infoEl = document.querySelector(".career-info");
    if (!timelineEl || !infoEl) return;

    gsap.set(timelineEl, { opacity: 1 });

    const anim = gsap.fromTo(
      timelineEl,
      { height: "0%", maxHeight: "0%" },
      {
        height: "100%",
        maxHeight: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: infoEl,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box career-left-align">
            <div className="career-card">
              <div className="career-corner"></div>
              <div className="career-card-header">
                <h4>AI/ML Engineer Intern</h4>
                <h5>Quest Global</h5>
                <span className="career-card-dates">2026 - Present</span>
              </div>
              <div className="career-card-body">
                <h4>Work</h4>
                <p>
                  Applied machine learning and statistical modeling techniques to
                  develop AI-driven analytical solutions using Palantir, converting
                  enterprise-scale datasets into actionable business insights.
                  Managed end-to-end delivery of AI agent workflows for intelligent
                  automation and operational analytics.
                </p>
                <h5>Skillset & tools</h5>
                <div className="career-tags-container">
                  <span className="career-tag">Palantir</span>
                  <span className="career-tag">AI Agents</span>
                  <span className="career-tag">Machine Learning</span>
                  <span className="career-tag">Statistical Modeling</span>
                </div>
                <div className="career-btn-container">
                  <a href="javascript:void(0)" download className="career-btn">
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
            <div className="career-3d-container">
              <div className="career-3d-card">
                <div className="cube">
                  <div className="face front"></div>
                  <div className="face back"></div>
                  <div className="face right"></div>
                  <div className="face left"></div>
                  <div className="face top"></div>
                  <div className="face bottom"></div>
                  <div className="core-glow"></div>
                </div>
                <img src={`${import.meta.env.BASE_URL}images/face.png`} className="career-face-glow" alt="" />
              </div>
            </div>
          </div>
          <div className="career-info-box career-right-align">
            <div className="career-3d-container">
              <div className="career-3d-card">
                <div className="ring-system">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                  <div className="core-glow"></div>
                </div>
                <img src={`${import.meta.env.BASE_URL}images/face.png`} className="career-face-glow" alt="" />
              </div>
            </div>
            <div className="career-card">
              <div className="career-corner"></div>
              <div className="career-card-header">
                <h4>Summer Data Analyst Intern</h4>
                <h5>Makeofwelding</h5>
                <span className="career-card-dates">May 2025 - July 2025</span>
              </div>
              <div className="career-card-body">
                <h4>Work</h4>
                <p>
                  Applied statistical analysis and data modeling techniques (SQL,
                  Excel) to identify business performance trends. Designed KPI
                  dashboards for data visualization and analytical reporting,
                  supporting data-driven decision-making.
                </p>
                <h5>Skillset & tools</h5>
                <div className="career-tags-container">
                  <span className="career-tag">SQL</span>
                  <span className="career-tag">Excel</span>
                  <span className="career-tag">Data Modeling</span>
                  <span className="career-tag">KPI Dashboards</span>
                  <span className="career-tag">Statistical Analysis</span>
                </div>
                <div className="career-btn-container">
                  <a href="javascript:void(0)" download className="career-btn">
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

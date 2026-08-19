import "./styles/Career.css";

const Career = () => {
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
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/ML Engineer Intern</h4>
                <h5>Quest Global</h5>
              </div>
              <h3>2026 - Present</h3>
            </div>
            <p>
              Applied machine learning and statistical modeling techniques to
              develop AI-driven analytical solutions using Palantir, converting
              enterprise-scale datasets into actionable business insights.
              Managed end-to-end delivery of AI agent workflows for intelligent
              automation and operational analytics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Summer Data Analyst Intern</h4>
                <h5>Makeofwelding</h5>
              </div>
              <h3>May 2025 - July 2025</h3>
            </div>
            <p>
              Applied statistical analysis and data modeling techniques (SQL,
              Excel) to identify business performance trends. Designed KPI
              dashboards for data visualization and analytical reporting,
              supporting data-driven decision-making.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

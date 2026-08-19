import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          AI/ML Engineer with a strong foundation in mathematics and statistics
          (MSc, NIT Warangal) and hands-on experience building machine learning
          and Generative AI solutions, including enterprise-scale AI-driven
          analytics. Skilled in Python-based ML development, from data
          preprocessing through model evaluation, with growing exposure to RAG
          workflows and backend integration of AI capabilities into
          applications.
        </p>
      </div>
      <div className="education">
        <h3 className="title">Education</h3>
        <div className="edu-list">
          <div className="edu-item">
            <div className="edu-left">
              <div className="edu-institution">
                National Institute of Technology, Warangal
              </div>
              <div className="edu-degree">
                MSc Mathematics and Scientific Computing
              </div>
              <div className="edu-meta">CGPA: 7.85</div>
            </div>
            <div className="edu-date">2024 - 2026</div>
          </div>

          <div className="edu-item">
            <div className="edu-left">
              <div className="edu-institution">
                Choudhary Devi Lal University, Sirsa
              </div>
              <div className="edu-degree">
                BSc Non-Medical (Mathematics, Physics, Chemistry)
              </div>
              <div className="edu-meta">CGPA: 8.0</div>
            </div>
            <div className="edu-date">2020 - 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

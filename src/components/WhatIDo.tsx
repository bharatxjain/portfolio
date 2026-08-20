import { useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  const handleCardClick = (index: number) => {
    const clickedCard = containerRef.current[index];
    if (!clickedCard) return;

    const isActive = clickedCard.classList.contains("what-content-active");

    containerRef.current.forEach((card) => {
      if (card) {
        card.classList.remove("what-content-active");
        card.classList.remove("what-sibling");
      }
    });

    if (!isActive) {
      clickedCard.classList.add("what-content-active");
      containerRef.current.forEach((card) => {
        if (card && card !== clickedCard) {
          card.classList.add("what-sibling");
        }
      });
    }
  };

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content"
            ref={(el) => setRef(el, 0)}
            onClick={() => handleCardClick(0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI/ML ENGINEERING</h3>
              <h4>Description</h4>
              <p>
                Developing intelligent solutions using predictive modeling, Generative AI, and Agentic Workflows.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">PyTorch</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">AWS Bedrock</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Git</div>
                <div className="what-tags">RAG</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content"
            ref={(el) => setRef(el, 1)}
            onClick={() => handleCardClick(1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DATA SCIENCE</h3>
              <h4>Description</h4>
              <p>
                Applying statistical modeling and data analysis to drive actionable insights and informed decision-making.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">NumPy</div>
                <div className="what-tags">Pandas</div>
                <div className="what-tags">Matplotlib</div>
                <div className="what-tags">Seaborn</div>
                <div className="what-tags">Streamlit</div>
                <div className="what-tags">SQL</div>
                <div className="what-tags">Palantir</div>
                <div className="what-tags">MySQL Workbench</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

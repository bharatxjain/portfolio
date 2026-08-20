import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const projects = [
    {
      title: "Lung Cancer Detection Model",
      category: "Machine Learning",
      tools: "Random Forest, Scikit-learn, Python",
      description:
        "Built a predictive ML model using Random Forest and Scikit-learn applying statistical modeling for automated cancer stage prediction achieving 95% accuracy; applied feature engineering, data preprocessing, and hyperparameter tuning via RandomizedSearchCV.",
      certificateLink: "javascript:void(0)",
      projectLink: "javascript:void(0)",
    },
    {
      title: "Bank Enterprise Management System",
      category: "Data Analytics",
      tools: "Python, Streamlit, MySQL",
      description:
        "Designed a banking analytics and management system using Python (Streamlit) and MySQL; automated transaction monitoring, account validation, and risk monitoring with data-driven validation and interactive dashboards.",
      certificateLink: "javascript:void(0)",
      projectLink: "javascript:void(0)",
    },
    {
      title: "RAG Document Q&A System",
      category: "Full-Stack AI",
      tools: "LangChain, FAISS, FastAPI, React, Docker, AWS EC2",
      description:
        "Built a full-stack Retrieval-Augmented Generation system using LangChain, FAISS, and FastAPI enabling multi-format document upload with grounded Q&A and cited sources. Deployed a React frontend and containerized Docker backend to production on AWS EC2 with an Nginx reverse proxy and SSL, resolving memory and disk constraints on free-tier infrastructure.",
      certificateLink: "javascript:void(0)",
      projectLink: "javascript:void(0)",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const translateRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const workFlexRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const workSection = document.querySelector(
      ".work-section"
    ) as HTMLElement | null;

    const workContainer = document.querySelector(
      ".work-container"
    ) as HTMLElement | null;

    const workFlex = document.querySelector(
      ".work-flex"
    ) as HTMLElement | null;

    if (!workSection || !workContainer || !workFlex) return;

    workFlexRef.current = workFlex;
    sectionRef.current = workSection;

    let timeline: gsap.core.Timeline | null = null;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const createTimeline = () => {
      if (timeline) {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      }

      gsap.set(workFlex, { x: 0 });

      const boxes = Array.from(
        workFlex.querySelectorAll<HTMLElement>(".work-box")
      );

      const n = boxes.length;

      if (!n) return;

      // compute translate distance based on actual boxes (ignore large pseudo-elements)
      const lastBox = boxes[boxes.length - 1] as HTMLElement | undefined;
      const workContainerRect = workContainer.getBoundingClientRect();
      let translateX = 0;
      if (lastBox) {
        const lastRect = lastBox.getBoundingClientRect();
        // distance to shift so last box right aligns with container right
        translateX = Math.max(0, lastRect.right - workContainerRect.right);
      }
      translateRef.current = translateX;

      const snapPoints =
        n > 1
          ? Array.from({ length: n }, (_, i) => i / (n - 1))
          : [0];

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: workSection,
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,

          invalidateOnRefresh: true,

          snap: {
            snapTo: (progress: number) => {
              // find nearest snap point
              let nearest = snapPoints[0];
              let minDiff = Math.abs(progress - nearest);
              for (let i = 1; i < snapPoints.length; i++) {
                const d = Math.abs(progress - snapPoints[i]);
                if (d < minDiff) {
                  minDiff = d;
                  nearest = snapPoints[i];
                }
              }
              return nearest;
            },
            duration: {
              min: 0.2,
              max: 0.5,
            },
            ease: "power2.out",
          },

          onUpdate: (self) => {
            const progress = self.progress;

            const index =
              n > 1
                ? Math.round((n - 1) * progress)
                : 0;

            setActiveIndex(
              Math.min(Math.max(index, 0), n - 1)
            );
          },
        },
      });

      timeline.to(workFlex, {
        x: -translateX,
        ease: "none",
      });

      ScrollTrigger.refresh();
    };

    createTimeline();

    /*
     * Drag support
     */
    let pointerActive = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      /*
       * Only allow dragging inside the Work section.
       */
      if (!workSection.contains(target)) return;

      if (target.closest("button") || target.closest("a")) return;

      pointerActive = true;
      startX = e.clientX;
      startScroll = window.scrollY;

      target.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerActive) return;

      const dx = e.clientX - startX;

      /*
       * Horizontal drag → vertical page scroll
       */
      const scrollAmount = -dx;

      window.scrollTo({
        top: startScroll + scrollAmount,
        behavior: "auto",
      });
    };

    const onPointerUp = (e: PointerEvent) => {
      pointerActive = false;

      const target = e.target as HTMLElement;

      try {
        target.releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignore pointer capture errors
      }
    };

    workSection.addEventListener(
      "pointerdown",
      onPointerDown
    );

    workSection.addEventListener(
      "pointermove",
      onPointerMove
    );

    workSection.addEventListener(
      "pointerup",
      onPointerUp
    );

    /*
     * Resize
     */
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        createTimeline();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", resizeHandler);

    /*
     * Cleanup
     */
    return () => {
      clearTimeout(resizeTimeout);

      timeline?.scrollTrigger?.kill();
      timeline?.kill();

      workSection.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      workSection.removeEventListener(
        "pointermove",
        onPointerMove
      );

      workSection.removeEventListener(
        "pointerup",
        onPointerUp
      );

      window.removeEventListener(
        "resize",
        resizeHandler
      );
    };
  }, []);
  const scrollToProject = (idx: number) => {
    const section = document.querySelector(
      ".work-section",
    ) as HTMLElement | null;
    const translate = translateRef.current || 0;
    const n = projects.length || 1;
    if (!section) return;
    const progress = n > 1 ? idx / (n - 1) : 0;
    const target = Math.round(section.offsetTop + progress * translate);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const handlePrev = () => {
    scrollToProject(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToProject(Math.min(activeIndex + 1, projects.length - 1));
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-controls">
          <button
            onClick={handlePrev}
            className="work-arrow prev"
            aria-label="Previous project"
          >
            ◀
          </button>
          <div className="work-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToProject(i)}
                className={`work-dot ${i === activeIndex ? "active" : ""}`}
                data-index={i}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="work-arrow next"
            aria-label="Next project"
          >
            ▶
          </button>
        </div>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-media">
                <WorkImage image={`${import.meta.env.BASE_URL}images/placeholder.webp`} alt="" />
                <div className="work-desc">
                  <p>{project.description}</p>
                </div>
              </div>

              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div className="work-buttons">
                  {project.projectLink && (
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="work-btn">
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

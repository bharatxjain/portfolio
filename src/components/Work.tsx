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
    },
    {
      title: "Bank Enterprise Management System",
      category: "Data Analytics",
      tools: "Python, Streamlit, MySQL",
      description:
        "Designed a banking analytics and management system using Python (Streamlit) and MySQL; automated transaction monitoring, account validation, and risk monitoring with data-driven validation and interactive dashboards.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const translateRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const workFlexRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let timeline: any = null;
    let st: any = null;

    function createTimeline() {
      const workFlex = document.querySelector(
        ".work-flex",
      ) as HTMLElement | null;
      const workContainer = document.querySelector(
        ".work-container",
      ) as HTMLElement | null;
      const section = document.querySelector(
        ".work-section",
      ) as HTMLElement | null;
      if (!workFlex || !workContainer || !section) return;

      workFlexRef.current = workFlex;
      sectionRef.current = section;

      const boxes = workFlex.querySelectorAll(".work-box");
      const n = boxes.length || 1;

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

      // cleanup previous timeline/scrolltriggers
      if (timeline) {
        timeline.kill();
      }
      ScrollTrigger.getAll().forEach((s) => s.kill());

      const snapPoints =
        n > 1 ? Array.from({ length: n }, (_, i) => i / (n - 1)) : [0];

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
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
            duration: 0.4,
            ease: "power2.out",
          },
          onUpdate: (self: any) => {
            const prog = self.progress || 0;
            const idx = Math.round((n - 1) * prog);
            setActiveIndex(Math.min(Math.max(idx, 0), n - 1));
          },
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
      st = timeline.scrollTrigger;
    }

    createTimeline();

    // drag support: map horizontal pointer movements to vertical scroll
    let pointerActive = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      const workFlex = workFlexRef.current;
      const section = sectionRef.current;
      if (!workFlex || !section) return;
      pointerActive = true;
      startX = e.clientX;
      startScroll = window.scrollY;
      (e.target as HTMLElement).setPointerCapture?.((e as any).pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerActive) return;
      const dx = e.clientX - startX;
      // map horizontal delta to vertical scroll delta (invert sign)
      const dy = -dx;
      window.scrollTo({ top: startScroll + dy, behavior: "auto" });
    };

    const onPointerUp = (e: PointerEvent) => {
      pointerActive = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.((e as any).pointerId);
      } catch {}
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    const resizeHandler = () => {
      createTimeline();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      if (timeline) timeline.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", resizeHandler);
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
                <WorkImage image="/images/placeholder.webp" alt="" />
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

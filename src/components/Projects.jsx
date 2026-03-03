import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/resume";
import ArchitectureDiagram from "./ArchitectureDiagram";

gsap.registerPlugin(ScrollTrigger);

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M3 13L13 3M13 3H6M13 3v7" />
    </svg>
  );
}

function DiagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: "6px" }}
    >
      <rect x="8" y="2" width="8" height="8" rx="1" />
      <path d="M12 10v4" />
      <rect x="3" y="14" width="8" height="8" rx="1" />
      <rect x="13" y="14" width="8" height="8" rx="1" />
      <path d="M7 14v-2h10v2" />
    </svg>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const [activeDiagram, setActiveDiagram] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".project-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleDiagram = (projectId) => {
    setActiveDiagram(activeDiagram === projectId ? null : projectId);
  };

  return (
    <section
      className="section projects-section"
      id="projects"
      ref={containerRef}
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="s-label">
            <span className="s-num">03</span> Projects
          </p>
          <h2 className="s-title">Featured Work</h2>
        </motion.div>

        <div className="project-list">
          {projects.map((p, i) => {
            const hasDiagram = p.name === "Hermes" || p.name === "NodeBase";
            const isDiagramOpen = activeDiagram === p.id;

            return (
              <div key={p.id} className="project-row glass-panel">
                <div className="project-row-inner">
                  {/* Index */}
                  <span className="project-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Main content */}
                  <div className="project-main">
                    <h3 className="project-name">{p.name}</h3>
                    <p className="project-subtitle">{p.subtitle}</p>
                    <p className="project-desc">{p.description}</p>

                    <ul className="project-highlights">
                      {p.highlights.map((h, j) => (
                        <li key={j} className="project-highlight">
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="project-tech">
                      {p.tech.map((t) => (
                        <span key={t} className="tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>

                    {hasDiagram && (
                      <button
                        className={`diagram-toggle-btn ${isDiagramOpen ? "active" : ""}`}
                        onClick={() => toggleDiagram(p.id)}
                      >
                        <DiagramIcon />
                        {isDiagramOpen
                          ? "Hide Architecture"
                          : "View Architecture Diagram"}
                      </button>
                    )}
                  </div>

                  {/* Right: year + links */}
                  <div className="project-right">
                    <span className="project-year">{p.year}</span>
                    <div className="project-links">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GH <ArrowUpRight />
                      </a>
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link project-link-live"
                        >
                          Live <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Diagram Expansion Area */}
                <AnimatePresence>
                  {isDiagramOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="diagram-expansion-wrapper"
                    >
                      <ArchitectureDiagram project={p.name} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

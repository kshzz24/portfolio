import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/resume";
import { BriefcaseBusiness, Building } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Experience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".exp-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.95, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
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

  return (
    <section
      className="section experience-section"
      id="experience"
      ref={containerRef}
    >
      <div className="section-inner">
        <motion.div {...reveal(0)}>
          <p className="s-label">
            <span className="s-num">02</span> Experience
          </p>
          <h2 className="s-title">Where I&apos;ve Built</h2>
        </motion.div>

        <div className="exp-list">
          {experience.map((job, idx) => (
            <div key={job.id} className="exp-item glass-panel  !p-2">
              <div className="exp-meta">
                <div className="exp-meta-header">
                  <Building size={16} className="exp-icon" />
                  <span className="exp-company">{job.company}</span>
                </div>
                <div className="exp-meta-role">
                  <BriefcaseBusiness size={16} className="exp-icon" />
                  <span className="exp-role">{job.role}</span>
                </div>
                <span className="exp-period">{job.period}</span>
                <span className="exp-badge">{job.type}</span>
              </div>

              <ul className="exp-bullets">
                {job.highlights.map((item, i) => (
                  <li key={i} className="exp-bullet">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { education } from "../data/resume";
import GitHubActivity from "./GitHubActivity";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
});

const facts = [
  { value: "2+", label: "Years Frontend" },
  { value: "1.5+", label: "Years Backend" },
  { value: "10K+", label: "Daily Events" },
  { value: "5+", label: "Projects Shipped" },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-inner">
        <motion.div {...reveal(0)}>
          <p className="s-label">
            <span className="s-num">01</span> About
          </p>
          <h2 className="s-title">The Story</h2>
        </motion.div>

        <div className="about-grid">
          <div className="about-left">
            <motion.p className="about-intro" {...reveal(0.1)}>
              I&apos;m a software engineer with{" "}
              <strong>2+ years of frontend</strong> and{" "}
              <strong>1.5+ years of backend</strong> experience, currently
              building AI-powered security systems at SecLogic Technologies in
              Noida. My work sits at the intersection of machine learning,
              distributed systems, and product-grade user interfaces.
            </motion.p>
            <motion.p className="about-intro" {...reveal(0.18)}>
              I specialize in systems that are both technically sophisticated
              and genuinely useful — from{" "}
              <strong>multi-agent AI orchestration pipelines</strong> that
              process 10,000+ daily security events, to drag-and-drop React
              dashboards that make complex data immediately accessible.
            </motion.p>
            <motion.blockquote className="about-quote" {...reveal(0.26)}>
              &ldquo;I build at the intersection of AI and infrastructure —
              where the hardest problems live and the most interesting solutions
              emerge.&rdquo;
            </motion.blockquote>
          </div>

          <div className="about-right">
            <motion.div className="about-edu-block" {...reveal(0.12)}>
              <p className="about-edu-tag">Education</p>
              <p className="about-edu-degree">{education.degree}</p>
              <p className="about-edu-inst">{education.institution}</p>
              <p className="about-edu-period">
                {education.period} · {education.location}
              </p>
            </motion.div>

            <motion.div className="about-facts" {...reveal(0.22)}>
              {facts.map((f, i) => (
                <div key={i} className="about-fact">
                  <div className="about-fact-val">{f.value}</div>
                  <div className="about-fact-label">{f.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div {...reveal(0.3)}>
          <GitHubActivity username="kshzz24" />
        </motion.div>
      </div>
    </section>
  );
}

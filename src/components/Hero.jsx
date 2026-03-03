import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useScramble(finalText, { delay = 0, duration = 900 } = {}) {
  const [display, setDisplay] = useState(finalText);
  const timerRef = useRef(null);

  useEffect(() => {
    let start = null;
    let raf;

    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolvedCount = Math.floor(progress * finalText.length);

      const chars = finalText.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < resolvedCount) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(chars.join(""));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(finalText);
      }
    };

    timerRef.current = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(raf);
    };
  }, [finalText, delay, duration]);

  return display;
}

function MagneticBtn({ href, children, className }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < 90) {
      const strength = (1 - dist / 90) * 0.4;
      setPos({ x: dx * strength, y: dy * strength });
    }
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      className={`btn-mag ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition:
          pos.x === 0 && pos.y === 0
            ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
            : "transform 0.1s linear",
      }}
    >
      {children}
    </a>
  );
}

const fadeIn = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const firstName = useScramble("KSHITIZ", { delay: 300, duration: 900 });
  const lastName = useScramble("BARTARIA", { delay: 650, duration: 900 });

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  // GSAP ScrollTrigger for Parallax and fade effects
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Move text down and fade out simultaneously while scrolling
    tl.to(
      textRef.current,
      {
        y: 150,
        opacity: 0,
        ease: "none",
      },
      0,
    );

    return () => tl.kill();
  }, []);

  return (
    <section
      className="hero"
      id="home"
      ref={heroRef}
      style={{ background: "transparent" }}
    >
      {/* Top bar */}
      <motion.div
        className="hero-topbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="hero-tb-left">
          <span>INIT_SEQUENCE // 2026</span>
          <div className="hero-status">
            <span
              className="hero-status-dot"
              style={{ background: "var(--accent)" }}
            />
            <span style={{ color: "var(--accent)" }}>
              SYSTEM.STATUS: ONLINE
            </span>
          </div>
        </div>
        <span>{personal.location}</span>
      </motion.div>

      {/* Main content - Wrapper ref for scroll trigger parallax */}
      <div className="hero-content" ref={textRef}>
        <div className="hero-content-inner">
          {/* Kinetic display title */}
          <div className="hero-display" aria-label="Kshitiz Bartaria">
            <span className="hero-display-line">
              <motion.span
                className="hero-display-inner"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.95,
                  delay: 0.15,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {firstName}
              </motion.span>
            </span>
            <span className="hero-display-line">
              <motion.span
                className="hero-display-inner hero-accent"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.95,
                  delay: 0.35,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {lastName}
                <span style={{ color: "var(--text)", opacity: 0.35 }}>_</span>
              </motion.span>
            </span>
          </div>

          {/* Tagline + CTAs */}
          <div className="hero-bottom">
            <motion.p className="hero-tagline" {...fadeIn(1.0)}>
              {personal.tagline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </motion.p>

            <motion.div className="hero-ctas" {...fadeIn(1.15)}>
              <MagneticBtn href="#projects" className="btn-primary">
                Initialize ↗
              </MagneticBtn>
              <MagneticBtn href="#contact" className="btn-outline">
                sudo contact
              </MagneticBtn>
            </motion.div>
          </div>
        </div>

        {/* Data card — moved inside hero-content to flow natively below text instead of absolute positioning */}
        <motion.div
          className="hero-data-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          aria-hidden="true"
        >
          {personal.stats.map((s, i) => (
            <div key={i} className="data-card-row">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        aria-hidden="true"
      >
        <div className="scroll-tick" />
        <span>SCROLL TO DESCEND</span>
      </motion.div>
    </section>
  );
}

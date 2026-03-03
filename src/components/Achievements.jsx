import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { achievements } from "../data/resume";

function AnimatedRating({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, value, { duration: 1.6, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
const platformIcons = {
  Codeforces: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-7.5c0-.828.672-1.5 1.5-1.5z" />
    </svg>
  ),
  LeetCode: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363C4.959 15.068 4.724 14.385 4.724 13.672s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038L.552 10.016C-.429 10.998-.945 12.353-.945 13.85s.516 2.852 1.497 3.835l4.359 4.387c.975.974 2.33 1.48 3.816 1.48s2.836-.508 3.817-1.48l2.609-2.636c.514-.516.496-1.367-.039-1.902-.535-.535-1.386-.552-1.9-.038zM22.062 10.293L12.396.6B11.417-.38 10.063-.889 8.567-.889c-1.493 0-2.846.505-3.824 1.481l-1.096 1.1 2.321 2.342c.517.514 1.369.497 1.906-.037.536-.535.553-1.386.037-1.9l.233-.235c.466-.466 1.111-.662 1.823-.662s1.357.195 1.824.662l1.64 1.662c.465.467.7 1.149.7 1.862s-.235 1.357-.701 1.824l-3.376 3.42 2.609 2.636a5.055 5.055 0 0 0 2.445 1.337l1.096-1.1c.983-.984 1.5-2.339 1.5-3.837s-.517-2.854-1.5-3.838z" />
    </svg>
  ),
  CodeChef: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12.016 0A12 12 0 1 0 24 12c0-6.627-5.373-12-11.984-12zM3.86 17.536l.995-2.864c.23-.664.733-1.127 1.47-1.127h2.09c.84 0 1.259.467 1.155 1.218l-.512 3.664H4.757zM20.14 17.536h-4.301l.512-3.664c.105-.751.524-1.218 1.363-1.218h2.09c.737 0 1.24.463 1.47 1.127z" />
    </svg>
  ),
};

export default function Achievements() {
  return (
    <section className="section achievements-section" id="achievements">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="s-label">
            <span className="s-num">05</span> Achievements
          </p>
          <h2 className="s-title">Competitive Edge</h2>
        </motion.div>

        <div className="achievements-grid">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.platform}
              className="ach-card"
              style={{ "--card-accent": ach.accent }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="ach-platform">{ach.platform}</p>

              <div className="ach-rating">
                <AnimatedRating value={ach.rating} />
              </div>

              <p className="ach-badge" style={{ color: ach.accent }}>
                {ach.badge}
              </p>
              <p className="ach-detail">{ach.detail}</p>
              {ach.extra && <p className="ach-extra">{ach.extra}</p>}

              <a
                href={ach.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ach-handle"
              >
                {platformIcons[ach.platform] || (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                )}
                {ach.handle}
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.65rem",
                    opacity: 0.4,
                  }}
                >
                  ↗
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

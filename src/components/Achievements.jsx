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
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.257.213c.612.51 1.532.467 2.089-.09.558-.556.514-1.483-.09-2.039a5.413 5.413 0 0 0-.793-.611 5.657 5.657 0 0 0-1.56-.685zM7.473 16.49l8.953-.002a1.38 1.38 0 0 1 1.382 1.379 1.382 1.382 0 0 1-1.382 1.382H7.473a1.382 1.382 0 0 1 0-2.759z" />
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

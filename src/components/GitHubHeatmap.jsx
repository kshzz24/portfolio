import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";

const customTheme = {
  dark: ["#1e1f22", "#1a3a52", "#1e5a8a", "#2d7fc4", "#56a8f5"],
};

export default function GitHubHeatmap() {
  return (
    <motion.div
      className="heatmap-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="heatmap-header">
        <span className="heatmap-indicator" />
        <span className="heatmap-label">commit_history</span>
        <span className="heatmap-sublabel">// github contributions</span>
      </div>

      <div className="heatmap-card glass-panel">
        <GitHubCalendar
          username="kshzz24"
          theme={customTheme}
          colorScheme="dark"
          blockSize={13}
          blockMargin={4}
          fontSize={12}
          hideColorLegend={false}
          hideMonthLabels={false}
          labels={{
            totalCount: "{{count}} contributions in {{year}}",
          }}
        />
      </div>
    </motion.div>
  );
}

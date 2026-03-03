import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data/resume";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiTrpc,
  SiPrisma,
  SiDrizzle,
  SiReact,
  SiNextdotjs,
  SiD3,
  SiGooglecloud,
  SiOpenai,
  SiLangchain,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiKubernetes,
  SiDocker,
  SiVercel,
  SiCircleci,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
  SiPostman,
  SiFigma,
} from "react-icons/si";
import {
  FaAws,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaRobot,
  FaSearch,
  FaCloud,
  FaStream,
  FaBrain,
  FaCode,
  FaTerminal,
  FaFolderOpen,
} from "react-icons/fa";

/* ─── Tech icon map ─── */
const techIcons = {
  Python: { Icon: SiPython, color: "#3776AB" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "C/C++": { Icon: SiCplusplus, color: "#00599C" },
  SQL: { Icon: FaDatabase, color: "#e0883a" },
  Django: { Icon: SiDjango, color: "#44B78B" },
  DRF: { Icon: SiDjango, color: "#44B78B" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  "Express.js": { Icon: SiExpress, color: "#c8c8c8" },
  tRPC: { Icon: SiTrpc, color: "#398CCB" },
  Prisma: { Icon: SiPrisma, color: "#5a67d8" },
  DrizzleORM: { Icon: SiDrizzle, color: "#C5F74F" },
  Microservices: { Icon: FaServer, color: "#FF3300" },
  "RESTful APIs": { Icon: FaNetworkWired, color: "#e0883a" },
  WebSockets: { Icon: FaStream, color: "#00bfff" },
  SSE: { Icon: FaStream, color: "#00bfff" },
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#f0f0f0" },
  "React Flow": { Icon: SiReact, color: "#61DAFB" },
  Zustand: { Icon: FaBrain, color: "#c084fc" },
  "Server Components": { Icon: SiReact, color: "#61DAFB" },
  "SSR/SSG": { Icon: SiNextdotjs, color: "#f0f0f0" },
  "D3.js": { Icon: SiD3, color: "#F9A03C" },
  "LLM Orchestration": { Icon: FaRobot, color: "#FF3300" },
  "RAG Pipelines": { Icon: FaSearch, color: "#c084fc" },
  "Multi-Agent Systems": { Icon: FaBrain, color: "#c084fc" },
  "Vertex AI": { Icon: SiGooglecloud, color: "#4285F4" },
  "OpenAI API": { Icon: SiOpenai, color: "#f0f0f0" },
  LangChain: { Icon: SiLangchain, color: "#00a67e" },
  "Vector Search": { Icon: FaSearch, color: "#FFD60A" },
  "MCP Protocol": { Icon: FaNetworkWired, color: "#FF3300" },
  "Prompt Engineering": { Icon: FaCode, color: "#FFD60A" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  Elasticsearch: { Icon: SiElasticsearch, color: "#FEC514" },
  AWS: { Icon: FaAws, color: "#FF9900" },
  Kubernetes: { Icon: SiKubernetes, color: "#326CE5" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  "CI/CD": { Icon: SiCircleci, color: "#343434" },
  Vercel: { Icon: SiVercel, color: "#f0f0f0" },
  Inngest: { Icon: FaCloud, color: "#c084fc" },
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: "#f0f0f0" },
  GitLab: { Icon: SiGitlab, color: "#FC6D26" },
  Jira: { Icon: SiJira, color: "#0052CC" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
};

/* ─── Fun facts per skill ─── */
const facts = {
  Python: "Named after Monty Python, not the snake",
  JavaScript: "Created in just 10 days in 1995",
  TypeScript: "Reduces runtime bugs by ~15%",
  "C/C++": "Powers the Linux kernel & browsers",
  SQL: "Invented in 1974, still dominant",
  Django: "Powers Instagram & Pinterest",
  DRF: "REST APIs in < 50 lines",
  "Node.js": "Ryan Dahl built it in 2009",
  "Express.js": "Most starred Node.js framework",
  tRPC: "End-to-end typesafe, zero schema",
  Prisma: "Type-safe ORM built in TypeScript",
  DrizzleORM: "Lightweight, serverless-ready ORM",
  Microservices: "Netflix runs 700+ microservices",
  "RESTful APIs": "Powers 83% of public APIs",
  WebSockets: "Sub-100ms real-time messaging",
  SSE: "HTTP streaming, no WS overhead",
  "React.js": "17M+ weekly npm downloads",
  "Next.js": "Built by Vercel, used by TikTok",
  "React Flow": "Drag-and-drop graph editor",
  Zustand: "1KB state manager, no boilerplate",
  "Server Components": "Renders on server, ships no JS",
  "SSR/SSG": "Pages load before JS hydrates",
  "D3.js": "Used by NYT for data journalism",
  "LLM Orchestration": "Coordinates agents like a symphony",
  "RAG Pipelines": "Grounds AI with external knowledge",
  "Multi-Agent Systems": "Divide & conquer for complex tasks",
  "Vertex AI": "Google's enterprise AI platform",
  "OpenAI API": "Powers GPT-4 integrations",
  LangChain: "70K GitHub stars, rapid growth",
  "Vector Search": "Similarity search at billion scale",
  "MCP Protocol": "Model Context Protocol by Anthropic",
  "Prompt Engineering": "~$300K avg salary specialty",
  PostgreSQL: "ACID-compliant, 35+ year track record",
  MongoDB: "100M+ documents in one collection",
  Redis: "Handles 1M+ ops/sec in-memory",
  Elasticsearch: "Powers Wikipedia full-text search",
  AWS: "33% of all internet cloud infra",
  Kubernetes: "Orchestrates Google's 2B containers/week",
  Docker: "13M+ images on Docker Hub",
  "CI/CD": "Reduces deployment time by 80%",
  Vercel: "Deploys 10M+ sites globally",
  Inngest: "Background jobs with zero infra",
  Git: "Powers 96% of developer workflows",
  GitHub: "100M+ developers, 420M+ repos",
  GitLab: "DevOps lifecycle in one platform",
  Jira: "Used by 65K+ companies",
  Postman: "25M+ API tests run daily",
  Figma: "Real-time design, browser-based",
};

const categories = Object.entries(skills);

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = categories[activeTab];

  return (
    <section className="section skills-section" id="skills">
      <div
        className="section-inner"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "2rem" }}
        >
          <p className="s-label">
            <span className="s-num">04</span> Core Modules
          </p>
          <h2 className="s-title">System Capabilities</h2>
        </motion.div>

        <motion.div
          className="skills-terminal glass-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="sk-term-sidebar">
            <div className="sk-term-hdr">
              <FaFolderOpen /> <span>/lib/modules</span>
            </div>
            <ul className="sk-term-nav">
              {categories.map(([name], idx) => (
                <li
                  key={name}
                  className={activeTab === idx ? "active" : ""}
                  onClick={() => setActiveTab(idx)}
                >
                  <FaTerminal className="term-icon" />{" "}
                  {name.toLowerCase().replace(/ /g, "_").replace(/&/g, "and")}
                </li>
              ))}
            </ul>
          </div>

          <div className="sk-term-main">
            <div className="sk-main-hdr">
              <span>
                ~/portfolio/System_Capabilities/
                {activeCategory[0]
                  .toLowerCase()
                  .replace(/ /g, "_")
                  .replace(/&/g, "and")}
              </span>
            </div>
            <div className="sk-main-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory[0]}
                  className="sk-grid"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeCategory[1].map((skill) => {
                    const tech = techIcons[skill];
                    const Icon = tech ? tech.Icon : FaCode;
                    const color = tech ? tech.color : "var(--accent)";
                    return (
                      <div className="sk-card" key={skill}>
                        <div
                          className="sk-card-border"
                          style={{ borderColor: color }}
                        ></div>
                        <div className="sk-card-top">
                          <Icon className="sk-card-icon" style={{ color }} />
                          <span
                            className="sk-card-name"
                            style={{ color: "var(--text)" }}
                          >
                            {skill}
                          </span>
                        </div>
                        <div className="sk-card-meta">
                          <span className="sk-card-status"></span> running
                        </div>
                        <div className="sk-card-desc">
                          {facts[skill] || "Capability initialized."}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const personal = {
  name: "Kshitiz Bartaria",
  firstName: "Kshitiz",
  lastName: "Bartaria",
  title: "Software Engineer",
  tagline:
    "Building intelligent systems at the intersection\nof AI, security, and infrastructure.",
  email: "bartaria.kshitiz02@gmail.com",
  phone: "+91-7060088852",
  linkedin: "https://linkedin.com/in/kshitiz-bartaria",
  github: "https://github.com/kshzz24",
  leetcode: "https://leetcode.com/kshzz24",
  location: "Noida, India",
  stats: [
    { value: "2 Years", label: "Frontend" },
    { value: "2 Years", label: "Backend" },
    // { value: "10K+", label: "Daily Events" },
    { value: "5+", label: "Projects Shipped" },
  ],
};

export const experience = [
  {
    id: 1,
    company: "SecLogic Technologies",
    role: "Software Engineer",
    period: "Aug 2024 — Present",
    location: "Noida, India",
    type: "Full-time",
    highlights: [
      "Designed Multi-Agent AI Orchestration (MAG) for real-time AWS CloudTrail threat detection, coordinating 4 LLM agents with Google Vertex AI, 695+ threat rules, and MITRE ATT&CK mappings",
      "Engineered RAG pipeline grounding LLM decisions with baselines from Elasticsearch, MongoDB, and Redis, paired with Isolation Forest anomaly detection (37-dim feature vector) processing 10K+ daily events",
      "Built Kubernetes module with report processing engine and RESTful APIs, orchestrating containers across 10+ production clusters",
      "Developed AI-driven dashboard with React drag-and-drop UI and RAG-powered NLP engine, serving analytics across 10+ security modules in sub-second latency",
      "Automated Jira workflow for vulnerability triage, cutting manual effort by 70% across 50+ daily incidents",
      "Created cloud infrastructure graph using D3.js and React, mapping 500+ dependencies and boosting troubleshooting efficiency by 35%",
    ],
  },
  {
    id: 2,
    company: "SecLogic Technologies",
    role: "SDE Intern",
    period: "Apr 2024 — Jul 2024",
    location: "Noida, India",
    type: "Internship",
    highlights: [
      "Developed notification microservice (99.9% reliability) using Django REST Framework, serving 5K+ daily notifications with retry logic and dead-letter queuing",
      "Optimized frontend performance by removing 15+ legacy dependencies, implementing code splitting with manual chunking, and refactoring component state management — 30% bundle size reduction, 80% faster build times",
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Hermes",
    subtitle: "AI-Powered Autonomous Coding Agent CLI",
    tech: ["Python", "AsyncIO", "OpenAI API", "Rich TUI"],
    description:
      "Agentic AI system handling 100+ autonomous tool-use turns with streaming LLM, 256K context compaction, message pruning, and loop detection across 20-action sliding windows.",
    highlights: [
      "11 tools + 2 subagent orchestrators with dynamic discovery and MCP server integration",
      "3-layer security framework: 10+ command patterns, 6 approval policies, path-sandboxing",
      "5-trigger lifecycle hooks with stdio/SSE transport support",
    ],
    github: "https://github.com/kshzz24/hermes",
    year: "2025",
  },
  {
    id: 2,
    name: "NodeBase",
    subtitle: "Workflow Automation Platform",
    tech: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Inngest"],
    description:
      "Workflow orchestration platform with React Flow canvas, conditional branching, and parallel execution across 15+ concurrent jobs.",
    highlights: [
      "Integrated 3 AI providers — GPT-4, Claude, Gemini — with streaming output",
      "4 trigger types: Webhook, Forms, Stripe, Manual",
      "SaaS with Inngest async execution, 3-retry backoff, Polar payments, Better Auth",
    ],
    github: "https://github.com/kshzz24/workflow-automation",
    live: "https://workflow-automation-nine.vercel.app/login",
    year: "Dec 2024",
  },
  {
    id: 3,
    name: "MyTube",
    subtitle: "Full-Stack Video Streaming Platform",
    tech: ["Next.js", "TypeScript", "tRPC", "Mux", "PostgreSQL", "DrizzleORM"],
    description:
      "Video platform with Mux adaptive bitrate, real-time transcoding, and creator analytics supporting 10K+ concurrent viewers.",
    highlights: [
      "Threaded comments, reactions, and infinite scroll serving 5K+ daily interactions",
      "50% faster retrieval via CTE-based queries with DrizzleORM",
    ],
    github: "https://github.com/kshzz24/my-tube",
    live: "https://my-tube-pearl.vercel.app/",
    year: "Nov 2024",
  },
];

export const skills = {
  Languages: ["Python", "JavaScript", "TypeScript", "C/C++", "SQL"],
  Backend: [
    "Django",
    "DRF",
    "Node.js",
    "Express.js",
    "tRPC",
    "Prisma",
    "DrizzleORM",
    "Microservices",
    "RESTful APIs",
    "WebSockets",
    "SSE",
  ],
  Frontend: [
    "React.js",
    "Next.js",
    "React Flow",
    "Zustand",
    "Server Components",
    "SSR/SSG",
    "D3.js",
  ],
  "GenAI & ML": [
    "LLM Orchestration",
    "RAG Pipelines",
    "Multi-Agent Systems",
    "Vertex AI",
    "OpenAI API",
    "LangChain",
    "Vector Search",
    "MCP Protocol",
    "Prompt Engineering",
  ],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
  "Cloud & DevOps": [
    "AWS",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "Vercel",
    "Inngest",
  ],
  Tools: ["Git", "GitHub", "GitLab", "Jira", "Postman", "Figma"],
};

export const achievements = [
  {
    platform: "Codeforces",
    badge: "Specialist",
    rating: 1429,
    detail: "Top 10% globally",
    handle: "_kshitiz91_",
    url: "https://codeforces.com/profile/_kshitiz91_",
    accent: "#3b82f6",
  },
  {
    platform: "LeetCode",
    badge: "Knight",
    rating: 2018,
    detail: "Top 2.5% worldwide",
    extra: "489 / 21,482 — international contest",
    handle: "kshzz24",
    url: "https://leetcode.com/kshzz24",
    accent: "#f59e0b",
  },
  {
    platform: "CodeChef",
    badge: "3-Star",
    rating: 1665,
    detail: "Peak rating",
    handle: "nullifier",
    url: "https://codechef.com/users/nullifier",
    accent: "#a78bfa",
  },
];

export const education = {
  institution: "JSS Academy of Technical Education, AKTU",
  degree: "B.Tech — Computer Science & Engineering",
  period: "2020 — 2024",
  location: "Delhi-NCR, India",
};

import { ReactFlow, Controls, Background, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const theme = {
  bg: "#1E1F22",
  nodeBg: "#2B2D30",
  border: "#393B40",
  text: "#BCBEC4",
  accent: "#56A8F5",
  green: "#6AAB73",
  purple: "#CF8E6D",
  yellow: "#F0A732",
};

const makeStyle = (accentColor) => ({
  background: theme.nodeBg,
  color: theme.text,
  border: `1px solid ${accentColor || theme.border}`,
  borderRadius: "6px",
  padding: "12px 18px",
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: "11px",
  boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
  textAlign: "center",
  lineHeight: "1.5",
  whiteSpace: "pre-line",
});

const defaultEdgeOptions = {
  style: { stroke: theme.accent, strokeWidth: 1.5, opacity: 0.6 },
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed, color: theme.accent },
};

/* ── Hermes Architecture ──────────────────────────────── */
const hermesNodes = [
  {
    id: "cli",
    position: { x: 300, y: 0 },
    data: { label: "Rich TUI CLI\n(User Input)" },
    style: makeStyle(theme.accent),
  },
  {
    id: "orchestrator",
    position: { x: 300, y: 110 },
    data: { label: "Agent Core\n(AsyncIO Event Loop)" },
    style: makeStyle(theme.yellow),
  },
  {
    id: "context",
    position: { x: 300, y: 230 },
    data: { label: "Context Manager\n256K Compaction + Pruning" },
    style: makeStyle(theme.border),
  },
  {
    id: "llm",
    position: { x: 60, y: 230 },
    data: { label: "OpenAI Streaming\n(GPT-4 / Claude)" },
    style: makeStyle(theme.green),
  },
  {
    id: "tools",
    position: { x: 540, y: 230 },
    data: { label: "11 Tools\n+ 2 Subagent Orchestrators" },
    style: makeStyle(theme.purple),
  },
  {
    id: "sec",
    position: { x: 60, y: 360 },
    data: { label: "Security Framework\n10 Patterns · 6 Policies" },
    style: makeStyle("#ef4444"),
  },
  {
    id: "mcp",
    position: { x: 540, y: 360 },
    data: { label: "MCP Server\n(stdio / SSE Transport)" },
    style: makeStyle(theme.purple),
  },
  {
    id: "hooks",
    position: { x: 300, y: 360 },
    data: { label: "Lifecycle Hooks\n(5 Event Triggers)" },
    style: makeStyle(theme.border),
  },
];

const hermesEdges = [
  { id: "e1", source: "cli", target: "orchestrator", animated: true },
  { id: "e2", source: "orchestrator", target: "llm" },
  { id: "e3", source: "orchestrator", target: "context" },
  { id: "e4", source: "orchestrator", target: "tools" },
  { id: "e5", source: "llm", target: "sec" },
  { id: "e6", source: "tools", target: "mcp" },
  { id: "e7", source: "context", target: "hooks" },
];

/* ── NodeBase Architecture ────────────────────────────── */
const nodeBaseNodes = [
  {
    id: "ui",
    position: { x: 300, y: 0 },
    data: { label: "React Flow Canvas\n(Drag & Drop Builder)" },
    style: makeStyle(theme.accent),
  },
  {
    id: "nextjs",
    position: { x: 300, y: 110 },
    data: { label: "Next.js App Router\n(SSR + API Routes)" },
    style: makeStyle(theme.yellow),
  },
  {
    id: "trpc",
    position: { x: 60, y: 230 },
    data: { label: "tRPC Layer\n(End-to-End Types)" },
    style: makeStyle(theme.purple),
  },
  {
    id: "inngest",
    position: { x: 300, y: 230 },
    data: { label: "Inngest Engine\n(Async + 3-Retry Backoff)" },
    style: makeStyle(theme.border),
  },
  {
    id: "ai",
    position: { x: 540, y: 230 },
    data: { label: "AI Providers\nGPT-4 · Claude · Gemini" },
    style: makeStyle(theme.green),
  },
  {
    id: "prisma",
    position: { x: 60, y: 360 },
    data: { label: "Prisma ORM\n(Schema + Migrations)" },
    style: makeStyle(theme.purple),
  },
  {
    id: "postgres",
    position: { x: 60, y: 470 },
    data: { label: "PostgreSQL\n(Workflow State Store)" },
    style: makeStyle(theme.accent),
  },
  {
    id: "triggers",
    position: { x: 540, y: 360 },
    data: { label: "4 Trigger Types\nWebhook · Forms · Stripe · Manual" },
    style: makeStyle("#ef4444"),
  },
  {
    id: "auth",
    position: { x: 300, y: 360 },
    data: { label: "Better Auth\n+ Polar Payments" },
    style: makeStyle(theme.border),
  },
];

const nodeBaseEdges = [
  { id: "e1", source: "ui", target: "nextjs", animated: true },
  { id: "e2", source: "nextjs", target: "trpc" },
  { id: "e3", source: "nextjs", target: "inngest" },
  { id: "e4", source: "nextjs", target: "ai" },
  { id: "e5", source: "trpc", target: "prisma" },
  { id: "e6", source: "prisma", target: "postgres" },
  { id: "e7", source: "ai", target: "triggers" },
  { id: "e8", source: "inngest", target: "auth" },
];

export default function ArchitectureDiagram({ project }) {
  const nodes = project === "Hermes" ? hermesNodes : nodeBaseNodes;
  const edges = project === "Hermes" ? hermesEdges : nodeBaseEdges;

  return (
    <div className="arch-diagram-container">
      <div className="arch-diagram-header">
        <span className="arch-diagram-file">
          {project.toLowerCase()}.architecture.flow
        </span>
        <div className="arch-legend">
          <span className="arch-legend-item">
            <span className="arch-legend-dot" style={{ background: theme.accent }} />
            Entry
          </span>
          <span className="arch-legend-item">
            <span className="arch-legend-dot" style={{ background: theme.yellow }} />
            Core
          </span>
          <span className="arch-legend-item">
            <span className="arch-legend-dot" style={{ background: theme.green }} />
            AI
          </span>
          <span className="arch-legend-item">
            <span className="arch-legend-dot" style={{ background: theme.purple }} />
            Infra
          </span>
        </div>
      </div>
      <div className="arch-flow-area">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          minZoom={0.4}
          maxZoom={1.5}
          nodesDraggable
          nodesConnectable={false}
        >
          <Background color={theme.border} gap={20} size={1} />
          <Controls showInteractive={false} className="arch-controls" />
        </ReactFlow>
      </div>
    </div>
  );
}

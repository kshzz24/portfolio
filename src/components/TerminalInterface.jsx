import { useState, useRef, useEffect } from "react";
import { personal, experience, projects, skills } from "../data/resume";

const TERMINAL_COMMANDS = {
  help: "Shows this list of available commands",
  whoami: "Displays basic information about Kshitiz",
  clear: "Clears the terminal output",
  ls: "Lists available directories (sections)",
  "cat resume": "Displays a summarized resume",
  "cat experience": "Lists work experience",
  "cat skills": "Lists technical skills",
  "cat projects": "Shows featured projects",
  exit: "Quits the terminal mode and returns to GUI",
};

export default function TerminalInterface({ onExit }) {
  const [history, setHistory] = useState([
    { type: "system", content: "SYSTEM.STATUS: ONLINE" },
    {
      type: "system",
      content: `Welcome to HermesOS v2.0. Type 'help' to see available commands.`,
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    // Add command to history
    const newHistory = [...history, { type: "input", content: cmd }];

    if (trimmed === "") {
      setHistory(newHistory);
      return;
    }

    let response = "";

    switch (trimmed) {
      case "help":
        response = Object.entries(TERMINAL_COMMANDS)
          .map(([k, v]) => `${k.padEnd(15, " ")} - ${v}`)
          .join("\n");
        break;
      case "whoami":
        response = `${personal.name}\n${personal.title}\n${personal.tagline}\nLocation: ${personal.location}`;
        break;
      case "clear":
        setHistory([]);
        return;
      case "ls":
        response = "resume.md\nexperience.json\nskills.json\nprojects.json";
        break;
      case "cat resume":
      case "cat resume.md":
        response = `NAME: ${personal.name}\nEMAIL: ${personal.email}\nGITHUB: ${personal.github}\nLINKEDIN: ${personal.linkedin}`;
        break;
      case "cat experience":
      case "cat experience.json":
        response = JSON.stringify(
          experience.map((e) => ({
            role: e.role,
            company: e.company,
            period: e.period,
          })),
          null,
          2,
        );
        break;
      case "cat skills":
      case "cat skills.json":
        response = JSON.stringify(skills, null, 2);
        break;
      case "cat projects":
      case "cat projects.json":
        response = JSON.stringify(
          projects.map((p) => ({ name: p.name, tech: p.tech })),
          null,
          2,
        );
        break;
      case "exit":
        onExit();
        return;
      default:
        response = `bash: ${cmd}: command not found`;
    }

    setHistory([...newHistory, { type: "output", content: response }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "c" && e.ctrlKey) {
      setHistory([...history, { type: "input", content: input + "^C" }]);
      setInput("");
    }
  };

  return (
    <div className="terminal-overlay">
      <div className="terminal-window">
        {/* macOS Style Header */}
        <div className="terminal-header">
          <div className="term-window-controls">
            <span className="twc twc-close" onClick={onExit}></span>
            <span className="twc twc-min"></span>
            <span className="twc twc-max"></span>
          </div>
          <div className="term-title">kshitiz@hermes: ~</div>
        </div>

        {/* Terminal Body */}
        <div
          className="terminal-body"
          onClick={() => document.getElementById("terminal-input").focus()}
        >
          {history.map((line, i) => (
            <div key={i} className={`term-line term-${line.type}`}>
              {line.type === "input" && (
                <span className="term-prompt">kshitiz@hermes:~$ </span>
              )}
              {line.content}
            </div>
          ))}

          <div className="term-input-row">
            <span className="term-prompt">kshitiz@hermes:~$ </span>
            <input
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

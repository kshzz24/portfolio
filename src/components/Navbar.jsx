import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
];

export default function Navbar({ toggleTerminal, toggleGame }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 40);
      setProgress(docH > 0 ? scrollTop / docH : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo" onClick={(e) => handleNav(e, "#home")}>
          KB<span className="dot">.</span>
        </a>

        <div className="nav-links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              onClick={(e) => handleNav(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <button
            className="nav-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
            onClick={toggleTerminal}
          >
            <span style={{ color: "var(--accent)" }}>&gt;_</span> Terminal
          </button>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNav(e, "#contact")}
          >
            Contact
          </a>
        </div>

        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Scroll progress bar */}
      <div
        className="nav-progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="nav-link"
            onClick={(e) => handleNav(e, l.href)}
          >
            {l.label}
          </a>
        ))}
        <button
          className="nav-link"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            textAlign: "left",
          }}
          onClick={() => {
            setMenuOpen(false);
            toggleTerminal();
          }}
        >
          <span style={{ color: "var(--accent)" }}>&gt;_</span> Terminal
        </button>
        <button
          className="nav-link"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            textAlign: "left",
          }}
          onClick={() => {
            setMenuOpen(false);
            toggleGame();
          }}
        >
          <span style={{ color: "#e06c75" }}>&#9679;</span> Battle
        </button>
        <a
          href="#contact"
          className="nav-cta"
          style={{ width: "fit-content" }}
          onClick={(e) => handleNav(e, "#contact")}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

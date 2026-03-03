import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "./App.css";

import Scene3D from "./components/Scene3D";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import GitHubHeatmap from "./components/GitHubHeatmap";
import TerminalInterface from "./components/TerminalInterface";

export default function App() {
  const lenisRef = useRef(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false); // Global toggle state

  useEffect(() => {
    // Prevent browser from restoring scroll position mid-page on reload
    if (history.scrollRestoration) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Pause Lenis smooth scrolling when the terminal overlay is active
  useEffect(() => {
    if (isTerminalOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isTerminalOpen]);

  return (
    <>
      <div className="page-bg" aria-hidden="true" />

      {/* 3D WebGL Background Layer (Hidden when terminal is open for performance) */}
      {!isTerminalOpen && <Scene3D />}

      <CustomCursor />

      {!isTerminalOpen && (
        <Navbar toggleTerminal={() => setIsTerminalOpen(true)} />
      )}

      {!isTerminalOpen ? (
        <main>
          <Hero />
          <GitHubHeatmap />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </main>
      ) : (
        <TerminalInterface onExit={() => setIsTerminalOpen(false)} />
      )}
    </>
  );
}

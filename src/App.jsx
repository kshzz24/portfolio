import { useEffect, useRef, useState, lazy, Suspense } from "react";
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

const PokemonGame = lazy(() => import("./components/PokemonGame"));

export default function App() {
  const lenisRef = useRef(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  useEffect(() => {
    if (history.scrollRestoration) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

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

  useEffect(() => {
    if (isTerminalOpen || isGameOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isTerminalOpen, isGameOpen]);

  const openGame = () => setIsGameOpen(true);

  return (
    <>
      <div className="page-bg" aria-hidden="true" />

      {!isTerminalOpen && !isGameOpen && <Scene3D />}

      <CustomCursor />

      {!isTerminalOpen && (
        <Navbar
          toggleTerminal={() => setIsTerminalOpen(true)}
          toggleGame={openGame}
        />
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
        <TerminalInterface
          onExit={() => setIsTerminalOpen(false)}
          onGame={() => {
            setIsTerminalOpen(false);
            setIsGameOpen(true);
          }}
        />
      )}

      {/* Pokemon Game overlay */}
      {isGameOpen && (
        <Suspense
          fallback={
            <div className="pokemon-overlay">
              <div className="pokemon-loading">Loading DEV BATTLE...</div>
            </div>
          }
        >
          <PokemonGame onClose={() => setIsGameOpen(false)} />
        </Suspense>
      )}

      {/* Pokeball trigger */}
      <div
        className="pokeball-trigger"
        onClick={openGame}
        title="Start DEV BATTLE!"
      />
    </>
  );
}

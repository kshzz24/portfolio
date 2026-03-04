import { Component, useRef, useLayoutEffect, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as random from "maath/random/dist/maath-random.esm";

gsap.registerPlugin(ScrollTrigger);

/* ── Sanitize Float32Array — replace NaN / Infinity with 0 ── */
function sanitize(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!Number.isFinite(arr[i])) arr[i] = 0;
  }
  return arr;
}

/* ── Error boundary — catches THREE.js crashes, shows nothing ── */
class Scene3DErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err) {
    console.warn("Scene3D: WebGL error caught, falling back to static bg.", err);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/* ── Star field (lighter than Sparkles — no custom shader) ── */
function DataNodeCloud() {
  const ref = useRef();
  const [positions] = useState(() => {
    const buf = new Float32Array(3000); // 1000 points × 3
    random.inSphere(buf, { radius: 2.5 });
    return sanitize(buf);
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/* ── Rotating icosahedron core ── */
function DataCore() {
  const wireframeRef = useRef(null);
  const coreRef = useRef(null);
  const groupRef = useRef(null);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(groupRef.current.rotation, { x: Math.PI * 2, y: Math.PI * 2, ease: "none" }, 0);
    tl.to(groupRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, ease: "power2.inOut" }, 0);

    return () => tl.kill();
  }, []);

  useFrame((_, delta) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += delta * 0.1;
      wireframeRef.current.rotation.y += delta * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.1;
      coreRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron ref={coreRef} args={[1.2, 2]}>
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
        </Icosahedron>
        <Icosahedron ref={wireframeRef} args={[1.4, 2]}>
          <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.3} />
        </Icosahedron>
      </Float>
    </group>
  );
}

/* ── Main Scene3D ── */
export default function Scene3D() {
  const [contextLost, setContextLost] = useState(false);

  const handleCreated = useCallback(({ gl }) => {
    const canvas = gl.domElement;

    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setContextLost(true);
    });
  }, []);

  // If WebGL crashed, don't render anything — let the CSS page-bg show through
  if (contextLost) return null;

  return (
    <Scene3DErrorBoundary>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -2,
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          onCreated={handleCreated}
          gl={{
            powerPreference: "default",
            antialias: false,
            stencil: false,
            depth: true,
          }}
        >
          {/* Simple lights instead of heavy Environment HDR preset */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00F0FF" />
          <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#00FF66" />
          <pointLight position={[0, 0, 3]} intensity={0.5} color="#00F0FF" />

          <DataCore />
          <DataNodeCloud />
        </Canvas>
      </div>
    </Scene3DErrorBoundary>
  );
}

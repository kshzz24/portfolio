import { useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Sphere,
  Icosahedron,
  Sparkles,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as random from "maath/random/dist/maath-random.esm";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function DataNodeCloud() {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 2.5 }),
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function DataCore() {
  const wireframeRef = useRef(null);
  const coreRef = useRef(null);
  const groupRef = useRef(null);

  // Tie rotation and scale to the scroll depth using GSAP ScrollTrigger
  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(
      groupRef.current.rotation,
      {
        x: Math.PI * 2,
        y: Math.PI * 2,
        ease: "none",
      },
      0,
    );

    tl.to(
      groupRef.current.scale,
      {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        ease: "power2.inOut",
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, []);

  useFrame((state, delta) => {
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
        {/* Inner Solid Core */}
        <Icosahedron ref={coreRef} args={[1.2, 2]}>
          <meshStandardMaterial
            color="#050505"
            metalness={0.9}
            roughness={0.2}
          />
        </Icosahedron>

        {/* Outer Wireframe (Network) */}
        <Icosahedron ref={wireframeRef} args={[1.4, 2]}>
          <meshBasicMaterial
            color="#00F0FF"
            wireframe
            transparent
            opacity={0.3}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#00F0FF" />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={2}
        color="#00FF66"
      />
      <Environment preset="night" />
      {/* Floating data packets */}
      <Sparkles
        count={200}
        scale={10}
        size={2}
        speed={0.8}
        opacity={0.5}
        color="#00F0FF"
      />
    </>
  );
}

export default function Scene3D() {
  return (
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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <SceneLights />
        <DataCore />
        <DataNodeCloud />
      </Canvas>
    </div>
  );
}

import { execSync } from "child_process";
try {
  console.log("Installing dependencies...");
  execSync(
    "npm install three @react-three/fiber @react-three/drei gsap lenis --save",
    {
      stdio: "inherit",
      cwd: "c:/Users/hp/OneDrive/Desktop/portfolio-kshzz24/portfolio",
    },
  );
  console.log("Installation complete.");
} catch (error) {
  console.error("Failed to install:", error.message);
}

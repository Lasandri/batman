import { useEffect, useMemo, useRef, useState } from "react";
import BatShape from "./BatShape";

/** Falling rain made of randomized CSS-animated streaks. */
export function Rain({ count = 70 }: { count?: number }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 0.6 + Math.random() * 0.9,
        delay: Math.random() * 3,
        height: 40 + Math.random() * 60,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count]
  );

  return (
    <div className="rain-layer">
      {drops.map((d) => (
        <span
          key={d.id}
          className="raindrop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Soft drifting fog banks. */
export function Fog() {
  return (
    <>
      <div className="fog-layer" />
      <div className="fog-layer" style={{ animationDuration: "45s", animationDirection: "alternate-reverse" }} />
    </>
  );
}

/** The projected bat-signal beam glowing on the sky/clouds. */
export function BatSignalBeam({ intense = false }: { intense?: boolean }) {
  return (
    <div
      className="bat-signal-beam"
      style={intense ? { opacity: 0.85, filter: "blur(3px)" } : undefined}
    />
  );
}

export function LightningFlash() {
  return <div className="lightning-flash absolute inset-0 bg-white/80 pointer-events-none" />;
}

export function Vignette() {
  return <div className="vignette absolute inset-0 pointer-events-none" />;
}

export function Grain() {
  return <div className="grain" />;
}

/** Ambient bats slowly flying across the whole viewport, looping forever. */
export function AmbientBats({ count = 8 }: { count?: number }) {
  const bats = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: 5 + Math.random() * 70,
        size: 18 + Math.random() * 28,
        duration: 14 + Math.random() * 18,
        delay: Math.random() * -20,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bats.map((b) => (
        <div
          key={b.id}
          className="absolute text-black/70"
          style={{
            top: `${b.top}%`,
            left: "-10%",
            width: b.size,
            height: b.size * 0.4,
            animation: `flyacross ${b.duration}s linear ${b.delay}s infinite`,
            color: "#0a0a0a",
            filter: "drop-shadow(0 0 4px rgba(245,197,24,0.15))",
          }}
        >
          <BatShape className="h-full w-full opacity-70" />
        </div>
      ))}
      <style>{`
        @keyframes flyacross {
          0% { transform: translateX(0) translateY(0) scale(0.8); }
          50% { transform: translateX(60vw) translateY(-40px) scale(1); }
          100% { transform: translateX(130vw) translateY(10px) scale(0.85); }
        }
      `}</style>
    </div>
  );
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

/** Small bats that burst out near the cursor as the user moves the mouse. */
export function MouseBats() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastSpawn = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 120) return;
      lastSpawn.current = now;
      const id = idRef.current++;
      setParticles((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 900);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {particles.map((p) => (
        <BatShape
          key={p.id}
          className="absolute text-[#F5C518]"
          style={{
            left: p.x - 12,
            top: p.y - 8,
            width: 24,
            height: 10,
            animation: "batpop 0.9s ease-out forwards",
            filter: "drop-shadow(0 0 6px rgba(245,197,24,0.8))",
          }}
        />
      ))}
      <style>{`
        @keyframes batpop {
          0% { transform: translateY(0) scale(0.4) rotate(0deg); opacity: 0.9; }
          60% { opacity: 0.9; }
          100% { transform: translateY(-60px) scale(1) rotate(15deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

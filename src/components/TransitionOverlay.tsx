import { motion } from "framer-motion";

export default function TransitionOverlay({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        window.setTimeout(onComplete, 1900);
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,197,24,0.9) 0%, rgba(245,197,24,0.25) 35%, transparent 70%)",
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: "180vmax", height: "180vmax", opacity: [0, 1, 0.7, 0] }}
        transition={{ duration: 1.8, times: [0, 0.35, 0.7, 1], ease: "easeOut" }}
      />
      <motion.img
        src="/images/batman-logo.png"
        alt="Batman signal"
        className="relative w-40 sm:w-56"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.15, 1.05, 1.3] }}
        transition={{ duration: 1.8, times: [0, 0.3, 0.7, 1] }}
        style={{ filter: "drop-shadow(0 0 60px rgba(245,197,24,0.9))" }}
      />
      <motion.p
        className="font-cinematic absolute bottom-[18%] text-2xl tracking-[0.4em] text-[#F5C518] glow-text sm:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, times: [0, 0.4, 0.75, 1] }}
      >
        ACCESS GRANTED
      </motion.p>
    </motion.div>
  );
}

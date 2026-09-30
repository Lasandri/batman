import { motion } from "framer-motion";
import { Rain, Fog, BatSignalBeam, Vignette, Grain } from "./Atmosphere";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      <img
        src="/images/gotham-skyline.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      <BatSignalBeam />
      <Fog />
      <Rain count={55} />
      <Vignette />
      <Grain />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-[#F5C518]/20 blur-3xl" />
          <img
            src="/images/batman-logo.png"
            alt="Batman Logo"
            className="animate-pulse-glow h-32 w-auto sm:h-44 md:h-52"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mb-3 font-body text-xs uppercase text-[#F5C518]/70 sm:text-sm"
        >
          Gotham City · Wayne Manor
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-cinematic glow-text text-5xl leading-none text-white sm:text-7xl md:text-8xl"
        >
          HAPPY BIRTHDAY,
          <br />
          <span className="text-[#F5C518]">CHATHURA AIYEE 😉🦇</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="glow-text-soft mt-5 font-cinematic text-xl tracking-widest text-[#F5C518] sm:text-2xl"
        >
          THE DARK KNIGHT OF OUR FAMILY
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-gray-300 sm:text-lg"
        >
          In the shadows of Gotham, a new legend rises… Today we celebrate the one who
          fights not with weapons, but with heart. Rise, Jay. The city needs you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-14 flex flex-col items-center gap-2 text-[#F5C518]/60"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll into the shadows</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="text-xl"
          >
            ▾
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

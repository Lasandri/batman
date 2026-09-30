import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import { playBatTransmission } from "../utils/sound";

const LETTER_TEXT = `Jay,


This is Batman. 🦇

The Bat Signal went up tonight. 🚨

Not because Gotham is in danger.
Not because the Joker escaped. 🃏

It’s because today is your birthday. 🎂

So, from Gotham City 🌃

Happy Birthday, Jay! 🦇🎉

I hope you have a great day.
Celebrate. Enjoy yourself. 🥳
And don’t get into too much trouble. 😏

Gotham is safe tonight. 🌙

But if anything changes...

You know where to find me. 🦇

I’ll be on the rooftops. 🌃

Stay strong. Stay sharp.
And keep being you. 🖤

🎂 Happy Birthday, Jay! 🎂

— Batman 🦇 `;

export default function LetterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { output, done } = useTypewriter(LETTER_TEXT, inView, 18);

  const [playing, setPlaying] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [flash, setFlash] = useState(false);

  const handlePlay = () => {
    if (playing) return;
    setPlaying(true);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 400);
    playBatTransmission({
      onPulse: () => {
        setPulse(true);
        window.setTimeout(() => setPulse(false), 350);
      },
      onEnd: () => setPlaying(false),
    });
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#050608] px-6 py-24 sm:py-32"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-[#F5C518] transition-opacity duration-300 ${
          flash ? "opacity-10" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="bat-signal-beam" style={{ opacity: pulse ? 0.9 : 0.25 }} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-shrink-0 flex-col items-center lg:sticky lg:top-24"
        >
          <img
            src="/images/batman-logo.png"
            alt="Batman watching over Gotham"
            className={`h-28 w-auto transition-all duration-300 sm:h-36 ${
              pulse ? "scale-110 animate-pulse-glow" : "opacity-90 logo-glow"
            }`}
          />
          <p className="mt-4 max-w-[10rem] text-center font-body text-[10px] uppercase tracking-[0.3em] text-[#F5C518]/50">
            Transmission Secured
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glow-border relative w-full rounded-sm border border-[#F5C518]/30 bg-[radial-gradient(ellipse_at_top,_#111114,_#000)] p-6 sm:p-10"
        >
          <div className="mb-6 flex items-center justify-between border-b border-[#F5C518]/20 pb-4">
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-red-500/80">
              ● Classified
            </span>
            <span className="font-cinematic text-sm tracking-[0.2em] text-[#F5C518]/60">
              Batcomputer Terminal
            </span>
          </div>

          <h2 className="font-cinematic glow-text mb-6 text-3xl text-[#F5C518] sm:text-4xl">
            FROM THE SHADOWS…
          </h2>
          <p className="mb-8 font-body text-xs uppercase tracking-[0.2em] text-gray-500">
            Operation: Birthday // Recipient: J.A.Y // Clearance: Family
          </p>

          <pre
            className={`min-h-[380px] whitespace-pre-wrap font-body text-sm leading-relaxed text-[#d8e8d0] sm:text-base ${
              !done ? "type-cursor" : ""
            }`}
            style={{ textShadow: "0 0 6px rgba(150,255,150,0.15)" }}
          >
            {output}
          </pre>

          <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#F5C518]/20 pt-8 sm:flex-row sm:justify-between">
            <p className="font-body text-xs text-gray-500">
              {done ? "End of transmission." : "Decrypting message…"}
            </p>
            <button
              onClick={handlePlay}
              disabled={playing}
              className={`btn-bat flex items-center gap-3 rounded-sm px-6 py-3 text-xs font-semibold sm:text-sm ${
                playing ? "opacity-70" : ""
              }`}
            >
              <span className={`inline-block h-2 w-2 rounded-full ${playing ? "bg-[#F5C518] animate-ping" : "bg-[#F5C518]"}`} />
              {playing ? "Transmitting…" : "Play Transmission"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

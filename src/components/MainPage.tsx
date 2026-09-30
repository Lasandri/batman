import { motion } from "framer-motion";
import Hero from "./Hero";
import LetterSection from "./LetterSection";
import FloatingLogoButton from "./FloatingLogoButton";
import Footer from "./Footer";
import { AmbientBats, MouseBats } from "./Atmosphere";

const TRAITS = [
  {
    title: "Unshakable Resolve",
    text: "Like the Dark Knight, you never back down when the family needs you most.",
  },
  {
    title: "Silent Strength",
    text: "You carry burdens quietly, protecting the people you love without asking for credit.",
  },
  {
    title: "Guardian Heart",
    text: "Behind the calm exterior is someone who would do anything for the ones he loves.",
  },
];

export default function MainPage() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      <MouseBats />
      <Hero />

      <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#07080b] to-black px-6 py-20">
        <AmbientBats count={6} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-cinematic glow-text-soft mb-14 text-center text-3xl text-[#F5C518] sm:text-4xl"
          >
            THE MARKS OF A HERO
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {TRAITS.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="glow-border rounded-sm border border-[#F5C518]/20 bg-black/60 p-7 text-center"
              >
                <div className="mx-auto mb-4 h-px w-10 bg-[#F5C518]/60" />
                <h3 className="font-cinematic mb-3 text-xl tracking-widest text-[#F5C518]">
                  {trait.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-gray-400">{trait.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LetterSection />

      <Footer />
      <FloatingLogoButton />
    </div>
  );
}

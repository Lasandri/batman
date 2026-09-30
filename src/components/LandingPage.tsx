import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Rain,
  Fog,
  BatSignalBeam,
  Vignette,
  Grain,
  LightningFlash,
} from "./Atmosphere";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

interface LandingPageProps {
  onSuccess: () => void;
}

export default function LandingPage({ onSuccess }: LandingPageProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const normalized = value.trim().toUpperCase();
    const isSuccess = normalized === "JAY";

    // Save attempt to Firebase Firestore
    try {
      await addDoc(collection(db, "access_logs"), {
        enteredName: value.trim(),
        normalizedName: normalized,
        success: isSuccess,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      console.log("Access attempt saved to Firebase");
    } catch (error) {
      console.error("Failed to save access attempt:", error);
    }

    // Existing access logic
    if (isSuccess) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setShake(true);

      window.setTimeout(() => {
        setShake(false);
      }, 550);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <img
        src="/images/gotham-skyline.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

      <BatSignalBeam />
      <Fog />
      <Rain count={90} />
      <LightningFlash />
      <Vignette />
      <Grain />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.4 }}
          className="mb-4 text-xs uppercase text-[#F5C518]/70 font-body tracking-[0.35em]"
        >
          Wayne Manor Security Terminal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-cinematic glow-text animate-flicker text-4xl text-[#F5C518] sm:text-6xl md:text-7xl"
        >
          ONLY THE TRUE ALLY
          <br /> MAY ENTER
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          onSubmit={handleSubmit}
          className={`mt-10 flex w-full max-w-md flex-col items-center gap-4 sm:flex-row ${
            shake ? "animate-shake" : ""
          }`}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter the name…"
            autoFocus
            className={`w-full flex-1 rounded-sm border bg-black/70 px-5 py-4 font-body text-lg text-[#F5C518] outline-none placeholder:text-[#F5C518]/30 ${
              error
                ? "border-red-600 shadow-[0_0_18px_rgba(220,38,38,0.6)]"
                : "border-[#F5C518]/60 glow-border"
            }`}
          />

          <button
            type="submit"
            className="btn-bat w-full rounded-sm px-8 py-4 text-sm font-semibold sm:w-auto"
          >
            Enter
          </button>
        </motion.form>

        <div className="mt-5 h-6">
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-body text-sm tracking-wide text-red-500"
              style={{
                textShadow: "0 0 12px rgba(220,38,38,0.8)",
              }}
            >
              Access Denied. The night is watching…
            </motion.p>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-[#F5C518]/60 font-body"
        >
          Gotham awaits the chosen one
        </motion.p>
      </div>
    </div>
  );
}
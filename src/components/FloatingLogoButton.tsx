import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HIDDEN_MESSAGES = [
 
"The Batmobile is ready. The Bat-Signal is on. Your birthday mission begins. 🚘🦇",

"Classified Gotham City message: Jay's birthday has been officially approved. 🎉",

"Tonight's mission: Celebrate. Tomorrow's mission: Back to saving Gotham. 🦇",

"Alfred has prepared the cake. Don't ask where it came from. 🎂",

"Emergency alert: Jay's birthday has been detected in Gotham. 🚨🎂",

"Keep this message classified. Even Commissioner Gordon doesn't know it's your birthday. 🤫🦇",

"One night. One mission. One birthday. Make it count, Jay. 🌃🎉"

];

export default function FloatingLogoButton() {
  const [open, setOpen] = useState(false);
  const [message] = useState(() => HIDDEN_MESSAGES[Math.floor(Math.random() * HIDDEN_MESSAGES.length)]);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-[#F5C518]/50 bg-black/80 shadow-[0_0_25px_rgba(245,197,24,0.4)] backdrop-blur sm:h-20 sm:w-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
        aria-label="Reveal hidden Batman message"
      >
        <img src="/images/batman-logo.png" alt="Batman" className="h-9 w-auto sm:h-11" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[#F5C518]"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="glow-border relative max-w-lg rounded-sm border border-[#F5C518]/50 bg-[radial-gradient(ellipse_at_top,_#111,_#000)] p-8 text-center sm:p-12"
            >
              <img
                src="/images/batman-logo.png"
                alt="Batman"
                className="animate-pulse-glow mx-auto mb-6 h-16 w-auto sm:h-20"
              />
              <p className="font-cinematic mb-2 text-xs uppercase tracking-[0.3em] text-[#F5C518]/70">
                Hidden Message Decrypted
              </p>
              <p className="font-body text-lg leading-relaxed text-gray-200 sm:text-xl">{message}</p>
              <button
                onClick={() => setOpen(false)}
                className="btn-bat mt-8 rounded-sm px-6 py-2 text-xs font-semibold uppercase tracking-widest"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

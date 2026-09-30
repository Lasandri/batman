import { useEffect, useRef, useState } from "react";

/**
 * Types out `text` one character at a time once `start` becomes true.
 */
export function useTypewriter(text: string, start: boolean, speed = 22) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!start) return;
    indexRef.current = 0;
    setOutput("");
    setDone(false);

    const interval = setInterval(() => {
      indexRef.current += 1;
      setOutput(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text]);

  return { output, done };
}

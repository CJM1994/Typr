import { useEffect, useState } from "react";

export default function useTimer() {
  const [milliseconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  function toggle() {
    setRunning(!running);
  };

  function reset() {
    setSeconds(0);
    setRunning(false);
  };

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1);
    } else if (!running && milliseconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, milliseconds]);

  return {
    milliseconds,
    running,
    toggleTimer: toggle,
    resetTimer: reset
  }
}
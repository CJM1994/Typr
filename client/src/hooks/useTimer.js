import { useEffect, useState } from "react";

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
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
      }, 1000);
    } else if (!running && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  return {
    seconds,
    running,
    toggleTimer: toggle,
    resetTimer: reset
  }
}
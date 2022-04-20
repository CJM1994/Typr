import { useEffect, useState } from "react";

export default function useTimer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  function toggle(mode) {
  
    console.log(`Setting timer to ${mode}`)
    setRunning(mode);
  };

  function reset() {
    setTime(0);
    setRunning(false);
  };

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, running])

  return {
    time,
    running,
    toggleTimer: toggle,
    resetTimer: reset
  };
}
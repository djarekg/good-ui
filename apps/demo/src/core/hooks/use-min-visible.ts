import { useEffect, useRef, useState } from 'react';

type MinVisibleProps = {
  /**
   * How many milliseconds to wait before showing the loader.
   * (keeps the original behavior: spinner is delayed by this amount)
   */
  minDuration?: number;
};
export const useMinVisible = ({ minDuration }: MinVisibleProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // ensure non-negative numeric delay
    const delay = Math.max(0, Number(minDuration ?? 0));

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      timerRef.current = null;
    }, delay);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [minDuration]);

  return [isVisible, setIsVisible];
};

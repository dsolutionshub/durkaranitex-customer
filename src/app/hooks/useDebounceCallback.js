import { useRef } from "react";

export const useDebounceCallback = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFunction = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedFunction;
};

import { useEffect, useState } from "react";

export const useDebounce = (searchTerm: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchTerm);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);
  return debounceValue;
};

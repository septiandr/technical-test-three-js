"use client";

import { useEffect, useState } from "react";

export function useModelLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 150);

    return () => window.clearTimeout(timer);
  }, []);

  return { isLoaded };
}

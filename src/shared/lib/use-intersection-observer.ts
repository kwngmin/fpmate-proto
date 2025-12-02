"use client";

import { useEffect, useRef, useState } from "react";

/**
 * @param options IntersectionObserverInit 옵션
 * @returns {object} ref: DOM ref / isIntersecting: 관찰 여부 state
 */
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}

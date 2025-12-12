import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** true면 한 번 보인 후 계속 true 유지 */
  once?: boolean;
}

/**
 * @param options IntersectionObserverInit 옵션 + once 옵션
 * @returns {object} ref: DOM ref / isIntersecting: 관찰 여부 state
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options?: UseIntersectionObserverOptions
) {
  const { once = false, ...observerOptions } = options ?? {};

  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasIntersectedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // once 모드에서 이미 보였으면 observer 생성 안 함
    if (once && hasIntersectedRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIsIntersecting(true);

        if (once) {
          hasIntersectedRef.current = true;
          observer.disconnect();
        }
      } else if (!once) {
        setIsIntersecting(false);
      }
    }, observerOptions);

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, observerOptions]);

  return { ref, isIntersecting };
}

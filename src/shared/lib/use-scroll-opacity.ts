import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

interface UseScrollOpacityOptions {
  /** 스크롤 시작 위치 (이 위치부터 opacity 감소 시작) */
  startOffset?: number;
  /** 스크롤 종료 위치 (이 위치에서 opacity가 최소값에 도달) */
  endOffset?: number;
  /** 최소 opacity 값 (0~1) */
  minOpacity?: number;
  /** 최대 opacity 값 (0~1) */
  maxOpacity?: number;
  /** 초기 등장 지연 시간 (ms) */
  initialDelay?: number;
}

export function useScrollOpacity({
  startOffset = 0,
  endOffset = 500,
  minOpacity = 0,
  maxOpacity = 1,
  initialDelay = 0,
}: UseScrollOpacityOptions = {}) {
  // initialDelay가 0이면 처음부터 ready 상태
  const [isReady, setIsReady] = useState(() => initialDelay === 0);

  useEffect(() => {
    // initialDelay가 0이면 이미 ready 상태이므로 아무것도 하지 않음
    if (initialDelay === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const rafId = requestAnimationFrame(() => {
      timeoutId = setTimeout(() => {
        setIsReady(true);
      }, initialDelay);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [initialDelay]);

  const subscribe = useCallback((onStoreChange: () => void) => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(onStoreChange);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const calculateOpacity = useCallback(
    (scrollY: number) => {
      if (scrollY <= startOffset) {
        return maxOpacity;
      }

      if (scrollY >= endOffset) {
        return minOpacity;
      }

      const progress = (scrollY - startOffset) / (endOffset - startOffset);
      return maxOpacity - progress * (maxOpacity - minOpacity);
    },
    [startOffset, endOffset, minOpacity, maxOpacity]
  );

  const getSnapshot = useCallback(() => {
    return calculateOpacity(window.scrollY);
  }, [calculateOpacity]);

  // SSR에서는 maxOpacity 반환 (스크롤 위치 0 기준)
  const getServerSnapshot = useCallback(() => maxOpacity, [maxOpacity]);

  const scrollOpacity = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // isReady가 false면 0, true면 실제 스크롤 opacity 반환
  return isReady ? scrollOpacity : 0;
}

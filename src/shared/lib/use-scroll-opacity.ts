import { useCallback, useSyncExternalStore } from "react";

interface UseScrollOpacityOptions {
  /** 스크롤 시작 위치 (이 위치부터 opacity 감소 시작) */
  startOffset?: number;
  /** 스크롤 종료 위치 (이 위치에서 opacity가 최소값에 도달) */
  endOffset?: number;
  /** 최소 opacity 값 (0~1) */
  minOpacity?: number;
  /** 최대 opacity 값 (0~1) */
  maxOpacity?: number;
}

export function useScrollOpacity({
  startOffset = 0,
  endOffset = 500,
  minOpacity = 0,
  maxOpacity = 1,
}: UseScrollOpacityOptions = {}) {
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

  const getSnapshot = useCallback(() => {
    const scrollY = window.scrollY;

    if (scrollY <= startOffset) {
      return maxOpacity;
    }

    if (scrollY >= endOffset) {
      return minOpacity;
    }

    const progress = (scrollY - startOffset) / (endOffset - startOffset);
    return maxOpacity - progress * (maxOpacity - minOpacity);
  }, [startOffset, endOffset, minOpacity, maxOpacity]);

  // SSR에서 사용될 값 - 클라이언트 초기 하이드레이션과 일치해야 함
  const getServerSnapshot = useCallback(() => maxOpacity, [maxOpacity]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

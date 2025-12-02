import { useState, useEffect, useCallback } from "react";

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

function getInitialOpacity(
  startOffset: number,
  endOffset: number,
  minOpacity: number,
  maxOpacity: number
): number {
  // SSR 환경에서는 window가 없으므로 maxOpacity 반환
  if (typeof window === "undefined") {
    return maxOpacity;
  }

  const scrollY = window.scrollY;

  if (scrollY <= startOffset) {
    return maxOpacity;
  }

  if (scrollY >= endOffset) {
    return minOpacity;
  }

  const progress = (scrollY - startOffset) / (endOffset - startOffset);
  return maxOpacity - progress * (maxOpacity - minOpacity);
}

export function useScrollOpacity({
  startOffset = 0,
  endOffset = 500,
  minOpacity = 0,
  maxOpacity = 1,
}: UseScrollOpacityOptions = {}) {
  const [opacity, setOpacity] = useState(() =>
    getInitialOpacity(startOffset, endOffset, minOpacity, maxOpacity)
  );

  const calculateOpacity = useCallback(() => {
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

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setOpacity(calculateOpacity());
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [calculateOpacity]);

  return opacity;
}

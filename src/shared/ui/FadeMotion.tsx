"use client";

import { useEffect, useRef, useState } from "react";

interface FadeOptions {
  delay?: number;
  hasBlur?: boolean;
  useIntersection?: boolean;
  intersectionOptions?: IntersectionObserverInit;
}

/**
 * Fade 애니메이션 로직을 추출한 커스텀 훅
 * iOS Safari GPU 가속 최적화 포함
 */
function useFadeAnimation({
  delay = 0,
  hasBlur = true,
  useIntersection = false,
  intersectionOptions,
}: FadeOptions) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // IntersectionObserver 설정
  useEffect(() => {
    if (!useIntersection || !ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, intersectionOptions);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [useIntersection, intersectionOptions, hasIntersected]);

  // 애니메이션 트리거
  useEffect(() => {
    const shouldStart = useIntersection ? hasIntersected : true;
    if (!shouldStart) return;

    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [useIntersection, hasIntersected, delay]);

  // iOS Safari GPU 가속 최적화 스타일
  const style: React.CSSProperties = {
    display: "inline-block",
    opacity: isVisible ? 1 : 0,
    filter: hasBlur ? (isVisible ? "blur(0px)" : "blur(6px)") : "none",
    transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 4px, 0)",
    transition: hasBlur
      ? "opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out"
      : "opacity 0.6s ease-out, transform 0.6s ease-out",
    willChange: "opacity, filter, transform",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
  };

  return { ref, style, isVisible };
}

interface FadeTextProps extends FadeOptions {
  text: string;
  className?: string;
}

export function FadeText({
  text,
  className = "",
  delay = 0,
  hasBlur = true,
  useIntersection = false,
  intersectionOptions,
}: FadeTextProps) {
  const { ref, style } = useFadeAnimation({
    delay,
    hasBlur,
    useIntersection,
    intersectionOptions,
  });

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={className}
      style={style}
    >
      {text}
    </span>
  );
}

interface FadeDivProps extends FadeOptions {
  children: React.ReactNode;
  className?: string;
}

export function FadeDiv({
  children,
  className = "",
  delay = 0,
  hasBlur = true,
  useIntersection = false,
  intersectionOptions,
}: FadeDivProps) {
  const { ref, style } = useFadeAnimation({
    delay,
    hasBlur,
    useIntersection,
    intersectionOptions,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

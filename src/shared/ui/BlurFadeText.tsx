"use client";

import { useEffect, useRef, useState } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** IntersectionObserver 사용 여부 (true면 viewport에 들어올 때 애니메이션 시작) */
  useIntersection?: boolean;
  /** IntersectionObserver 옵션 */
  intersectionOptions?: IntersectionObserverInit;
}

interface BlurFadeDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** IntersectionObserver 사용 여부 (true면 viewport에 들어올 때 애니메이션 시작) */
  useIntersection?: boolean;
  /** IntersectionObserver 옵션 */
  intersectionOptions?: IntersectionObserverInit;
}

export function BlurFadeText({
  text,
  className = "",
  delay = 0,
  useIntersection = false,
  intersectionOptions,
  ...props
}: BlurFadeTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // IntersectionObserver 설정
  useEffect(() => {
    if (!useIntersection) return;
    if (!ref.current) return;

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
    if (useIntersection) {
      // IntersectionObserver 사용: intersection 후 delay
      if (!hasIntersected) return;
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      // 기존 동작: mount 시점부터 delay
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [useIntersection, hasIntersected, delay]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(10px)",
        // transform: isVisible ? "translateY(0%)" : "translateY(20%)",
        transition: "all 0.75s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
      {...props}
    >
      {text}
    </span>
  );
}

export function BlurFadeDiv({
  children,
  className = "",
  delay = 0,
  useIntersection = false,
  intersectionOptions,
  ...props
}: BlurFadeDivProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver 설정
  useEffect(() => {
    if (!useIntersection) return;
    if (!ref.current) return;

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
    if (useIntersection) {
      // IntersectionObserver 사용: intersection 후 delay
      if (!hasIntersected) return;
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      // 기존 동작: mount 시점부터 delay
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [useIntersection, hasIntersected, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(10px)",
        transition: "all 0.75s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  delay?: number;
}

interface BlurFadeDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BlurFadeText({
  text,
  className = "",
  delay = 0,
}: BlurFadeTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(10px)",
        // transform: isVisible ? "translateY(0%)" : "translateY(20%)",
        transition: "all 0.75s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
    >
      {text}
    </span>
  );
}

export function BlurFadeDiv({
  children,
  className = "",
  delay = 0,
}: BlurFadeDivProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(10px)",
        transition: "all 0.75s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
    >
      {children}
    </div>
  );
}

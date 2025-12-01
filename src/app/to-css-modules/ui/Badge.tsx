import { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지 변형 */
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  /** 배지 크기 */
  size?: "sm" | "md" | "lg";
  /** 점 표시 */
  dot?: boolean;
}

/**
 * 재사용 가능한 Badge 컴포넌트 - CSS Modules 버전
 * @param variant - 배지 스타일 변형
 * @param size - 배지 크기
 * @param dot - 점 표시 여부
 * @returns Badge 컴포넌트
 */
export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantClass = styles[variant] || styles.default;
  const sizeClass = styles[size] || styles.md;
  const dotClass = dot ? styles.withDot : "";

  return (
    <span
      className={`${styles.badge} ${variantClass} ${sizeClass} ${dotClass} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`${styles.dot} ${
            variant === "default" ? styles.dotDefault : styles.dotCurrent
          }`}
        />
      )}
      {children}
    </span>
  );
}


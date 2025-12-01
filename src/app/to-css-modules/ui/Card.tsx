import { HTMLAttributes, forwardRef } from "react";
import styles from "./Card.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 카드 변형 */
  variant?: "default" | "bordered" | "elevated";
  /** 패딩 크기 */
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  /** 호버 효과 */
  hoverable?: boolean;
  /** 클릭 가능 여부 */
  clickable?: boolean;
}

/**
 * 재사용 가능한 Card 컴포넌트 - CSS Modules 버전
 * @param variant - 카드 스타일 변형
 * @param padding - 패딩 크기
 * @param hoverable - 호버 효과 여부
 * @param clickable - 클릭 가능 여부
 * @returns Card 컴포넌트
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      hoverable = false,
      clickable = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = styles[variant] || styles.default;
    const paddingClass = styles[padding] || styles.md;
    const hoverableClass = hoverable ? styles.hoverable : "";
    const clickableClass = clickable ? styles.clickable : "";

    return (
      <div
        ref={ref}
        className={`${styles.card} ${variantClass} ${paddingClass} ${hoverableClass} ${clickableClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";


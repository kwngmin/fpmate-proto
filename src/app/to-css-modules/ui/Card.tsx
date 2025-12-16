import { HTMLAttributes, forwardRef } from "react";
import styles from "./Card.module.css";

type CardVariant = "default" | "bordered" | "elevated";
type CardPadding = "none" | "xs" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 카드 변형 */
  variant?: CardVariant;
  /** 패딩 크기 */
  padding?: CardPadding;
  /** 호버 효과 */
  hoverable?: boolean;
  /** 클릭 가능 여부 */
  clickable?: boolean;
}

const VARIANT_STYLES: Record<CardVariant, string> = {
  default: styles.variantDefault,
  bordered: styles.variantBordered,
  elevated: styles.variantElevated,
};

const PADDING_STYLES: Record<CardPadding, string> = {
  none: styles.paddingNone,
  xs: styles.paddingXs,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

/**
 * 재사용 가능한 Card 컴포넌트
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
    const classNames = [
      styles.card,
      VARIANT_STYLES[variant],
      PADDING_STYLES[padding],
      hoverable ? styles.hoverable : "",
      clickable ? styles.clickable : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

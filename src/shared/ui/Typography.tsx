import { createElement, HTMLAttributes } from "react";
import { remToPx } from "@/shared/lib/rem-to-px";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** 타이포그래피 변형 */
  variant?:
    | "title1"
    | "title2"
    | "title3"
    | "title4"
    | "title5"
    | "title6"
    | "title7"
    | "title8"
    | "title9"
    | "large"
    | "regular"
    | "small"
    | "mini"
    | "micro";
  /** HTML 요소 태그 */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  /** 폰트 굵기 */
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  /** 텍스트 색상 */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "disabled"
    | "brand"
    | "error"
    | "success"
    | "warning"
    | "info";
  /** 텍스트 정렬 */
  align?: "left" | "center" | "right" | "justify";
  /** rem/px 변환 표시 여부 */
  showConversion?: boolean;
}

const variantStyles = {
  title9: "text-[4.5rem] leading-[1] tracking-[-0.022em] font-semibold", // 72px
  title8: "text-[4rem] leading-[1.06] tracking-[-0.022em] font-semibold", // 64px
  title7: "text-[3.5rem] leading-[1.1] tracking-[-0.022em] font-semibold", // 56px
  title6: "text-[3rem] leading-[1.1] tracking-[-0.022em] font-semibold", // 48px
  title5: "text-[2.5rem] leading-[1.1] tracking-[-0.022em] font-semibold", // 40px
  title4: "text-[2rem] leading-[1.125] tracking-[-0.022em] font-semibold", // 32px
  title3: "text-[1.5rem] leading-[1.33] tracking-[-0.012em] font-semibold", // 24px
  title2: "text-[1.3125rem] leading-[1.33] tracking-[-0.012em] font-semibold", // 21px
  title1: "text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold", // 17px
  large: "text-[1.0625rem] leading-[1.6] tracking-[0]", // 17px
  regular: "text-[0.9375rem] leading-[1.6] tracking-[-0.011em]", // 15px
  small: "text-[0.875rem] leading-[calc(21/14)] tracking-[-0.013em]", // 14px
  mini: "text-[0.8125rem] leading-[1.5] tracking-[-0.01em]", // 13px
  micro: "text-[0.75rem] leading-[1.4] tracking-[0]", // 12px
};

const variantSizes = {
  title9: "4.5rem",
  title8: "4rem",
  title7: "3.5rem",
  title6: "3rem",
  title5: "2.5rem",
  title4: "2rem",
  title3: "1.5rem",
  title2: "1.3125rem",
  title1: "1.0625rem",
  large: "1.0625rem",
  regular: "0.9375rem",
  small: "0.875rem",
  mini: "0.8125rem",
  micro: "0.75rem",
};

const variantLineHeights = {
  title9: "1",
  title8: "1.06",
  title7: "1.1",
  title6: "1.1",
  title5: "1.1",
  title4: "1.125",
  title3: "1.33",
  title2: "1.33",
  title1: "1.4",
  large: "1.6",
  regular: "1.6",
  small: "calc(21/14)",
  mini: "1.5",
  micro: "1.4",
};

const weightStyles = {
  light: "font-light", // 300
  normal: "font-normal", // 400
  medium: "font-medium", // 500
  semibold: "font-semibold", // 600
  bold: "font-bold", // 680
};

const colorStyles = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
  quaternary: "text-text-quaternary",
  disabled: "text-text-disabled",
  brand: "text-brand-primary",
  error: "text-semantic-error",
  success: "text-semantic-success",
  warning: "text-semantic-warning",
  info: "text-semantic-info",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const defaultTags: Record<
  string,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
> = {
  title9: "h1",
  title8: "h1",
  title7: "h1",
  title6: "h1",
  title5: "h2",
  title4: "h2",
  title3: "h3",
  title2: "h4",
  title1: "h5",
  large: "p",
  regular: "p",
  small: "p",
  mini: "span",
  micro: "span",
};

/**
 * 재사용 가능한 Typography 컴포넌트
 * @param variant - 타이포그래피 스타일 변형
 * @param as - HTML 요소 태그
 * @param weight - 폰트 굵기
 * @param color - 텍스트 색상
 * @param align - 텍스트 정렬
 * @param showConversion - rem/px 변환 표시 여부
 * @returns Typography 컴포넌트
 */
export function Typography({
  variant = "regular",
  as,
  weight,
  color = "primary",
  align = "left",
  className = "",
  children,
  showConversion = false,
  ...props
}: TypographyProps) {
  const tag = as || defaultTags[variant];

  const classes = [
    variantStyles[variant],
    weight ? weightStyles[weight] : "",
    colorStyles[color],
    alignStyles[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = showConversion ? (
    <>
      {children}
      <span className="block mt-1 text-text-tertiary text-[0.75rem] font-mono">
        {variantSizes[variant]} / {remToPx(variantSizes[variant])}px
        {" • "}
        line-height: {variantLineHeights[variant]}
      </span>
    </>
  ) : (
    children
  );

  return createElement(tag, { className: classes, ...props }, content);
}

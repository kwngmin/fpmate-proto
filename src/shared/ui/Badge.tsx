import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 배지 변형 */
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  /** 배지 크기 */
  size?: "sm" | "md" | "lg";
  /** 점 표시 */
  dot?: boolean;
}

/**
 * 재사용 가능한 Badge 컴포넌트
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
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-100 ease-in-out";

  const variantStyles = {
    default: "bg-bg-tertiary text-text-primary",
    primary: "bg-brand-tint text-brand-primary",
    success:
      "bg-gray-100 text-text-secondary hover:bg-semantic-success/10 hover:text-accent-primary",
    warning:
      "bg-gray-100 text-text-secondary hover:bg-semantic-warning/10 hover:text-semantic-warning",
    error:
      "bg-gray-100 text-text-secondary hover:bg-semantic-error/10 hover:text-semantic-red",
    info: "bg-gray-100 text-text-secondary hover:bg-semantic-info/10 hover:text-blue-600",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[0.6875rem] leading-[1.4] tracking-[0] min-h-[18px]",
    md: "px-2.5 py-1 text-[0.75rem] leading-[1.4] tracking-[0] min-h-[22px]",
    lg: "px-3 py-1.5 text-[0.8125rem] leading-[1.5] tracking-[-0.01em] min-h-[26px]",
  };

  const dotStyles = dot ? "gap-1.5" : "";

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${dotStyles} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === "default" ? "bg-text-primary" : "bg-current"
          }`}
        />
      )}
      {children}
    </span>
  );
}

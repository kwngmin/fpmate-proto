"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력 필드 크기 */
  size?: "sm" | "md" | "lg";
  /** 에러 상태 */
  error?: boolean;
  /** 성공 상태 */
  success?: boolean;
  /** 레이블 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
}

/**
 * 재사용 가능한 Input 컴포넌트
 * @param size - 입력 필드 크기
 * @param error - 에러 상태
 * @param success - 성공 상태
 * @param label - 레이블
 * @param helperText - 도움말 텍스트
 * @param errorMessage - 에러 메시지
 * @param fullWidth - 전체 너비 사용 여부
 * @returns Input 컴포넌트
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      error = false,
      success = false,
      label,
      helperText,
      errorMessage,
      fullWidth = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles =
      "rounded-lg border-2 transition-all duration-[0.25s] font-normal bg-bg-primary text-text-primary placeholder:text-text-tertiary disabled:bg-bg-secondary disabled:cursor-not-allowed disabled:text-text-disabled";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-[0.8125rem] leading-[1.5] tracking-[-0.01em] min-h-[32px]",
      md: "px-4 py-2 text-[0.9375rem] leading-[1.6] tracking-[-0.011em] min-h-[40px]",
      lg: "px-6 py-3 text-[1.0625rem] leading-[1.6] tracking-[0] min-h-[48px]",
    };

    const stateStyles = error
      ? "border-semantic-error focus:border-semantic-error focus:ring-2 focus:ring-semantic-error/20"
      : success
      ? "border-semantic-success focus:border-semantic-success focus:ring-2 focus:ring-semantic-success/20"
      : isFocused
      ? "border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
      : "border-border-primary hover:border-border-secondary";

    const widthStyles = fullWidth ? "w-full" : "";

    const displayMessage = error && errorMessage ? errorMessage : helperText;
    const messageColor = error
      ? "text-semantic-error"
      : success
      ? "text-semantic-success"
      : "text-text-secondary";

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label className="block mb-1.5 text-[0.8125rem] leading-normal tracking-[-0.01em] font-medium text-text-primary">
            {label}
            {props.required && (
              <span className="ml-1 text-semantic-error">*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={`${baseStyles} ${sizeStyles[size]} ${stateStyles} ${widthStyles} ${className}`}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {displayMessage && (
          <p
            className={`mt-1.5 text-[0.75rem] leading-[1.4] tracking-[0] ${messageColor}`}
          >
            {displayMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

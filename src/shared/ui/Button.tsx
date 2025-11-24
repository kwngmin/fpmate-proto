import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
}

/**
 * 재사용 가능한 Button 컴포넌트
 * @param variant - 버튼 스타일 변형
 * @param size - 버튼 크기
 * @param fullWidth - 전체 너비 사용 여부
 * @param loading - 로딩 상태
 * @returns Button 컴포넌트
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-[0.25s] rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-brand-primary text-brand-text hover:bg-brand-hover active:bg-accent-primary disabled:bg-action-disabled-bg disabled:text-action-disabled',
      secondary: 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary active:bg-bg-quaternary disabled:bg-action-disabled-bg disabled:text-action-disabled',
      outline: 'border-2 border-border-primary bg-transparent text-text-primary hover:bg-action-hover active:bg-action-selected disabled:border-border-primary disabled:text-action-disabled',
      ghost: 'bg-transparent text-text-primary hover:bg-action-hover active:bg-action-selected disabled:text-action-disabled',
      danger: 'bg-semantic-error text-white hover:opacity-90 active:opacity-80 disabled:bg-action-disabled-bg disabled:text-action-disabled',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-[0.8125rem] leading-[1.5] tracking-[-0.01em] min-h-[32px]',
      md: 'px-4 py-2 text-[0.9375rem] leading-[1.6] tracking-[-0.011em] min-h-[40px]',
      lg: 'px-6 py-3 text-[1.0625rem] leading-[1.6] tracking-[0] min-h-[48px]',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';


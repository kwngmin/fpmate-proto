import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 카드 변형 */
  variant?: 'default' | 'bordered' | 'elevated';
  /** 패딩 크기 */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** 호버 효과 */
  hoverable?: boolean;
  /** 클릭 가능 여부 */
  clickable?: boolean;
}

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
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-lg transition-all duration-[0.25s]';

    const variantStyles = {
      default: 'bg-bg-paper',
      bordered: 'bg-bg-paper border border-border-primary',
      elevated: 'bg-bg-paper shadow-card',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactionStyles = [];
    if (hoverable) {
      interactionStyles.push('hover:shadow-medium');
    }
    if (clickable) {
      interactionStyles.push('cursor-pointer active:scale-[0.98]');
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${interactionStyles.join(' ')} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';




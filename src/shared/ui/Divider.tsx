import { HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** 구분선 방향 */
  orientation?: 'horizontal' | 'vertical';
  /** 여백 */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * 재사용 가능한 Divider 컴포넌트
 * @param orientation - 구분선 방향
 * @param spacing - 여백 크기
 * @returns Divider 컴포넌트
 */
export function Divider({
  orientation = 'horizontal',
  spacing = 'md',
  className = '',
  ...props
}: DividerProps) {
  const baseStyles = 'border-border-divider';

  const orientationStyles = {
    horizontal: 'w-full border-t',
    vertical: 'h-full border-l',
  };

  const spacingStyles = {
    horizontal: {
      none: '',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
    },
    vertical: {
      none: '',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
    },
  };

  return (
    <hr
      className={`${baseStyles} ${orientationStyles[orientation]} ${spacingStyles[orientation][spacing]} ${className}`}
      {...props}
    />
  );
}




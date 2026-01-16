import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white font-bold',
  secondary: 'bg-white text-black font-semibold hover:bg-neutral-200',
  danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold',
  ghost: 'bg-neutral-800 hover:bg-neutral-700 text-white',
  icon: 'p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors',
  link: 'hover:text-white underline bg-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 rounded-lg',
  lg: 'px-8 py-3 rounded-lg',
  icon: 'p-2 rounded-full',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-colors flex items-center justify-center gap-2
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

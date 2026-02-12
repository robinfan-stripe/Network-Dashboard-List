import React from 'react';
import { Icon } from '../icons/SailIcons';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 focus:outline-none leading-none focus:ring-[rgba(8,142,249,0.36)] focus:ring-4';

  const variants = {
    primary: 'bg-button-primary-bg text-button-primary-text border border-button-primary-border hover:border-button-primary-border-hover active:bg-button-primary-pressed disabled:opacity-50 shadow-[0px_1px_1px_0px_rgba(47,14,99,0.15)]',
    secondary: 'bg-button-secondary-bg text-button-secondary-text border border-button-secondary-border hover:border-button-secondary-border-hover active:bg-button-secondary-pressed disabled:opacity-50 shadow-[0px_1px_1px_0px_rgba(33,37,44,0.10)]',
    danger: 'bg-button-danger-bg text-button-danger-text border border-button-danger-border hover:border-button-danger-border-hover active:bg-button-danger-pressed disabled:opacity-50 shadow-[0px_1px_1px_0px_rgba(33,37,44,0.10)]',
  };

  const sizes = {
    sm: 'h-[28px] py-[4px] px-[8px] text-[12px]',
    md: 'h-[32px] py-[4px] px-[8px] text-[14px]',
    lg: 'h-[40px] py-[8px] px-[16px] text-[16px]',
  };

  // Map button size to icon size
  const iconSizes = {
    sm: 'xsmall',
    md: 'xsmall',
    lg: 'small',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-60' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} size={iconSizes[size]} fill="currentColor" className={children ? 'mr-1.5' : ''} />}
      {children}
    </button>
  );
};

export default Button;

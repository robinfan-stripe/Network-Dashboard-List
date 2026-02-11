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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-[rgba(8,142,249,0.36)] focus:ring-4';

  const variants = {
    primary: 'bg-[#675DFF] text-white border border-[#675DFF] hover:border-[#4E11E2] disabled:opacity-50 disabled:hover:border-[#675DFF] shadow-[0px_1px_1px_0px_rgba(47,14,99,0.32)]',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 disabled:text-gray-400 disabled:border-gray-300 shadow-[0px_1px_1px_0px_rgba(33,37,44,0.16)]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
  };

  const sizes = {
    sm: 'h-[26px] p-2 text-[12px]',
    md: 'h-[30px] p-2.5 text-[14px]',
    lg: 'h-[48px] p-4 text-[16px]',
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

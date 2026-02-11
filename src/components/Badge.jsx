import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  // Using CSS variables that automatically switch between light/dark mode
  // based on whether parent has .dark-mode class
  const variants = {
    default: 'text-[var(--badge-default-text)] bg-[var(--badge-default-bg)] border-[var(--badge-default-border)]',
    success: 'text-[var(--badge-success-text)] bg-[var(--badge-success-bg)] border-[var(--badge-success-border)]',
    warning: 'text-[var(--badge-warning-text)] bg-[var(--badge-warning-bg)] border-[var(--badge-warning-border)]',
    danger: 'text-[var(--badge-danger-text)] bg-[var(--badge-danger-bg)] border-[var(--badge-danger-border)]',
    info: 'text-[var(--badge-info-text)] bg-[var(--badge-info-bg)] border-[var(--badge-info-border)]',
  };

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-sm border ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

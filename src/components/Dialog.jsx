import React, { useEffect, useState } from 'react';
import { Icon } from '../icons/SailIcons';

const Dialog = ({
  open,
  onClose,
  title,
  subtitle,
  footer,
  size = 'medium',
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const sizes = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
    xlarge: 'max-w-2xl',
    full: 'max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)]',
  };

  // Handle open/close state with animation
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const hasHeader = title || subtitle;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isClosing ? 'animate-[fadeOut_150ms_ease-in_forwards]' : 'animate-[fadeIn_150ms_ease-out]'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay-backdrop"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full ${isClosing ? 'animate-[scaleOut_150ms_ease-in_forwards]' : 'animate-[scaleIn_150ms_ease-out]'} ${sizes[size]} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-7 flex items-center justify-center rounded text-icon-subdued hover:bg-offset transition-colors cursor-pointer"
          aria-label="Close"
        >
          <Icon name="cancel" size="xxsmall" fill="currentColor" />
        </button>

        {/* Header */}
        {hasHeader && (
          <div className="px-[16px] pt-[16px] pb-4">
            {title && (
              <h2 className="text-lg font-semibold text-default pr-8">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-subdued">{subtitle}</p>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`px-[16px] ${hasHeader ? 'pb-[16px]' : 'py-[16px]'} ${footer ? '' : 'pb-[16px]'}`}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-[16px] py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;

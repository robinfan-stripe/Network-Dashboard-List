import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Tooltip = ({
  children,
  content,
  placement = 'top',
  variant = 'default',
  darkMode = false,
  usePortal = false,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const variantBaseClasses = {
    default: 'px-3 py-2 text-xs w-[280px] text-left',
    minimal: 'px-2 py-1 text-xs whitespace-nowrap bg-gray-800 text-white',
  };

  const variantModeClasses = {
    default: darkMode
      ? 'bg-gray-800 text-white border border-gray-700'
      : 'bg-white text-gray-600 border border-gray-200 shadow-md',
    minimal: '', // minimal is the same in both modes
  };

  const variantClasses = `${variantBaseClasses[variant]} ${variantModeClasses[variant]}`;

  // Calculate position for portal-based tooltip
  useEffect(() => {
    if (usePortal && isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top, left;

      switch (placement) {
        case 'top':
          top = rect.top - 8; // 8px gap
          left = rect.left + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - 8;
          break;
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + 8;
          break;
        default:
          top = rect.top - 8;
          left = rect.left + rect.width / 2;
      }

      setPosition({ top, left });
    }
  }, [isVisible, usePortal, placement]);

  // Portal-based tooltip (escapes overflow:hidden containers)
  if (usePortal) {
    const portalPlacementClasses = {
      top: '-translate-x-1/2 -translate-y-full',
      bottom: '-translate-x-1/2',
      left: '-translate-x-full -translate-y-1/2',
      right: '-translate-y-1/2',
    };

    return (
      <>
        <div
          ref={triggerRef}
          className={`inline-flex ${className}`}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {children}
        </div>
        {isVisible && createPortal(
          <div
            className={`fixed ${portalPlacementClasses[placement]} ${variantClasses} rounded transition-opacity pointer-events-none z-[100]`}
            style={{ top: position.top, left: position.left }}
          >
            {content}
          </div>,
          document.body
        )}
      </>
    );
  }

  // Default non-portal tooltip (uses CSS positioning)
  return (
    <div className={`relative group/tooltip inline-flex ${className}`}>
      {children}
      <div
        className={`absolute ${placementClasses[placement]} ${variantClasses} rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;

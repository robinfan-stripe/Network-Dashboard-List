import React from 'react';

/**
 * A reusable toggle card component for selecting options.
 * Used in card type selection, payment method selection, etc.
 */
const ToggleCard = ({
  icon: Icon,
  title,
  description,
  selected = false,
  onClick,
  themeColor = '#0085FF',
  darkMode = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border rounded-lg transition-colors cursor-pointer ${selected
        ? 'border-2 p-[11px]'
        : `border p-[12px] ${darkMode ? 'border-gray-600 hover:bg-gray-800/50' : 'border-gray-300 hover:bg-gray-50'}`
        }`}
      style={{
        borderColor: selected ? themeColor : undefined,
      }}
    >
      <div className="flex items-start gap-2.5">
        {Icon && (
          <div
            className="mt-0.5 flex-shrink-0"
            style={{ color: selected ? themeColor : darkMode ? '#9CA3AF' : '#6B7280' }}
          >
            <Icon size={16} />
          </div>
        )}
        <div className="flex-1">
          <div
            className="text-sm font-medium"
            style={{ color: selected ? themeColor : darkMode ? '#FFFFFF' : '#111827' }}
          >
            {title}
          </div>
          {description && (
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</div>
          )}
        </div>
      </div>
    </button>
  );
};

/**
 * A group wrapper for multiple toggle cards
 * @param {string} layout - 'vertical' (default) or 'horizontal'
 */
export const ToggleCardGroup = ({ children, label, layout = 'vertical', darkMode = false }) => {
  const layoutClass = layout === 'horizontal'
    ? 'flex gap-2'
    : 'space-y-2';

  return (
    <div>
      {label && (
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      <div className={layoutClass}>{children}</div>
    </div>
  );
};

export default ToggleCard;

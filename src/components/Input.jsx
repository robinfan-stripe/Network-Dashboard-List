import React, { useState } from 'react';

// Inline SVG data URL for select chevron
const selectChevronUrl = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.92637 7.24258C2.23422 6.92566 2.7407 6.91831 3.05762 7.22617L6.00023 10.0846L8.94277 7.22622C9.25969 6.91836 9.76617 6.92571 10.074 7.24263C10.3819 7.55954 10.3745 8.06602 10.0576 8.37388L6.55765 11.7738C6.40243 11.9246 6.20133 12 6.00023 12C5.79912 12 5.59802 11.9246 5.4428 11.7738L1.94277 8.37383C1.62586 8.06597 1.61851 7.5595 1.92637 7.24258Z' fill='%236B7280'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.4428 0.22617C5.59802 0.0753911 5.79912 0 6.00022 0C6.20133 0 6.40243 0.0753906 6.55765 0.226175L10.0576 3.62613C10.3745 3.93398 10.3819 4.44046 10.074 4.75738C9.76616 5.07429 9.25968 5.08163 8.94277 4.77378L6.00022 1.91532L3.05762 4.77378C2.7407 5.08164 2.23422 5.07429 1.92637 4.75737C1.61851 4.44046 1.62586 3.93398 1.94277 3.62612L5.4428 0.22617Z' fill='%236B7280'/%3E%3C/svg%3E";

// Format number with commas (e.g., 10000 → 10,000)
const formatWithCommasHelper = (value) => {
  if (!value && value !== 0) return '';
  const stringValue = String(value);
  // Split by decimal point
  const parts = stringValue.split('.');
  // Add commas to integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// Remove commas from string (e.g., "10,000" → "10000")
const stripCommas = (value) => {
  if (!value) return '';
  return String(value).replace(/,/g, '');
};

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  themeColor = '#0085FF',
  className = '',
  icon: Icon,
  prefix,
  suffix,
  darkMode = false,
  disabled = false,
  error = false,
  errorMessage = '',
  formatWithCommas = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const darkModeStyles = darkMode
    ? 'bg-transparent text-white border-[var(--border)] placeholder-[var(--text-secondary)] disabled:bg-gray-950 disabled:opacity-50'
    : 'bg-white text-gray-900';

  // Determine padding based on icon, prefix, or suffix
  const leftPadding = Icon ? 'pl-9' : prefix ? 'pl-7' : '';
  const rightPadding = suffix ? 'pr-12' : '';

  // Handle comma-formatted input
  const handleChange = (e) => {
    if (formatWithCommas) {
      const rawValue = stripCommas(e.target.value);
      // Only allow numbers and decimal point
      if (rawValue === '' || /^-?\d*\.?\d*$/.test(rawValue)) {
        // Create synthetic event with raw value
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: rawValue
          }
        };
        onChange(syntheticEvent);
      }
    } else {
      onChange(e);
    }
  };

  // Format displayed value with commas if enabled
  const displayValue = formatWithCommas ? formatWithCommasHelper(value) : value;

  return (
    <div>
      <div className="relative">
        {Icon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <Icon size={16} />
          </div>
        )}
        {prefix && !Icon && (
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {prefix}
          </span>
        )}
        <input
          type={formatWithCommas ? 'text' : type}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline focus:outline-2 focus:outline-offset-0 text-[16px] sm:text-sm disabled:opacity-60 disabled:bg-gray-100 ${leftPadding} ${rightPadding} ${darkModeStyles} ${error ? 'border-red-500' : ''} ${className}`}
          style={{
            outlineColor: `${themeColor}70`,
          }}
          {...props}
        />
        {suffix && (
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {suffix}
          </span>
        )}
      </div>
      {error && errorMessage && (
        <div className="mt-1.5 text-xs text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export const Textarea = ({
  value,
  onChange,
  placeholder,
  themeColor = '#0085FF',
  rows = 2,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none text-[16px] sm:text-sm resize-none ${className}`}
      style={{
        borderColor: isFocused ? themeColor : '#d1d5db',
        boxShadow: isFocused ? `0 0 0 1px ${themeColor}` : 'none',
      }}
      {...props}
    />
  );
};

export const Select = ({
  value,
  onChange,
  children,
  themeColor = '#0085FF',
  className = '',
  darkMode = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const darkModeStyles = darkMode
    ? 'bg-[#1a1a1a] text-white border-[#3a3a3a]'
    : 'bg-white text-gray-900';

  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`pl-3 pr-8 py-2 border rounded-md text-[16px] sm:text-sm focus:outline-none appearance-none bg-no-repeat disabled:opacity-50 ${darkMode ? 'disabled:bg-gray-950' : 'disabled:bg-gray-100'} ${darkModeStyles} ${className}`}
      style={{
        borderColor: isFocused ? themeColor : (darkMode ? '#3a3a3a' : '#d1d5db'),
        boxShadow: isFocused ? `0 0 0 1px ${themeColor}` : 'none',
        backgroundImage: `url("${selectChevronUrl}")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '12px',
      }}
      {...props}
    >
      {children}
    </select>
  );
};

export default Input;

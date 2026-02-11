import React from 'react';

/**
 * Generic Table component with desktop/mobile responsive views
 *
 * @param {Object} props
 * @param {Array} props.columns - Column definitions
 *   - key: string - Property key or unique identifier
 *   - header: string - Header text (optional, empty for no header)
 *   - align: 'left' | 'center' | 'right' - Text alignment (default: 'left')
 *   - width: 'grow' | 'hug' - Column sizing (default: 'hug')
 *   - render: (item, index) => ReactNode - Custom render function (optional)
 *   - paddingX: string - Override horizontal padding for this column (e.g., 'px-2')
 * @param {Array} props.data - Array of data items to display
 * @param {Function} props.onRowClick - Click handler for rows (optional)
 * @param {Function} props.mobileRow - Render function for mobile rows: (item, onClick, index) => ReactNode
 * @param {boolean} props.isLoading - Show loading spinner
 * @param {boolean} props.darkMode - Dark mode styling
 * @param {string} props.rowKey - Property to use as React key (default: 'id')
 * @param {string} props.cellPaddingX - Default horizontal padding for cells (default: 'px-4')
 * @param {string} props.emptyStateTitle - Title text for empty state
 * @param {string} props.emptyStateDescription - Description text for empty state
 * @param {ReactNode} props.emptyStateAction - Optional CTA button for empty state
 */
const Table = ({
  columns = [],
  data = [],
  onRowClick,
  mobileRow,
  isLoading = false,
  darkMode = false,
  rowKey = 'id',
  cellPaddingX = 'px-4',
  emptyStateTitle = null,
  emptyStateDescription = null,
  emptyStateAction = null,
}) => {
  // Get alignment class for header/cell
  const getAlignClass = (align) => {
    switch (align) {
      case 'right': return 'text-right';
      case 'center': return 'text-center';
      default: return 'text-left';
    }
  };

  // Get width class for header/cell (default: hug)
  const getWidthClass = (width) => {
    return width === 'grow' ? '' : 'w-1 whitespace-nowrap';
  };

  // Render cell content
  const renderCell = (column, item, index) => {
    if (column.render) {
      return column.render(item, index);
    }
    return item[column.key];
  };

  // Loading spinner
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className={`w-6 h-6 border-2 rounded-full animate-spin ${darkMode ? 'border-gray-600 border-t-gray-300' : 'border-gray-300 border-t-gray-600'}`} />
    </div>
  );

  // Check if data is empty (used for consistent loading/empty state layout)
  const isDataEmpty = data.length === 0;

  // Empty state content component - centered in a dotted border container
  const EmptyStateContent = () => (
    <div className={`border border-dashed rounded-lg py-16 px-8 flex flex-col items-center justify-center ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      {emptyStateTitle && (
        <div className={`text-base font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{emptyStateTitle}</div>
      )}
      {emptyStateDescription && (
        <div className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{emptyStateDescription}</div>
      )}
      {emptyStateAction && <div className="mt-4">{emptyStateAction}</div>}
    </div>
  );

  return (
    <div className="@container">
      {/* Desktop Table - hidden when container < 500px */}
      <div className="hidden @[500px]:block rounded-lg overflow-hidden">
        {/* Show table with headers only when data exists, otherwise show empty/loading state */}
        {isDataEmpty ? (
          <div className={isLoading ? "py-24 text-center" : ""}>
            {isLoading ? <LoadingSpinner /> : <EmptyStateContent />}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {columns.map((column, colIndex) => (
                  <th
                    key={column.key || colIndex}
                    className={`py-3 ${column.paddingX || cellPaddingX} text-xs font-medium uppercase ${getAlignClass(column.align)} ${getWidthClass(column.width)} ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
                  >
                    {column.header || ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="py-32">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : (
                data.map((item, rowIndex) => (
                  <tr
                    key={item[rowKey] ?? rowIndex}
                    className={`border-b text-sm border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors duration-100 ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick?.(item, rowIndex)}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={column.key || colIndex}
                        className={`py-1.5 ${column.paddingX || cellPaddingX} h-[36px] ${getAlignClass(column.align)} ${getWidthClass(column.width)}`}
                      >
                        {renderCell(column, item, rowIndex)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile List - shown when container < 500px */}
      <div className="block @[500px]:hidden">
        {isLoading ? (
          <div className="py-16 text-center">
            <LoadingSpinner />
          </div>
        ) : isDataEmpty ? (
          <EmptyStateContent />
        ) : (
          <div>
            {data.map((item, index) => (
              <React.Fragment key={item[rowKey] ?? index}>
                {mobileRow?.(item, () => onRowClick?.(item, index), index)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

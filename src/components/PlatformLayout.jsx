import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../icons/SailIcons';

export const NavItem = ({ icon, label, active, highlighted, to }) => {
  const content = (
    <div className={`flex items-center space-x-2 h-[30px] px-1 rounded-md cursor-pointer ${active ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
      {icon && (
        <div className="w-6 h-6 flex items-center justify-center text-gray-500">
          {icon}
        </div>
      )}
      <span className={`text-sm flex-1 ${highlighted ? 'text-[#533AFD]' : 'text-gray-700'}`}>{label}</span>
    </div>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }
  return content;
};

export const SubNavItem = ({ label, active, highlighted, onClick, to }) => {
  const content = (
    <div
      className={`flex items-center space-x-2 h-[30px] px-1 rounded-md cursor-pointer hover:bg-offset`}
      onClick={!to ? onClick : undefined}
    >
      {/* Empty spacer to match icon width */}
      <div className="w-6 h-6 flex-shrink-0" />
      <span className={`text-sm ${highlighted ? 'text-[#533AFD] font-medium' : 'text-gray-700'}`}>{label}</span>
    </div>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }
  return content;
};

export const SectionHeading = ({ label }) => (
  <div className="h-[26px] flex items-center">
    <span className="text-xs text-gray-500 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

// Expandable nav item with sub-items
const ExpandableNavItem = ({ icon, label, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div>
      <div
        className="flex items-center space-x-2 h-[30px] px-1 rounded-md hover:bg-gray-50 cursor-pointer relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {icon && (
          <div className="w-6 h-6 flex items-center justify-center text-gray-500">
            {icon}
          </div>
        )}
        <span className="text-sm text-gray-700 flex-1">{label}</span>
        <div className="w-6 h-6 flex items-center justify-center">
          <Icon name="chevronDown" size="xxsmall" fill="currentColor" className={`w-[8px] h-[8px] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isExpanded && (
        <div className="pb-1">
          {children}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ highlightedItem = 'financialAccounts' }) => {
  const location = useLocation();

  // Helper to check if current path matches
  const isActive = (path) => location.pathname === path;

  return (
    <div className="left-0 top-0 w-[250px] bg-white border-r border-gray-200 flex flex-col h-screen z-10 shrink-0">
      {/* Account Section - Cloudbeds branding */}
      <div className="h-[60px] px-5 flex items-center border-gray-200">
        <div className="flex items-center space-x-2">
          <img src="/cloudbeds-icon.png" alt="Cloudbeds" className="w-6 h-6 rounded" />
          <span className="font-semibold text-gray-800 text-sm">
            Cloudbeds
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-5 py-5 space-y-7">
        {/* Main Navigation */}
        <div className="">
          <NavItem icon={<Icon name="home" size="small" fill="currentColor" />} label="Home" to="/" active={isActive('/')} />
          <NavItem icon={<Icon name="balance" size="small" fill="currentColor" />} label="Balances" to="/balances" active={isActive('/balances')} />
          <NavItem icon={<Icon name="arrowsLoop" size="small" fill="currentColor" />} label="Transactions" to="/transactions" active={isActive('/transactions')} />
          <NavItem icon={<Icon name="person" size="small" fill="currentColor" />} label="Directory" to="/directory" active={isActive('/directory')} />
          <NavItem icon={<Icon name="product" size="small" fill="currentColor" />} label="Product catalog" to="/product-catalog" active={isActive('/product-catalog')} />
        </div>

        {/* Products */}
        <div className="space-y-2">
          <SectionHeading label="Products" />
          <div className="">
            <ExpandableNavItem icon={<Icon name="platform" size="small" fill="currentColor" />} label="Connect" defaultExpanded={true}>
              <SubNavItem
                label="Overview"
                to="/connect"
                highlighted={isActive('/connect')}
              />
              <SubNavItem
                label="Connected accounts"
                to="/connect/accounts"
                highlighted={isActive('/connect/accounts')}
              />
              <SubNavItem label="Accounts to review" />
              <SubNavItem
                label="Embedded finance"
                to="/embedded-finance"
                highlighted={isActive('/embedded-finance')}
              />
              <SubNavItem label="Capital" />
            </ExpandableNavItem>
            <NavItem icon={<Icon name="wallet" size="small" fill="currentColor" />} label="Payments" to="/payments" active={isActive('/payments')} />
            <NavItem icon={<Icon name="invoice" size="small" fill="currentColor" />} label="Billing" to="/billing" active={isActive('/billing')} />
            <NavItem icon={<Icon name="barChart" size="small" fill="currentColor" />} label="Reporting" to="/reporting" active={isActive('/reporting')} />
            <NavItem icon={<Icon name="more" size="small" fill="currentColor" />} label="More" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header = ({ sticky = false, settingsHighlighted = false }) => (
  <div className={`h-[60px] bg-white border-gray-200 px-6 flex items-center justify-between z-10 ${sticky ? 'sticky top-0 w-full' : 'fixed top-0 max-w-[1280px] w-[calc(100%-266px)]'}`}>
    {/* Search */}
    <div className="flex-1 max-w-[500px]">
      <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 cursor-pointer">
        <Icon name="search" size="small" fill="currentColor" />
        <span className="text-sm text-gray-500">Search</span>
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center space-x-6">
      <span className="text-sm font-semibold">Developers</span>
      <span className="text-sm font-semibold">Sandboxes</span>
      <div className="flex items-center space-x-4">
        <Icon name="notifications" size="small" fill="currentColor" />
        <Icon name="settings" size="small" fill="currentColor" />
        <button className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
          <Icon name="add" size="xsmall" fill="#FFFFFF" />
        </button>
      </div>
    </div>
  </div>
);

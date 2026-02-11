# Stripe Dashboard Shell

A reusable React dashboard shell inspired by Stripe's dashboard design. Perfect for quickly bootstrapping admin panels and internal tools.

## Features

- **250px fixed-width sidebar** with navigation items, sections, and expandable menus
- **60px header** with search bar and action buttons
- **Responsive layout** with proper overflow handling
- **Icon system** with commonly used dashboard icons
- **Tailwind CSS** for easy customization

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the dashboard.

## Usage

### Basic Usage

```jsx
import { DashboardShell } from './components/PlatformLayout';

function App() {
  return (
    <DashboardShell>
      <div className="p-8">
        <h1>Your Content Here</h1>
      </div>
    </DashboardShell>
  );
}
```

### With Navigation Items

```jsx
import { DashboardShell } from './components/PlatformLayout';
import { Icon } from './icons/SailIcons';

function App() {
  const navItems = [
    { icon: <Icon name="home" size="small" fill="currentColor" />, label: "Home", to: "/" },
    { icon: <Icon name="balance" size="small" fill="currentColor" />, label: "Balances" },
    { icon: <Icon name="person" size="small" fill="currentColor" />, label: "Customers" },
  ];

  const productItems = [
    { icon: <Icon name="wallet" size="small" fill="currentColor" />, label: "Payments" },
    { icon: <Icon name="invoice" size="small" fill="currentColor" />, label: "Billing" },
  ];

  const logo = (
    <div className="flex items-center space-x-2">
      <img src="/logo.png" alt="Logo" className="w-6 h-6" />
      <span className="font-semibold text-sm">Your App</span>
    </div>
  );

  return (
    <DashboardShell
      sidebar={{ logo, navItems, productItems }}
      header={{ sticky: true }}
    >
      <div className="p-8">Your content</div>
    </DashboardShell>
  );
}
```

### Fully Custom Sidebar

```jsx
import {
  DashboardShell,
  Sidebar,
  NavItem,
  SubNavItem,
  SectionHeading,
  ExpandableNavItem
} from './components/PlatformLayout';

function App() {
  const customSidebar = (
    <Sidebar logo={<YourLogo />}>
      <NavItem icon={<HomeIcon />} label="Home" to="/" />
      <NavItem icon={<UsersIcon />} label="Users" />

      <SectionHeading label="Settings" />
      <ExpandableNavItem icon={<GearIcon />} label="Config" defaultExpanded>
        <SubNavItem label="General" />
        <SubNavItem label="Security" highlighted />
      </ExpandableNavItem>
    </Sidebar>
  );

  return (
    <DashboardShell sidebar={customSidebar}>
      <div className="p-8">Your content</div>
    </DashboardShell>
  );
}
```

## Components

### DashboardShell
The main layout wrapper combining sidebar, header, and content area.

| Prop | Type | Description |
|------|------|-------------|
| `sidebar` | object \| ReactNode | Props for Sidebar or custom component |
| `header` | object \| ReactNode | Props for Header or custom component |
| `children` | ReactNode | Main content area |

### Sidebar
The left navigation sidebar (250px wide).

| Prop | Type | Description |
|------|------|-------------|
| `logo` | ReactNode | Logo/branding area content |
| `navItems` | array | Main navigation items |
| `productItems` | array | Product section items |
| `children` | ReactNode | Full custom content |

### Header
The top header bar (60px tall).

| Prop | Type | Description |
|------|------|-------------|
| `sticky` | boolean | Stick to top on scroll |
| `search` | ReactNode | Custom search component |
| `actions` | ReactNode | Custom action buttons |

### NavItem
A navigation item with icon.

| Prop | Type | Description |
|------|------|-------------|
| `icon` | ReactNode | Icon element |
| `label` | string | Item label |
| `to` | string | React Router path |
| `highlighted` | boolean | Purple highlight color |
| `active` | boolean | Active background state |

### ExpandableNavItem
A collapsible navigation section.

| Prop | Type | Description |
|------|------|-------------|
| `icon` | ReactNode | Section icon |
| `label` | string | Section label |
| `defaultExpanded` | boolean | Start expanded |
| `children` | ReactNode | SubNavItem children |

## Available Icons

The included icon set provides these icons:
- `home`, `balance`, `arrowsLoop`, `person`, `product`
- `platform`, `chevronDown`, `wallet`, `invoice`, `barChart`
- `more`, `search`, `notifications`, `settings`, `add`

```jsx
import { Icon } from './icons/SailIcons';

<Icon name="home" size="small" fill="currentColor" />
```

Sizes: `xxsmall` (8px), `xsmall` (12px), `small` (16px), `medium` (20px), `large` (32px)

## Examples

The app includes three example routes:
- `/` - Basic dashboard with default settings
- `/customized` - Dashboard with custom props
- `/advanced` - Fully customized sidebar with expandable sections

## License

MIT

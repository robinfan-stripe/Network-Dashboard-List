# Stripe Dashboard Template

A React dashboard template to use for prototypes. Built with React, Vite, and Tailwind CSS.

## Getting Started

Click the **"Use this template"** button at the top of this repository to create your own copy. Then clone your new repo and install dependencies:

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the dashboard with component examples.

## Features

- **Components** - Badge, Button, Dialog, Input, Select, Switch, Table, Toggle, Tooltip
- **Semantic color tokens** - Consistent theming with `bg-surface`, `bg-offset`, `text-default`, etc.
- **Routing ready** - React Router setup with individual page files

## Project Structure

```
src/
├── components/
│   ├── PlatformLayout.jsx   # Sidebar, Header, NavItem, SubNavItem
│   ├── Badge.jsx            # Status badges
│   ├── Button.jsx           # Primary, secondary, danger buttons
│   ├── Dialog.jsx           # Modal dialogs
│   ├── Input.jsx            # Input, Select, Textarea, Checkbox, Radio
│   ├── Switch.jsx           # Toggle switches
│   ├── Table.jsx            # Data tables
│   ├── Toggle.jsx           # Selectable toggle cards
│   └── Tooltip.jsx          # Hover tooltips
├── icons/
│   └── SailIcons.jsx        # SVG icon system
├── pages/                   # One file per route
│   ├── Home.jsx
│   ├── Balances.jsx
│   └── ...
├── App.jsx                  # Main layout + routes
├── main.jsx                 # Entry point
└── index.css                # Tailwind theme + custom CSS
```

### Icons

```jsx
import { Icon } from './icons/SailIcons';

<Icon name="home" size="small" fill="currentColor" />
<Icon name="settings" size="medium" fill="#6366f1" />
```

Sizes: `xxsmall` (8px), `xsmall` (12px), `small` (16px), `medium` (20px), `large` (32px)

## Theming

All colors are defined as Tailwind CSS 4 theme variables in `src/index.css`. Use them as standard utility classes:

### Color Tokens

| Token | Class | Value | Usage |
|-------|-------|-------|-------|
| `--color-surface` | `bg-surface` | #ffffff | Page background |
| `--color-offset` | `bg-offset` | #F5F6F8 | Offset sections, hover states |
| `--color-blurple` | `bg-blurple` | #635BFF | Brand purple |
| `--color-border` | `border-border` | #D8DEE4 | Standard borders |
| `--color-default` | `text-default` | #353A44 | Primary text |
| `--color-subdued` | `text-subdued` | #596171 | Secondary text |
| `--color-brand` | `text-brand` | #533AFD | Brand text |

### Usage

```jsx
{/* Background colors */}
<div className="bg-surface">White background</div>
<div className="bg-offset">Gray offset background</div>
<div className="hover:bg-offset">Hover state</div>

{/* Text colors */}
<p className="text-default">Primary text</p>
<p className="text-subdued">Secondary text</p>
<p className="text-brand">Brand colored text</p>

{/* Borders */}
<div className="border border-border">Standard border</div>
```

## Adding New Pages

1. Create a new file in `src/pages/`:

```jsx
// src/pages/MyPage.jsx
export default function MyPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">My Page</h1>
    </div>
  );
}
```

2. Add route in `src/App.jsx`:

```jsx
import MyPage from './pages/MyPage';

<Route path="/my-page" element={<MyPage />} />
```

3. Add navigation item in `src/components/PlatformLayout.jsx`:

```jsx
<NavItem
  icon={<Icon name="product" size="small" fill="currentColor" />}
  label="My Page"
  to="/my-page"
  active={isActive('/my-page')}
/>
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
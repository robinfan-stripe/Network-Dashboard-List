# Stripe Dashboard Shell

A reusable React dashboard shell inspired by Stripe's dashboard design. Perfect for quickly bootstrapping admin panels, internal tools, and prototypes.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the dashboard with component examples.

## Features

- **Stripe-style layout** - 250px sidebar + 60px header + scrollable content area
- **Pre-built components** - Badge, Button, Input, Select, Table, Toggle, Tooltip, and more
- **Dark mode support** - CSS variables automatically switch with `.dark-mode` class
- **Routing ready** - React Router setup with individual page files
- **Responsive** - Components adapt to container width using `@container` queries

## Project Structure

```
src/
├── components/
│   ├── PlatformLayout.jsx   # Sidebar, Header, NavItem, SubNavItem
│   ├── Badge.jsx            # Status badges
│   ├── Button.jsx           # Primary, secondary, danger buttons
│   ├── Input.jsx            # Input, Select, Textarea
│   ├── Table.jsx            # Responsive table with mobile view
│   ├── Toggle.jsx           # Switch toggle
│   ├── ToggleCard.jsx       # Selectable cards
│   └── Tooltip.jsx          # Hover tooltips
├── icons/
│   └── SailIcons.jsx        # SVG icon system
├── pages/                   # One file per route
│   ├── Home.jsx
│   ├── Balances.jsx
│   ├── Transactions.jsx
│   └── ...
├── App.jsx                  # Main layout + routes
├── main.jsx                 # Entry point
└── index.css                # Tailwind + CSS variables
```

## Layout

The main layout in `App.jsx`:

```jsx
<div className="flex flex-col h-screen overflow-hidden">
  <div className="flex flex-row flex-1 min-h-0 bg-white">
    <Sidebar />
    <div className="w-full flex flex-col min-w-0 relative overflow-auto">
      <div className="max-w-[1280px] w-full mx-auto">
        <Header sticky />
        {/* Your content here */}
      </div>
    </div>
  </div>
</div>
```

## Components

### Badge

```jsx
import Badge from './components/Badge';

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

### Button

```jsx
import Button from './components/Button';

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button disabled>Disabled</Button>
<Button icon="add">With Icon</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Input, Select, Textarea

```jsx
import Input, { Select, Textarea } from './components/Input';

<Input
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<Input prefix="$" placeholder="Amount" />
<Input suffix="USD" placeholder="Price" />
<Input error errorMessage="This field is required" />

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>

<Textarea placeholder="Enter message" rows={3} />
```

### Table

```jsx
import Table from './components/Table';

const columns = [
  { key: 'name', header: 'Name', width: 'grow' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status', render: (item) => <Badge>{item.status}</Badge> },
  { key: 'amount', header: 'Amount', align: 'right' },
];

const data = [
  { id: 1, name: 'John', email: 'john@example.com', status: 'Active', amount: '$100' },
];

<Table
  columns={columns}
  data={data}
  onRowClick={(item) => console.log(item)}
  mobileRow={(item, onClick) => (
    <div onClick={onClick} className="p-4 border-b">
      <div className="font-medium">{item.name}</div>
      <div className="text-gray-500">{item.email}</div>
    </div>
  )}
/>
```

### Toggle

```jsx
import Toggle from './components/Toggle';

<Toggle
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Enable feature"
/>
```

### ToggleCard

```jsx
import ToggleCard, { ToggleCardGroup } from './components/ToggleCard';

<ToggleCardGroup label="Select an option">
  <ToggleCard
    title="Option A"
    description="Description for option A"
    selected={selected === 'a'}
    onClick={() => setSelected('a')}
  />
  <ToggleCard
    title="Option B"
    description="Description for option B"
    selected={selected === 'b'}
    onClick={() => setSelected('b')}
  />
</ToggleCardGroup>
```

### Tooltip

```jsx
import Tooltip from './components/Tooltip';

<Tooltip content="Helpful information" placement="top">
  <Button>Hover me</Button>
</Tooltip>

<Tooltip content="Quick tip" variant="minimal">
  <span>Hover for tip</span>
</Tooltip>
```

### Icons

```jsx
import { Icon } from './icons/SailIcons';

<Icon name="home" size="small" fill="currentColor" />
<Icon name="settings" size="medium" fill="#6366f1" />
```

Available icons: `add`, `home`, `balance`, `arrowsLoop`, `person`, `product`, `platform`, `chevronDown`, `wallet`, `invoice`, `barChart`, `more`, `search`, `notifications`, `settings`

Sizes: `xxsmall` (8px), `xsmall` (12px), `small` (16px), `medium` (20px), `large` (32px)

## CSS Variables

All colors use CSS variables for easy theming. Edit `src/index.css` to customize:

```css
:root {
  /* Backgrounds */
  --bg: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-offset: #F5F6F8;
  --bg-hover: #f9fafb;

  /* Text */
  --text-primary: #010101;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;

  /* Borders */
  --border: #e5e7eb;

  /* Badges */
  --badge-success-bg: #EAFCDD;
  --badge-success-text: #217005;
  --badge-warning-bg: #FDF8C9;
  --badge-warning-text: #B13600;
  --badge-danger-bg: #FEF4F6;
  --badge-danger-text: #C0123C;
  --badge-info-bg: #E2FBFE;
  --badge-info-text: #045AD0;
  /* ... and more */
}
```

### Dark Mode

Add the `dark-mode` class to any parent element to enable dark theme:

```jsx
<div className="dark-mode">
  {/* All children use dark mode colors */}
</div>
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

## Customizing the Sidebar

Edit the `Sidebar` component in `src/components/PlatformLayout.jsx`:

- Change the logo/branding in the header section
- Add/remove navigation items
- Modify the expandable "Connect" section or create new expandable sections

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Router 7

## License

MIT

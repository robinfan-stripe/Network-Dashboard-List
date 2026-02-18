# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

## Architecture

Stripe-style dashboard shell built with React 19, Vite 7, and Tailwind CSS 4. Provides a sidebar + header layout for admin panels and internal tools.

### Layout Structure

The layout uses fixed positioning with a max-width constraint:
- **Sidebar**: 250px fixed left (`w-sidebar-width`), uses `bg-surface`
- **Header**: 60px fixed top, content constrained to `max-w-[1280px]`, uses `bg-surface`
- **Content**: Scrollable area with `max-w-[1280px]` centered

Both header and content share the same max-width so they align visually. The root div in `App.jsx` has `min-h-screen bg-surface` to ensure full-page background coverage.

### Key Files

- **`src/components/PlatformLayout.jsx`**: Sidebar, Header, NavItem, SubNavItem, ExpandableNavItem
- **`src/components/ControlPanel.jsx`**: Floating prototype controls panel (dark mode toggle, context dialog, draggable)
- **`src/icons/SailIcons.jsx`**: SVG icon system with sizes: xxsmall(12px)/xsmall(14px)/small(16px)/medium(20px)/large(24px)
- **`src/index.css`**: Tailwind CSS 4 `@theme` block with all color tokens + dark mode overrides

### Theming

**Always use semantic color tokens** from `src/index.css` instead of hardcoded values like `gray-500` or `#ccc`. This is critical for dark mode support — hardcoded colors will not adapt.

| Token | Usage |
|-------|-------|
| `bg-surface` | Page background |
| `bg-offset` | Offset sections, hover states |
| `bg-blurple` | Brand purple |
| `text-default` | Primary text |
| `text-subdued` | Secondary text |
| `text-brand` | Brand purple text |
| `border-border` | Standard borders |

Additional tokens exist for buttons (`button-primary-*`, `button-secondary-*`), badges (`badge-success-*`, `badge-warning-*`, etc.), and icons (`icon-default`, `icon-subdued`, `icon-brand`).

### Dark Mode

Dark mode is managed at the App level via a `darkMode` state boolean. When active, a `dark` CSS class is applied to the root div, which overrides all `--color-*` custom properties in `src/index.css`. The `body:has(.dark)` rule in CSS ensures the body background also updates.

**Never use `bg-white` or other non-token colors** in components — use `bg-surface` instead so dark mode works correctly.

### Prototype Control Panel

`src/components/ControlPanel.jsx` contains a floating panel for toggling prototype states (dark mode, context dialogs, etc.). **All future prototype controls should be added here.** The file is organized into sections:

- **Primitives**: `ControlPanelButton`, `ControlPanelHeader`, `ControlPanelBody` — reusable panel shell components
- **Drag hook**: `useDragSnap()` — handles drag-to-snap positioning (bottom-left or bottom-right)
- **Sections**: `InfoBanner`, `ContextDialog` — content pieces, easy to add to
- **Main component**: Composes everything; add new controls as children of `<ControlPanelBody>`

The panel uses `z-[100]`. Dialogs use `z-50` by default. The context dialog uses `overlayClassName="z-[101]"` to appear above the panel — this is the only dialog that should render above the controls.

### Component Library

Available components in `src/components/`:
- **Button**: `variant` (primary/secondary/danger), `size` (sm/md/lg), `icon`
- **Badge**: `variant` (default/success/warning/danger/info)
- **Dialog**: `size` (small/medium/large/xlarge/full), `overlayClassName` for z-index control
- **Input, Textarea, Select, Checkbox, Radio**: Form controls with `label`, `description`, `error`, `errorMessage`
- **Switch**: Toggle with `checked`, `onChange`, `label`
- **Table**: `columns` (with `key`, `header`, `render`, `width`), `data`, `onRowClick`, `isLoading`
- **Toggle/ToggleGroup**: Card-style selectors with `selected`, `layout` (vertical/horizontal)
- **Tooltip**: `placement` (top/bottom/left/right), `variant` (default/minimal)

### Adding New Pages

1. Create page file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add NavItem/SubNavItem in `src/components/PlatformLayout.jsx` with `to` prop and `isActive()` check

### Tech Stack

- React 19 with React Router 7
- Vite 7 with `@tailwindcss/postcss` plugin
- Tailwind CSS 4

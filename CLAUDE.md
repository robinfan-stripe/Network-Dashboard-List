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
- **Sidebar**: 250px fixed left (`w-sidebar-width`)
- **Header**: 60px fixed top, content constrained to `max-w-[1280px]`
- **Content**: Scrollable area with `max-w-[1280px]` centered

Both header and content share the same max-width so they align visually.

### Key Files

- **`src/components/PlatformLayout.jsx`**: Sidebar, Header, NavItem, SubNavItem, ExpandableNavItem
- **`src/icons/SailIcons.jsx`**: SVG icon system with sizes: xxsmall/xsmall/small/medium/large
- **`src/index.css`**: Tailwind CSS 4 `@theme` block with all color tokens

### Theming

**Always use semantic color tokens** from `src/index.css` instead of hardcoded values like `gray-500` or `#ccc`.

| Token | Usage |
|-------|-------|
| `bg-surface` | Page background (#ffffff) |
| `bg-offset` | Offset sections, hover states (#F5F6F8) |
| `bg-blurple` | Brand purple (#635BFF) |
| `text-default` | Primary text (#353A44) |
| `text-subdued` | Secondary text (#596171) |
| `text-brand` | Brand purple text (#533AFD) |
| `border-border` | Standard borders (#D8DEE4) |

Additional tokens exist for buttons (`button-primary-*`, `button-secondary-*`), badges (`badge-success-*`, `badge-warning-*`, etc.), and icons (`icon-default`, `icon-subdued`, `icon-brand`).

### Adding New Pages

1. Create page file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add NavItem/SubNavItem in `src/components/PlatformLayout.jsx` with `to` prop and `isActive()` check

### Tech Stack

- React 19 with React Router 7
- Vite 7 with `@tailwindcss/postcss` plugin
- Tailwind CSS 4

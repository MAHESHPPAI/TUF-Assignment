# 📅 Calendar — Interactive Wall Calendar Component

> An interactive wall calendar built with **React 19 + Vite**, featuring cinematic hero imagery, fluid date-range selection, micro-journaling, and a curated sensorial design system.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-FF0055?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Live Demo & Video](#live-demo--video)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Component Breakdown](#component-breakdown)
- [State Management](#state-management)
- [Styling Approach](#styling-approach)
- [Responsive Design](#responsive-design)
- [Creative Extras (Beyond Core Requirements)](#creative-extras-beyond-core-requirements)
- [Performance Considerations](#performance-considerations)
- [Data Persistence](#data-persistence)
- [Browser Support](#browser-support)

---

## Overview

Calendar is a high-fidelity, interactive React calendar component inspired by the aesthetic of a physical wall calendar. It was built for the **TUF Frontend Engineering Challenge** and goes beyond the baseline requirements to deliver an editorial-grade, sensorial interface.

The design philosophy draws from **Modernist typography** and **cinematic landscape photography**, treating the calendar as a piece of visual storytelling — each month has its own curated color palette, hero image, and ambient mood that transitions fluidly as the user navigates.

---

## Live Demo & Video

| Resource | Link |
|----------|------|
| 🌐 Live Demo | https://tuf-assignment1234.netlify.app/ |
| 🎬 Video Walkthrough | https://youtu.be/I-XSDmNZjcc |

---

## Features

### ✅ Core Requirements (All Implemented)

| Requirement | Implementation |
|---|---|
| **Wall Calendar Aesthetic** | Full-bleed cinematic hero image paired with a clean date grid. Topographic SVG overlays and editorial grid lines reinforce the physical-calendar feel. |
| **Day Range Selector** | Two-click range selection with three distinct visual states: **start date** (solid accent pill), **end date** (solid accent pill), and **in-between days** (tinted accent band). Includes a live hover-preview that highlights the tentative range before confirming. |
| **Integrated Notes Section** | A micro-journaling notepad tied to the selected date/range. Notes are persisted to `localStorage` per unique date-range key. Features ruled-line visual treatment, character count, and an empty-state overlay with instructions. |
| **Fully Responsive Design** | Desktop uses a side-by-side split layout (42% hero / 58% interactive). Mobile collapses to a vertical stack with touch-optimized tap targets. Three breakpoints: `<768px`, `768–1024px`, `>1024px`. |

### ✨ Creative Extras

| Feature | Description |
|---|---|
| **12 Curated Monthly Themes** | Each month ships its own color palette and cinematic hero image. Accent colors animate fluidly via Framer Motion CSS variable interpolation. |
| **Mouse-Tracked Parallax** | The hero image subtly shifts with cursor position using spring-physics motion values — bypassing React state entirely for 60 FPS performance. |
| **Synthesized Mechanical Audio** | Web Audio API generates real-time "thud" (low-frequency sine) and "tick" (high-frequency square) sounds on date selection and hover, emulating a physical calendar's tactile feedback. Togglable via a sound button. |
| **Light / Dark Mode** | Full theme toggle with OLED-grade pure black dark mode. CSS custom properties swap via a `data-theme` attribute on `<html>`. |
| **Staggered Grid Animations** | Date cells enter with a cascading vertical stagger using Framer Motion's `staggerChildren` orchestration. Month transitions use `AnimatePresence` for clean exit/enter cycles. |
| **Cinematic Image Crossfades** | Hero images crossfade with an 800ms quint easing via `AnimatePresence mode="popLayout"`. Adjacent month images are preloaded to eliminate jank. |
| **Paper Grain Texture** | A subtle SVG fractal-noise overlay on `<body>` simulates physical paper texture. Blend mode flips between `multiply` (light) and `screen` (dark). |
| **Liquid Pill Range Rendering** | The selected range renders as a continuous "pill" strip using inline `borderRadius` calculations per cell — edges get rounded caps, mid-range cells are flat, and row boundaries restart the rounding. |
| **Selection Badge** | An animated badge below the grid displays the confirmed date range with smooth enter/exit transitions. |
| **Editorial Grid Lines** | Faint rule-of-thirds grid lines overlay the hero image, mimicking photographic composition guides. |

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | React 19.2 | Latest features, excellent DX, hooks-first architecture |
| **Build Tool** | Vite 8.0 | Near-instant HMR, native ESM, minimal config |
| **Animation** | Framer Motion 12.x | Declarative layout animations, spring physics, `AnimatePresence` for mount/unmount orchestration |
| **Date Logic** | date-fns 4.x | Tree-shakeable, immutable date utilities — no bloated moment.js dependency |
| **Icons** | Lucide React 1.7 | Consistent, lightweight SVG icon set (ChevronLeft, ChevronRight, Sun, Moon, Volume2, VolumeX) |
| **Utilities** | clsx 2.x | Conditional className composition |
| **Styling** | CSS Modules + CSS Custom Properties | Scoped styles with zero runtime CSS-in-JS overhead; design tokens via custom properties |
| **Audio** | Web Audio API (native) | Zero-dependency synthesized sound effects using oscillators and filters |
| **Persistence** | localStorage | Client-side note storage keyed by date range — no backend required |
| **Linting** | ESLint 9 + react-hooks + react-refresh | Code quality enforcement with modern flat config |

---

## Architecture & Design Decisions

### Why CSS Modules over Tailwind/Styled-Components?

CSS Modules were chosen for **zero runtime overhead** and **true style encapsulation**. Each component gets its own `.module.css` file with locally-scoped class names, preventing style collisions without the cognitive overhead of utility classes or the bundle-size cost of CSS-in-JS. The global design system in `index.css` uses CSS custom properties as the single source of truth for colors, shadows, radii, and motion curves.

### Why Framer Motion for Animations?

Framer Motion provides **declarative animation orchestration** that would require significant manual work with vanilla CSS. Key capabilities leveraged:
- `AnimatePresence` for mount/unmount transitions (month crossfades, badge enter/exit)
- `useMotionValue` + `useSpring` + `useTransform` for GPU-accelerated parallax that bypasses React's render cycle
- CSS variable animation via `motion.main`'s `animate` prop for seamless accent color transitions
- `staggerChildren` orchestration for the cascading grid entry effect

### Why date-fns over Day.js/Moment?

date-fns is **fully tree-shakeable** — only the functions actually imported end up in the bundle. Used functions: `format`, `addMonths`, `subMonths`, `startOfWeek`, `addDays`, `startOfMonth`, `isSameMonth`, `isSameDay`, `isWithinInterval`, `isBefore`, `isToday`.

### Why Web Audio API for Sound?

Instead of loading audio files, sounds are **synthesized at runtime** using the Web Audio API's `OscillatorNode`, `GainNode`, and `BiquadFilterNode`. This means:
- Zero network requests for audio assets
- Sub-millisecond latency
- Precise control over attack/decay envelopes
- Tiny bundle footprint (~2.5 KB for the entire audio hook)

### State Management: Context API (No Redux/Zustand)

Given the component's focused scope, React's built-in `createContext` + `useContext` provides clean state sharing without external dependencies. The `CalendarProvider` manages:
- Current month navigation
- Date range selection (start/end/hover)
- Theme (light/dark)
- Active monthly theme data

---

## Project Structure

```
├── index.html                        # Entry HTML — SEO meta, Google Fonts preconnect
├── vite.config.js                    # Vite config with React plugin
├── package.json                      # Dependencies & scripts
├── eslint.config.js                  # ESLint 9 flat config
│
├── public/
│   ├── favicon.svg                   # Custom SVG favicon
│   └── icons.svg                     # SVG sprite sheet
│
└── src/
    ├── main.jsx                      # React DOM entry point (StrictMode)
    ├── index.css                     # 🎨 Global design system (tokens, reset, dark mode)
    ├── App.jsx                       # Root layout — split-screen orchestration
    ├── App.module.css                # Layout CSS (hero 42% | interactive 58%)
    ├── App.css                       # Legacy/utility styles
    │
    ├── assets/                       # Monthly hero images (local PNGs)
    │   ├── jan.png                   # Winter Alpine
    │   ├── feb.png                   # Brutalist Ice
    │   ├── mar.png                   # Misty Forest
    │   ├── apr.png                   # Dark Condensation
    │   ├── jul.png                   # Arid Dunes
    │   └── sep.png                   # Oxidized Steel
    │
    ├── config/
    │   └── themeData.js              # 12-month theme registry (images + palettes)
    │
    ├── context/
    │   └── CalendarProvider.jsx      # Global calendar state (Context API)
    │
    ├── hooks/
    │   ├── useJournal.js             # localStorage-backed note persistence
    │   └── useMechanicalAudio.js     # Web Audio synthesizer (thud + tick)
    │
    └── components/
        ├── CalendarGrid/
        │   ├── CalendarGrid.jsx      # Date grid, range selection, nav controls
        │   └── CalendarGrid.module.css
        │
        ├── CalendarHero/
        │   ├── CalendarHero.jsx      # Parallax hero with crossfade + typography
        │   └── CalendarHero.module.css
        │
        ├── JournalPanel/
        │   ├── JournalPanel.jsx      # Micro-journaling notepad
        │   └── JournalPanel.module.css
        │
        └── CustomCursor/             # (Reserved — custom cursor component)
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn/pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/TUF-Assignment.git
cd TUF-Assignment

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`** (or the next available port).

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Component Breakdown

### `CalendarHero`
The cinematic anchor of the calendar. Renders a full-bleed hero image that:
- **Parallax-shifts** with mouse movement using `useMotionValue` → `useSpring` → `useTransform`, keeping motion on the GPU via Framer Motion's transform pipeline (no React re-renders).
- **Crossfades** between monthly images using `AnimatePresence mode="popLayout"` with 800ms quint easing.
- Overlays a **gradient scrim** for text readability, **topographic SVG paths** using the month's accent color, and **editorial grid lines** (rule-of-thirds).
- Displays the month name and year with staggered entrance animations.

### `CalendarGrid`
The interactive heart of the component. Handles:
- **42-cell grid** (6 weeks × 7 days) generated from `date-fns`, starting weeks on Monday.
- **Two-click range selection**: First click sets the start date, second click sets the end date. Clicking an already-selected start date clears the selection. If the second click is before the start, the range is intelligently swapped.
- **Hover preview**: When a start date is selected and the user hovers over future dates, a translucent preview ribbon shows the tentative range in real-time.
- **Liquid pill rendering**: Inline `borderRadius` is computed per cell based on its position (start/end/mid-range/row-edge) to create continuous rounded pill strips that gracefully wrap across row boundaries.
- **Navigation controls**: Previous/Next month buttons with animated month title transitions.
- **Toolbar**: Sound toggle (Volume2/VolumeX icons), Theme toggle (Sun/Moon icons), and a visual divider separating utility controls from navigation.
- **Selection badge**: An `AnimatePresence`-driven badge below the grid shows the confirmed date range.

### `JournalPanel`
A micro-journaling notepad that:
- Displays the **selected date/range** as a heading, dynamically formatted.
- Shows an **empty-state overlay** with a calendar icon and instructions when no date is selected.
- Renders a `<textarea>` with **ruled-line visual treatment** (8 decorative `<div>` lines aligned to the text's `line-height`).
- Persists notes to `localStorage` via the `useJournal` hook, keyed by the exact date range (e.g., `journal_2026-04-09_2026-04-15`).
- Includes a **character count** that appears when text is entered.
- Features a **paper texture** noise overlay using an inline SVG filter.

---

## State Management

All shared state lives in `CalendarProvider` (React Context):

```
CalendarProvider
├── currentMonth          — Date object for the displayed month
├── selectedStart         — Start of the selected range (or single date)
├── selectedEnd           — End of the selected range
├── hoveredDate           — Currently hovered date (for preview ribbon)
├── theme                 — 'light' | 'dark'
├── activeTheme           — Derived from themeData[currentMonth.getMonth()]
│
├── nextMonth()           — Navigate forward
├── prevMonth()           — Navigate backward
├── selectDate(date)      — Smart range selection logic
├── clearSelection()      — Reset all selection state
├── toggleTheme()         — Flip light ↔ dark
└── setHoveredDate(date)  — Update hover target
```

**Range selection logic** (in `selectDate`):
1. If no start is set, or both start and end are already set → set the clicked date as the new start, clear end.
2. If clicking the same date as the start → clear both.
3. If clicking a date before the start → swap: clicked date becomes start, old start becomes end.
4. Otherwise → set clicked date as end.

---

## Styling Approach

### Design System (`index.css`)

A comprehensive CSS custom property system defines the visual language:

- **Color tokens**: `--color-ink`, `--color-paper`, `--color-accent-*`, `--color-gray-100`→`--color-gray-600`
- **Shadow scale**: `--shadow-xs` → `--shadow-lg` (plus `--shadow-neon` in dark mode)
- **Border radii**: `--radius-sm` → `--radius-pill`
- **Motion curves**: `--ease-out-expo`, `--ease-in-out-quint`
- **Typography**: Space Grotesk (300–700) via Google Fonts
- **Dark mode**: All tokens are remapped under `html[data-theme="dark"]`, including OLED-optimized pure black backgrounds

### Scoped Styles (CSS Modules)

Each component has a co-located `.module.css` file. Class names are locally scoped at build time (e.g., `.heroContainer` → `CalendarHero_heroContainer_x7k2`), eliminating global namespace pollution.

### Dynamic Accent Colors

The accent color system is animated per-month via Framer Motion:
```jsx
<motion.main
  animate={{
    "--color-accent": activeTheme.palette.base,
    "--color-accent-hover": activeTheme.palette.hover,
    "--color-accent-light": activeTheme.palette.light,
    ...
  }}
  transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
/>
```
This allows CSS custom properties to animate smoothly between months — something not possible with vanilla CSS transitions on custom properties (without `@property`).

---

## Responsive Design

| Breakpoint | Layout | Details |
|---|---|---|
| **< 768px** (Mobile) | Vertical stack | Hero (50vh) → Grid (full width) → Journal (full width). Touch-optimized 48px tap targets. |
| **768–1024px** (Tablet) | Vertical stack | Larger hero typography, increased SVG overlay height. |
| **> 1024px** (Desktop) | Side-by-side split | Hero (42% left) · Grid + Journal (58% right, scrollable). Journal separated by a vertical border. Grid and Journal sit side-by-side within the interactive panel. |

Key responsive techniques:
- **Flexbox direction flipping** (`column` → `row` at 1024px)
- **Viewport-relative hero height** (`50vh` mobile → `100vh` desktop)
- **Proportional flex ratios** (Grid `flex: 1.6`, Journal `flex: 1`)
- **Clamped typography** via media query font-size steps (not fluid `clamp()`)

---

## Performance Considerations

| Technique | Impact |
|---|---|
| **Motion values bypass React state** | Parallax uses `useMotionValue` → `useSpring` — mouse tracking never triggers a React re-render |
| **Image preloading** | Adjacent month images are preloaded via `new Image()` in a `useEffect` to prevent crossfade jank |
| **CSS Modules** | Zero runtime CSS overhead — styles are extracted at build time |
| **date-fns tree shaking** | Only imported functions are bundled (~5 KB vs ~70 KB for moment.js) |
| **Web Audio synthesis** | No audio file downloads; sounds are generated from oscillator nodes in real-time |
| **`will-change: transform`** | Applied to the parallax image wrapper to promote it to a GPU compositing layer |
| **Memoized computations** | `weekDays`, `days`, and `effectiveEnd` are wrapped in `useMemo` to avoid recalculation |
| **useCallback everywhere** | All event handlers and state updaters are wrapped in `useCallback` to maintain referential stability |

---

## Data Persistence

Notes are stored in **`localStorage`** with composite keys:

| Selection | Key Format | Example |
|---|---|---|
| Single date | `journal_YYYY-MM-DD` | `journal_2026-04-09` |
| Date range | `journal_YYYY-MM-DD_YYYY-MM-DD` | `journal_2026-04-09_2026-04-15` |

- Notes auto-save on every keystroke (controlled via `useEffect` in `useJournal`).
- Empty notes are cleaned up (key is removed from storage).
- No backend, no API calls — fully client-side.

---

## Browser Support

| Browser | Status |
|---|---|
| Chrome / Edge (Chromium) | ✅ Full support |
| Firefox | ✅ Full support |
| Safari 15+ | ✅ Full support (webkit AudioContext polyfill included) |
| Mobile Safari (iOS) | ✅ Touch-optimized |
| Mobile Chrome (Android) | ✅ Touch-optimized |

> **Note:** Web Audio API requires a user interaction (click/tap) before audio playback is allowed — this is handled automatically by `initAudio()` on first interaction.

---

## 📜 License

MIT — feel free to use, modify, and distribute.

---

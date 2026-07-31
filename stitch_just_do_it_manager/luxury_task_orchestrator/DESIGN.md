---
name: Luxury Task Orchestrator
colors:
  surface: '#11131b'
  surface-dim: '#11131b'
  surface-bright: '#373942'
  surface-container-lowest: '#0c0e16'
  surface-container-low: '#191b23'
  surface-container: '#1d1f28'
  surface-container-high: '#282a32'
  surface-container-highest: '#33343d'
  on-surface: '#e1e1ed'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#e1e1ed'
  inverse-on-surface: '#2e3039'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#ffeac0'
  on-tertiary: '#3e2e00'
  tertiary-container: '#fec931'
  on-tertiary-container: '#6f5500'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdf96'
  tertiary-fixed-dim: '#f3bf26'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#11131b'
  on-background: '#e1e1ed'
  surface-variant: '#33343d'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.5'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for high-stakes productivity, targeting executives and professionals who require an environment of focus and prestige. The aesthetic is a fusion of **Corporate Modern** and **Minimalism**, utilizing a "Dark Mode First" philosophy to reduce cognitive load and evoke a sense of exclusive, high-end tooling. 

The emotional response should be one of "command and control"—quietly powerful, ultra-responsive, and meticulously organized. The interface avoids loud decorative elements, relying instead on precision, ample negative space, and the rhythmic application of premium materials.

**Visual Principles:**
- **Refinement:** Every pixel serves a functional purpose.
- **Depth:** Surfaces are layered using tonal shifts rather than heavy shadows.
- **Focus:** High-contrast accents (Cyan/Gold) are reserved strictly for primary actions and critical status updates.

## Colors

The palette is built on a foundation of "Midnight" and "Deep Charcoal" to provide a sophisticated alternative to pure black.

- **Primary (Electric Cyan):** Used for active states, progress indicators, and primary action buttons. It provides a modern, high-tech contrast against the dark base.
- **Secondary (Burnished Gold):** Reserved for "Premium" features, high-priority task indicators, or "VIP" identifiers. Use sparingly to maintain its value.
- **Neutrals:**
    - `background_deep`: The base canvas layer.
    - `surface_charcoal`: Used for primary cards and sidebars.
    - `surface_slate`: Used for hover states, input backgrounds, and dividers.

## Typography

The typography system leverages **Inter** for its exceptional legibility in dark interfaces and its modern, neutral character. 

**Arabic Implementation:**
Since the target language is Arabic, the design system must ensure line heights are increased by approximately 20% compared to standard Latin defaults to accommodate the script's ascenders and descenders. Text alignment is strictly **Right-to-Left (RTL)**.

**Hierarchy Rules:**
- Titles use medium to semi-bold weights to stand out against dark backgrounds.
- Body text uses a slightly desaturated slate gray to prevent "visual vibration" on high-contrast screens.
- Labels use uppercase (for Latin characters) or increased weight (for Arabic) to denote metadata.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with a strict 8px baseline rhythm. 

- **Desktop:** 12-column grid with 24px gutters. Content is housed in a centered container with a max-width of 1440px.
- **Tablet:** 8-column grid with 20px gutters and 24px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

**RTL Layout Logic:**
The layout direction is flipped. Sidebars appear on the right, and the "back" navigation points to the right. Priority is given to the top-right corner as the primary focal point for task headings and user profiles.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Subtle Outlines** rather than traditional heavy shadows.

- **Level 0 (Background):** `#0A0B10` — The lowest depth.
- **Level 1 (Cards/Sidebar):** `#1A1D26` — Raised using a 1px border of `#2C313C` to define edges.
- **Level 2 (Modals/Popovers):** `#242832` — Elevated with a soft, 20% opacity black shadow (0px 8px 24px) and a subtle Cyan inner-glow (0.5px top-border).
- **Interactive Depth:** When a card is hovered, it should shift from its base color to a slightly lighter slate and increase the shadow spread to suggest it is "lifting" toward the user.

## Shapes

The shape language is **Soft** and architectural. 
- **Standard Radius:** 4px (0.25rem) for inputs and small buttons. This conveys precision and professional rigor.
- **Large Radius:** 8px (0.5rem) for cards and main containers.
- **Extra Large:** 12px (0.75rem) for modals and onboarding hero elements.

Avoid fully rounded "pill" shapes unless used for status chips (e.g., "In Progress"), to maintain a sophisticated, structured look.

## Components

### Buttons
- **Primary:** Solid Cyan (`#00E5FF`) background with dark charcoal text. No shadow in rest state; subtle cyan outer-glow on hover.
- **Secondary:** Transparent background with a 1px Gold (`#D4AF37`) border. Used for "Add New" or "Upgrade" actions.
- **Ghost:** No border or background. Becomes `surface_slate` on hover.

### Input Fields
Inputs use a "floating label" or "minimalist underline" style. The background is a slightly darker shade than the card it sits on. On focus, the border transitions from slate to Cyan, and the text caret is Cyan.

### Cards
Cards are the primary container for tasks. They feature a 1px border (`#2C313C`). Task priority is indicated by a thin 3px vertical stripe on the **right-hand side** of the card (RTL preference).

### Lists & Navigation
List items feature a 24px horizontal padding. The active state in the sidebar is indicated by a Cyan vertical bar on the right edge and a subtle `#1A1D26` background tint.

### Sophisticated Elements
- **Glassmorphic Overlays:** Use a `backdrop-filter: blur(12px)` for navigation bars that scroll over content.
- **Micro-interactions:** Checkboxes should have a bespoke "draw" animation in Cyan when marked complete.
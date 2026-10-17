# Campus-Cart Design System (v2)

This document describes the UI/UX upgrade. All of it is plain HTML5, CSS3 and vanilla JavaScript.

## 1. Inspiration and how it was used

Dribbble (https://dribbble.com/) was searched for e-commerce inspiration. The search returned collection and profile listing pages. Their text gave shot titles and tags, for example "Product card + catalog", "E-commerce Product Page UX/UI Design", "eCommerce product card", "Day 002 - Product Card" and "Daily UI 002 Checkout form". **The shot images themselves could not be opened or viewed in the environment used to build this upgrade**, so no layout was copied or traced. Instead, the common patterns those titles describe were adapted to Campus-Cart's own brand and content:

| Pattern seen in the listings | How it was adapted |
|---|---|
| Product card with a clean photo, tag row, price and one clear action | `.card` with a 4:3 photo, a `.card-tags` row, a highlighter-style price and a full-width add button |
| Catalogue with filter bar | `.toolbar` with search, category, condition and sort in one rounded panel |
| Minimal sticky header with a cart counter | Sticky `.topbar`, pill menu links and a live `.cart-badge` that animates when an item is added |
| Checkout form with a visible progress guide | `.checkout-steps` four-step guide above the order summary |
| Trust points under a hero | `.trust-strip` with four facts that were already on the site |

## 2. Brand tokens

The brand colours are unchanged: navy, yellow, light grey and white. The tokens at the start of "Design System v2" in `assets/css/styles.css` refine them.

| Token | Value | Use |
|---|---|---|
| `--navy` | `#0d1b3e` | Text, header, footer, primary dark surfaces |
| `--navy-light` / `--navy-dark` | `#17295c` / `#08142f` | Gradients and depth |
| `--yellow` | `#ffd23f` | Primary buttons, highlights, focus rings |
| `--yellow-soft` | `#fff7d6` | Notice boxes |
| `--grey` / `--grey-light` | `#f2f3f5` / `#f8f9fb` | Section and panel backgrounds |
| `--grey-mid` / `--line` | `#d5dae3` / `#dfe3ea` | Borders |
| `--grey-dark` | `#4b5675` | Muted text |
| `--success` / `--warning` / `--danger` | `#1b6e2d` / `#8a5a00` / `#b3261e` | Stock status and form errors |

Yellow is never used as text on white. Where it used to be (labels, prices, links) the text is navy, and yellow is used as a background highlight instead.

## 3. Components

- **Header and navigation**: sticky, soft shadow after scrolling, pill links, a large mobile menu panel, an order button with an animated count, and a skip link for keyboard users.
- **Hero and breadcrumbs**: gradient banner with a soft glow, framed photo, and a breadcrumb trail on every inner page.
- **Buttons**: one shape, a 48px minimum height, lift on hover, pressed and disabled states.
- **Cards**: hover lift, slow photo zoom, shimmer while the photo loads, and grey skeleton cards while the product list loads.
- **Forms**: 48px fields, a visible navy border with a yellow focus halo, a custom select arrow, a search icon, and red error messages with an exclamation mark so errors are not shown by colour alone.
- **Tabs**: a segmented control that scrolls sideways on small screens.
- **Feedback**: toast messages with a tick, empty states, loading skeletons, a back-to-top button and a cart count animation.
- **Footer**: yellow top rule, uppercase column headings and clear link hover states.

## 4. Accessibility

- Visible focus ring that works on white and navy (yellow ring with a navy inner ring).
- Skip link, `main` landmark target, breadcrumb landmark, ordered heading levels in the footer.
- Touch targets of at least 44px for menu links and 48px for buttons and fields.
- Motion is switched off by the existing `prefers-reduced-motion` rules.
- Automated check with axe-core: no colour-contrast, label or keyboard failures on any page at desktop and phone sizes. One moderate best-practice note remains (see `docs/TESTING.md`).

## 5. Responsive behaviour

Breakpoints are the existing 1000px, 850px, 620px and 380px. The upgrade adds: two-column trust strip and checkout steps on tablets, one column on phones, stacked filter fields, full-width add buttons, a sideways-scrolling sub-navigation, and a smaller back-to-top button.

# Campus-Cart Testing Documentation

Testing of the UI/UX upgrade was carried out on 13 October 2026 against the built site, served from a local web server. Automated checks used a headless Chromium browser (Playwright) and the axe-core accessibility engine. These tools were used only to test. **None of them is part of the project**, and the project contains no Python, Node or other non-web code.

## 1. Automated checks and results

| Check                                                                                                            | Scope                                                                                         | Result                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| JavaScript syntax (`node --check`)                                                                               | all 7 files in `assets/js/`                                                                   | Pass                                                                                                                        |
| JavaScript lint (ESLint recommended rules)                                                                       | `script.js`, `forms.js`, `features.js`, `game.js`, `consent.js`, `ui.js`                      | No errors                                                                                                                   |
| CSS lint (unknown properties, units, invalid hex colours, unknown at-rules, duplicate declarations in one block) | `styles.css`                                                                                  | No errors                                                                                                                   |
| HTML validation (html-validate)                                                                                  | 12 pages (home, 404 and 10 inner pages)                                                       | 0 errors, 3 warnings (`role="region"` on a `div` where `<section>` could be used)                                           |
| Structure audit                                                                                                  | 12 pages                                                                                      | No mismatched or unclosed tags, no duplicate ids, no broken internal links or anchors, no missing scripts, styles or images |
| Accessibility (axe-core, WCAG 2.0 and 2.1 A and AA plus best practices)                                          | 11 pages (all except the 404 game page) at desktop (1280px) and phone (375px) widths, 22 runs | 0 violations in all 22 runs                                                                                                 |
| End-to-end browser tests                                                                                         | 65 checks                                                                                     | 65 passed, 0 failed                                                                                                         |

### What the 65 end-to-end checks cover

1. **Every page at 375px, 820px and 1280px**: no sideways scrolling, no console or script errors, no failed local requests, no broken images (36 checks: 12 pages at 3 sizes). The About page photo is hosted by LinkedIn and was unreachable in the test sandbox, so the check also confirms the initials fallback appears.
2. **Mobile menu**: hidden at first, the Menu button opens it, links are at least 44px tall, Escape closes it.
3. **Keyboard**: the first Tab stops on the skip link, it becomes visible, and Enter moves focus to the main content.
4. **Header and scrolling**: header shadow after scrolling, back-to-top button appears and returns to the top, a sub-navigation anchor lands below the sticky header and bar.
5. **Shop**: tab switching, six cards at first, See more adds six, See less returns to six, category filter, search, empty state, add to order (count and badge animation and toast), quick view opens and closes with Escape.
6. **Checkout**: the order table shows the added item and the four-step guide is present.
7. **Enquiry form**: invalid input shows a red error message, and the submit button stays locked until the form is valid.
8. **Cookie banner**: shows on a first visit and fits a phone screen.
9. **404 page**: the Campus Runner game starts.

## 2. Visual review

Screenshots of every page were reviewed at desktop, tablet and phone widths before and after the upgrade. Problems found and fixed during review:

- Yellow labels, prices and links on white were hard to read. They are now navy, with yellow used as a highlight.
- Text in the dark mission cards was unreadable after the first pass; fixed.
- Form errors, stock status and the focus ring had been flattened to navy or yellow. They now use distinct, accessible colours.
- The two Shop tabs wrapped onto two lines on a phone; they now sit side by side.

## 3. Pre-existing problems found and fixed while testing

- Five pages had a duplicated `<nav>` opening tag.
- `products.html` had a duplicated second-hand tab panel (duplicate id) and a stray gallery and figure that left the Second-Hand Marketplace tab empty.
- The home page logo linked to `../index.html`.
- 27 buttons had no `type`; the Google Maps frame used an invalid `alt` attribute and duplicated attributes.
- The Leaflet map library file was truncated, so the interactive map could never load. It was replaced with the official 1.9.4 release.
- The menu button's accessible name ("Toggle navigation") did not contain its visible text ("Menu").

## 4. Manual test checklist

Open the site (see the README for how) and check each item on a desktop browser, then in the browser's device mode at about 820px and 375px wide:

1. Every menu link opens the right page and the current page is highlighted.
2. On a phone, Menu opens a full-width panel and Escape or choosing a link closes it.
3. Tab through a page: a clear yellow and navy focus ring is always visible. The first Tab shows "Skip to main content".
4. Shop: switch tabs; search "kettle"; filter by category; sort by price; press See more twice and See less once.
5. Add two products, open the Account page and check the quantities and total, then try the WhatsApp, email and EFT buttons.
6. Open Quick view on a product and press Escape.
7. Enquiry and Contact: type an invalid email and check the red message appears; complete the form and check the email text is built.
8. Scroll a long page and use the back-to-top button.
9. Visit a wrong address (for example `/nothing`) on the hosted site to see the 404 page and play the game.
10. Cookie settings in the footer reopens the choices; with maps off the map areas show a message and a button.

## 5. Known limitations

- Only three product photographs exist, so many of the 48 products share a picture. See `docs/images-needed.md`.
- The `404.html` page needs the hosted site to load its styles and game, because it uses absolute addresses. Opened straight from a folder, it looks unstyled.
- The About page photo is hosted by LinkedIn with a time-limited address (it expires around 17 October 2026). If it cannot load, an initials badge is shown. Save the photo inside the project to fix this permanently.
- The Dribbble images could not be viewed while building the upgrade (see `docs/DESIGN-SYSTEM.md`).
- The legal pages are drafts for a fictional business and should be reviewed by a legal professional before real trading.
- GitHub Pages cannot send custom security headers, so protections that need headers (for example a strict Content-Security-Policy or frame protection) are not in place.
- Testing was done in Chromium. Safari and Firefox were not tested.

## 6. Image verification (photo integration)

Carried out on 13 October 2026 after the supplied photographs were added.

| Check                                                                                                                    | Result                                                                          |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Every image path in the HTML (`src`, `srcset`, link-preview images), in `script.js` and in the CSS points to a real file | 28 of 28 paths exist                                                            |
| Byte-identical duplicate image files                                                                                     | None                                                                            |
| Files in `assets/images/` that no page references                                                                        | 2, both existing files left in place (`static-map.jpg`, `study-essentials.jpg`) |
| Every image element loaded, 12 pages at 375px, 820px and 1280px, with all 48 shop cards shown                            | 201 image elements, 0 broken                                                    |
| Every image has non-empty alt text                                                                                       | Yes (the About page photo is covered by its fallback badge)                     |
| Sideways scrolling or failed local requests on any page at any width                                                     | None                                                                            |
| Quick view window, product detail view and search results show the new photos and descriptions                           | Pass                                                                            |
| Accessibility audit (axe-core), 11 pages at 2 widths                                                                     | 0 violations in 22 runs                                                         |
| End-to-end browser checks                                                                                                | 65 of 65 passed                                                                 |
| Syntax and lint (JavaScript, CSS, HTML)                                                                                  | No errors                                                                       |

Image sizes: the supplied photos total 10,076 KB and the 23 optimised files shipped for them total 1,086 KB. The 2,127 KB `hero-campus.jpg` is now 139 KB.

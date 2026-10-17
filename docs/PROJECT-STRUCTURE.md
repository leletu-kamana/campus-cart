# Campus-Cart: Final File Structure and Purpose of Every File

This is the structure of the upgraded project. It follows the real GitHub repository (`leletu-kamana/campus-cart`, branch `main`, commit `1edfa55`). No existing file was renamed, moved or deleted. Files marked **new** were added by this upgrade.

```text
campus-cart/
├── .gitattributes
├── 404.html
├── README.md
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/styles.css
│   ├── data/stock.json
│   ├── images/
│   │   ├── bundles/        hero-campus.jpg, start-bundle-2.jpg, starter-bundle.jpg, starter-bundle-3.jpg (existing, optimised in place);
│   │   │                   hero-banner.jpg, hero-banner-640.jpg, shop-banner.jpg, shop-banner-800.jpg, student-lifestyle.jpg,
│   │   │                   bundle-basic.jpg, bundle-standard.jpg, bundle-premium.jpg (new)
│   │   ├── icons/          static-map.jpg (existing, now unused); 404-page-not-found.jpg (new)
│   │   ├── products/       study-essentials.jpg (existing, now unused); 14 new product photographs
│   │   ├── screenshots/    desktop/ (5 PNG), mobile/ (5 PNG)
│   │   └── second-hand/    marketplace.jpg
│   ├── js/
│   │   ├── consent.js
│   │   ├── data.js
│   │   ├── features.js
│   │   ├── forms.js
│   │   ├── game.js
│   │   ├── script.js
│   │   └── ui.js           (new)
│   └── vendor/leaflet/     leaflet.js, leaflet.css, images/ (5 PNG)
├── docs/                   (new)
│   ├── DESIGN-SYSTEM.md
│   ├── IMAGE-USAGE.md          (new)
│   ├── PROJECT-STRUCTURE.md
│   ├── TESTING.md
│   └── images-needed.md
└── pages/
    ├── about.html
    ├── account.html
    ├── contact.html
    ├── cookies.html
    ├── coverage.html
    ├── enquiry.html
    ├── privacy.html
    ├── products.html
    ├── returns.html
    └── terms.html
```

## Root files

| File | Purpose |
|---|---|
| `index.html` | Home page: hero with Student and Parent paths, trust strip, mission, featured starter bundles, about teaser and contact call to action. |
| `404.html` | Custom "page not found" page with links home and the Campus Runner mini-game. It loads its CSS and game script by absolute address because it can be shown at any URL. |
| `README.md` | Project documentation, changelog and references. |
| `robots.txt` | Search engine rules and the sitemap address. |
| `sitemap.xml` | XML sitemap of every public page. |
| `.gitattributes` | Line-ending normalisation for Git. |

## `pages/`

| File | Purpose |
|---|---|
| `about.html` | Story, team, author profile, licence and credits. |
| `account.html` | Student and parent paths, the four-step checkout guide and the Order Summary (items, quantities, totals, hand-off by WhatsApp, email or EFT details). |
| `contact.html` | Contact form, collection hub cards and the interactive hub map. |
| `coverage.html` | Searchable list of all provinces and institutions served. |
| `enquiry.html` | Pre-purchase enquiry form with step-by-step validation and a stock availability table. |
| `products.html` | Shop New and Second-Hand tabs, the searchable and sortable deals list with See more and See less, the gallery with lightbox, Parent Hub and checklist, product detail and Sell With Us. |
| `privacy.html`, `terms.html`, `cookies.html`, `returns.html` | Legal pages: Privacy Policy (POPIA), Terms and Conditions, Cookie Policy, Returns, Refunds and Delivery. |

## `assets/css/`

| File | Purpose |
|---|---|
| `styles.css` | The only stylesheet. Parts 1 to 32 are the original system (variables, reset, layout, components, responsive rules, print, loader, interactive features). The final sections add the legal pages and cookie banner, and the **Design System v2** layer that carries this upgrade. |

## `assets/js/`

| File | Purpose |
|---|---|
| `script.js` | Core behaviour: mobile menu, tabs, product data and deals list (search, filter, sort, See more and See less), cart (order summary in `sessionStorage`), toast messages, product detail, print checklist, page loader. |
| `features.js` | Interactive hub map (Leaflet, only after the visitor allows maps), gallery lightbox, product quick view, FAQ accordion and scroll reveal. |
| `forms.js` | Enquiry and contact form validation, step-by-step field unlocking, and composing the email (`mailto:`). |
| `data.js` | Province, institution and collection hub data for the coverage page and map. |
| `consent.js` | Cookie banner and settings. Keeps embedded maps off until allowed. |
| `game.js` | Campus Runner mini-game on the 404 page. |
| `ui.js` | **New.** Sticky header measurements, header shadow, back-to-top button, cart count animation, Escape to close the mobile menu, and a fallback badge if the About page photo cannot load. |

## `assets/data/`, `assets/vendor/`, `assets/images/`, `docs/`

| Path | Purpose |
|---|---|
| `assets/data/stock.json` | Static stock levels used by the enquiry page. |
| `assets/vendor/leaflet/` | Leaflet 1.9.4 map library (JavaScript, CSS and marker images), stored locally. This is the only third-party library in the project. |
| `assets/images/` | Photographs, banners, the 404 illustration and README screenshots. See `docs/IMAGE-USAGE.md`. |
| `docs/DESIGN-SYSTEM.md` | Design tokens, components and inspiration notes. |
| `docs/PROJECT-STRUCTURE.md` | This file. |
| `docs/TESTING.md` | What was tested, how, and the results. |
| `docs/IMAGE-USAGE.md` | Every supplied image, where it is used, how it was optimised, and which were not used. |
| `docs/images-needed.md` | The 31 deals products that still use a shared photo, and how to add a photo. |

## Browser-only features and features that need a backend

| Works entirely in the browser | Needs a separately hosted backend or an outside service |
|---|---|
| Multi-page navigation, mobile menu, tabs, accordion | Real accounts, sign-in or saved profiles (the site has none by design) |
| Product list, search, filter, sort, See more and See less, quick view, gallery lightbox | Taking payments (EFT details are shown, nothing is charged) |
| Order summary and quantities (kept in `sessionStorage` for the current tab only) | A shared order or product database, live stock levels |
| Form validation and building an email in the visitor's own email app | Sending the form to the business automatically (`mailto:` only opens the visitor's email app) |
| Cookie choices (`localStorage`), 404 game best score (`localStorage`) | Sending WhatsApp or email on the visitor's behalf |
| Print checklist, live clock | Map tiles and Google Maps (need internet and the visitor's permission) |

Browser storage is private to one visitor's browser. It is not a secure or shared database.

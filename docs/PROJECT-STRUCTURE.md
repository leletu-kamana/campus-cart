# Campus-Cart project structure

This inventory reflects the actual first-party files tracked on the `automation-workflows` branch at the PM maintenance review on 15 November 2026. It lists the project files by their repository paths; no path has been renamed or moved during this update.

The tree below contains 102 first-party files. The repository also tracks 643 generated dependency files inside `node_modules/`. Those files are not expanded in this source inventory and must never be edited. The root `.gitignore` excludes future untracked `node_modules/` contents, but it does not remove files already tracked by Git; see [issue #2](https://github.com/leletu-kamana/campus-cart/issues/2).

## Tracked project file tree

```text
campus-cart/
├── assets/
│   ├── css/
│   │   ├── responsive.css
│   │   ├── styles.css
│   │   └── tailwind.css
│   ├── data/
│   │   └── stock.json
│   ├── icons/
│   │   ├── arrow-down.svg
│   │   ├── arrow-right.svg
│   │   ├── arrow-up.svg
│   │   ├── globe.svg
│   │   ├── info.svg
│   │   ├── mail.svg
│   │   ├── menu.svg
│   │   ├── message-circle.svg
│   │   ├── search.svg
│   │   ├── shield-check.svg
│   │   ├── shopping-bag.svg
│   │   ├── sparkles.svg
│   │   ├── wallet.svg
│   │   └── x.svg
│   ├── images/
│   │   ├── bundles/
│   │   │   ├── bundle-basic.jpg
│   │   │   ├── bundle-premium.jpg
│   │   │   ├── bundle-standard.jpg
│   │   │   ├── hero-banner-640.jpg
│   │   │   ├── hero-banner.jpg
│   │   │   ├── hero-campus.jpg
│   │   │   ├── shop-banner.jpg
│   │   │   ├── start-bundle-2.jpg
│   │   │   ├── starter-bundle-3.jpg
│   │   │   ├── starter-bundle.jpg
│   │   │   └── student-lifestyle.jpg
│   │   ├── icons/
│   │   │   ├── 404-page-not-found.jpg
│   │   │   └── static-map.jpg
│   │   ├── products/
│   │   │   ├── bagpack.jpg
│   │   │   ├── bedding-duvets.jpg
│   │   │   ├── duvet.jpg
│   │   │   ├── essential-bundle.jpg
│   │   │   ├── highlighters.jpg
│   │   │   ├── kettle.jpg
│   │   │   ├── laptop-bag.jpg
│   │   │   ├── scientific-calculator.jpg
│   │   │   ├── stationery.jpg
│   │   │   ├── study-essentials.jpg
│   │   │   ├── study-funiture.jpg
│   │   │   ├── table-chair.jpg
│   │   │   ├── table-fan.jpg
│   │   │   ├── table-lap.jpg
│   │   │   └── textbook.jpg
│   │   ├── screenshots/
│   │   │   ├── desktop/
│   │   │   │   ├── desktop-1.png
│   │   │   │   ├── desktop-2.png
│   │   │   │   ├── desktop-3.png
│   │   │   │   ├── desktop-4.png
│   │   │   │   └── desktop-5.png
│   │   │   └── mobile/
│   │   │       ├── mobile-10.png
│   │   │       ├── mobile-6.png
│   │   │       ├── mobile-7.png
│   │   │       ├── mobile-8.png
│   │   │       └── mobile-9.png
│   │   └── second-hand/
│   │       └── marketplace.jpg
│   ├── js/
│   │   ├── consent.js
│   │   ├── data.js
│   │   ├── features.js
│   │   ├── forms.js
│   │   ├── game.js
│   │   ├── interactions.js
│   │   ├── marquee.js
│   │   ├── script.js
│   │   └── ui.js
│   └── vendor/
│       └── leaflet/
│           ├── images/
│           │   ├── layers-2x.png
│           │   ├── layers.png
│           │   ├── marker-icon-2x.png
│           │   ├── marker-icon.png
│           │   └── marker-shadow.png
│           ├── leaflet.css
│           ├── leaflet.js
│           └── LICENSE
├── docs/
│   ├── DESIGN-SYSTEM.md
│   ├── IMAGE-USAGE.md
│   ├── images-needed.md
│   ├── PROJECT-STRUCTURE.md
│   ├── TERMS_AND_CONDITIONS.md
│   └── TESTING.md
├── pages/
│   ├── about.html
│   ├── account.html
│   ├── contact.html
│   ├── cookies.html
│   ├── coverage.html
│   ├── enquiry.html
│   ├── privacy.html
│   ├── products.html
│   ├── returns.html
│   └── terms.html
├── .gitattributes
├── .gitignore
├── 404.html
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── robots.txt
└── sitemap.xml
```

## Root files

| Path | Purpose |
|---|---|
| `.gitattributes` | Requests Git text-file line-ending normalisation. |
| `.gitignore` | Ignores `node_modules/` and npm/Yarn debug logs for future untracked files. |
| `404.html` | Custom not-found page with recovery navigation and the Campus Runner mini-game. |
| `CODE_OF_CONDUCT.md` | Contributor Covenant-based conduct expectations. |
| `CONTRIBUTING.md` | Contribution, issue reporting, testing and pull-request guidance. |
| `LICENSE` | GNU General Public License version 3. |
| `README.md` | Project description, page and feature inventory, development history, sources and sitemap information. |
| `index.html` | Public homepage. |
| `package.json`, `package-lock.json` | npm metadata and locked Tailwind CSS CLI/tooling dependencies. The current `test` script is a placeholder that exits with status 1; see [issue #4](https://github.com/leletu-kamana/campus-cart/issues/4). |
| `robots.txt` | Crawler access rules and the canonical XML sitemap URL. |
| `sitemap.xml` | XML sitemap for the 11 indexable public HTML pages. |

## HTML pages

| Path | Purpose |
|---|---|
| `index.html` | Homepage and entry point. |
| `404.html` | Custom error page; marked `noindex` and excluded from the sitemap. |
| `pages/about.html` | About, mission, audience, project and author information. |
| `pages/account.html` | Student/parent path selection and order-summary workflow. |
| `pages/contact.html` | Contact information, form and collection-hub map. |
| `pages/cookies.html` | Cookie policy and consent information. |
| `pages/coverage.html` | Searchable list of provinces and education institutions. |
| `pages/enquiry.html` | Product and stock enquiry form. |
| `pages/privacy.html` | Privacy policy and personal-information notice. |
| `pages/products.html` | Product catalogue, deals, second-hand marketplace, Parent Hub, product detail and seller enquiry content. |
| `pages/returns.html` | Returns, refunds and delivery information. |
| `pages/terms.html` | Terms and Conditions for the fictional demonstration business. |

## Stylesheets

| Path | Purpose |
|---|---|
| `assets/css/tailwind.css` | Locally stored Tailwind utility stylesheet used by the HTML pages. |
| `assets/css/styles.css` | Shared Campus-Cart design tokens, components, layouts, page styling and interaction states. |
| `assets/css/responsive.css` | Responsive overrides loaded after the shared styles. |
| `assets/vendor/leaflet/leaflet.css` | Third-party Leaflet map styles. |

## First-party JavaScript

| Path | Purpose |
|---|---|
| `assets/js/consent.js` | Cookie consent preferences and related storage controls. |
| `assets/js/data.js` | Shared product catalogue, stock-related records, provinces, institutions and collection-hub data. |
| `assets/js/features.js` | Optional map, lightbox, product quick view, accordion and reveal features. |
| `assets/js/forms.js` | Contact and enquiry form validation, stock lookup and message-submission flow. |
| `assets/js/game.js` | Campus Runner mini-game used on the 404 page. |
| `assets/js/interactions.js` | Cart/wishlist actions and product browsing interactions. |
| `assets/js/marquee.js` | Homepage marquee animation. |
| `assets/js/script.js` | Page-transition and shared page bootstrap behaviour. |
| `assets/js/ui.js` | Shared UI helpers, browser storage, cart state and navigation updates. |

## Data, icons, images and vendor assets

- `assets/data/stock.json` contains the static stock-level data used by the enquiry workflow.
- `assets/icons/` contains 14 first-party SVG icons.
- `assets/images/` contains bundle, product, second-hand, 404, map and README screenshot images. The exact filenames and their use are listed above in the tree and described in [IMAGE-USAGE.md](IMAGE-USAGE.md).
- `assets/vendor/leaflet/` contains the locally stored Leaflet 1.9.4 JavaScript and CSS, marker images, and its BSD 2-Clause licence.

## Documentation files

- `docs/DESIGN-SYSTEM.md` documents brand tokens, components, accessibility and responsive design notes.
- `docs/IMAGE-USAGE.md` records image sources, uses and optimisation notes.
- `docs/PROJECT-STRUCTURE.md` is this repository inventory.
- `docs/TERMS_AND_CONDITIONS.md` is the Markdown version of the website terms.
- `docs/TESTING.md` records the historical UI/UX verification and current testing limitations.
- `docs/images-needed.md` lists product photos that may be added in future.

## Runtime boundaries

Campus-Cart is a static multi-page website. HTML, CSS and browser JavaScript provide the user interface and client-side interactions. The npm manifest supports local CSS tooling; it does not turn the site into a server-backed application. Real accounts, server-side order storage, payments and automated message delivery require independently hosted services.

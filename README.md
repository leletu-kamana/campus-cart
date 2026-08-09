# Campus-Cart

## Project Title
Campus-Cart — a static, front-end-only e-commerce website connecting South African tertiary students and their parents/guardians with affordable new and second-hand student essentials.

## Student Information
- **Name:** Leletu Kamana
- **Institution:** The IIE Rosebank International, Port Elizabeth Campus
- **Programme:** Diploma in Information Technology (Software Development), First Year
- **Student Email:** st10514888@rcconnect.edu.za
- **GitHub:** [leletu-kamana](https://github.com/leletu-kamana)

## Project Overview
Campus-Cart is a fictional national organisation founded in 2026 to make tertiary education more affordable and accessible across South Africa. The platform connects students buying for themselves with parents/guardians shopping on their behalf, offering both new and pre-loved (second-hand) student essentials, first-year starter bundles, and a peer-to-peer second-hand marketplace.

This build is intentionally **front-end only** — HTML5, CSS3, and vanilla JavaScript, with no backend, database, authentication system, or payment gateway. All "dynamic" behaviour (order summaries, filtering, tabs) runs entirely client-side, in keeping with the assignment's HTML Structure and Basic Content requirements.

## Website Goals and Objectives
**Specific Goals**
- Sell new and second-hand student essentials.
- Provide a Parent Hub with bundles for first-years to reduce preparation stress.
- Enable 1000+ second-hand item submissions per semester via an external listing form.
- Reach 5000+ monthly website visits across both students and families.
- Build trust with parents through a clearly displayed, manually verified sellers list.

**Key Performance Indicators**
- Website traffic split between students and parents.
- Conversion rate on bundles and kits.
- Number of campuses represented (target: 50+).
- Average order value.

## Key Features and Functionality
- **Homepage** (`index.html`): hero with Student/Parent entry points, mission teaser, featured bundles, and links out to About, Contact, and Enquiry.
- **Products** (`pages/products.html`): merges five related sections behind in-page anchors — Shop (New + Second-Hand tabs), Deals & Gallery, Parent Hub (checklist + starter bundles), a reusable Product Detail template, and Sell With Us + FAQ.
- **About** (`pages/about.html`): organisation history, mission, vision, and target audience.
- **Enquiry** (`pages/enquiry.html`): pre-purchase enquiry form for bundle/product questions, submitted via `mailto:`.
- **Contact** (`pages/contact.html`): general contact form and alternate contact details, including multiple collection/office locations.
- **Account** (`pages/account.html`) — *additional page beyond the required five, documented here as instructed in Section 5.1 of the brief*: static Student/Parent informational paths plus an in-browser Order Summary (add-to-cart, "Skip to Address", and WhatsApp/email/EFT checkout hand-off — no real payment gateway).

All interactive behaviour (tab switching, filtering/sorting, the order summary, and print-to-checklist) is handled client-side by a single shared script; all styling lives in a single shared stylesheet.

## File and Folder Structure
```
campus-cart/
├── index.html
├── .gitattributes
├── README.md
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── products/
│   │   ├── second-hand/
│   │   ├── bundles/
│   │   └── icons/
│   └── js/
│       └── script.js
│
└── pages/
    ├── about.html
    ├── account.html      (additional page — see note above)
    ├── contact.html
    ├── enquiry.html
    └── products.html
```

> **Note:** This nested `assets/`/`pages/` layout differs from the flat root structure (`css/`, `js/`, `images/` at root level, alongside `index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`) described in Section 4.2 of the assignment brief. The nested structure above reflects the actual repository layout as of this update.

## Timeline and Milestones
| Week | Phase | Activity |
|------|-------|----------|
| 1 | Planning, research and analysis | Defined project scope, objectives, competitor research, identified website requirements, created user personas |
| 2 | Front-End Development | Homepage, navigation, product catalogue with HTML5 only |
| 3–4 | Upgrade Front-End Development | Responsive layouts with HTML5 + CSS3 only |
| 5–6 | Upgrade Front-End Development | HTML5 + CSS3 + JS |
| 7 | Additional features | Search and product condition system |
| 8 | Testing and Quality Assurance | Functional, usability, compatibility, responsiveness testing; bug fixes |
| 9 | Final improvements | Performance optimisation and user guide |
| 10 | Deployment and presentation | Deploy, final checks, submit |

## Part 1 Details
Part 1 covers: choosing the target organisation, submitting and gaining approval for the Website Project Proposal, content research and sourcing, defining the site structure (sitemap, file/folder structure), and pushing the initial HTML file structure to this repository.

*(Part 2 and Part 3 will follow in future submissions/edits.)*

## Sitemap
```
Home (index.html)
├── About (pages/about.html)
├── Products (pages/marketplace.html)
│     ├── #shop            – Shop New / Second-Hand Marketplace
│     ├── #deals-gallery   – Bundles & Deals / Gallery
│     ├── #parent-hub      – Checklist / Starter Bundles
│     ├── #product-detail  – Reusable product template
│     └── #sell-with-us    – Sell With Us / FAQ
├── Enquiry (pages/enquire.html)
├── Contact (pages/contact.html)
└── Account (pages/account.html)   ← additional page, documented per Section 5.1
```

## Changelog
- **v0.1** — Initial flat HTML/CSS/JS project structure created per assignment Section 4.2 (`index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`, plus `css/`, `js/`, `images/`).
- **v0.2** — Added `account.html` as a documented additional page (Student/Parent paths, Order Summary).
- **v0.3** — Consolidated Shop, Deals & Gallery, Parent Hub, Product Detail, and Sell With Us into a single `products.html` using in-page anchors, reducing total file count while keeping all planned content.
- **v0.4** — Added sitemap diagram and this README.
- **v0.5** — Reverted to a nested `assets/`(`css/`, `images/`, `js/`) and `pages/` structure (`about.html`, `account.html`, `contact.html`, `enquiry.html`, `products.html`), plus `.gitattributes`, to match the actual repository layout — noted as a divergence from the flat structure in Section 4.2 of the brief.

## References
Cox, G., Masuku, B. and Willmers, M. (2020) 'Open Textbooks and Social Justice: Open Educational Practices to Address Economic, Cultural and Political Injustice at the University of Cape Town', *Journal of Interactive Media in Education*, 2020(1), p. 2. Available at: https://doi.org/10.5334/jime.556 (Accessed: 4 August 2026).

Duckett, J. (2011) *HTML and CSS: Design and Build Websites*. Chichester: John Wiley & Sons.

Krug, S. (2014) *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. 3rd edn. San Francisco: New Riders.

Majid, E.S.A., Kamaruddin, N. and Mansor, Z. (2015) 'Adaptation of usability principles in responsive web design technique for e-commerce development', *2015 International Conference on Electrical Engineering and Informatics (ICEEI)*, Denpasar, Indonesia, pp. 726–729. doi: 10.1109/ICEEI.2015.7352593.

Marcotte, E. (2011) *Responsive Web Design*. New York: A Book Apart.

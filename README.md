# Campus-Cart

## Project Title
**Campus-Cart** — a static, front-end e-commerce website designed to connect South African tertiary students and their parents/guardians with affordable new and second-hand student essentials.

## Student Information
- **Name:** Leletu Kamana
- **Institution:** The IIE Rosebank International, Port Elizabeth Campus
- **Programme:** Diploma in Information Technology (Software Development), First Year
- **Student Email:** st10514888@rcconnect.edu.za
- **GitHub:** [leletu-kamana](https://github.com/leletu-kamana)

## Live Website

**View Campus-Cart:** [https://leletu-kamana.github.io/campus-cart/](https://leletu-kamana.github.io/campus-cart/)

The website is published using GitHub Pages. It is a front-end demonstration and does not process real payments or use real user accounts.

## Project Overview
Campus-Cart is a fictional South African organisation created as a website project. The idea is to make it easier for students and families to find common tertiary-study essentials such as bedding, appliances, stationery, furniture, textbooks and starter bundles.

The website has two main audiences:
1. **Students** who need affordable essentials or want to sell items they no longer need.
2. **Parents/guardians** who want to plan and budget for a student's first-year essentials.

The project uses **HTML5, CSS3 and vanilla JavaScript**. It is a front-end demonstration and does not use a backend database, real user authentication or an online payment gateway. This keeps the project focused on website structure, content, navigation, responsive design and client-side interaction.

## Project Goals and Objectives

### Goals
- Provide an easy-to-use online catalogue for student essentials.
- Offer both new and second-hand product options.
- Give parents/guardians a Parent Hub with a checklist and starter bundles.
- Provide students with a basic way to prepare an order summary before contacting the business.
- Provide a Sell With Us section for second-hand listings.
- Present the website in a responsive layout for desktop and mobile screens.

### Objectives
- Create a clear navigation structure between the main website pages.
- Use semantic HTML5 elements to organise the content.
- Use external CSS for consistent styling across the website.
- Use JavaScript for client-side features such as tabs, filtering and the order summary.
- Include accessible text alternatives for images through `alt` attributes.
- Keep the interface simple for students and parents/guardians.

## Target Audience

### Primary Audience: Students
Students aged approximately 19–30 who may live in residence, digs or at home and need affordable study and living essentials.

### Secondary Audience: Parents and Guardians
Parents and guardians who help students prepare for registration and the start of the academic year and want clearer information about products, prices and collection options.

## Technologies Used

| Technology | Use in the Project |
|---|---|
| HTML5 | Page structure, semantic elements, forms, navigation, tables and content. |
| CSS3 | Layout, colours, typography, cards, buttons and responsive design. |
| JavaScript | Planned client-side interaction such as tabs, filters and order-summary behaviour. |
| Git | Version control. |
| GitHub | Repository and version management. |

No frontend framework is used. The project is built with standard HTML, CSS and JavaScript so the underlying web-development concepts remain clear.

## Website Screenshots

This section is for **genuine screenshots of the rendered Campus-Cart website**. It supports visual evidence of the completed website across both desktop and mobile screen sizes.

The repository reserves the following folder for the screenshots:

`assets/images/screenshots/`

A minimum of **5 desktop screenshots and 5 mobile screenshots** can be added. Additional screenshots may also be included if they provide useful evidence of different pages, sections or responsive states.

### Desktop Website Screenshots

Add the genuine desktop browser screenshots to `assets/images/screenshots/` using these filenames:

![Campus-Cart desktop screenshot 1](assets/images/screenshots/desktop-01.png)

![Campus-Cart desktop screenshot 2](assets/images/screenshots/desktop-02.png)

![Campus-Cart desktop screenshot 3](assets/images/screenshots/desktop-03.png)

![Campus-Cart desktop screenshot 4](assets/images/screenshots/desktop-04.png)

![Campus-Cart desktop screenshot 5](assets/images/screenshots/desktop-05.png)

### Mobile Website Screenshots

Add the genuine mobile browser screenshots to `assets/images/screenshots/` using these filenames:

![Campus-Cart mobile screenshot 1](assets/images/screenshots/mobile-01.png)

![Campus-Cart mobile screenshot 2](assets/images/screenshots/mobile-02.png)

![Campus-Cart mobile screenshot 3](assets/images/screenshots/mobile-03.png)

![Campus-Cart mobile screenshot 4](assets/images/screenshots/mobile-04.png)

![Campus-Cart mobile screenshot 5](assets/images/screenshots/mobile-05.png)

> **Screenshot requirement:** Screenshot files must be captured from the actual rendered Campus-Cart website in a browser. Do not use planning wireframes, generated mock-ups or individual project images as substitutes for website screenshots. Upload the screenshot files to `assets/images/screenshots/` with the matching filenames so the README images display correctly.

> **Additional screenshots:** If more than five desktop or mobile screenshots are added, continue the same naming pattern (for example, `desktop-06.png`, `desktop-07.png`, `mobile-06.png`, `mobile-07.png`).

## Part 1 – Planning and Initial Development
Part 1 covers the planning and initial development of Campus-Cart, with the initial website structure developed using **HTML5**. The planning identifies the organisation idea, target audience, page content, site structure and navigation before visual styling and interactive features are added. Semantic elements such as headings, navigation, sections, lists, images, links and forms help organise the information into a clear document structure (Duckett, 2011).

Campus-Cart is a fictional South African student-essentials store. The website is planned around two main user groups: students who need affordable study and living essentials, and parents/guardians who help plan and budget for those items. The focus on access to affordable learning materials is also relevant to discussions of educational inequality and open educational practices (Cox, Masuku and Willmers, 2020).

### Website Pages and Features

| Page | File | Main Purpose |
|---|---|---|
| Home | `index.html` | Introduces Campus-Cart, its mission, featured products and the two main user paths. |
| About | `pages/about.html` | Explains the organisation, mission, vision and target audience. |
| Products | `pages/products.html` | Contains Shop, Deals & Gallery, Parent Hub, Product Detail and Sell With Us sections. |
| Enquiry | `pages/enquiry.html` | Provides a pre-purchase enquiry form. |
| Contact | `pages/contact.html` | Provides general contact and collection/office information. |
| Account | `pages/account.html` | Provides Student/Parent paths and the HTML structure for an Order Summary. |

### Page Content, Purpose and Target Users

| Page | Main Content | Purpose | Target User |
|---|---|---|---|
| Home (`index.html`) | Introduction, featured essentials, main navigation and links to shopping, Parent Hub and account information | Introduce Campus-Cart and help visitors choose where to go next | Students and parents/guardians |
| About (`pages/about.html`) | Organisation background, mission, vision and intended audience | Explain what Campus-Cart is and who it serves | New visitors, students and parents/guardians |
| Products (`pages/products.html`) | Shop New, second-hand marketplace, deals/gallery, Parent Hub, product detail and Sell With Us | Help visitors review products, prices, bundles and selling information | Students and parents/guardians |
| Enquiry (`pages/enquiry.html`) | Pre-purchase enquiry form and enquiry details | Give visitors a way to ask about stock, products and arrangements | Prospective buyers |
| Contact (`pages/contact.html`) | Contact methods, business information and collection information | Make it clear how visitors can contact the fictional business | All visitors |
| Account (`pages/account.html`) | Student and parent/guardian paths, order-summary layout and hand-off information | Provide a place to review the planned order process; it is not real account authentication | Students and parents/guardians |

### Low-Fidelity Wireframes

These simple planning wireframes show the intended content order and page layout. They are structural guides rather than screenshots of the finished styled website.

**Home page wireframe**

```text
+--------------------------------------------------------------+
| LOGO                 MAIN NAVIGATION                 ACCOUNT |
+--------------------------------------------------------------+
| HERO: Campus-Cart introduction       | HERO IMAGE            |
| Short description + Shop / Parent Hub buttons                 |
+--------------------------------------------------------------+
| BUY / SELL HIGHLIGHT CARDS                                   |
+--------------------------------------------------------------+
| FEATURED PRODUCTS / STARTER BUNDLE CARDS                      |
+--------------------------------------------------------------+
| ABOUT / CONTACT LINKS                                        |
+--------------------------------------------------------------+
| FOOTER: Shop links | Company links | Contact details         |
+--------------------------------------------------------------+
```

**Products page wireframe**

```text
+--------------------------------------------------------------+
| LOGO                 MAIN NAVIGATION                 ACCOUNT |
+--------------------------------------------------------------+
| PAGE TITLE + INTRODUCTION                                    |
+--------------------------------------------------------------+
| SHOP TABS: NEW / SECOND-HAND                                 |
| FILTERS / SORTING CONTROLS                                   |
| PRODUCT CARD GRID: IMAGE / NAME / PRICE / DETAILS            |
+--------------------------------------------------------------+
| DEALS & GALLERY                                              |
+--------------------------------------------------------------+
| PARENT HUB: CHECKLIST + STARTER BUNDLES                      |
+--------------------------------------------------------------+
| PRODUCT DETAIL                                               |
+--------------------------------------------------------------+
| SELL WITH US / FAQ                                           |
+--------------------------------------------------------------+
| FOOTER                                                       |
+--------------------------------------------------------------+
```

### Products Page Sections
- `#shop` — Shop New and Second-Hand Marketplace tabs/sections.
- `#deals-gallery` — Deals and Gallery with product information.
- `#parent-hub` — First Year Checklist and starter bundles.
- `#product-detail` — Product detail information/template.
- `#sell-with-us` — Sell With Us information and FAQ.

### Account Page
The Account page is part of the **HTML-only development in Part 1**. It provides the HTML structure for Student and Parent/Guardian paths and an Order Summary section. The page does not provide real user accounts, passwords, payment processing or completed JavaScript functionality at this stage.

The HTML structure was created first so that the content, navigation and page sections were in place before the styling and interactive functionality were developed.

## Part 2 – CSS Development
Part 2 focuses on the **CSS development and visual design** of Campus-Cart. The website uses an external CSS stylesheet so the same styling can be applied across the different HTML pages. The CSS is used to control the appearance, layout, spacing, typography and responsive behaviour of the website.

### CSS Features
The main CSS features used in Campus-Cart include:
- **CSS variables** for the main colours, making the design easier to keep consistent and update.
- **CSS reset** rules to provide a consistent starting point across different browsers.
- **Typography styling** for headings, paragraphs, labels and important text.
- **Responsive layouts** using flexible widths, CSS Grid, Flexbox and media queries for desktop, tablet and mobile screens.
- **Navigation styling** for the main navigation, links, buttons and mobile navigation controls.
- **Hero and section layouts** for organising the main content areas of the pages.
- **Cards and grids** for displaying products, information and other content in a structured way.
- **Buttons, badges and form controls** with consistent spacing, borders, colours and states.
- **Product and gallery layouts** for presenting product images, details and prices.
- **Form styling** for enquiry, contact and other input areas.
- **Responsive and accessibility-related styling**, including keyboard focus states and reduced-motion support.
- **Print styling** for content that may need to be printed, such as checklist information.

The main aim of Part 2 is to turn the HTML structure from Part 1 into a consistent and responsive website design while keeping the CSS organised and reusable. The stylesheet uses reusable variables and responsive layout rules to keep the design consistent across different screen sizes. Responsive web design principles are relevant because the layout must adapt to different devices and viewport sizes (Marcotte, 2011).

## Part 3 – Interactive Functionality (Upcoming Feature)
Part 3 will focus on the **interactive functionality** that will be added to Campus-Cart in a future development stage. This section is currently an **upcoming feature** and should not be treated as completed functionality yet.

The planned JavaScript features include:
- Shop New / Second-Hand tab switching.
- Product category and condition filtering.
- Product sorting.
- Adding products to the Order Summary.
- Updating quantities and subtotals.
- Calculating the order total.
- Clearing the Order Summary.
- Moving to the delivery/address step.
- Navigation menu interaction on smaller screens. (Available Feature)
- Printing the Parent Hub checklist.

These features will be implemented and tested during Part 3. The README will be updated again once the functionality has actually been added and tested.

> **Part 3 boundary:** `assets/js/script.js` currently provides the mobile navigation menu only. Product tabs, filtering, sorting, order-summary calculations and checklist printing remain planned for Part 3 and should not be described as completed until implemented and tested.

## Design and Usability
The website uses consistent navigation, clear headings, buttons and structured content sections. Responsive web design is important because users may access websites from different screen sizes (Marcotte, 2011).

The project also follows basic usability ideas such as keeping navigation understandable and reducing unnecessary steps for users (Krug, 2014).

The use of clear product information, visible prices and structured sections is intended to help users make decisions more easily. Responsive e-commerce design also requires usability principles to be adapted to different devices (Majid, Kamaruddin and Mansor, 2015).

## File and Folder Structure

```text
campus-cart/
├── .gitattributes
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       ├── bundles/
│       │   ├── hero-campus.jpg
│       │   ├── starter-bundle.jpg
│       │   └── start-bundle-2.jpg
│       ├── products/
│       │   └── study-essentials.jpg
│       ├── second-hand/
│       │   └── marketplace.jpg
│       ├── screenshots/
│       │   ├── desktop-01.png
│       │   ├── desktop-02.png
│       │   ├── desktop-03.png
│       │   ├── desktop-04.png
│       │   ├── desktop-05.png
│       │   ├── mobile-01.png
│       │   ├── mobile-02.png
│       │   ├── mobile-03.png
│       │   ├── mobile-04.png
│       │   └── mobile-05.png
│       │   └── (additional screenshots may be added)
│       └── icons/
└── pages/
    ├── about.html
    ├── account.html
    ├── contact.html
    ├── coverage.html
    ├── enquiry.html
    └── products.html
```

### Structure Note
The repository currently uses a nested `assets/` and `pages/` structure. This differs from the original flat structure described in Section 4.2 of the assignment brief. This README documents the **actual repository structure**.

## Sitemap

```text
Home (index.html)
│
├── About (pages/about.html)
│
├── Products (pages/products.html)
│   ├── #shop
│   │   ├── Shop New
│   │   └── Second-Hand Marketplace
│   ├── #deals-gallery
│   │   └── Deals & Gallery
│   ├── #parent-hub
│   │   ├── First Year Checklist
│   │   └── Starter Bundles
│   ├── #product-detail
│   │   └── Product Detail
│   └── #sell-with-us
│       └── Sell With Us / FAQ
│
├── Enquiry (pages/enquiry.html)
├── Contact (pages/contact.html)
├── Coverage (pages/coverage.html)
│
└── Account (pages/account.html)
    ├── Student Path
    ├── Parent / Guardian Path
    └── Order Summary
```

## Development Timeline

| Week | Phase | Activity |
|---|---|---|
| 1 | Planning, research and analysis | Defined the project idea, target audience, objectives, requirements and site structure. |
| 2 | Front-End Development | Developed the initial homepage, navigation and product catalogue structure. |
| 3–4 | Responsive Development | Improved layouts and styling using HTML5 and CSS3. |
| 5–6 | Interactive Development | Planned JavaScript-based interaction and order-summary functionality for Part 3. |
| 7 | Additional Features | Added product filtering-related functionality and marketplace content. |
| 8 | Testing and Quality Assurance | Checked functionality, usability, compatibility and responsive behaviour. |
| 9 | Final Improvements | Made layout, content and performance improvements. |
| 10 | Deployment and Presentation | Final checks, deployment preparation and project presentation. |

## Testing and Quality Checks
Before final submission, the project should be checked for:
- **Functional testing:** links, buttons, forms, tabs, filters and order-summary functions.
- **Usability testing:** clear navigation, readable text and understandable content.
- **Responsive testing:** desktop, tablet and mobile screen sizes.
- **Compatibility testing:** common modern web browsers.
- **Accessibility checks:** meaningful headings, alternative text, labels and keyboard-friendly controls.
- **Path checking:** confirm that all relative links open the intended files.

## Part 1 and Part 2 Review Checklist

- [x] The homepage Account links point to `pages/account.html`.
- [x] The HTML pages use the shared external stylesheet with paths appropriate to their folder locations.
- [x] The HTML pages load the shared JavaScript file with paths appropriate to their folder locations.
- [x] The README page list and sitemap use the actual nested `pages/` structure and correct page filenames.
- [x] The README includes a Page–Content–Purpose–Target User table and low-fidelity structural wireframes.
- [x] In-text citations are included for the design and usability principles discussed in the README.
- [ ] Capture and add at least five genuine desktop screenshots and five genuine mobile screenshots of the rendered website for Part 2 visual evidence.

The local HTML file and anchor paths should be checked again whenever pages or section IDs are changed. The mobile navigation JavaScript has been reviewed in the repository, but it still needs to be tested in a live browser at desktop and mobile widths.

# Changelog

- **v0.1** — Initial flat HTML/CSS/JS project structure created per assignment Section 4.2 (`index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`, plus `css/`, `js/`, `images/`).
- **v0.2** — Added `account.html` as a documented additional page (Student/Parent paths, Order Summary).
- **v0.3** — Consolidated Shop, Deals & Gallery, Parent Hub, Product Detail, and Sell With Us into a single `products.html` using in-page anchors, reducing total file count while keeping all planned content.
- **v0.4** — Added sitemap diagram and this README.
- **v0.5** — Reverted to a nested `assets/` (`css/`, `images/`, `js/`) and `pages/` structure (`about.html`, `account.html`, `contact.html`, `enquiry.html`, `products.html`), plus `.gitattributes`, to match the actual repository layout — noted as a divergence from the flat structure in Section 4.2 of the brief.
- **v0.6** — Updated `README.md` to organise the project development into Part 1, Part 2 and Part 3 sections. Part 2 was added for CSS development, while the interactive functionality section was moved to Part 3 and marked as an upcoming feature.
- **v0.7** — Documented **Part 2 – CSS Development: Design Variable 1 – Colour Scheme** in `README.md`, including the reusable CSS colour variables used for the Campus-Cart design.
- **v0.8** — Documented **Part 3 – Interactive Functionality (Upcoming Feature)** in `README.md`. Planned functionality includes product filtering, sorting, Shop New/Second-Hand switching, Order Summary calculations, clearing the order, delivery/address steps, mobile navigation and the Parent Hub checklist. These features are planned for the next development stage and are not yet marked as completed.
- **v0.9** — Updated the `README.md` documentation for **Part 2 – CSS Development: Reset**, explaining how the CSS reset removes default browser spacing and styling, sets `box-sizing`, establishes the base `html` and `body` rules, and makes images and form controls work consistently with the Campus-Cart design.
- **v1.0** — Updated `assets/css/styles.css` typography styles by grouping the shared `h1`–`h4` rules, using a consistent readable font stack, setting heading weight, spacing and line height, adding responsive `clamp()` sizing for `h1` and `h2`, and documenting paragraph and strong-text styling with explanatory comments. The typography update keeps the existing rendered design while improving CSS readability and maintainability.
- **v1.1** — Added descriptive comments and small layout refinements to `assets/css/styles.css`. The update documents the `.wrap`, `.section`, `.section.alt`, `.section.navy`, `.section-head` and `.eyebrow` styles, adds bottom spacing to `.section`, improves paragraph readability inside navy sections, and adds spacing and typography refinements to section headings and eyebrow labels.
- **v1.2** — Added descriptive comments and clarified the navigation styles in `assets/css/styles.css`. The update documents the sticky `.topbar`, `.nav` layout and spacing, `.logo`, `.nav-links` and link states, `.nav-cart` button/pill styling and hover state, and the `.nav-toggle` mobile navigation button. The changes improve readability and maintainability without changing the overall navigation structure.
- **v1.3** — Added the **Main Container** documentation to Part 2 of `README.md`. The update explains the `.wrap`, `.section`, `.section.alt`, `.section.navy`, `.section-head` and `.eyebrow` styles, including their purpose for page width, spacing, section backgrounds, readability and headings.
- **v1.4** — Added descriptive comments to the navigation and hero sections in `assets/css/styles.css`. The update documents the `.nav-links` layout and explains the `.hero`, `.hero-grid`, `.hero h1`, `.hero h1 em`, `.hero p.lead`, `.hero-img` and `.hero-img img` styles, including the gradient background, text colours, responsive two-column layout, image sizing, cropping and rounded corners. The styling behaviour and overall design were kept unchanged.
- **v1.5** — Added descriptive comments to the split card section in `assets/css/styles.css`. The update documents the `.split` grid layout, two-column structure, spacing, `.split-card` padding, background, yellow border and rounded corners, as well as the heading and paragraph text styling used for the Buy/Sell highlight panels. The existing styling behaviour and overall design were kept unchanged.
- **v1.6** — Added descriptive comments across the shared button and badge styles in `assets/css/styles.css`. The update documents the base `.btn` styling, hover and active states, navy, outline, ghost-light and small button variants, as well as the `.badge`, `.badge-verified`, `.badge-new` and `.badge-used` styles. The comments explain the layout, spacing, colours, borders, text styling and hover behaviour while keeping the existing visual behaviour unchanged.
- **v1.7** — Added descriptive comments to the grid, card and information box styles in `assets/css/styles.css`. The update documents the `.grid`, `.grid-2`, `.grid-3` and `.grid-4` layouts, reusable `.card` styling and hover behaviour, card images and content areas, prices and buttons, the `.card-navy` variant, and the `.info-box` callout styling. The update improves readability and maintainability without changing the existing CSS output.
- **v1.8** — Added descriptive comments to the tab, filter toolbar, form element, and gallery styles in `assets/css/styles.css`. The update documents the `.tabs` and `.tab-btn` layout and states, active tab accessibility attributes, the `.toolbar` and `.field` controls, shared input/select/textarea styling and focus states, textarea resizing, and the `.gallery` image and caption layout. The comments improve readability and maintainability without changing the existing CSS behaviour.
- **v1.9** — Added explanatory comments to the form and UI component styles in `assets/css/styles.css`. The update documents the `.form-card`, `.form-row`, `.form-group` and `.hint` styles, the custom `.checklist` and checkmark pseudo-element, the `.order-table`, `.order-total` and `.empty-state` components, and the numbered `.step` layout and badge styling. The update explains the purpose, spacing, layout and visual styling of these components without introducing functional or behavioural CSS changes.
- **v2.0** — Added explanatory comments to the toast notification and embedded map styles in `assets/css/styles.css`. The update documents the `.toast` positioning, sizing, colours, visibility and transition behaviour, the `.toast.show` state, the `.map-frame` and `.product-map-frame` sizing, borders and overflow handling, embedded map iframe sizing, nested map wrappers, and the `.map-note` styling. The update improves readability and maintainability without changing the existing styling logic.
- **v2.1** — Added explanatory comments to the sub-navigation, footer, and tablet responsive CSS sections in `assets/css/styles.css`. The update documents the `.subnav` layout and link states, footer spacing, colours, links, lists, columns and bottom section, and the `@media (max-width: 1000px)` tablet rules for navigation, hero layout, grids, gallery, footer columns and split cards. The update improves readability and maintainability without changing the existing layout or styling behaviour.
- **v2.2** — Added explanatory comments to the remaining responsive CSS sections in `assets/css/styles.css`. The update documents the mobile navigation at `850px`, small mobile layout at `620px`, very small phone adjustments at `380px`, keyboard focus styles, reduced-motion support, touch-device hover behaviour, and print-specific styling. The update improves readability and explains the responsive, accessibility, touch and print behaviour without changing the existing runtime styles.
- **v2.3** — Added a new bundle product image at `assets/images/bundles/start-bundle-2.jpg` and updated `pages/products.html` to use the new image in the product detail section. Added a `#detail-img` rule to `assets/css/styles.css` so the selected product image fills its container while keeping the full image visible with `object-fit: contain` and centred positioning. This improves the product detail image sizing and consistency without changing the existing product detail functionality.
- **v2.4** — Added `assets/js/script.js` for the Campus-Cart mobile navigation menu. The script toggles the mobile menu open and closed, updates the navigation button's ARIA attributes, closes the menu when a navigation link is selected or the Escape key is pressed, returns focus to the navigation button after Escape, and resets the menu when the screen becomes wider than the `850px` mobile breakpoint. It also checks that the required navigation elements exist before running.
- **v2.5** — Updated the README to correct outdated file-structure and JavaScript notes, add a Page–Content–Purpose–Target User table, add low-fidelity home and products page wireframes, and clarify the remaining Part 2 screenshot evidence requirement.
- **v2.5** — Refined the mobile navigation JavaScript by simplifying the toggle logic, adding clearer defensive checks, and reorganising click, Escape-key and resize handling while preserving the existing navigation behaviour and accessibility attributes.
- **v2.6** — Fixed the homepage Account navigation links so both the main navigation and footer correctly point to `pages/account.html`.
- **v2.7** — Corrected and expanded the README documentation for Parts 1 and 2, including page content, purpose and target-user information and low-fidelity wireframe planning details.
- **v2.8** — Added a research citation to the Part 1 rationale, connecting the project focus on affordable learning materials with educational inequality and open educational practices.
- **v2.9** — Added the live Campus-Cart website link and a README visual-preview section, then refined the section into dedicated website screenshot evidence for Part 2.
- **v3.0** — Renamed the README screenshot section to **Website Screenshots** and kept the desktop/mobile screenshot placeholders and evidence requirements clearly documented.
- **v3.1** — Added a `coverage.html` page to the project.
- **v3.2** — Added `forms.js` for the project's form-related JavaScript functionality.
- **v3.3** — Added `data.js` for the project's data-related JavaScript functionality.
- **v3.4** — Expanded the README **Website Screenshots** section to support at least five genuine desktop screenshots and five genuine mobile screenshots. Standardised the screenshot folder to `assets/images/screenshots/`, added numbered Markdown image references, documented the naming convention for additional screenshots, updated the file/folder structure, and updated the Part 2 review checklist to require five screenshots for each viewport category.
- **v3.5** — Prepared the README for the required desktop and mobile screenshot evidence, documenting the screenshot evidence section and expected viewport categories.
- **v3.6** — Created the `assets/images/screenshots/` folder to hold genuine rendered website screenshots. 
- **v3.7** — Updated the README file/folder structure and sitemap to include the newly added `assets/js/data.js`, `assets/js/forms.js` and `pages/coverage.html` files.
- **v3.8** — Clarified the README project documentation, including the actual file structure, JavaScript notes, page-content-purpose-target-user table, low-fidelity wireframes and remaining screenshot evidence requirements. 
- **v3.9** — Added SEO meta description and keyword tags to `index.html` to improve search visibility and describe the Campus-Cart student-essentials and delivery offering. 
- **v3.10** — Updated `index.html` navigation so Shop links open the Products page directly and added Coverage links to the primary and mobile navigation menus.
- **v3.11** — Expanded the homepage coverage messaging to mention delivery across provinces, collection at hubs or campus sites, and coverage of South African universities, TVET colleges and major private institutions. 
- **v3.12** — Added SEO metadata to `pages/about.html`, including a meta description and keywords describing the Campus-Cart mission, coverage and student marketplace. 
- **v3.13** — Updated `pages/about.html` navigation to link directly to the Products page and added Coverage links to the main and footer navigation. 
- **v3.14** — Updated `pages/about.html` campus coverage wording to reflect wider South African university, TVET college and private-institution reach while retaining the historical narrative and handover model.
- **v3.15** — Added SEO metadata to `pages/account.html`, including a meta description and keywords for improved search visibility and page summaries. 
- **v3.16** — Updated `pages/account.html` navigation so Shop links open the Products page directly and added Coverage links to the main and mobile navigation. 
- **v3.17** — Added SEO metadata to `pages/contact.html`, including a meta description and keywords describing collection points and student essentials. 
- **v3.18** — Updated `pages/contact.html` navigation by removing the `#shop` fragment from Shop links and adding Coverage links to the main and footer navigation. 
- **v3.19** — Added an explicit form ID to the contact form in `pages/contact.html` and disabled native browser validation so custom form handling can target the form reliably.
- **v3.20** — Merged the recent main-branch development history after the new coverage, navigation, SEO, form and README changes. 

- **v3.21** — Clarify contact form validation config. This documents the contact form configuration in `pages/contact.html`, explaining the purpose of `novalidate` and the `data-mailto` attribute so the custom `forms.js` handling is easier to understand and maintain.

- **v3.22** — Remove redundant contact form comments. This cleans up unnecessary comments in `pages/contact.html`, keeping the form markup focused on useful documentation while reducing redundant code comments.

- **v3.23** — Improve contact form accessibility. This improves the contact form's accessibility in `pages/contact.html`, making the form structure and user interaction clearer for visitors using different input methods.

- **v3.24** — Improve contact phone field. This refines the contact form phone field in `pages/contact.html`, improving how telephone information is collected and presented to users.

- **v3.25** — Remove redundant contact form comments. This removes further redundant contact-form comments from `pages/contact.html`, keeping the markup cleaner and easier to read without changing the form's core purpose.

- **v3.26** — Improve contact form validation. This improves the contact form validation behaviour so user input can be checked more consistently before the form data is handed to the custom JavaScript handling.

- **v3.27** — Add contact form preview and hub updates. This adds contact-form preview behaviour and updates the collection-hub information, giving users clearer feedback about the information they are preparing to submit and where collection is available.

- **v3.28** — Refresh contact collection hubs. This refreshes the contact-page collection-hub information so the listed locations better support the project's student collection and delivery messaging.

- **v3.29** — Add regional pickup locations to contact page. This expands the contact page with regional pickup locations, giving users more specific information about possible collection areas.

- **v3.30** — Load contact form script. This loads the contact-form JavaScript on the contact page so the form can use the project's custom client-side handling instead of relying only on default browser behaviour.

- **v3.31** — Add validation and coverage page styles. This adds CSS for form validation states and the Coverage page, giving validation feedback and coverage content a consistent visual treatment within the shared Campus-Cart design.

- **v3.32** — Add Campus-Cart page loader. This introduces the Campus-Cart page loader, adding a consistent loading experience while pages and their shared resources are being prepared.

- **v3.33** — Add coverage page.

- **v3.34** — Add SEO metadata to coverage page.

- **v3.35** — Add province navigation to coverage page.

- **v3.36** — Add coverage page hero section.

- **v3.37** — Add WhatsApp contact to coverage page.

- **v3.38** — Add footer copyright to coverage page.

- **v3.39** — Load shared scripts on coverage page.

- **v3.40** — Merge branch 'main' of https://github.com/leletu-kamana/campus-cart.

- **v3.41** — Add institution search to coverage page.

- **v3.42** — Add Eastern Cape coverage section.

- **v3.43** — Add public university coverage.

- **v3.44** — Add Eastern Cape TVET colleges.

- **v3.45** — Add private institutions to coverage.

- **v3.46** — Add Free State delivery coverage.

- **v3.47** — Add public universities to coverage page.

- **v3.48** — Add public TVET colleges to coverage.

- **v3.49** — Add private institutions and Gauteng coverage.

- **v3.50** — Add public universities to coverage page.

- **v3.51** — Add Gauteng TVET colleges.

- **v3.52** — Add private institutions to coverage page.

- **v3.53** — Add KwaZulu-Natal coverage.

- **v3.54** — Add public universities to coverage list.

- **v3.55** — Expand KZN institution coverage.

- **v3.56** — Add private institutions to coverage page.

- **v3.57** — Add Limpopo delivery coverage.

- **v3.58** — Add public university coverage entries.

- **v3.59** — Add public TVET colleges to coverage.

- **v3.60** — Add private institution to coverage.

- **v3.61** — Add Mpumalanga delivery coverage.

- **v3.62** — Add Mpumalanga university listing.

- **v3.63** — Add Mpumalanga TVET colleges.

- **v3.64** — Add private institutions to coverage page.

- **v3.65** — Add Northern Cape coverage section.

- **v3.66** — Add public institutions to coverage.

- **v3.67** — Add private institutions to coverage list.

- **v3.68** — Add North West coverage.

- **v3.69** — Add public institutions to coverage list.

- **v3.70** — Add private institutions to coverage.

- **v3.71** — Add Western Cape delivery coverage.

- **v3.72** — Add public university coverage entries.

- **v3.73** — Add public TVET colleges to coverage.

- **v3.74** — Add private institutions to coverage list.

- **v3.75** — Add national private providers section.

## References
- Cox, G., Masuku, B. and Willmers, M. (2020) 'Open Textbooks and Social Justice: Open Educational Practices to Address Economic, Cultural and Political Injustice at the University of Cape Town', *Journal of Interactive Media in Education*, 2020(1), p. 2. Available at: https://doi.org/10.5334/jime.556 (Accessed: 4 August 2026).

- Duckett, J. (2011) *HTML and CSS: Design and Build Websites*. Chichester: John Wiley & Sons.

- Krug, S. (2014) *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. 3rd edn. San Francisco: New Riders.

- Majid, E.S.A., Kamaruddin, N. and Mansor, Z. (2015) 'Adaptation of usability principles in responsive web design technique for e-commerce development', *2015 International Conference on Electrical Engineering and Informatics (ICEEI)*, Denpasar, Indonesia, pp. 726–729. doi: 10.1109/ICEEI.2015.7352593.

- Marcotte, E. (2011) *Responsive Web Design*. New York: A Book Apart.

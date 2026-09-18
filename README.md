# Campus-Cart

## Project Title
**Campus-Cart** — a static, front-end e-commerce website designed to connect South African tertiary students and their parents/guardians with affordable new and second-hand student essentials.

## Student Information
- **Name:** Leletu Kamana
- **Institution:** The IIE Rosebank International, Port Elizabeth Campus
- **Programme:** Diploma in Information Technology (Software Development), First Year
- **Student Email:** st10514888@rcconnect.edu.za
- **GitHub:** [leletu-kamana](https://github.com/leletu-kamana)

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

## Part 1 – Planning and Initial Development
Part 1 covers the planning and initial development of the website project, with the development work focused on **HTML5 only**. This includes selecting the target organisation, developing the project idea, researching requirements, identifying the target audience, planning the site structure, creating the sitemap, creating the HTML page structure and pushing the project to GitHub.

The main focus of Part 1 is creating the website structure using HTML5. The pages use semantic HTML elements to organise headings, navigation, sections, images, links, forms and other content. CSS styling and JavaScript interaction are not the focus of Part 1.

### Website Pages and Features

| Page | File | Main Purpose |
|---|---|---|
| Home | `index.html` | Introduces Campus-Cart, its mission, featured products and the two main user paths. |
| About | `pages/about.html` | Explains the organisation, mission, vision and target audience. |
| Products | `pages/products.html` | Contains Shop, Deals & Gallery, Parent Hub, Product Detail and Sell With Us sections. |
| Enquiry | `pages/enquiry.html` | Provides a pre-purchase enquiry form. |
| Contact | `pages/contact.html` | Provides general contact and collection/office information. |
| Account | `pages/account.html` | Provides Student/Parent paths and the HTML structure for an Order Summary. |

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

The main aim of Part 2 is to turn the HTML structure from Part 1 into a consistent and responsive website design while keeping the CSS organised and reusable.

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

> **Upcoming feature note:** The HTML pages currently reference `assets/js/script.js`, but the current `main` branch directory listing does not contain this JavaScript file. The interactive features therefore remain planned for Part 3 until the JavaScript implementation is added.

## Design and Usability
The website uses consistent navigation, clear headings, buttons and structured content sections. Responsive web design is important because users may access websites from different screen sizes (Marcotte, 2011).

The project also follows basic usability ideas such as keeping navigation understandable and reducing unnecessary steps for users (Krug, 2014).

The use of clear product information, visible prices and structured sections is intended to help users make decisions more easily. Responsive e-commerce design also requires usability principles to be adapted to different devices (Majid, Kamaruddin and Mansor, 2015).

## File and Folder Structure

```text
campus-cart/
├── .gitattributes
├── Changelog.md
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── images/
│       ├── bundles/
│       ├── second-hand/
│       └── icons/
└── pages/
    ├── about.html
    ├── account.html
    ├── contact.html
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

## Known Items to Check
1. `index.html` currently contains links to `account.html` in the root directory, while the actual account page is `pages/account.html`. These links should be corrected before final submission.
2. The HTML pages reference `assets/js/script.js`, but the current repository tree does not show `script.js`. This is an upcoming Part 3 feature and should be added when the JavaScript implementation is developed.
3. The README and sitemap should be kept updated whenever the page structure changes.

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
- **v1.5** — Added descriptive comments to the split card section in `assets/css/styles.css`. The update documents the `.split` grid layout, two-column structure, spacing, `.split-card` padding, background, yellow border and rounded corners, as well as the heading and paragraph text styling used for the Buy/Sell highlight panels. The existing styling behaviour and runtime functionality were kept unchanged.
- **v1.6** — Added descriptive comments across the shared button and badge styles in `assets/css/styles.css`. The update documents the base `.btn` styling, hover and active states, navy, outline, ghost-light and small button variants, as well as the `.badge`, `.badge-verified`, `.badge-new` and `.badge-used` styles. The comments explain the layout, spacing, colours, borders, text styling and hover behaviour while keeping the existing visual behaviour unchanged.
- **v1.7** — Added descriptive comments to the grid, card and information box styles in `assets/css/styles.css`. The update documents the `.grid`, `.grid-2`, `.grid-3` and `.grid-4` layouts, reusable `.card` styling and hover behaviour, card images and content areas, prices and buttons, the `.card-navy` variant, and the `.info-box` callout styling. The update improves readability and maintainability without changing the existing CSS output.
- **v1.8** — Added descriptive comments to the tab, filter toolbar, form element, and gallery styles in `assets/css/styles.css`. The update documents the `.tabs` and `.tab-btn` layout and states, active tab accessibility attributes, the `.toolbar` and `.field` controls, shared input/select/textarea styling and focus states, textarea resizing, and the `.gallery` image and caption layout. The comments improve readability and maintainability without changing the existing CSS behaviour.
- **v1.9** — Added explanatory comments to the form and UI component styles in `assets/css/styles.css`. The update documents the `.form-card`, `.form-row`, `.form-group` and `.hint` styles, the custom `.checklist` and checkmark pseudo-element, the `.order-table`, `.order-total` and `.empty-state` components, and the numbered `.step` layout and badge styling. The update explains the purpose, spacing, layout and visual styling of these components without introducing functional or behavioural CSS changes.
- **v2.0** — Added explanatory comments to the toast notification and embedded map styles in `assets/css/styles.css`. The update documents the `.toast` positioning, sizing, colours, visibility and transition behaviour, the `.toast.show` state, the `.map-frame` and `.product-map-frame` sizing, borders and overflow handling, embedded map iframe sizing, nested map wrappers, and the `.map-note` styling. The update improves readability and maintainability without changing the existing styling logic.
- **v2.1** — Added explanatory comments to the sub-navigation, footer, and tablet responsive CSS sections in `assets/css/styles.css`. The update documents the `.subnav` layout and link states, footer spacing, colours, links, lists, columns and bottom section, and the `@media (max-width: 1000px)` tablet rules for navigation, hero layout, grids, gallery, footer columns and split cards. The update improves readability and maintainability without changing the existing layout or styling behaviour.
- **v2.2** — Added explanatory comments to the remaining responsive CSS sections in `assets/css/styles.css`. The update documents the mobile navigation at `850px`, small mobile layout at `620px`, very small phone adjustments at `380px`, keyboard focus styles, reduced-motion support, touch-device hover behaviour, and print-specific styling. The update improves readability and explains the responsive, accessibility, touch and print behaviour without changing the existing runtime styles.
- **v2.3** — Added a new bundle product image at `assets/images/bundles/start-bundle-2.jpg` and updated `pages/products.html` to use the new image in the product detail section. Added a `#detail-img` rule to `assets/css/styles.css` so the selected product image fills its container while keeping the full image visible with `object-fit: contain` and centred positioning. This improves the product detail image sizing and consistency without changing the existing product detail functionality.
- **v2.4** — Added `assets/js/script.js` for the Campus-Cart mobile navigation menu. The script toggles the mobile menu open and closed, updates the navigation button's ARIA attributes, closes the menu when a navigation link is selected or the Escape key is pressed, returns focus to the navigation button after Escape, and resets the menu when the screen becomes wider than the `850px` mobile breakpoint. It also checks that the required navigation elements exist before running.

## References
- Cox, G., Masuku, B. and Willmers, M. (2020) 'Open Textbooks and Social Justice: Open Educational Practices to Address Economic, Cultural and Political Injustice at the University of Cape Town', *Journal of Interactive Media in Education*, 2020(1), p. 2. Available at: https://doi.org/10.5334/jime.556 (Accessed: 4 August 2026).

- Duckett, J. (2011) *HTML and CSS: Design and Build Websites*. Chichester: John Wiley & Sons.

- Krug, S. (2014) *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. 3rd edn. San Francisco: New Riders.

- Majid, E.S.A., Kamaruddin, N. and Mansor, Z. (2015) 'Adaptation of usability principles in responsive web design technique for e-commerce development', *2015 International Conference on Electrical Engineering and Informatics (ICEEI)*, Denpasar, Indonesia, pp. 726–729. doi: 10.1109/ICEEI.2015.7352593.

- Marcotte, E. (2011) *Responsive Web Design*. New York: A Book Apart.

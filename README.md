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

## Website Pages and Features

| Page | File | Main Purpose |
|---|---|---|
| Home | `index.html` | Introduces Campus-Cart, its mission, featured products and the two main user paths. |
| About | `pages/about.html` | Explains the organisation, mission, vision and target audience. |
| Products | `pages/products.html` | Contains Shop, Deals & Gallery, Parent Hub, Product Detail and Sell With Us sections. |
| Enquiry | `pages/enquiry.html` | Provides a pre-purchase enquiry form. |
| Contact | `pages/contact.html` | Provides general contact and collection/office information. |
| Account | `pages/account.html` | Provides Student/Parent paths and a client-side Order Summary. |

### Products Page Sections
- `#shop` — Shop New and Second-Hand Marketplace tabs.
- `#deals-gallery` — Deals and Gallery with category, condition and sorting controls.
- `#parent-hub` — First Year Checklist and starter bundles.
- `#product-detail` — Product detail information/template.
- `#sell-with-us` — Sell With Us information and FAQ.

### Account Page
The Account page is an additional page. It does **not** provide real user accounts or passwords. It provides Student and Parent/Guardian paths plus an Order Summary with quantities, subtotals, a total, delivery/collection information and checkout hand-off options. No real payment gateway is used.

## Interactive Functionality
The intended client-side functionality includes:
- Shop New / Second-Hand tab switching.
- Product category and condition filtering.
- Product sorting.
- Adding products to the Order Summary.
- Updating quantities and subtotals.
- Calculating the order total.
- Clearing the Order Summary.
- Moving to the delivery/address step.
- Navigation menu interaction on smaller screens.
- Printing the Parent Hub checklist.

> **Current repository note:** The HTML pages reference `assets/js/script.js`, but the current `main` branch directory listing does not contain that JavaScript file. These features should therefore be checked before final submission if the script is required.

## Technologies Used

| Technology | Use in the Project |
|---|---|
| HTML5 | Page structure, semantic elements, forms, navigation, tables and content. |
| CSS3 | Layout, colours, typography, cards, buttons and responsive design. |
| JavaScript | Client-side interaction such as tabs, filters and order-summary behaviour. |
| Git | Version control. |
| GitHub | Repository and version management. |

No frontend framework is used. The project is built with standard HTML, CSS and JavaScript so the underlying web-development concepts remain clear.

## Part 1 – Planning and Initial Development
Part 1 covers the planning and initial development of the website project, including selecting the target organisation, developing the project idea, researching requirements, identifying the target audience, planning the site structure, creating the sitemap, creating the initial file/folder structure and pushing the project to GitHub.

Further development can be documented through the repository commits and `Changelog.md`.

## Part 2 – CSS Development
Part 2 focuses on the **CSS development** of Campus-Cart. The CSS is kept in an external stylesheet so that the same design can be used across the different HTML pages. The stylesheet contains the main layout, navigation, typography, buttons, cards, colours and responsive rules.

### Design Variable 1 – Colour Scheme
The first design variable used in the CSS is the **colour scheme**. The main colours are stored as CSS custom properties inside the `:root` selector. This makes it easier to reuse the same colours throughout the website instead of writing the colour codes repeatedly.

The main colour choices are:

| Colour variable | Value | Main use |
|---|---|---|
| `--navy` | `#0d1b3e` | Main navigation, dark sections and headings. |
| `--navy-light` | `#17295c` | Lighter navy areas and gradients. |
| `--navy-dark` | `#08142f` | Darker brand areas where required. |
| `--yellow` | `#ffd23f` | Buttons, highlights and important navigation elements. |
| `--yellow-light` | `#ffe477` | Lighter yellow hover states. |
| `--gold` | `#b8860b` | Links, prices and smaller brand highlights. |
| `--gold-light` | `#d9a41a` | Hover states and gold highlights. |
| `--white` | `#ffffff` | Main backgrounds and light text. |
| `--grey` | `#f2f3f5` | Alternate section backgrounds. |

The navy, yellow and gold colours are used consistently to give Campus-Cart a recognisable visual identity. The lighter grey and white colours help separate content areas and keep the pages readable.

Using CSS variables also means that a colour can be changed in one place and then update everywhere that variable is used. For example, changing `--navy` would update elements that use `var(--navy)` throughout the stylesheet.

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
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── images/
│       ├── bundles/
│       ├── second-hand/
│       └── icons/
│
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
| 5–6 | Interactive Development | Added planned JavaScript-based interaction and order-summary structure. |
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
2. The HTML pages reference `assets/js/script.js`, but the current repository tree does not show `script.js`. The JavaScript file should be added if the interactive functionality is required for the final version.
3. The README and sitemap should be kept updated whenever the page structure changes.

## References

Cox, G., Masuku, B. and Willmers, M. (2020) 'Open Textbooks and Social Justice: Open Educational Practices to Address Economic, Cultural and Political Injustice at the University of Cape Town', *Journal of Interactive Media in Education*, 2020(1), p. 2. Available at: https://doi.org/10.5334/jime.556 (Accessed: 4 August 2026).

Duckett, J. (2011) *HTML and CSS: Design and Build Websites*. Chichester: John Wiley & Sons.

Krug, S. (2014) *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. 3rd edn. San Francisco: New Riders.

Majid, E.S.A., Kamaruddin, N. and Mansor, Z. (2015) 'Adaptation of usability principles in responsive web design technique for e-commerce development', *2015 International Conference on Electrical Engineering and Informatics (ICEEI)*, Denpasar, Indonesia, pp. 726–729. doi: 10.1109/ICEEI.2015.7352593.

Marcotte, E. (2011) *Responsive Web Design*. New York: A Book Apart.

# Campus-Cart

## Project Overview
Campus-Cart is a front-end student essentials website designed for South African tertiary students and their parents or guardians. The website provides sections for student essentials, new and second-hand products, a Parent Hub, enquiries, contact information and an account area.

## Part 1 – Planning and Initial Development
Part 1 focuses on the **HTML development** of Campus-Cart. The pages were created using HTML5 semantic structure and are linked together to form the main website.

### HTML Development
The main HTML pages include:
- `index.html` – Home page
- `pages/about.html` – About Campus-Cart
- `pages/products.html` – Products and shopping sections
- `pages/enquiry.html` – Enquiry form
- `pages/contact.html` – Contact information and form
- `pages/account.html` – Student/Parent account area and order summary

The HTML structure was created first so that the content, navigation and page sections were in place before the styling and interactive functionality were developed.

## Part 2 – CSS Development
Part 2 focuses on the **CSS development** of Campus-Cart. The CSS is kept in an external stylesheet so that the same design can be used across the different HTML pages. The stylesheet contains the main layout, navigation, typography, buttons, colours and responsive rules.

### 1. Design Variable – Colour Scheme
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

### 2. Reset
The second part of the CSS uses a **reset** to remove some of the default browser styling. This helps make the pages behave more consistently across different browsers.

The reset uses `box-sizing: border-box` so that padding and borders are included in an element's width and height. The `html` element also uses smooth scrolling and scroll padding for the navigation links.

The `body` reset removes the default margin and padding, sets a minimum width, and applies the main font, text size, line height, text colour and background colour used by the website.

The reset also includes common rules for images, links and form controls. Images are made responsive with `max-width: 100%` and `height: auto`, while buttons and form controls inherit the site's font.

Example of the reset syntax used in the stylesheet:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 90px;
}

body {
    margin: 0;
    padding: 0;
    min-width: 320px;

    font-family:
        "Segoe UI",
        Arial,
        Helvetica,
        sans-serif;

    font-size: 17px;
    line-height: 1.65;
    letter-spacing: normal;

    color: var(--text);
    background: var(--white);
}

img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
}

button,
input,
select,
textarea {
    font: inherit;
}
```

This reset gives the rest of the stylesheet a consistent starting point before the page-specific styling is applied.

## Part 3 – Interactive Functionality (Upcoming Feature)
Part 3 will focus on the **interactive functionality** that will be added to Campus-Cart in a future development stage. This section is currently an **upcoming feature** and should not be treated as completed functionality yet.

Planned JavaScript features include:
- Shop New / Second-Hand tab switching
- Product category and condition filtering
- Product sorting
- Adding products to the Order Summary
- Updating quantities and subtotals
- Calculating the order total
- Clearing the Order Summary
- Delivery/address step
- Mobile navigation
- Printing the Parent Hub checklist

> **Upcoming feature note:** The HTML pages currently reference `assets/js/script.js`, but the current `main` branch directory listing does not contain this JavaScript file. The interactive features therefore remain planned for Part 3 until the JavaScript implementation is added.

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

## References
- Cox, M., Masuku, B. and Willmers, M. (2020). ‘Open educational resources and the student experience’. *Journal of Interactive Media in Education*, 2020(1). doi:10.5334/jime.556.
- Duckett, J. (2011). *HTML and CSS: Design and Build Websites*. Indianapolis: Wiley.
- Krug, S. (2014). *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. 3rd ed. Berkeley: New Riders.
- Majid, M.A., Kamaruddin, S.S. and Mansor, N. (2015). ‘Responsive web design for mobile devices’. In *2015 International Conference on Electrical, Electronics and Information Engineering (ICEEI)*. doi:10.1109/ICEEI.2015.7352593.
- Marcotte, E. (2011). *Responsive Web Design*. New York: A Book Apart.

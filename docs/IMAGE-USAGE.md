# Campus-Cart Image Usage

This document records every supplied image, what it shows, where it is used, and how it was prepared. It also lists images that were deliberately not used and why.

## 1. Summary

- 24 files were supplied (23 in `campus-cart-images.zip` plus the shop banner). 18 are used directly, and 4 of those also appear inside the bundle pictures. Four more appear only inside the bundle pictures, and 2 are not used at all (section 4).
- Everything shown on the site uses relative paths (absolute only on `404.html`, as before). 28 image paths are referenced by the site and all 28 exist. 201 image elements were loaded on every page at 375px, 820px and 1280px with no broken image, no missing alt text and no sideways scrolling.
- The supplied files add up to about 9.8 MB (10,076 KB). After optimisation, the 23 files shipped for them total about 1.1 MB (1,086 KB).
- No file was deleted or renamed. Four of the existing heavy images were reduced in place (section 5).

## 2. Supplied images and where they are used

Optimised copies are in `assets/images/`. File names are the supplied names.

| Supplied file | What it shows | Where it is used | Shipped as |
|---|---|---|---|
| `hero-banner.jpg` | A student desk with a navy lamp, laptop, notebooks and backpack | Home page hero | `bundles/hero-banner.jpg` (1200 px) and `bundles/hero-banner-640.jpg` for phones |
| `e-commence-banner.jpg` | Navy and yellow banner with a cart icon, a laptop and a backpack | Top of the Shop page, with real links and text placed over it | `bundles/shop-banner.jpg` (1600 px) and `bundles/shop-banner-800.jpg` |
| `404-Page-Not-Found.jpg` | A cart full of study supplies on a path to a house | Custom 404 page | `icons/404-page-not-found.jpg` |
| `student-lifestyle.jpg` | A student studying on a bed with a laptop | Account page, student path | `bundles/student-lifestyle.jpg` |
| `essential-bundle.jpg` | Flat lay of notebooks, pens, a pencil case and a navy bag | Study Starter Bundle | `products/essential-bundle.jpg` |
| `kettle.jpg` | Steel electric kettle | Electric Kettle 1.7L (Shop New card and deals list) | `products/kettle.jpg` |
| `duvet.jpg` | Folded grey duvet | Duvet & Linen Set (Double) | `products/duvet.jpg` |
| `bedding-duvets.jpg` | Pillows and a rolled duvet | Single Duvet and Linen Set, and the "Bedding and linen" gallery item | `products/bedding-duvets.jpg` |
| `stationery.jpg` | Notebooks, pencils, highlighters, a calculator | Stationery Mega Pack | `products/stationery.jpg` (source is only 332 px, so it was enlarged 2x and is slightly soft) |
| `scientific-calculator.jpg` | Navy scientific calculator | Scientific Calculator | `products/scientific-calculator.jpg` |
| `highlighters.jpg` | Six highlighters in a holder | Highlighter and Pen Pack | `products/highlighters.jpg` |
| `bagpack.jpg` | Navy backpack | Study Backpack with Laptop Sleeve | `products/bagpack.jpg` |
| `laptop-bag.jpg` | Navy laptop sleeve | Second-Hand Laptop Bag (second-hand card and deals list) | `products/laptop-bag.jpg` |
| `table-chair.jpg` | Ergonomic mesh chair | Study Chair (Ergonomic) | `products/table-chair.jpg` |
| `study-funiture.jpg` | White desk and chair in a bedroom | Second-Hand Study Desk (second-hand card and deals list) | `products/study-funiture.jpg` |
| `table-fan.jpg` | Grey desk fan | Rechargeable Desk Fan | `products/table-fan.jpg` |
| `table-lap.jpg` | Navy desk lamp | LED Desk Lamp | `products/table-lap.jpg` |
| `textbook.jpg` | Navy hardcover textbook | Accounting Textbook Set, the second-hand textbooks card and the textbooks gallery item | `products/textbook.jpg` |

## 3. The three bundle pictures

The supplied images contain no photograph of a full starter bundle, and the fixed-price bundles contain specific items. To keep the pictures truthful, each bundle picture is a 2 by 2 grid of the real product photos for items that bundle includes:

| Picture | Items shown | Bundle contents it matches |
|---|---|---|
| `bundles/bundle-basic.jpg` | duvet, kettle, mugs, notebook | Bedding set, kettle, two-mug set, stationery starter |
| `bundles/bundle-standard.jpg` | duvet, kettle, mugs, desk lamp | Everything in Basic plus a desk lamp |
| `bundles/bundle-premium.jpg` | study chair, storage trays, kettle, pen holder | Study chair, storage, kettle, stationery |

Each picture shows four of the items, not the whole bundle, and the alt text says so. The mugs, notebook, pen holder and storage trays exist only inside these grids, so they have no separate file.

## 4. Supplied images that were not used

| File | Reason |
|---|---|
| `coffee-cups.jpg`, `notebook.jpg`, `pen-holder.jpg`, `stackable-storage-tray.jpg` | Used only as parts of the bundle pictures (section 3). |
| `desk-organizer-renders.jpg` | The catalogue has no desk organiser product. Showing it would suggest an item that is not for sale. |
| `tech-bundles.jpg` | Shows a laptop, phone, tablet and headphones with visible brand marks. Campus-Cart does not sell these. |

## 5. Existing images

No existing image was deleted or renamed. Four were heavy and are used at small sizes, so they were resized and recompressed in place, keeping the same file name and picture:

| File | Before | After |
|---|---|---|
| `bundles/hero-campus.jpg` | 1600 x 900, 2127 KB | 1200 x 675, 139 KB |
| `bundles/starter-bundle.jpg` | 1024 x 1024, 796 KB | 800 x 800, 109 KB |
| `bundles/starter-bundle-3.jpg` | 1024 x 1024, 866 KB | 800 x 800, 123 KB |
| `bundles/start-bundle-2.jpg` | 768 x 1376, 603 KB | 600 x 1075, 66 KB |

`marketplace.jpg` is still used for second-hand items that have no supplied photograph. `starter-bundle-3.jpg` is the shared photo for new products without one. `hero-campus.jpg` is still used in two gallery items and as the link-preview image. `study-essentials.jpg` and `static-map.jpg` are existing files that no page references any more; they were left in place.

## 6. Optimisation

- Product photos: 800 x 800 JPEG, quality 80, progressive. Typical size 20 to 90 KB.
- Hero and shop banner: two widths with `srcset`, so phones download the smaller file.
- Every image has `width` and `height` attributes so the page does not jump while loading, and below-the-fold images use `loading="lazy"`. The two banners at the top use `fetchpriority="high"`.
- Product cards now use a square photo area because the supplied photos are square. A 4:3 crop would cut the top off tall items such as the chair and the backpack.

## 7. The shop banner

`e-commence-banner.jpg` has empty white shapes where text was meant to go. The links and text are real HTML placed over those shapes and scaled with the banner width, so they stay sharp and accessible. On screens narrower than 700px the same information appears below the picture, because text over a small picture would be unreadable.

The brief for the banner mentioned "Starter Bundle: R899" and "Free Delivery to Campus Residences". Neither matches the site: the Basic Starter Bundle costs R1,499, and the site offers free collection at listed points, not free delivery. The banner therefore says "Starter bundles from R1,499" and "Free collection at listed campus points". The brief also listed text ("Campus-Cart", "STUDENT ESSENTIALS") that is not in the supplied picture, so it was not added.

## 8. Products still using a shared photo

31 deals products have no supplied photograph and show the shared generic photo for their condition. They are listed in `docs/images-needed.md`, and the file explains how to add a photo.

## 9. Alt text

Every product photo has a description of what is visible, for example "Navy backpack with tan leather trim and a front zip pocket", used in the product cards, the quick view window and the gallery. Decorative text over the banner is real HTML, and the banner picture itself has an alt text describing its content.

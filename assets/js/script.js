// ==========================================================
// CAMPUS-CART
// UNIFIED PAGE LOADER & PAGE TRANSITION SYSTEM
// Features the Uiverse.io loader by Chris-immanuel-matthew
// Provides zero-flash initial loading and smooth page transitions.
// ==========================================================

(function () {
    // Enables JavaScript strict mode so unsafe or undeclared code is caught instead of silently continuing.
    "use strict";

    // Transition timing constants (in milliseconds)
    // Stores the duration of the loader exit transition before the browser navigates to another page.
    var TRANSITION_OUT_TIME = 3000; // Duration of smooth exit transition before navigating
    // Stores the minimum time the loader remains visible so very fast loads still look smooth.
    var MIN_LOADER_TIME = 260;     // Minimum display time for visual smoothness on fast loads
    // Stores the maximum loader time before the failsafe automatically hides it.
    var SAFETY_TIMEOUT = 6000;     // Failsafe timeout to prevent permanently stuck loader

    // State trackers
    // Tracks whether an internal page transition is already running.
    var isNavigating = false;
    // Records when this script started so the minimum loader duration can be calculated.
    var pageLoadStartTime = Date.now();
    // Stores the timer used to hide the loader after the initial page load.
    var loaderTimer = null;
    // Stores the failsafe timer that prevents a permanently visible loader.
    var safetyTimer = null;

    /**
     * Finds or dynamically creates the page loader element.
     * Ensures the loader is always available even if omitted from an HTML file.
     */
    // Defines the function that finds the loader or creates it when an HTML page does not contain one.
    function getOrCreateLoader() {
        // Searches the document for the element identified as the page loader.
        var loader = document.getElementById("page-loader");
        if (!loader && document.body) {
            // Creates a div element when the loader is missing from the HTML.
            loader = document.createElement("div");
            // Assigns the ID used by CSS and other JavaScript loader controls.
            loader.id = "page-loader";
            // Assigns the CSS class that controls the loader overlay appearance.
            loader.className = "page-loader";
            // Identifies the loader as a status message for assistive technologies.
            loader.setAttribute("role", "status");
            // Allows screen readers to announce the status without interrupting the user.
            loader.setAttribute("aria-live", "polite");
            // Gives the loader an accessible description.
            loader.setAttribute("aria-label", "Loading Campus-Cart");
            // Builds the loader HTML structure as one string before inserting it into the document.
            loader.innerHTML =
                '<div class="page-loader-content">' +
                '  <div class="page-loader-visual">' +
                '    <div class="loader" aria-hidden="true">' +
                '      <div class="nucleus"></div>' +
                '      <div class="ring"></div>' +
                '      <div class="ring"></div>' +
                '      <div class="ring"></div>' +
                '      <div class="ring"></div>' +
                '      <div class="ring"></div>' +
                '      <div class="ring"></div>' +
                '    </div>' +
                '  </div>' +
                '  <div class="page-loader-brand" aria-hidden="true">' +
                '    <span class="page-loader-title">Campus<span>-Cart</span></span>' +
                '    <span class="page-loader-text">Loading Campus-Cart...</span>' +
                '  </div>' +
                '</div>';
            // Places the loader at the beginning of the body so it can cover the page content.
            document.body.prepend(loader);
        }
        // Returns the loader element to the function that requested it.
        return loader;
    }

    /**
     * Displays the full-screen loader and locks page scrolling.
     */
    // Defines the function that displays the full-screen loader and locks page scrolling.
    function showPageLoader() {
        // Gets the existing loader or creates one before changing its state.
        var loader = getOrCreateLoader();
        if (loader) {
            // Removes the hidden class so the loader becomes visible.
            loader.classList.remove("is-hidden");
        }
        if (document.body) {
            // Adds the page-loading class so CSS can prevent scrolling while loading.
            document.body.classList.add("page-loading");
        }

        // Start failsafe safety timer
        if (safetyTimer) {
            clearTimeout(safetyTimer);
        }
        // Starts a failsafe timer in case the normal navigation process becomes stuck.
        safetyTimer = setTimeout(function () {
            hidePageLoader();
            isNavigating = false;
        }, SAFETY_TIMEOUT);
    }

    /**
     * Smoothly hides the full-screen loader and restores page scrolling.
     */
    // Defines the function that hides the loader and restores normal page scrolling.
    function hidePageLoader() {
        if (safetyTimer) {
            clearTimeout(safetyTimer);
            safetyTimer = null;
        }

        var loader = document.getElementById("page-loader");
        if (loader) {
            // Adds the hidden class so the loader can fade or transition out.
            loader.classList.add("is-hidden");
        }
        if (document.body) {
            // Removes the page-loading class and restores normal scrolling.
            document.body.classList.remove("page-loading");
        }
    }

    /**
     * Completes initial page loading with a slight buffer so the animation
     * resolves smoothly without jarring or flashing.
     */
    // Calculates when the initial loader should hide while respecting the minimum display time.
    function scheduleInitialHide() {
        // Calculates the number of milliseconds that have passed since the script started.
        var elapsedTime = Date.now() - pageLoadStartTime;
        // Calculates the remaining minimum loader time and prevents a negative delay.
        var remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime);

        if (loaderTimer) {
            clearTimeout(loaderTimer);
        }

        loaderTimer = setTimeout(function () {
            hidePageLoader();
        }, remainingTime);
    }

    /**
     * Determines whether an anchor link should trigger the smooth internal page transition.
     * Excludes external links, mailto, tel, WhatsApp, download links, target="_blank", and anchor jumps.
     */
    // Determines whether a clicked link should use the custom Campus-Cart page transition.
    function shouldTransition(link, url) {
        // Exclude external domains
        // Rejects links that point to a different website origin.
        if (url.origin !== window.location.origin) {
            return false;
        }

        // Exclude links set to open in a new tab or specific target
        // Rejects links that intentionally open in another browsing context.
        if (link.target && link.target !== "_self") {
            return false;
        }

        // Exclude file downloads
        // Rejects links intended to download a file instead of navigating between pages.
        if (link.hasAttribute("download")) {
            return false;
        }

        // Exclude external protocol schemes
        // Reads the original href attribute so special protocols can be identified.
        var href = link.getAttribute("href") || "";
        if (href.indexOf("mailto:") === 0 ||
            href.indexOf("tel:") === 0 ||
            href.indexOf("https://wa.me/") === 0 ||
            href.indexOf("javascript:") === 0) {
            return false;
        }

        // Exclude same-page hash jumps (e.g. #student, #parent, #top)
        // Checks whether the destination uses the same path as the current page.
        var isSamePath = url.pathname === window.location.pathname;
        // Checks whether the destination has the same query-string parameters.
        var isSameSearch = url.search === window.location.search;
        if (isSamePath && isSameSearch && url.hash !== "") {
            return false;
        }

        // Exclude clicking the exact same URL if already on it
        if (isSamePath && isSameSearch && !url.hash && !window.location.hash) {
            return false;
        }

        return true;
    }

    /**
     * Initiates the internal page transition:
     * 1. Displays the loader overlay.
     * 2. Waits for the smooth exit transition duration.
     * 3. Navigates to the destination page.
     */
    // Starts the custom transition before navigating to the requested internal URL.
    function handleInternalNavigation(destinationUrl) {
        // Locks the transition state so repeated clicks cannot start duplicate navigations.
        isNavigating = true;
        // Displays the loader before the browser changes the current document.
        showPageLoader();

        setTimeout(function () {
            // Navigates the browser to the destination after the exit transition finishes.
            window.location.href = destinationUrl;
        }, TRANSITION_OUT_TIME);
    }

    // Intercept normal internal clicks across the document
    // Watches document clicks so eligible internal anchor links can use the custom transition.
    document.addEventListener("click", function (event) {
        // Allow default browser behaviors for modified clicks (e.g. Ctrl+click, Cmd+click to open new tab)
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        // Finds the nearest anchor element associated with the clicked target.
        var link = event.target.closest ? event.target.closest("a") : null;
        if (!link || !link.href) {
            return;
        }

        try {
            // Creates a complete URL object using the current page URL as the base.
            var url = new URL(link.href, window.location.href);

            if (!shouldTransition(link, url)) {
                return;
            }

            // If a transition is already in flight, block rapid duplicate clicks
            if (isNavigating) {
                event.preventDefault();
                return;
            }

            event.preventDefault();
            handleInternalNavigation(url.href);
        } catch (e) {
            // If URL parsing fails, allow standard browser navigation
        }
    });

    // Handle initial page load lifecycle
    // Checks whether the browser has already completed the page loading lifecycle.
    if (document.readyState === "complete") {
        scheduleInitialHide();
    } else {
        // Runs the initial loader hide logic once page resources have finished loading.
        window.addEventListener("load", scheduleInitialHide, { once: true });
        // Also ensure hide fires if load event was delayed by third-party frames
        // Provides an additional fallback based on DOM readiness.
        // Waits until the HTML has been parsed before initializing features that depend on page elements.
    document.addEventListener("DOMContentLoaded", function () {
            setTimeout(scheduleInitialHide, 500);
        }, { once: true });
    }

    // Handle Browser Back / Browser Forward / BFCache restoration
    // Handles browser back, forward, and BFCache restoration events.
    window.addEventListener("pageshow", function (event) {
        isNavigating = false;
        hidePageLoader();
    });

    // Expose control functions globally for safety/testing
    // Exposes loader controls globally for testing or controlled use by other scripts.
    window.CampusCartLoader = {
        show: showPageLoader,
        hide: hidePageLoader,
        isNavigating: function () { return isNavigating; }
    };

})();

// ==========================================================
// CAMPUS-CART
// Navigation JavaScript
// Mobile menu toggle
// ==========================================================

// Sets up the mobile navigation menu after the page has loaded.
// Defines the mobile navigation setup function used after the page DOM is ready.
function initNav() {

    // Finds the mobile navigation button using its class name.
    const navToggle = document.querySelector(".nav-toggle");

    // Finds the navigation links container using its class name.
    const navLinks = document.querySelector(".nav-links");

    // Checks if the navigation button or navigation links cannot be found.
    if (!navToggle || !navLinks) {

        // Stops the function from continuing if the navigation elements are missing.
        return;
    }

    // Adds a click event to the mobile navigation button.
    navToggle.addEventListener("click", function () {

        // Checks if the navigation menu currently has the "open" class.
        const isOpen =
            navLinks.classList.contains("open") ||

            // Also checks if the navigation menu has the "is-open" class.
            navLinks.classList.contains("is-open");

        // Checks if the navigation menu is currently open.
        if (isOpen) {

            // Removes the "open" class to close the navigation menu.
            navLinks.classList.remove("open");

            // Removes the "is-open" class to make sure the menu is closed.
            navLinks.classList.remove("is-open");

            // Changes the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false");

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu");

        // Runs this part when the navigation menu is currently closed.
        } else {

            // Adds the "open" class to display the mobile navigation menu.
            navLinks.classList.add("open");

            // Changes the accessibility value to show that the menu is open.
            navToggle.setAttribute("aria-expanded", "true");

            // Changes the accessibility label to show that the menu can be closed.
            navToggle.setAttribute("aria-label", "Close navigation menu");
        }
    });

    // Finds all links inside the navigation menu.
    const links = navLinks.querySelectorAll("a");

    // Goes through each navigation link one at a time.
    links.forEach(function (link) {

        // Adds a click event to each navigation link.
        link.addEventListener("click", function () {

            // Removes the "open" class after a navigation link is selected.
            navLinks.classList.remove("open");

            // Removes the "is-open" class after a navigation link is selected.
            navLinks.classList.remove("is-open");

            // Changes the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false");

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu");
        });

    });

    // Adds an event listener for keyboard actions on the page.
    document.addEventListener("keydown", function (event) {

        // Checks if the keyboard key pressed was the Escape key.
        if (event.key === "Escape") {

            // Removes the "open" class when Escape is pressed.
            navLinks.classList.remove("open");

            // Removes the "is-open" class when Escape is pressed.
            navLinks.classList.remove("is-open");

            // Updates the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false");

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu");

            // Moves the keyboard focus back to the navigation button.
            navToggle.focus();
        }

    });

    // Adds an event listener that checks when the browser window changes size.
    window.addEventListener("resize", function () {

        // Checks if the screen is wider than the mobile breakpoint of 850 pixels.
        if (window.innerWidth > 850) {

            // Removes the "open" class when the screen becomes larger.
            navLinks.classList.remove("open");

            // Removes the "is-open" class when the screen becomes larger.
            navLinks.classList.remove("is-open");

            // Resets the accessibility value because the mobile menu is no longer being used.
            navToggle.setAttribute("aria-expanded", "false");

            // Resets the accessibility label for the navigation button.
            navToggle.setAttribute("aria-label", "Open navigation menu");
        }

    });
}

    "use strict";

    /* ---------- Hardcoded catalogue data (no database) ---------- */
    // Stores reusable image paths so product objects can reference consistent asset locations.
    var IMG = {
        bundle: "images/bundles/starter-bundle.jpg",
        hero: "images/bundles/hero-campus.jpg",
        used: "images/second-hand/marketplace.jpg"
    };

    // Pages inside /pages/ are one level deeper than index.html.
    // Selects the correct assets directory because files in /pages/ are one folder deeper than index.html.
    var BASE = window.location.pathname.indexOf("/pages/") > -1 ? "../assets/" : "assets/";

    // Stores the catalogue as an array of product objects containing names, categories, prices, descriptions, and images.
    var DEALS = [
        { name: "Basic Starter Bundle", category: "bundles", condition: "new", price: 1499, desc: "Bedding, kettle, mug set and study basics for a first-year res room.", img: IMG.bundle },
        { name: "Standard Starter Bundle", category: "bundles", condition: "new", price: 2799, desc: "Everything in Basic plus desk lamp, laundry set and kitchen starter pack.", img: IMG.bundle },
        { name: "Premium Starter Bundle", category: "bundles", condition: "new", price: 4499, desc: "Full res setup: bedding, appliances, storage, stationery and lockable trunk.", img: IMG.bundle },
        { name: "Second-Hand Study Desk", category: "furniture", condition: "used", price: 650, desc: "Reviewed listing from a graduating student in Pretoria. Light wear.", img: IMG.used },
        { name: "Mini Bar Fridge (Used)", category: "appliances", condition: "used", price: 1150, desc: "Works perfectly, tested at our collection point. 12 months old.", img: IMG.used },
        { name: "Electric Kettle 1.7L", category: "appliances", condition: "new", price: 289, desc: "Fast-boil kettle, res-friendly and load-shedding ready.", img: IMG.bundle },
        { name: "Accounting Textbook Set", category: "textbooks", condition: "used", price: 420, desc: "Prescribed titles for first-year commerce, current edition.", img: IMG.used },
        { name: "Study Chair (Ergonomic)", category: "furniture", condition: "new", price: 899, desc: "Adjustable chair built for long study sessions in a small room.", img: IMG.bundle },
        { name: "Stationery Mega Pack", category: "stationery", condition: "new", price: 249, desc: "Files, pads, pens, highlighters and a scientific calculator.", img: IMG.bundle },
        { name: "Duvet & Linen Set (Double)", category: "bedding", condition: "new", price: 749, desc: "Warm winter duvet, fitted sheet, pillow and two covers.", img: IMG.bundle },
        { name: "Second-Hand Laptop Bag", category: "stationery", condition: "used", price: 180, desc: "Padded 15-inch bag, cleaned and checked by our team.", img: IMG.used },
        { name: "Load-Shedding Light Kit", category: "appliances", condition: "new", price: 329, desc: "Rechargeable lamp, power bank and extension lead.", img: IMG.bundle }
    ];

    // Defines a helper that formats numeric prices as South African Rand values.
    var currency = function (n) {
        return "R" + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    /* ---------- Toast helper ---------- */
    // Defines a reusable temporary notification for user feedback.
    function toast(msg) {
        var el = document.getElementById("toast");
        if (!el) {
        el = document.createElement("div");
        el.id = "toast";
        el.className = "toast";
        document.body.appendChild(el);
        }
        el.textContent = msg;
        el.classList.add("show");
        window.clearTimeout(el._t);
        el._t = window.setTimeout(function () { el.classList.remove("show"); }, 2200);
    }

    /* ---------- Tabs (Shop New / Second-Hand, Student / Parent FAQ) ---------- */
    // Defines the tab interface used for areas such as Student/Parent and New/Second-hand content.
    function initTabs() {
        Array.prototype.forEach.call(document.querySelectorAll("[data-tabs]"), function (group) {
        var buttons = group.querySelectorAll(".tab-btn");
        Array.prototype.forEach.call(buttons, function (btn) {
            btn.addEventListener("click", function () {
            Array.prototype.forEach.call(buttons, function (b) {
                b.setAttribute("aria-selected", "false");
                var p = document.getElementById(b.getAttribute("data-panel"));
                if (p) { p.hidden = true; }
            });
            btn.setAttribute("aria-selected", "true");
            var panel = document.getElementById(btn.getAttribute("data-panel"));
            if (panel) { panel.hidden = false; }
            });
        });
        });
    }

    /* ---------- Deals & Gallery: client-side filter + sort ---------- */
    // Converts one catalogue object into the HTML needed for a product card.
    function dealCard(item) {
        var badge = item.condition === "new"
        ? '<span class="badge badge-new">New</span>'
        : '<span class="badge badge-used">Second-hand</span>';
        return '<article class="card">' +
        '<img src="' + BASE + item.img + '" alt="' + item.name + '" loading="lazy" width="1200" height="900">' +
        '<div class="card-body">' +
        badge + '<span class="badge badge-verified">Verified Seller</span>' +
        '<h3>' + item.name + '</h3>' +
        '<p class="price">' + currency(item.price) + '</p>' +
        '<p>' + item.desc + '</p>' +
        '<button class="btn btn-sm" data-add="' + item.name + '" data-price="' + item.price + '">Add to Order Summary</button>' +
        '</div></article>';
    }

    // Initializes catalogue filtering, sorting, rendering, and result counting.
    function initDeals() {
        var out = document.getElementById("deals-results");
        if (!out) { return; }
        var search = document.getElementById("product-search");
        var cat = document.getElementById("filter-category");
        var cond = document.getElementById("filter-condition");
        var sort = document.getElementById("sort-by");
        var count = document.getElementById("deals-count");

        // Rebuilds the deal list whenever the search, filters or sort order changes.
        function render() {
        var term = search ? search.value.trim().toLowerCase() : "";
        var list = DEALS.filter(function (d) {
            var searchable = (d.name + " " + d.category + " " + d.condition + " " + d.desc).toLowerCase();
            return (!term || searchable.indexOf(term) !== -1) &&
            (cat.value === "all" || d.category === cat.value) &&
            (cond.value === "all" || d.condition === cond.value);
        });
        if (sort.value === "price-asc") { list.sort(function (a, b) { return a.price - b.price; }); }
        if (sort.value === "price-desc") { list.sort(function (a, b) { return b.price - a.price; }); }
        if (sort.value === "name") { list.sort(function (a, b) { return a.name.localeCompare(b.name); }); }
        out.innerHTML = list.length
            ? list.map(dealCard).join("")
            : '<div class="empty-state"><h3>No matches</h3><p>Try a different category or condition.</p></div>';
        if (count) {
            count.textContent = list.length + " of " + DEALS.length + " deals shown";
        }
        }
        [cat, cond, sort].forEach(function (el) { el.addEventListener("change", render); });
        if (search) { search.addEventListener("input", render); }
        render();
    }

    /* ---------- Gallery category filter ---------- */
    // Initializes the category buttons that show or hide gallery items.
    function initGalleryFilter() {
        var buttons = document.querySelectorAll("[data-gallery-filter]");
        if (!buttons.length) { return; }
        Array.prototype.forEach.call(buttons, function (btn) {
        btn.addEventListener("click", function () {
            var val = btn.getAttribute("data-gallery-filter");
            Array.prototype.forEach.call(buttons, function (b) {
            b.setAttribute("aria-selected", b === btn ? "true" : "false");
            });
            Array.prototype.forEach.call(document.querySelectorAll("[data-gallery-item]"), function (fig) {
            fig.hidden = !(val === "all" || fig.getAttribute("data-gallery-item") === val);
            });
        });
        });
    }

    /* ---------- Order summary: session-only, cleared on refresh ---------- */
    // Stores the current order in JavaScript memory; sessionStorage provides temporary persistence during the session.
    var order = [];   // in-memory only

    // Serializes the current order and saves it to sessionStorage.
    function saveSession() {
        try {
        window.sessionStorage.setItem("cc_order", JSON.stringify(order));
        } catch (e) { /* storage unavailable — memory only */ }
    }
    // Reads the saved order from sessionStorage when the page starts.
    function loadSession() {
        try {
        var raw = window.sessionStorage.getItem("cc_order");
        order = raw ? JSON.parse(raw) : [];
        } catch (e) { order = []; }
    }
    // Calculates the complete order value from each item price and quantity.
    function total() {
        return order.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    }
    // Updates every cart-count element with the total quantity currently in the order.
    function updateCartCount() {
        var qty = order.reduce(function (s, i) { return s + i.qty; }, 0);
        Array.prototype.forEach.call(document.querySelectorAll("[data-cart-count]"), function (el) {
        el.textContent = qty;
        });
    }

    // Adds a product to the order or increases its quantity if it already exists.
    function addItem(name, price) {
        var found = null;
        order.forEach(function (i) { if (i.name === name) { found = i; } });
        if (found) { found.qty += 1; } else { order.push({ name: name, price: Number(price), qty: 1 }); }
        saveSession();
        updateCartCount();
        renderOrder();
        toast(name + " added to your Order Summary");
    }

    // Adds delegated click handling for product buttons, including cards created dynamically.
    function initAddButtons() {
        document.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest("[data-add]") : null;
        if (!btn) { return; }
        e.preventDefault();
        addItem(btn.getAttribute("data-add"), btn.getAttribute("data-price"));
        });
    }

    // Rebuilds the Order Summary table and updates its total and empty-state display.
    function renderOrder() {
        var body = document.getElementById("order-body");
        if (!body) { return; }
        var wrap = document.getElementById("order-table-wrap");
        var empty = document.getElementById("order-empty");
        var totalEl = document.getElementById("order-total");

        if (!order.length) {
        if (wrap) { wrap.hidden = true; }
        if (empty) { empty.hidden = false; }
        if (totalEl) { totalEl.textContent = currency(0); }
        return;
        }
        if (wrap) { wrap.hidden = false; }
        if (empty) { empty.hidden = true; }

        body.innerHTML = order.map(function (i, idx) {
        return "<tr>" +
            "<td>" + i.name + "</td>" +
            "<td>" + currency(i.price) + "</td>" +
            "<td>" + i.qty + "</td>" +
            "<td>" + currency(i.price * i.qty) + "</td>" +
            '<td><button class="btn btn-sm btn-outline" data-remove="' + idx + '">Remove</button></td>' +
            "</tr>";
        }).join("");
        if (totalEl) { totalEl.textContent = currency(total()); }
    }

    // Initializes controls that are only needed on the Order Summary and checkout page.
    function initOrderPage() {
        var body = document.getElementById("order-body");
        if (!body) { return; }

        body.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest("[data-remove]") : null;
        if (!btn) { return; }
        order.splice(Number(btn.getAttribute("data-remove")), 1);
        saveSession();
        updateCartCount();
        renderOrder();
        toast("Item removed");
        });

        var clear = document.getElementById("order-clear");
        if (clear) {
        clear.addEventListener("click", function () {
            order = [];
            saveSession();
            updateCartCount();
            renderOrder();
            toast("Order Summary cleared");
        });
        }

        // "Skip to Address" step
        var skip = document.getElementById("skip-to-address");
        if (skip) {
        skip.addEventListener("click", function () {
            var step = document.getElementById("step-address");
            if (step) {
            step.scrollIntoView({ behavior: "smooth", block: "center" });
            var input = document.getElementById("delivery-address");
            if (input) { input.focus(); }
            }
        });
        }

        // Delivery vs collection toggle text
        var method = document.getElementById("delivery-method");
        var methodHint = document.getElementById("delivery-hint");
        if (method && methodHint) {
        method.addEventListener("change", function () {
            methodHint.textContent = method.value === "collection"
            ? "Collection is free at any listed campus, residence or locker point."
            : "Courier delivery is quoted per order and confirmed by our team before payment.";
        });
        }

        // Builds the plain-text order summary used by WhatsApp and email checkout.
        function orderText() {
        if (!order.length) { return "My Campus-Cart order summary is empty."; }
        var addr = (document.getElementById("delivery-address") || {}).value || "(not provided)";
        var m = (document.getElementById("delivery-method") || {}).value || "collection";
        var lines = order.map(function (i) {
            return "- " + i.name + " x" + i.qty + " = " + currency(i.price * i.qty);
        });
        return "Campus-Cart order summary\n" + lines.join("\n") +
            "\nTotal: " + currency(total()) +
            "\nMethod: " + m + "\nAddress / collection point: " + addr;
        }

        var wa = document.getElementById("checkout-whatsapp");
        if (wa) {
        wa.addEventListener("click", function (e) {
            e.preventDefault();
            if (!order.length) { return toast("Add an item first"); }
            window.open("https://wa.me/27123456789?text=" + encodeURIComponent(orderText()), "_blank");
        });
        }
        var mail = document.getElementById("checkout-email");
        if (mail) {
        mail.addEventListener("click", function (e) {
            e.preventDefault();
            if (!order.length) { return toast("Add an item first"); }
            window.location.href = "mailto:orders@campus-cart.co.za?subject=" +
            encodeURIComponent("Campus-Cart order request") +
            "&body=" + encodeURIComponent(orderText());
        });
        }
        var eft = document.getElementById("checkout-eft");
        if (eft) {
        eft.addEventListener("click", function () {
            var box = document.getElementById("eft-details");
            if (box) {
            box.hidden = !box.hidden;
            if (!box.hidden) { box.scrollIntoView({ behavior: "smooth", block: "center" }); }
            }
        });
        }

        renderOrder();
    }

    /* ---------- Account: reveal Student / Parent path from the hash ---------- */
    // Uses the URL hash to reveal and scroll to the Student or Parent account section.
    function initAccountHash() {
        if (!document.getElementById("student")) { return; }
        var hash = window.location.hash;
        if (hash === "#parent" || hash === "#student") {
        var el = document.querySelector(hash);
        if (el) { window.setTimeout(function () { el.scrollIntoView({ behavior: "smooth" }); }, 120); }
        }
    }

    /* ---------- Printable checklist ---------- */
    // Connects the checklist print button to the browser print dialog.
    function initPrint() {
        var btn = document.getElementById("print-checklist");
        if (btn) { btn.addEventListener("click", function () { window.print(); }); }
    }

    /* ---------- Forms: mailto hand-off only, no backend ---------- */
    // Converts website forms into mailto messages because Campus-Cart has no backend.
    function initMailForms() {
        Array.prototype.forEach.call(document.querySelectorAll("form[data-mailto]"), function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var to = form.getAttribute("data-mailto");
            var subject = form.getAttribute("data-subject") || "Campus-Cart website message";
            var lines = [];
            Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (f) {
            if (!f.name) { return; }
            var label = form.querySelector('label[for="' + f.id + '"]');
            lines.push((label ? label.textContent.replace("*", "").trim() : f.name) + ": " + f.value);
            });
            window.location.href = "mailto:" + to +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(lines.join("\n"));
            toast("Opening your email app…");
        });
        });
    }

    /* ---------- Product detail template: pick a product ---------- */
    // Initializes the product selector and keeps the detail panel synchronized with the selected product.
    function initProductDetail() {
        var select = document.getElementById("detail-select");
        if (!select) { return; }
        select.innerHTML = DEALS.map(function (d, i) {
        return '<option value="' + i + '">' + d.name + " — " + currency(d.price) + "</option>";
        }).join("");

        function render() {
        var d = DEALS[Number(select.value)] || DEALS[0];
        document.getElementById("detail-img").src = BASE + d.img;
        document.getElementById("detail-img").alt = d.name;
        document.getElementById("detail-name").textContent = d.name;
        document.getElementById("detail-price").textContent = currency(d.price);
        document.getElementById("detail-desc").textContent = d.desc;
        document.getElementById("detail-condition").textContent =
            d.condition === "new" ? "Brand new" : "Second-hand (reviewed)";
        var add = document.getElementById("detail-add");
        add.setAttribute("data-add", d.name);
        add.setAttribute("data-price", d.price);
        }
        select.addEventListener("change", render);
        render();
    }

    /* ---------- Boot ---------- */
    document.addEventListener("DOMContentLoaded", function () {
        loadSession();
        initNav();
        initTabs();
        initDeals();
        initGalleryFilter();
        initAddButtons();
        initProductDetail();
        initOrderPage();
        initAccountHash();
        initPrint();
        initMailForms();
        updateCartCount();
    });

// ==========================================================
// CAMPUS-CART
// UNIFIED PAGE LOADER & PAGE TRANSITION SYSTEM
// Features the Uiverse.io loader by Chris-immanuel-matthew
// Provides zero-flash initial loading and smooth page transitions.
// ==========================================================

(function () {
    "use strict";

    // Transition timing constants (in milliseconds)
    var TRANSITION_OUT_TIME = 2800; // Duration of smooth exit transition before navigating
    var MIN_LOADER_TIME = 320;     // Minimum display time for visual smoothness on fast loads
    var SAFETY_TIMEOUT = 6000;     // Failsafe timeout to prevent permanently stuck loader

    // State trackers
    var isNavigating = false;
    var pageLoadStartTime = Date.now();
    var loaderTimer = null;
    var safetyTimer = null;

    /**
     * Finds or dynamically creates the page loader element.
     * Ensures the loader is always available even if omitted from an HTML file.
     */
    function getOrCreateLoader() {
        var loader = document.getElementById("page-loader");
        if (!loader && document.body) {
            loader = document.createElement("div");
            loader.id = "page-loader";
            loader.className = "page-loader";
            loader.setAttribute("role", "status");
            loader.setAttribute("aria-live", "polite");
            loader.setAttribute("aria-label", "Loading Campus-Cart");
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
            document.body.prepend(loader);
        }
        return loader;
    }

    /**
     * Displays the full-screen loader and locks page scrolling.
     */
    function showPageLoader() {
        var loader = getOrCreateLoader();
        if (loader) {
            loader.classList.remove("is-hidden");
        }
        if (document.body) {
            document.body.classList.add("page-loading");
        }

        // Start failsafe safety timer
        if (safetyTimer) {
            clearTimeout(safetyTimer);
        }
        safetyTimer = setTimeout(function () {
            hidePageLoader();
            isNavigating = false;
        }, SAFETY_TIMEOUT);
    }

    /**
     * Smoothly hides the full-screen loader and restores page scrolling.
     */
    function hidePageLoader() {
        if (safetyTimer) {
            clearTimeout(safetyTimer);
            safetyTimer = null;
        }

        var loader = document.getElementById("page-loader");
        if (loader) {
            loader.classList.add("is-hidden");
        }
        if (document.body) {
            document.body.classList.remove("page-loading");
        }
    }

    /**
     * Completes initial page loading with a slight buffer so the animation
     * resolves smoothly without jarring or flashing.
     */
    function scheduleInitialHide() {
        var elapsedTime = Date.now() - pageLoadStartTime;
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
    function shouldTransition(link, url) {
        // Exclude external domains
        if (url.origin !== window.location.origin) {
            return false;
        }

        // Exclude links set to open in a new tab or specific target
        if (link.target && link.target !== "_self") {
            return false;
        }

        // Exclude file downloads
        if (link.hasAttribute("download")) {
            return false;
        }

        // Exclude external protocol schemes
        var href = link.getAttribute("href") || "";
        if (href.indexOf("mailto:") === 0 ||
            href.indexOf("tel:") === 0 ||
            href.indexOf("https://wa.me/") === 0 ||
            href.indexOf("javascript:") === 0) {
            return false;
        }

        // Exclude same-page hash jumps (e.g. #student, #parent, #top)
        var isSamePath = url.pathname === window.location.pathname;
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
    function handleInternalNavigation(destinationUrl) {
        isNavigating = true;
        showPageLoader();

        setTimeout(function () {
            window.location.href = destinationUrl;
        }, TRANSITION_OUT_TIME);
    }

    // Intercept normal internal clicks across the document
    document.addEventListener("click", function (event) {
        // Allow default browser behaviors for modified clicks (e.g. Ctrl+click, Cmd+click to open new tab)
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        var link = event.target.closest ? event.target.closest("a") : null;
        if (!link || !link.href) {
            return;
        }

        try {
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
    if (document.readyState === "complete") {
        scheduleInitialHide();
    } else {
        window.addEventListener("load", scheduleInitialHide, { once: true });
        // Also ensure hide fires if load event was delayed by third-party frames
        document.addEventListener("DOMContentLoaded", function () {
            setTimeout(scheduleInitialHide, 500);
        }, { once: true });
    }

    // Handle Browser Back / Browser Forward / BFCache restoration
    window.addEventListener("pageshow", function (event) {
        isNavigating = false;
        hidePageLoader();
    });

    // Expose control functions globally for safety/testing
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
    var IMG = {
        bundle: "images/bundles/starter-bundle.jpg",
        hero: "images/bundles/hero-campus.jpg",
        used: "images/second-hand/marketplace.jpg"
    };

    // Pages inside /pages/ are one level deeper than index.html.
    var BASE = window.location.pathname.indexOf("/pages/") > -1 ? "../assets/" : "assets/";

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

    var currency = function (n) {
        return "R" + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    /* ---------- Toast helper ---------- */
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

    function initDeals() {
        var out = document.getElementById("deals-results");
        if (!out) { return; }
        var cat = document.getElementById("filter-category");
        var cond = document.getElementById("filter-condition");
        var sort = document.getElementById("sort-by");
        var count = document.getElementById("deals-count");

        function render() {
        var list = DEALS.filter(function (d) {
            return (cat.value === "all" || d.category === cat.value) &&
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
        render();
    }

    /* ---------- Gallery category filter ---------- */
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
    var order = [];   // in-memory only

    function saveSession() {
        try {
        window.sessionStorage.setItem("cc_order", JSON.stringify(order));
        } catch (e) { /* storage unavailable — memory only */ }
    }
    function loadSession() {
        try {
        var raw = window.sessionStorage.getItem("cc_order");
        order = raw ? JSON.parse(raw) : [];
        } catch (e) { order = []; }
    }
    function total() {
        return order.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    }
    function updateCartCount() {
        var qty = order.reduce(function (s, i) { return s + i.qty; }, 0);
        Array.prototype.forEach.call(document.querySelectorAll("[data-cart-count]"), function (el) {
        el.textContent = qty;
        });
    }

    function addItem(name, price) {
        var found = null;
        order.forEach(function (i) { if (i.name === name) { found = i; } });
        if (found) { found.qty += 1; } else { order.push({ name: name, price: Number(price), qty: 1 }); }
        saveSession();
        updateCartCount();
        renderOrder();
        toast(name + " added to your Order Summary");
    }

    function initAddButtons() {
        document.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest("[data-add]") : null;
        if (!btn) { return; }
        e.preventDefault();
        addItem(btn.getAttribute("data-add"), btn.getAttribute("data-price"));
        });
    }

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
    function initAccountHash() {
        if (!document.getElementById("student")) { return; }
        var hash = window.location.hash;
        if (hash === "#parent" || hash === "#student") {
        var el = document.querySelector(hash);
        if (el) { window.setTimeout(function () { el.scrollIntoView({ behavior: "smooth" }); }, 120); }
        }
    }

    /* ---------- Printable checklist ---------- */
    function initPrint() {
        var btn = document.getElementById("print-checklist");
        if (btn) { btn.addEventListener("click", function () { window.print(); }); }
    }

    /* ---------- Forms: mailto hand-off only, no backend ---------- */
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

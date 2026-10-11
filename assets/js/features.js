// ==========================================================
// CAMPUS-CART
// Part 3 interactive features
//   1. Interactive collection-hub map (Leaflet)
//   2. Lightbox for every content image on the site
//   3. Product quick-view modal
//   4. FAQ accordion (one open answer at a time)
//   5. Scroll reveal animation for cards
// Every feature checks that its elements exist first, so this one
// file can be loaded safely on every page.
// ==========================================================

(function () {
    "use strict";

    // ------------------------------------------------------
    // SHARED HELPERS
    // ------------------------------------------------------

    // Creates an element, sets its class and text, and returns it.
    // Using textContent (not innerHTML) means text can never be read as HTML.
    function make(tag, className, text) {
        var node = document.createElement(tag);
        if (className) { node.className = className; }
        if (text) { node.textContent = text; }
        return node;
    }

    // Keeps Tab and Shift+Tab inside a dialog while it is open.
    function trapFocus(event, container) {
        if (event.key !== "Tab") { return; }
        var items = container.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        var visible = Array.prototype.filter.call(items, function (item) { return !item.disabled && !item.hidden; });
        if (!visible.length) { return; }
        var first = visible[0];
        var last = visible[visible.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    // ------------------------------------------------------
    // 1. INTERACTIVE HUB MAP (Leaflet + OpenStreetMap)
    // ------------------------------------------------------

    // Approximate city-centre coordinates for each collection hub city.
    // The hub names, addresses and hours come from PROVINCES in data.js.
    var HUB_COORDS = {
        "Gqeberha": [-33.9608, 25.6022],
        "Bloemfontein": [-29.0852, 26.1596],
        "Johannesburg": [-26.1929, 28.0305],
        "Pretoria": [-25.7479, 28.2293],
        "Durban": [-29.8179, 30.9420],
        "Polokwane": [-23.9045, 29.4689],
        "Mbombela": [-25.4753, 30.9694],
        "Kimberley": [-28.7323, 24.7623],
        "Potchefstroom": [-26.7145, 27.0970],
        "Cape Town": [-33.9575, 18.4764]
    };

    function initHubMap() {
        var box = document.getElementById("hub-map");
        if (!box) { return; }

        // If Leaflet or the hub data did not load, show a plain message instead of a blank box.
        if (typeof L === "undefined" || typeof PROVINCES === "undefined") {
            box.textContent = "The map could not be loaded. Please use the collection hub cards below.";
            box.classList.add("map-unavailable");
            return;
        }

        // Builds one list of hubs (name, province, address, hours, coordinates).
        var hubs = [];
        PROVINCES.forEach(function (province) {
            province.hubs.forEach(function (hub) {
                if (HUB_COORDS[hub.city]) {
                    hubs.push({
                        city: hub.city,
                        province: province.name,
                        address: hub.address,
                        hours: hub.hours,
                        coords: HUB_COORDS[hub.city]
                    });
                }
            });
        });

        var map = L.map(box, { scrollWheelZoom: false });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStreetMap</a> contributors"
        }).addTo(map);

        // Scroll-wheel zoom stays off until the map is clicked, so the page can still scroll past it.
        map.on("focus", function () { map.scrollWheelZoom.enable(); });
        map.on("blur", function () { map.scrollWheelZoom.disable(); });

        var markers = [];
        var bounds = [];
        hubs.forEach(function (hub, index) {
            // Popup content is built with DOM methods so no text is treated as HTML.
            var popup = make("div", "map-popup");
            popup.appendChild(make("strong", "", hub.city + ", " + hub.province));
            popup.appendChild(make("p", "", hub.address));
            popup.appendChild(make("p", "", hub.hours));

            var marker = L.marker(hub.coords, { title: hub.city + " collection hub", alt: hub.city + " collection hub" })
                .addTo(map)
                .bindPopup(popup);
            markers.push(marker);
            bounds.push(hub.coords);

            // Fills the "jump to a hub" dropdown at the same time.
            var select = document.getElementById("hub-select");
            if (select) {
                var option = document.createElement("option");
                option.value = String(index);
                option.textContent = hub.city + ", " + hub.province;
                select.appendChild(option);
            }
        });

        map.fitBounds(bounds, { padding: [30, 30] });

        // The dropdown gives keyboard and screen-reader users another way to reach each hub.
        var picker = document.getElementById("hub-select");
        if (picker) {
            picker.addEventListener("change", function () {
                if (picker.value === "") {
                    map.fitBounds(bounds, { padding: [30, 30] });
                    map.closePopup();
                    return;
                }
                var chosen = hubs[Number(picker.value)];
                map.setView(chosen.coords, 11);
                markers[Number(picker.value)].openPopup();
            });
        }

        // Makes sure the map redraws correctly if the layout changes size (for example rotating a phone).
        window.addEventListener("resize", function () { map.invalidateSize(); });
    }

    // ------------------------------------------------------
    // 2. IMAGE GALLERY LIGHTBOX
    // ------------------------------------------------------

    // Decides whether an image can be opened in the lightbox. Every photo in the page content can.
    // Logos, icons and other images that are links or buttons, map tiles, the viewer's own image
    // and purely decorative images (empty alt text) are left alone.
    function isViewable(img) {
        if (!img.closest("main")) { return false; }
        if (img.closest("a, button, .lightbox, .modal, .leaflet-container, [data-no-lightbox]")) { return false; }
        return img.getAttribute("alt") !== null && img.getAttribute("alt").trim() !== "";
    }

    function initLightbox() {
        if (!document.querySelector("main img")) { return; }

        // Builds the lightbox once and hides it until an image is chosen.
        var overlay = make("div", "lightbox");
        overlay.hidden = true;
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Image viewer");

        var closeBtn = make("button", "lb-btn lb-close", "\u00D7");
        closeBtn.type = "button";
        closeBtn.setAttribute("aria-label", "Close image viewer");

        var prevBtn = make("button", "lb-btn lb-prev", "\u2039");
        prevBtn.type = "button";
        prevBtn.setAttribute("aria-label", "Previous image");

        var nextBtn = make("button", "lb-btn lb-next", "\u203A");
        nextBtn.type = "button";
        nextBtn.setAttribute("aria-label", "Next image");

        var figure = make("figure", "lb-figure");
        var bigImage = make("img", "lb-image");
        var caption = make("figcaption", "lb-caption");
        var counter = make("p", "lb-count");
        figure.appendChild(bigImage);
        figure.appendChild(caption);
        figure.appendChild(counter);

        overlay.appendChild(closeBtn);
        overlay.appendChild(prevBtn);
        overlay.appendChild(figure);
        overlay.appendChild(nextBtn);
        document.body.appendChild(overlay);

        var current = [];   // the images the viewer can move between
        var position = 0;   // which one is showing
        var opener = null;  // the thumbnail to return focus to

        // Next and previous move between the images that sit together: the same gallery,
        // card grid or section. Only images the visitor can currently see are included
        // (the gallery filter and the tabs hide some of them).
        function groupFor(img) {
            var container = img.closest(".gallery, .grid, section") || document.querySelector("main");
            return Array.prototype.filter.call(container.querySelectorAll("img"), function (candidate) {
                return isViewable(candidate) && !candidate.closest("[hidden]");
            });
        }

        // The caption is the figure caption, or the heading of the card the image sits in, or the alt text.
        function captionFor(img) {
            var figcaption = img.closest("figure") ? img.closest("figure").querySelector("figcaption") : null;
            if (figcaption) { return figcaption.textContent; }
            var card = img.closest(".card");
            var heading = card ? card.querySelector("h3") : null;
            return heading ? heading.textContent : img.alt;
        }

        function show(index) {
            position = (index + current.length) % current.length;
            var img = current[position];
            bigImage.src = img.currentSrc || img.src;
            bigImage.alt = img.alt;
            caption.textContent = captionFor(img);
            counter.textContent = "Image " + (position + 1) + " of " + current.length;
            // Next and previous make no sense with a single image.
            prevBtn.hidden = nextBtn.hidden = current.length < 2;
        }

        function open(img) {
            opener = img;
            current = groupFor(img);
            show(current.indexOf(img));
            overlay.hidden = false;
            document.body.classList.add("lightbox-open");
            closeBtn.focus();
        }

        function close() {
            overlay.hidden = true;
            document.body.classList.remove("lightbox-open");
            if (opener) { opener.focus(); }
        }

        // Makes an image behave like a button for mouse, touch and keyboard users.
        function prepare(img) {
            if (!isViewable(img) || img.getAttribute("role") === "button") { return; }
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            img.setAttribute("aria-label", "View larger image: " + img.alt);
        }

        Array.prototype.forEach.call(document.querySelectorAll("main img"), prepare);

        // Product cards are added by JavaScript after the page loads (and rebuilt when the filters change),
        // so new images are prepared as they appear.
        new MutationObserver(function (changes) {
            changes.forEach(function (change) {
                Array.prototype.forEach.call(change.addedNodes, function (node) {
                    if (node.nodeType !== 1) { return; }
                    if (node.tagName === "IMG") { prepare(node); }
                    Array.prototype.forEach.call(node.querySelectorAll("img"), prepare);
                });
            });
        }).observe(document.querySelector("main"), { childList: true, subtree: true });

        // One click and one key listener on the page handle every image, including ones added later.
        document.addEventListener("click", function (event) {
            var img = event.target.closest ? event.target.closest("img") : null;
            if (img && img.getAttribute("role") === "button" && isViewable(img)) { open(img); }
        });
        document.addEventListener("keydown", function (event) {
            var img = event.target;
            if (img && img.tagName === "IMG" && img.getAttribute("role") === "button" &&
                (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                open(img);
            }
        });

        closeBtn.addEventListener("click", close);
        prevBtn.addEventListener("click", function () { show(position - 1); });
        nextBtn.addEventListener("click", function () { show(position + 1); });

        // Clicking the dark area around the picture closes the viewer.
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) { close(); }
        });

        overlay.addEventListener("keydown", function (event) {
            if (event.key === "Escape") { close(); }
            if (event.key === "ArrowLeft" && current.length > 1) { show(position - 1); }
            if (event.key === "ArrowRight" && current.length > 1) { show(position + 1); }
            trapFocus(event, overlay);
        });

        // Swiping left or right changes image on phones.
        var touchStartX = null;
        overlay.addEventListener("touchstart", function (event) {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });
        overlay.addEventListener("touchend", function (event) {
            if (touchStartX === null || current.length < 2) { return; }
            var distance = event.changedTouches[0].clientX - touchStartX;
            if (Math.abs(distance) > 50) { show(distance > 0 ? position - 1 : position + 1); }
            touchStartX = null;
        }, { passive: true });
    }

    // ------------------------------------------------------
    // 3. PRODUCT QUICK-VIEW MODAL
    // ------------------------------------------------------

    function initQuickView() {
        // Only pages that show deal cards need the modal.
        if (!document.getElementById("deals-results")) { return; }

        var backdrop = make("div", "modal-backdrop");
        backdrop.hidden = true;

        var dialog = make("div", "modal");
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-labelledby", "modal-title");

        var closeBtn = make("button", "modal-close", "\u00D7");
        closeBtn.type = "button";
        closeBtn.setAttribute("aria-label", "Close product details");

        var picture = make("img", "modal-image");
        var body = make("div", "modal-body");
        var badge = make("span", "badge");
        var title = make("h2", "", "");
        title.id = "modal-title";
        var price = make("p", "price");
        var description = make("p");
        var addBtn = make("button", "btn", "Add to Order Summary");
        addBtn.type = "button";

        body.appendChild(badge);
        body.appendChild(title);
        body.appendChild(price);
        body.appendChild(description);
        body.appendChild(addBtn);
        dialog.appendChild(closeBtn);
        dialog.appendChild(picture);
        dialog.appendChild(body);
        backdrop.appendChild(dialog);
        document.body.appendChild(backdrop);

        var opener = null;

        function close() {
            backdrop.hidden = true;
            document.body.classList.remove("lightbox-open");
            if (opener) { opener.focus(); }
        }

        // The deal cards are rebuilt every time the filters change,
        // so one click listener on the document handles every Quick view button.
        document.addEventListener("click", function (event) {
            var button = event.target.closest ? event.target.closest("[data-quickview]") : null;
            if (!button) { return; }
            opener = button;

            picture.src = button.getAttribute("data-img");
            picture.alt = button.getAttribute("data-name");
            title.textContent = button.getAttribute("data-name");
            description.textContent = button.getAttribute("data-desc");
            price.textContent = "R" + Number(button.getAttribute("data-price")).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            badge.textContent = button.getAttribute("data-condition") === "new" ? "New" : "Second-hand";
            badge.className = "badge " + (button.getAttribute("data-condition") === "new" ? "badge-new" : "badge-used");

            // The existing Order Summary code listens for data-add on the whole document,
            // so setting these two attributes is enough to make the modal button work.
            addBtn.setAttribute("data-add", button.getAttribute("data-name"));
            addBtn.setAttribute("data-price", button.getAttribute("data-price"));

            backdrop.hidden = false;
            document.body.classList.add("lightbox-open");
            closeBtn.focus();
        });

        // Adding an item closes the modal so the visitor sees the confirmation message.
        addBtn.addEventListener("click", function () { window.setTimeout(close, 0); });
        closeBtn.addEventListener("click", close);
        backdrop.addEventListener("click", function (event) {
            if (event.target === backdrop) { close(); }
        });
        backdrop.addEventListener("keydown", function (event) {
            if (event.key === "Escape") { close(); }
            trapFocus(event, dialog);
        });
    }

    // ------------------------------------------------------
    // 4. FAQ ACCORDION
    // ------------------------------------------------------

    function initAccordion() {
        Array.prototype.forEach.call(document.querySelectorAll(".accordion"), function (group) {
            var items = group.querySelectorAll("details");
            Array.prototype.forEach.call(items, function (item) {
                // When one answer opens, the others in the same group close.
                item.addEventListener("toggle", function () {
                    if (!item.open) { return; }
                    Array.prototype.forEach.call(items, function (other) {
                        if (other !== item) { other.open = false; }
                    });
                });
            });
        });
    }

    // ------------------------------------------------------
    // 5. SCROLL REVEAL ANIMATION
    // ------------------------------------------------------

    function initReveal() {
        // Older browsers simply show everything straight away.
        if (!("IntersectionObserver" in window)) { return; }

        var targets = document.querySelectorAll("main .card, main .info-box, main .split-card, main .gallery figure");
        if (!targets.length) { return; }

        document.documentElement.classList.add("js-reveal");

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        Array.prototype.forEach.call(targets, function (target) {
            target.classList.add("reveal");
            observer.observe(target);
        });
    }

    // ------------------------------------------------------
    // START
    // ------------------------------------------------------

    document.addEventListener("DOMContentLoaded", function () {
        initHubMap();
        initLightbox();
        initQuickView();
        initAccordion();
        initReveal();
    });
})();

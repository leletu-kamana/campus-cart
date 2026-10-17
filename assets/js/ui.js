// ==========================================================
// CAMPUS-CART
// Interface helpers (UI/UX upgrade)
// - Measures the sticky header so anchor links never hide behind it.
// - Adds a shadow to the header once the page is scrolled.
// - Adds a back-to-top button on long pages.
// - Plays a small animation on the order count when an item is added.
// - Lets the Escape key close the mobile menu.
// Plain JavaScript, no libraries. The site still works if this file fails to load.
// ==========================================================

(function () { // Wraps the code in a function so its variables stay private.
    "use strict"; // Turns on stricter error checking.

    var root = document.documentElement; // The <html> element, where the CSS variables are set.
    var header = document.querySelector(".topbar"); // The sticky site header.
    var subnav = document.querySelector(".subnav"); // The sticky sub-navigation bar, if the page has one.
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; // Whether the visitor asked for less motion.

    // ---------- Sticky offsets ----------
    function measure() { // Stores the sticky bar heights as CSS variables.
        var headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 0; // Height of the header.
        var subnavHeight = subnav ? Math.round(subnav.getBoundingClientRect().height) : 0; // Height of the sub-navigation.
        root.style.setProperty("--header-h", headerHeight + "px"); // Lets the sub-navigation stick just under the header.
        root.style.setProperty("--sticky-offset", (headerHeight + subnavHeight) + "px"); // Lets anchor links stop below both bars.
    }

    if (header) { // Only measures when the page has a header.
        measure(); // Measures once straight away.
        window.addEventListener("resize", measure); // Measures again when the window changes size.
        if (window.ResizeObserver) { new ResizeObserver(measure).observe(header); } // Measures again when the header grows, for example when the mobile menu opens.
    }

    // ---------- Header shadow and back-to-top button ----------
    var toTop = document.createElement("button"); // Creates the back-to-top button.
    toTop.type = "button"; // Makes it a plain button.
    toTop.className = "to-top"; // Gives it the styling class.
    toTop.setAttribute("aria-label", "Back to top"); // Gives it a name for screen readers.
    toTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>'; // Draws an upward arrow.
    toTop.addEventListener("click", function () { // Listens for a click on the button.
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); // Scrolls to the top, without animation if motion is reduced.
        var logo = document.querySelector(".logo"); // Finds the logo at the start of the page.
        if (logo) { logo.focus({ preventScroll: true }); } // Moves keyboard focus back to the start of the page.
    });
    document.body.appendChild(toTop); // Adds the button to the page.

    var ticking = false; // Remembers whether a scroll update is already queued.
    function onScroll() { // Updates the header and the button after scrolling.
        var y = window.pageYOffset || root.scrollTop; // How far the page is scrolled.
        if (header) { header.classList.toggle("is-scrolled", y > 8); } // Shows the header shadow after a small scroll.
        toTop.classList.toggle("is-visible", y > 700); // Shows the button after a longer scroll.
        ticking = false; // Allows the next update to be queued.
    }
    window.addEventListener("scroll", function () { // Listens for scrolling.
        if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); } // Runs the update once per frame.
    }, { passive: true }); // Marks the listener as passive so scrolling stays smooth.
    onScroll(); // Sets the correct state when the page first loads.

    // ---------- Cart count animation ----------
    var counts = document.querySelectorAll("[data-cart-count]"); // Finds every order count on the page.
    Array.prototype.forEach.call(counts, function (badge) { // Loops through the counts.
        var last = badge.textContent; // Remembers the number shown now.
        new MutationObserver(function () { // Watches the count for changes.
            if (badge.textContent === last) { return; } // Ignores changes that do not alter the number.
            last = badge.textContent; // Remembers the new number.
            badge.classList.remove("is-bump"); // Resets the animation so it can play again.
            void badge.offsetWidth; // Forces the browser to notice the reset.
            badge.classList.add("is-bump"); // Plays the pop animation.
        }).observe(badge, { childList: true, characterData: true, subtree: true }); // Watches for text changes.
    });

    // ---------- Profile photo fallback ----------
    // The About page photo is hosted by another site. If it cannot load, a round badge with the author's initials is shown instead.
    function initialsBadge(img) { // Replaces a broken photo with an initials badge.
        if (img.getAttribute("data-fallback")) { return; } // Does nothing if the badge is already showing.
        var name = (img.getAttribute("alt") || "").split(",")[0]; // Takes the name from the alt text, before the first comma.
        var initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("") || "CC"; // Builds up to two initials.
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#0d1b3e"/><text x="60" y="72" font-family="Arial, sans-serif" font-size="44" font-weight="700" text-anchor="middle" fill="#ffd23f">' + initials + '</text></svg>'; // Draws the badge as an SVG image.
        img.setAttribute("data-fallback", "true"); // Marks the photo so this runs only once.
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); // Shows the badge.
    }
    document.addEventListener("error", function (e) { // Listens for images that fail to load (capture phase, because the error event does not bubble).
        if (e.target && e.target.tagName === "IMG" && e.target.classList.contains("author")) { initialsBadge(e.target); } // Only handles the author photo.
    }, true); // The true makes the listener work in the capture phase.
    Array.prototype.forEach.call(document.querySelectorAll("img.author"), function (img) { // Checks photos that already failed before this script ran.
        if (img.complete && img.naturalWidth === 0) { initialsBadge(img); } // Replaces a photo that has already failed.
    });

    // ---------- Mobile menu ----------
    document.addEventListener("keydown", function (e) { // Listens for key presses.
        if (e.key !== "Escape") { return; } // Ignores every key except Escape.
        var menu = document.querySelector(".nav-links.open, .nav-links.is-open"); // Finds the menu if it is open.
        if (!menu) { return; } // Stops when the menu is closed.
        menu.classList.remove("open", "is-open"); // Closes the menu.
        var toggle = document.querySelector(".nav-toggle"); // Finds the Menu button.
        if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.focus(); } // Updates the button state and returns focus to it.
    });
})();

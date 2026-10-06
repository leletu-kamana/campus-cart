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

// Waits until the HTML page has finished loading before running the JavaScript.
document.addEventListener("DOMContentLoaded", function () {

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

// Closes the DOMContentLoaded function.
});
// ==========================================================
// CAMPUS-CART
// UNIFIED PAGE LOADER & PAGE TRANSITION SYSTEM
// Features the Uiverse.io loader by Chris-immanuel-matthew
// Provides zero-flash initial loading and smooth page transitions.
// ==========================================================

(function () { // Starts a nested object, array, or grouped expression.
    // Enables JavaScript strict mode so unsafe or undeclared code is caught instead of silently continuing.
    "use strict"; // Sets the string value used by this statement.

    // Transition timing constants (in milliseconds)
    // Stores the duration of the loader exit transition before the browser navigates to another page.
    var TRANSITION_OUT_TIME = 1200; // Duration of smooth exit transition before navigating (kept short so pages feel quick)
    // Stores the minimum time the loader remains visible so very fast loads still look smooth.
    var MIN_LOADER_TIME = 260;     // Minimum display time for visual smoothness on fast loads
    // Stores the maximum loader time before the failsafe automatically hides it.
    var SAFETY_TIMEOUT = 6000;     // Failsafe timeout to prevent permanently stuck loader

    // State trackers
    // Tracks whether an internal page transition is already running.
    var isNavigating = false; // Declares a variable and stores the value needed by this part of the script.
    // Records when this script started so the minimum loader duration can be calculated.
    var pageLoadStartTime = Date.now(); // Declares a variable and stores the value needed by this part of the script.
    // Stores the timer used to hide the loader after the initial page load.
    var loaderTimer = null; // Declares a variable and stores the value needed by this part of the script.
    // Stores the failsafe timer that prevents a permanently visible loader.
    var safetyTimer = null; // Declares a variable and stores the value needed by this part of the script.

    /**
     * Finds or dynamically creates the page loader element.
     * Ensures the loader is always available even if omitted from an HTML file.
     */
    // Defines the function that finds the loader or creates it when an HTML page does not contain one.
    function getOrCreateLoader() { // Declares a function that groups this behaviour for reuse.
        // Searches the document for the element identified as the page loader.
        var loader = document.getElementById("page-loader"); // Declares a variable and stores the value needed by this part of the script.
        if (!loader && document.body) { // Checks this condition before running the following block.
            // Creates a div element when the loader is missing from the HTML.
            loader = document.createElement("div"); // Assigns the calculated value to the relevant variable or property.
            // Assigns the ID used by CSS and other JavaScript loader controls.
            loader.id = "page-loader"; // Assigns the calculated value to the relevant variable or property.
            // Assigns the CSS class that controls the loader overlay appearance.
            loader.className = "page-loader"; // Assigns the calculated value to the relevant variable or property.
            // Identifies the loader as a status message for assistive technologies.
            loader.setAttribute("role", "status"); // Reads or updates an HTML attribute used by this feature.
            // Allows screen readers to announce the status without interrupting the user.
            loader.setAttribute("aria-live", "polite"); // Reads or updates an HTML attribute used by this feature.
            // Gives the loader an accessible description.
            loader.setAttribute("aria-label", "Loading Campus-Cart"); // Reads or updates an HTML attribute used by this feature.
            // Builds the loader HTML structure as one string before inserting it into the document.
            loader.innerHTML = // Updates the content displayed inside the relevant page element.
                '<div class="page-loader-content">' + // Provides a string value used to build the page content or message.
                '  <div class="page-loader-visual">' + // Provides a string value used to build the page content or message.
                '    <div class="loader" aria-hidden="true">' + // Provides a string value used to build the page content or message.
                '      <div class="nucleus"></div>' + // Provides a string value used to build the page content or message.
                '      <div class="ring"></div>' + // Provides a string value used to build the page content or message.
                '      <div class="ring"></div>' + // Provides a string value used to build the page content or message.
                '      <div class="ring"></div>' + // Provides a string value used to build the page content or message.
                '      <div class="ring"></div>' + // Provides a string value used to build the page content or message.
                '      <div class="ring"></div>' + // Provides a string value used to build the page content or message.
                '      <div class="ring"></div>' + // Provides a string value used to build the page content or message.
                '    </div>' + // Provides a string value used to build the page content or message.
                '  </div>' + // Provides a string value used to build the page content or message.
                '  <div class="page-loader-brand" aria-hidden="true">' + // Provides a string value used to build the page content or message.
                '    <span class="page-loader-title">Campus<span>-Cart</span></span>' + // Provides a string value used to build the page content or message.
                '    <span class="page-loader-text">Loading Campus-Cart...</span>' + // Provides a string value used to build the page content or message.
                '  </div>' + // Provides a string value used to build the page content or message.
                '</div>'; // Sets the string value used by this statement.
            // Places the loader at the beginning of the body so it can cover the page content.
            document.body.prepend(loader); // Calls the required function to carry out this operation.
        } // Opens or closes the surrounding code structure.
        // Returns the loader element to the function that requested it.
        return loader; // Returns the result or exits this function at this point.
    } // Opens or closes the surrounding code structure.

    /**
     * Displays the full-screen loader and locks page scrolling.
     */
    // Defines the function that displays the full-screen loader and locks page scrolling.
    function showPageLoader() { // Declares a function that groups this behaviour for reuse.
        // Gets the existing loader or creates one before changing its state.
        var loader = getOrCreateLoader(); // Declares a variable and stores the value needed by this part of the script.
        if (loader) { // Checks this condition before running the following block.
            // Removes the hidden class so the loader becomes visible.
            loader.classList.remove("is-hidden"); // Updates or checks a CSS class to control the element's state or appearance.
        } // Opens or closes the surrounding code structure.
        if (document.body) { // Checks this condition before running the following block.
            // Adds the page-loading class so CSS can prevent scrolling while loading.
            document.body.classList.add("page-loading"); // Updates or checks a CSS class to control the element's state or appearance.
        } // Opens or closes the surrounding code structure.

        // Start failsafe safety timer
        if (safetyTimer) { // Checks this condition before running the following block.
            clearTimeout(safetyTimer); // Calls the required function to carry out this operation.
        } // Opens or closes the surrounding code structure.
        // Starts a failsafe timer in case the normal navigation process becomes stuck.
        safetyTimer = setTimeout(function () { // Assigns the calculated value to the relevant variable or property.
            hidePageLoader(); // Calls the required function to carry out this operation.
            isNavigating = false; // Assigns the calculated value to the relevant variable or property.
        }, SAFETY_TIMEOUT); // Closes the current expression or code structure.
    } // Opens or closes the surrounding code structure.

    /**
     * Smoothly hides the full-screen loader and restores page scrolling.
     */
    // Defines the function that hides the loader and restores normal page scrolling.
    function hidePageLoader() { // Declares a function that groups this behaviour for reuse.
        if (safetyTimer) { // Checks this condition before running the following block.
            clearTimeout(safetyTimer); // Calls the required function to carry out this operation.
            safetyTimer = null; // Assigns the calculated value to the relevant variable or property.
        } // Opens or closes the surrounding code structure.

        var loader = document.getElementById("page-loader"); // Declares a variable and stores the value needed by this part of the script.
        if (loader) { // Checks this condition before running the following block.
            // Adds the hidden class so the loader can fade or transition out.
            loader.classList.add("is-hidden"); // Updates or checks a CSS class to control the element's state or appearance.
        } // Opens or closes the surrounding code structure.
        if (document.body) { // Checks this condition before running the following block.
            // Removes the page-loading class and restores normal scrolling.
            document.body.classList.remove("page-loading"); // Updates or checks a CSS class to control the element's state or appearance.
        } // Opens or closes the surrounding code structure.
    } // Opens or closes the surrounding code structure.

    /**
     * Completes initial page loading with a slight buffer so the animation
     * resolves smoothly without jarring or flashing.
     */
    // Calculates when the initial loader should hide while respecting the minimum display time.
    function scheduleInitialHide() { // Declares a function that groups this behaviour for reuse.
        // Calculates the number of milliseconds that have passed since the script started.
        var elapsedTime = Date.now() - pageLoadStartTime; // Declares a variable and stores the value needed by this part of the script.
        // Calculates the remaining minimum loader time and prevents a negative delay.
        var remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime); // Declares a variable and stores the value needed by this part of the script.

        if (loaderTimer) { // Checks this condition before running the following block.
            clearTimeout(loaderTimer); // Calls the required function to carry out this operation.
        } // Opens or closes the surrounding code structure.

        loaderTimer = setTimeout(function () { // Assigns the calculated value to the relevant variable or property.
            hidePageLoader(); // Calls the required function to carry out this operation.
        }, remainingTime); // Closes the current expression or code structure.
    } // Opens or closes the surrounding code structure.

    /**
     * Determines whether an anchor link should trigger the smooth internal page transition.
     * Excludes external links, mailto, tel, WhatsApp, download links, target="_blank", and anchor jumps.
     */
    // Determines whether a clicked link should use the custom Campus-Cart page transition.
    function shouldTransition(link, url) { // Declares a function that groups this behaviour for reuse.
        // Exclude external domains
        // Rejects links that point to a different website origin.
        if (url.origin !== window.location.origin) { // Checks this condition before running the following block.
            return false; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        // Exclude links set to open in a new tab or specific target
        // Rejects links that intentionally open in another browsing context.
        if (link.target && link.target !== "_self") { // Checks this condition before running the following block.
            return false; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        // Exclude file downloads
        // Rejects links intended to download a file instead of navigating between pages.
        if (link.hasAttribute("download")) { // Checks this condition before running the following block.
            return false; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        // Exclude external protocol schemes
        // Reads the original href attribute so special protocols can be identified.
        var href = link.getAttribute("href") || ""; // Declares a variable and stores the value needed by this part of the script.
        if (href.indexOf("mailto:") === 0 || // Checks this condition before running the following block.
            href.indexOf("tel:") === 0 || // Calls the required function to carry out this operation.
            href.indexOf("https://wa.me/") === 0 || // Calls the required function to carry out this operation.
            href.indexOf("javascript:") === 0) { // Calls the required function to carry out this operation.
            return false; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        // Exclude same-page hash jumps (e.g. #student, #parent, #top)
        // Checks whether the destination uses the same path as the current page.
        var isSamePath = url.pathname === window.location.pathname; // Declares a variable and stores the value needed by this part of the script.
        // Checks whether the destination has the same query-string parameters.
        var isSameSearch = url.search === window.location.search; // Declares a variable and stores the value needed by this part of the script.
        if (isSamePath && isSameSearch && url.hash !== "") { // Checks this condition before running the following block.
            return false; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        // Exclude clicking the exact same URL if already on it
        if (isSamePath && isSameSearch && !url.hash && !window.location.hash) { // Checks this condition before running the following block.
            return false; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        return true; // Returns the result or exits this function at this point.
    } // Opens or closes the surrounding code structure.

    /**
     * Initiates the internal page transition:
     * 1. Displays the loader overlay.
     * 2. Waits for the smooth exit transition duration.
     * 3. Navigates to the destination page.
     */
    // Starts the custom transition before navigating to the requested internal URL.
    function handleInternalNavigation(destinationUrl) { // Declares a function that groups this behaviour for reuse.
        // Locks the transition state so repeated clicks cannot start duplicate navigations.
        isNavigating = true; // Assigns the calculated value to the relevant variable or property.
        // Displays the loader before the browser changes the current document.
        showPageLoader(); // Calls the required function to carry out this operation.

        setTimeout(function () { // Calls the required function to carry out this operation.
            // Navigates the browser to the destination after the exit transition finishes.
            window.location.href = destinationUrl; // Assigns the calculated value to the relevant variable or property.
        }, TRANSITION_OUT_TIME); // Closes the current expression or code structure.
    } // Opens or closes the surrounding code structure.

    // Intercept normal internal clicks across the document
    // Watches document clicks so eligible internal anchor links can use the custom transition.
    document.addEventListener("click", function (event) { // Registers an event listener so this code runs when the specified event occurs.
        // Allow default browser behaviors for modified clicks (e.g. Ctrl+click, Cmd+click to open new tab)
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { // Checks this condition before running the following block.
            return; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        // Finds the nearest anchor element associated with the clicked target.
        var link = event.target.closest ? event.target.closest("a") : null; // Declares a variable and stores the value needed by this part of the script.
        if (!link || !link.href) { // Checks this condition before running the following block.
            return; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.

        try { // Starts a protected block for operations that may fail.
            // Creates a complete URL object using the current page URL as the base.
            var url = new URL(link.href, window.location.href); // Declares a variable and stores the value needed by this part of the script.

            if (!shouldTransition(link, url)) { // Checks this condition before running the following block.
                return; // Returns the result or exits this function at this point.
            } // Opens or closes the surrounding code structure.

            // If a transition is already in flight, block rapid duplicate clicks
            if (isNavigating) { // Checks this condition before running the following block.
                event.preventDefault(); // Calls the required function to carry out this operation.
                return; // Returns the result or exits this function at this point.
            } // Opens or closes the surrounding code structure.

            event.preventDefault(); // Calls the required function to carry out this operation.
            handleInternalNavigation(url.href); // Calls the required function to carry out this operation.
        } catch (e) { // Closes the current expression or code structure.
            // If URL parsing fails, allow standard browser navigation
        } // Opens or closes the surrounding code structure.
    }); // Closes the current expression, callback, or code block.

    // Handle initial page load lifecycle
    // Checks whether the browser has already completed the page loading lifecycle.
    if (document.readyState === "complete") { // Checks this condition before running the following block.
        scheduleInitialHide(); // Calls the required function to carry out this operation.
    } else { // Runs the alternative branch when the preceding condition is not met.
        // Runs the initial loader hide logic once page resources have finished loading.
        window.addEventListener("load", scheduleInitialHide, { once: true }); // Registers an event listener so this code runs when the specified event occurs.
        // Also ensure hide fires if load event was delayed by third-party frames
        // Provides an additional fallback based on DOM readiness.
        // Waits until the HTML has been parsed before initializing features that depend on page elements.
    document.addEventListener("DOMContentLoaded", function () { // Registers an event listener so this code runs when the specified event occurs.
            setTimeout(scheduleInitialHide, 500); // Calls the required function to carry out this operation.
        }, { once: true }); // Closes the current expression or code structure.
    } // Opens or closes the surrounding code structure.

    // Handle Browser Back / Browser Forward / BFCache restoration
    // Handles browser back, forward, and BFCache restoration events.
    window.addEventListener("pageshow", function (event) { // Registers an event listener so this code runs when the specified event occurs.
        isNavigating = false; // Assigns the calculated value to the relevant variable or property.
        hidePageLoader(); // Calls the required function to carry out this operation.
    }); // Closes the current expression, callback, or code block.

    // Expose control functions globally for safety/testing
    // Exposes loader controls globally for testing or controlled use by other scripts.
    window.CampusCartLoader = { // Assigns the calculated value to the relevant variable or property.
        show: showPageLoader, // Defines this property or argument within the current object or call.
        hide: hidePageLoader, // Defines this property or argument within the current object or call.
        isNavigating: function () { return isNavigating; } // Defines this property or argument within the current object or call.
    }; // Opens or closes the surrounding code structure.

})(); // Closes the callback and completes the surrounding function call.

// ==========================================================
// CAMPUS-CART
// Navigation JavaScript
// Mobile menu toggle
// ==========================================================

// Sets up the mobile navigation menu after the page has loaded.
// Defines the mobile navigation setup function used after the page DOM is ready.
function initNav() { // Declares a function that groups this behaviour for reuse.

    // Finds the mobile navigation button using its class name.
    const navToggle = document.querySelector(".nav-toggle"); // Declares a variable and stores the value needed by this part of the script.

    // Finds the navigation links container using its class name.
    const navLinks = document.querySelector(".nav-links"); // Declares a variable and stores the value needed by this part of the script.

    // Checks if the navigation button or navigation links cannot be found.
    if (!navToggle || !navLinks) { // Checks this condition before running the following block.

        // Stops the function from continuing if the navigation elements are missing.
        return; // Returns the result or exits this function at this point.
    } // Opens or closes the surrounding code structure.

    // Adds a click event to the mobile navigation button.
    navToggle.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.

        // Checks if the navigation menu currently has the "open" class.
        const isOpen = // Declares a variable and stores the value needed by this part of the script.
            navLinks.classList.contains("open") || // Updates or checks a CSS class to control the element's state or appearance.

            // Also checks if the navigation menu has the "is-open" class.
            navLinks.classList.contains("is-open"); // Updates or checks a CSS class to control the element's state or appearance.

        // Checks if the navigation menu is currently open.
        if (isOpen) { // Checks this condition before running the following block.

            // Removes the "open" class to close the navigation menu.
            navLinks.classList.remove("open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Removes the "is-open" class to make sure the menu is closed.
            navLinks.classList.remove("is-open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Changes the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false"); // Reads or updates an HTML attribute used by this feature.

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Reads or updates an HTML attribute used by this feature.

        // Runs this part when the navigation menu is currently closed.
        } else { // Runs the alternative branch when the preceding condition is not met.

            // Adds the "open" class to display the mobile navigation menu.
            navLinks.classList.add("open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Changes the accessibility value to show that the menu is open.
            navToggle.setAttribute("aria-expanded", "true"); // Reads or updates an HTML attribute used by this feature.

            // Changes the accessibility label to show that the menu can be closed.
            navToggle.setAttribute("aria-label", "Close navigation menu"); // Reads or updates an HTML attribute used by this feature.
        } // Opens or closes the surrounding code structure.
    }); // Closes the current expression, callback, or code block.

    // Finds all links inside the navigation menu.
    const links = navLinks.querySelectorAll("a"); // Declares a variable and stores the value needed by this part of the script.

    // Goes through each navigation link one at a time.
    links.forEach(function (link) { // Processes the collection to update or calculate the required data.

        // Adds a click event to each navigation link.
        link.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.

            // Removes the "open" class after a navigation link is selected.
            navLinks.classList.remove("open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Removes the "is-open" class after a navigation link is selected.
            navLinks.classList.remove("is-open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Changes the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false"); // Reads or updates an HTML attribute used by this feature.

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Reads or updates an HTML attribute used by this feature.
        }); // Closes the current expression, callback, or code block.

    }); // Closes the current expression, callback, or code block.

    // Adds an event listener for keyboard actions on the page.
    document.addEventListener("keydown", function (event) { // Registers an event listener so this code runs when the specified event occurs.

        // Checks if the keyboard key pressed was the Escape key.
        if (event.key === "Escape") { // Checks this condition before running the following block.

            // Removes the "open" class when Escape is pressed.
            navLinks.classList.remove("open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Removes the "is-open" class when Escape is pressed.
            navLinks.classList.remove("is-open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Updates the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false"); // Reads or updates an HTML attribute used by this feature.

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Reads or updates an HTML attribute used by this feature.

            // Moves the keyboard focus back to the navigation button.
            navToggle.focus(); // Calls the required function to carry out this operation.
        } // Opens or closes the surrounding code structure.

    }); // Closes the current expression, callback, or code block.

    // Adds an event listener that checks when the browser window changes size.
    window.addEventListener("resize", function () { // Registers an event listener so this code runs when the specified event occurs.

        // Checks if the screen is wider than the mobile breakpoint of 850 pixels.
        if (window.innerWidth > 850) { // Checks this condition before running the following block.

            // Removes the "open" class when the screen becomes larger.
            navLinks.classList.remove("open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Removes the "is-open" class when the screen becomes larger.
            navLinks.classList.remove("is-open"); // Updates or checks a CSS class to control the element's state or appearance.

            // Resets the accessibility value because the mobile menu is no longer being used.
            navToggle.setAttribute("aria-expanded", "false"); // Reads or updates an HTML attribute used by this feature.

            // Resets the accessibility label for the navigation button.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Reads or updates an HTML attribute used by this feature.
        } // Opens or closes the surrounding code structure.

    }); // Closes the current expression, callback, or code block.
} // Opens or closes the surrounding code structure.

    "use strict"; // Sets the string value used by this statement.

    /* ---------- Hardcoded catalogue data (no database) ---------- */
    // Stores reusable image paths so product objects can reference consistent asset locations.
    var IMG = { // Declares a variable and stores the value needed by this part of the script.
        bundle: "images/bundles/starter-bundle.jpg", // Defines this property or argument within the current object or call.
        hero: "images/bundles/hero-campus.jpg", // Defines this property or argument within the current object or call.
        used: "images/second-hand/marketplace.jpg" // Defines this property or argument within the current object or call.
    }; // Opens or closes the surrounding code structure.

    // Pages inside /pages/ are one level deeper than index.html.
    // Selects the correct assets directory because files in /pages/ are one folder deeper than index.html.
    var BASE = window.location.pathname.indexOf("/pages/") > -1 ? "../assets/" : "assets/"; // Declares a variable and stores the value needed by this part of the script.

    // Stores the catalogue as an array of product objects containing names, categories, prices, descriptions, and images.
    var DEALS = [ // Declares a variable and stores the value needed by this part of the script.
        { name: "Basic Starter Bundle", category: "bundles", condition: "new", price: 1499, desc: "Bedding, kettle, mug set and study basics for a first-year res room.", img: IMG.bundle }, // Starts a nested object, array, or grouped expression.
        { name: "Standard Starter Bundle", category: "bundles", condition: "new", price: 2799, desc: "Everything in Basic plus desk lamp, laundry set and kitchen starter pack.", img: IMG.bundle }, // Starts a nested object, array, or grouped expression.
        { name: "Premium Starter Bundle", category: "bundles", condition: "new", price: 4499, desc: "Full res setup: bedding, appliances, storage, stationery and lockable trunk.", img: IMG.bundle }, // Starts a nested object, array, or grouped expression.
        { name: "Second-Hand Study Desk", category: "furniture", condition: "used", price: 650, desc: "Reviewed listing from a graduating student in Pretoria. Light wear.", img: IMG.used }, // Starts a nested object, array, or grouped expression.
        { name: "Mini Bar Fridge (Used)", category: "appliances", condition: "used", price: 1150, desc: "Works perfectly, tested at our collection point. 12 months old.", img: IMG.used }, // Starts a nested object, array, or grouped expression.
        { name: "Electric Kettle 1.7L", category: "appliances", condition: "new", price: 289, desc: "Fast-boil kettle, res-friendly and load-shedding ready.", img: IMG.bundle }, // Starts a nested object, array, or grouped expression.
        { name: "Accounting Textbook Set", category: "textbooks", condition: "used", price: 420, desc: "Prescribed titles for first-year commerce, current edition.", img: IMG.used }, // Starts a nested object, array, or grouped expression.
        { name: "Study Chair (Ergonomic)", category: "furniture", condition: "new", price: 899, desc: "Adjustable chair built for long study sessions in a small room.", img: IMG.bundle }, // Starts a nested object, array, or grouped expression.
        { name: "Stationery Mega Pack", category: "stationery", condition: "new", price: 249, desc: "Files, pads, pens, highlighters and a scientific calculator.", img: IMG.bundle }, // Starts a nested object, array, or grouped expression.
        { name: "Duvet & Linen Set (Double)", category: "bedding", condition: "new", price: 749, desc: "Warm winter duvet, fitted sheet, pillow and two covers.", img: IMG.bundle }, // Starts a nested object, array, or grouped expression.
        { name: "Second-Hand Laptop Bag", category: "stationery", condition: "used", price: 180, desc: "Padded 15-inch bag, cleaned and checked by our team.", img: IMG.used }, // Starts a nested object, array, or grouped expression.
        { name: "Load-Shedding Light Kit", category: "appliances", condition: "new", price: 329, desc: "Rechargeable lamp, power bank and extension lead.", img: IMG.bundle } // Starts a nested object, array, or grouped expression.
    ]; // Closes the current expression, callback, or code block.

    // Defines a helper that formats numeric prices as South African Rand values.
    var currency = function (n) { // Declares a variable and stores the value needed by this part of the script.
        return "R" + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Returns the result or exits this function at this point.
    }; // Opens or closes the surrounding code structure.

    /* ---------- Toast helper ---------- */
    // Defines a reusable temporary notification for user feedback.
    function toast(msg) { // Declares a function that groups this behaviour for reuse.
        var el = document.getElementById("toast"); // Declares a variable and stores the value needed by this part of the script.
        if (!el) { // Checks this condition before running the following block.
        el = document.createElement("div"); // Assigns the calculated value to the relevant variable or property.
        el.id = "toast"; // Assigns the calculated value to the relevant variable or property.
        el.className = "toast"; // Assigns the calculated value to the relevant variable or property.
        document.body.appendChild(el); // Calls the required function to carry out this operation.
        } // Opens or closes the surrounding code structure.
        el.textContent = msg; // Updates the content displayed inside the relevant page element.
        el.classList.add("show"); // Updates or checks a CSS class to control the element's state or appearance.
        window.clearTimeout(el._t); // Calls the required function to carry out this operation.
        el._t = window.setTimeout(function () { el.classList.remove("show"); }, 2200); // Updates or checks a CSS class to control the element's state or appearance.
    } // Opens or closes the surrounding code structure.

    /* ---------- Tabs (Shop New / Second-Hand, Student / Parent FAQ) ---------- */
    // Defines the tab interface used for areas such as Student/Parent and New/Second-hand content.
    function initTabs() { // Declares a function that groups this behaviour for reuse.
        Array.prototype.forEach.call(document.querySelectorAll("[data-tabs]"), function (group) { // Finds the required element in the page.
        var buttons = group.querySelectorAll(".tab-btn"); // Declares a variable and stores the value needed by this part of the script.
        Array.prototype.forEach.call(buttons, function (btn) { // Calls the required function to carry out this operation.
            btn.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.
            Array.prototype.forEach.call(buttons, function (b) { // Calls the required function to carry out this operation.
                b.setAttribute("aria-selected", "false"); // Reads or updates an HTML attribute used by this feature.
                var p = document.getElementById(b.getAttribute("data-panel")); // Declares a variable and stores the value needed by this part of the script.
                if (p) { p.hidden = true; } // Checks this condition before running the following block.
            }); // Closes the current expression, callback, or code block.
            btn.setAttribute("aria-selected", "true"); // Reads or updates an HTML attribute used by this feature.
            var panel = document.getElementById(btn.getAttribute("data-panel")); // Declares a variable and stores the value needed by this part of the script.
            if (panel) { panel.hidden = false; } // Checks this condition before running the following block.
            }); // Closes the current expression, callback, or code block.
        }); // Closes the current expression, callback, or code block.
        }); // Closes the current expression, callback, or code block.
    } // Opens or closes the surrounding code structure.

    /* ---------- Deals & Gallery: client-side filter + sort ---------- */
    // Converts one catalogue object into the HTML needed for a product card.
    // Escapes quotes and angle brackets so product text can sit safely inside an HTML attribute.
    function attr(text) { // Declares a function that groups this behaviour for reuse.
        return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Returns the result or exits this function at this point.
    } // Opens or closes the surrounding code structure.

    function dealCard(item) { // Declares a function that groups this behaviour for reuse.
        var badge = item.condition === "new" // Declares a variable and stores the value needed by this part of the script.
        ? '<span class="badge badge-new">New</span>' // Executes this statement as part of the Campus-Cart page behaviour.
        : '<span class="badge badge-used">Second-hand</span>'; // Continues the current statement or defines the next item in this structure.
        return '<article class="card">' + // Returns the result or exits this function at this point.
        '<img src="' + BASE + item.img + '" alt="' + item.name + '" loading="lazy" width="1200" height="900">' + // Provides a string value used to build the page content or message.
        '<div class="card-body">' + // Provides a string value used to build the page content or message.
        badge + '<span class="badge badge-verified">Verified Seller</span>' + // Executes this statement as part of the Campus-Cart page behaviour.
        '<h3>' + item.name + '</h3>' + // Provides a string value used to build the page content or message.
        '<p class="price">' + currency(item.price) + '</p>' + // Provides a string value used to build the page content or message.
        '<p>' + item.desc + '</p>' + // Provides a string value used to build the page content or message.
        '<div class="card-actions">' + // Provides a string value used to build the page content or message.
        '<button class="btn btn-sm" data-add="' + item.name + '" data-price="' + item.price + '">Add to Order Summary</button>' + // Provides a string value used to build the page content or message.
        '<button class="btn btn-sm btn-outline" type="button" data-quickview' + // Provides a string value used to build the page content or message.
        ' data-name="' + attr(item.name) + '" data-price="' + item.price + '" data-desc="' + attr(item.desc) + '"' + // Provides a string value used to build the page content or message.
        ' data-img="' + BASE + item.img + '" data-condition="' + item.condition + '">Quick view</button>' + // Provides a string value used to build the page content or message.
        '</div>' + // Provides a string value used to build the page content or message.
        '</div></article>'; // Sets the string value used by this statement.
    } // Opens or closes the surrounding code structure.

    // Initializes catalogue filtering, sorting, rendering, and result counting.
    function initDeals() { // Declares a function that groups this behaviour for reuse.
        var out = document.getElementById("deals-results"); // Declares a variable and stores the value needed by this part of the script.
        if (!out) { return; } // Checks this condition before running the following block.
        var cat = document.getElementById("filter-category"); // Declares a variable and stores the value needed by this part of the script.
        var cond = document.getElementById("filter-condition"); // Declares a variable and stores the value needed by this part of the script.
        var sort = document.getElementById("sort-by"); // Declares a variable and stores the value needed by this part of the script.
        var count = document.getElementById("deals-count"); // Declares a variable and stores the value needed by this part of the script.
        var search = document.getElementById("product-search"); // Declares a variable and stores the value needed by this part of the script.

        // Rebuilds the deal list whenever the selected filters or sort order changes.
        function render() { // Declares a function that groups this behaviour for reuse.
        // Keyword search: the typed text must appear in the name, category or description.
        var term = search ? search.value.trim().toLowerCase() : ""; // Declares a variable and stores the value needed by this part of the script.
        var list = DEALS.filter(function (d) { // Declares a variable and stores the value needed by this part of the script.
            var matchesSearch = term === "" || // Declares a variable and stores the value needed by this part of the script.
            (d.name + " " + d.category + " " + d.desc).toLowerCase().indexOf(term) > -1; // Starts a nested object, array, or grouped expression.
            return matchesSearch && // Returns the result or exits this function at this point.
            (cat.value === "all" || d.category === cat.value) && // Starts a nested object, array, or grouped expression.
            (cond.value === "all" || d.condition === cond.value); // Starts a nested object, array, or grouped expression.
        }); // Closes the current expression, callback, or code block.
        if (sort.value === "price-asc") { list.sort(function (a, b) { return a.price - b.price; }); } // Checks this condition before running the following block.
        if (sort.value === "price-desc") { list.sort(function (a, b) { return b.price - a.price; }); } // Checks this condition before running the following block.
        if (sort.value === "name") { list.sort(function (a, b) { return a.name.localeCompare(b.name); }); } // Checks this condition before running the following block.
        out.innerHTML = list.length // Updates the content displayed inside the relevant page element.
            ? list.map(dealCard).join("") // Processes the collection to update or calculate the required data.
            : '<div class="empty-state"><h3>No matches</h3><p>Try a different keyword, category or condition.</p></div>'; // Continues the current statement or defines the next item in this structure.
        if (count) { // Checks this condition before running the following block.
            count.textContent = list.length + " of " + DEALS.length + " deals shown"; // Updates the content displayed inside the relevant page element.
        } // Opens or closes the surrounding code structure.
        } // Opens or closes the surrounding code structure.
        [cat, cond, sort].forEach(function (el) { el.addEventListener("change", render); }); // Registers an event listener so this code runs when the specified event occurs.
        if (search) { search.addEventListener("input", render); } // Checks this condition before running the following block.
        render(); // Calls the required function to carry out this operation.
    } // Opens or closes the surrounding code structure.

    /* ---------- Gallery category filter ---------- */
    // Initializes the category buttons that show or hide gallery items.
    function initGalleryFilter() { // Declares a function that groups this behaviour for reuse.
        var buttons = document.querySelectorAll("[data-gallery-filter]"); // Declares a variable and stores the value needed by this part of the script.
        if (!buttons.length) { return; } // Checks this condition before running the following block.
        Array.prototype.forEach.call(buttons, function (btn) { // Calls the required function to carry out this operation.
        btn.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.
            var val = btn.getAttribute("data-gallery-filter"); // Declares a variable and stores the value needed by this part of the script.
            Array.prototype.forEach.call(buttons, function (b) { // Calls the required function to carry out this operation.
            b.setAttribute("aria-selected", b === btn ? "true" : "false"); // Reads or updates an HTML attribute used by this feature.
            }); // Closes the current expression, callback, or code block.
            Array.prototype.forEach.call(document.querySelectorAll("[data-gallery-item]"), function (fig) { // Finds the required element in the page.
            fig.hidden = !(val === "all" || fig.getAttribute("data-gallery-item") === val); // Reads or updates an HTML attribute used by this feature.
            }); // Closes the current expression, callback, or code block.
        }); // Closes the current expression, callback, or code block.
        }); // Closes the current expression, callback, or code block.
    } // Opens or closes the surrounding code structure.

    /* ---------- Order summary: session-only, cleared on refresh ---------- */
    // Stores the current order in JavaScript memory; sessionStorage provides temporary persistence during the session.
    var order = [];   // in-memory only

    // Serializes the current order and saves it to sessionStorage.
    function saveSession() { // Declares a function that groups this behaviour for reuse.
        try { // Starts a protected block for operations that may fail.
        window.sessionStorage.setItem("cc_order", JSON.stringify(order)); // Calls the required function to carry out this operation.
        } catch (e) { /* storage unavailable — memory only */ } // Closes the current expression or code structure.
    } // Opens or closes the surrounding code structure.
    // Reads the saved order from sessionStorage when the page starts.
    function loadSession() { // Declares a function that groups this behaviour for reuse.
        try { // Starts a protected block for operations that may fail.
        var raw = window.sessionStorage.getItem("cc_order"); // Declares a variable and stores the value needed by this part of the script.
        order = raw ? JSON.parse(raw) : []; // Assigns the calculated value to the relevant variable or property.
        } catch (e) { order = []; } // Closes the current expression or code structure.
    } // Opens or closes the surrounding code structure.
    // Calculates the complete order value from each item price and quantity.
    function total() { // Declares a function that groups this behaviour for reuse.
        return order.reduce(function (s, i) { return s + i.price * i.qty; }, 0); // Returns the result or exits this function at this point.
    } // Opens or closes the surrounding code structure.
    // Updates every cart-count element with the total quantity currently in the order.
    function updateCartCount() { // Declares a function that groups this behaviour for reuse.
        var qty = order.reduce(function (s, i) { return s + i.qty; }, 0); // Declares a variable and stores the value needed by this part of the script.
        Array.prototype.forEach.call(document.querySelectorAll("[data-cart-count]"), function (el) { // Finds the required element in the page.
        el.textContent = qty; // Updates the content displayed inside the relevant page element.
        }); // Closes the current expression, callback, or code block.
    } // Opens or closes the surrounding code structure.

    // Adds a product to the order or increases its quantity if it already exists.
    function addItem(name, price) { // Declares a function that groups this behaviour for reuse.
        var found = null; // Declares a variable and stores the value needed by this part of the script.
        order.forEach(function (i) { if (i.name === name) { found = i; } }); // Processes the collection to update or calculate the required data.
        if (found) { found.qty += 1; } else { order.push({ name: name, price: Number(price), qty: 1 }); } // Checks this condition before running the following block.
        saveSession(); // Calls the required function to carry out this operation.
        updateCartCount(); // Calls the required function to carry out this operation.
        renderOrder(); // Calls the required function to carry out this operation.
        toast(name + " added to your Order Summary"); // Calls the required function to carry out this operation.
    } // Opens or closes the surrounding code structure.

    // Adds delegated click handling for product buttons, including cards created dynamically.
    function initAddButtons() { // Declares a function that groups this behaviour for reuse.
        document.addEventListener("click", function (e) { // Registers an event listener so this code runs when the specified event occurs.
        var btn = e.target.closest ? e.target.closest("[data-add]") : null; // Declares a variable and stores the value needed by this part of the script.
        if (!btn) { return; } // Checks this condition before running the following block.
        e.preventDefault(); // Calls the required function to carry out this operation.
        addItem(btn.getAttribute("data-add"), btn.getAttribute("data-price")); // Reads or updates an HTML attribute used by this feature.
        }); // Closes the current expression, callback, or code block.
    } // Opens or closes the surrounding code structure.

    // Rebuilds the Order Summary table and updates its total and empty-state display.
    function renderOrder() { // Declares a function that groups this behaviour for reuse.
        var body = document.getElementById("order-body"); // Declares a variable and stores the value needed by this part of the script.
        if (!body) { return; } // Checks this condition before running the following block.
        var wrap = document.getElementById("order-table-wrap"); // Declares a variable and stores the value needed by this part of the script.
        var empty = document.getElementById("order-empty"); // Declares a variable and stores the value needed by this part of the script.
        var totalEl = document.getElementById("order-total"); // Declares a variable and stores the value needed by this part of the script.

        if (!order.length) { // Checks this condition before running the following block.
        if (wrap) { wrap.hidden = true; } // Checks this condition before running the following block.
        if (empty) { empty.hidden = false; } // Checks this condition before running the following block.
        if (totalEl) { totalEl.textContent = currency(0); } // Checks this condition before running the following block.
        return; // Returns the result or exits this function at this point.
        } // Opens or closes the surrounding code structure.
        if (wrap) { wrap.hidden = false; } // Checks this condition before running the following block.
        if (empty) { empty.hidden = true; } // Checks this condition before running the following block.

        body.innerHTML = order.map(function (i, idx) { // Updates the content displayed inside the relevant page element.
        return "<tr>" + // Returns the result or exits this function at this point.
            "<td>" + i.name + "</td>" + // Provides a string value used to build the page content or message.
            "<td>" + currency(i.price) + "</td>" + // Provides a string value used to build the page content or message.
            "<td>" + i.qty + "</td>" + // Provides a string value used to build the page content or message.
            "<td>" + currency(i.price * i.qty) + "</td>" + // Provides a string value used to build the page content or message.
            '<td><button class="btn btn-sm btn-outline" data-remove="' + idx + '">Remove</button></td>' + // Provides a string value used to build the page content or message.
            "</tr>"; // Sets the string value used by this statement.
        }).join(""); // Closes the callback and completes the surrounding function call.
        if (totalEl) { totalEl.textContent = currency(total()); } // Checks this condition before running the following block.
    } // Opens or closes the surrounding code structure.

    // Initializes controls that are only needed on the Order Summary and checkout page.
    function initOrderPage() { // Declares a function that groups this behaviour for reuse.
        var body = document.getElementById("order-body"); // Declares a variable and stores the value needed by this part of the script.
        if (!body) { return; } // Checks this condition before running the following block.

        body.addEventListener("click", function (e) { // Registers an event listener so this code runs when the specified event occurs.
        var btn = e.target.closest ? e.target.closest("[data-remove]") : null; // Declares a variable and stores the value needed by this part of the script.
        if (!btn) { return; } // Checks this condition before running the following block.
        order.splice(Number(btn.getAttribute("data-remove")), 1); // Reads or updates an HTML attribute used by this feature.
        saveSession(); // Calls the required function to carry out this operation.
        updateCartCount(); // Calls the required function to carry out this operation.
        renderOrder(); // Calls the required function to carry out this operation.
        toast("Item removed"); // Calls the required function to carry out this operation.
        }); // Closes the current expression, callback, or code block.

        var clear = document.getElementById("order-clear"); // Declares a variable and stores the value needed by this part of the script.
        if (clear) { // Checks this condition before running the following block.
        clear.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.
            order = []; // Assigns the calculated value to the relevant variable or property.
            saveSession(); // Calls the required function to carry out this operation.
            updateCartCount(); // Calls the required function to carry out this operation.
            renderOrder(); // Calls the required function to carry out this operation.
            toast("Order Summary cleared"); // Calls the required function to carry out this operation.
        }); // Closes the current expression, callback, or code block.
        } // Opens or closes the surrounding code structure.

        // "Skip to Address" step
        var skip = document.getElementById("skip-to-address"); // Declares a variable and stores the value needed by this part of the script.
        if (skip) { // Checks this condition before running the following block.
        skip.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.
            var step = document.getElementById("step-address"); // Declares a variable and stores the value needed by this part of the script.
            if (step) { // Checks this condition before running the following block.
            step.scrollIntoView({ behavior: "smooth", block: "center" }); // Calls the required function to carry out this operation.
            var input = document.getElementById("delivery-address"); // Declares a variable and stores the value needed by this part of the script.
            if (input) { input.focus(); } // Checks this condition before running the following block.
            } // Opens or closes the surrounding code structure.
        }); // Closes the current expression, callback, or code block.
        } // Opens or closes the surrounding code structure.

        // Delivery vs collection toggle text
        var method = document.getElementById("delivery-method"); // Declares a variable and stores the value needed by this part of the script.
        var methodHint = document.getElementById("delivery-hint"); // Declares a variable and stores the value needed by this part of the script.
        if (method && methodHint) { // Checks this condition before running the following block.
        method.addEventListener("change", function () { // Registers an event listener so this code runs when the specified event occurs.
            methodHint.textContent = method.value === "collection" // Updates the content displayed inside the relevant page element.
            ? "Collection is free at any listed campus, residence or locker point." // Executes this statement as part of the Campus-Cart page behaviour.
            : "Courier delivery is quoted per order and confirmed by our team before payment."; // Continues the current statement or defines the next item in this structure.
        }); // Closes the current expression, callback, or code block.
        } // Opens or closes the surrounding code structure.

        // Builds the plain-text order summary used by WhatsApp and email checkout.
        function orderText() { // Declares a function that groups this behaviour for reuse.
        if (!order.length) { return "My Campus-Cart order summary is empty."; } // Checks this condition before running the following block.
        var addr = (document.getElementById("delivery-address") || {}).value || "(not provided)"; // Declares a variable and stores the value needed by this part of the script.
        var m = (document.getElementById("delivery-method") || {}).value || "collection"; // Declares a variable and stores the value needed by this part of the script.
        var lines = order.map(function (i) { // Declares a variable and stores the value needed by this part of the script.
            return "- " + i.name + " x" + i.qty + " = " + currency(i.price * i.qty); // Returns the result or exits this function at this point.
        }); // Closes the current expression, callback, or code block.
        return "Campus-Cart order summary\n" + lines.join("\n") + // Returns the result or exits this function at this point.
            "\nTotal: " + currency(total()) + // Provides a string value used to build the page content or message.
            "\nMethod: " + m + "\nAddress / collection point: " + addr; // Provides a string value used to build the page content or message.
        } // Opens or closes the surrounding code structure.

        var wa = document.getElementById("checkout-whatsapp"); // Declares a variable and stores the value needed by this part of the script.
        if (wa) { // Checks this condition before running the following block.
        wa.addEventListener("click", function (e) { // Registers an event listener so this code runs when the specified event occurs.
            e.preventDefault(); // Calls the required function to carry out this operation.
            if (!order.length) { return toast("Add an item first"); } // Checks this condition before running the following block.
            window.open("https://wa.me/27123456789?text=" + encodeURIComponent(orderText()), "_blank"); // Calls the required function to carry out this operation.
        }); // Closes the current expression, callback, or code block.
        } // Opens or closes the surrounding code structure.
        var mail = document.getElementById("checkout-email"); // Declares a variable and stores the value needed by this part of the script.
        if (mail) { // Checks this condition before running the following block.
        mail.addEventListener("click", function (e) { // Registers an event listener so this code runs when the specified event occurs.
            e.preventDefault(); // Calls the required function to carry out this operation.
            if (!order.length) { return toast("Add an item first"); } // Checks this condition before running the following block.
            window.location.href = "mailto:orders@campus-cart.co.za?subject=" + // Assigns the calculated value to the relevant variable or property.
            encodeURIComponent("Campus-Cart order request") + // Calls the required function to carry out this operation.
            "&body=" + encodeURIComponent(orderText()); // Provides a string value used to build the page content or message.
        }); // Closes the current expression, callback, or code block.
        } // Opens or closes the surrounding code structure.
        var eft = document.getElementById("checkout-eft"); // Declares a variable and stores the value needed by this part of the script.
        if (eft) { // Checks this condition before running the following block.
        eft.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.
            var box = document.getElementById("eft-details"); // Declares a variable and stores the value needed by this part of the script.
            if (box) { // Checks this condition before running the following block.
            box.hidden = !box.hidden; // Assigns the calculated value to the relevant variable or property.
            if (!box.hidden) { box.scrollIntoView({ behavior: "smooth", block: "center" }); } // Checks this condition before running the following block.
            } // Opens or closes the surrounding code structure.
        }); // Closes the current expression, callback, or code block.
        } // Opens or closes the surrounding code structure.

        renderOrder(); // Calls the required function to carry out this operation.
    } // Opens or closes the surrounding code structure.

    /* ---------- Account: reveal Student / Parent path from the hash ---------- */
    // Uses the URL hash to reveal and scroll to the Student or Parent account section.
    function initAccountHash() { // Declares a function that groups this behaviour for reuse.
        if (!document.getElementById("student")) { return; } // Checks this condition before running the following block.
        var hash = window.location.hash; // Declares a variable and stores the value needed by this part of the script.
        if (hash === "#parent" || hash === "#student") { // Checks this condition before running the following block.
        var el = document.querySelector(hash); // Declares a variable and stores the value needed by this part of the script.
        if (el) { window.setTimeout(function () { el.scrollIntoView({ behavior: "smooth" }); }, 120); } // Checks this condition before running the following block.
        } // Opens or closes the surrounding code structure.
    } // Opens or closes the surrounding code structure.

    /* ---------- Printable checklist ---------- */
    // Prints only the First Year Checklist, not the whole page.
    // Clicking the button builds a clean print sheet from the checklist on the page and marks the page
    // as "printing the checklist". The print styles in styles.css then hide everything except that sheet.
    function initPrint() { // Declares a function that groups this behaviour for reuse.
        var btn = document.getElementById("print-checklist"); // Declares a variable and stores the value needed by this part of the script.
        if (!btn) { return; } // Checks this condition before running the following block.

        var sheet = null; // Declares a variable and stores the value needed by this part of the script.

        // Removes the print sheet and returns the page to normal.
        function removeSheet() { // Declares a function that groups this behaviour for reuse.
            if (sheet) { // Checks this condition before running the following block.
                sheet.parentNode.removeChild(sheet); // Calls the required function to carry out this operation.
                sheet = null; // Assigns the calculated value to the relevant variable or property.
            } // Opens or closes the surrounding code structure.
            document.body.classList.remove("printing-checklist"); // Updates or checks a CSS class to control the element's state or appearance.
        } // Opens or closes the surrounding code structure.

        btn.addEventListener("click", function () { // Registers an event listener so this code runs when the specified event occurs.
            removeSheet(); // Calls the required function to carry out this operation.

            var source = btn.closest(".info-box").querySelector(".checklist"); // Declares a variable and stores the value needed by this part of the script.

            sheet = document.createElement("div"); // Assigns the calculated value to the relevant variable or property.
            sheet.id = "print-sheet"; // Assigns the calculated value to the relevant variable or property.

            var title = document.createElement("p"); // Declares a variable and stores the value needed by this part of the script.
            title.className = "print-title"; // Assigns the calculated value to the relevant variable or property.
            title.textContent = "Campus-Cart First Year Checklist"; // Updates the content displayed inside the relevant page element.

            var intro = document.createElement("p"); // Declares a variable and stores the value needed by this part of the script.
            intro.textContent = "Tick off what you already own and buy only what is still missing."; // Updates the content displayed inside the relevant page element.

            // A copy of the checklist, so the list on the page itself is left unchanged.
            var list = source.cloneNode(true); // Declares a variable and stores the value needed by this part of the script.
            list.className = "print-list"; // Assigns the calculated value to the relevant variable or property.

            var source_note = document.createElement("p"); // Declares a variable and stores the value needed by this part of the script.
            source_note.className = "print-note"; // Assigns the calculated value to the relevant variable or property.
            source_note.textContent = "Printed from " + window.location.href.split("#")[0]; // Updates the content displayed inside the relevant page element.

            sheet.appendChild(title); // Calls the required function to carry out this operation.
            sheet.appendChild(intro); // Calls the required function to carry out this operation.
            sheet.appendChild(list); // Calls the required function to carry out this operation.
            sheet.appendChild(source_note); // Calls the required function to carry out this operation.
            document.body.appendChild(sheet); // Calls the required function to carry out this operation.
            document.body.classList.add("printing-checklist"); // Updates or checks a CSS class to control the element's state or appearance.

            window.print(); // Calls the required function to carry out this operation.
        }); // Closes the current expression, callback, or code block.

        // Puts the page back to normal once the print dialog closes.
        window.addEventListener("afterprint", removeSheet); // Registers an event listener so this code runs when the specified event occurs.
    } // Opens or closes the surrounding code structure.

    /* ---------- Forms: mailto hand-off only, no backend ---------- */
    // Converts website forms into mailto messages because Campus-Cart has no backend.
    function initMailForms() { // Declares a function that groups this behaviour for reuse.
        Array.prototype.forEach.call(document.querySelectorAll("form[data-mailto]"), function (form) { // Finds the required element in the page.
        form.addEventListener("submit", function (e) { // Registers an event listener so this code runs when the specified event occurs.
            e.preventDefault(); // Calls the required function to carry out this operation.
            var to = form.getAttribute("data-mailto"); // Declares a variable and stores the value needed by this part of the script.
            var subject = form.getAttribute("data-subject") || "Campus-Cart website message"; // Declares a variable and stores the value needed by this part of the script.
            var lines = []; // Declares a variable and stores the value needed by this part of the script.
            Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (f) { // Finds the required element in the page.
            if (!f.name) { return; } // Checks this condition before running the following block.
            var label = form.querySelector('label[for="' + f.id + '"]'); // Declares a variable and stores the value needed by this part of the script.
            lines.push((label ? label.textContent.replace("*", "").trim() : f.name) + ": " + f.value); // Processes the collection to update or calculate the required data.
            }); // Closes the current expression, callback, or code block.
            window.location.href = "mailto:" + to + // Assigns the calculated value to the relevant variable or property.
            "?subject=" + encodeURIComponent(subject) + // Provides a string value used to build the page content or message.
            "&body=" + encodeURIComponent(lines.join("\n")); // Provides a string value used to build the page content or message.
            toast("Opening your email app…"); // Calls the required function to carry out this operation.
        }); // Closes the current expression, callback, or code block.
        }); // Closes the current expression, callback, or code block.
    } // Opens or closes the surrounding code structure.

    /* ---------- Product detail template: pick a product ---------- */
    // Initializes the product selector and keeps the detail panel synchronized with the selected product.
    function initProductDetail() { // Declares a function that groups this behaviour for reuse.
        var select = document.getElementById("detail-select"); // Declares a variable and stores the value needed by this part of the script.
        if (!select) { return; } // Checks this condition before running the following block.
        select.innerHTML = DEALS.map(function (d, i) { // Updates the content displayed inside the relevant page element.
        return '<option value="' + i + '">' + d.name + " — " + currency(d.price) + "</option>"; // Returns the result or exits this function at this point.
        }).join(""); // Closes the callback and completes the surrounding function call.

        function render() { // Declares a function that groups this behaviour for reuse.
        var d = DEALS[Number(select.value)] || DEALS[0]; // Declares a variable and stores the value needed by this part of the script.
        document.getElementById("detail-img").src = BASE + d.img; // Finds the required element in the page.
        document.getElementById("detail-img").alt = d.name; // Finds the required element in the page.
        document.getElementById("detail-name").textContent = d.name; // Finds the required element in the page.
        document.getElementById("detail-price").textContent = currency(d.price); // Finds the required element in the page.
        document.getElementById("detail-desc").textContent = d.desc; // Finds the required element in the page.
        document.getElementById("detail-condition").textContent = // Finds the required element in the page.
            d.condition === "new" ? "Brand new" : "Second-hand (reviewed)"; // Assigns the calculated value to the relevant variable or property.
        var add = document.getElementById("detail-add"); // Declares a variable and stores the value needed by this part of the script.
        add.setAttribute("data-add", d.name); // Reads or updates an HTML attribute used by this feature.
        add.setAttribute("data-price", d.price); // Reads or updates an HTML attribute used by this feature.
        } // Opens or closes the surrounding code structure.
        select.addEventListener("change", render); // Registers an event listener so this code runs when the specified event occurs.
        render(); // Calls the required function to carry out this operation.
    } // Opens or closes the surrounding code structure.

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", function () { // Registers an event listener so this code runs when the specified event occurs.
    loadSession(); // Calls the required function to carry out this operation.
    initNav(); // Calls the required function to carry out this operation.
    initTabs(); // Calls the required function to carry out this operation.
    initDeals(); // Calls the required function to carry out this operation.
    initGalleryFilter(); // Calls the required function to carry out this operation.
    initAddButtons(); // Calls the required function to carry out this operation.
    initProductDetail(); // Calls the required function to carry out this operation.
    initOrderPage(); // Calls the required function to carry out this operation.
    initAccountHash(); // Calls the required function to carry out this operation.
    initPrint(); // Calls the required function to carry out this operation.
    initMailForms(); // Calls the required function to carry out this operation.
    updateCartCount(); // Calls the required function to carry out this operation.
}); // Closes the current expression, callback, or code block.

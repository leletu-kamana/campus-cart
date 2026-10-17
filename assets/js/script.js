// ==========================================================
// CAMPUS-CART
// UNIFIED PAGE LOADER & PAGE TRANSITION SYSTEM
// Features the Uiverse.io loader by Chris-immanuel-matthew
// Provides zero-flash initial loading and smooth page transitions.
// ==========================================================

(function () { // Performs the next step in the current Campus-Cart operation.
    // Enables JavaScript strict mode so unsafe or undeclared code is caught instead of silently continuing.
    "use strict"; // Provides a string segment used to build the output.

    // Transition timing constants (in milliseconds)
    // Stores the duration of the loader exit transition before the browser navigates to another page.
    var TRANSITION_OUT_TIME = 1200; // Duration of smooth exit transition before navigating (kept short so pages feel quick)
    // Stores the minimum time the loader remains visible so very fast loads still look smooth.
    var MIN_LOADER_TIME = 260;     // Minimum display time for visual smoothness on fast loads
    // Stores the maximum loader time before the failsafe automatically hides it.
    var SAFETY_TIMEOUT = 6000;     // Failsafe timeout to prevent permanently stuck loader

    // State trackers
    // Tracks whether an internal page transition is already running.
    var isNavigating = false; // Declares and initializes the variable used by this operation.
    // Records when this script started so the minimum loader duration can be calculated.
    var pageLoadStartTime = Date.now(); // Declares and initializes the variable used by this operation.
    // Stores the timer used to hide the loader after the initial page load.
    var loaderTimer = null; // Declares and initializes the variable used by this operation.
    // Stores the failsafe timer that prevents a permanently visible loader.
    var safetyTimer = null; // Declares and initializes the variable used by this operation.

    /**
     * Finds or dynamically creates the page loader element.
     * Ensures the loader is always available even if omitted from an HTML file.
     */
    // Defines the function that finds the loader or creates it when an HTML page does not contain one.
    function getOrCreateLoader() { // Declares a reusable function for this feature.
        // Searches the document for the element identified as the page loader.
        var loader = document.getElementById("page-loader"); // Declares and initializes the variable used by this operation.
        if (!loader && document.body) { // Checks the condition before running this block.
            // Creates a div element when the loader is missing from the HTML.
            loader = document.createElement("div"); // Assigns a value to the variable or object property.
            // Assigns the ID used by CSS and other JavaScript loader controls.
            loader.id = "page-loader"; // Assigns the ID used to identify this element.
            // Assigns the CSS class that controls the loader overlay appearance.
            loader.className = "page-loader"; // Assigns the CSS class used to style this element.
            // Identifies the loader as a status message for assistive technologies.
            loader.setAttribute("role", "status"); // Sets an HTML attribute, including its accessibility or state value.
            // Allows screen readers to announce the status without interrupting the user.
            loader.setAttribute("aria-live", "polite"); // Sets an HTML attribute, including its accessibility or state value.
            // Gives the loader an accessible description.
            loader.setAttribute("aria-label", "Loading Campus-Cart"); // Sets an HTML attribute, including its accessibility or state value.
            // Builds the loader HTML structure as one string before inserting it into the document.
            loader.innerHTML = // Builds or replaces the element's HTML content.
                '<div class="page-loader-content">' + // Provides a string segment used to build the output.
                '  <div class="page-loader-visual">' + // Provides a string segment used to build the output.
                '    <div class="loader" aria-hidden="true">' + // Provides a string segment used to build the output.
                '      <div class="nucleus"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '    </div>' + // Provides a string segment used to build the output.
                '  </div>' + // Provides a string segment used to build the output.
                '  <div class="page-loader-brand" aria-hidden="true">' + // Provides a string segment used to build the output.
                '    <span class="page-loader-title">Campus<span>-Cart</span></span>' + // Provides a string segment used to build the output.
                '    <span class="page-loader-text">Loading Campus-Cart...</span>' + // Provides a string segment used to build the output.
                '  </div>' + // Provides a string segment used to build the output.
                '</div>'; // Provides a string segment used to build the output.
            // Places the loader at the beginning of the body so it can cover the page content.
            document.body.prepend(loader); // Inserts the created element into the document.
        } // Closes the current block, expression, or function call.
        // Returns the loader element to the function that requested it.
        return loader; // Exits this function and returns the stated value.
    } // Closes the current block, expression, or function call.

    /**
     * Displays the full-screen loader and locks page scrolling.
     */
    // Defines the function that displays the full-screen loader and locks page scrolling.
    function showPageLoader() { // Declares a reusable function for this feature.
        // Gets the existing loader or creates one before changing its state.
        var loader = getOrCreateLoader(); // Declares and initializes the variable used by this operation.
        if (loader) { // Checks the condition before running this block.
            // Removes the hidden class so the loader becomes visible.
            loader.classList.remove("is-hidden"); // Changes or checks a CSS class controlling the element's state.
        } // Closes the current block, expression, or function call.
        if (document.body) { // Checks the condition before running this block.
            // Adds the page-loading class so CSS can prevent scrolling while loading.
            document.body.classList.add("page-loading"); // Changes or checks a CSS class controlling the element's state.
        } // Closes the current block, expression, or function call.

        // Start failsafe safety timer
        if (safetyTimer) { // Checks the condition before running this block.
            clearTimeout(safetyTimer); // Calls the function or method needed for this operation.
        } // Closes the current block, expression, or function call.
        // Starts a failsafe timer in case the normal navigation process becomes stuck.
        safetyTimer = setTimeout(function () { // Assigns a value to the variable or object property.
            hidePageLoader(); // Calls the function or method needed for this operation.
            isNavigating = false; // Assigns a value to the variable or object property.
        }, SAFETY_TIMEOUT); // Performs the next step in the current Campus-Cart operation.
    } // Closes the current block, expression, or function call.

    /**
     * Smoothly hides the full-screen loader and restores page scrolling.
     */
    // Defines the function that hides the loader and restores normal page scrolling.
    function hidePageLoader() { // Declares a reusable function for this feature.
        if (safetyTimer) { // Checks the condition before running this block.
            clearTimeout(safetyTimer); // Calls the function or method needed for this operation.
            safetyTimer = null; // Assigns a value to the variable or object property.
        } // Closes the current block, expression, or function call.

        var loader = document.getElementById("page-loader"); // Declares and initializes the variable used by this operation.
        if (loader) { // Checks the condition before running this block.
            // Adds the hidden class so the loader can fade or transition out.
            loader.classList.add("is-hidden"); // Changes or checks a CSS class controlling the element's state.
        } // Closes the current block, expression, or function call.
        if (document.body) { // Checks the condition before running this block.
            // Removes the page-loading class and restores normal scrolling.
            document.body.classList.remove("page-loading"); // Changes or checks a CSS class controlling the element's state.
        } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /**
     * Completes initial page loading with a slight buffer so the animation
     * resolves smoothly without jarring or flashing.
     */
    // Calculates when the initial loader should hide while respecting the minimum display time.
    function scheduleInitialHide() { // Declares a reusable function for this feature.
        // Calculates the number of milliseconds that have passed since the script started.
        var elapsedTime = Date.now() - pageLoadStartTime; // Declares and initializes the variable used by this operation.
        // Calculates the remaining minimum loader time and prevents a negative delay.
        var remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime); // Declares and initializes the variable used by this operation.

        if (loaderTimer) { // Checks the condition before running this block.
            clearTimeout(loaderTimer); // Calls the function or method needed for this operation.
        } // Closes the current block, expression, or function call.

        loaderTimer = setTimeout(function () { // Assigns a value to the variable or object property.
            hidePageLoader(); // Calls the function or method needed for this operation.
        }, remainingTime); // Performs the next step in the current Campus-Cart operation.
    } // Closes the current block, expression, or function call.

    /**
     * Determines whether an anchor link should trigger the smooth internal page transition.
     * Excludes external links, mailto, tel, WhatsApp, download links, target="_blank", and anchor jumps.
     */
    // Determines whether a clicked link should use the custom Campus-Cart page transition.
    function shouldTransition(link, url) { // Declares a reusable function for this feature.
        // Exclude external domains
        // Rejects links that point to a different website origin.
        if (url.origin !== window.location.origin) { // Checks the condition before running this block.
            return false; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        // Exclude links set to open in a new tab or specific target
        // Rejects links that intentionally open in another browsing context.
        if (link.target && link.target !== "_self") { // Checks the condition before running this block.
            return false; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        // Exclude file downloads
        // Rejects links intended to download a file instead of navigating between pages.
        if (link.hasAttribute("download")) { // Checks the condition before running this block.
            return false; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        // Exclude external protocol schemes
        // Reads the original href attribute so special protocols can be identified.
        var href = link.getAttribute("href") || ""; // Declares and initializes the variable used by this operation.
        if (href.indexOf("mailto:") === 0 || // Checks the condition before running this block.
            href.indexOf("tel:") === 0 || // Calls the function or method needed for this operation.
            href.indexOf("https://wa.me/") === 0 || // Calls the function or method needed for this operation.
            href.indexOf("javascript:") === 0) { // Calls the function or method needed for this operation.
            return false; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        // Exclude same-page hash jumps (e.g. #student, #parent, #top)
        // Checks whether the destination uses the same path as the current page.
        var isSamePath = url.pathname === window.location.pathname; // Declares and initializes the variable used by this operation.
        // Checks whether the destination has the same query-string parameters.
        var isSameSearch = url.search === window.location.search; // Declares and initializes the variable used by this operation.
        if (isSamePath && isSameSearch && url.hash !== "") { // Checks the condition before running this block.
            return false; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        // Exclude clicking the exact same URL if already on it
        if (isSamePath && isSameSearch && !url.hash && !window.location.hash) { // Checks the condition before running this block.
            return false; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        return true; // Exits this function and returns the stated value.
    } // Closes the current block, expression, or function call.

    /**
     * Initiates the internal page transition:
     * 1. Displays the loader overlay.
     * 2. Waits for the smooth exit transition duration.
     * 3. Navigates to the destination page.
     */
    // Starts the custom transition before navigating to the requested internal URL.
    function handleInternalNavigation(destinationUrl) { // Declares a reusable function for this feature.
        // Locks the transition state so repeated clicks cannot start duplicate navigations.
        isNavigating = true; // Assigns a value to the variable or object property.
        // Displays the loader before the browser changes the current document.
        showPageLoader(); // Calls the function or method needed for this operation.

        setTimeout(function () { // Schedules this callback to run after the specified delay.
            // Navigates the browser to the destination after the exit transition finishes.
            window.location.href = destinationUrl; // Sets the browser destination for this navigation.
        }, TRANSITION_OUT_TIME); // Performs the next step in the current Campus-Cart operation.
    } // Closes the current block, expression, or function call.

    // Intercept normal internal clicks across the document
    // Watches document clicks so eligible internal anchor links can use the custom transition.
    document.addEventListener("click", function (event) { // Registers a document-level event handler for this interaction.
        // Allow default browser behaviors for modified clicks (e.g. Ctrl+click, Cmd+click to open new tab)
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { // Checks the condition before running this block.
            return; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        // Finds the nearest anchor element associated with the clicked target.
        var link = event.target.closest ? event.target.closest("a") : null; // Declares and initializes the variable used by this operation.
        if (!link || !link.href) { // Checks the condition before running this block.
            return; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.

        try { // Starts error-handling protection for the following operation.
            // Creates a complete URL object using the current page URL as the base.
            var url = new URL(link.href, window.location.href); // Declares and initializes the variable used by this operation.

            if (!shouldTransition(link, url)) { // Checks the condition before running this block.
                return; // Exits this function and returns the stated value.
            } // Closes the current block, expression, or function call.

            // If a transition is already in flight, block rapid duplicate clicks
            if (isNavigating) { // Checks the condition before running this block.
                event.preventDefault(); // Stops the browser's default action so the custom handling can run.
                return; // Exits this function and returns the stated value.
            } // Closes the current block, expression, or function call.

            event.preventDefault(); // Stops the browser's default action so the custom handling can run.
            handleInternalNavigation(url.href); // Calls the function or method needed for this operation.
        } catch (e) { // Performs the next step in the current Campus-Cart operation.
            // If URL parsing fails, allow standard browser navigation
        } // Closes the current block, expression, or function call.
    }); // Closes the current block, expression, or function call.

    // Handle initial page load lifecycle
    // Checks whether the browser has already completed the page loading lifecycle.
    if (document.readyState === "complete") { // Checks the condition before running this block.
        scheduleInitialHide(); // Calls the function or method needed for this operation.
    } else { // Runs the alternative branch when the preceding condition is false.
        // Runs the initial loader hide logic once page resources have finished loading.
        window.addEventListener("load", scheduleInitialHide, { once: true }); // Registers a window event handler for this browser event.
        // Also ensure hide fires if load event was delayed by third-party frames
        // Provides an additional fallback based on DOM readiness.
        // Waits until the HTML has been parsed before initializing features that depend on page elements.
    document.addEventListener("DOMContentLoaded", function () { // Registers a document-level event handler for this interaction.
            setTimeout(scheduleInitialHide, 500); // Schedules this callback to run after the specified delay.
        }, { once: true }); // Performs the next step in the current Campus-Cart operation.
    } // Closes the current block, expression, or function call.

    // Handle Browser Back / Browser Forward / BFCache restoration
    // Handles browser back, forward, and BFCache restoration events.
    window.addEventListener("pageshow", function (event) { // Registers a window event handler for this browser event.
        isNavigating = false; // Assigns a value to the variable or object property.
        hidePageLoader(); // Calls the function or method needed for this operation.
    }); // Closes the current block, expression, or function call.

    // Expose control functions globally for safety/testing
    // Exposes loader controls globally for testing or controlled use by other scripts.
    window.CampusCartLoader = { // Assigns a value to the variable or object property.
        show: showPageLoader, // Defines a property or argument in the current structure.
        hide: hidePageLoader, // Defines a property or argument in the current structure.
        isNavigating: function () { return isNavigating; } // Defines a property or argument in the current structure.
    }; // Closes the current block, expression, or function call.

})(); // Closes the callback and completes the function call.

// ==========================================================
// CAMPUS-CART
// Navigation JavaScript
// Mobile menu toggle
// ==========================================================

// Sets up the mobile navigation menu after the page has loaded.
// Defines the mobile navigation setup function used after the page DOM is ready.
function initNav() { // Declares a reusable function for this feature.

    // Finds the mobile navigation button using its class name.
    const navToggle = document.querySelector(".nav-toggle"); // Declares and initializes the variable used by this operation.

    // Finds the navigation links container using its class name.
    const navLinks = document.querySelector(".nav-links"); // Declares and initializes the variable used by this operation.

    // Checks if the navigation button or navigation links cannot be found.
    if (!navToggle || !navLinks) { // Checks the condition before running this block.

        // Stops the function from continuing if the navigation elements are missing.
        return; // Exits this function and returns the stated value.
    } // Closes the current block, expression, or function call.

    // Adds a click event to the mobile navigation button.
    navToggle.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.

        // Checks if the navigation menu currently has the "open" class.
        const isOpen = // Declares and initializes the variable used by this operation.
            navLinks.classList.contains("open") || // Changes or checks a CSS class controlling the element's state.

            // Also checks if the navigation menu has the "is-open" class.
            navLinks.classList.contains("is-open"); // Changes or checks a CSS class controlling the element's state.

        // Checks if the navigation menu is currently open.
        if (isOpen) { // Checks the condition before running this block.

            // Removes the "open" class to close the navigation menu.
            navLinks.classList.remove("open"); // Changes or checks a CSS class controlling the element's state.

            // Removes the "is-open" class to make sure the menu is closed.
            navLinks.classList.remove("is-open"); // Changes or checks a CSS class controlling the element's state.

            // Changes the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false"); // Sets an HTML attribute, including its accessibility or state value.

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Sets an HTML attribute, including its accessibility or state value.

        // Runs this part when the navigation menu is currently closed.
        } else { // Runs the alternative branch when the preceding condition is false.

            // Adds the "open" class to display the mobile navigation menu.
            navLinks.classList.add("open"); // Changes or checks a CSS class controlling the element's state.

            // Changes the accessibility value to show that the menu is open.
            navToggle.setAttribute("aria-expanded", "true"); // Sets an HTML attribute, including its accessibility or state value.

            // Changes the accessibility label to show that the menu can be closed.
            navToggle.setAttribute("aria-label", "Close navigation menu"); // Sets an HTML attribute, including its accessibility or state value.
        } // Closes the current block, expression, or function call.
    }); // Closes the current block, expression, or function call.

    // Finds all links inside the navigation menu.
    const links = navLinks.querySelectorAll("a"); // Declares and initializes the variable used by this operation.

    // Goes through each navigation link one at a time.
    links.forEach(function (link) { // Runs the callback once for each item in the collection.

        // Adds a click event to each navigation link.
        link.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.

            // Removes the "open" class after a navigation link is selected.
            navLinks.classList.remove("open"); // Changes or checks a CSS class controlling the element's state.

            // Removes the "is-open" class after a navigation link is selected.
            navLinks.classList.remove("is-open"); // Changes or checks a CSS class controlling the element's state.

            // Changes the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false"); // Sets an HTML attribute, including its accessibility or state value.

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Sets an HTML attribute, including its accessibility or state value.
        }); // Closes the current block, expression, or function call.

    }); // Closes the current block, expression, or function call.

    // Adds an event listener for keyboard actions on the page.
    document.addEventListener("keydown", function (event) { // Registers a document-level event handler for this interaction.

        // Checks if the keyboard key pressed was the Escape key.
        if (event.key === "Escape") { // Checks the condition before running this block.

            // Removes the "open" class when Escape is pressed.
            navLinks.classList.remove("open"); // Changes or checks a CSS class controlling the element's state.

            // Removes the "is-open" class when Escape is pressed.
            navLinks.classList.remove("is-open"); // Changes or checks a CSS class controlling the element's state.

            // Updates the accessibility value to show that the menu is closed.
            navToggle.setAttribute("aria-expanded", "false"); // Sets an HTML attribute, including its accessibility or state value.

            // Changes the accessibility label back to opening the menu.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Sets an HTML attribute, including its accessibility or state value.

            // Moves the keyboard focus back to the navigation button.
            navToggle.focus(); // Moves keyboard focus to this element.
        } // Closes the current block, expression, or function call.

    }); // Closes the current block, expression, or function call.

    // Adds an event listener that checks when the browser window changes size.
    window.addEventListener("resize", function () { // Registers a window event handler for this browser event.

        // Checks if the screen is wider than the mobile breakpoint of 850 pixels.
        if (window.innerWidth > 850) { // Checks the condition before running this block.

            // Removes the "open" class when the screen becomes larger.
            navLinks.classList.remove("open"); // Changes or checks a CSS class controlling the element's state.

            // Removes the "is-open" class when the screen becomes larger.
            navLinks.classList.remove("is-open"); // Changes or checks a CSS class controlling the element's state.

            // Resets the accessibility value because the mobile menu is no longer being used.
            navToggle.setAttribute("aria-expanded", "false"); // Sets an HTML attribute, including its accessibility or state value.

            // Resets the accessibility label for the navigation button.
            navToggle.setAttribute("aria-label", "Open navigation menu"); // Sets an HTML attribute, including its accessibility or state value.
        } // Closes the current block, expression, or function call.

    }); // Closes the current block, expression, or function call.
} // Closes the current block, expression, or function call.

    "use strict"; // Provides a string segment used to build the output.

    /* ---------- Hardcoded catalogue data (no database) ---------- */
    // Stores reusable image paths so product objects can reference consistent asset locations.
    var IMG = { // Declares and initializes the variable used by this operation.
        bundle: "images/bundles/starter-bundle-3.jpg", // Defines a property or argument in the current structure.
        hero: "images/bundles/hero-campus.jpg", // Defines a property or argument in the current structure.
        used: "images/second-hand/marketplace.jpg" // Defines a property or argument in the current structure.
    }; // Closes the current block, expression, or function call.

    // Pages inside /pages/ are one level deeper than index.html.
    // Selects the correct assets directory because files in /pages/ are one folder deeper than index.html.
    var BASE = window.location.pathname.indexOf("/pages/") > -1 ? "../assets/" : "assets/"; // Declares and initializes the variable used by this operation.

    // Each product has its own photo in assets/images/products/. If a photo file has not been added yet,
    // this listener swaps in the starter bundle photo once, so no card ever shows a broken image.
    // The error event does not bubble, so the listener uses the capture phase (the true at the end).
    document.addEventListener("error", function (e) { // Registers a handler for images that fail to load (capture phase).
        var img = e.target; // Stores the element that fired the error.
        // The starter bundle photo is not inside images/products/, so this can never loop.
        if (img && img.tagName === "IMG" && img.src.indexOf("images/products/") > -1) { // Checks that it is a product photo.
            img.src = BASE + IMG.bundle; // Swaps in the starter bundle photo.
        }
    }, true);

    // Stores the catalogue as an array of product objects containing names, categories, prices, descriptions, and images.
    var DEALS = [ // Declares and initializes the variable used by this operation.
        { name: "Basic Starter Bundle", category: "bundles", condition: "new", price: 1499, desc: "Bedding, kettle, mug set and study basics for a first-year res room.", img: "images/bundles/bundle-basic.jpg", alt: "Four items from the Basic Starter Bundle: a duvet, an electric kettle, stacked mugs and a notebook" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Standard Starter Bundle", category: "bundles", condition: "new", price: 2799, desc: "Everything in Basic plus desk lamp, laundry set and kitchen starter pack.", img: "images/bundles/bundle-standard.jpg", alt: "Four items from the Standard Starter Bundle: a duvet, an electric kettle, stacked mugs and a navy desk lamp" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Premium Starter Bundle", category: "bundles", condition: "new", price: 4499, desc: "Full res setup: bedding, appliances, storage, stationery and lockable trunk.", img: "images/bundles/bundle-premium.jpg", alt: "Four items from the Premium Starter Bundle: a study chair, stackable storage trays, an electric kettle and a pen holder" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Second-Hand Study Desk", category: "furniture", condition: "used", price: 650, desc: "Reviewed listing from a graduating student in Pretoria. Light wear.", img: "images/products/study-funiture.jpg", alt: "White study desk with a white chair, a desk lamp and shelves in a bedroom" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Mini Bar Fridge (Used)", category: "appliances", condition: "used", price: 1150, desc: "Works perfectly, tested at our collection point. 12 months old.", img: IMG.used }, // Performs the next step in the current Campus-Cart operation.
        { name: "Electric Kettle 1.7L", category: "appliances", condition: "new", price: 289, desc: "Fast-boil kettle, res-friendly and load-shedding ready.", img: "images/products/kettle.jpg", alt: "Stainless steel electric kettle with a yellow trim on its power base" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Accounting Textbook Set", category: "textbooks", condition: "used", price: 420, desc: "Prescribed titles for first-year commerce, current edition.", img: "images/products/textbook.jpg", alt: "Navy hardcover textbook with a yellow bookmark ribbon" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Study Chair (Ergonomic)", category: "furniture", condition: "new", price: 899, desc: "Adjustable chair built for long study sessions in a small room.", img: "images/products/table-chair.jpg", alt: "Ergonomic mesh study chair with a navy seat, headrest and yellow armrest pads" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Stationery Mega Pack", category: "stationery", condition: "new", price: 249, desc: "Files, pads, pens, highlighters and a scientific calculator.", img: "images/products/stationery.jpg", alt: "Notebooks, pencils, highlighters, sticky notes, a ruler and a calculator laid out together" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Duvet & Linen Set (Double)", category: "bedding", condition: "new", price: 749, desc: "Warm winter duvet, fitted sheet, pillow and two covers.", img: "images/products/duvet.jpg", alt: "Folded grey duvet with navy piping" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Second-Hand Laptop Bag", category: "stationery", condition: "used", price: 180, desc: "Padded 15-inch bag, cleaned and checked by our team.", img: "images/products/laptop-bag.jpg", alt: "Navy padded laptop sleeve with yellow zip pulls" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Load-Shedding Light Kit", category: "appliances", condition: "new", price: 329, desc: "Rechargeable lamp, power bank and extension lead.", img: IMG.bundle }, // Performs the next step in the current Campus-Cart operation.
        // More products, two for every category, so each filter shows a wider range.
        { name: "Res Kitchen Starter Bundle", category: "bundles", condition: "new", price: 1199, desc: "Pots, a pan, cutlery, plates, mugs and a chopping board for cooking in a res kitchenette.", img: IMG.bundle }, // Adds the product "Res Kitchen Starter Bundle" to the catalogue.
        { name: "Second-Hand Residence Bundle", category: "bundles", condition: "used", price: 1250, desc: "Reviewed bundle from a graduating student: desk lamp, small fan, storage crates and a bedside table.", img: IMG.used }, // Adds the product "Second-Hand Residence Bundle" to the catalogue.
        { name: "Bookshelf (5-Tier)", category: "furniture", condition: "new", price: 649, desc: "Lightweight shelf that fits a res room wall and holds a semester of textbooks.", img: IMG.bundle }, // Adds the product "Bookshelf (5-Tier)" to the catalogue.
        { name: "Second-Hand Bedside Drawers", category: "furniture", condition: "used", price: 310, desc: "Two-drawer unit from a graduating student, cleaned and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Bedside Drawers" to the catalogue.
        { name: "Microwave Oven 20L", category: "appliances", condition: "new", price: 1099, desc: "Compact 20 litre microwave with a defrost setting, sized for a res kitchenette.", img: IMG.bundle }, // Adds the product "Microwave Oven 20L" to the catalogue.
        { name: "Second-Hand Air Fryer", category: "appliances", condition: "used", price: 550, desc: "Reviewed listing, tested at our collection point. Basket and tray included.", img: IMG.used }, // Adds the product "Second-Hand Air Fryer" to the catalogue.
        { name: "Single Duvet and Linen Set", category: "bedding", condition: "new", price: 549, desc: "Duvet, fitted sheet, pillow and one cover for a standard single res bed.", img: "images/products/bedding-duvets.jpg", alt: "White pillows and a rolled white duvet" }, // Adds the product "Single Duvet and Linen Set" to the catalogue.
        { name: "Fleece Blanket and Pillow Pair", category: "bedding", condition: "new", price: 299, desc: "Soft fleece blanket and two pillows for cold Eastern Cape winter nights.", img: IMG.bundle }, // Adds the product "Fleece Blanket and Pillow Pair" to the catalogue.
        { name: "Biology and Chemistry Textbook Set", category: "textbooks", condition: "used", price: 450, desc: "Common first-year science titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Biology and Chemistry Textbook Set" to the catalogue.
        { name: "IT and Programming Textbook Set", category: "textbooks", condition: "used", price: 520, desc: "Common first-year titles for programming and web development, checked by our team.", img: IMG.used }, // Adds the product "IT and Programming Textbook Set" to the catalogue.
        { name: "Scientific Calculator", category: "stationery", condition: "new", price: 219, desc: "Exam-friendly scientific calculator with a protective cover and spare battery.", img: "images/products/scientific-calculator.jpg", alt: "Navy scientific calculator with yellow function keys" }, // Adds the product "Scientific Calculator" to the catalogue.
        { name: "Study Backpack with Laptop Sleeve", category: "stationery", condition: "new", price: 389, desc: "Water-resistant backpack with a padded sleeve that fits a 15-inch laptop.", img: "images/products/bagpack.jpg", alt: "Navy backpack with tan leather trim and a front zip pocket" }, // Performs the next step in the current Campus-Cart operation.
        // A third round of products, again two for every category.
        { name: "Laundry Starter Bundle", category: "bundles", condition: "new", price: 459, desc: "Laundry basket, drying rack, pegs and a starter pack of washing powder for res laundry day.", img: IMG.bundle }, // Adds the product "Laundry Starter Bundle" to the catalogue.
        { name: "Study Starter Bundle", category: "bundles", condition: "new", price: 649, desc: "Desk lamp, lever arch files, notepads and a desk organiser to set up a study corner.", img: "images/products/essential-bundle.jpg", alt: "Flat lay of notebooks, pens, a pencil case, sticky notes and a navy bag on a white desk" }, // Adds the product "Study Starter Bundle" to the catalogue.
        { name: "Foldable Study Table", category: "furniture", condition: "new", price: 579, desc: "Folds flat for storage and fits a laptop, notes and a mug in a small res room.", img: IMG.bundle }, // Adds the product "Foldable Study Table" to the catalogue.
        { name: "Second-Hand Office Chair", category: "furniture", condition: "used", price: 420, desc: "Padded office chair from a graduating student, cleaned and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Office Chair" to the catalogue.
        { name: "Two-Plate Hot Plate", category: "appliances", condition: "new", price: 399, desc: "Portable electric hot plate for simple meals where a full stove is not allowed.", img: IMG.bundle }, // Adds the product "Two-Plate Hot Plate" to the catalogue.
        { name: "Rechargeable Desk Fan", category: "appliances", condition: "new", price: 379, desc: "Quiet desk fan with a rechargeable battery that keeps running during load-shedding.", img: "images/products/table-fan.jpg", alt: "Grey desk fan with a yellow centre cap" }, // Adds the product "Rechargeable Desk Fan" to the catalogue.
        { name: "Single Mattress Protector", category: "bedding", condition: "new", price: 219, desc: "Washable fitted protector that guards a res mattress against spills and stains.", img: IMG.bundle }, // Adds the product "Single Mattress Protector" to the catalogue.
        { name: "Bath Towel Set", category: "bedding", condition: "new", price: 329, desc: "Two bath towels, two hand towels and a face cloth in a quick-dry cotton blend.", img: IMG.bundle }, // Adds the product "Bath Towel Set" to the catalogue.
        { name: "Law Textbook Set", category: "textbooks", condition: "used", price: 480, desc: "Common first-year law titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Law Textbook Set" to the catalogue.
        { name: "Engineering Maths Textbook", category: "textbooks", condition: "used", price: 360, desc: "First-year engineering mathematics textbook with worked examples, in good condition.", img: IMG.used }, // Adds the product "Engineering Maths Textbook" to the catalogue.
        { name: "A4 Lever Arch File 5-Pack", category: "stationery", condition: "new", price: 169, desc: "Five sturdy lever arch files with labels for sorting notes by module.", img: IMG.bundle }, // Adds the product "A4 Lever Arch File 5-Pack" to the catalogue.
        { name: "LED Desk Lamp", category: "stationery", condition: "new", price: 229, desc: "Adjustable LED lamp with a USB port, bright enough for late-night study.", img: "images/products/table-lap.jpg", alt: "Navy adjustable desk lamp with a yellow joint and a round base" }, // Adds the product "LED Desk Lamp" to the catalogue.
        // A fourth round of products, again two for every category.
        { name: "Cleaning Essentials Bundle", category: "bundles", condition: "new", price: 349, desc: "Mop, bucket, cloths, sponges and a spray bottle to keep a res room spotless.", img: IMG.bundle }, // Adds the product "Cleaning Essentials Bundle" to the catalogue.
        { name: "Second-Hand Kitchen Bundle", category: "bundles", condition: "used", price: 700, desc: "Reviewed pots, pans, plates and cutlery from a graduating student.", img: IMG.used }, // Adds the product "Second-Hand Kitchen Bundle" to the catalogue.
        { name: "Clothes Rail with Shelf", category: "furniture", condition: "new", price: 449, desc: "Freestanding rail with a bottom shelf for shoes, ideal for small res rooms.", img: IMG.bundle }, // Adds the product "Clothes Rail with Shelf" to the catalogue.
        { name: "Second-Hand Study Table", category: "furniture", condition: "used", price: 380, desc: "Sturdy table from a graduating student, wiped down and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Study Table" to the catalogue.
        { name: "Toaster (2-Slice)", category: "appliances", condition: "new", price: 329, desc: "Two-slice toaster with a crumb tray and adjustable browning settings.", img: IMG.bundle }, // Adds the product "Toaster (2-Slice)" to the catalogue.
        { name: "Second-Hand Microwave Oven", category: "appliances", condition: "used", price: 650, desc: "Reviewed listing, tested at our collection point. Turntable included.", img: IMG.used }, // Adds the product "Second-Hand Microwave Oven" to the catalogue.
        { name: "Memory Foam Pillow", category: "bedding", condition: "new", price: 259, desc: "Supportive memory foam pillow with a washable cover for better sleep.", img: IMG.bundle }, // Adds the product "Memory Foam Pillow" to the catalogue.
        { name: "Fitted Sheet Two-Pack", category: "bedding", condition: "new", price: 289, desc: "Two soft cotton-blend fitted sheets for a standard single res bed.", img: IMG.bundle }, // Adds the product "Fitted Sheet Two-Pack" to the catalogue.
        { name: "Business Management Textbook Set", category: "textbooks", condition: "used", price: 430, desc: "Common first-year business management titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Business Management Textbook Set" to the catalogue.
        { name: "Psychology Textbook Set", category: "textbooks", condition: "used", price: 410, desc: "Common first-year psychology titles, checked by our team before listing.", img: IMG.used }, // Adds the product "Psychology Textbook Set" to the catalogue.
        { name: "Wireless Mouse and Mousepad", category: "stationery", condition: "new", price: 249, desc: "Quiet wireless mouse with a mousepad, handy for laptop study at a desk.", img: IMG.bundle }, // Adds the product "Wireless Mouse and Mousepad" to the catalogue.
        { name: "Highlighter and Pen Pack", category: "stationery", condition: "new", price: 79, desc: "Twelve highlighters and pens in assorted colours for notes and revision.", img: "images/products/highlighters.jpg", alt: "Six coloured highlighters standing in a clear holder" } // Adds the product "Highlighter and Pen Pack" to the catalogue.
    ]; // Closes the current block, expression, or function call.

    // Product photos that exist. A product only uses its own photo when its file name is listed here.
    // To add a photo: save it in assets/images/products/, set that product's img and alt in the DEALS list, and add the file name here.
    var PHOTOS = ["bagpack.jpg", "bedding-duvets.jpg", "bundle-basic.jpg", "bundle-premium.jpg", "bundle-standard.jpg", "duvet.jpg", "essential-bundle.jpg", "highlighters.jpg", "kettle.jpg", "laptop-bag.jpg", "scientific-calculator.jpg", "stationery.jpg", "study-funiture.jpg", "table-chair.jpg", "table-fan.jpg", "table-lap.jpg", "textbook.jpg"]; // File names of the product photos that exist. Add a name here after saving a new photo in assets/images/products/.
    DEALS.forEach(function (d) { // Loops through every product.
        var file = d.img.split("/").pop(); // Gets the file name from the product's photo path.
        if (PHOTOS.indexOf(file) === -1) { d.img = d.condition === "used" ? IMG.used : IMG.bundle; } // Uses the generic photo when the product photo has not been added yet.
    });

    // Defines a helper that formats numeric prices as South African Rand values.
    var currency = function (n) { // Declares and initializes the variable used by this operation.
        return "R" + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Exits this function and returns the stated value.
    }; // Closes the current block, expression, or function call.

    /* ---------- Toast helper ---------- */
    // Defines a reusable temporary notification for user feedback.
    function toast(msg) { // Declares a reusable function for this feature.
        var el = document.getElementById("toast"); // Declares and initializes the variable used by this operation.
        if (!el) { // Checks the condition before running this block.
        el = document.createElement("div"); // Assigns a value to the variable or object property.
        el.id = "toast"; // Assigns the ID used to identify this element.
        el.className = "toast"; // Assigns the CSS class used to style this element.
        document.body.appendChild(el); // Inserts the created element into the document.
        } // Closes the current block, expression, or function call.
        el.textContent = msg; // Updates the element's text without parsing it as HTML.
        el.classList.add("show"); // Changes or checks a CSS class controlling the element's state.
        window.clearTimeout(el._t); // Cancels the pending timer before it can run.
        el._t = window.setTimeout(function () { el.classList.remove("show"); }, 2200); // Changes or checks a CSS class controlling the element's state.
    } // Closes the current block, expression, or function call.

    /* ---------- Tabs (Shop New / Second-Hand, Student / Parent FAQ) ---------- */
    // Defines the tab interface used for areas such as Student/Parent and New/Second-hand content.
    function initTabs() { // Declares a reusable function for this feature.
        Array.prototype.forEach.call(document.querySelectorAll("[data-tabs]"), function (group) { // Selects the matching element or elements from the page.
        var buttons = group.querySelectorAll(".tab-btn"); // Declares and initializes the variable used by this operation.
        Array.prototype.forEach.call(buttons, function (btn) { // Calls the function or method needed for this operation.
            btn.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.
            Array.prototype.forEach.call(buttons, function (b) { // Calls the function or method needed for this operation.
                b.setAttribute("aria-selected", "false"); // Sets an HTML attribute, including its accessibility or state value.
                var p = document.getElementById(b.getAttribute("data-panel")); // Declares and initializes the variable used by this operation.
                if (p) { p.hidden = true; } // Checks the condition before running this block.
            }); // Closes the current block, expression, or function call.
            btn.setAttribute("aria-selected", "true"); // Sets an HTML attribute, including its accessibility or state value.
            var panel = document.getElementById(btn.getAttribute("data-panel")); // Declares and initializes the variable used by this operation.
            if (panel) { panel.hidden = false; } // Checks the condition before running this block.
            }); // Closes the current block, expression, or function call.
        }); // Closes the current block, expression, or function call.
        }); // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /* ---------- Deals & Gallery: client-side filter + sort ---------- */
    // Converts one catalogue object into the HTML needed for a product card.
    // Escapes quotes and angle brackets so product text can sit safely inside an HTML attribute.
    function attr(text) { // Declares a reusable function for this feature.
        return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Returns the result or exits this function at this point. // Exits this function and returns the stated value.
    } // Closes the current block, expression, or function call.

    function dealCard(item) { // Declares a reusable function for this feature.
        var badge = item.condition === "new" // Declares and initializes the variable used by this operation.
        ? '<span class="badge badge-new">New</span>' // Performs the next step in the current Campus-Cart operation.
        : '<span class="badge badge-used">Second-hand</span>'; // Performs the next step in the current Campus-Cart operation.
        return '<article class="card">' + // Exits this function and returns the stated value.
        '<img src="' + BASE + item.img + '" alt="' + (item.alt || item.name) + '" loading="lazy" width="800" height="800" decoding="async">' + // Uses the descriptive alt text when the product has one.
        '<div class="card-body">' + // Provides a string segment used to build the output.
        '<div class="card-tags">' + badge + '<span class="badge badge-verified">Verified Seller</span></div>' + // Puts the status labels in one row.
        '<h3>' + item.name + '</h3>' + // Provides a string segment used to build the output.
        '<p class="price">' + currency(item.price) + '</p>' + // Provides a string segment used to build the output.
        '<p>' + item.desc + '</p>' + // Provides a string segment used to build the output.
        '<div class="card-actions">' + // Provides a string segment used to build the output.
        '<button class="btn btn-sm" data-add="' + item.name + '" data-price="' + item.price + '">Add to Order Summary</button>' + // Provides a string segment used to build the output.
        '<button class="btn btn-sm btn-outline" type="button" data-quickview' + // Provides a string segment used to build the output.
        ' data-name="' + attr(item.name) + '" data-price="' + item.price + '" data-desc="' + attr(item.desc) + '"' + // Provides a string segment used to build the output.
        ' data-img="' + BASE + item.img + '" data-alt="' + (item.alt || item.name) + '" data-condition="' + item.condition + '">Quick view</button>' + // Passes the photo, its description and the condition to the quick view window.
        '</div>' + // Provides a string segment used to build the output.
        '</div></article>'; // Provides a string segment used to build the output.
    } // Closes the current block, expression, or function call.

    // Initializes catalogue filtering, sorting, rendering, and result counting.
    function initDeals() { // Declares a reusable function for this feature.
        var out = document.getElementById("deals-results"); // Declares and initializes the variable used by this operation.
        if (!out) { return; } // Checks the condition before running this block.
        var cat = document.getElementById("filter-category"); // Declares and initializes the variable used by this operation.
        var cond = document.getElementById("filter-condition"); // Declares and initializes the variable used by this operation.
        var sort = document.getElementById("sort-by"); // Declares and initializes the variable used by this operation.
        var count = document.getElementById("deals-count"); // Declares and initializes the variable used by this operation.
        var search = document.getElementById("product-search"); // Declares and initializes the variable used by this operation.
        var moreBtn = document.getElementById("deals-see-more"); // Finds the See more button.
        var lessBtn = document.getElementById("deals-see-less"); // Finds the See less button.
        var STEP = 6; // How many products are shown first, and how many each See more adds.
        var shown = STEP; // How many products are showing right now.

        // Rebuilds the deal list whenever the selected filters or sort order changes.
        function render(keep) { // Declares a reusable function for this feature. Passing true keeps the current number of products.
        if (keep !== true) { shown = STEP; } // Goes back to six products whenever a filter, the sort order or the search changes.
        // Keyword search: the typed text must appear in the name, category or description.
        var term = search ? search.value.trim().toLowerCase() : ""; // Declares and initializes the variable used by this operation.
        var list = DEALS.filter(function (d) { // Declares and initializes the variable used by this operation.
            var matchesSearch = term === "" || // Declares and initializes the variable used by this operation.
            (d.name + " " + d.category + " " + d.desc).toLowerCase().indexOf(term) > -1; // Performs the next step in the current Campus-Cart operation.
            return matchesSearch && // Exits this function and returns the stated value.
            (cat.value === "all" || d.category === cat.value) && // Updates the form control's current value.
            (cond.value === "all" || d.condition === cond.value); // Updates the form control's current value.
        }); // Closes the current block, expression, or function call.
        if (sort.value === "price-asc") { list.sort(function (a, b) { return a.price - b.price; }); } // Checks the condition before running this block.
        if (sort.value === "price-desc") { list.sort(function (a, b) { return b.price - a.price; }); } // Checks the condition before running this block.
        if (sort.value === "name") { list.sort(function (a, b) { return a.name.localeCompare(b.name); }); } // Checks the condition before running this block.
        out.innerHTML = list.length // Builds or replaces the element's HTML content.
            ? list.slice(0, shown).map(dealCard).join("") // Builds cards for only the products that should show now.
            : '<div class="empty-state"><h3>No matches</h3><p>Try a different keyword, category or condition.</p></div>'; // Performs the next step in the current Campus-Cart operation.
        if (count) { // Checks the condition before running this block.
            count.textContent = Math.min(shown, list.length) + " of " + list.length + " deals shown"; // Shows how many products are visible out of the matching products.
        } // Closes the current block, expression, or function call.
        if (moreBtn) { moreBtn.hidden = shown >= list.length; } // Hides See more when every matching product is already showing.
        if (lessBtn) { lessBtn.hidden = shown <= STEP || list.length <= STEP; } // Hides See less when only the first six are showing.
        } // Closes the current block, expression, or function call.
        if (moreBtn) { // Only sets up the button if it is on the page.
            moreBtn.addEventListener("click", function () { // Listens for a click on See more.
                shown += STEP; // Adds six more products.
                render(true); // Redraws the grid and keeps the new number.
                if (moreBtn.hidden && lessBtn) { lessBtn.focus(); } // Moves keyboard focus to See less when See more disappears.
            }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        if (lessBtn) { // Only sets up the button if it is on the page.
            lessBtn.addEventListener("click", function () { // Listens for a click on See less.
                shown = STEP; // Goes back to the first six products.
                render(true); // Redraws the grid with six products.
                out.scrollIntoView({ block: "start" }); // Scrolls back to the top of the grid so the visitor is not left at the bottom.
            }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        [cat, cond, sort].forEach(function (el) { el.addEventListener("change", render); }); // Registers a handler that runs when this element receives the specified event.
        if (search) { search.addEventListener("input", render); } // Checks the condition before running this block.
        render(); // Calls the function or method needed for this operation.
    } // Closes the current block, expression, or function call.

    /* ---------- Gallery category filter ---------- */
    // Initializes the category buttons that show or hide gallery items.
    function initGalleryFilter() { // Declares a reusable function for this feature.
        var buttons = document.querySelectorAll("[data-gallery-filter]"); // Declares and initializes the variable used by this operation.
        if (!buttons.length) { return; } // Checks the condition before running this block.
        Array.prototype.forEach.call(buttons, function (btn) { // Calls the function or method needed for this operation.
        btn.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.
            var val = btn.getAttribute("data-gallery-filter"); // Declares and initializes the variable used by this operation.
            Array.prototype.forEach.call(buttons, function (b) { // Calls the function or method needed for this operation.
            b.setAttribute("aria-selected", b === btn ? "true" : "false"); // Sets an HTML attribute, including its accessibility or state value.
            }); // Closes the current block, expression, or function call.
            Array.prototype.forEach.call(document.querySelectorAll("[data-gallery-item]"), function (fig) { // Selects the matching element or elements from the page.
            fig.hidden = !(val === "all" || fig.getAttribute("data-gallery-item") === val); // Reads the specified HTML attribute from this element.
            }); // Closes the current block, expression, or function call.
        }); // Closes the current block, expression, or function call.
        }); // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /* ---------- Order summary: session-only, cleared on refresh ---------- */
    // Stores the current order in JavaScript memory; sessionStorage provides temporary persistence during the session.
    var order = [];   // in-memory only

    // Serializes the current order and saves it to sessionStorage.
    function saveSession() { // Declares a reusable function for this feature.
        try { // Starts error-handling protection for the following operation.
        window.sessionStorage.setItem("cc_order", JSON.stringify(order)); // Saves the serialized value in session storage.
        } catch (e) { /* storage unavailable — memory only */ } // Performs the next step in the current Campus-Cart operation.
    } // Closes the current block, expression, or function call.
    // Reads the saved order from sessionStorage when the page starts.
    function loadSession() { // Declares a reusable function for this feature.
        try { // Starts error-handling protection for the following operation.
        var raw = window.sessionStorage.getItem("cc_order"); // Declares and initializes the variable used by this operation.
        order = raw ? JSON.parse(raw) : []; // Assigns a value to the variable or object property.
        } catch (e) { order = []; } // Performs the next step in the current Campus-Cart operation.
    } // Closes the current block, expression, or function call.
    // Calculates the complete order value from each item price and quantity.
    function total() { // Declares a reusable function for this feature.
        return order.reduce(function (s, i) { return s + i.price * i.qty; }, 0); // Exits this function and returns the stated value.
    } // Closes the current block, expression, or function call.
    // Updates every cart-count element with the total quantity currently in the order.
    function updateCartCount() { // Declares a reusable function for this feature.
        var qty = order.reduce(function (s, i) { return s + i.qty; }, 0); // Declares and initializes the variable used by this operation.
        Array.prototype.forEach.call(document.querySelectorAll("[data-cart-count]"), function (el) { // Selects the matching element or elements from the page.
        el.textContent = qty; // Updates the element's text without parsing it as HTML.
        }); // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    // Adds a product to the order or increases its quantity if it already exists.
    function addItem(name, price) { // Declares a reusable function for this feature.
        var found = null; // Declares and initializes the variable used by this operation.
        order.forEach(function (i) { if (i.name === name) { found = i; } }); // Runs the callback once for each item in the collection.
        if (found) { found.qty += 1; } else { order.push({ name: name, price: Number(price), qty: 1 }); } // Checks the condition before running this block.
        saveSession(); // Calls the function or method needed for this operation.
        updateCartCount(); // Calls the function or method needed for this operation.
        renderOrder(); // Calls the function or method needed for this operation.
        toast(name + " added to your Order Summary"); // Calls the function or method needed for this operation.
    } // Closes the current block, expression, or function call.

    // Adds delegated click handling for product buttons, including cards created dynamically.
    function initAddButtons() { // Declares a reusable function for this feature.
        document.addEventListener("click", function (e) { // Registers a document-level event handler for this interaction.
        var btn = e.target.closest ? e.target.closest("[data-add]") : null; // Declares and initializes the variable used by this operation.
        if (!btn) { return; } // Checks the condition before running this block.
        e.preventDefault(); // Stops the browser's default action so the custom handling can run.
        addItem(btn.getAttribute("data-add"), btn.getAttribute("data-price")); // Reads the specified HTML attribute from this element.
        }); // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    // Rebuilds the Order Summary table and updates its total and empty-state display.
    function renderOrder() { // Declares a reusable function for this feature.
        var body = document.getElementById("order-body"); // Declares and initializes the variable used by this operation.
        if (!body) { return; } // Checks the condition before running this block.
        var wrap = document.getElementById("order-table-wrap"); // Declares and initializes the variable used by this operation.
        var empty = document.getElementById("order-empty"); // Declares and initializes the variable used by this operation.
        var totalEl = document.getElementById("order-total"); // Declares and initializes the variable used by this operation.

        if (!order.length) { // Checks the condition before running this block.
        if (wrap) { wrap.hidden = true; } // Checks the condition before running this block.
        if (empty) { empty.hidden = false; } // Checks the condition before running this block.
        if (totalEl) { totalEl.textContent = currency(0); } // Checks the condition before running this block.
        return; // Exits this function and returns the stated value.
        } // Closes the current block, expression, or function call.
        if (wrap) { wrap.hidden = false; } // Checks the condition before running this block.
        if (empty) { empty.hidden = true; } // Checks the condition before running this block.

        body.innerHTML = order.map(function (i, idx) { // Builds or replaces the element's HTML content.
        return "<tr>" + // Exits this function and returns the stated value.
            "<td>" + i.name + "</td>" + // Provides a string segment used to build the output.
            "<td>" + currency(i.price) + "</td>" + // Provides a string segment used to build the output.
            "<td>" + i.qty + "</td>" + // Provides a string segment used to build the output.
            "<td>" + currency(i.price * i.qty) + "</td>" + // Provides a string segment used to build the output.
            '<td><button class="btn btn-sm btn-outline" data-remove="' + idx + '">Remove</button></td>' + // Provides a string segment used to build the output.
            "</tr>"; // Provides a string segment used to build the output.
        }).join(""); // Closes the callback and completes the function call.
        if (totalEl) { totalEl.textContent = currency(total()); } // Checks the condition before running this block.
    } // Closes the current block, expression, or function call.

    // Initializes controls that are only needed on the Order Summary and checkout page.
    function initOrderPage() { // Declares a reusable function for this feature.
        var body = document.getElementById("order-body"); // Declares and initializes the variable used by this operation.
        if (!body) { return; } // Checks the condition before running this block.

        body.addEventListener("click", function (e) { // Registers a handler that runs when this element receives the specified event.
        var btn = e.target.closest ? e.target.closest("[data-remove]") : null; // Declares and initializes the variable used by this operation.
        if (!btn) { return; } // Checks the condition before running this block.
        order.splice(Number(btn.getAttribute("data-remove")), 1); // Reads the specified HTML attribute from this element.
        saveSession(); // Calls the function or method needed for this operation.
        updateCartCount(); // Calls the function or method needed for this operation.
        renderOrder(); // Calls the function or method needed for this operation.
        toast("Item removed"); // Calls the function or method needed for this operation.
        }); // Closes the current block, expression, or function call.

        var clear = document.getElementById("order-clear"); // Declares and initializes the variable used by this operation.
        if (clear) { // Checks the condition before running this block.
        clear.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.
            order = []; // Assigns a value to the variable or object property.
            saveSession(); // Calls the function or method needed for this operation.
            updateCartCount(); // Calls the function or method needed for this operation.
            renderOrder(); // Calls the function or method needed for this operation.
            toast("Order Summary cleared"); // Calls the function or method needed for this operation.
        }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // "Skip to Address" step
        var skip = document.getElementById("skip-to-address"); // Declares and initializes the variable used by this operation.
        if (skip) { // Checks the condition before running this block.
        skip.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.
            var step = document.getElementById("step-address"); // Declares and initializes the variable used by this operation.
            if (step) { // Checks the condition before running this block.
            step.scrollIntoView({ behavior: "smooth", block: "center" }); // Scrolls the page until this element is visible.
            var input = document.getElementById("delivery-address"); // Declares and initializes the variable used by this operation.
            if (input) { input.focus(); } // Checks the condition before running this block.
            } // Closes the current block, expression, or function call.
        }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Delivery vs collection toggle text
        var method = document.getElementById("delivery-method"); // Declares and initializes the variable used by this operation.
        var methodHint = document.getElementById("delivery-hint"); // Declares and initializes the variable used by this operation.
        if (method && methodHint) { // Checks the condition before running this block.
        method.addEventListener("change", function () { // Registers a handler that runs when this element receives the specified event.
            methodHint.textContent = method.value === "collection" // Updates the element's text without parsing it as HTML.
            ? "Collection is free at any listed campus, residence or locker point." // Performs the next step in the current Campus-Cart operation.
            : "Courier delivery is quoted per order and confirmed by our team before payment."; // Performs the next step in the current Campus-Cart operation.
        }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Builds the plain-text order summary used by WhatsApp and email checkout.
        function orderText() { // Declares a reusable function for this feature.
        if (!order.length) { return "My Campus-Cart order summary is empty."; } // Checks the condition before running this block.
        var addr = (document.getElementById("delivery-address") || {}).value || "(not provided)"; // Declares and initializes the variable used by this operation.
        var m = (document.getElementById("delivery-method") || {}).value || "collection"; // Declares and initializes the variable used by this operation.
        var lines = order.map(function (i) { // Declares and initializes the variable used by this operation.
            return "- " + i.name + " x" + i.qty + " = " + currency(i.price * i.qty); // Exits this function and returns the stated value.
        }); // Closes the current block, expression, or function call.
        return "Campus-Cart order summary\n" + lines.join("\n") + // Exits this function and returns the stated value.
            "\nTotal: " + currency(total()) + // Provides a string segment used to build the output.
            "\nMethod: " + m + "\nAddress / collection point: " + addr; // Provides a string segment used to build the output.
        } // Closes the current block, expression, or function call.

        var wa = document.getElementById("checkout-whatsapp"); // Declares and initializes the variable used by this operation.
        if (wa) { // Checks the condition before running this block.
        wa.addEventListener("click", function (e) { // Registers a handler that runs when this element receives the specified event.
            e.preventDefault(); // Stops the browser's default action so the custom handling can run.
            if (!order.length) { return toast("Add an item first"); } // Checks the condition before running this block.
            window.open("https://wa.me/27123456789?text=" + encodeURIComponent(orderText()), "_blank"); // Opens the requested destination in a new browser context.
        }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        var mail = document.getElementById("checkout-email"); // Declares and initializes the variable used by this operation.
        if (mail) { // Checks the condition before running this block.
        mail.addEventListener("click", function (e) { // Registers a handler that runs when this element receives the specified event.
            e.preventDefault(); // Stops the browser's default action so the custom handling can run.
            if (!order.length) { return toast("Add an item first"); } // Checks the condition before running this block.
            window.location.href = "mailto:orders@campus-cart.co.za?subject=" + // Sets the browser destination for this navigation.
            encodeURIComponent("Campus-Cart order request") + // Calls the function or method needed for this operation.
            "&body=" + encodeURIComponent(orderText()); // Provides a string segment used to build the output.
        }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        var eft = document.getElementById("checkout-eft"); // Declares and initializes the variable used by this operation.
        if (eft) { // Checks the condition before running this block.
        eft.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.
            var box = document.getElementById("eft-details"); // Declares and initializes the variable used by this operation.
            if (box) { // Checks the condition before running this block.
            box.hidden = !box.hidden; // Shows or hides the element by updating its hidden state.
            if (!box.hidden) { box.scrollIntoView({ behavior: "smooth", block: "center" }); } // Checks the condition before running this block.
            } // Closes the current block, expression, or function call.
        }); // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        renderOrder(); // Calls the function or method needed for this operation.
    } // Closes the current block, expression, or function call.

    /* ---------- Account: reveal Student / Parent path from the hash ---------- */
    // Uses the URL hash to reveal and scroll to the Student or Parent account section.
    function initAccountHash() { // Declares a reusable function for this feature.
        if (!document.getElementById("student")) { return; } // Checks the condition before running this block.
        var hash = window.location.hash; // Declares and initializes the variable used by this operation.
        if (hash === "#parent" || hash === "#student") { // Checks the condition before running this block.
        var el = document.querySelector(hash); // Declares and initializes the variable used by this operation.
        if (el) { window.setTimeout(function () { el.scrollIntoView({ behavior: "smooth" }); }, 120); } // Checks the condition before running this block.
        } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /* ---------- Printable checklist ---------- */
    // Prints only the First Year Checklist, not the whole page.
    // Clicking the button builds a clean print sheet from the checklist on the page and marks the page
    // as "printing the checklist". The print styles in styles.css then hide everything except that sheet.
    function initPrint() { // Declares a reusable function for this feature.
        var btn = document.getElementById("print-checklist"); // Declares and initializes the variable used by this operation.
        if (!btn) { return; } // Checks the condition before running this block.

        var sheet = null; // Declares and initializes the variable used by this operation.

        // Removes the print sheet and returns the page to normal.
        function removeSheet() { // Declares a reusable function for this feature.
            if (sheet) { // Checks the condition before running this block.
                sheet.parentNode.removeChild(sheet); // Calls the function or method needed for this operation.
                sheet = null; // Assigns a value to the variable or object property.
            } // Closes the current block, expression, or function call.
            document.body.classList.remove("printing-checklist"); // Changes or checks a CSS class controlling the element's state.
        } // Closes the current block, expression, or function call.

        btn.addEventListener("click", function () { // Registers a handler that runs when this element receives the specified event.
            removeSheet(); // Calls the function or method needed for this operation.

            var source = btn.closest(".info-box").querySelector(".checklist"); // Declares and initializes the variable used by this operation.

            sheet = document.createElement("div"); // Assigns a value to the variable or object property.
            sheet.id = "print-sheet"; // Assigns the ID used to identify this element.

            var title = document.createElement("p"); // Declares and initializes the variable used by this operation.
            title.className = "print-title"; // Assigns the CSS class used to style this element.
            title.textContent = "Campus-Cart First Year Checklist"; // Updates the element's text without parsing it as HTML.

            var intro = document.createElement("p"); // Declares and initializes the variable used by this operation.
            intro.textContent = "Tick off what you already own and buy only what is still missing."; // Updates the element's text without parsing it as HTML.

            // A copy of the checklist, so the list on the page itself is left unchanged.
            var list = source.cloneNode(true); // Declares and initializes the variable used by this operation.
            list.className = "print-list"; // Assigns the CSS class used to style this element.

            var source_note = document.createElement("p"); // Declares and initializes the variable used by this operation.
            source_note.className = "print-note"; // Assigns the CSS class used to style this element.
            source_note.textContent = "Printed from " + window.location.href.split("#")[0]; // Updates the element's text without parsing it as HTML.

            sheet.appendChild(title); // Inserts the created element into the document.
            sheet.appendChild(intro); // Inserts the created element into the document.
            sheet.appendChild(list); // Inserts the created element into the document.
            sheet.appendChild(source_note); // Inserts the created element into the document.
            document.body.appendChild(sheet); // Inserts the created element into the document.
            document.body.classList.add("printing-checklist"); // Changes or checks a CSS class controlling the element's state.

            window.print(); // Opens the browser print dialog for the prepared checklist.
        }); // Closes the current block, expression, or function call.

        // Puts the page back to normal once the print dialog closes.
        window.addEventListener("afterprint", removeSheet); // Registers a window event handler for this browser event.
    } // Closes the current block, expression, or function call.

    /* ---------- Forms: mailto hand-off only, no backend ---------- */
    // Converts website forms into mailto messages because Campus-Cart has no backend.
    function initMailForms() { // Declares a reusable function for this feature.
        Array.prototype.forEach.call(document.querySelectorAll("form[data-mailto]"), function (form) { // Selects the matching element or elements from the page.
        form.addEventListener("submit", function (e) { // Registers a handler that runs when this element receives the specified event.
            e.preventDefault(); // Stops the browser's default action so the custom handling can run.
            var to = form.getAttribute("data-mailto"); // Declares and initializes the variable used by this operation.
            var subject = form.getAttribute("data-subject") || "Campus-Cart website message"; // Declares and initializes the variable used by this operation.
            var lines = []; // Declares and initializes the variable used by this operation.
            Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (f) { // Selects the matching element or elements from the page.
            if (!f.name) { return; } // Checks the condition before running this block.
            var label = form.querySelector('label[for="' + f.id + '"]'); // Declares and initializes the variable used by this operation.
            lines.push((label ? label.textContent.replace("*", "").trim() : f.name) + ": " + f.value); // Adds the new item to the end of the array.
            }); // Closes the current block, expression, or function call.
            window.location.href = "mailto:" + to + // Sets the browser destination for this navigation.
            "?subject=" + encodeURIComponent(subject) + // Provides a string segment used to build the output.
            "&body=" + encodeURIComponent(lines.join("\n")); // Provides a string segment used to build the output.
            toast("Opening your email app…"); // Calls the function or method needed for this operation.
        }); // Closes the current block, expression, or function call.
        }); // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /* ---------- Product detail template: pick a product ---------- */
    // Initializes the product selector and keeps the detail panel synchronized with the selected product.
    function initProductDetail() { // Declares a reusable function for this feature.
        var select = document.getElementById("detail-select"); // Declares and initializes the variable used by this operation.
        if (!select) { return; } // Checks the condition before running this block.
        select.innerHTML = DEALS.map(function (d, i) { // Builds or replaces the element's HTML content.
        return '<option value="' + i + '">' + d.name + " — " + currency(d.price) + "</option>"; // Exits this function and returns the stated value.
        }).join(""); // Closes the callback and completes the function call.

        function render() { // Declares a reusable function for this feature.
        var d = DEALS[Number(select.value)] || DEALS[0]; // Declares and initializes the variable used by this operation.
        document.getElementById("detail-img").src = BASE + d.img; // Looks up the page element with the specified ID.
        document.getElementById("detail-img").alt = d.name; // Looks up the page element with the specified ID.
        document.getElementById("detail-name").textContent = d.name; // Looks up the page element with the specified ID.
        document.getElementById("detail-price").textContent = currency(d.price); // Looks up the page element with the specified ID.
        document.getElementById("detail-desc").textContent = d.desc; // Looks up the page element with the specified ID.
        document.getElementById("detail-condition").textContent = // Looks up the page element with the specified ID.
            d.condition === "new" ? "Brand new" : "Second-hand (reviewed)"; // Assigns a value to the variable or object property.
        var add = document.getElementById("detail-add"); // Declares and initializes the variable used by this operation.
        add.setAttribute("data-add", d.name); // Sets an HTML attribute, including its accessibility or state value.
        add.setAttribute("data-price", d.price); // Sets an HTML attribute, including its accessibility or state value.
        } // Closes the current block, expression, or function call.
        select.addEventListener("change", render); // Registers a handler that runs when this element receives the specified event.
        render(); // Calls the function or method needed for this operation.
    } // Closes the current block, expression, or function call.
    
    function updateNavDateTime() { // Declares a reusable function for this feature.
        const now = new Date(); // Declares and initializes the variable used by this operation.

        const time = new Intl.DateTimeFormat("en-GB", { // Declares and initializes the variable used by this operation.
            timeZone: "Africa/Johannesburg", // Defines a property or argument in the current structure.
            hour: "2-digit", // Defines a property or argument in the current structure.
            minute: "2-digit", // Defines a property or argument in the current structure.
            second: "2-digit", // Defines a property or argument in the current structure.
            hour12: false // Defines a property or argument in the current structure.
        }).format(now); // Closes the callback and completes the function call.

        const date = new Intl.DateTimeFormat("en-GB", { // Declares and initializes the variable used by this operation.
            timeZone: "Africa/Johannesburg", // Defines a property or argument in the current structure.
            day: "2-digit", // Defines a property or argument in the current structure.
            month: "short", // Defines a property or argument in the current structure.
            year: "numeric" // Defines a property or argument in the current structure.
        }).format(now); // Closes the callback and completes the function call.

        document.getElementById("navTime").textContent = time; // Looks up the page element with the specified ID.
        document.getElementById("navDate").textContent = date; // Looks up the page element with the specified ID.
    } // Closes the current block, expression, or function call.

    updateNavDateTime(); // Calls the function or method needed for this operation.
    setInterval(updateNavDateTime, 1000); // Calls the function or method needed for this operation.

    document.getElementById("copyright-year").textContent = new Date().getFullYear();

    /* ---------- Boot ---------- */
    document.addEventListener("DOMContentLoaded", function () { // Registers a document-level event handler for this interaction.
        loadSession(); // Calls the function or method needed for this operation.
        initNav(); // Calls the function or method needed for this operation.
        initTabs(); // Calls the function or method needed for this operation.
        initDeals(); // Calls the function or method needed for this operation.
        initGalleryFilter(); // Calls the function or method needed for this operation.
        initAddButtons(); // Calls the function or method needed for this operation.
        initProductDetail(); // Calls the function or method needed for this operation.
        initOrderPage(); // Calls the function or method needed for this operation.
        initAccountHash(); // Calls the function or method needed for this operation.
        initPrint(); // Calls the function or method needed for this operation.
        initMailForms(); // Calls the function or method needed for this operation.
        updateCartCount(); // Calls the function or method needed for this operation.
    } // Closes the current block, expression, or function call.
); // Closes the current block, expression, or function call.

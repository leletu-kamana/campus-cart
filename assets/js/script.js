// ==========================================================
// CAMPUS-CART
// UNIFIED PAGE LOADER & PAGE TRANSITION SYSTEM
// Features the Uiverse.io loader by Chris-immanuel-matthew
// Provides zero-flash initial loading and smooth page transitions.
// (The product, cart and form code that used to share this file now
// lives in data.js, interactions.js and forms.js.)
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

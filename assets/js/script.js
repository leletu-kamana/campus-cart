// ==========================================================
// CAMPUS-CART
// UNIFIED PAGE LOADER & PAGE TRANSITION SYSTEM
// Features the Uiverse.io loader by Chris-immanuel-matthew
// Provides zero-flash initial loading and smooth page transitions.
// (The product, cart and form code that used to share this file now
// lives in data.js, interactions.js and forms.js.)
// ==========================================================
// INLINE COMMENTING GUIDE: Explanatory comments identify the purpose of the main logic blocks, state changes, DOM operations and event handling.

// JavaScript statement/expression: (function () { // Performs the next step in the current Campus-Cart operation.
(function () { // Performs the next step in the current Campus-Cart operation.
    // Enables JavaScript strict mode so unsafe or undeclared code is caught instead of silently continuing.
    // JavaScript statement/expression: "use strict"; // Provides a string segment used to build the output.
    "use strict"; // Provides a string segment used to build the output.

    // Transition timing constants (in milliseconds)
    // Stores the duration of the loader exit transition before the browser navigates to another page.
    // JavaScript statement/expression: var TRANSITION_OUT_TIME = 1200; // Duration of smooth exit transition before navigating (kept short so pages f
    var TRANSITION_OUT_TIME = 1200; // Duration of smooth exit transition before navigating (kept short so pages feel quick)
    // Stores the minimum time the loader remains visible so very fast loads still look smooth.
    // JavaScript statement/expression: var MIN_LOADER_TIME = 260;     // Minimum display time for visual smoothness on fast loads
    var MIN_LOADER_TIME = 260;     // Minimum display time for visual smoothness on fast loads
    // Stores the maximum loader time before the failsafe automatically hides it.
    // JavaScript statement/expression: var SAFETY_TIMEOUT = 6000;     // Failsafe timeout to prevent permanently stuck loader
    var SAFETY_TIMEOUT = 6000;     // Failsafe timeout to prevent permanently stuck loader

    // State trackers
    // Tracks whether an internal page transition is already running.
    // JavaScript statement/expression: var isNavigating = false; // Declares and initializes the variable used by this operation.
    var isNavigating = false; // Declares and initializes the variable used by this operation.
    // Records when this script started so the minimum loader duration can be calculated.
    // JavaScript statement/expression: var pageLoadStartTime = Date.now(); // Declares and initializes the variable used by this operation.
    var pageLoadStartTime = Date.now(); // Declares and initializes the variable used by this operation.
    // Stores the timer used to hide the loader after the initial page load.
    // JavaScript statement/expression: var loaderTimer = null; // Declares and initializes the variable used by this operation.
    var loaderTimer = null; // Declares and initializes the variable used by this operation.
    // Stores the failsafe timer that prevents a permanently visible loader.
    // JavaScript statement/expression: var safetyTimer = null; // Declares and initializes the variable used by this operation.
    var safetyTimer = null; // Declares and initializes the variable used by this operation.

    /**
     * Finds or dynamically creates the page loader element.
     * Ensures the loader is always available even if omitted from an HTML file.
     */
    // Defines the function that finds the loader or creates it when an HTML page does not contain one.
    // JavaScript statement/expression: function getOrCreateLoader() { // Declares a reusable function for this feature.
    function getOrCreateLoader() { // Declares a reusable function for this feature.
        // Searches the document for the element identified as the page loader.
        // JavaScript statement/expression: var loader = document.getElementById("page-loader"); // Declares and initializes the variable used by this ope
        var loader = document.getElementById("page-loader"); // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: if (!loader && document.body) { // Checks the condition before running this block.
        if (!loader && document.body) { // Checks the condition before running this block.
            // Creates a div element when the loader is missing from the HTML.
            // JavaScript statement/expression: loader = document.createElement("div"); // Assigns a value to the variable or object property.
            loader = document.createElement("div"); // Assigns a value to the variable or object property.
            // Assigns the ID used by CSS and other JavaScript loader controls.
            // JavaScript statement/expression: loader.id = "page-loader"; // Assigns the ID used to identify this element.
            loader.id = "page-loader"; // Assigns the ID used to identify this element.
            // Assigns the CSS class that controls the loader overlay appearance.
            // JavaScript statement/expression: loader.className = "page-loader"; // Assigns the CSS class used to style this element.
            loader.className = "page-loader"; // Assigns the CSS class used to style this element.
            // Identifies the loader as a status message for assistive technologies.
            // JavaScript statement/expression: loader.setAttribute("role", "status"); // Sets an HTML attribute, including its accessibility or state value.
            loader.setAttribute("role", "status"); // Sets an HTML attribute, including its accessibility or state value.
            // Allows screen readers to announce the status without interrupting the user.
            // JavaScript statement/expression: loader.setAttribute("aria-live", "polite"); // Sets an HTML attribute, including its accessibility or state va
            loader.setAttribute("aria-live", "polite"); // Sets an HTML attribute, including its accessibility or state value.
            // Gives the loader an accessible description.
            // JavaScript statement/expression: loader.setAttribute("aria-label", "Loading Campus-Cart"); // Sets an HTML attribute, including its accessibili
            loader.setAttribute("aria-label", "Loading Campus-Cart"); // Sets an HTML attribute, including its accessibility or state value.
            // Builds the loader HTML structure as one string before inserting it into the document.
            // JavaScript statement/expression: loader.innerHTML = // Builds or replaces the element's HTML content.
            loader.innerHTML = // Builds or replaces the element's HTML content.
                // JavaScript statement/expression: '<div class="page-loader-content">' + // Provides a string segment used to build the output.
                '<div class="page-loader-content">' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '  <div class="page-loader-visual">' + // Provides a string segment used to build the output.
                '  <div class="page-loader-visual">' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '    <div class="loader" aria-hidden="true">' + // Provides a string segment used to build the output.
                '    <div class="loader" aria-hidden="true">' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '      <div class="nucleus"></div>' + // Provides a string segment used to build the output.
                '      <div class="nucleus"></div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                '      <div class="ring"></div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '    </div>' + // Provides a string segment used to build the output.
                '    </div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '  </div>' + // Provides a string segment used to build the output.
                '  </div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '  <div class="page-loader-brand" aria-hidden="true">' + // Provides a string segment used to build the output
                '  <div class="page-loader-brand" aria-hidden="true">' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '    <span class="page-loader-title">Campus<span>-Cart</span></span>' + // Provides a string segment used to b
                '    <span class="page-loader-title">Campus<span>-Cart</span></span>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '    <span class="page-loader-text">Loading Campus-Cart...</span>' + // Provides a string segment used to buil
                '    <span class="page-loader-text">Loading Campus-Cart...</span>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '  </div>' + // Provides a string segment used to build the output.
                '  </div>' + // Provides a string segment used to build the output.
                // JavaScript statement/expression: '</div>'; // Provides a string segment used to build the output.
                '</div>'; // Provides a string segment used to build the output.
            // Places the loader at the beginning of the body so it can cover the page content.
            // JavaScript statement/expression: document.body.prepend(loader); // Inserts the created element into the document.
            document.body.prepend(loader); // Inserts the created element into the document.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        // Returns the loader element to the function that requested it.
        // JavaScript statement/expression: return loader; // Exits this function and returns the stated value.
        return loader; // Exits this function and returns the stated value.
    // JavaScript statement/expression: } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /**
     * Displays the full-screen loader and locks page scrolling.
     */
    // Defines the function that displays the full-screen loader and locks page scrolling.
    // JavaScript statement/expression: function showPageLoader() { // Declares a reusable function for this feature.
    function showPageLoader() { // Declares a reusable function for this feature.
        // Gets the existing loader or creates one before changing its state.
        // JavaScript statement/expression: var loader = getOrCreateLoader(); // Declares and initializes the variable used by this operation.
        var loader = getOrCreateLoader(); // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: if (loader) { // Checks the condition before running this block.
        if (loader) { // Checks the condition before running this block.
            // Removes the hidden class so the loader becomes visible.
            // JavaScript statement/expression: loader.classList.remove("is-hidden"); // Changes or checks a CSS class controlling the element's state.
            loader.classList.remove("is-hidden"); // Changes or checks a CSS class controlling the element's state.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        // JavaScript statement/expression: if (document.body) { // Checks the condition before running this block.
        if (document.body) { // Checks the condition before running this block.
            // Adds the page-loading class so CSS can prevent scrolling while loading.
            // JavaScript statement/expression: document.body.classList.add("page-loading"); // Changes or checks a CSS class controlling the element's state.
            document.body.classList.add("page-loading"); // Changes or checks a CSS class controlling the element's state.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Start failsafe safety timer
        // JavaScript statement/expression: if (safetyTimer) { // Checks the condition before running this block.
        if (safetyTimer) { // Checks the condition before running this block.
            // JavaScript statement/expression: clearTimeout(safetyTimer); // Calls the function or method needed for this operation.
            clearTimeout(safetyTimer); // Calls the function or method needed for this operation.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        // Starts a failsafe timer in case the normal navigation process becomes stuck.
        // JavaScript statement/expression: safetyTimer = setTimeout(function () { // Assigns a value to the variable or object property.
        safetyTimer = setTimeout(function () { // Assigns a value to the variable or object property.
            // JavaScript statement/expression: hidePageLoader(); // Calls the function or method needed for this operation.
            hidePageLoader(); // Calls the function or method needed for this operation.
            // JavaScript statement/expression: isNavigating = false; // Assigns a value to the variable or object property.
            isNavigating = false; // Assigns a value to the variable or object property.
        // JavaScript statement/expression: }, SAFETY_TIMEOUT); // Performs the next step in the current Campus-Cart operation.
        }, SAFETY_TIMEOUT); // Performs the next step in the current Campus-Cart operation.
    // JavaScript statement/expression: } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /**
     * Smoothly hides the full-screen loader and restores page scrolling.
     */
    // Defines the function that hides the loader and restores normal page scrolling.
    // JavaScript statement/expression: function hidePageLoader() { // Declares a reusable function for this feature.
    function hidePageLoader() { // Declares a reusable function for this feature.
        // JavaScript statement/expression: if (safetyTimer) { // Checks the condition before running this block.
        if (safetyTimer) { // Checks the condition before running this block.
            // JavaScript statement/expression: clearTimeout(safetyTimer); // Calls the function or method needed for this operation.
            clearTimeout(safetyTimer); // Calls the function or method needed for this operation.
            // JavaScript statement/expression: safetyTimer = null; // Assigns a value to the variable or object property.
            safetyTimer = null; // Assigns a value to the variable or object property.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // JavaScript statement/expression: var loader = document.getElementById("page-loader"); // Declares and initializes the variable used by this ope
        var loader = document.getElementById("page-loader"); // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: if (loader) { // Checks the condition before running this block.
        if (loader) { // Checks the condition before running this block.
            // Adds the hidden class so the loader can fade or transition out.
            // JavaScript statement/expression: loader.classList.add("is-hidden"); // Changes or checks a CSS class controlling the element's state.
            loader.classList.add("is-hidden"); // Changes or checks a CSS class controlling the element's state.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
        // JavaScript statement/expression: if (document.body) { // Checks the condition before running this block.
        if (document.body) { // Checks the condition before running this block.
            // Removes the page-loading class and restores normal scrolling.
            // JavaScript statement/expression: document.body.classList.remove("page-loading"); // Changes or checks a CSS class controlling the element's sta
            document.body.classList.remove("page-loading"); // Changes or checks a CSS class controlling the element's state.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
    // JavaScript statement/expression: } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /**
     * Completes initial page loading with a slight buffer so the animation
     * resolves smoothly without jarring or flashing.
     */
    // Calculates when the initial loader should hide while respecting the minimum display time.
    // JavaScript statement/expression: function scheduleInitialHide() { // Declares a reusable function for this feature.
    function scheduleInitialHide() { // Declares a reusable function for this feature.
        // Calculates the number of milliseconds that have passed since the script started.
        // JavaScript statement/expression: var elapsedTime = Date.now() - pageLoadStartTime; // Declares and initializes the variable used by this operat
        var elapsedTime = Date.now() - pageLoadStartTime; // Declares and initializes the variable used by this operation.
        // Calculates the remaining minimum loader time and prevents a negative delay.
        // JavaScript statement/expression: var remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime); // Declares and initializes the variable used 
        var remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime); // Declares and initializes the variable used by this operation.

        // JavaScript statement/expression: if (loaderTimer) { // Checks the condition before running this block.
        if (loaderTimer) { // Checks the condition before running this block.
            // JavaScript statement/expression: clearTimeout(loaderTimer); // Calls the function or method needed for this operation.
            clearTimeout(loaderTimer); // Calls the function or method needed for this operation.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // JavaScript statement/expression: loaderTimer = setTimeout(function () { // Assigns a value to the variable or object property.
        loaderTimer = setTimeout(function () { // Assigns a value to the variable or object property.
            // JavaScript statement/expression: hidePageLoader(); // Calls the function or method needed for this operation.
            hidePageLoader(); // Calls the function or method needed for this operation.
        // JavaScript statement/expression: }, remainingTime); // Performs the next step in the current Campus-Cart operation.
        }, remainingTime); // Performs the next step in the current Campus-Cart operation.
    // JavaScript statement/expression: } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /**
     * Determines whether an anchor link should trigger the smooth internal page transition.
     * Excludes external links, mailto, tel, WhatsApp, download links, target="_blank", and anchor jumps.
     */
    // Determines whether a clicked link should use the custom Campus-Cart page transition.
    // JavaScript statement/expression: function shouldTransition(link, url) { // Declares a reusable function for this feature.
    function shouldTransition(link, url) { // Declares a reusable function for this feature.
        // Exclude external domains
        // Rejects links that point to a different website origin.
        // JavaScript statement/expression: if (url.origin !== window.location.origin) { // Checks the condition before running this block.
        if (url.origin !== window.location.origin) { // Checks the condition before running this block.
            // JavaScript statement/expression: return false; // Exits this function and returns the stated value.
            return false; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Exclude links set to open in a new tab or specific target
        // Rejects links that intentionally open in another browsing context.
        // JavaScript statement/expression: if (link.target && link.target !== "_self") { // Checks the condition before running this block.
        if (link.target && link.target !== "_self") { // Checks the condition before running this block.
            // JavaScript statement/expression: return false; // Exits this function and returns the stated value.
            return false; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Exclude file downloads
        // Rejects links intended to download a file instead of navigating between pages.
        // JavaScript statement/expression: if (link.hasAttribute("download")) { // Checks the condition before running this block.
        if (link.hasAttribute("download")) { // Checks the condition before running this block.
            // JavaScript statement/expression: return false; // Exits this function and returns the stated value.
            return false; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Exclude external protocol schemes
        // Reads the original href attribute so special protocols can be identified.
        // JavaScript statement/expression: var href = link.getAttribute("href") || ""; // Declares and initializes the variable used by this operation.
        var href = link.getAttribute("href") || ""; // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: if (href.indexOf("mailto:") === 0 || // Checks the condition before running this block.
        if (href.indexOf("mailto:") === 0 || // Checks the condition before running this block.
            // JavaScript statement/expression: href.indexOf("tel:") === 0 || // Calls the function or method needed for this operation.
            href.indexOf("tel:") === 0 || // Calls the function or method needed for this operation.
            // JavaScript statement/expression: href.indexOf("https://wa.me/") === 0 || // Calls the function or method needed for this operation.
            href.indexOf("https://wa.me/") === 0 || // Calls the function or method needed for this operation.
            // JavaScript statement/expression: href.indexOf("javascript:") === 0) { // Calls the function or method needed for this operation.
            href.indexOf("javascript:") === 0) { // Calls the function or method needed for this operation.
            // JavaScript statement/expression: return false; // Exits this function and returns the stated value.
            return false; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Exclude same-page hash jumps (e.g. #student, #parent, #top)
        // Checks whether the destination uses the same path as the current page.
        // JavaScript statement/expression: var isSamePath = url.pathname === window.location.pathname; // Declares and initializes the variable used by t
        var isSamePath = url.pathname === window.location.pathname; // Declares and initializes the variable used by this operation.
        // Checks whether the destination has the same query-string parameters.
        // JavaScript statement/expression: var isSameSearch = url.search === window.location.search; // Declares and initializes the variable used by thi
        var isSameSearch = url.search === window.location.search; // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: if (isSamePath && isSameSearch && url.hash !== "") { // Checks the condition before running this block.
        if (isSamePath && isSameSearch && url.hash !== "") { // Checks the condition before running this block.
            // JavaScript statement/expression: return false; // Exits this function and returns the stated value.
            return false; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Exclude clicking the exact same URL if already on it
        // JavaScript statement/expression: if (isSamePath && isSameSearch && !url.hash && !window.location.hash) { // Checks the condition before running
        if (isSamePath && isSameSearch && !url.hash && !window.location.hash) { // Checks the condition before running this block.
            // JavaScript statement/expression: return false; // Exits this function and returns the stated value.
            return false; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // JavaScript statement/expression: return true; // Exits this function and returns the stated value.
        return true; // Exits this function and returns the stated value.
    // JavaScript statement/expression: } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    /**
     * Initiates the internal page transition:
     * 1. Displays the loader overlay.
     * 2. Waits for the smooth exit transition duration.
     * 3. Navigates to the destination page.
     */
    // Starts the custom transition before navigating to the requested internal URL.
    // JavaScript statement/expression: function handleInternalNavigation(destinationUrl) { // Declares a reusable function for this feature.
    function handleInternalNavigation(destinationUrl) { // Declares a reusable function for this feature.
        // Locks the transition state so repeated clicks cannot start duplicate navigations.
        // JavaScript statement/expression: isNavigating = true; // Assigns a value to the variable or object property.
        isNavigating = true; // Assigns a value to the variable or object property.
        // Displays the loader before the browser changes the current document.
        // JavaScript statement/expression: showPageLoader(); // Calls the function or method needed for this operation.
        showPageLoader(); // Calls the function or method needed for this operation.

        // JavaScript statement/expression: setTimeout(function () { // Schedules this callback to run after the specified delay.
        setTimeout(function () { // Schedules this callback to run after the specified delay.
            // Navigates the browser to the destination after the exit transition finishes.
            // JavaScript statement/expression: window.location.href = destinationUrl; // Sets the browser destination for this navigation.
            window.location.href = destinationUrl; // Sets the browser destination for this navigation.
        // JavaScript statement/expression: }, TRANSITION_OUT_TIME); // Performs the next step in the current Campus-Cart operation.
        }, TRANSITION_OUT_TIME); // Performs the next step in the current Campus-Cart operation.
    // JavaScript statement/expression: } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    // Intercept normal internal clicks across the document
    // Watches document clicks so eligible internal anchor links can use the custom transition.
    // JavaScript statement/expression: document.addEventListener("click", function (event) { // Registers a document-level event handler for this int
    document.addEventListener("click", function (event) { // Registers a document-level event handler for this interaction.
        // Allow default browser behaviors for modified clicks (e.g. Ctrl+click, Cmd+click to open new tab)
        // JavaScript statement/expression: if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { // Checks the condition before running this block.
            // JavaScript statement/expression: return; // Exits this function and returns the stated value.
            return; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // Finds the nearest anchor element associated with the clicked target.
        // JavaScript statement/expression: var link = event.target.closest ? event.target.closest("a") : null; // Declares and initializes the variable u
        var link = event.target.closest ? event.target.closest("a") : null; // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: if (!link || !link.href) { // Checks the condition before running this block.
        if (!link || !link.href) { // Checks the condition before running this block.
            // JavaScript statement/expression: return; // Exits this function and returns the stated value.
            return; // Exits this function and returns the stated value.
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.

        // JavaScript statement/expression: try { // Starts error-handling protection for the following operation.
        try { // Starts error-handling protection for the following operation.
            // Creates a complete URL object using the current page URL as the base.
            // JavaScript statement/expression: var url = new URL(link.href, window.location.href); // Declares and initializes the variable used by this oper
            var url = new URL(link.href, window.location.href); // Declares and initializes the variable used by this operation.

            // JavaScript statement/expression: if (!shouldTransition(link, url)) { // Checks the condition before running this block.
            if (!shouldTransition(link, url)) { // Checks the condition before running this block.
                // JavaScript statement/expression: return; // Exits this function and returns the stated value.
                return; // Exits this function and returns the stated value.
            // JavaScript statement/expression: } // Closes the current block, expression, or function call.
            } // Closes the current block, expression, or function call.

            // If a transition is already in flight, block rapid duplicate clicks
            // JavaScript statement/expression: if (isNavigating) { // Checks the condition before running this block.
            if (isNavigating) { // Checks the condition before running this block.
                // JavaScript statement/expression: event.preventDefault(); // Stops the browser's default action so the custom handling can run.
                event.preventDefault(); // Stops the browser's default action so the custom handling can run.
                // JavaScript statement/expression: return; // Exits this function and returns the stated value.
                return; // Exits this function and returns the stated value.
            // JavaScript statement/expression: } // Closes the current block, expression, or function call.
            } // Closes the current block, expression, or function call.

            // JavaScript statement/expression: event.preventDefault(); // Stops the browser's default action so the custom handling can run.
            event.preventDefault(); // Stops the browser's default action so the custom handling can run.
            // JavaScript statement/expression: handleInternalNavigation(url.href); // Calls the function or method needed for this operation.
            handleInternalNavigation(url.href); // Calls the function or method needed for this operation.
        // JavaScript statement/expression: } catch (e) { // Performs the next step in the current Campus-Cart operation.
        } catch (e) { // Performs the next step in the current Campus-Cart operation.
            // If URL parsing fails, allow standard browser navigation
        // JavaScript statement/expression: } // Closes the current block, expression, or function call.
        } // Closes the current block, expression, or function call.
    // JavaScript statement/expression: }); // Closes the current block, expression, or function call.
    }); // Closes the current block, expression, or function call.

    // Handle initial page load lifecycle
    // Checks whether the browser has already completed the page loading lifecycle.
    // JavaScript statement/expression: if (document.readyState === "complete") { // Checks the condition before running this block.
    if (document.readyState === "complete") { // Checks the condition before running this block.
        // JavaScript statement/expression: scheduleInitialHide(); // Calls the function or method needed for this operation.
        scheduleInitialHide(); // Calls the function or method needed for this operation.
    // JavaScript statement/expression: } else { // Runs the alternative branch when the preceding condition is false.
    } else { // Runs the alternative branch when the preceding condition is false.
        // Runs the initial loader hide logic once page resources have finished loading.
        // JavaScript statement/expression: window.addEventListener("load", scheduleInitialHide, { once: true }); // Registers a window event handler for 
        window.addEventListener("load", scheduleInitialHide, { once: true }); // Registers a window event handler for this browser event.
        // Also ensure hide fires if load event was delayed by third-party frames
        // Provides an additional fallback based on DOM readiness.
        // Waits until the HTML has been parsed before initializing features that depend on page elements.
    // JavaScript statement/expression: document.addEventListener("DOMContentLoaded", function () { // Registers a document-level event handler for th
    document.addEventListener("DOMContentLoaded", function () { // Registers a document-level event handler for this interaction.
            // JavaScript statement/expression: setTimeout(scheduleInitialHide, 500); // Schedules this callback to run after the specified delay.
            setTimeout(scheduleInitialHide, 500); // Schedules this callback to run after the specified delay.
        // JavaScript statement/expression: }, { once: true }); // Performs the next step in the current Campus-Cart operation.
        }, { once: true }); // Performs the next step in the current Campus-Cart operation.
    // JavaScript statement/expression: } // Closes the current block, expression, or function call.
    } // Closes the current block, expression, or function call.

    // Handle Browser Back / Browser Forward / BFCache restoration
    // Handles browser back, forward, and BFCache restoration events.
    // JavaScript statement/expression: window.addEventListener("pageshow", function (event) { // Registers a window event handler for this browser ev
    window.addEventListener("pageshow", function (event) { // Registers a window event handler for this browser event.
        // JavaScript statement/expression: isNavigating = false; // Assigns a value to the variable or object property.
        isNavigating = false; // Assigns a value to the variable or object property.
        // JavaScript statement/expression: hidePageLoader(); // Calls the function or method needed for this operation.
        hidePageLoader(); // Calls the function or method needed for this operation.
    // JavaScript statement/expression: }); // Closes the current block, expression, or function call.
    }); // Closes the current block, expression, or function call.

    // Expose control functions globally for safety/testing
    // Exposes loader controls globally for testing or controlled use by other scripts.
    // JavaScript statement/expression: window.CampusCartLoader = { // Assigns a value to the variable or object property.
    window.CampusCartLoader = { // Assigns a value to the variable or object property.
        // JavaScript statement/expression: show: showPageLoader, // Defines a property or argument in the current structure.
        show: showPageLoader, // Defines a property or argument in the current structure.
        // JavaScript statement/expression: hide: hidePageLoader, // Defines a property or argument in the current structure.
        hide: hidePageLoader, // Defines a property or argument in the current structure.
        // JavaScript statement/expression: isNavigating: function () { return isNavigating; } // Defines a property or argument in the current structure.
        isNavigating: function () { return isNavigating; } // Defines a property or argument in the current structure.
    // JavaScript statement/expression: }; // Closes the current block, expression, or function call.
    }; // Closes the current block, expression, or function call.

// JavaScript statement/expression: })(); // Closes the callback and completes the function call.
})(); // Closes the callback and completes the function call.

// CONSENT LAYER — Builds and manages the visitor-facing cookie and embedded-map preference interface, saving the selected choices in browser storage when available. Map embeds remain blocked until the relevant permission is granted; this script does not provide a complete legal consent-management platform.

(function () { // Wraps the code in a function so its variables stay private.
    "use strict"; // Turns on stricter error checking.

    // ---------- Settings ----------
    var KEY = "cc_consent"; // Name used to save the choices in the browser.
    // Declares the setting, state value or DOM reference used by this module.
    var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // The choices are asked for again after 12 months.
    // Declares the setting, state value or DOM reference used by this module.
    var state = { maps: false, decided: false }; // Current choices: embedded maps off, nothing decided yet.
    // Declares the setting, state value or DOM reference used by this module.
    var banner = null; // The banner element, created the first time it is needed.
    // Declares the setting, state value or DOM reference used by this module.
    var opener = null; // The button that opened the settings, so focus can return to it.
    // Declares the setting, state value or DOM reference used by this module.
    var script = document.querySelector('script[src$="assets/js/consent.js"]'); // Finds this script tag to work out where the site root is.
    // Declares the setting, state value or DOM reference used by this module.
    var root = script ? script.getAttribute("src").replace("assets/js/consent.js", "") : ""; // Gives "" on the home page and "../" on other pages.

    // ---------- Saving and loading ----------
    function load() { // Reads the saved choices, if there are any.
        try { // Starts error handling in case storage is blocked.
            // Declares the setting, state value or DOM reference used by this module.
            var saved = JSON.parse(window.localStorage.getItem(KEY)); // Reads and parses the saved choices.
            // Checks the condition before executing the following branch.
            if (saved && saved.v === 1 && typeof saved.maps === "boolean" && Date.now() - saved.at < MAX_AGE) { // Checks the saved choices are valid and not older than 12 months.
                // Updates the module state used by the surrounding feature.
                state.maps = saved.maps; // Restores the maps choice.
                // Updates the module state used by the surrounding feature.
                state.decided = true; // Remembers that a choice was made.
            }
        } catch (e) { state.decided = false; } // Treats unreadable data as no choice.
    }

    // Defines a reusable operation or callback for this module.
    function save(maps) { // Stores a new choice and applies it.
        // Updates the module state used by the surrounding feature.
        state.maps = maps; // Updates the maps choice.
        // Updates the module state used by the surrounding feature.
        state.decided = true; // Remembers that a choice was made.
        // Uses a browser API to access the DOM, storage or timing facility.
        try { window.localStorage.setItem(KEY, JSON.stringify({ v: 1, maps: maps, at: Date.now() })); } catch (e) { state.decided = true; } // Saves the choice with the date, if storage is allowed.
        applyEmbeds(); // Shows or hides the embedded maps.
        hideBanner(); // Closes the banner.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.dispatchEvent(new CustomEvent("cc-consent-change", { detail: { maps: maps } })); // Tells other scripts that the choices changed.
    }

    // ---------- Embedded content ----------
    function applyEmbeds() { // Loads or blocks every embed that needs the maps choice.
        // Declares the setting, state value or DOM reference used by this module.
        var embeds = document.querySelectorAll("[data-consent-src]"); // Finds the embeds that wait for permission.
        Array.prototype.forEach.call(embeds, function (frame) { // Loops through each embed.
            // Declares the setting, state value or DOM reference used by this module.
            var holder = frame.parentNode.querySelector("[data-consent-placeholder]"); // Looks for an existing placeholder next to the embed.
            // Checks the condition before executing the following branch.
            if (state.maps) { // Checks whether maps are allowed.
                // Checks the condition before executing the following branch.
                if (!frame.getAttribute("src")) { frame.setAttribute("src", frame.getAttribute("data-consent-src")); } // Loads the embed.
                // Checks the condition before executing the following branch.
                if (holder) { holder.parentNode.removeChild(holder); } // Removes the placeholder.
                // Updates the module state used by the surrounding feature.
                frame.hidden = false; // Shows the embed.
            } else { // Maps are not allowed.
                // Updates the module state used by the surrounding feature.
                frame.hidden = true; // Hides the embed.
                // Checks the condition before executing the following branch.
                if (!holder) { frame.parentNode.insertBefore(makePlaceholder(), frame); } // Adds a placeholder with a button to allow maps.
            }
        });
    }

    // Defines a reusable operation or callback for this module.
    function makePlaceholder() { // Builds the message shown instead of a blocked map.
        // Declares the setting, state value or DOM reference used by this module.
        var box = document.createElement("div"); // Creates the placeholder box.
        // Updates the module state used by the surrounding feature.
        box.className = "consent-placeholder"; // Gives it the styling class.
        box.setAttribute("data-consent-placeholder", ""); // Marks it so it can be found again.
        // Declares the setting, state value or DOM reference used by this module.
        var text = document.createElement("p"); // Creates the message.
        // Updates the selected element's content or visual presentation.
        text.textContent = "This map comes from Google Maps. Loading it shares your IP address with Google and may set cookies, so it stays off until you allow it."; // Explains why the map is blocked.
        // Declares the setting, state value or DOM reference used by this module.
        var button = document.createElement("button"); // Creates the button.
        // Updates the module state used by the surrounding feature.
        button.type = "button"; // Makes it a plain button.
        // Updates the module state used by the surrounding feature.
        button.className = "btn btn-sm"; // Gives it the button styling.
        // Updates the selected element's content or visual presentation.
        button.textContent = "Allow maps and show the map"; // Sets the label.
        // Registers an event handler for the specified browser or user interaction.
        button.addEventListener("click", function () { save(true); }); // Saves the choice when the button is pressed.
        box.appendChild(text); // Adds the message to the box.
        box.appendChild(button); // Adds the button to the box.
        // Returns the result or exits the current function path.
        return box; // Returns the finished placeholder.
    }

    // ---------- Banner ----------
    function make(tag, className, text) { // Small helper that creates an element.
        // Declares the setting, state value or DOM reference used by this module.
        var node = document.createElement(tag); // Creates the element.
        // Checks the condition before executing the following branch.
        if (className) { node.className = className; } // Adds the class when one is given.
        // Checks the condition before executing the following branch.
        if (text) { node.textContent = text; } // Adds the text when some is given.
        // Returns the result or exits the current function path.
        return node; // Returns the new element.
    }

    // Defines a reusable operation or callback for this module.
    function makeButton(label, className, onClick) { // Small helper that creates a button.
        // Declares the setting, state value or DOM reference used by this module.
        var button = make("button", className, label); // Creates the button with its label.
        // Updates the module state used by the surrounding feature.
        button.type = "button"; // Makes it a plain button.
        // Registers an event handler for the specified browser or user interaction.
        button.addEventListener("click", onClick); // Runs the given function when it is pressed.
        // Returns the result or exits the current function path.
        return button; // Returns the new button.
    }

    // Defines a reusable operation or callback for this module.
    function buildBanner() { // Creates the banner the first time it is needed.
        // Updates the module state used by the surrounding feature.
        banner = make("section", "cookie-banner"); // Creates the banner container.
        // Updates the module state used by the surrounding feature.
        banner.id = "cookie-banner"; // Gives it an ID.
        banner.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        banner.setAttribute("aria-modal", "false"); // Says the rest of the page can still be used.
        banner.setAttribute("aria-labelledby", "cookie-title"); // Links the dialog to its title.
        // Updates the module state used by the surrounding feature.
        banner.hidden = true; // Keeps it hidden until it is opened.

        // Declares the setting, state value or DOM reference used by this module.
        var title = make("h2", "cookie-title", "Your privacy choices"); // Creates the title.
        // Updates the module state used by the surrounding feature.
        title.id = "cookie-title"; // Gives the title an ID that the dialog refers to.
        // Declares the setting, state value or DOM reference used by this module.
        var intro = make("p", "", "Campus-Cart only stores what it needs to work, such as your order summary. Embedded maps come from Google and OpenStreetMap and can see your IP address, so they stay off until you allow them. We do not use advertising or analytics cookies."); // Creates the explanation.
        // Declares the setting, state value or DOM reference used by this module.
        var links = make("p", "cookie-links"); // Creates the line for the policy links.
        // Declares the setting, state value or DOM reference used by this module.
        var cookieLink = make("a", "", "Cookie Policy"); // Creates the Cookie Policy link.
        // Updates the module state used by the surrounding feature.
        cookieLink.href = root + "pages/cookies.html"; // Points it to the Cookie Policy page.
        // Declares the setting, state value or DOM reference used by this module.
        var privacyLink = make("a", "", "Privacy Policy"); // Creates the Privacy Policy link.
        // Updates the module state used by the surrounding feature.
        privacyLink.href = root + "pages/privacy.html"; // Points it to the Privacy Policy page.
        links.appendChild(cookieLink); // Adds the Cookie Policy link.
        // Uses a browser API to access the DOM, storage or timing facility.
        links.appendChild(document.createTextNode(" | ")); // Adds a separator.
        links.appendChild(privacyLink); // Adds the Privacy Policy link.

        // Declares the setting, state value or DOM reference used by this module.
        var summary = make("div", "cookie-actions"); // Creates the row of main buttons.
        // Updates the module state used by the surrounding feature.
        summary.id = "cookie-summary"; // Gives it an ID so it can be shown and hidden.
        summary.appendChild(makeButton("Accept all", "btn", function () { save(true); })); // Adds the button that allows maps.
        summary.appendChild(makeButton("Essential only", "btn btn-ghost-light", function () { save(false); })); // Adds the button that keeps maps off.
        summary.appendChild(makeButton("Choose settings", "btn btn-ghost-light", function () { showSettings(); })); // Adds the button that opens the settings.

        // Declares the setting, state value or DOM reference used by this module.
        var settings = make("div", "cookie-settings"); // Creates the settings area.
        // Updates the module state used by the surrounding feature.
        settings.id = "cookie-settings"; // Gives it an ID so it can be shown and hidden.
        // Updates the module state used by the surrounding feature.
        settings.hidden = true; // Keeps it hidden until the visitor chooses settings.
        // Declares the setting, state value or DOM reference used by this module.
        var fieldset = make("fieldset", "cookie-options"); // Groups the options.
        // Declares the setting, state value or DOM reference used by this module.
        var legend = make("legend", "", "Choose what we may use"); // Names the group.
        fieldset.appendChild(legend); // Adds the group name.
        fieldset.appendChild(makeOption("cookie-essential", "Essential storage (always on)", "Keeps your order summary for this visit and remembers these choices. The website cannot work without it.", true, true)); // Adds the always-on option.
        fieldset.appendChild(makeOption("cookie-maps", "Embedded maps", "Google Maps and OpenStreetMap map tiles. These providers receive your IP address and Google may set cookies. Turning this off takes full effect when you reload the page.", false, false)); // Adds the optional maps choice.
        // Declares the setting, state value or DOM reference used by this module.
        var actions = make("div", "cookie-actions"); // Creates the row of settings buttons.
        // Uses a browser API to access the DOM, storage or timing facility.
        actions.appendChild(makeButton("Save choices", "btn", function () { save(document.getElementById("cookie-maps").checked); })); // Saves what the visitor ticked.
        actions.appendChild(makeButton("Back", "btn btn-ghost-light", function () { cancelSettings(); })); // Goes back without saving.
        settings.appendChild(fieldset); // Adds the options to the settings area.
        settings.appendChild(actions); // Adds the buttons to the settings area.

        banner.appendChild(title); // Adds the title.
        banner.appendChild(intro); // Adds the explanation.
        banner.appendChild(links); // Adds the policy links.
        banner.appendChild(summary); // Adds the main buttons.
        banner.appendChild(settings); // Adds the settings area.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.body.insertBefore(banner, document.body.firstChild); // Puts the banner first on the page so keyboard users reach it early.
    }

    // Defines a reusable operation or callback for this module.
    function makeOption(id, label, help, checked, locked) { // Builds one tick box with its explanation.
        // Declares the setting, state value or DOM reference used by this module.
        var wrap = make("div", "cookie-option"); // Creates the row.
        // Declares the setting, state value or DOM reference used by this module.
        var input = make("input"); // Creates the tick box.
        // Updates the module state used by the surrounding feature.
        input.type = "checkbox"; // Makes it a checkbox.
        // Updates the module state used by the surrounding feature.
        input.id = id; // Gives it an ID.
        // Updates the module state used by the surrounding feature.
        input.checked = checked; // Sets the starting state.
        // Updates the module state used by the surrounding feature.
        input.disabled = locked; // Locks it when it cannot be switched off.
        // Declares the setting, state value or DOM reference used by this module.
        var text = make("label", ""); // Creates the label.
        text.setAttribute("for", id); // Links the label to the tick box.
        // Declares the setting, state value or DOM reference used by this module.
        var strong = make("strong", "", label); // Creates the bold option name.
        // Declares the setting, state value or DOM reference used by this module.
        var small = make("span", "cookie-help", help); // Creates the explanation.
        text.appendChild(strong); // Adds the name to the label.
        text.appendChild(small); // Adds the explanation to the label.
        wrap.appendChild(input); // Adds the tick box to the row.
        wrap.appendChild(text); // Adds the label to the row.
        // Returns the result or exits the current function path.
        return wrap; // Returns the finished row.
    }

    // Defines a reusable operation or callback for this module.
    function showBanner() { // Opens the banner on its first screen.
        // Checks the condition before executing the following branch.
        if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.getElementById("cookie-summary").hidden = false; // Shows the main buttons.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.getElementById("cookie-settings").hidden = true; // Hides the settings area.
        // Updates the module state used by the surrounding feature.
        banner.hidden = false; // Shows the banner.
    }

    // Defines a reusable operation or callback for this module.
    function showSettings() { // Opens the banner on the settings screen.
        // Checks the condition before executing the following branch.
        if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.getElementById("cookie-maps").checked = state.maps; // Shows the saved maps choice.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.getElementById("cookie-summary").hidden = true; // Hides the main buttons.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.getElementById("cookie-settings").hidden = false; // Shows the settings area.
        // Updates the module state used by the surrounding feature.
        banner.hidden = false; // Shows the banner.
        // Uses a browser API to access the DOM, storage or timing facility.
        document.getElementById("cookie-maps").focus(); // Moves focus to the first choice.
    }

    // Defines a reusable operation or callback for this module.
    function cancelSettings() { // Leaves the settings without saving.
        // Checks the condition before executing the following branch.
        if (state.decided) { hideBanner(); } else { showBanner(); } // Closes the banner if a choice already exists, otherwise goes back to the first screen.
    }

    // Defines a reusable operation or callback for this module.
    function hideBanner() { // Closes the banner.
        // Checks the condition before executing the following branch.
        if (banner) { banner.hidden = true; } // Hides it when it exists.
        // Checks the condition before executing the following branch.
        if (opener) { opener.focus(); opener = null; } // Returns focus to the button that opened it.
    }

    // ---------- Public use ----------
    window.CCConsent = { // Shares a few functions with the other scripts.
        allowed: function (category) { return category === "essential" || (category === "maps" && state.maps); }, // Tells whether a category is allowed.
        grant: function (category) { if (category === "maps") { save(true); } }, // Lets other scripts record that the visitor allowed a category.
        open: function () { showSettings(); } // Opens the settings from other scripts.
    };

    // ---------- Start ----------
    function start() { // Runs once the page is ready.
        load(); // Reads the saved choices.
        // The footer "Cookie settings" links on the pages are plain links, so mark them here
        // instead of editing every page. Clicking one opens the settings panel.
        Array.prototype.forEach.call(document.querySelectorAll("a"), function (a) {
            // Checks the condition before executing the following branch.
            if (/^\s*Cookie settings\s*$/i.test(a.textContent)) { a.setAttribute("data-cookie-settings", ""); }
        });
        applyEmbeds(); // Loads or blocks the embedded maps.
        // Checks the condition before executing the following branch.
        if (!state.decided) { showBanner(); } // Shows the banner when no choice has been made.
        // Registers an event handler for the specified browser or user interaction.
        document.addEventListener("click", function (e) { // Listens for clicks on the Cookie settings links.
            // Declares the setting, state value or DOM reference used by this module.
            var link = e.target.closest ? e.target.closest("[data-cookie-settings]") : null; // Finds a Cookie settings link, if one was clicked.
            // Checks the condition before executing the following branch.
            if (!link) { return; } // Ignores every other click.
            e.preventDefault(); // Stops a link from jumping to the top of the page.
            // Updates the module state used by the surrounding feature.
            opener = link; // Remembers it so focus can return later.
            showSettings(); // Opens the settings.
        });
        // Registers an event handler for the specified browser or user interaction.
        document.addEventListener("keydown", function (e) { // Listens for the Escape key.
            // Checks the condition before executing the following branch.
            if (e.key === "Escape" && banner && !banner.hidden && state.decided) { cancelSettings(); } // Closes the settings with Escape once a choice exists.
        });
    }

    // Checks the condition before executing the following branch.
    if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", start); } else { start(); } // Starts now or when the page finishes loading.
})();

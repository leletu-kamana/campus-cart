// ==========================================================
// CAMPUS-CART
// Cookie and privacy choices
// Shows the consent banner, remembers the visitor's choices and
// keeps third-party maps switched off until the visitor allows them.
// Plain JavaScript, no libraries.
// ==========================================================
// INLINE COMMENTING GUIDE: The comments below describe the purpose of the main logic blocks, state changes, DOM operations and event handling.

// JavaScript statement/expression: (function () { // Wraps the code in a function so its variables stay private.
(function () { // Wraps the code in a function so its variables stay private.
    // JavaScript statement/expression: "use strict"; // Turns on stricter error checking.
    "use strict"; // Turns on stricter error checking.

    // ---------- Settings ----------
    // JavaScript statement/expression: var KEY = "cc_consent"; // Name used to save the choices in the browser.
    var KEY = "cc_consent"; // Name used to save the choices in the browser.
    // JavaScript statement/expression: var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // The choices are asked for again after 12 months.
    var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // The choices are asked for again after 12 months.
    // JavaScript statement/expression: var state = { maps: false, decided: false }; // Current choices: embedded maps off, nothing decided yet.
    var state = { maps: false, decided: false }; // Current choices: embedded maps off, nothing decided yet.
    // JavaScript statement/expression: var banner = null; // The banner element, created the first time it is needed.
    var banner = null; // The banner element, created the first time it is needed.
    // JavaScript statement/expression: var opener = null; // The button that opened the settings, so focus can return to it.
    var opener = null; // The button that opened the settings, so focus can return to it.
    // JavaScript statement/expression: var script = document.querySelector('script[src$="assets/js/consent.js"]'); // Finds this script tag to work o
    var script = document.querySelector('script[src$="assets/js/consent.js"]'); // Finds this script tag to work out where the site root is.
    // JavaScript statement/expression: var root = script ? script.getAttribute("src").replace("assets/js/consent.js", "") : ""; // Gives "" on the ho
    var root = script ? script.getAttribute("src").replace("assets/js/consent.js", "") : ""; // Gives "" on the home page and "../" on other pages.

    // ---------- Saving and loading ----------
    // JavaScript statement/expression: function load() { // Reads the saved choices, if there are any.
    function load() { // Reads the saved choices, if there are any.
        // JavaScript statement/expression: try { // Starts error handling in case storage is blocked.
        try { // Starts error handling in case storage is blocked.
            // JavaScript statement/expression: var saved = JSON.parse(window.localStorage.getItem(KEY)); // Reads and parses the saved choices.
            var saved = JSON.parse(window.localStorage.getItem(KEY)); // Reads and parses the saved choices.
            // JavaScript statement/expression: if (saved && saved.v === 1 && typeof saved.maps === "boolean" && Date.now() - saved.at < MAX_AGE) { // Checks 
            if (saved && saved.v === 1 && typeof saved.maps === "boolean" && Date.now() - saved.at < MAX_AGE) { // Checks the saved choices are valid and not older than 12 months.
                // JavaScript statement/expression: state.maps = saved.maps; // Restores the maps choice.
                state.maps = saved.maps; // Restores the maps choice.
                // JavaScript statement/expression: state.decided = true; // Remembers that a choice was made.
                state.decided = true; // Remembers that a choice was made.
            // JavaScript statement/expression: }
            }
        // JavaScript statement/expression: } catch (e) { state.decided = false; } // Treats unreadable data as no choice.
        } catch (e) { state.decided = false; } // Treats unreadable data as no choice.
    // JavaScript statement/expression: }
    }

    // save: performs the save operation for the related page feature.

    // JavaScript statement/expression: function save(maps) { // Stores a new choice and applies it.
    function save(maps) { // Stores a new choice and applies it.
        // JavaScript statement/expression: state.maps = maps; // Updates the maps choice.
        state.maps = maps; // Updates the maps choice.
        // JavaScript statement/expression: state.decided = true; // Remembers that a choice was made.
        state.decided = true; // Remembers that a choice was made.
        // JavaScript statement/expression: try { window.localStorage.setItem(KEY, JSON.stringify({ v: 1, maps: maps, at: Date.now() })); } catch (e) { st
        try { window.localStorage.setItem(KEY, JSON.stringify({ v: 1, maps: maps, at: Date.now() })); } catch (e) { state.decided = true; } // Saves the choice with the date, if storage is allowed.
        // JavaScript statement/expression: applyEmbeds(); // Shows or hides the embedded maps.
        applyEmbeds(); // Shows or hides the embedded maps.
        // JavaScript statement/expression: hideBanner(); // Closes the banner.
        hideBanner(); // Closes the banner.
        // JavaScript statement/expression: document.dispatchEvent(new CustomEvent("cc-consent-change", { detail: { maps: maps } })); // Tells other scrip
        document.dispatchEvent(new CustomEvent("cc-consent-change", { detail: { maps: maps } })); // Tells other scripts that the choices changed.
    // JavaScript statement/expression: }
    }

    // ---------- Embedded content ----------
    // JavaScript statement/expression: function applyEmbeds() { // Loads or blocks every embed that needs the maps choice.
    function applyEmbeds() { // Loads or blocks every embed that needs the maps choice.
        // JavaScript statement/expression: var embeds = document.querySelectorAll("[data-consent-src]"); // Finds the embeds that wait for permission.
        var embeds = document.querySelectorAll("[data-consent-src]"); // Finds the embeds that wait for permission.
        // JavaScript statement/expression: Array.prototype.forEach.call(embeds, function (frame) { // Loops through each embed.
        Array.prototype.forEach.call(embeds, function (frame) { // Loops through each embed.
            // JavaScript statement/expression: var holder = frame.parentNode.querySelector("[data-consent-placeholder]"); // Looks for an existing placeholde
            var holder = frame.parentNode.querySelector("[data-consent-placeholder]"); // Looks for an existing placeholder next to the embed.
            // JavaScript statement/expression: if (state.maps) { // Checks whether maps are allowed.
            if (state.maps) { // Checks whether maps are allowed.
                // JavaScript statement/expression: if (!frame.getAttribute("src")) { frame.setAttribute("src", frame.getAttribute("data-consent-src")); } // Load
                if (!frame.getAttribute("src")) { frame.setAttribute("src", frame.getAttribute("data-consent-src")); } // Loads the embed.
                // JavaScript statement/expression: if (holder) { holder.parentNode.removeChild(holder); } // Removes the placeholder.
                if (holder) { holder.parentNode.removeChild(holder); } // Removes the placeholder.
                // JavaScript statement/expression: frame.hidden = false; // Shows the embed.
                frame.hidden = false; // Shows the embed.
            // JavaScript statement/expression: } else { // Maps are not allowed.
            } else { // Maps are not allowed.
                // JavaScript statement/expression: frame.hidden = true; // Hides the embed.
                frame.hidden = true; // Hides the embed.
                // JavaScript statement/expression: if (!holder) { frame.parentNode.insertBefore(makePlaceholder(), frame); } // Adds a placeholder with a button 
                if (!holder) { frame.parentNode.insertBefore(makePlaceholder(), frame); } // Adds a placeholder with a button to allow maps.
            // JavaScript statement/expression: }
            }
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: }
    }

    // makePlaceholder: performs the make placeholder operation for the related page feature.

    // JavaScript statement/expression: function makePlaceholder() { // Builds the message shown instead of a blocked map.
    function makePlaceholder() { // Builds the message shown instead of a blocked map.
        // JavaScript statement/expression: var box = document.createElement("div"); // Creates the placeholder box.
        var box = document.createElement("div"); // Creates the placeholder box.
        // JavaScript statement/expression: box.className = "consent-placeholder"; // Gives it the styling class.
        box.className = "consent-placeholder"; // Gives it the styling class.
        // JavaScript statement/expression: box.setAttribute("data-consent-placeholder", ""); // Marks it so it can be found again.
        box.setAttribute("data-consent-placeholder", ""); // Marks it so it can be found again.
        // JavaScript statement/expression: var text = document.createElement("p"); // Creates the message.
        var text = document.createElement("p"); // Creates the message.
        // JavaScript statement/expression: text.textContent = "This map comes from Google Maps. Loading it shares your IP address with Google and may set
        text.textContent = "This map comes from Google Maps. Loading it shares your IP address with Google and may set cookies, so it stays off until you allow it."; // Explains why the map is blocked.
        // JavaScript statement/expression: var button = document.createElement("button"); // Creates the button.
        var button = document.createElement("button"); // Creates the button.
        // JavaScript statement/expression: button.type = "button"; // Makes it a plain button.
        button.type = "button"; // Makes it a plain button.
        // JavaScript statement/expression: button.className = "btn btn-sm"; // Gives it the button styling.
        button.className = "btn btn-sm"; // Gives it the button styling.
        // JavaScript statement/expression: button.textContent = "Allow maps and show the map"; // Sets the label.
        button.textContent = "Allow maps and show the map"; // Sets the label.
        // JavaScript statement/expression: button.addEventListener("click", function () { save(true); }); // Saves the choice when the button is pressed.
        button.addEventListener("click", function () { save(true); }); // Saves the choice when the button is pressed.
        // JavaScript statement/expression: box.appendChild(text); // Adds the message to the box.
        box.appendChild(text); // Adds the message to the box.
        // JavaScript statement/expression: box.appendChild(button); // Adds the button to the box.
        box.appendChild(button); // Adds the button to the box.
        // JavaScript statement/expression: return box; // Returns the finished placeholder.
        return box; // Returns the finished placeholder.
    // JavaScript statement/expression: }
    }

    // ---------- Banner ----------
    // JavaScript statement/expression: function make(tag, className, text) { // Small helper that creates an element.
    function make(tag, className, text) { // Small helper that creates an element.
        // JavaScript statement/expression: var node = document.createElement(tag); // Creates the element.
        var node = document.createElement(tag); // Creates the element.
        // JavaScript statement/expression: if (className) { node.className = className; } // Adds the class when one is given.
        if (className) { node.className = className; } // Adds the class when one is given.
        // JavaScript statement/expression: if (text) { node.textContent = text; } // Adds the text when some is given.
        if (text) { node.textContent = text; } // Adds the text when some is given.
        // JavaScript statement/expression: return node; // Returns the new element.
        return node; // Returns the new element.
    // JavaScript statement/expression: }
    }

    // makeButton: performs the make button operation for the related page feature.

    // JavaScript statement/expression: function makeButton(label, className, onClick) { // Small helper that creates a button.
    function makeButton(label, className, onClick) { // Small helper that creates a button.
        // JavaScript statement/expression: var button = make("button", className, label); // Creates the button with its label.
        var button = make("button", className, label); // Creates the button with its label.
        // JavaScript statement/expression: button.type = "button"; // Makes it a plain button.
        button.type = "button"; // Makes it a plain button.
        // JavaScript statement/expression: button.addEventListener("click", onClick); // Runs the given function when it is pressed.
        button.addEventListener("click", onClick); // Runs the given function when it is pressed.
        // JavaScript statement/expression: return button; // Returns the new button.
        return button; // Returns the new button.
    // JavaScript statement/expression: }
    }

    // buildBanner: performs the build banner operation for the related page feature.

    // JavaScript statement/expression: function buildBanner() { // Creates the banner the first time it is needed.
    function buildBanner() { // Creates the banner the first time it is needed.
        // JavaScript statement/expression: banner = make("section", "cookie-banner"); // Creates the banner container.
        banner = make("section", "cookie-banner"); // Creates the banner container.
        // JavaScript statement/expression: banner.id = "cookie-banner"; // Gives it an ID.
        banner.id = "cookie-banner"; // Gives it an ID.
        // JavaScript statement/expression: banner.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        banner.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        // JavaScript statement/expression: banner.setAttribute("aria-modal", "false"); // Says the rest of the page can still be used.
        banner.setAttribute("aria-modal", "false"); // Says the rest of the page can still be used.
        // JavaScript statement/expression: banner.setAttribute("aria-labelledby", "cookie-title"); // Links the dialog to its title.
        banner.setAttribute("aria-labelledby", "cookie-title"); // Links the dialog to its title.
        // JavaScript statement/expression: banner.hidden = true; // Keeps it hidden until it is opened.
        banner.hidden = true; // Keeps it hidden until it is opened.

        // JavaScript statement/expression: var title = make("h2", "cookie-title", "Your privacy choices"); // Creates the title.
        var title = make("h2", "cookie-title", "Your privacy choices"); // Creates the title.
        // JavaScript statement/expression: title.id = "cookie-title"; // Gives the title an ID that the dialog refers to.
        title.id = "cookie-title"; // Gives the title an ID that the dialog refers to.
        // JavaScript statement/expression: var intro = make("p", "", "Campus-Cart only stores what it needs to work, such as your order summary. Embedded
        var intro = make("p", "", "Campus-Cart only stores what it needs to work, such as your order summary. Embedded maps come from Google and OpenStreetMap and can see your IP address, so they stay off until you allow them. We do not use advertising or analytics cookies."); // Creates the explanation.
        // JavaScript statement/expression: var links = make("p", "cookie-links"); // Creates the line for the policy links.
        var links = make("p", "cookie-links"); // Creates the line for the policy links.
        // JavaScript statement/expression: var cookieLink = make("a", "", "Cookie Policy"); // Creates the Cookie Policy link.
        var cookieLink = make("a", "", "Cookie Policy"); // Creates the Cookie Policy link.
        // JavaScript statement/expression: cookieLink.href = root + "pages/cookies.html"; // Points it to the Cookie Policy page.
        cookieLink.href = root + "pages/cookies.html"; // Points it to the Cookie Policy page.
        // JavaScript statement/expression: var privacyLink = make("a", "", "Privacy Policy"); // Creates the Privacy Policy link.
        var privacyLink = make("a", "", "Privacy Policy"); // Creates the Privacy Policy link.
        // JavaScript statement/expression: privacyLink.href = root + "pages/privacy.html"; // Points it to the Privacy Policy page.
        privacyLink.href = root + "pages/privacy.html"; // Points it to the Privacy Policy page.
        // JavaScript statement/expression: links.appendChild(cookieLink); // Adds the Cookie Policy link.
        links.appendChild(cookieLink); // Adds the Cookie Policy link.
        // JavaScript statement/expression: links.appendChild(document.createTextNode(" | ")); // Adds a separator.
        links.appendChild(document.createTextNode(" | ")); // Adds a separator.
        // JavaScript statement/expression: links.appendChild(privacyLink); // Adds the Privacy Policy link.
        links.appendChild(privacyLink); // Adds the Privacy Policy link.

        // JavaScript statement/expression: var summary = make("div", "cookie-actions"); // Creates the row of main buttons.
        var summary = make("div", "cookie-actions"); // Creates the row of main buttons.
        // JavaScript statement/expression: summary.id = "cookie-summary"; // Gives it an ID so it can be shown and hidden.
        summary.id = "cookie-summary"; // Gives it an ID so it can be shown and hidden.
        // JavaScript statement/expression: summary.appendChild(makeButton("Accept all", "btn", function () { save(true); })); // Adds the button that all
        summary.appendChild(makeButton("Accept all", "btn", function () { save(true); })); // Adds the button that allows maps.
        // JavaScript statement/expression: summary.appendChild(makeButton("Essential only", "btn btn-ghost-light", function () { save(false); })); // Add
        summary.appendChild(makeButton("Essential only", "btn btn-ghost-light", function () { save(false); })); // Adds the button that keeps maps off.
        // JavaScript statement/expression: summary.appendChild(makeButton("Choose settings", "btn btn-ghost-light", function () { showSettings(); })); //
        summary.appendChild(makeButton("Choose settings", "btn btn-ghost-light", function () { showSettings(); })); // Adds the button that opens the settings.

        // JavaScript statement/expression: var settings = make("div", "cookie-settings"); // Creates the settings area.
        var settings = make("div", "cookie-settings"); // Creates the settings area.
        // JavaScript statement/expression: settings.id = "cookie-settings"; // Gives it an ID so it can be shown and hidden.
        settings.id = "cookie-settings"; // Gives it an ID so it can be shown and hidden.
        // JavaScript statement/expression: settings.hidden = true; // Keeps it hidden until the visitor chooses settings.
        settings.hidden = true; // Keeps it hidden until the visitor chooses settings.
        // JavaScript statement/expression: var fieldset = make("fieldset", "cookie-options"); // Groups the options.
        var fieldset = make("fieldset", "cookie-options"); // Groups the options.
        // JavaScript statement/expression: var legend = make("legend", "", "Choose what we may use"); // Names the group.
        var legend = make("legend", "", "Choose what we may use"); // Names the group.
        // JavaScript statement/expression: fieldset.appendChild(legend); // Adds the group name.
        fieldset.appendChild(legend); // Adds the group name.
        // JavaScript statement/expression: fieldset.appendChild(makeOption("cookie-essential", "Essential storage (always on)", "Keeps your order summary
        fieldset.appendChild(makeOption("cookie-essential", "Essential storage (always on)", "Keeps your order summary for this visit and remembers these choices. The website cannot work without it.", true, true)); // Adds the always-on option.
        // JavaScript statement/expression: fieldset.appendChild(makeOption("cookie-maps", "Embedded maps", "Google Maps and OpenStreetMap map tiles. Thes
        fieldset.appendChild(makeOption("cookie-maps", "Embedded maps", "Google Maps and OpenStreetMap map tiles. These providers receive your IP address and Google may set cookies. Turning this off takes full effect when you reload the page.", false, false)); // Adds the optional maps choice.
        // JavaScript statement/expression: var actions = make("div", "cookie-actions"); // Creates the row of settings buttons.
        var actions = make("div", "cookie-actions"); // Creates the row of settings buttons.
        // JavaScript statement/expression: actions.appendChild(makeButton("Save choices", "btn", function () { save(document.getElementById("cookie-maps"
        actions.appendChild(makeButton("Save choices", "btn", function () { save(document.getElementById("cookie-maps").checked); })); // Saves what the visitor ticked.
        // JavaScript statement/expression: actions.appendChild(makeButton("Back", "btn btn-ghost-light", function () { cancelSettings(); })); // Goes bac
        actions.appendChild(makeButton("Back", "btn btn-ghost-light", function () { cancelSettings(); })); // Goes back without saving.
        // JavaScript statement/expression: settings.appendChild(fieldset); // Adds the options to the settings area.
        settings.appendChild(fieldset); // Adds the options to the settings area.
        // JavaScript statement/expression: settings.appendChild(actions); // Adds the buttons to the settings area.
        settings.appendChild(actions); // Adds the buttons to the settings area.

        // JavaScript statement/expression: banner.appendChild(title); // Adds the title.
        banner.appendChild(title); // Adds the title.
        // JavaScript statement/expression: banner.appendChild(intro); // Adds the explanation.
        banner.appendChild(intro); // Adds the explanation.
        // JavaScript statement/expression: banner.appendChild(links); // Adds the policy links.
        banner.appendChild(links); // Adds the policy links.
        // JavaScript statement/expression: banner.appendChild(summary); // Adds the main buttons.
        banner.appendChild(summary); // Adds the main buttons.
        // JavaScript statement/expression: banner.appendChild(settings); // Adds the settings area.
        banner.appendChild(settings); // Adds the settings area.
        // JavaScript statement/expression: document.body.insertBefore(banner, document.body.firstChild); // Puts the banner first on the page so keyboard
        document.body.insertBefore(banner, document.body.firstChild); // Puts the banner first on the page so keyboard users reach it early.
    // JavaScript statement/expression: }
    }

    // makeOption: performs the make option operation for the related page feature.

    // JavaScript statement/expression: function makeOption(id, label, help, checked, locked) { // Builds one tick box with its explanation.
    function makeOption(id, label, help, checked, locked) { // Builds one tick box with its explanation.
        // JavaScript statement/expression: var wrap = make("div", "cookie-option"); // Creates the row.
        var wrap = make("div", "cookie-option"); // Creates the row.
        // JavaScript statement/expression: var input = make("input"); // Creates the tick box.
        var input = make("input"); // Creates the tick box.
        // JavaScript statement/expression: input.type = "checkbox"; // Makes it a checkbox.
        input.type = "checkbox"; // Makes it a checkbox.
        // JavaScript statement/expression: input.id = id; // Gives it an ID.
        input.id = id; // Gives it an ID.
        // JavaScript statement/expression: input.checked = checked; // Sets the starting state.
        input.checked = checked; // Sets the starting state.
        // JavaScript statement/expression: input.disabled = locked; // Locks it when it cannot be switched off.
        input.disabled = locked; // Locks it when it cannot be switched off.
        // JavaScript statement/expression: var text = make("label", ""); // Creates the label.
        var text = make("label", ""); // Creates the label.
        // JavaScript statement/expression: text.setAttribute("for", id); // Links the label to the tick box.
        text.setAttribute("for", id); // Links the label to the tick box.
        // JavaScript statement/expression: var strong = make("strong", "", label); // Creates the bold option name.
        var strong = make("strong", "", label); // Creates the bold option name.
        // JavaScript statement/expression: var small = make("span", "cookie-help", help); // Creates the explanation.
        var small = make("span", "cookie-help", help); // Creates the explanation.
        // JavaScript statement/expression: text.appendChild(strong); // Adds the name to the label.
        text.appendChild(strong); // Adds the name to the label.
        // JavaScript statement/expression: text.appendChild(small); // Adds the explanation to the label.
        text.appendChild(small); // Adds the explanation to the label.
        // JavaScript statement/expression: wrap.appendChild(input); // Adds the tick box to the row.
        wrap.appendChild(input); // Adds the tick box to the row.
        // JavaScript statement/expression: wrap.appendChild(text); // Adds the label to the row.
        wrap.appendChild(text); // Adds the label to the row.
        // JavaScript statement/expression: return wrap; // Returns the finished row.
        return wrap; // Returns the finished row.
    // JavaScript statement/expression: }
    }

    // showBanner: performs the show banner operation for the related page feature.

    // JavaScript statement/expression: function showBanner() { // Opens the banner on its first screen.
    function showBanner() { // Opens the banner on its first screen.
        // JavaScript statement/expression: if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        // JavaScript statement/expression: document.getElementById("cookie-summary").hidden = false; // Shows the main buttons.
        document.getElementById("cookie-summary").hidden = false; // Shows the main buttons.
        // JavaScript statement/expression: document.getElementById("cookie-settings").hidden = true; // Hides the settings area.
        document.getElementById("cookie-settings").hidden = true; // Hides the settings area.
        // JavaScript statement/expression: banner.hidden = false; // Shows the banner.
        banner.hidden = false; // Shows the banner.
    // JavaScript statement/expression: }
    }

    // showSettings: performs the show settings operation for the related page feature.

    // JavaScript statement/expression: function showSettings() { // Opens the banner on the settings screen.
    function showSettings() { // Opens the banner on the settings screen.
        // JavaScript statement/expression: if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        // JavaScript statement/expression: document.getElementById("cookie-maps").checked = state.maps; // Shows the saved maps choice.
        document.getElementById("cookie-maps").checked = state.maps; // Shows the saved maps choice.
        // JavaScript statement/expression: document.getElementById("cookie-summary").hidden = true; // Hides the main buttons.
        document.getElementById("cookie-summary").hidden = true; // Hides the main buttons.
        // JavaScript statement/expression: document.getElementById("cookie-settings").hidden = false; // Shows the settings area.
        document.getElementById("cookie-settings").hidden = false; // Shows the settings area.
        // JavaScript statement/expression: banner.hidden = false; // Shows the banner.
        banner.hidden = false; // Shows the banner.
        // JavaScript statement/expression: document.getElementById("cookie-maps").focus(); // Moves focus to the first choice.
        document.getElementById("cookie-maps").focus(); // Moves focus to the first choice.
    // JavaScript statement/expression: }
    }

    // cancelSettings: performs the cancel settings operation for the related page feature.

    // JavaScript statement/expression: function cancelSettings() { // Leaves the settings without saving.
    function cancelSettings() { // Leaves the settings without saving.
        // JavaScript statement/expression: if (state.decided) { hideBanner(); } else { showBanner(); } // Closes the banner if a choice already exists, o
        if (state.decided) { hideBanner(); } else { showBanner(); } // Closes the banner if a choice already exists, otherwise goes back to the first screen.
    // JavaScript statement/expression: }
    }

    // hideBanner: performs the hide banner operation for the related page feature.

    // JavaScript statement/expression: function hideBanner() { // Closes the banner.
    function hideBanner() { // Closes the banner.
        // JavaScript statement/expression: if (banner) { banner.hidden = true; } // Hides it when it exists.
        if (banner) { banner.hidden = true; } // Hides it when it exists.
        // JavaScript statement/expression: if (opener) { opener.focus(); opener = null; } // Returns focus to the button that opened it.
        if (opener) { opener.focus(); opener = null; } // Returns focus to the button that opened it.
    // JavaScript statement/expression: }
    }

    // ---------- Public use ----------
    // JavaScript statement/expression: window.CCConsent = { // Shares a few functions with the other scripts.
    window.CCConsent = { // Shares a few functions with the other scripts.
        // JavaScript statement/expression: allowed: function (category) { return category === "essential" || (category === "maps" && state.maps); }, // T
        allowed: function (category) { return category === "essential" || (category === "maps" && state.maps); }, // Tells whether a category is allowed.
        // JavaScript statement/expression: grant: function (category) { if (category === "maps") { save(true); } }, // Lets other scripts record that the
        grant: function (category) { if (category === "maps") { save(true); } }, // Lets other scripts record that the visitor allowed a category.
        // JavaScript statement/expression: open: function () { showSettings(); } // Opens the settings from other scripts.
        open: function () { showSettings(); } // Opens the settings from other scripts.
    // JavaScript statement/expression: };
    };

    // ---------- Start ----------
    // JavaScript statement/expression: function start() { // Runs once the page is ready.
    function start() { // Runs once the page is ready.
        // JavaScript statement/expression: load(); // Reads the saved choices.
        load(); // Reads the saved choices.
        // The footer "Cookie settings" links on the pages are plain links, so mark them here
        // instead of editing every page. Clicking one opens the settings panel.
        // JavaScript statement/expression: Array.prototype.forEach.call(document.querySelectorAll("a"), function (a) {
        Array.prototype.forEach.call(document.querySelectorAll("a"), function (a) {
            // JavaScript statement/expression: if (/^\s*Cookie settings\s*$/i.test(a.textContent)) { a.setAttribute("data-cookie-settings", ""); }
            if (/^\s*Cookie settings\s*$/i.test(a.textContent)) { a.setAttribute("data-cookie-settings", ""); }
        // JavaScript statement/expression: });
        });
        // JavaScript statement/expression: applyEmbeds(); // Loads or blocks the embedded maps.
        applyEmbeds(); // Loads or blocks the embedded maps.
        // JavaScript statement/expression: if (!state.decided) { showBanner(); } // Shows the banner when no choice has been made.
        if (!state.decided) { showBanner(); } // Shows the banner when no choice has been made.
        // JavaScript statement/expression: document.addEventListener("click", function (e) { // Listens for clicks on the Cookie settings links.
        document.addEventListener("click", function (e) { // Listens for clicks on the Cookie settings links.
            // JavaScript statement/expression: var link = e.target.closest ? e.target.closest("[data-cookie-settings]") : null; // Finds a Cookie settings li
            var link = e.target.closest ? e.target.closest("[data-cookie-settings]") : null; // Finds a Cookie settings link, if one was clicked.
            // JavaScript statement/expression: if (!link) { return; } // Ignores every other click.
            if (!link) { return; } // Ignores every other click.
            // JavaScript statement/expression: e.preventDefault(); // Stops a link from jumping to the top of the page.
            e.preventDefault(); // Stops a link from jumping to the top of the page.
            // JavaScript statement/expression: opener = link; // Remembers it so focus can return later.
            opener = link; // Remembers it so focus can return later.
            // JavaScript statement/expression: showSettings(); // Opens the settings.
            showSettings(); // Opens the settings.
        // JavaScript statement/expression: });
        });
        // JavaScript statement/expression: document.addEventListener("keydown", function (e) { // Listens for the Escape key.
        document.addEventListener("keydown", function (e) { // Listens for the Escape key.
            // JavaScript statement/expression: if (e.key === "Escape" && banner && !banner.hidden && state.decided) { cancelSettings(); } // Closes the setti
            if (e.key === "Escape" && banner && !banner.hidden && state.decided) { cancelSettings(); } // Closes the settings with Escape once a choice exists.
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: }
    }

    // JavaScript statement/expression: if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", start); } else { start(
    if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", start); } else { start(); } // Starts now or when the page finishes loading.
// JavaScript statement/expression: })();
})();

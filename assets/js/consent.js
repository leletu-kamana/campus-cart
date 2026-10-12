// ==========================================================
// CAMPUS-CART
// Cookie and privacy choices
// Shows the consent banner, remembers the visitor's choices and
// keeps third-party maps switched off until the visitor allows them.
// Plain JavaScript, no libraries.
// ==========================================================

(function () { // Wraps the code in a function so its variables stay private.
    "use strict"; // Turns on stricter error checking.

    // ---------- Settings ----------
    var KEY = "cc_consent"; // Name used to save the choices in the browser.
    var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // The choices are asked for again after 12 months.
    var state = { maps: false, decided: false }; // Current choices: embedded maps off, nothing decided yet.
    var banner = null; // The banner element, created the first time it is needed.
    var opener = null; // The button that opened the settings, so focus can return to it.
    var script = document.querySelector('script[src$="assets/js/consent.js"]'); // Finds this script tag to work out where the site root is.
    var root = script ? script.getAttribute("src").replace("assets/js/consent.js", "") : ""; // Gives "" on the home page and "../" on other pages.

    // ---------- Saving and loading ----------
    function load() { // Reads the saved choices, if there are any.
        try { // Starts error handling in case storage is blocked.
            var saved = JSON.parse(window.localStorage.getItem(KEY)); // Reads and parses the saved choices.
            if (saved && saved.v === 1 && typeof saved.maps === "boolean" && Date.now() - saved.at < MAX_AGE) { // Checks the saved choices are valid and not older than 12 months.
                state.maps = saved.maps; // Restores the maps choice.
                state.decided = true; // Remembers that a choice was made.
            }
        } catch (e) { state.decided = false; } // Treats unreadable data as no choice.
    }

    function save(maps) { // Stores a new choice and applies it.
        state.maps = maps; // Updates the maps choice.
        state.decided = true; // Remembers that a choice was made.
        try { window.localStorage.setItem(KEY, JSON.stringify({ v: 1, maps: maps, at: Date.now() })); } catch (e) { state.decided = true; } // Saves the choice with the date, if storage is allowed.
        applyEmbeds(); // Shows or hides the embedded maps.
        hideBanner(); // Closes the banner.
        document.dispatchEvent(new CustomEvent("cc-consent-change", { detail: { maps: maps } })); // Tells other scripts that the choices changed.
    }

    // ---------- Embedded content ----------
    function applyEmbeds() { // Loads or blocks every embed that needs the maps choice.
        var embeds = document.querySelectorAll("[data-consent-src]"); // Finds the embeds that wait for permission.
        Array.prototype.forEach.call(embeds, function (frame) { // Loops through each embed.
            var holder = frame.parentNode.querySelector("[data-consent-placeholder]"); // Looks for an existing placeholder next to the embed.
            if (state.maps) { // Checks whether maps are allowed.
                if (!frame.getAttribute("src")) { frame.setAttribute("src", frame.getAttribute("data-consent-src")); } // Loads the embed.
                if (holder) { holder.parentNode.removeChild(holder); } // Removes the placeholder.
                frame.hidden = false; // Shows the embed.
            } else { // Maps are not allowed.
                frame.hidden = true; // Hides the embed.
                if (!holder) { frame.parentNode.insertBefore(makePlaceholder(), frame); } // Adds a placeholder with a button to allow maps.
            }
        });
    }

    function makePlaceholder() { // Builds the message shown instead of a blocked map.
        var box = document.createElement("div"); // Creates the placeholder box.
        box.className = "consent-placeholder"; // Gives it the styling class.
        box.setAttribute("data-consent-placeholder", ""); // Marks it so it can be found again.
        var text = document.createElement("p"); // Creates the message.
        text.textContent = "This map comes from Google Maps. Loading it shares your IP address with Google and may set cookies, so it stays off until you allow it."; // Explains why the map is blocked.
        var button = document.createElement("button"); // Creates the button.
        button.type = "button"; // Makes it a plain button.
        button.className = "btn btn-sm"; // Gives it the button styling.
        button.textContent = "Allow maps and show the map"; // Sets the label.
        button.addEventListener("click", function () { save(true); }); // Saves the choice when the button is pressed.
        box.appendChild(text); // Adds the message to the box.
        box.appendChild(button); // Adds the button to the box.
        return box; // Returns the finished placeholder.
    }

    // ---------- Banner ----------
    function make(tag, className, text) { // Small helper that creates an element.
        var node = document.createElement(tag); // Creates the element.
        if (className) { node.className = className; } // Adds the class when one is given.
        if (text) { node.textContent = text; } // Adds the text when some is given.
        return node; // Returns the new element.
    }

    function makeButton(label, className, onClick) { // Small helper that creates a button.
        var button = make("button", className, label); // Creates the button with its label.
        button.type = "button"; // Makes it a plain button.
        button.addEventListener("click", onClick); // Runs the given function when it is pressed.
        return button; // Returns the new button.
    }

    function buildBanner() { // Creates the banner the first time it is needed.
        banner = make("section", "cookie-banner"); // Creates the banner container.
        banner.id = "cookie-banner"; // Gives it an ID.
        banner.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        banner.setAttribute("aria-modal", "false"); // Says the rest of the page can still be used.
        banner.setAttribute("aria-labelledby", "cookie-title"); // Links the dialog to its title.
        banner.hidden = true; // Keeps it hidden until it is opened.

        var title = make("h2", "cookie-title", "Your privacy choices"); // Creates the title.
        title.id = "cookie-title"; // Gives the title an ID that the dialog refers to.
        var intro = make("p", "", "Campus-Cart only stores what it needs to work, such as your order summary. Embedded maps come from Google and OpenStreetMap and can see your IP address, so they stay off until you allow them. We do not use advertising or analytics cookies."); // Creates the explanation.
        var links = make("p", "cookie-links"); // Creates the line for the policy links.
        var cookieLink = make("a", "", "Cookie Policy"); // Creates the Cookie Policy link.
        cookieLink.href = root + "pages/cookies.html"; // Points it to the Cookie Policy page.
        var privacyLink = make("a", "", "Privacy Policy"); // Creates the Privacy Policy link.
        privacyLink.href = root + "pages/privacy.html"; // Points it to the Privacy Policy page.
        links.appendChild(cookieLink); // Adds the Cookie Policy link.
        links.appendChild(document.createTextNode(" | ")); // Adds a separator.
        links.appendChild(privacyLink); // Adds the Privacy Policy link.

        var summary = make("div", "cookie-actions"); // Creates the row of main buttons.
        summary.id = "cookie-summary"; // Gives it an ID so it can be shown and hidden.
        summary.appendChild(makeButton("Accept all", "btn", function () { save(true); })); // Adds the button that allows maps.
        summary.appendChild(makeButton("Essential only", "btn btn-ghost-light", function () { save(false); })); // Adds the button that keeps maps off.
        summary.appendChild(makeButton("Choose settings", "btn btn-ghost-light", function () { showSettings(); })); // Adds the button that opens the settings.

        var settings = make("div", "cookie-settings"); // Creates the settings area.
        settings.id = "cookie-settings"; // Gives it an ID so it can be shown and hidden.
        settings.hidden = true; // Keeps it hidden until the visitor chooses settings.
        var fieldset = make("fieldset", "cookie-options"); // Groups the options.
        var legend = make("legend", "", "Choose what we may use"); // Names the group.
        fieldset.appendChild(legend); // Adds the group name.
        fieldset.appendChild(makeOption("cookie-essential", "Essential storage (always on)", "Keeps your order summary for this visit and remembers these choices. The website cannot work without it.", true, true)); // Adds the always-on option.
        fieldset.appendChild(makeOption("cookie-maps", "Embedded maps", "Google Maps and OpenStreetMap map tiles. These providers receive your IP address and Google may set cookies. Turning this off takes full effect when you reload the page.", false, false)); // Adds the optional maps choice.
        var actions = make("div", "cookie-actions"); // Creates the row of settings buttons.
        actions.appendChild(makeButton("Save choices", "btn", function () { save(document.getElementById("cookie-maps").checked); })); // Saves what the visitor ticked.
        actions.appendChild(makeButton("Back", "btn btn-ghost-light", function () { cancelSettings(); })); // Goes back without saving.
        settings.appendChild(fieldset); // Adds the options to the settings area.
        settings.appendChild(actions); // Adds the buttons to the settings area.

        banner.appendChild(title); // Adds the title.
        banner.appendChild(intro); // Adds the explanation.
        banner.appendChild(links); // Adds the policy links.
        banner.appendChild(summary); // Adds the main buttons.
        banner.appendChild(settings); // Adds the settings area.
        document.body.insertBefore(banner, document.body.firstChild); // Puts the banner first on the page so keyboard users reach it early.
    }

    function makeOption(id, label, help, checked, locked) { // Builds one tick box with its explanation.
        var wrap = make("div", "cookie-option"); // Creates the row.
        var input = make("input"); // Creates the tick box.
        input.type = "checkbox"; // Makes it a checkbox.
        input.id = id; // Gives it an ID.
        input.checked = checked; // Sets the starting state.
        input.disabled = locked; // Locks it when it cannot be switched off.
        var text = make("label", ""); // Creates the label.
        text.setAttribute("for", id); // Links the label to the tick box.
        var strong = make("strong", "", label); // Creates the bold option name.
        var small = make("span", "cookie-help", help); // Creates the explanation.
        text.appendChild(strong); // Adds the name to the label.
        text.appendChild(small); // Adds the explanation to the label.
        wrap.appendChild(input); // Adds the tick box to the row.
        wrap.appendChild(text); // Adds the label to the row.
        return wrap; // Returns the finished row.
    }

    function showBanner() { // Opens the banner on its first screen.
        if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        document.getElementById("cookie-summary").hidden = false; // Shows the main buttons.
        document.getElementById("cookie-settings").hidden = true; // Hides the settings area.
        banner.hidden = false; // Shows the banner.
    }

    function showSettings() { // Opens the banner on the settings screen.
        if (!banner) { buildBanner(); } // Builds the banner if it does not exist yet.
        document.getElementById("cookie-maps").checked = state.maps; // Shows the saved maps choice.
        document.getElementById("cookie-summary").hidden = true; // Hides the main buttons.
        document.getElementById("cookie-settings").hidden = false; // Shows the settings area.
        banner.hidden = false; // Shows the banner.
        document.getElementById("cookie-maps").focus(); // Moves focus to the first choice.
    }

    function cancelSettings() { // Leaves the settings without saving.
        if (state.decided) { hideBanner(); } else { showBanner(); } // Closes the banner if a choice already exists, otherwise goes back to the first screen.
    }

    function hideBanner() { // Closes the banner.
        if (banner) { banner.hidden = true; } // Hides it when it exists.
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
        applyEmbeds(); // Loads or blocks the embedded maps.
        if (!state.decided) { showBanner(); } // Shows the banner when no choice has been made.
        document.addEventListener("click", function (e) { // Listens for clicks on the Cookie settings links.
            var link = e.target.closest ? e.target.closest("[data-cookie-settings]") : null; // Finds a Cookie settings link, if one was clicked.
            if (!link) { return; } // Ignores every other click.
            e.preventDefault(); // Stops a link from jumping to the top of the page.
            opener = link; // Remembers it so focus can return later.
            showSettings(); // Opens the settings.
        });
        document.addEventListener("keydown", function (e) { // Listens for the Escape key.
            if (e.key === "Escape" && banner && !banner.hidden && state.decided) { cancelSettings(); } // Closes the settings with Escape once a choice exists.
        });
    }

    if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", start); } else { start(); } // Starts now or when the page finishes loading.
})();

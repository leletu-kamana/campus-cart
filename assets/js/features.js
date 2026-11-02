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
// INLINE COMMENTING GUIDE: Explanatory comments identify the purpose of the main logic blocks, state changes, DOM operations and event handling.
// ==========================================================

// JavaScript statement/expression: (function () { // Wraps the features in a function so their variables stay private.
(function () { // Wraps the features in a function so their variables stay private.
    // JavaScript statement/expression: "use strict"; // Turns on stricter error checking.
    "use strict"; // Turns on stricter error checking.

    // ------------------------------------------------------
    // SHARED HELPERS
    // ------------------------------------------------------

    // Creates an element, sets its class and text, and returns it.
    // Using textContent (not innerHTML) means text can never be read as HTML.
    // JavaScript statement/expression: function make(tag, className, text) { // Defines a helper that creates an element with a class and text.
    function make(tag, className, text) { // Defines a helper that creates an element with a class and text.
        // JavaScript statement/expression: var node = document.createElement(tag); // Creates the element.
        var node = document.createElement(tag); // Creates the element.
        // JavaScript statement/expression: if (className) { node.className = className; } // Sets the class name when one is given.
        if (className) { node.className = className; } // Sets the class name when one is given.
        // JavaScript statement/expression: if (text) { node.textContent = text; } // Sets the text when one is given.
        if (text) { node.textContent = text; } // Sets the text when one is given.
        // JavaScript statement/expression: return node; // Returns the new element.
        return node; // Returns the new element.
    // JavaScript statement/expression: }
    }

    // Keeps Tab and Shift+Tab inside a dialog while it is open.
    // JavaScript statement/expression: function trapFocus(event, container) { // Defines a helper that keeps Tab focus inside a dialog.
    function trapFocus(event, container) { // Defines a helper that keeps Tab focus inside a dialog.
        // JavaScript statement/expression: if (event.key !== "Tab") { return; } // Ignores every key except Tab.
        if (event.key !== "Tab") { return; } // Ignores every key except Tab.
        // JavaScript statement/expression: var items = container.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'
        var items = container.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"); // Finds everything inside the dialog that can take focus.
        // JavaScript statement/expression: var visible = Array.prototype.filter.call(items, function (item) { return !item.disabled && !item.hidden; }); 
        var visible = Array.prototype.filter.call(items, function (item) { return !item.disabled && !item.hidden; }); // Keeps only the items that are enabled and visible.
        // JavaScript statement/expression: if (!visible.length) { return; } // Stops if nothing can take focus.
        if (!visible.length) { return; } // Stops if nothing can take focus.
        // JavaScript statement/expression: var first = visible[0]; // Stores the first focusable item.
        var first = visible[0]; // Stores the first focusable item.
        // JavaScript statement/expression: var last = visible[visible.length - 1]; // Stores the last focusable item.
        var last = visible[visible.length - 1]; // Stores the last focusable item.
        // JavaScript statement/expression: if (event.shiftKey && document.activeElement === first) { // Checks for Shift+Tab on the first item.
        if (event.shiftKey && document.activeElement === first) { // Checks for Shift+Tab on the first item.
            // JavaScript statement/expression: event.preventDefault(); // Stops the browser from moving focus out of the dialog.
            event.preventDefault(); // Stops the browser from moving focus out of the dialog.
            // JavaScript statement/expression: last.focus(); // Moves focus to the last item instead.
            last.focus(); // Moves focus to the last item instead.
        // JavaScript statement/expression: } else if (!event.shiftKey && document.activeElement === last) { // Checks for Tab on the last item.
        } else if (!event.shiftKey && document.activeElement === last) { // Checks for Tab on the last item.
            // JavaScript statement/expression: event.preventDefault(); // Stops the browser from moving focus out of the dialog.
            event.preventDefault(); // Stops the browser from moving focus out of the dialog.
            // JavaScript statement/expression: first.focus(); // Moves focus to the first item instead.
            first.focus(); // Moves focus to the first item instead.
        // JavaScript statement/expression: }
        }
    // JavaScript statement/expression: }
    }

    // ------------------------------------------------------
    // 1. INTERACTIVE HUB MAP (Leaflet + OpenStreetMap)
    // ------------------------------------------------------

    // Approximate city-centre coordinates for each collection hub city.
    // The hub names, addresses and hours come from PROVINCES in data.js.
    // JavaScript statement/expression: var HUB_COORDS = { // Stores the map position (latitude and longitude) of each collection hub.
    var HUB_COORDS = { // Stores the map position (latitude and longitude) of each collection hub.
        // JavaScript statement/expression: "Gqeberha": [-33.9608, 25.6022], // Position of the Gqeberha hub.
        "Gqeberha": [-33.9608, 25.6022], // Position of the Gqeberha hub.
        // JavaScript statement/expression: "Bloemfontein": [-29.0852, 26.1596], // Position of the Bloemfontein hub.
        "Bloemfontein": [-29.0852, 26.1596], // Position of the Bloemfontein hub.
        // JavaScript statement/expression: "Johannesburg": [-26.1929, 28.0305], // Position of the Johannesburg hub.
        "Johannesburg": [-26.1929, 28.0305], // Position of the Johannesburg hub.
        // JavaScript statement/expression: "Pretoria": [-25.7479, 28.2293], // Position of the Pretoria hub.
        "Pretoria": [-25.7479, 28.2293], // Position of the Pretoria hub.
        // JavaScript statement/expression: "Durban": [-29.8179, 30.9420], // Position of the Durban hub.
        "Durban": [-29.8179, 30.9420], // Position of the Durban hub.
        // JavaScript statement/expression: "Polokwane": [-23.9045, 29.4689], // Position of the Polokwane hub.
        "Polokwane": [-23.9045, 29.4689], // Position of the Polokwane hub.
        // JavaScript statement/expression: "Mbombela": [-25.4753, 30.9694], // Position of the Mbombela hub.
        "Mbombela": [-25.4753, 30.9694], // Position of the Mbombela hub.
        // JavaScript statement/expression: "Kimberley": [-28.7323, 24.7623], // Position of the Kimberley hub.
        "Kimberley": [-28.7323, 24.7623], // Position of the Kimberley hub.
        // JavaScript statement/expression: "Potchefstroom": [-26.7145, 27.0970], // Position of the Potchefstroom hub.
        "Potchefstroom": [-26.7145, 27.0970], // Position of the Potchefstroom hub.
        // JavaScript statement/expression: "Cape Town": [-33.9575, 18.4764] // Position of the Cape Town hub.
        "Cape Town": [-33.9575, 18.4764] // Position of the Cape Town hub.
    // JavaScript statement/expression: };
    };

    // initHubMap: handles the init hub map operation used by this feature.

    // JavaScript statement/expression: function initHubMap() { // Defines the function that builds the hub map.
    function initHubMap() { // Defines the function that builds the hub map.
        // JavaScript statement/expression: var box = document.getElementById("hub-map"); // Finds the map box on the page.
        var box = document.getElementById("hub-map"); // Finds the map box on the page.
        // JavaScript statement/expression: if (!box) { return; } // Stops when the page has no map box.
        if (!box) { return; } // Stops when the page has no map box.

        // If Leaflet or the hub data did not load, show a plain message instead of a blank box.
        // JavaScript statement/expression: if (typeof L === "undefined" || typeof PROVINCES === "undefined") { // Checks that the map library and the hub
        if (typeof L === "undefined" || typeof PROVINCES === "undefined") { // Checks that the map library and the hub data have loaded.
            // JavaScript statement/expression: box.textContent = "The map could not be loaded. Please use the collection hub cards below."; // Shows a messag
            box.textContent = "The map could not be loaded. Please use the collection hub cards below."; // Shows a message when the map cannot be loaded.
            // JavaScript statement/expression: box.classList.add("map-unavailable"); // Adds the class that styles the message box.
            box.classList.add("map-unavailable"); // Adds the class that styles the message box.
            // JavaScript statement/expression: return; // Stops here.
            return; // Stops here.
        // JavaScript statement/expression: }
        }

        // Builds one list of hubs (name, province, address, hours, coordinates).
        // JavaScript statement/expression: var hubs = []; // Creates a list to hold the hubs.
        var hubs = []; // Creates a list to hold the hubs.
        // JavaScript statement/expression: PROVINCES.forEach(function (province) { // Loops through every province.
        PROVINCES.forEach(function (province) { // Loops through every province.
            // JavaScript statement/expression: province.hubs.forEach(function (hub) { // Loops through every hub in that province.
            province.hubs.forEach(function (hub) { // Loops through every hub in that province.
                // JavaScript statement/expression: if (HUB_COORDS[hub.city]) { // Only uses hubs that have map coordinates.
                if (HUB_COORDS[hub.city]) { // Only uses hubs that have map coordinates.
                    // JavaScript statement/expression: hubs.push({ // Adds a hub record to the list.
                    hubs.push({ // Adds a hub record to the list.
                        // JavaScript statement/expression: city: hub.city, // Stores the city name.
                        city: hub.city, // Stores the city name.
                        // JavaScript statement/expression: province: province.name, // Stores the province name.
                        province: province.name, // Stores the province name.
                        // JavaScript statement/expression: address: hub.address, // Stores the street address.
                        address: hub.address, // Stores the street address.
                        // JavaScript statement/expression: hours: hub.hours, // Stores the opening hours.
                        hours: hub.hours, // Stores the opening hours.
                        // JavaScript statement/expression: coords: HUB_COORDS[hub.city] // Stores the map coordinates.
                        coords: HUB_COORDS[hub.city] // Stores the map coordinates.
                    // JavaScript statement/expression: });
                    });
                // JavaScript statement/expression: }
                }
            // JavaScript statement/expression: });
            });
        // JavaScript statement/expression: });
        });

        // JavaScript statement/expression: var map = L.map(box, { scrollWheelZoom: false }); // Creates the map inside the box with scroll-wheel zoom swi
        var map = L.map(box, { scrollWheelZoom: false }); // Creates the map inside the box with scroll-wheel zoom switched off.
        // JavaScript statement/expression: L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { // Loads the map tiles from OpenStreetMap.
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { // Loads the map tiles from OpenStreetMap.
            // JavaScript statement/expression: maxZoom: 18, // Sets the furthest zoom level.
            maxZoom: 18, // Sets the furthest zoom level.
            // JavaScript statement/expression: attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener nore
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStreetMap</a> contributors" // Credits OpenStreetMap on the map.
        // JavaScript statement/expression: }).addTo(map); // Adds the tiles to the map.
        }).addTo(map); // Adds the tiles to the map.

        // Scroll-wheel zoom stays off until the map is clicked, so the page can still scroll past it.
        // JavaScript statement/expression: map.on("focus", function () { map.scrollWheelZoom.enable(); }); // Turns on scroll-wheel zoom when the map has
        map.on("focus", function () { map.scrollWheelZoom.enable(); }); // Turns on scroll-wheel zoom when the map has keyboard focus.
        // JavaScript statement/expression: map.on("blur", function () { map.scrollWheelZoom.disable(); }); // Turns it off again when focus leaves the ma
        map.on("blur", function () { map.scrollWheelZoom.disable(); }); // Turns it off again when focus leaves the map.

        // JavaScript statement/expression: var markers = []; // Creates a list for the markers.
        var markers = []; // Creates a list for the markers.
        // JavaScript statement/expression: var bounds = []; // Creates a list for the marker positions.
        var bounds = []; // Creates a list for the marker positions.
        // JavaScript statement/expression: hubs.forEach(function (hub, index) { // Loops through every hub.
        hubs.forEach(function (hub, index) { // Loops through every hub.
            // Popup content is built with DOM methods so no text is treated as HTML.
            // JavaScript statement/expression: var popup = make("div", "map-popup"); // Creates the popup content box.
            var popup = make("div", "map-popup"); // Creates the popup content box.
            // JavaScript statement/expression: popup.appendChild(make("strong", "", hub.city + ", " + hub.province)); // Adds the city and province in bold.
            popup.appendChild(make("strong", "", hub.city + ", " + hub.province)); // Adds the city and province in bold.
            // JavaScript statement/expression: popup.appendChild(make("p", "", hub.address)); // Adds the address.
            popup.appendChild(make("p", "", hub.address)); // Adds the address.
            // JavaScript statement/expression: popup.appendChild(make("p", "", hub.hours)); // Adds the opening hours.
            popup.appendChild(make("p", "", hub.hours)); // Adds the opening hours.

            // JavaScript statement/expression: var marker = L.marker(hub.coords, { title: hub.city + " collection hub", alt: hub.city + " collection hub" }) 
            var marker = L.marker(hub.coords, { title: hub.city + " collection hub", alt: hub.city + " collection hub" }) // Creates a marker with a title and alt text for accessibility.
                // JavaScript statement/expression: .addTo(map) // Adds the marker to the map.
                .addTo(map) // Adds the marker to the map.
                // JavaScript statement/expression: .bindPopup(popup); // Attaches the popup to the marker.
                .bindPopup(popup); // Attaches the popup to the marker.
            // JavaScript statement/expression: markers.push(marker); // Saves the marker so the dropdown can open it.
            markers.push(marker); // Saves the marker so the dropdown can open it.
            // JavaScript statement/expression: bounds.push(hub.coords); // Saves the position so the map can fit every hub.
            bounds.push(hub.coords); // Saves the position so the map can fit every hub.

            // Fills the "jump to a hub" dropdown at the same time.
            // JavaScript statement/expression: var select = document.getElementById("hub-select"); // Finds the hub dropdown.
            var select = document.getElementById("hub-select"); // Finds the hub dropdown.
            // JavaScript statement/expression: if (select) { // Checks that the dropdown exists.
            if (select) { // Checks that the dropdown exists.
                // JavaScript statement/expression: var option = document.createElement("option"); // Creates a dropdown option.
                var option = document.createElement("option"); // Creates a dropdown option.
                // JavaScript statement/expression: option.value = String(index); // Sets the option value to the hub number.
                option.value = String(index); // Sets the option value to the hub number.
                // JavaScript statement/expression: option.textContent = hub.city + ", " + hub.province; // Sets the option text.
                option.textContent = hub.city + ", " + hub.province; // Sets the option text.
                // JavaScript statement/expression: select.appendChild(option); // Adds the option to the dropdown.
                select.appendChild(option); // Adds the option to the dropdown.
            // JavaScript statement/expression: }
            }
        // JavaScript statement/expression: });
        });

        // JavaScript statement/expression: map.fitBounds(bounds, { padding: [30, 30] }); // Zooms the map so every hub is visible.
        map.fitBounds(bounds, { padding: [30, 30] }); // Zooms the map so every hub is visible.

        // The dropdown gives keyboard and screen-reader users another way to reach each hub.
        // JavaScript statement/expression: var picker = document.getElementById("hub-select"); // Finds the hub dropdown again.
        var picker = document.getElementById("hub-select"); // Finds the hub dropdown again.
        // JavaScript statement/expression: if (picker) { // Checks that the dropdown exists.
        if (picker) { // Checks that the dropdown exists.
            // JavaScript statement/expression: picker.addEventListener("change", function () { // Listens for a new choice in the dropdown.
            picker.addEventListener("change", function () { // Listens for a new choice in the dropdown.
                // JavaScript statement/expression: if (picker.value === "") { // Checks whether the empty first option was chosen.
                if (picker.value === "") { // Checks whether the empty first option was chosen.
                    // JavaScript statement/expression: map.fitBounds(bounds, { padding: [30, 30] }); // Shows every hub again.
                    map.fitBounds(bounds, { padding: [30, 30] }); // Shows every hub again.
                    // JavaScript statement/expression: map.closePopup(); // Closes any open popup.
                    map.closePopup(); // Closes any open popup.
                    // JavaScript statement/expression: return; // Stops here.
                    return; // Stops here.
                // JavaScript statement/expression: }
                }
                // JavaScript statement/expression: var chosen = hubs[Number(picker.value)]; // Finds the hub that was chosen.
                var chosen = hubs[Number(picker.value)]; // Finds the hub that was chosen.
                // JavaScript statement/expression: map.setView(chosen.coords, 11); // Moves the map to that hub.
                map.setView(chosen.coords, 11); // Moves the map to that hub.
                // JavaScript statement/expression: markers[Number(picker.value)].openPopup(); // Opens that hub's popup.
                markers[Number(picker.value)].openPopup(); // Opens that hub's popup.
            // JavaScript statement/expression: });
            });
        // JavaScript statement/expression: }
        }

        // Makes sure the map redraws correctly if the layout changes size (for example rotating a phone).
        // JavaScript statement/expression: window.addEventListener("resize", function () { map.invalidateSize(); }); // Redraws the map correctly when th
        window.addEventListener("resize", function () { map.invalidateSize(); }); // Redraws the map correctly when the window is resized.
    // JavaScript statement/expression: }
    }

    // ------------------------------------------------------
    // 2. IMAGE GALLERY LIGHTBOX
    // ------------------------------------------------------

    // Decides whether an image can be opened in the lightbox. Every photo in the page content can.
    // Logos, icons and other images that are links or buttons, map tiles, the viewer's own image
    // and purely decorative images (empty alt text) are left alone.
    // JavaScript statement/expression: function isViewable(img) { // Defines a helper that decides whether an image can open in the lightbox.
    function isViewable(img) { // Defines a helper that decides whether an image can open in the lightbox.
        // JavaScript statement/expression: if (!img.closest("main")) { return false; } // Ignores images outside the main content.
        if (!img.closest("main")) { return false; } // Ignores images outside the main content.
        // JavaScript statement/expression: if (img.closest("a, button, .lightbox, .modal, .leaflet-container, [data-no-lightbox]")) { return false; } // 
        if (img.closest("a, button, .lightbox, .modal, .leaflet-container, [data-no-lightbox]")) { return false; } // Ignores images inside links, buttons, the viewers, the map, or marked images.
        // JavaScript statement/expression: return img.getAttribute("alt") !== null && img.getAttribute("alt").trim() !== ""; // Only allows images that h
        return img.getAttribute("alt") !== null && img.getAttribute("alt").trim() !== ""; // Only allows images that have meaningful alt text.
    // JavaScript statement/expression: }
    }

    // initLightbox: handles the init lightbox operation used by this feature.

    // JavaScript statement/expression: function initLightbox() { // Defines the function that builds the lightbox.
    function initLightbox() { // Defines the function that builds the lightbox.
        // JavaScript statement/expression: if (!document.querySelector("main img")) { return; } // Stops when the page has no content images.
        if (!document.querySelector("main img")) { return; } // Stops when the page has no content images.

        // Builds the lightbox once and hides it until an image is chosen.
        // JavaScript statement/expression: var overlay = make("div", "lightbox"); // Creates the dark overlay.
        var overlay = make("div", "lightbox"); // Creates the dark overlay.
        // JavaScript statement/expression: overlay.hidden = true; // Hides it to start with.
        overlay.hidden = true; // Hides it to start with.
        // JavaScript statement/expression: overlay.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        overlay.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        // JavaScript statement/expression: overlay.setAttribute("aria-modal", "true"); // Tells assistive technology the page behind is inactive.
        overlay.setAttribute("aria-modal", "true"); // Tells assistive technology the page behind is inactive.
        // JavaScript statement/expression: overlay.setAttribute("aria-label", "Image viewer"); // Gives the dialog a name.
        overlay.setAttribute("aria-label", "Image viewer"); // Gives the dialog a name.

        // JavaScript statement/expression: var closeBtn = make("button", "lb-btn lb-close", "\u00D7"); // Creates the close button.
        var closeBtn = make("button", "lb-btn lb-close", "\u00D7"); // Creates the close button.
        // JavaScript statement/expression: closeBtn.type = "button"; // Makes it a plain button, not a form submit.
        closeBtn.type = "button"; // Makes it a plain button, not a form submit.
        // JavaScript statement/expression: closeBtn.setAttribute("aria-label", "Close image viewer"); // Gives it a text label for screen readers.
        closeBtn.setAttribute("aria-label", "Close image viewer"); // Gives it a text label for screen readers.

        // JavaScript statement/expression: var prevBtn = make("button", "lb-btn lb-prev", "\u2039"); // Creates the previous button.
        var prevBtn = make("button", "lb-btn lb-prev", "\u2039"); // Creates the previous button.
        // JavaScript statement/expression: prevBtn.type = "button"; // Makes it a plain button.
        prevBtn.type = "button"; // Makes it a plain button.
        // JavaScript statement/expression: prevBtn.setAttribute("aria-label", "Previous image"); // Gives it a text label for screen readers.
        prevBtn.setAttribute("aria-label", "Previous image"); // Gives it a text label for screen readers.

        // JavaScript statement/expression: var nextBtn = make("button", "lb-btn lb-next", "\u203A"); // Creates the next button.
        var nextBtn = make("button", "lb-btn lb-next", "\u203A"); // Creates the next button.
        // JavaScript statement/expression: nextBtn.type = "button"; // Makes it a plain button.
        nextBtn.type = "button"; // Makes it a plain button.
        // JavaScript statement/expression: nextBtn.setAttribute("aria-label", "Next image"); // Gives it a text label for screen readers.
        nextBtn.setAttribute("aria-label", "Next image"); // Gives it a text label for screen readers.

        // JavaScript statement/expression: var figure = make("figure", "lb-figure"); // Creates the figure that holds the large image.
        var figure = make("figure", "lb-figure"); // Creates the figure that holds the large image.
        // JavaScript statement/expression: var bigImage = make("img", "lb-image"); // Creates the large image.
        var bigImage = make("img", "lb-image"); // Creates the large image.
        // JavaScript statement/expression: var caption = make("figcaption", "lb-caption"); // Creates the caption.
        var caption = make("figcaption", "lb-caption"); // Creates the caption.
        // JavaScript statement/expression: var counter = make("p", "lb-count"); // Creates the image counter.
        var counter = make("p", "lb-count"); // Creates the image counter.
        // JavaScript statement/expression: figure.appendChild(bigImage); // Adds the image to the figure.
        figure.appendChild(bigImage); // Adds the image to the figure.
        // JavaScript statement/expression: figure.appendChild(caption); // Adds the caption.
        figure.appendChild(caption); // Adds the caption.
        // JavaScript statement/expression: figure.appendChild(counter); // Adds the counter.
        figure.appendChild(counter); // Adds the counter.

        // JavaScript statement/expression: overlay.appendChild(closeBtn); // Adds the close button to the overlay.
        overlay.appendChild(closeBtn); // Adds the close button to the overlay.
        // JavaScript statement/expression: overlay.appendChild(prevBtn); // Adds the previous button.
        overlay.appendChild(prevBtn); // Adds the previous button.
        // JavaScript statement/expression: overlay.appendChild(figure); // Adds the figure.
        overlay.appendChild(figure); // Adds the figure.
        // JavaScript statement/expression: overlay.appendChild(nextBtn); // Adds the next button.
        overlay.appendChild(nextBtn); // Adds the next button.
        // JavaScript statement/expression: document.body.appendChild(overlay); // Adds the overlay to the page.
        document.body.appendChild(overlay); // Adds the overlay to the page.

        // JavaScript statement/expression: var current = [];   // the images the viewer can move between
        var current = [];   // the images the viewer can move between
        // JavaScript statement/expression: var position = 0;   // which one is showing
        var position = 0;   // which one is showing
        // JavaScript statement/expression: var opener = null;  // the thumbnail to return focus to
        var opener = null;  // the thumbnail to return focus to

        // Next and previous move between the images that sit together: the same gallery,
        // card grid or section. Only images the visitor can currently see are included
        // (the gallery filter and the tabs hide some of them).
        // JavaScript statement/expression: function groupFor(img) { // Defines a helper that finds the images in the same group as a clicked image.
        function groupFor(img) { // Defines a helper that finds the images in the same group as a clicked image.
            // JavaScript statement/expression: var container = img.closest(".gallery, .grid, section") || document.querySelector("main"); // Looks for the ne
            var container = img.closest(".gallery, .grid, section") || document.querySelector("main"); // Looks for the nearest gallery, grid or section, or falls back to the main content.
            // JavaScript statement/expression: return Array.prototype.filter.call(container.querySelectorAll("img"), function (candidate) { // Returns the im
            return Array.prototype.filter.call(container.querySelectorAll("img"), function (candidate) { // Returns the images in that group that can open in the lightbox.
                // JavaScript statement/expression: return isViewable(candidate) && !candidate.closest("[hidden]"); // Keeps an image only if it is viewable and n
                return isViewable(candidate) && !candidate.closest("[hidden]"); // Keeps an image only if it is viewable and not inside a hidden element.
            // JavaScript statement/expression: });
            });
        // JavaScript statement/expression: }
        }

        // The caption is the figure caption, or the heading of the card the image sits in, or the alt text.
        // JavaScript statement/expression: function captionFor(img) { // Defines a helper that finds the caption text for an image.
        function captionFor(img) { // Defines a helper that finds the caption text for an image.
            // JavaScript statement/expression: var figcaption = img.closest("figure") ? img.closest("figure").querySelector("figcaption") : null; // Looks fo
            var figcaption = img.closest("figure") ? img.closest("figure").querySelector("figcaption") : null; // Looks for a figcaption next to the image.
            // JavaScript statement/expression: if (figcaption) { return figcaption.textContent; } // Uses the figcaption text when there is one.
            if (figcaption) { return figcaption.textContent; } // Uses the figcaption text when there is one.
            // JavaScript statement/expression: var card = img.closest(".card"); // Otherwise looks for a product card.
            var card = img.closest(".card"); // Otherwise looks for a product card.
            // JavaScript statement/expression: var heading = card ? card.querySelector("h3") : null; // Uses the card heading when there is one.
            var heading = card ? card.querySelector("h3") : null; // Uses the card heading when there is one.
            // JavaScript statement/expression: return heading ? heading.textContent : img.alt; // Falls back to the image's alt text.
            return heading ? heading.textContent : img.alt; // Falls back to the image's alt text.
        // JavaScript statement/expression: }
        }

        // show: handles the show operation used by this feature.

        // JavaScript statement/expression: function show(index) { // Defines the function that shows one image.
        function show(index) { // Defines the function that shows one image.
            // JavaScript statement/expression: position = (index + current.length) % current.length; // Wraps around at both ends of the group.
            position = (index + current.length) % current.length; // Wraps around at both ends of the group.
            // JavaScript statement/expression: var img = current[position]; // Gets the image to show.
            var img = current[position]; // Gets the image to show.
            // JavaScript statement/expression: bigImage.src = img.currentSrc || img.src; // Shows the sharpest source of that image.
            bigImage.src = img.currentSrc || img.src; // Shows the sharpest source of that image.
            // JavaScript statement/expression: bigImage.alt = img.alt; // Copies the alt text.
            bigImage.alt = img.alt; // Copies the alt text.
            // JavaScript statement/expression: caption.textContent = captionFor(img); // Sets the caption.
            caption.textContent = captionFor(img); // Sets the caption.
            // JavaScript statement/expression: counter.textContent = "Image " + (position + 1) + " of " + current.length; // Sets the counter text.
            counter.textContent = "Image " + (position + 1) + " of " + current.length; // Sets the counter text.
            // Next and previous make no sense with a single image.
            // JavaScript statement/expression: prevBtn.hidden = nextBtn.hidden = current.length < 2; // Hides the arrow buttons when there is only one image.
            prevBtn.hidden = nextBtn.hidden = current.length < 2; // Hides the arrow buttons when there is only one image.
        // JavaScript statement/expression: }
        }

        // open: handles the open operation used by this feature.

        // JavaScript statement/expression: function open(img) { // Defines the function that opens the lightbox.
        function open(img) { // Defines the function that opens the lightbox.
            // JavaScript statement/expression: opener = img; // Remembers which image opened it so focus can return later.
            opener = img; // Remembers which image opened it so focus can return later.
            // JavaScript statement/expression: current = groupFor(img); // Builds the group of images to browse.
            current = groupFor(img); // Builds the group of images to browse.
            // JavaScript statement/expression: show(current.indexOf(img)); // Shows the clicked image.
            show(current.indexOf(img)); // Shows the clicked image.
            // JavaScript statement/expression: overlay.hidden = false; // Reveals the overlay.
            overlay.hidden = false; // Reveals the overlay.
            // JavaScript statement/expression: document.body.classList.add("lightbox-open"); // Stops the page behind from scrolling.
            document.body.classList.add("lightbox-open"); // Stops the page behind from scrolling.
            // JavaScript statement/expression: closeBtn.focus(); // Moves focus to the close button.
            closeBtn.focus(); // Moves focus to the close button.
        // JavaScript statement/expression: }
        }

        // close: handles the close operation used by this feature.

        // JavaScript statement/expression: function close() { // Defines the function that closes the lightbox.
        function close() { // Defines the function that closes the lightbox.
            // JavaScript statement/expression: overlay.hidden = true; // Hides the overlay.
            overlay.hidden = true; // Hides the overlay.
            // JavaScript statement/expression: document.body.classList.remove("lightbox-open"); // Lets the page scroll again.
            document.body.classList.remove("lightbox-open"); // Lets the page scroll again.
            // JavaScript statement/expression: if (opener) { opener.focus(); } // Returns focus to the image that opened the lightbox.
            if (opener) { opener.focus(); } // Returns focus to the image that opened the lightbox.
        // JavaScript statement/expression: }
        }

        // Makes an image behave like a button for mouse, touch and keyboard users.
        // JavaScript statement/expression: function prepare(img) { // Defines a helper that makes one image behave like a button.
        function prepare(img) { // Defines a helper that makes one image behave like a button.
            // JavaScript statement/expression: if (!isViewable(img) || img.getAttribute("role") === "button") { return; } // Skips images that cannot open or
            if (!isViewable(img) || img.getAttribute("role") === "button") { return; } // Skips images that cannot open or are already set up.
            // JavaScript statement/expression: img.tabIndex = 0; // Lets keyboard users reach the image with Tab.
            img.tabIndex = 0; // Lets keyboard users reach the image with Tab.
            // JavaScript statement/expression: img.setAttribute("role", "button"); // Tells assistive technology it acts as a button.
            img.setAttribute("role", "button"); // Tells assistive technology it acts as a button.
            // JavaScript statement/expression: img.setAttribute("aria-label", "View larger image: " + img.alt); // Gives it a label that describes the action
            img.setAttribute("aria-label", "View larger image: " + img.alt); // Gives it a label that describes the action.
        // JavaScript statement/expression: }
        }

        // JavaScript statement/expression: Array.prototype.forEach.call(document.querySelectorAll("main img"), prepare); // Sets up every image that is a
        Array.prototype.forEach.call(document.querySelectorAll("main img"), prepare); // Sets up every image that is already on the page.

        // Product cards are added by JavaScript after the page loads (and rebuilt when the filters change),
        // so new images are prepared as they appear.
        // JavaScript statement/expression: new MutationObserver(function (changes) { // Starts watching the page for images added later, such as product 
        new MutationObserver(function (changes) { // Starts watching the page for images added later, such as product cards.
            // JavaScript statement/expression: changes.forEach(function (change) { // Loops through each change.
            changes.forEach(function (change) { // Loops through each change.
                // JavaScript statement/expression: Array.prototype.forEach.call(change.addedNodes, function (node) { // Loops through each node that was added.
                Array.prototype.forEach.call(change.addedNodes, function (node) { // Loops through each node that was added.
                    // JavaScript statement/expression: if (node.nodeType !== 1) { return; } // Skips nodes that are not elements.
                    if (node.nodeType !== 1) { return; } // Skips nodes that are not elements.
                    // JavaScript statement/expression: if (node.tagName === "IMG") { prepare(node); } // Sets up the node if it is an image.
                    if (node.tagName === "IMG") { prepare(node); } // Sets up the node if it is an image.
                    // JavaScript statement/expression: Array.prototype.forEach.call(node.querySelectorAll("img"), prepare); // Sets up any images inside the node.
                    Array.prototype.forEach.call(node.querySelectorAll("img"), prepare); // Sets up any images inside the node.
                // JavaScript statement/expression: });
                });
            // JavaScript statement/expression: });
            });
        // JavaScript statement/expression: }).observe(document.querySelector("main"), { childList: true, subtree: true }); // Watches the whole main area
        }).observe(document.querySelector("main"), { childList: true, subtree: true }); // Watches the whole main area, including nested elements.

        // One click and one key listener on the page handle every image, including ones added later.
        // JavaScript statement/expression: document.addEventListener("click", function (event) { // Listens for clicks anywhere on the page.
        document.addEventListener("click", function (event) { // Listens for clicks anywhere on the page.
            // JavaScript statement/expression: var img = event.target.closest ? event.target.closest("img") : null; // Finds the image that was clicked, if a
            var img = event.target.closest ? event.target.closest("img") : null; // Finds the image that was clicked, if any.
            // JavaScript statement/expression: if (img && img.getAttribute("role") === "button" && isViewable(img)) { open(img); } // Opens the lightbox when
            if (img && img.getAttribute("role") === "button" && isViewable(img)) { open(img); } // Opens the lightbox when a viewable image button is clicked.
        // JavaScript statement/expression: });
        });
        // JavaScript statement/expression: document.addEventListener("keydown", function (event) { // Listens for key presses anywhere on the page.
        document.addEventListener("keydown", function (event) { // Listens for key presses anywhere on the page.
            // JavaScript statement/expression: var img = event.target; // Gets the element that has focus.
            var img = event.target; // Gets the element that has focus.
            // JavaScript statement/expression: if (img && img.tagName === "IMG" && img.getAttribute("role") === "button" && // Checks that it is an image but
            if (img && img.tagName === "IMG" && img.getAttribute("role") === "button" && // Checks that it is an image button.
                // JavaScript statement/expression: (event.key === "Enter" || event.key === " ")) { // Checks that Enter or Space was pressed.
                (event.key === "Enter" || event.key === " ")) { // Checks that Enter or Space was pressed.
                // JavaScript statement/expression: event.preventDefault(); // Stops Space from scrolling the page.
                event.preventDefault(); // Stops Space from scrolling the page.
                // JavaScript statement/expression: open(img); // Opens the lightbox.
                open(img); // Opens the lightbox.
            // JavaScript statement/expression: }
            }
        // JavaScript statement/expression: });
        });

        // JavaScript statement/expression: closeBtn.addEventListener("click", close); // Closes the lightbox when the close button is clicked.
        closeBtn.addEventListener("click", close); // Closes the lightbox when the close button is clicked.
        // JavaScript statement/expression: prevBtn.addEventListener("click", function () { show(position - 1); }); // Shows the previous image.
        prevBtn.addEventListener("click", function () { show(position - 1); }); // Shows the previous image.
        // JavaScript statement/expression: nextBtn.addEventListener("click", function () { show(position + 1); }); // Shows the next image.
        nextBtn.addEventListener("click", function () { show(position + 1); }); // Shows the next image.

        // Clicking the dark area around the picture closes the viewer.
        // JavaScript statement/expression: overlay.addEventListener("click", function (event) { // Listens for clicks on the overlay.
        overlay.addEventListener("click", function (event) { // Listens for clicks on the overlay.
            // JavaScript statement/expression: if (event.target === overlay) { close(); } // Closes when the dark area, not the image, is clicked.
            if (event.target === overlay) { close(); } // Closes when the dark area, not the image, is clicked.
        // JavaScript statement/expression: });
        });

        // JavaScript statement/expression: overlay.addEventListener("keydown", function (event) { // Listens for key presses inside the lightbox.
        overlay.addEventListener("keydown", function (event) { // Listens for key presses inside the lightbox.
            // JavaScript statement/expression: if (event.key === "Escape") { close(); } // Closes on Escape.
            if (event.key === "Escape") { close(); } // Closes on Escape.
            // JavaScript statement/expression: if (event.key === "ArrowLeft" && current.length > 1) { show(position - 1); } // Shows the previous image on th
            if (event.key === "ArrowLeft" && current.length > 1) { show(position - 1); } // Shows the previous image on the left arrow.
            // JavaScript statement/expression: if (event.key === "ArrowRight" && current.length > 1) { show(position + 1); } // Shows the next image on the r
            if (event.key === "ArrowRight" && current.length > 1) { show(position + 1); } // Shows the next image on the right arrow.
            // JavaScript statement/expression: trapFocus(event, overlay); // Keeps Tab focus inside the lightbox.
            trapFocus(event, overlay); // Keeps Tab focus inside the lightbox.
        // JavaScript statement/expression: });
        });

        // Swiping left or right changes image on phones.
        // JavaScript statement/expression: var touchStartX = null; // Remembers where a swipe started.
        var touchStartX = null; // Remembers where a swipe started.
        // JavaScript statement/expression: overlay.addEventListener("touchstart", function (event) { // Listens for the start of a touch.
        overlay.addEventListener("touchstart", function (event) { // Listens for the start of a touch.
            // JavaScript statement/expression: touchStartX = event.changedTouches[0].clientX; // Stores the horizontal start position.
            touchStartX = event.changedTouches[0].clientX; // Stores the horizontal start position.
        // JavaScript statement/expression: }, { passive: true }); // Marks the listener as passive so scrolling stays smooth.
        }, { passive: true }); // Marks the listener as passive so scrolling stays smooth.
        // JavaScript statement/expression: overlay.addEventListener("touchend", function (event) { // Listens for the end of a touch.
        overlay.addEventListener("touchend", function (event) { // Listens for the end of a touch.
            // JavaScript statement/expression: if (touchStartX === null || current.length < 2) { return; } // Ignores the touch if there was no start or only
            if (touchStartX === null || current.length < 2) { return; } // Ignores the touch if there was no start or only one image.
            // JavaScript statement/expression: var distance = event.changedTouches[0].clientX - touchStartX; // Works out how far the finger moved.
            var distance = event.changedTouches[0].clientX - touchStartX; // Works out how far the finger moved.
            // JavaScript statement/expression: if (Math.abs(distance) > 50) { show(distance > 0 ? position - 1 : position + 1); } // Treats a move of more th
            if (Math.abs(distance) > 50) { show(distance > 0 ? position - 1 : position + 1); } // Treats a move of more than 50 pixels as a swipe and shows the previous or next image.
            // JavaScript statement/expression: touchStartX = null; // Resets the start position.
            touchStartX = null; // Resets the start position.
        // JavaScript statement/expression: }, { passive: true }); // Marks the listener as passive so scrolling stays smooth.
        }, { passive: true }); // Marks the listener as passive so scrolling stays smooth.
    // JavaScript statement/expression: }
    }

    // ------------------------------------------------------
    // 3. PRODUCT QUICK-VIEW MODAL
    // ------------------------------------------------------

    // JavaScript statement/expression: function initQuickView() { // Defines the function that builds the product quick-view window.
    function initQuickView() { // Defines the function that builds the product quick-view window.
        // Only pages that show deal cards need the modal.
        // JavaScript statement/expression: if (!document.getElementById("deals-results")) { return; } // Stops when the page has no product list.
        if (!document.getElementById("deals-results")) { return; } // Stops when the page has no product list.

        // JavaScript statement/expression: var backdrop = make("div", "modal-backdrop"); // Creates the dark background.
        var backdrop = make("div", "modal-backdrop"); // Creates the dark background.
        // JavaScript statement/expression: backdrop.hidden = true; // Hides it to start with.
        backdrop.hidden = true; // Hides it to start with.

        // JavaScript statement/expression: var dialog = make("div", "modal"); // Creates the window.
        var dialog = make("div", "modal"); // Creates the window.
        // JavaScript statement/expression: dialog.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        dialog.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        // JavaScript statement/expression: dialog.setAttribute("aria-modal", "true"); // Tells assistive technology the page behind is inactive.
        dialog.setAttribute("aria-modal", "true"); // Tells assistive technology the page behind is inactive.
        // JavaScript statement/expression: dialog.setAttribute("aria-labelledby", "modal-title"); // Links the window to its title.
        dialog.setAttribute("aria-labelledby", "modal-title"); // Links the window to its title.

        // JavaScript statement/expression: var closeBtn = make("button", "modal-close", "\u00D7"); // Creates the close button.
        var closeBtn = make("button", "modal-close", "\u00D7"); // Creates the close button.
        // JavaScript statement/expression: closeBtn.type = "button"; // Makes it a plain button.
        closeBtn.type = "button"; // Makes it a plain button.
        // JavaScript statement/expression: closeBtn.setAttribute("aria-label", "Close product details"); // Gives it a text label for screen readers.
        closeBtn.setAttribute("aria-label", "Close product details"); // Gives it a text label for screen readers.

        // JavaScript statement/expression: var picture = make("img", "modal-image"); // Creates the product image.
        var picture = make("img", "modal-image"); // Creates the product image.
        // JavaScript statement/expression: var body = make("div", "modal-body"); // Creates the details area.
        var body = make("div", "modal-body"); // Creates the details area.
        // JavaScript statement/expression: var badge = make("span", "badge"); // Creates the New or Second-hand badge.
        var badge = make("span", "badge"); // Creates the New or Second-hand badge.
        // JavaScript statement/expression: var title = make("h2", "", ""); // Creates the product title.
        var title = make("h2", "", ""); // Creates the product title.
        // JavaScript statement/expression: title.id = "modal-title"; // Gives the title an ID that the window refers to.
        title.id = "modal-title"; // Gives the title an ID that the window refers to.
        // JavaScript statement/expression: var price = make("p", "price"); // Creates the price line.
        var price = make("p", "price"); // Creates the price line.
        // JavaScript statement/expression: var description = make("p"); // Creates the description paragraph.
        var description = make("p"); // Creates the description paragraph.
        // JavaScript statement/expression: var addBtn = make("button", "btn", "Add to Order Summary"); // Creates the add button.
        var addBtn = make("button", "btn", "Add to Order Summary"); // Creates the add button.
        // JavaScript statement/expression: addBtn.type = "button"; // Makes it a plain button.
        addBtn.type = "button"; // Makes it a plain button.

        // JavaScript statement/expression: body.appendChild(badge); // Adds the badge to the details.
        body.appendChild(badge); // Adds the badge to the details.
        // JavaScript statement/expression: body.appendChild(title); // Adds the title.
        body.appendChild(title); // Adds the title.
        // JavaScript statement/expression: body.appendChild(price); // Adds the price.
        body.appendChild(price); // Adds the price.
        // JavaScript statement/expression: body.appendChild(description); // Adds the description.
        body.appendChild(description); // Adds the description.
        // JavaScript statement/expression: body.appendChild(addBtn); // Adds the add button.
        body.appendChild(addBtn); // Adds the add button.
        // JavaScript statement/expression: dialog.appendChild(closeBtn); // Adds the close button to the window.
        dialog.appendChild(closeBtn); // Adds the close button to the window.
        // JavaScript statement/expression: dialog.appendChild(picture); // Adds the image.
        dialog.appendChild(picture); // Adds the image.
        // JavaScript statement/expression: dialog.appendChild(body); // Adds the details.
        dialog.appendChild(body); // Adds the details.
        // JavaScript statement/expression: backdrop.appendChild(dialog); // Adds the window to the dark background.
        backdrop.appendChild(dialog); // Adds the window to the dark background.
        // JavaScript statement/expression: document.body.appendChild(backdrop); // Adds the background to the page.
        document.body.appendChild(backdrop); // Adds the background to the page.

        // JavaScript statement/expression: var opener = null; // Remembers which button opened the window.
        var opener = null; // Remembers which button opened the window.

        // JavaScript statement/expression: function close() { // Defines the function that closes the window.
        function close() { // Defines the function that closes the window.
            // JavaScript statement/expression: backdrop.hidden = true; // Hides the window.
            backdrop.hidden = true; // Hides the window.
            // JavaScript statement/expression: document.body.classList.remove("lightbox-open"); // Lets the page scroll again.
            document.body.classList.remove("lightbox-open"); // Lets the page scroll again.
            // JavaScript statement/expression: if (opener) { opener.focus(); } // Returns focus to the button that opened the window.
            if (opener) { opener.focus(); } // Returns focus to the button that opened the window.
        // JavaScript statement/expression: }
        }

        // The deal cards are rebuilt every time the filters change,
        // so one click listener on the document handles every Quick view button.
        // JavaScript statement/expression: document.addEventListener("click", function (event) { // Listens for clicks anywhere on the page.
        document.addEventListener("click", function (event) { // Listens for clicks anywhere on the page.
            // JavaScript statement/expression: var button = event.target.closest ? event.target.closest("[data-quickview]") : null; // Finds the Quick view b
            var button = event.target.closest ? event.target.closest("[data-quickview]") : null; // Finds the Quick view button that was clicked, if any.
            // JavaScript statement/expression: if (!button) { return; } // Ignores clicks that were not on a Quick view button.
            if (!button) { return; } // Ignores clicks that were not on a Quick view button.
            // JavaScript statement/expression: opener = button; // Remembers the button.
            opener = button; // Remembers the button.

            // JavaScript statement/expression: picture.src = button.getAttribute("data-img"); // Shows the product photo.
            picture.src = button.getAttribute("data-img"); // Shows the product photo.
            // JavaScript statement/expression: picture.alt = button.getAttribute("data-alt") || button.getAttribute("data-name"); // Sets the image descripti
            picture.alt = button.getAttribute("data-alt") || button.getAttribute("data-name"); // Sets the image description, using the full description when there is one.
            // JavaScript statement/expression: title.textContent = button.getAttribute("data-name"); // Sets the title.
            title.textContent = button.getAttribute("data-name"); // Sets the title.
            // JavaScript statement/expression: description.textContent = button.getAttribute("data-desc"); // Sets the description.
            description.textContent = button.getAttribute("data-desc"); // Sets the description.
            // JavaScript statement/expression: price.textContent = "R" + Number(button.getAttribute("data-price")).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g
            price.textContent = "R" + Number(button.getAttribute("data-price")).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Formats the price as Rand with spaces between thousands.
            // JavaScript statement/expression: badge.textContent = button.getAttribute("data-condition") === "new" ? "New" : "Second-hand"; // Sets the badge
            badge.textContent = button.getAttribute("data-condition") === "new" ? "New" : "Second-hand"; // Sets the badge text.
            // JavaScript statement/expression: badge.className = "badge " + (button.getAttribute("data-condition") === "new" ? "badge-new" : "badge-used"); /
            badge.className = "badge " + (button.getAttribute("data-condition") === "new" ? "badge-new" : "badge-used"); // Sets the badge colour class.

            // The existing Order Summary code listens for data-add on the whole document,
            // so setting these two attributes is enough to make the modal button work.
            // JavaScript statement/expression: addBtn.setAttribute("data-add", button.getAttribute("data-name")); // Passes the product name to the add butto
            addBtn.setAttribute("data-add", button.getAttribute("data-name")); // Passes the product name to the add button.
            // JavaScript statement/expression: addBtn.setAttribute("data-price", button.getAttribute("data-price")); // Passes the price to the add button.
            addBtn.setAttribute("data-price", button.getAttribute("data-price")); // Passes the price to the add button.

            // JavaScript statement/expression: backdrop.hidden = false; // Shows the window.
            backdrop.hidden = false; // Shows the window.
            // JavaScript statement/expression: document.body.classList.add("lightbox-open"); // Stops the page behind from scrolling.
            document.body.classList.add("lightbox-open"); // Stops the page behind from scrolling.
            // JavaScript statement/expression: closeBtn.focus(); // Moves focus to the close button.
            closeBtn.focus(); // Moves focus to the close button.
        // JavaScript statement/expression: });
        });

        // Adding an item closes the modal so the visitor sees the confirmation message.
        // JavaScript statement/expression: addBtn.addEventListener("click", function () { window.setTimeout(close, 0); }); // Closes the window shortly a
        addBtn.addEventListener("click", function () { window.setTimeout(close, 0); }); // Closes the window shortly after the product is added.
        // JavaScript statement/expression: closeBtn.addEventListener("click", close); // Closes the window when the close button is clicked.
        closeBtn.addEventListener("click", close); // Closes the window when the close button is clicked.
        // JavaScript statement/expression: backdrop.addEventListener("click", function (event) { // Listens for clicks on the dark background.
        backdrop.addEventListener("click", function (event) { // Listens for clicks on the dark background.
            // JavaScript statement/expression: if (event.target === backdrop) { close(); } // Closes when the background, not the window, is clicked.
            if (event.target === backdrop) { close(); } // Closes when the background, not the window, is clicked.
        // JavaScript statement/expression: });
        });
        // JavaScript statement/expression: backdrop.addEventListener("keydown", function (event) { // Listens for key presses in the window.
        backdrop.addEventListener("keydown", function (event) { // Listens for key presses in the window.
            // JavaScript statement/expression: if (event.key === "Escape") { close(); } // Closes on Escape.
            if (event.key === "Escape") { close(); } // Closes on Escape.
            // JavaScript statement/expression: trapFocus(event, dialog); // Keeps Tab focus inside the window.
            trapFocus(event, dialog); // Keeps Tab focus inside the window.
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: }
    }

    // ------------------------------------------------------
    // 4. FAQ ACCORDION
    // ------------------------------------------------------

    // JavaScript statement/expression: function initAccordion() { // Defines the function that sets up the FAQ accordions.
    function initAccordion() { // Defines the function that sets up the FAQ accordions.
        // JavaScript statement/expression: Array.prototype.forEach.call(document.querySelectorAll(".accordion"), function (group) { // Loops through ever
        Array.prototype.forEach.call(document.querySelectorAll(".accordion"), function (group) { // Loops through every accordion on the page.
            // JavaScript statement/expression: var items = group.querySelectorAll("details"); // Finds all the questions in the accordion.
            var items = group.querySelectorAll("details"); // Finds all the questions in the accordion.
            // JavaScript statement/expression: Array.prototype.forEach.call(items, function (item) { // Loops through each question.
            Array.prototype.forEach.call(items, function (item) { // Loops through each question.
                // When one answer opens, the others in the same group close.
                // JavaScript statement/expression: item.addEventListener("toggle", function () { // Listens for the question being opened or closed.
                item.addEventListener("toggle", function () { // Listens for the question being opened or closed.
                    // JavaScript statement/expression: if (!item.open) { return; } // Ignores the event when the question closed.
                    if (!item.open) { return; } // Ignores the event when the question closed.
                    // JavaScript statement/expression: Array.prototype.forEach.call(items, function (other) { // Loops through all the questions.
                    Array.prototype.forEach.call(items, function (other) { // Loops through all the questions.
                        // JavaScript statement/expression: if (other !== item) { other.open = false; } // Closes every other question.
                        if (other !== item) { other.open = false; } // Closes every other question.
                    // JavaScript statement/expression: });
                    });
                // JavaScript statement/expression: });
                });
            // JavaScript statement/expression: });
            });
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: }
    }

    // ------------------------------------------------------
    // 5. SCROLL REVEAL ANIMATION
    // ------------------------------------------------------

    // JavaScript statement/expression: function initReveal() { // Defines the function that sets up the scroll reveal.
    function initReveal() { // Defines the function that sets up the scroll reveal.
        // Older browsers simply show everything straight away.
        // JavaScript statement/expression: if (!("IntersectionObserver" in window)) { return; } // Stops when the browser does not support IntersectionOb
        if (!("IntersectionObserver" in window)) { return; } // Stops when the browser does not support IntersectionObserver.

        // JavaScript statement/expression: var targets = document.querySelectorAll("main article, main figure"); // Finds the elements to reveal.
        var targets = document.querySelectorAll("main article, main figure"); // Finds the elements to reveal.
        // JavaScript statement/expression: if (!targets.length) { return; } // Stops when there are none.
        if (!targets.length) { return; } // Stops when there are none.

        // JavaScript statement/expression: document.documentElement.classList.add("js-reveal"); // Adds a class that tells the CSS the effect is running.
        document.documentElement.classList.add("js-reveal"); // Adds a class that tells the CSS the effect is running.

        // JavaScript statement/expression: var observer = new IntersectionObserver(function (entries) { // Creates the observer that watches which elemen
        var observer = new IntersectionObserver(function (entries) { // Creates the observer that watches which elements are on screen.
            // JavaScript statement/expression: entries.forEach(function (entry) { // Loops through the changes.
            entries.forEach(function (entry) { // Loops through the changes.
                // JavaScript statement/expression: if (entry.isIntersecting) { // Checks whether the element has scrolled into view.
                if (entry.isIntersecting) { // Checks whether the element has scrolled into view.
                    // JavaScript statement/expression: entry.target.classList.add("is-visible"); // Makes it visible.
                    entry.target.classList.add("is-visible"); // Makes it visible.
                    // JavaScript statement/expression: observer.unobserve(entry.target); // Stops watching it once revealed.
                    observer.unobserve(entry.target); // Stops watching it once revealed.
                // JavaScript statement/expression: }
                }
            // JavaScript statement/expression: });
            });
        // JavaScript statement/expression: }, { threshold: 0.1 }); // Reveals an element when 10 percent of it is visible.
        }, { threshold: 0.1 }); // Reveals an element when 10 percent of it is visible.

        // JavaScript statement/expression: Array.prototype.forEach.call(targets, function (target) { // Loops through the elements.
        Array.prototype.forEach.call(targets, function (target) { // Loops through the elements.
            // JavaScript statement/expression: target.classList.add("reveal"); // Marks it as ready to reveal.
            target.classList.add("reveal"); // Marks it as ready to reveal.
            // JavaScript statement/expression: observer.observe(target); // Starts watching it.
            observer.observe(target); // Starts watching it.
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: }
    }

    // ------------------------------------------------------
    // MAP PERMISSION
    // The map tiles come from OpenStreetMap, so the map only loads after the visitor allows maps.
    // ------------------------------------------------------


    // The contact page lists the collection hubs as cards but has no map box, so this builds one
    // above the cards: a short heading, a "jump to a hub" dropdown and the empty map area.
    // JavaScript statement/expression: function injectHubMap() {
    function injectHubMap() {
        // JavaScript statement/expression: if (document.getElementById("hub-map")) { return; } // The page already has its own map box.
        if (document.getElementById("hub-map")) { return; } // The page already has its own map box.
        // JavaScript statement/expression: var cards = Array.prototype.filter.call(document.querySelectorAll("main article"), function (a) {
        var cards = Array.prototype.filter.call(document.querySelectorAll("main article"), function (a) {
            // JavaScript statement/expression: return /Collection hub/i.test(a.textContent);
            return /Collection hub/i.test(a.textContent);
        // JavaScript statement/expression: });
        });
        // JavaScript statement/expression: if (!cards.length) { return; } // Not a page that lists hubs.
        if (!cards.length) { return; } // Not a page that lists hubs.
        // JavaScript statement/expression: var grid = cards[0].parentElement;
        var grid = cards[0].parentElement;
        // JavaScript statement/expression: var wrap = make("div", "cc-hub-map-wrap");
        var wrap = make("div", "cc-hub-map-wrap");
        // JavaScript statement/expression: wrap.innerHTML =
        wrap.innerHTML =
            // JavaScript statement/expression: '<h3 class="text-xl font-extrabold text-[#0d1b3e]">Find a hub on the map</h3>' +
            '<h3 class="text-xl font-extrabold text-[#0d1b3e]">Find a hub on the map</h3>' +
            // JavaScript statement/expression: '<p class="mt-1 text-sm text-slate-600">Pick a hub to zoom to it, or tap a marker for the address and opening 
            '<p class="mt-1 text-sm text-slate-600">Pick a hub to zoom to it, or tap a marker for the address and opening hours.</p>' +
            // JavaScript statement/expression: '<div class="mt-4 max-w-sm"><label for="hub-select" class="mb-1.5 block text-sm font-bold text-[#0d1b3e]">Jump
            '<div class="mt-4 max-w-sm"><label for="hub-select" class="mb-1.5 block text-sm font-bold text-[#0d1b3e]">Jump to a hub</label>' +
            // JavaScript statement/expression: '<select id="hub-select" class="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-sl
            '<select id="hub-select" class="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-700 focus:border-[#0d1b3e] focus:outline-none focus:ring-2 focus:ring-[#ffd23f]"><option value="">All hubs</option></select></div>' +
            // JavaScript statement/expression: '<div id="hub-map" class="hub-map mt-4" role="region" aria-label="Map of Campus-Cart collection hubs"></div>';
            '<div id="hub-map" class="hub-map mt-4" role="region" aria-label="Map of Campus-Cart collection hubs"></div>';
        // JavaScript statement/expression: grid.parentElement.insertBefore(wrap, grid);
        grid.parentElement.insertBefore(wrap, grid);
    // JavaScript statement/expression: }
    }

    // gateHubMap: handles the gate hub map operation used by this feature.

    // JavaScript statement/expression: function gateHubMap() { // Waits for permission before loading the map.
    function gateHubMap() { // Waits for permission before loading the map.
        // JavaScript statement/expression: var box = document.getElementById("hub-map"); // Finds the map box on the page.
        var box = document.getElementById("hub-map"); // Finds the map box on the page.
        // JavaScript statement/expression: if (!box) { return; } // Stops when the page has no map box.
        if (!box) { return; } // Stops when the page has no map box.
        // JavaScript statement/expression: if (!window.CCConsent || window.CCConsent.allowed("maps")) { initHubMap(); return; } // Builds the map straigh
        if (!window.CCConsent || window.CCConsent.allowed("maps")) { initHubMap(); return; } // Builds the map straight away when maps are allowed.
        // JavaScript statement/expression: box.classList.add("map-unavailable"); // Reuses the message box styling.
        box.classList.add("map-unavailable"); // Reuses the message box styling.
        // JavaScript statement/expression: var text = document.createElement("p"); // Creates the message.
        var text = document.createElement("p"); // Creates the message.
        // JavaScript statement/expression: text.textContent = "The map uses OpenStreetMap, which receives your IP address when it loads, so it stays off 
        text.textContent = "The map uses OpenStreetMap, which receives your IP address when it loads, so it stays off until you allow it. You can still use the collection hub cards below."; // Explains why the map is blocked.
        // JavaScript statement/expression: var button = document.createElement("button"); // Creates the button.
        var button = document.createElement("button"); // Creates the button.
        // JavaScript statement/expression: button.type = "button"; // Makes it a plain button.
        button.type = "button"; // Makes it a plain button.
        // JavaScript statement/expression: button.className = "btn btn-sm"; // Gives it the button styling.
        button.className = "btn btn-sm"; // Gives it the button styling.
        // JavaScript statement/expression: button.textContent = "Allow maps and show the map"; // Sets the label.
        button.textContent = "Allow maps and show the map"; // Sets the label.
        // JavaScript statement/expression: button.addEventListener("click", function () { window.CCConsent.grant("maps"); }); // Records the visitor's pe
        button.addEventListener("click", function () { window.CCConsent.grant("maps"); }); // Records the visitor's permission.
        // JavaScript statement/expression: box.appendChild(text); // Adds the message to the map box.
        box.appendChild(text); // Adds the message to the map box.
        // JavaScript statement/expression: box.appendChild(button); // Adds the button to the map box.
        box.appendChild(button); // Adds the button to the map box.
        // JavaScript statement/expression: document.addEventListener("cc-consent-change", function onChange() { // Listens for the visitor changing their
        document.addEventListener("cc-consent-change", function onChange() { // Listens for the visitor changing their choices.
            // JavaScript statement/expression: if (!window.CCConsent.allowed("maps")) { return; } // Waits until maps are allowed.
            if (!window.CCConsent.allowed("maps")) { return; } // Waits until maps are allowed.
            // JavaScript statement/expression: document.removeEventListener("cc-consent-change", onChange); // Stops listening.
            document.removeEventListener("cc-consent-change", onChange); // Stops listening.
            // JavaScript statement/expression: box.classList.remove("map-unavailable"); // Removes the message styling.
            box.classList.remove("map-unavailable"); // Removes the message styling.
            // JavaScript statement/expression: box.textContent = ""; // Clears the message.
            box.textContent = ""; // Clears the message.
            // JavaScript statement/expression: initHubMap(); // Builds the map.
            initHubMap(); // Builds the map.
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: }
    }

    // ------------------------------------------------------
    // START
    // ------------------------------------------------------

    // JavaScript statement/expression: document.addEventListener("DOMContentLoaded", function () { // Runs when the page has finished loading.
    document.addEventListener("DOMContentLoaded", function () { // Runs when the page has finished loading.
        // JavaScript statement/expression: injectHubMap(); // Builds the map box on pages that list hubs but have no map.
        injectHubMap(); // Builds the map box on pages that list hubs but have no map.
        // JavaScript statement/expression: gateHubMap(); // Builds the hub map once maps are allowed.
        gateHubMap(); // Builds the hub map once maps are allowed.
        // JavaScript statement/expression: initLightbox(); // Sets up the lightbox.
        initLightbox(); // Sets up the lightbox.
        // JavaScript statement/expression: initQuickView(); // Sets up the quick view.
        initQuickView(); // Sets up the quick view.
        // JavaScript statement/expression: initAccordion(); // Sets up the accordions.
        initAccordion(); // Sets up the accordions.
        // JavaScript statement/expression: initReveal(); // Sets up the scroll reveal.
        initReveal(); // Sets up the scroll reveal.
    // JavaScript statement/expression: });
    });
// JavaScript statement/expression: })();
})();

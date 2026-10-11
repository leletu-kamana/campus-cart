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
// ==========================================================

(function () { // Wraps the features in a function so their variables stay private.
    "use strict"; // Turns on stricter error checking.

    // ------------------------------------------------------
    // SHARED HELPERS
    // ------------------------------------------------------

    // Creates an element, sets its class and text, and returns it.
    // Using textContent (not innerHTML) means text can never be read as HTML.
    function make(tag, className, text) { // Defines a helper that creates an element with a class and text.
        var node = document.createElement(tag); // Creates the element.
        if (className) { node.className = className; } // Sets the class name when one is given.
        if (text) { node.textContent = text; } // Sets the text when one is given.
        return node; // Returns the new element.
    }

    // Keeps Tab and Shift+Tab inside a dialog while it is open.
    function trapFocus(event, container) { // Defines a helper that keeps Tab focus inside a dialog.
        if (event.key !== "Tab") { return; } // Ignores every key except Tab.
        var items = container.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"); // Finds everything inside the dialog that can take focus.
        var visible = Array.prototype.filter.call(items, function (item) { return !item.disabled && !item.hidden; }); // Keeps only the items that are enabled and visible.
        if (!visible.length) { return; } // Stops if nothing can take focus.
        var first = visible[0]; // Stores the first focusable item.
        var last = visible[visible.length - 1]; // Stores the last focusable item.
        if (event.shiftKey && document.activeElement === first) { // Checks for Shift+Tab on the first item.
            event.preventDefault(); // Stops the browser from moving focus out of the dialog.
            last.focus(); // Moves focus to the last item instead.
        } else if (!event.shiftKey && document.activeElement === last) { // Checks for Tab on the last item.
            event.preventDefault(); // Stops the browser from moving focus out of the dialog.
            first.focus(); // Moves focus to the first item instead.
        }
    }

    // ------------------------------------------------------
    // 1. INTERACTIVE HUB MAP (Leaflet + OpenStreetMap)
    // ------------------------------------------------------

    // Approximate city-centre coordinates for each collection hub city.
    // The hub names, addresses and hours come from PROVINCES in data.js.
    var HUB_COORDS = { // Stores the map position (latitude and longitude) of each collection hub.
        "Gqeberha": [-33.9608, 25.6022], // Position of the Gqeberha hub.
        "Bloemfontein": [-29.0852, 26.1596], // Position of the Bloemfontein hub.
        "Johannesburg": [-26.1929, 28.0305], // Position of the Johannesburg hub.
        "Pretoria": [-25.7479, 28.2293], // Position of the Pretoria hub.
        "Durban": [-29.8179, 30.9420], // Position of the Durban hub.
        "Polokwane": [-23.9045, 29.4689], // Position of the Polokwane hub.
        "Mbombela": [-25.4753, 30.9694], // Position of the Mbombela hub.
        "Kimberley": [-28.7323, 24.7623], // Position of the Kimberley hub.
        "Potchefstroom": [-26.7145, 27.0970], // Position of the Potchefstroom hub.
        "Cape Town": [-33.9575, 18.4764] // Position of the Cape Town hub.
    };

    function initHubMap() { // Defines the function that builds the hub map.
        var box = document.getElementById("hub-map"); // Finds the map box on the page.
        if (!box) { return; } // Stops when the page has no map box.

        // If Leaflet or the hub data did not load, show a plain message instead of a blank box.
        if (typeof L === "undefined" || typeof PROVINCES === "undefined") { // Checks that the map library and the hub data have loaded.
            box.textContent = "The map could not be loaded. Please use the collection hub cards below."; // Shows a message when the map cannot be loaded.
            box.classList.add("map-unavailable"); // Adds the class that styles the message box.
            return; // Stops here.
        }

        // Builds one list of hubs (name, province, address, hours, coordinates).
        var hubs = []; // Creates a list to hold the hubs.
        PROVINCES.forEach(function (province) { // Loops through every province.
            province.hubs.forEach(function (hub) { // Loops through every hub in that province.
                if (HUB_COORDS[hub.city]) { // Only uses hubs that have map coordinates.
                    hubs.push({ // Adds a hub record to the list.
                        city: hub.city, // Stores the city name.
                        province: province.name, // Stores the province name.
                        address: hub.address, // Stores the street address.
                        hours: hub.hours, // Stores the opening hours.
                        coords: HUB_COORDS[hub.city] // Stores the map coordinates.
                    });
                }
            });
        });

        var map = L.map(box, { scrollWheelZoom: false }); // Creates the map inside the box with scroll-wheel zoom switched off.
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { // Loads the map tiles from OpenStreetMap.
            maxZoom: 18, // Sets the furthest zoom level.
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStreetMap</a> contributors" // Credits OpenStreetMap on the map.
        }).addTo(map); // Adds the tiles to the map.

        // Scroll-wheel zoom stays off until the map is clicked, so the page can still scroll past it.
        map.on("focus", function () { map.scrollWheelZoom.enable(); }); // Turns on scroll-wheel zoom when the map has keyboard focus.
        map.on("blur", function () { map.scrollWheelZoom.disable(); }); // Turns it off again when focus leaves the map.

        var markers = []; // Creates a list for the markers.
        var bounds = []; // Creates a list for the marker positions.
        hubs.forEach(function (hub, index) { // Loops through every hub.
            // Popup content is built with DOM methods so no text is treated as HTML.
            var popup = make("div", "map-popup"); // Creates the popup content box.
            popup.appendChild(make("strong", "", hub.city + ", " + hub.province)); // Adds the city and province in bold.
            popup.appendChild(make("p", "", hub.address)); // Adds the address.
            popup.appendChild(make("p", "", hub.hours)); // Adds the opening hours.

            var marker = L.marker(hub.coords, { title: hub.city + " collection hub", alt: hub.city + " collection hub" }) // Creates a marker with a title and alt text for accessibility.
                .addTo(map) // Adds the marker to the map.
                .bindPopup(popup); // Attaches the popup to the marker.
            markers.push(marker); // Saves the marker so the dropdown can open it.
            bounds.push(hub.coords); // Saves the position so the map can fit every hub.

            // Fills the "jump to a hub" dropdown at the same time.
            var select = document.getElementById("hub-select"); // Finds the hub dropdown.
            if (select) { // Checks that the dropdown exists.
                var option = document.createElement("option"); // Creates a dropdown option.
                option.value = String(index); // Sets the option value to the hub number.
                option.textContent = hub.city + ", " + hub.province; // Sets the option text.
                select.appendChild(option); // Adds the option to the dropdown.
            }
        });

        map.fitBounds(bounds, { padding: [30, 30] }); // Zooms the map so every hub is visible.

        // The dropdown gives keyboard and screen-reader users another way to reach each hub.
        var picker = document.getElementById("hub-select"); // Finds the hub dropdown again.
        if (picker) { // Checks that the dropdown exists.
            picker.addEventListener("change", function () { // Listens for a new choice in the dropdown.
                if (picker.value === "") { // Checks whether the empty first option was chosen.
                    map.fitBounds(bounds, { padding: [30, 30] }); // Shows every hub again.
                    map.closePopup(); // Closes any open popup.
                    return; // Stops here.
                }
                var chosen = hubs[Number(picker.value)]; // Finds the hub that was chosen.
                map.setView(chosen.coords, 11); // Moves the map to that hub.
                markers[Number(picker.value)].openPopup(); // Opens that hub's popup.
            });
        }

        // Makes sure the map redraws correctly if the layout changes size (for example rotating a phone).
        window.addEventListener("resize", function () { map.invalidateSize(); }); // Redraws the map correctly when the window is resized.
    }

    // ------------------------------------------------------
    // 2. IMAGE GALLERY LIGHTBOX
    // ------------------------------------------------------

    // Decides whether an image can be opened in the lightbox. Every photo in the page content can.
    // Logos, icons and other images that are links or buttons, map tiles, the viewer's own image
    // and purely decorative images (empty alt text) are left alone.
    function isViewable(img) { // Defines a helper that decides whether an image can open in the lightbox.
        if (!img.closest("main")) { return false; } // Ignores images outside the main content.
        if (img.closest("a, button, .lightbox, .modal, .leaflet-container, [data-no-lightbox]")) { return false; } // Ignores images inside links, buttons, the viewers, the map, or marked images.
        return img.getAttribute("alt") !== null && img.getAttribute("alt").trim() !== ""; // Only allows images that have meaningful alt text.
    }

    function initLightbox() { // Defines the function that builds the lightbox.
        if (!document.querySelector("main img")) { return; } // Stops when the page has no content images.

        // Builds the lightbox once and hides it until an image is chosen.
        var overlay = make("div", "lightbox"); // Creates the dark overlay.
        overlay.hidden = true; // Hides it to start with.
        overlay.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        overlay.setAttribute("aria-modal", "true"); // Tells assistive technology the page behind is inactive.
        overlay.setAttribute("aria-label", "Image viewer"); // Gives the dialog a name.

        var closeBtn = make("button", "lb-btn lb-close", "\u00D7"); // Creates the close button.
        closeBtn.type = "button"; // Makes it a plain button, not a form submit.
        closeBtn.setAttribute("aria-label", "Close image viewer"); // Gives it a text label for screen readers.

        var prevBtn = make("button", "lb-btn lb-prev", "\u2039"); // Creates the previous button.
        prevBtn.type = "button"; // Makes it a plain button.
        prevBtn.setAttribute("aria-label", "Previous image"); // Gives it a text label for screen readers.

        var nextBtn = make("button", "lb-btn lb-next", "\u203A"); // Creates the next button.
        nextBtn.type = "button"; // Makes it a plain button.
        nextBtn.setAttribute("aria-label", "Next image"); // Gives it a text label for screen readers.

        var figure = make("figure", "lb-figure"); // Creates the figure that holds the large image.
        var bigImage = make("img", "lb-image"); // Creates the large image.
        var caption = make("figcaption", "lb-caption"); // Creates the caption.
        var counter = make("p", "lb-count"); // Creates the image counter.
        figure.appendChild(bigImage); // Adds the image to the figure.
        figure.appendChild(caption); // Adds the caption.
        figure.appendChild(counter); // Adds the counter.

        overlay.appendChild(closeBtn); // Adds the close button to the overlay.
        overlay.appendChild(prevBtn); // Adds the previous button.
        overlay.appendChild(figure); // Adds the figure.
        overlay.appendChild(nextBtn); // Adds the next button.
        document.body.appendChild(overlay); // Adds the overlay to the page.

        var current = [];   // the images the viewer can move between
        var position = 0;   // which one is showing
        var opener = null;  // the thumbnail to return focus to

        // Next and previous move between the images that sit together: the same gallery,
        // card grid or section. Only images the visitor can currently see are included
        // (the gallery filter and the tabs hide some of them).
        function groupFor(img) { // Defines a helper that finds the images in the same group as a clicked image.
            var container = img.closest(".gallery, .grid, section") || document.querySelector("main"); // Looks for the nearest gallery, grid or section, or falls back to the main content.
            return Array.prototype.filter.call(container.querySelectorAll("img"), function (candidate) { // Returns the images in that group that can open in the lightbox.
                return isViewable(candidate) && !candidate.closest("[hidden]"); // Keeps an image only if it is viewable and not inside a hidden element.
            });
        }

        // The caption is the figure caption, or the heading of the card the image sits in, or the alt text.
        function captionFor(img) { // Defines a helper that finds the caption text for an image.
            var figcaption = img.closest("figure") ? img.closest("figure").querySelector("figcaption") : null; // Looks for a figcaption next to the image.
            if (figcaption) { return figcaption.textContent; } // Uses the figcaption text when there is one.
            var card = img.closest(".card"); // Otherwise looks for a product card.
            var heading = card ? card.querySelector("h3") : null; // Uses the card heading when there is one.
            return heading ? heading.textContent : img.alt; // Falls back to the image's alt text.
        }

        function show(index) { // Defines the function that shows one image.
            position = (index + current.length) % current.length; // Wraps around at both ends of the group.
            var img = current[position]; // Gets the image to show.
            bigImage.src = img.currentSrc || img.src; // Shows the sharpest source of that image.
            bigImage.alt = img.alt; // Copies the alt text.
            caption.textContent = captionFor(img); // Sets the caption.
            counter.textContent = "Image " + (position + 1) + " of " + current.length; // Sets the counter text.
            // Next and previous make no sense with a single image.
            prevBtn.hidden = nextBtn.hidden = current.length < 2; // Hides the arrow buttons when there is only one image.
        }

        function open(img) { // Defines the function that opens the lightbox.
            opener = img; // Remembers which image opened it so focus can return later.
            current = groupFor(img); // Builds the group of images to browse.
            show(current.indexOf(img)); // Shows the clicked image.
            overlay.hidden = false; // Reveals the overlay.
            document.body.classList.add("lightbox-open"); // Stops the page behind from scrolling.
            closeBtn.focus(); // Moves focus to the close button.
        }

        function close() { // Defines the function that closes the lightbox.
            overlay.hidden = true; // Hides the overlay.
            document.body.classList.remove("lightbox-open"); // Lets the page scroll again.
            if (opener) { opener.focus(); } // Returns focus to the image that opened the lightbox.
        }

        // Makes an image behave like a button for mouse, touch and keyboard users.
        function prepare(img) { // Defines a helper that makes one image behave like a button.
            if (!isViewable(img) || img.getAttribute("role") === "button") { return; } // Skips images that cannot open or are already set up.
            img.tabIndex = 0; // Lets keyboard users reach the image with Tab.
            img.setAttribute("role", "button"); // Tells assistive technology it acts as a button.
            img.setAttribute("aria-label", "View larger image: " + img.alt); // Gives it a label that describes the action.
        }

        Array.prototype.forEach.call(document.querySelectorAll("main img"), prepare); // Sets up every image that is already on the page.

        // Product cards are added by JavaScript after the page loads (and rebuilt when the filters change),
        // so new images are prepared as they appear.
        new MutationObserver(function (changes) { // Starts watching the page for images added later, such as product cards.
            changes.forEach(function (change) { // Loops through each change.
                Array.prototype.forEach.call(change.addedNodes, function (node) { // Loops through each node that was added.
                    if (node.nodeType !== 1) { return; } // Skips nodes that are not elements.
                    if (node.tagName === "IMG") { prepare(node); } // Sets up the node if it is an image.
                    Array.prototype.forEach.call(node.querySelectorAll("img"), prepare); // Sets up any images inside the node.
                });
            });
        }).observe(document.querySelector("main"), { childList: true, subtree: true }); // Watches the whole main area, including nested elements.

        // One click and one key listener on the page handle every image, including ones added later.
        document.addEventListener("click", function (event) { // Listens for clicks anywhere on the page.
            var img = event.target.closest ? event.target.closest("img") : null; // Finds the image that was clicked, if any.
            if (img && img.getAttribute("role") === "button" && isViewable(img)) { open(img); } // Opens the lightbox when a viewable image button is clicked.
        });
        document.addEventListener("keydown", function (event) { // Listens for key presses anywhere on the page.
            var img = event.target; // Gets the element that has focus.
            if (img && img.tagName === "IMG" && img.getAttribute("role") === "button" && // Checks that it is an image button.
                (event.key === "Enter" || event.key === " ")) { // Checks that Enter or Space was pressed.
                event.preventDefault(); // Stops Space from scrolling the page.
                open(img); // Opens the lightbox.
            }
        });

        closeBtn.addEventListener("click", close); // Closes the lightbox when the close button is clicked.
        prevBtn.addEventListener("click", function () { show(position - 1); }); // Shows the previous image.
        nextBtn.addEventListener("click", function () { show(position + 1); }); // Shows the next image.

        // Clicking the dark area around the picture closes the viewer.
        overlay.addEventListener("click", function (event) { // Listens for clicks on the overlay.
            if (event.target === overlay) { close(); } // Closes when the dark area, not the image, is clicked.
        });

        overlay.addEventListener("keydown", function (event) { // Listens for key presses inside the lightbox.
            if (event.key === "Escape") { close(); } // Closes on Escape.
            if (event.key === "ArrowLeft" && current.length > 1) { show(position - 1); } // Shows the previous image on the left arrow.
            if (event.key === "ArrowRight" && current.length > 1) { show(position + 1); } // Shows the next image on the right arrow.
            trapFocus(event, overlay); // Keeps Tab focus inside the lightbox.
        });

        // Swiping left or right changes image on phones.
        var touchStartX = null; // Remembers where a swipe started.
        overlay.addEventListener("touchstart", function (event) { // Listens for the start of a touch.
            touchStartX = event.changedTouches[0].clientX; // Stores the horizontal start position.
        }, { passive: true }); // Marks the listener as passive so scrolling stays smooth.
        overlay.addEventListener("touchend", function (event) { // Listens for the end of a touch.
            if (touchStartX === null || current.length < 2) { return; } // Ignores the touch if there was no start or only one image.
            var distance = event.changedTouches[0].clientX - touchStartX; // Works out how far the finger moved.
            if (Math.abs(distance) > 50) { show(distance > 0 ? position - 1 : position + 1); } // Treats a move of more than 50 pixels as a swipe and shows the previous or next image.
            touchStartX = null; // Resets the start position.
        }, { passive: true }); // Marks the listener as passive so scrolling stays smooth.
    }

    // ------------------------------------------------------
    // 3. PRODUCT QUICK-VIEW MODAL
    // ------------------------------------------------------

    function initQuickView() { // Defines the function that builds the product quick-view window.
        // Only pages that show deal cards need the modal.
        if (!document.getElementById("deals-results")) { return; } // Stops when the page has no product list.

        var backdrop = make("div", "modal-backdrop"); // Creates the dark background.
        backdrop.hidden = true; // Hides it to start with.

        var dialog = make("div", "modal"); // Creates the window.
        dialog.setAttribute("role", "dialog"); // Tells assistive technology it is a dialog.
        dialog.setAttribute("aria-modal", "true"); // Tells assistive technology the page behind is inactive.
        dialog.setAttribute("aria-labelledby", "modal-title"); // Links the window to its title.

        var closeBtn = make("button", "modal-close", "\u00D7"); // Creates the close button.
        closeBtn.type = "button"; // Makes it a plain button.
        closeBtn.setAttribute("aria-label", "Close product details"); // Gives it a text label for screen readers.

        var picture = make("img", "modal-image"); // Creates the product image.
        var body = make("div", "modal-body"); // Creates the details area.
        var badge = make("span", "badge"); // Creates the New or Second-hand badge.
        var title = make("h2", "", ""); // Creates the product title.
        title.id = "modal-title"; // Gives the title an ID that the window refers to.
        var price = make("p", "price"); // Creates the price line.
        var description = make("p"); // Creates the description paragraph.
        var addBtn = make("button", "btn", "Add to Order Summary"); // Creates the add button.
        addBtn.type = "button"; // Makes it a plain button.

        body.appendChild(badge); // Adds the badge to the details.
        body.appendChild(title); // Adds the title.
        body.appendChild(price); // Adds the price.
        body.appendChild(description); // Adds the description.
        body.appendChild(addBtn); // Adds the add button.
        dialog.appendChild(closeBtn); // Adds the close button to the window.
        dialog.appendChild(picture); // Adds the image.
        dialog.appendChild(body); // Adds the details.
        backdrop.appendChild(dialog); // Adds the window to the dark background.
        document.body.appendChild(backdrop); // Adds the background to the page.

        var opener = null; // Remembers which button opened the window.

        function close() { // Defines the function that closes the window.
            backdrop.hidden = true; // Hides the window.
            document.body.classList.remove("lightbox-open"); // Lets the page scroll again.
            if (opener) { opener.focus(); } // Returns focus to the button that opened the window.
        }

        // The deal cards are rebuilt every time the filters change,
        // so one click listener on the document handles every Quick view button.
        document.addEventListener("click", function (event) { // Listens for clicks anywhere on the page.
            var button = event.target.closest ? event.target.closest("[data-quickview]") : null; // Finds the Quick view button that was clicked, if any.
            if (!button) { return; } // Ignores clicks that were not on a Quick view button.
            opener = button; // Remembers the button.

            picture.src = button.getAttribute("data-img"); // Shows the product photo.
            picture.alt = button.getAttribute("data-name"); // Sets the image description.
            title.textContent = button.getAttribute("data-name"); // Sets the title.
            description.textContent = button.getAttribute("data-desc"); // Sets the description.
            price.textContent = "R" + Number(button.getAttribute("data-price")).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Formats the price as Rand with spaces between thousands.
            badge.textContent = button.getAttribute("data-condition") === "new" ? "New" : "Second-hand"; // Sets the badge text.
            badge.className = "badge " + (button.getAttribute("data-condition") === "new" ? "badge-new" : "badge-used"); // Sets the badge colour class.

            // The existing Order Summary code listens for data-add on the whole document,
            // so setting these two attributes is enough to make the modal button work.
            addBtn.setAttribute("data-add", button.getAttribute("data-name")); // Passes the product name to the add button.
            addBtn.setAttribute("data-price", button.getAttribute("data-price")); // Passes the price to the add button.

            backdrop.hidden = false; // Shows the window.
            document.body.classList.add("lightbox-open"); // Stops the page behind from scrolling.
            closeBtn.focus(); // Moves focus to the close button.
        });

        // Adding an item closes the modal so the visitor sees the confirmation message.
        addBtn.addEventListener("click", function () { window.setTimeout(close, 0); }); // Closes the window shortly after the product is added.
        closeBtn.addEventListener("click", close); // Closes the window when the close button is clicked.
        backdrop.addEventListener("click", function (event) { // Listens for clicks on the dark background.
            if (event.target === backdrop) { close(); } // Closes when the background, not the window, is clicked.
        });
        backdrop.addEventListener("keydown", function (event) { // Listens for key presses in the window.
            if (event.key === "Escape") { close(); } // Closes on Escape.
            trapFocus(event, dialog); // Keeps Tab focus inside the window.
        });
    }

    // ------------------------------------------------------
    // 4. FAQ ACCORDION
    // ------------------------------------------------------

    function initAccordion() { // Defines the function that sets up the FAQ accordions.
        Array.prototype.forEach.call(document.querySelectorAll(".accordion"), function (group) { // Loops through every accordion on the page.
            var items = group.querySelectorAll("details"); // Finds all the questions in the accordion.
            Array.prototype.forEach.call(items, function (item) { // Loops through each question.
                // When one answer opens, the others in the same group close.
                item.addEventListener("toggle", function () { // Listens for the question being opened or closed.
                    if (!item.open) { return; } // Ignores the event when the question closed.
                    Array.prototype.forEach.call(items, function (other) { // Loops through all the questions.
                        if (other !== item) { other.open = false; } // Closes every other question.
                    });
                });
            });
        });
    }

    // ------------------------------------------------------
    // 5. SCROLL REVEAL ANIMATION
    // ------------------------------------------------------

    function initReveal() { // Defines the function that sets up the scroll reveal.
        // Older browsers simply show everything straight away.
        if (!("IntersectionObserver" in window)) { return; } // Stops when the browser does not support IntersectionObserver.

        var targets = document.querySelectorAll("main .card, main .info-box, main .split-card, main .gallery figure"); // Finds the elements to reveal.
        if (!targets.length) { return; } // Stops when there are none.

        document.documentElement.classList.add("js-reveal"); // Adds a class that tells the CSS the effect is running.

        var observer = new IntersectionObserver(function (entries) { // Creates the observer that watches which elements are on screen.
            entries.forEach(function (entry) { // Loops through the changes.
                if (entry.isIntersecting) { // Checks whether the element has scrolled into view.
                    entry.target.classList.add("is-visible"); // Makes it visible.
                    observer.unobserve(entry.target); // Stops watching it once revealed.
                }
            });
        }, { threshold: 0.1 }); // Reveals an element when 10 percent of it is visible.

        Array.prototype.forEach.call(targets, function (target) { // Loops through the elements.
            target.classList.add("reveal"); // Marks it as ready to reveal.
            observer.observe(target); // Starts watching it.
        });
    }

    // ------------------------------------------------------
    // START
    // ------------------------------------------------------

    document.addEventListener("DOMContentLoaded", function () { // Runs when the page has finished loading.
        initHubMap(); // Builds the hub map.
        initLightbox(); // Sets up the lightbox.
        initQuickView(); // Sets up the quick view.
        initAccordion(); // Sets up the accordions.
        initReveal(); // Sets up the scroll reveal.
    });
})();

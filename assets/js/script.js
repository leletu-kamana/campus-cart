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
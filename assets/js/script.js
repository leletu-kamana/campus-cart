// ==========================================================
// CAMPUS-CART
// Navigation JavaScript
// Mobile menu toggle
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {

    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Stop if the navigation elements do not exist
    if (!navToggle || !navLinks) {
        return;
    }

    // Open / close the mobile navigation
    navToggle.addEventListener("click", function () {

        const isOpen =
            navLinks.classList.contains("open") ||
            navLinks.classList.contains("is-open");

        if (isOpen) {
            navLinks.classList.remove("open");
            navLinks.classList.remove("is-open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");
        } else {
            navLinks.classList.add("open");

            navToggle.setAttribute("aria-expanded", "true");
            navToggle.setAttribute("aria-label", "Close navigation menu");
        }
    });

    // Close the menu when a navigation link is selected
    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");
            navLinks.classList.remove("is-open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");
        });

    });

    // Close the menu when the Escape key is pressed
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navLinks.classList.remove("open");
            navLinks.classList.remove("is-open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");

            navToggle.focus();
        }

    });

    // If the screen becomes larger than the mobile breakpoint,
    // make sure the navigation is visible normally.
    window.addEventListener("resize", function () {

        if (window.innerWidth > 850) {

            navLinks.classList.remove("open");
            navLinks.classList.remove("is-open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");
        }

    });

});
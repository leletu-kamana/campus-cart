// ==========================================================
// CAMPUS-CART
// Navigation JavaScript
// Mobile menu toggle + generic tab switching
// ==========================================================


// Waits until the HTML page has finished loading before running the JavaScript.
document.addEventListener("DOMContentLoaded", function () {


    // ==========================================================
    // MOBILE NAVIGATION
    // ==========================================================

    // Finds the mobile navigation button.
    const navToggle = document.querySelector(".nav-toggle");

    // Finds the navigation links container.
    const navLinks = document.querySelector(".nav-links");


    // Checks if the navigation elements exist on the page.
    if (navToggle && navLinks) {


        // Adds a click event to the mobile navigation button.
        navToggle.addEventListener("click", function () {


            // Checks if the navigation menu is currently open.
            const isOpen =
                navLinks.classList.contains("open") ||
                navLinks.classList.contains("is-open");


            // Checks if the menu is already open.
            if (isOpen) {


                // Removes the open class from the navigation.
                navLinks.classList.remove("open");

                // Removes the is-open class from the navigation.
                navLinks.classList.remove("is-open");

                // Changes the accessibility value to closed.
                navToggle.setAttribute("aria-expanded", "false");

                // Changes the button label back to opening the menu.
                navToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


            // Runs when the navigation menu is closed.
            } else {


                // Adds the open class to show the navigation.
                navLinks.classList.add("open");

                // Changes the accessibility value to open.
                navToggle.setAttribute("aria-expanded", "true");

                // Changes the button label to closing the menu.
                navToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            }

        });


        // Finds all links inside the navigation menu.
        const links = navLinks.querySelectorAll("a");


        // Goes through each navigation link.
        links.forEach(function (link) {


            // Adds a click event to the navigation link.
            link.addEventListener("click", function () {


                // Closes the navigation menu.
                navLinks.classList.remove("open");

                // Removes the is-open class.
                navLinks.classList.remove("is-open");

                // Changes the accessibility value to closed.
                navToggle.setAttribute("aria-expanded", "false");

                // Changes the button label back to opening the menu.
                navToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        // Adds an event listener for keyboard actions.
        document.addEventListener("keydown", function (event) {


            // Checks if the Escape key was pressed.
            if (event.key === "Escape") {


                // Closes the navigation menu.
                navLinks.classList.remove("open");

                // Removes the is-open class.
                navLinks.classList.remove("is-open");

                // Changes the accessibility value to closed.
                navToggle.setAttribute("aria-expanded", "false");

                // Changes the button label back to opening the menu.
                navToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                // Moves the keyboard focus back to the navigation button.
                navToggle.focus();

            }

        });


        // Checks when the browser window changes size.
        window.addEventListener("resize", function () {


            // Checks if the screen is wider than 850 pixels.
            if (window.innerWidth > 850) {


                // Closes the mobile navigation.
                navLinks.classList.remove("open");

                // Removes the is-open class.
                navLinks.classList.remove("is-open");

                // Resets the accessibility value.
                navToggle.setAttribute("aria-expanded", "false");

                // Resets the navigation button label.
                navToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    }


        if (window.innerWidth > 850) {

            navLinks.classList.remove("open");
            navLinks.classList.remove("is-open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");
        }

    });

});
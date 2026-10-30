// ==========================================================
// CAMPUS-CART
// Forms JavaScript (ICE Task 4 / Part 3)
// - Enquiry form: validates, then shows a cost and availability response
// - Contact form: validates, then compiles an email the user can send
// ==========================================================

// Waits until the HTML page has finished loading before running the code.
document.addEventListener("DOMContentLoaded", function () { // Run setup after the HTML has been parsed.

    // Looks for each form on the current page. Only one of them exists on each page.
    const enquiryForm = document.getElementById("enquiry-form"); // Get the enquiry form, or null if this page has none.
    const contactForm = document.getElementById("contact-form"); // Get the contact form, or null if this page has none.

    // Starts the enquiry code only if the enquiry form is on this page.
    if (enquiryForm) { // Begin this block of code.
        loadStockFromFile(); // Execute this statement to update state or produce a result.
        setupEnquiryForm(enquiryForm); // Execute this statement to update state or produce a result.
    } // Close this block or callback.

    // (The coverage search lives in interactions.js.)

    // Starts the contact code only if the contact form is on this page.
    if (contactForm) { // Begin this block of code.
        setupContactForm(contactForm); // Execute this statement to update state or produce a result.
    } // Close this block or callback.
}); // Close this block or callback.


// ==========================================================
// SHARED HELPER FUNCTIONS
// ==========================================================

// ---------- Helpers that let this file work with the Tailwind markup ----------
// The pages hide things with the Tailwind "hidden" class, not the hidden attribute,
// and wrap each field in a plain <div>, so these small helpers cover both styles.
function groupOf(input) { // The wrapper that holds a field, its label and its error message.
    return input.closest("#enq-other-group") || input.closest(".form-group") || input.parentElement;
}
function isHiddenGroup(group) { // True when the wrapper is hidden by either method.
    return group.hidden || group.classList.contains("hidden");
}
function setHidden(el, hide) { // Hides or shows an element using both methods.
    el.hidden = hide;
    el.classList.toggle("hidden", hide);
}
function showBox(box, visible) { // Shows or hides a result box (enquiry result, email preview).
    box.classList.add("cc-result");
    box.classList.toggle("show", visible);
    box.classList.toggle("hidden", !visible);
    if (!visible) { box.innerHTML = ""; }
}
function showBox2(box) { // Shows a result box that already has its content.
    box.classList.add("cc-result", "show");
    box.classList.remove("hidden");
}
function productFor(name) { // Finds price and stock for an item, even if the stock table has no entry for it.
    if (STOCK[name]) { return STOCK[name]; }
    const found = (window.CC_CATALOGUE ? window.CC_CATALOGUE.DEALS : []).find(function (d) { return d.name === name; });
    return { price: found ? found.price : 0, stock: 5, type: found && found.condition === "used" ? "Second-hand" : "New" };
}

// ==========================================================
// WEB3FORMS DELIVERY
// Sends a validated form to the Campus-Cart inbox through Web3Forms.
// While it sends, the button shows "Sending..." and is disabled.
// If sending fails, the box that is already on screen still offers the
// "open in my email app" link, so the visitor can send it by email instead.
// ==========================================================
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa";

async function sendViaWeb3Forms(form, fields, box) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form); // Every named field in the form.
    formData.append("access_key", WEB3FORMS_KEY);
    Object.keys(fields).forEach(function (key) { formData.set(key, fields[key]); }); // subject, from_name, email, message.

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Adds a short status line at the top of the result box.
    function status(text, ok) {
        let line = box.querySelector(".cc-send-status");
        if (!line) {
            line = document.createElement("p");
            line.className = "cc-send-status";
            line.setAttribute("role", "status");
            line.style.cssText = "margin-bottom:.75rem;font-weight:700;";
            box.insertBefore(line, box.firstChild);
        }
        line.style.color = ok ? "#047857" : "#b91c1c";
        line.textContent = text;
    }

    try {
        const response = await fetch(WEB3FORMS_URL, { method: "POST", body: formData });
        const data = await response.json();
        if (response.ok) {
            status("Success! Your message has been sent.", true);
            form.reset();
        } else {
            status("Error: " + data.message + " You can still send it from your email app below.", false);
        }
    } catch (error) {
        status("Something went wrong. Please try again, or send it from your email app below.", false);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.dispatchEvent(new Event("input", { bubbles: true })); // Lets the form gate lock or unlock the submit button again.
    }
}

// Shows an error message under a field and marks the field as invalid for screen readers.
function showError(input, message) { // Begin this block of code.

    // Finds the empty <span> that sits next to this field and holds its error message.
    const errorBox = document.getElementById(input.id + "-error"); // Match the field ID to its error-message element.

    // Writes the message into the span, if the span exists.
    if (errorBox) { // Begin this block of code.
        errorBox.textContent = message; // Execute this statement to update state or produce a result.
        errorBox.classList.remove("hidden"); // The Tailwind pages keep empty error messages hidden.
    } // Close this block or callback.

    // Adds a CSS class so the field gets a red border.
    input.classList.add("input-error"); // Update or inspect the relevant form or page element.

    // Tells assistive technology that the value in this field is not valid.
    input.setAttribute("aria-invalid", "true"); // Update or inspect the relevant form or page element.
} // Close this block or callback.

// Clears the error message from a field.
function clearError(input) { // Begin this block of code.

    // Finds the error span for this field.
    const errorBox = document.getElementById(input.id + "-error"); // Declare a constant for use in this operation.

    // Empties the message text.
    if (errorBox) { // Begin this block of code.
        errorBox.textContent = ""; // Execute this statement to update state or produce a result.
        errorBox.classList.add("hidden"); // Hides the empty message again.
    } // Close this block or callback.

    // Removes the red border and the invalid flag.
    input.classList.remove("input-error"); // Update or inspect the relevant form or page element.
    input.removeAttribute("aria-invalid"); // Update or inspect the relevant form or page element.
} // Close this block or callback.

// Checks an email address against a simple pattern: text, an @ sign, text, a dot, text.
function isValidEmail(value) { // Begin this block of code.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Return the result to the code that called this function.
} // Close this block or callback.

// Checks a South African style phone number. Spaces, dashes and a +27 start are allowed.
function isValidPhone(value) { // Begin this block of code.

    // Removes spaces, dashes and brackets so only digits (and a possible +) remain.
    const cleaned = value.replace(/[\s\-()]/g, ""); // Remove formatting characters before checking the number.

    // Accepts 0 followed by 9 digits (e.g. 0821234567) or +27 followed by 9 digits.
    return /^(0\d{9}|\+27\d{9})$/.test(cleaned); // Return the result to the code that called this function.
} // Close this block or callback.

// Formats a number as South African Rand, e.g. 2799 becomes "R2 799.00".
function formatRand(amount) { // Begin this block of code.

    // toFixed(2) gives two decimal places. The regular expression adds a space every 3 digits.
    return "R" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Return the result to the code that called this function.
} // Close this block or callback.

// Removes the "dirty" state from every field in a form when the user starts typing again.
function clearErrorsOnInput(form) { // Begin this block of code.

    // Listens for typing/changes anywhere in the form (event bubbling).
    form.addEventListener("input", function (event) { // Begin this block of code.

        // Only fields (not buttons) are cleared.
        if (event.target.id) { // Begin this block of code.
            clearError(event.target); // Execute this statement to update state or produce a result.
        } // Close this block or callback.
    }); // Close this block or callback.
} // Close this block or callback.


// ==========================================================
// STEP-BY-STEP FORM GATE
// ==========================================================

// Stops a visitor from continuing with a form until the current field is correct.
// "steps" is the list of fields in the order they are filled in. Each step has:
//   input - the field,  label - its name for the status message,
//   check - a function that returns an error message, or "" when the field is fine.
// A field after an invalid one is locked (made inert, so it cannot be clicked or tabbed to),
// and the submit button stays disabled until every field is valid.
function setupFormGate(form, steps) { // Begin this block of code.

    const submitButton = form.querySelector("[type=submit]"); // Find the form submit button.

    // A short message above the button tells the visitor what to do next.
    const status = document.createElement("p"); // Declare a constant for use in this operation.
    status.className = "gate-status"; // Update or inspect the relevant form or page element.
    status.setAttribute("aria-live", "polite"); // Announce status updates to assistive technology.
    submitButton.parentNode.insertBefore(status, submitButton); // Update or inspect the relevant form or page element.

    // Works out which fields are locked and whether the form can be submitted.
    function refresh() { // Begin this block of code.
        let blockedBy = null; // Store the first invalid step that blocks later fields.

        steps.forEach(function (step) { // Begin this block of code.
            const group = groupOf(step.input); // Declare a constant for use in this operation.

            // Fields that are hidden right now (such as "Name of your institution") are not part of the path.
            if (isHiddenGroup(group)) { // Begin this block of code.
                group.inert = false; // Update or inspect the relevant form or page element.
                return; // Execute this statement to update state or produce a result.
            } // Close this block or callback.

            // Everything after the first invalid field is locked.
            const locked = blockedBy !== null; // Declare a constant for use in this operation.
            group.inert = locked; // Prevent interaction with fields that are not ready yet.
            group.classList.toggle("field-locked", locked); // Update or inspect the relevant form or page element.

            if (!locked && step.check() !== "") { // Begin this block of code.
                blockedBy = step; // Execute this statement to update state or produce a result.
            } // Close this block or callback.
        }); // Close this block or callback.

        submitButton.disabled = blockedBy !== null; // Enable submit only when all visible steps pass.
        status.textContent = blockedBy // Update or inspect the relevant form or page element.
            ? "To continue, please complete \u201C" + blockedBy.label + "\u201D correctly." // This line contributes to the current expression or data structure.
            : "All details look good. You can continue."; // Execute this statement to update state or produce a result.
    } // Close this block or callback.

    // Checks again whenever the visitor types, picks an option or the browser autofills.
    form.addEventListener("input", refresh); // Register a callback for this event.
    form.addEventListener("change", refresh); // Register a callback for this event.

    // When the visitor leaves a field, its error appears straight away so they know what to fix.
    steps.forEach(function (step) { // Begin this block of code.
        step.input.addEventListener("blur", function () { // Begin this block of code.
            const message = step.check(); // Declare a constant for use in this operation.
            if (message !== "") { // Begin this block of code.
                showError(step.input, message); // Execute this statement to update state or produce a result.
            } else { // Begin this block of code.
                clearError(step.input); // Execute this statement to update state or produce a result.
            } // Close this block or callback.
        }); // Close this block or callback.
    }); // Close this block or callback.

    refresh(); // Execute this statement to update state or produce a result.
} // Close this block or callback.


// ==========================================================
// ENQUIRY FORM
// ==========================================================

// Illustrative stock levels for the demo site. The site has no database,
// so the availability response is worked out from this table.
const STOCK = { // Demo catalogue: each product has a price, quantity available and condition.
    "Basic Starter Bundle":       { price: 1499, stock: 12, type: "New" }, // Continue building the text value used in this operation.
    "Standard Starter Bundle":    { price: 2799, stock: 8,  type: "New" }, // Continue building the text value used in this operation.
    "Premium Starter Bundle":     { price: 4499, stock: 3,  type: "New" }, // Continue building the text value used in this operation.
    "Duvet & Linen Set (Double)": { price: 749,  stock: 20, type: "New" }, // Continue building the text value used in this operation.
    "Electric Kettle 1.7L":       { price: 289,  stock: 25, type: "New" }, // Continue building the text value used in this operation.
    "Stationery Mega Pack":       { price: 249,  stock: 30, type: "New" }, // Continue building the text value used in this operation.
    "Load-Shedding Light Kit":    { price: 329,  stock: 0,  type: "New" }, // Continue building the text value used in this operation.
    "Study Desk":                 { price: 650,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    "Mini Bar Fridge":            { price: 1150, stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    "Accounting Textbook Set":    { price: 420,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    "Laptop Bag 15\"":            { price: 180,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    "Two-Tier Bookshelf":         { price: 380,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    "Study Chair":                { price: 450,  stock: 1,  type: "Second-hand" } // Continue building the text value used in this operation.
}; // Close the current code block.

// Loads the latest stock levels from assets/data/stock.json using AJAX (fetch),
// so the enquiry page can be updated without editing any JavaScript.
// If the file cannot be loaded (for example when the page is opened straight from a
// folder instead of a web server), the built-in STOCK table above is used instead.
function loadStockFromFile() { // Begin this block of code.
    if (typeof fetch !== "function") { return; } // Keep the built-in stock table if fetch is unavailable.

    fetch("../assets/data/stock.json", { cache: "no-cache" }) // Request fresh stock data instead of a cached copy.
        .then(function (response) { // Begin this block of code.
            if (!response.ok) { throw new Error("Stock file not found"); } // Run this block only when the condition is true.
            return response.json(); // Return the result to the code that called this function.
        }) // Close the current code block.
        .then(function (data) { // Begin this block of code.
            Object.keys(data).forEach(function (name) { // Begin this block of code.
                const item = data[name]; // Declare a constant for use in this operation.
                // Only accept entries that have the expected number fields.
                if (item && typeof item.price === "number" && typeof item.stock === "number") { // Begin this block of code.
                    STOCK[name] = { price: item.price, stock: item.stock, type: String(item.type) }; // Execute this statement to update state or produce a result.
                } // Close this block or callback.
            }); // Close this block or callback.
        }) // Close the current code block.
        .catch(function () { // Begin this block of code.
            // Keep the built-in table. The enquiry form still works.
        }); // Close this block or callback.
} // Close this block or callback.

// Adds working days to a date, skipping Saturdays and Sundays (public holidays are not counted).
function addWorkingDays(start, days) { // Begin this block of code.
    const d = new Date(start); // Copy the starting date so the original value is unchanged.
    while (days > 0) { // Begin this block of code.
        d.setDate(d.getDate() + 1); // Execute this statement to update state or produce a result.
        // getDay() returns 0 for Sunday and 6 for Saturday.
        if (d.getDay() !== 0 && d.getDay() !== 6) { days--; } // Run this block only when the condition is true.
    } // Close this block or callback.
    return d; // Return the result to the code that called this function.
} // Close this block or callback.

// Formats a date like "Thu, 8 Oct 2026" for South African readers.
function formatDate(d) { // Begin this block of code.
    return d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" }); // Return the result to the code that called this function.
} // Close this block or callback.

// Finds the province object for the chosen province code.
function getProvince(code) { // Begin this block of code.
    return PROVINCES.find(function (p) { return p.code === code; }); // Return the result to the code that called this function.
} // Close this block or callback.

function setupEnquiryForm(form) { // Begin this block of code.

    // Finds the fields that the code needs to read.
    const enquirerType = document.getElementById("enq-type"); // Declare a constant for use in this operation.
    const name = document.getElementById("enq-name"); // Declare a constant for use in this operation.
    const email = document.getElementById("enq-email"); // Declare a constant for use in this operation.
    const item = document.getElementById("enq-item"); // Declare a constant for use in this operation.
    const quantity = document.getElementById("enq-qty"); // Declare a constant for use in this operation.
    const method = document.getElementById("enq-method"); // Declare a constant for use in this operation.
    const province = document.getElementById("enq-province"); // Declare a constant for use in this operation.
    const institution = document.getElementById("enq-institution"); // Declare a constant for use in this operation.
    const result = document.getElementById("enquiry-result"); // Declare a constant for use in this operation.

    // Fills the province list from data.js (one option per province).
    PROVINCES.forEach(function (p) { // Begin this block of code.
        province.add(new Option(p.name, p.code)); // Update or inspect the relevant form or page element.
    }); // Close this block or callback.

    // The extra text box for an institution that is not on the list.
    const otherGroup = document.getElementById("enq-other-group"); // Declare a constant for use in this operation.
    const other = document.getElementById("enq-other"); // Declare a constant for use in this operation.

    // Adds one <optgroup> (a labelled group of options) to the institution list.
    function addGroup(label, names) { // Begin this block of code.
        if (names.length === 0) { return; } // Run this block only when the condition is true.
        const group = document.createElement("optgroup"); // Declare a constant for use in this operation.
        group.label = label; // Update or inspect the relevant form or page element.
        names.forEach(function (n) { group.appendChild(new Option(n, n)); }); // Run this callback once for each item in the collection.
        institution.appendChild(group); // Update or inspect the relevant form or page element.
    } // Close this block or callback.

    // When a province is chosen, fills the institution list with that province's public and private institutions.
    province.addEventListener("change", function () { // Begin this block of code.
        // Removes every option and group after the first "Choose..." option.
        // (Setting institution.length = 1 can leave empty <optgroup> elements behind.)
        while (institution.children.length > 1) { // Begin this block of code.
            institution.removeChild(institution.lastChild); // Update or inspect the relevant form or page element.
        } // Close this block or callback.
        setHidden(otherGroup, true); // Execute this statement to update state or produce a result.
        const chosen = getProvince(province.value); // Declare a constant for use in this operation.
        if (!chosen) { // Begin this block of code.
            institution.options[0].text = "Choose a province first..."; // Update or inspect the relevant form or page element.
            institution.disabled = true; // Update or inspect the relevant form or page element.
            return; // Execute this statement to update state or produce a result.
        } // Close this block or callback.
        institution.options[0].text = "Choose your institution..."; // Update or inspect the relevant form or page element.

        // Filters the province's institutions by type and adds a group for each type.
        function namesOfType(type) { // Begin this block of code.
            return chosen.institutions.filter(function (i) { return i.type === type; }) // Return the result to the code that called this function.
                                      .map(function (i) { return i.name; }); // Execute this statement to update state or produce a result.
        } // Close this block or callback.
        addGroup("Public universities", namesOfType("University")); // Execute this statement to update state or produce a result.
        addGroup("Public TVET colleges", namesOfType("TVET college")); // Execute this statement to update state or produce a result.
        addGroup("Private institutions in " + chosen.name, namesOfType("Private institution")); // Execute this statement to update state or produce a result.
        addGroup("National private providers", NATIONAL_PRIVATE); // Execute this statement to update state or produce a result.
        addGroup("Not on the list?", ["My institution is not listed"]); // Execute this statement to update state or produce a result.
        institution.disabled = false; // Update or inspect the relevant form or page element.
    }); // Close this block or callback.

    // Shows the extra text box when the user picks "My institution is not listed".
    institution.addEventListener("change", function () { // Begin this block of code.
        setHidden(otherGroup, institution.value !== "My institution is not listed"); // Execute this statement to update state or produce a result.
    }); // Close this block or callback.

    // Clears a field's error message as soon as the user edits that field.
    clearErrorsOnInput(form); // Execute this statement to update state or produce a result.

    // The fields in the order the visitor fills them in. Each check returns an error message,
    // or "" when the field is fine. The same checks lock the later fields (setupFormGate)
    // and are used again when the form is submitted.
    const steps = [ // Declare a constant for use in this operation.
        { input: enquirerType, label: "I am a", check: function () { // Begin this block of code.
            return enquirerType.value === "" ? "Please choose whether you are a student or a parent." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: name, label: "Full name", check: function () { // Begin this block of code.
            return name.value.trim().length < 2 ? "Please enter your full name (at least 2 characters)." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: email, label: "Email address", check: function () { // Begin this block of code.
            return !isValidEmail(email.value.trim()) ? "Please enter a valid email address, e.g. you@example.co.za." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: item, label: "Bundle or product", check: function () { // Begin this block of code.
            return item.value === "" ? "Please choose a bundle or product." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: quantity, label: "Quantity", check: function () { // Begin this block of code.
            const amount = Number(quantity.value); // Declare a constant for use in this operation.
            return (quantity.value === "" || !Number.isInteger(amount) || amount < 1 || amount > 10) ? "Please enter a whole number from 1 to 10." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: method, label: "How do you want to get it?", check: function () { // Begin this block of code.
            return method.value === "" ? "Please choose delivery or collection." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: province, label: "Province", check: function () { // Begin this block of code.
            return province.value === "" ? "Please choose your province." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: institution, label: "Institution", check: function () { // Begin this block of code.
            return institution.value === "" ? "Please choose your institution." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: other, label: "Name of your institution", check: function () { // Begin this block of code.
            // If the institution is not on the list, the user must type its name.
            return (institution.value === "My institution is not listed" && other.value.trim().length < 3) ? "Please type the name of your institution." : ""; // Return the result to the code that called this function.
        } } // Close the current code block.
    ]; // Finish this array or object definition.

    setupFormGate(form, steps); // Execute this statement to update state or produce a result.

    // Runs when the user presses the submit button.
    form.addEventListener("submit", function (event) { // Begin this block of code.

        // Stops the browser from reloading the page.
        event.preventDefault(); // Execute this statement to update state or produce a result.

        // Clears the previous response.
        showBox(result, false);

        let valid = true; // Declare a variable whose value may change.
        let firstBad = null; // Declare a variable whose value may change.

        // Records the error and remembers the first invalid field.
        function fail(input, message) { // Begin this block of code.
            showError(input, message); // Execute this statement to update state or produce a result.
            valid = false; // Execute this statement to update state or produce a result.
            if (!firstBad) { firstBad = input; } // Run this block only when the condition is true.
        } // Close this block or callback.

        // Runs every check from the steps list. Fields that are hidden right now are skipped.
        steps.forEach(function (step) { // Begin this block of code.
            if (isHiddenGroup(groupOf(step.input))) { return; } // Run this block only when the condition is true.
            const message = step.check(); // Declare a constant for use in this operation.
            if (message !== "") { fail(step.input, message); } // Run this block only when the condition is true.
        }); // Close this block or callback.
        const qty = Number(quantity.value); // Convert the quantity field text into a number for calculations.

        // Stops here and moves the cursor to the first problem field.
        if (!valid) { // Begin this block of code.
            firstBad.focus(); // Execute this statement to update state or produce a result.
            return; // Execute this statement to update state or produce a result.
        } // Close this block or callback.

        // ----- Processing: work out the response from the validated input -----
        const product = productFor(item.value); // Find the selected product in the stock catalogue.
        const total = product.price * qty; // Calculate the estimated total before delivery fees.
        const prov = getProvince(province.value); // Declare a constant for use in this operation.
        // Looks the institution up. National private providers and typed-in institutions have no town,
        // so the province's typical delivery time is used for them.
        let inst = prov.institutions.find(function (i) { return i.name === institution.value; }); // Declare a variable whose value may change.
        if (!inst) { // Begin this block of code.
            const typed = institution.value === "My institution is not listed"; // Declare a constant for use in this operation.
            inst = { name: typed ? other.value.trim() : institution.value, type: "Private institution", city: "" }; // Execute this statement to update state or produce a result.
        } // Close this block or callback.

        // Availability message from the stock table.
        let availability; // Declare a variable whose value may change.
        let statusClass; // Declare a variable whose value may change.
        if (product.stock === 0) { // Begin this block of code.
            availability = "Currently out of stock. Send us a message and we will notify you when it is back."; // Set the message shown for this stock situation.
            statusClass = "status-out"; // Choose the CSS class used to style this status.
        } else if (product.type === "Second-hand" && qty > 1) { // Begin this block of code.
            availability = "This second-hand item is a single listing, so only 1 is available."; // Set the message shown for this stock situation.
            statusClass = "status-low"; // Choose the CSS class used to style this status.
        } else if (qty > product.stock) { // Begin this block of code.
            availability = "Only " + product.stock + " in stock. We can reserve " + product.stock + " now and the rest on the next restock."; // Set the message shown for this stock situation.
            statusClass = "status-low"; // Choose the CSS class used to style this status.
        } else { // Begin this block of code.
            availability = "In stock. We can reserve " + qty + " for you."; // Set the message shown for this stock situation.
            statusClass = "status-ok"; // Choose the CSS class used to style this status.
        } // Close this block or callback.

        // Delivery working days: 1 if the institution is in a hub city, otherwise the province's typical time.
        const inHubCity = prov.hubs.some(function (h) { return h.city === inst.city; }); // Declare a constant for use in this operation.
        const leadDays = inHubCity ? 1 : prov.leadDays; // Declare a constant for use in this operation.

        // Orders placed before 12:00 on a weekday are dispatched the same day; later orders count from the next working day.
        const now = new Date(); // Use the current local date and time for the estimate.
        const afterCutoff = now.getHours() >= 12 || now.getDay() === 0 || now.getDay() === 6; // Declare a constant for use in this operation.
        const readyBy = addWorkingDays(now, leadDays + (afterCutoff ? 1 : 0)); // Declare a constant for use in this operation.

        // Builds the delivery or collection lines for the response.
        let deliveryHtml; // Declare a variable whose value may change.
        let deliveryText; // Declare a variable whose value may change.
        if (method.value === "Delivery") { // Begin this block of code.
            deliveryText = "Delivery to " + inst.name + (inst.city ? " (" + inst.city + ")" : "") + ", " + prov.name; // Build the plain-text delivery or collection summary.
            deliveryHtml = // Build the HTML list shown in the result.
                "<li><strong>Delivery to:</strong> " + escapeHtml(inst.name) + (inst.city ? ", " + escapeHtml(inst.city) : "") + ", " + prov.name + "</li>" + // Continue building the text value used in this operation.
                "<li><strong>Earliest arrival:</strong> " + formatDate(readyBy) + " (" + leadDays + " working day" + (leadDays > 1 ? "s" : "") + ")</li>" + // Continue building the text value used in this operation.
                "<li><strong>Handover window:</strong> Mon-Fri 10:00-16:00 at the student centre or main gate. Bring your student card.</li>" + // Continue building the text value used in this operation.
                "<li><strong>Delivery fee:</strong> quoted and confirmed before you pay.</li>"; // Continue building the text value used in this operation.
        } else { // Begin this block of code.
            const hub = prov.hubs[0]; // Declare a constant for use in this operation.
            deliveryText = "Collection at the " + hub.city + " hub, " + prov.name; // Build the plain-text delivery or collection summary.
            deliveryHtml = // Build the HTML list shown in the result.
                "<li><strong>Collect from:</strong> " + hub.city + " hub, " + escapeHtml(hub.address) + "</li>" + // Continue building the text value used in this operation.
                "<li><strong>Hub hours:</strong> " + hub.hours + "</li>" + // Continue building the text value used in this operation.
                "<li><strong>Ready from:</strong> " + formatDate(addWorkingDays(now, afterCutoff ? 2 : 1)) + ". Collection is free.</li>"; // Continue building the text value used in this operation.
        } // Close this block or callback.

        // Builds the pre-filled email the user can send to confirm.
        // It follows a professional layout: a subject that names the request, a polite greeting,
        // the order details, a clear request and a courteous closing.
        const subject = "Availability Enquiry \u2013 " + item.value; // Declare a constant for use in this operation.
        const body = // Declare a constant for use in this operation.
            "Dear Campus-Cart Team,\r\n\r\n" + // Continue building the text value used in this operation.
            "I am writing to enquire about the availability of the item below and, if it is available, to arrange to purchase it.\r\n\r\n" + // Continue building the text value used in this operation.
            "Item: " + item.value + "\r\n" + // Continue building the text value used in this operation.
            "Quantity: " + qty + "\r\n" + // Continue building the text value used in this operation.
            "Estimated total: " + formatRand(total) + "\r\n" + // Continue building the text value used in this operation.
            "Order method: " + deliveryText + "\r\n" + // Continue building the text value used in this operation.
            "Institution: " + inst.name + " (" + prov.name + ")\r\n\r\n" + // Continue building the text value used in this operation.
            "Could you please confirm that the item is available and let me know the next steps for payment and " + // Continue building the text value used in this operation.
            (method.value === "Delivery" ? "delivery" : "collection") + "?\r\n\r\n" + // This line contributes to the current expression or data structure.
            "Thank you for your assistance. I look forward to your response.\r\n\r\n" + // Continue building the text value used in this operation.
            "Kind regards,\r\n" + // Continue building the text value used in this operation.
            name.value.trim() + "\r\n" + // This line contributes to the current expression or data structure.
            "(" + enquirerType.value + ")\r\n" + // Continue building the text value used in this operation.
            "Email: " + email.value.trim(); // Continue building the text value used in this operation.
        const mailto = "mailto:" + (form.dataset.mailto || "enquiries@campus-cart.co.za") + // Build a link that opens the visitor’s email application.
            "?subject=" + encodeURIComponent(subject) + // Continue building the text value used in this operation.
            "&body=" + encodeURIComponent(body); // Continue building the text value used in this operation.

        // innerHTML is used because the response needs headings and a list.
        // User-typed text goes through escapeHtml() first so it cannot inject markup.
        result.innerHTML = // Update or inspect the relevant form or page element.
            "<h3>Thank you, " + escapeHtml(name.value.trim()) + "</h3>" + // Continue building the text value used in this operation.
            "<p class=\"" + statusClass + "\"><strong>Availability:</strong> " + availability + "</p>" + // Continue building the text value used in this operation.
            "<ul>" + // Continue building the text value used in this operation.
            "<li><strong>Item:</strong> " + escapeHtml(item.value) + " (" + product.type + ")</li>" + // Continue building the text value used in this operation.
            "<li><strong>Unit price:</strong> " + formatRand(product.price) + "</li>" + // Continue building the text value used in this operation.
            "<li><strong>Quantity:</strong> " + qty + "</li>" + // Continue building the text value used in this operation.
            "<li><strong>Estimated total:</strong> " + formatRand(total) + "</li>" + // Continue building the text value used in this operation.
            deliveryHtml + // This line contributes to the current expression or data structure.
            "</ul>" + // Continue building the text value used in this operation.
            "<p class=\"hint\">Estimates exclude public holidays. Stock, prices and delivery times are illustrative for this demo site.</p>" + // Continue building the text value used in this operation.
            "<a class=\"cc-btn\" href=\"#\">Email this enquiry to us</a>"; // Continue building the text value used in this operation.

        // Sets the mailto link through the DOM so the & characters in it are never misread as HTML.
        result.querySelector("a.cc-btn").href = mailto; // Update or inspect the relevant form or page element.

        showBox2(result);
        sendViaWeb3Forms(form, { subject: subject, from_name: name.value.trim(), email: email.value.trim(), message: body }, result);
        result.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Update or inspect the relevant form or page element.
    }); // Close this block or callback.
} // Close this block or callback.

// Replaces characters that have a special meaning in HTML so user text cannot inject markup.
function escapeHtml(text) { // Begin this block of code.
    return text // Return the result to the code that called this function.
        .replace(/&/g, "&amp;") // This line contributes to the current expression or data structure.
        .replace(/</g, "&lt;") // This line contributes to the current expression or data structure.
        .replace(/>/g, "&gt;") // This line contributes to the current expression or data structure.
        .replace(/"/g, "&quot;"); // Execute this statement to update state or produce a result.
} // Close this block or callback.


// ==========================================================
// CONTACT EMAIL WORDING
// ==========================================================

// The answer in the "What would you like us to do?" list that needs a phone number.
const CALL_BACK = "Call or WhatsApp me"; // Shared option text used to decide whether a phone number is required.

// Turns the chosen outcome into a polite sentence for the email.
function outcomeSentence(choice, phoneNumber) { // Begin this block of code.
    if (choice === CALL_BACK) { // Begin this block of code.
        return "I would appreciate it if you could call or WhatsApp me on " + phoneNumber + "."; // Return the result to the code that called this function.
    } // Close this block or callback.
    if (choice === "Arrange a refund") { // Begin this block of code.
        return "I would appreciate it if you could arrange a refund for me."; // Return the result to the code that called this function.
    } // Close this block or callback.
    if (choice === "Arrange a replacement or swap") { // Begin this block of code.
        return "I would appreciate it if you could arrange a replacement or swap for me."; // Return the result to the code that called this function.
    } // Close this block or callback.
    if (choice === "Update me on my order") { // Begin this block of code.
        return "I would appreciate an update on the status of my order."; // Return the result to the code that called this function.
    } // Close this block or callback.
    return "I would appreciate a reply by email with the information I have requested."; // Return the result to the code that called this function.
} // Close this block or callback.

// Builds a clear subject line that names the problem or request, like
// "Complaint Regarding Order CC-1025" or "Order and Collection Query \u2013 Thandi Mokoena".
function buildContactSubject(topicText, orderRef, fullName) { // Begin this block of code.
    const labels = { // Convert form topic labels into concise email subject wording.
        "Order or collection question": "Order and Collection Query", // Continue building the text value used in this operation.
        "Complaint or problem with an order": "Complaint Regarding Order", // Continue building the text value used in this operation.
        "Selling second-hand items": "Second-Hand Selling Query", // Continue building the text value used in this operation.
        "Parent Hub & bundles": "Parent Hub and Bundle Query", // Continue building the text value used in this operation.
        "Something else": "General Query" // Continue building the text value used in this operation.
    }; // Close the current code block.
    const label = labels[topicText] || "General Query"; // Declare a constant for use in this operation.

    // A complaint with an order reference reads naturally as "Complaint Regarding Order CC-1025".
    if (topicText === "Complaint or problem with an order") { // Begin this block of code.
        return orderRef !== "" ? label + " " + orderRef : "Complaint Regarding My Order \u2013 " + fullName; // Return the result to the code that called this function.
    } // Close this block or callback.
    return label + " \u2013 " + (orderRef !== "" ? "Order " + orderRef : fullName); // Return the result to the code that called this function.
} // Close this block or callback.


// ==========================================================
// CONTACT FORM
// ==========================================================

function setupContactForm(form) { // Begin this block of code.

    // Finds the fields that the code needs to read.
    const name = document.getElementById("c-name"); // Declare a constant for use in this operation.
    const email = document.getElementById("c-email"); // Declare a constant for use in this operation.
    const phone = document.getElementById("c-phone"); // Declare a constant for use in this operation.
    const topic = document.getElementById("c-topic"); // Declare a constant for use in this operation.
    const order = document.getElementById("c-order"); // Declare a constant for use in this operation.
    const outcome = document.getElementById("c-outcome"); // Declare a constant for use in this operation.
    const message = document.getElementById("c-message"); // Declare a constant for use in this operation.
    const preview = document.getElementById("contact-preview"); // Declare a constant for use in this operation.

    clearErrorsOnInput(form); // Execute this statement to update state or produce a result.

    // The fields in the order the visitor fills them in (see setupFormGate for how this list is used).
    const steps = [ // Declare a constant for use in this operation.
        { input: name, label: "Full name", check: function () { // Begin this block of code.
            return name.value.trim().length < 2 ? "Please enter your full name (at least 2 characters)." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: email, label: "Email address", check: function () { // Begin this block of code.
            return !isValidEmail(email.value.trim()) ? "Please enter a valid email address, e.g. you@example.co.za." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: topic, label: "Topic", check: function () { // Begin this block of code.
            return topic.value === "" ? "Please choose a topic." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: order, label: "Order reference", check: function () { // Begin this block of code.
            // Optional, but if something is typed it must look like an order reference.
            return (order.value.trim() !== "" && !/^[A-Za-z0-9#\- ]{3,30}$/.test(order.value.trim())) // Return the result to the code that called this function.
                ? "Use 3 to 30 letters, numbers, # or dashes, e.g. CC-1025." : ""; // Execute this statement to update state or produce a result.
        } }, // Close the current code block.
        { input: outcome, label: "What would you like us to do?", check: function () { // Begin this block of code.
            return outcome.value === "" ? "Please tell us what you would like us to do." : ""; // Return the result to the code that called this function.
        } }, // Close the current code block.
        { input: phone, label: "Phone / WhatsApp", check: function () { // Begin this block of code.
            // A phone number is needed when the visitor asks for a call or WhatsApp message.
            if (outcome.value === CALL_BACK && phone.value.trim() === "") { // Begin this block of code.
                return "Please enter your phone number so we can call or WhatsApp you."; // Return the result to the code that called this function.
            } // Close this block or callback.
            // Otherwise optional, but if something is typed it must look like a valid number.
            return (phone.value.trim() !== "" && !isValidPhone(phone.value.trim())) // Return the result to the code that called this function.
                ? "Please enter a valid number, e.g. 082 000 0000 or +27 82 000 0000." : ""; // Execute this statement to update state or produce a result.
        } }, // Close the current code block.
        { input: message, label: "Message", check: function () { // Begin this block of code.
            // At least 10 characters so the message contains something useful.
            return message.value.trim().length < 10 ? "Please type a message of at least 10 characters." : ""; // Return the result to the code that called this function.
        } } // Close the current code block.
    ]; // Finish this array or object definition.

    setupFormGate(form, steps); // Execute this statement to update state or produce a result.

    // Runs when the user presses the submit button.
    form.addEventListener("submit", function (event) { // Begin this block of code.

        // Stops the browser from reloading the page.
        event.preventDefault(); // Execute this statement to update state or produce a result.

        // Hides any earlier preview.
        showBox(preview, false);

        let valid = true; // Declare a variable whose value may change.
        let firstBad = null; // Declare a variable whose value may change.

        function fail(input, msg) { // Begin this block of code.
            showError(input, msg); // Execute this statement to update state or produce a result.
            valid = false; // Execute this statement to update state or produce a result.
            if (!firstBad) { firstBad = input; } // Run this block only when the condition is true.
        } // Close this block or callback.

        // Runs every check from the steps list.
        steps.forEach(function (step) { // Begin this block of code.
            const problem = step.check(); // Declare a constant for use in this operation.
            if (problem !== "") { fail(step.input, problem); } // Run this block only when the condition is true.
        }); // Close this block or callback.

        // Stops here and focuses the first problem field.
        if (!valid) { // Begin this block of code.
            firstBad.focus(); // Execute this statement to update state or produce a result.
            return; // Execute this statement to update state or produce a result.
        } // Close this block or callback.

        // ----- Compile the validated information into a professional email -----
        // The email follows the layout of a formal message: a clear subject, a polite greeting,
        // relevant details, a clear request and a courteous closing.
        const recipient = form.dataset.mailto || "hello@campus-cart.co.za"; // Read the email address configured in the form's data-mailto attribute.
        const subject = buildContactSubject(topic.value, order.value.trim(), name.value.trim()); // Declare a constant for use in this operation.

        const lines = [ // Build the email body as separate lines before joining them.
            "Dear Campus-Cart Team,", // Continue building the text value used in this operation.
            "", // Continue building the text value used in this operation.
            "I am writing to you about: " + topic.value + ".", // Continue building the text value used in this operation.
            "" // Continue building the text value used in this operation.
        ]; // Finish this array or object definition.

        // The order reference is only added when the visitor gave one.
        if (order.value.trim() !== "") { // Begin this block of code.
            lines.push("Order reference: " + order.value.trim(), ""); // Add the next section of text to the email body.
        } // Close this block or callback.

        lines.push( // Add the next section of text to the email body.
            "Details:", // Continue building the text value used in this operation.
            message.value.trim(), // This line contributes to the current expression or data structure.
            "", // Continue building the text value used in this operation.
            "Requested outcome:", // Continue building the text value used in this operation.
            outcomeSentence(outcome.value, phone.value.trim()), // This line contributes to the current expression or data structure.
            "", // Continue building the text value used in this operation.
            "Thank you for your time and assistance. I look forward to your response.", // Continue building the text value used in this operation.
            "", // Continue building the text value used in this operation.
            "Kind regards,", // Continue building the text value used in this operation.
            name.value.trim(), // This line contributes to the current expression or data structure.
            "Email: " + email.value.trim() // Continue building the text value used in this operation.
        ); // Execute this statement to update state or produce a result.

        // The phone number is only added when the visitor gave one.
        if (phone.value.trim() !== "") { // Begin this block of code.
            lines.push("Phone: " + phone.value.trim()); // Add the next section of text to the email body.
        } // Close this block or callback.

        const body = lines.join("\r\n"); // Use CRLF line breaks for the email body.

        // Builds the mailto link. encodeURIComponent makes spaces and symbols safe in a URL.
        const mailto = "mailto:" + recipient + // Declare a constant for use in this operation.
            "?subject=" + encodeURIComponent(subject) + // Continue building the text value used in this operation.
            "&body=" + encodeURIComponent(body); // Continue building the text value used in this operation.

        // Shows the compiled email so the user can check it before sending.
        preview.innerHTML = // Update or inspect the relevant form or page element.
            "<h3>Your email is ready</h3>" + // Continue building the text value used in this operation.
            "<p><strong>To:</strong> " + escapeHtml(recipient) + "<br>" + // Continue building the text value used in this operation.
            "<strong>Subject:</strong> " + escapeHtml(subject) + "</p>" + // Continue building the text value used in this operation.
            "<pre>" + escapeHtml(body) + "</pre>" + // Continue building the text value used in this operation.
            "<a class=\"cc-btn\" href=\"#\">Open in my email app and send</a>" + // Continue building the text value used in this operation.
            "<p class=\"hint\">Your message is sent to our team automatically. If that fails, use the button above to send it from your email app.</p>"; // Continue building the text value used in this operation.

        // Sets the mailto link through the DOM so the & characters in it are never misread as HTML.
        preview.querySelector("a.cc-btn").href = mailto; // Update or inspect the relevant form or page element.

        // Makes the preview visible and scrolls it into view.
        showBox2(preview);
        sendViaWeb3Forms(form, { subject: subject, from_name: name.value.trim(), email: email.value.trim(), message: body }, preview);
        preview.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Update or inspect the relevant form or page element.
    }); // Close this block or callback.
} // Close this block or callback.

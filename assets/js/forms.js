// ==========================================================
// CAMPUS-CART
// Forms JavaScript (ICE Task 4 / Part 3)
// - Enquiry form: validates, then shows a cost and availability response
// - Contact form: validates, then compiles an email the user can send
// ==========================================================
// INLINE COMMENTING GUIDE: Explanatory comments identify the purpose of the main logic blocks, state changes, DOM operations and event handling.

// Waits until the HTML page has finished loading before running the code.
// JavaScript statement/expression: document.addEventListener("DOMContentLoaded", function () { // Run setup after the HTML has been parsed.
document.addEventListener("DOMContentLoaded", function () { // Run setup after the HTML has been parsed.

    // Looks for each form on the current page. Only one of them exists on each page.
    // JavaScript statement/expression: const enquiryForm = document.getElementById("enquiry-form"); // Get the enquiry form, or null if this page has
    const enquiryForm = document.getElementById("enquiry-form"); // Get the enquiry form, or null if this page has none.
    // JavaScript statement/expression: const contactForm = document.getElementById("contact-form"); // Get the contact form, or null if this page has
    const contactForm = document.getElementById("contact-form"); // Get the contact form, or null if this page has none.

    // Disable browser pop-up validation; the custom JavaScript checks below control all errors.
    // JavaScript statement/expression: if (enquiryForm) { enquiryForm.noValidate = true; }
    if (enquiryForm) { enquiryForm.noValidate = true; }
    // JavaScript statement/expression: if (contactForm) { contactForm.noValidate = true; }
    if (contactForm) { contactForm.noValidate = true; }

    // Starts the enquiry code only if the enquiry form is on this page.
    // JavaScript statement/expression: if (enquiryForm) { // Begin this block of code.
    if (enquiryForm) { // Begin this block of code.
        // JavaScript statement/expression: loadStockFromFile(); // Execute this statement to update state or produce a result.
        loadStockFromFile(); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: setupEnquiryForm(enquiryForm); // Execute this statement to update state or produce a result.
        setupEnquiryForm(enquiryForm); // Execute this statement to update state or produce a result.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.

    // (The coverage search lives in interactions.js.)

    // Starts the contact code only if the contact form is on this page.
    // JavaScript statement/expression: if (contactForm) { // Begin this block of code.
    if (contactForm) { // Begin this block of code.
        // JavaScript statement/expression: setupContactForm(contactForm); // Execute this statement to update state or produce a result.
        setupContactForm(contactForm); // Execute this statement to update state or produce a result.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.
// JavaScript statement/expression: }); // Close this block or callback.
}); // Close this block or callback.


// ==========================================================
// SHARED HELPER FUNCTIONS
// ==========================================================

// ---------- Helpers that let this file work with the Tailwind markup ----------
// The pages hide things with the Tailwind "hidden" class, not the hidden attribute,
// and wrap each field in a plain <div>, so these small helpers cover both styles.
// JavaScript statement/expression: function groupOf(input) { // The wrapper that holds a field, its label and its error message.
function groupOf(input) { // The wrapper that holds a field, its label and its error message.
    // JavaScript statement/expression: return input.closest("#enq-other-group") || input.closest(".form-group") || input.parentElement;
    return input.closest("#enq-other-group") || input.closest(".form-group") || input.parentElement;
// JavaScript statement/expression: }
}
// isHiddenGroup: handles the is hidden group operation used by this feature.
// JavaScript statement/expression: function isHiddenGroup(group) { // True when the wrapper is hidden by either method.
function isHiddenGroup(group) { // True when the wrapper is hidden by either method.
    // JavaScript statement/expression: return group.hidden || group.classList.contains("hidden");
    return group.hidden || group.classList.contains("hidden");
// JavaScript statement/expression: }
}
// setHidden: handles the set hidden operation used by this feature.
// JavaScript statement/expression: function setHidden(el, hide) { // Hides or shows an element using both methods.
function setHidden(el, hide) { // Hides or shows an element using both methods.
    // JavaScript statement/expression: el.hidden = hide;
    el.hidden = hide;
    // JavaScript statement/expression: el.classList.toggle("hidden", hide);
    el.classList.toggle("hidden", hide);
// JavaScript statement/expression: }
}
// showBox: handles the show box operation used by this feature.
// JavaScript statement/expression: function showBox(box, visible) { // Shows or hides a result box (enquiry result, email preview).
function showBox(box, visible) { // Shows or hides a result box (enquiry result, email preview).
    // JavaScript statement/expression: box.classList.add("cc-result");
    box.classList.add("cc-result");
    // JavaScript statement/expression: box.classList.toggle("show", visible);
    box.classList.toggle("show", visible);
    // JavaScript statement/expression: box.classList.toggle("hidden", !visible);
    box.classList.toggle("hidden", !visible);
    // JavaScript statement/expression: if (!visible) { box.innerHTML = ""; }
    if (!visible) { box.innerHTML = ""; }
// JavaScript statement/expression: }
}
// showBox2: handles the show box2 operation used by this feature.
// JavaScript statement/expression: function showBox2(box) { // Shows a result box that already has its content.
function showBox2(box) { // Shows a result box that already has its content.
    // JavaScript statement/expression: box.classList.add("cc-result", "show");
    box.classList.add("cc-result", "show");
    // JavaScript statement/expression: box.classList.remove("hidden");
    box.classList.remove("hidden");
// JavaScript statement/expression: }
}
// productFor: handles the product for operation used by this feature.
// JavaScript statement/expression: function productFor(name) { // Finds price and stock for an item, even if the stock table has no entry for it.
function productFor(name) { // Finds price and stock for an item, even if the stock table has no entry for it.
    // JavaScript statement/expression: if (STOCK[name]) { return STOCK[name]; }
    if (STOCK[name]) { return STOCK[name]; }
    // JavaScript statement/expression: const found = (window.CC_CATALOGUE ? window.CC_CATALOGUE.DEALS : []).find(function (d) { return d.name === nam
    const found = (window.CC_CATALOGUE ? window.CC_CATALOGUE.DEALS : []).find(function (d) { return d.name === name; });
    // JavaScript statement/expression: return { price: found ? found.price : 0, stock: 5, type: found && found.condition === "used" ? "Second-hand" :
    return { price: found ? found.price : 0, stock: 5, type: found && found.condition === "used" ? "Second-hand" : "New" };
// JavaScript statement/expression: }
}

// ==========================================================
// WEB3FORMS DELIVERY
// Sends a validated form to the Campus-Cart inbox through Web3Forms.
// While it sends, the button shows "Sending..." and is disabled.
// If sending fails, the box that is already on screen still offers the
// "open in my email app" link, so the visitor can send it by email instead.
// ==========================================================
// JavaScript statement/expression: const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
// JavaScript statement/expression: const WEB3FORMS_KEY = "ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa";
const WEB3FORMS_KEY = "ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa";

// sendViaWeb3Forms: handles the send via web3 forms operation used by this feature.

// JavaScript statement/expression: async function sendViaWeb3Forms(form, fields, box) {
async function sendViaWeb3Forms(form, fields, box) {
    // JavaScript statement/expression: const submitBtn = form.querySelector('button[type="submit"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    // JavaScript statement/expression: const formData = new FormData(form); // Every named field in the form.
    const formData = new FormData(form); // Every named field in the form.
    // JavaScript statement/expression: formData.append("access_key", WEB3FORMS_KEY);
    formData.append("access_key", WEB3FORMS_KEY);
    // JavaScript statement/expression: Object.keys(fields).forEach(function (key) { formData.set(key, fields[key]); }); // subject, from_name, email,
    Object.keys(fields).forEach(function (key) { formData.set(key, fields[key]); }); // subject, from_name, email, message.

    // JavaScript statement/expression: const originalText = submitBtn.textContent;
    const originalText = submitBtn.textContent;
    // JavaScript statement/expression: submitBtn.textContent = "Sending...";
    submitBtn.textContent = "Sending...";
    // JavaScript statement/expression: submitBtn.disabled = true;
    submitBtn.disabled = true;

    // Adds a short status line at the top of the result box.
    // JavaScript statement/expression: function status(text, ok) {
    function status(text, ok) {
        // JavaScript statement/expression: let line = box.querySelector(".cc-send-status");
        let line = box.querySelector(".cc-send-status");
        // JavaScript statement/expression: if (!line) {
        if (!line) {
            // JavaScript statement/expression: line = document.createElement("p");
            line = document.createElement("p");
            // JavaScript statement/expression: line.className = "cc-send-status";
            line.className = "cc-send-status";
            // JavaScript statement/expression: line.setAttribute("role", "status");
            line.setAttribute("role", "status");
            // JavaScript statement/expression: line.style.cssText = "margin-bottom:.75rem;font-weight:700;";
            line.style.cssText = "margin-bottom:.75rem;font-weight:700;";
            // JavaScript statement/expression: box.insertBefore(line, box.firstChild);
            box.insertBefore(line, box.firstChild);
        // JavaScript statement/expression: }
        }
        // JavaScript statement/expression: line.style.color = ok ? "#047857" : "#b91c1c";
        line.style.color = ok ? "#047857" : "#b91c1c";
        // JavaScript statement/expression: line.textContent = text;
        line.textContent = text;
    // JavaScript statement/expression: }
    }

    // JavaScript statement/expression: try {
    try {
        // JavaScript statement/expression: const response = await fetch(WEB3FORMS_URL, { method: "POST", body: formData });
        const response = await fetch(WEB3FORMS_URL, { method: "POST", body: formData });
        // JavaScript statement/expression: const data = await response.json();
        const data = await response.json();
        // JavaScript statement/expression: if (response.ok && data.success) {
        if (response.ok && data.success) {
            // JavaScript statement/expression: status("Success! Your message has been sent.", true);
            status("Success! Your message has been sent.", true);
            // JavaScript statement/expression: form.reset();
            form.reset();
        // JavaScript statement/expression: } else {
        } else {
            // JavaScript statement/expression: status("Error: " + (data.message || "Your message could not be sent.") + " You can still send it from your ema
            status("Error: " + (data.message || "Your message could not be sent.") + " You can still send it from your email app below.", false);
        // JavaScript statement/expression: }
        }
    // JavaScript statement/expression: } catch (error) {
    } catch (error) {
        // JavaScript statement/expression: status("Something went wrong. Please try again, or send it from your email app below.", false);
        status("Something went wrong. Please try again, or send it from your email app below.", false);
    // JavaScript statement/expression: } finally {
    } finally {
        // JavaScript statement/expression: submitBtn.textContent = originalText;
        submitBtn.textContent = originalText;
        // JavaScript statement/expression: submitBtn.disabled = false;
        submitBtn.disabled = false;
        // JavaScript statement/expression: form.dispatchEvent(new Event("input", { bubbles: true })); // Lets the form gate lock or unlock the submit but
        form.dispatchEvent(new Event("input", { bubbles: true })); // Lets the form gate lock or unlock the submit button again.
    // JavaScript statement/expression: }
    }
// JavaScript statement/expression: }
}

// Shows an error message under a field and marks the field as invalid for screen readers.
// JavaScript statement/expression: function showError(input, message) { // Begin this block of code.
function showError(input, message) { // Begin this block of code.

    // Finds the empty <span> that sits next to this field and holds its error message.
    // JavaScript statement/expression: const errorBox = document.getElementById(input.id + "-error"); // Match the field ID to its error-message elem
    const errorBox = document.getElementById(input.id + "-error"); // Match the field ID to its error-message element.

    // Writes the message into the span, if the span exists.
    // JavaScript statement/expression: if (errorBox) { // Begin this block of code.
    if (errorBox) { // Begin this block of code.
        // JavaScript statement/expression: errorBox.textContent = message; // Execute this statement to update state or produce a result.
        errorBox.textContent = message; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: errorBox.classList.remove("hidden"); // The Tailwind pages keep empty error messages hidden.
        errorBox.classList.remove("hidden"); // The Tailwind pages keep empty error messages hidden.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.

    // Adds a CSS class so the field gets a red border.
    // JavaScript statement/expression: input.classList.add("input-error"); // Update or inspect the relevant form or page element.
    input.classList.add("input-error"); // Update or inspect the relevant form or page element.

    // Tells assistive technology that the value in this field is not valid.
    // JavaScript statement/expression: input.setAttribute("aria-invalid", "true"); // Update or inspect the relevant form or page element.
    input.setAttribute("aria-invalid", "true"); // Update or inspect the relevant form or page element.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Clears the error message from a field.
// JavaScript statement/expression: function clearError(input) { // Begin this block of code.
function clearError(input) { // Begin this block of code.

    // Finds the error span for this field.
    // JavaScript statement/expression: const errorBox = document.getElementById(input.id + "-error"); // Declare a constant for use in this operation
    const errorBox = document.getElementById(input.id + "-error"); // Declare a constant for use in this operation.

    // Empties the message text.
    // JavaScript statement/expression: if (errorBox) { // Begin this block of code.
    if (errorBox) { // Begin this block of code.
        // JavaScript statement/expression: errorBox.textContent = ""; // Execute this statement to update state or produce a result.
        errorBox.textContent = ""; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: errorBox.classList.add("hidden"); // Hides the empty message again.
        errorBox.classList.add("hidden"); // Hides the empty message again.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.

    // Removes the red border and the invalid flag.
    // JavaScript statement/expression: input.classList.remove("input-error"); // Update or inspect the relevant form or page element.
    input.classList.remove("input-error"); // Update or inspect the relevant form or page element.
    // JavaScript statement/expression: input.removeAttribute("aria-invalid"); // Update or inspect the relevant form or page element.
    input.removeAttribute("aria-invalid"); // Update or inspect the relevant form or page element.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Checks an email address against a simple pattern: text, an @ sign, text, a dot, text.
// JavaScript statement/expression: function isValidEmail(value) { // Begin this block of code.
function isValidEmail(value) { // Begin this block of code.
    // JavaScript statement/expression: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Return the result to the code that called this function.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Checks a South African style phone number. Spaces, dashes and a +27 start are allowed.
// JavaScript statement/expression: function isValidPhone(value) { // Begin this block of code.
function isValidPhone(value) { // Begin this block of code.

    // Removes spaces, dashes and brackets so only digits (and a possible +) remain.
    // JavaScript statement/expression: const cleaned = value.replace(/[\s\-()]/g, ""); // Remove formatting characters before checking the number.
    const cleaned = value.replace(/[\s\-()]/g, ""); // Remove formatting characters before checking the number.

    // Accepts 0 followed by 9 digits (e.g. 0821234567) or +27 followed by 9 digits.
    // JavaScript statement/expression: return /^(0\d{9}|\+27\d{9})$/.test(cleaned); // Return the result to the code that called this function.
    return /^(0\d{9}|\+27\d{9})$/.test(cleaned); // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Formats a number as South African Rand, e.g. 2799 becomes "R2 799.00".
// JavaScript statement/expression: function formatRand(amount) { // Begin this block of code.
function formatRand(amount) { // Begin this block of code.

    // toFixed(2) gives two decimal places. The regular expression adds a space every 3 digits.
    // JavaScript statement/expression: return "R" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Return the result to the code that ca
    return "R" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Removes the "dirty" state from every field in a form when the user starts typing again.
// JavaScript statement/expression: function clearErrorsOnInput(form) { // Begin this block of code.
function clearErrorsOnInput(form) { // Begin this block of code.

    // Listens for typing/changes anywhere in the form (event bubbling).
    // JavaScript statement/expression: form.addEventListener("input", function (event) { // Begin this block of code.
    form.addEventListener("input", function (event) { // Begin this block of code.

        // Only fields (not buttons) are cleared.
        // JavaScript statement/expression: if (event.target.id) { // Begin this block of code.
        if (event.target.id) { // Begin this block of code.
            // JavaScript statement/expression: clearError(event.target); // Execute this statement to update state or produce a result.
            clearError(event.target); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.
    // JavaScript statement/expression: }); // Close this block or callback.
    }); // Close this block or callback.
// JavaScript statement/expression: } // Close this block or callback.
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
// ==========================================================
// ENQUIRY FORM
// ==========================================================

// Illustrative stock levels for the demo site. The site has no database,
// so the availability response is worked out from this table.
// JavaScript statement/expression: const STOCK = { // Demo catalogue: each product has a price, quantity available and condition.
const STOCK = { // Demo catalogue: each product has a price, quantity available and condition.
    // JavaScript statement/expression: "Basic Starter Bundle":       { price: 1499, stock: 12, type: "New" }, // Continue building the text value use
    "Basic Starter Bundle":       { price: 1499, stock: 12, type: "New" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Standard Starter Bundle":    { price: 2799, stock: 8,  type: "New" }, // Continue building the text value use
    "Standard Starter Bundle":    { price: 2799, stock: 8,  type: "New" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Premium Starter Bundle":     { price: 4499, stock: 3,  type: "New" }, // Continue building the text value use
    "Premium Starter Bundle":     { price: 4499, stock: 3,  type: "New" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Duvet & Linen Set (Double)": { price: 749,  stock: 20, type: "New" }, // Continue building the text value use
    "Duvet & Linen Set (Double)": { price: 749,  stock: 20, type: "New" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Electric Kettle 1.7L":       { price: 289,  stock: 25, type: "New" }, // Continue building the text value use
    "Electric Kettle 1.7L":       { price: 289,  stock: 25, type: "New" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Stationery Mega Pack":       { price: 249,  stock: 30, type: "New" }, // Continue building the text value use
    "Stationery Mega Pack":       { price: 249,  stock: 30, type: "New" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Load-Shedding Light Kit":    { price: 329,  stock: 0,  type: "New" }, // Continue building the text value use
    "Load-Shedding Light Kit":    { price: 329,  stock: 0,  type: "New" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Study Desk":                 { price: 650,  stock: 1,  type: "Second-hand" }, // Continue building the text v
    "Study Desk":                 { price: 650,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Mini Bar Fridge":            { price: 1150, stock: 1,  type: "Second-hand" }, // Continue building the text v
    "Mini Bar Fridge":            { price: 1150, stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Accounting Textbook Set":    { price: 420,  stock: 1,  type: "Second-hand" }, // Continue building the text v
    "Accounting Textbook Set":    { price: 420,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Laptop Bag 15\"":            { price: 180,  stock: 1,  type: "Second-hand" }, // Continue building the text v
    "Laptop Bag 15\"":            { price: 180,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Two-Tier Bookshelf":         { price: 380,  stock: 1,  type: "Second-hand" }, // Continue building the text v
    "Two-Tier Bookshelf":         { price: 380,  stock: 1,  type: "Second-hand" }, // Continue building the text value used in this operation.
    // JavaScript statement/expression: "Study Chair":                { price: 450,  stock: 1,  type: "Second-hand" } // Continue building the text va
    "Study Chair":                { price: 450,  stock: 1,  type: "Second-hand" } // Continue building the text value used in this operation.
// JavaScript statement/expression: }; // Close the current code block.
}; // Close the current code block.

// Loads the latest stock levels from assets/data/stock.json using AJAX (fetch),
// so the enquiry page can be updated without editing any JavaScript.
// If the file cannot be loaded (for example when the page is opened straight from a
// folder instead of a web server), the built-in STOCK table above is used instead.
// JavaScript statement/expression: function loadStockFromFile() { // Begin this block of code.
function loadStockFromFile() { // Begin this block of code.
    // JavaScript statement/expression: if (typeof fetch !== "function") { return; } // Keep the built-in stock table if fetch is unavailable.
    if (typeof fetch !== "function") { return; } // Keep the built-in stock table if fetch is unavailable.

    // JavaScript statement/expression: fetch("../assets/data/stock.json", { cache: "no-cache" }) // Request fresh stock data instead of a cached copy
    fetch("../assets/data/stock.json", { cache: "no-cache" }) // Request fresh stock data instead of a cached copy.
        // JavaScript statement/expression: .then(function (response) { // Begin this block of code.
        .then(function (response) { // Begin this block of code.
            // JavaScript statement/expression: if (!response.ok) { throw new Error("Stock file not found"); } // Run this block only when the condition is tr
            if (!response.ok) { throw new Error("Stock file not found"); } // Run this block only when the condition is true.
            // JavaScript statement/expression: return response.json(); // Return the result to the code that called this function.
            return response.json(); // Return the result to the code that called this function.
        // JavaScript statement/expression: }) // Close the current code block.
        }) // Close the current code block.
        // JavaScript statement/expression: .then(function (data) { // Begin this block of code.
        .then(function (data) { // Begin this block of code.
            // JavaScript statement/expression: Object.keys(data).forEach(function (name) { // Begin this block of code.
            Object.keys(data).forEach(function (name) { // Begin this block of code.
                // JavaScript statement/expression: const item = data[name]; // Declare a constant for use in this operation.
                const item = data[name]; // Declare a constant for use in this operation.
                // Only accept entries that have the expected number fields.
                // JavaScript statement/expression: if (item && typeof item.price === "number" && typeof item.stock === "number") { // Begin this block of code.
                if (item && typeof item.price === "number" && typeof item.stock === "number") { // Begin this block of code.
                    // JavaScript statement/expression: STOCK[name] = { price: item.price, stock: item.stock, type: String(item.type) }; // Execute this statement to 
                    STOCK[name] = { price: item.price, stock: item.stock, type: String(item.type) }; // Execute this statement to update state or produce a result.
                // JavaScript statement/expression: } // Close this block or callback.
                } // Close this block or callback.
            // JavaScript statement/expression: }); // Close this block or callback.
            }); // Close this block or callback.
        // JavaScript statement/expression: }) // Close the current code block.
        }) // Close the current code block.
        // JavaScript statement/expression: .catch(function () { // Begin this block of code.
        .catch(function () { // Begin this block of code.
            // Keep the built-in table. The enquiry form still works.
        // JavaScript statement/expression: }); // Close this block or callback.
        }); // Close this block or callback.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Adds working days to a date, skipping Saturdays and Sundays (public holidays are not counted).
// JavaScript statement/expression: function addWorkingDays(start, days) { // Begin this block of code.
function addWorkingDays(start, days) { // Begin this block of code.
    // JavaScript statement/expression: const d = new Date(start); // Copy the starting date so the original value is unchanged.
    const d = new Date(start); // Copy the starting date so the original value is unchanged.
    // JavaScript statement/expression: while (days > 0) { // Begin this block of code.
    while (days > 0) { // Begin this block of code.
        // JavaScript statement/expression: d.setDate(d.getDate() + 1); // Execute this statement to update state or produce a result.
        d.setDate(d.getDate() + 1); // Execute this statement to update state or produce a result.
        // getDay() returns 0 for Sunday and 6 for Saturday.
        // JavaScript statement/expression: if (d.getDay() !== 0 && d.getDay() !== 6) { days--; } // Run this block only when the condition is true.
        if (d.getDay() !== 0 && d.getDay() !== 6) { days--; } // Run this block only when the condition is true.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.
    // JavaScript statement/expression: return d; // Return the result to the code that called this function.
    return d; // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Formats a date like "Thu, 8 Oct 2026" for South African readers.
// JavaScript statement/expression: function formatDate(d) { // Begin this block of code.
function formatDate(d) { // Begin this block of code.
    // JavaScript statement/expression: return d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" }); /
    return d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" }); // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Finds the province object for the chosen province code.
// JavaScript statement/expression: function getProvince(code) { // Begin this block of code.
function getProvince(code) { // Begin this block of code.
    // JavaScript statement/expression: return PROVINCES.find(function (p) { return p.code === code; }); // Return the result to the code that called 
    return PROVINCES.find(function (p) { return p.code === code; }); // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// JavaScript statement/expression: function setupEnquiryForm(form) { // Begin this block of code.
function setupEnquiryForm(form) { // Begin this block of code.

    // Finds the fields that the code needs to read.
    // JavaScript statement/expression: const enquirerType = document.getElementById("enq-type"); // Declare a constant for use in this operation.
    const enquirerType = document.getElementById("enq-type"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const name = document.getElementById("enq-name"); // Declare a constant for use in this operation.
    const name = document.getElementById("enq-name"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const email = document.getElementById("enq-email"); // Declare a constant for use in this operation.
    const email = document.getElementById("enq-email"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const item = document.getElementById("enq-item"); // Declare a constant for use in this operation.
    const item = document.getElementById("enq-item"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const quantity = document.getElementById("enq-qty"); // Declare a constant for use in this operation.
    const quantity = document.getElementById("enq-qty"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const method = document.getElementById("enq-method"); // Declare a constant for use in this operation.
    const method = document.getElementById("enq-method"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const province = document.getElementById("enq-province"); // Declare a constant for use in this operation.
    const province = document.getElementById("enq-province"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const institution = document.getElementById("enq-institution"); // Declare a constant for use in this operatio
    const institution = document.getElementById("enq-institution"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const result = document.getElementById("enquiry-result"); // Declare a constant for use in this operation.
    const result = document.getElementById("enquiry-result"); // Declare a constant for use in this operation.

    // Fills the province list from data.js (one option per province).
    // JavaScript statement/expression: PROVINCES.forEach(function (p) { // Begin this block of code.
    PROVINCES.forEach(function (p) { // Begin this block of code.
        // JavaScript statement/expression: province.add(new Option(p.name, p.code)); // Update or inspect the relevant form or page element.
        province.add(new Option(p.name, p.code)); // Update or inspect the relevant form or page element.
    // JavaScript statement/expression: }); // Close this block or callback.
    }); // Close this block or callback.

    // The extra text box for an institution that is not on the list.
    // JavaScript statement/expression: const otherGroup = document.getElementById("enq-other-group"); // Declare a constant for use in this operation
    const otherGroup = document.getElementById("enq-other-group"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const other = document.getElementById("enq-other"); // Declare a constant for use in this operation.
    const other = document.getElementById("enq-other"); // Declare a constant for use in this operation.

    // Adds one <optgroup> (a labelled group of options) to the institution list.
    // JavaScript statement/expression: function addGroup(label, names) { // Begin this block of code.
    function addGroup(label, names) { // Begin this block of code.
        // JavaScript statement/expression: if (names.length === 0) { return; } // Run this block only when the condition is true.
        if (names.length === 0) { return; } // Run this block only when the condition is true.
        // JavaScript statement/expression: const group = document.createElement("optgroup"); // Declare a constant for use in this operation.
        const group = document.createElement("optgroup"); // Declare a constant for use in this operation.
        // JavaScript statement/expression: group.label = label; // Update or inspect the relevant form or page element.
        group.label = label; // Update or inspect the relevant form or page element.
        // JavaScript statement/expression: names.forEach(function (n) { group.appendChild(new Option(n, n)); }); // Run this callback once for each item 
        names.forEach(function (n) { group.appendChild(new Option(n, n)); }); // Run this callback once for each item in the collection.
        // JavaScript statement/expression: institution.appendChild(group); // Update or inspect the relevant form or page element.
        institution.appendChild(group); // Update or inspect the relevant form or page element.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.

    // When a province is chosen, fills the institution list with that province's public and private institutions.
    // JavaScript statement/expression: province.addEventListener("change", function () { // Begin this block of code.
    province.addEventListener("change", function () { // Begin this block of code.
        // Removes every option and group after the first "Choose..." option.
        // (Setting institution.length = 1 can leave empty <optgroup> elements behind.)
        // JavaScript statement/expression: while (institution.children.length > 1) { // Begin this block of code.
        while (institution.children.length > 1) { // Begin this block of code.
            // JavaScript statement/expression: institution.removeChild(institution.lastChild); // Update or inspect the relevant form or page element.
            institution.removeChild(institution.lastChild); // Update or inspect the relevant form or page element.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.
        // JavaScript statement/expression: setHidden(otherGroup, true); // Execute this statement to update state or produce a result.
        setHidden(otherGroup, true); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: const chosen = getProvince(province.value); // Declare a constant for use in this operation.
        const chosen = getProvince(province.value); // Declare a constant for use in this operation.
        // JavaScript statement/expression: if (!chosen) { // Begin this block of code.
        if (!chosen) { // Begin this block of code.
            // JavaScript statement/expression: institution.options[0].text = "Choose a province first..."; // Update or inspect the relevant form or page ele
            institution.options[0].text = "Choose a province first..."; // Update or inspect the relevant form or page element.
            // JavaScript statement/expression: institution.disabled = true; // Update or inspect the relevant form or page element.
            institution.disabled = true; // Update or inspect the relevant form or page element.
            // JavaScript statement/expression: return; // Execute this statement to update state or produce a result.
            return; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.
        // JavaScript statement/expression: institution.options[0].text = "Choose your institution..."; // Update or inspect the relevant form or page ele
        institution.options[0].text = "Choose your institution..."; // Update or inspect the relevant form or page element.

        // Filters the province's institutions by type and adds a group for each type.
        // JavaScript statement/expression: function namesOfType(type) { // Begin this block of code.
        function namesOfType(type) { // Begin this block of code.
            // JavaScript statement/expression: return chosen.institutions.filter(function (i) { return i.type === type; }) // Return the result to the code t
            return chosen.institutions.filter(function (i) { return i.type === type; }) // Return the result to the code that called this function.
                                      // JavaScript statement/expression: .map(function (i) { return i.name; }); // Execute this statement to update state or produce a result.
                                      .map(function (i) { return i.name; }); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.
        // JavaScript statement/expression: addGroup("Public universities", namesOfType("University")); // Execute this statement to update state or produ
        addGroup("Public universities", namesOfType("University")); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: addGroup("Public TVET colleges", namesOfType("TVET college")); // Execute this statement to update state or pr
        addGroup("Public TVET colleges", namesOfType("TVET college")); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: addGroup("Private institutions in " + chosen.name, namesOfType("Private institution")); // Execute this statem
        addGroup("Private institutions in " + chosen.name, namesOfType("Private institution")); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: addGroup("National private providers", NATIONAL_PRIVATE); // Execute this statement to update state or produce
        addGroup("National private providers", NATIONAL_PRIVATE); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: addGroup("Not on the list?", ["My institution is not listed"]); // Execute this statement to update state or p
        addGroup("Not on the list?", ["My institution is not listed"]); // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: institution.disabled = false; // Update or inspect the relevant form or page element.
        institution.disabled = false; // Update or inspect the relevant form or page element.
    // JavaScript statement/expression: }); // Close this block or callback.
    }); // Close this block or callback.

    // Shows the extra text box when the user picks "My institution is not listed".
    // JavaScript statement/expression: institution.addEventListener("change", function () { // Begin this block of code.
    institution.addEventListener("change", function () { // Begin this block of code.
        // JavaScript statement/expression: setHidden(otherGroup, institution.value !== "My institution is not listed"); // Execute this statement to upda
        setHidden(otherGroup, institution.value !== "My institution is not listed"); // Execute this statement to update state or produce a result.
    // JavaScript statement/expression: }); // Close this block or callback.
    }); // Close this block or callback.

    // Clears a field's error message as soon as the user edits that field.
    // JavaScript statement/expression: clearErrorsOnInput(form); // Execute this statement to update state or produce a result.
    clearErrorsOnInput(form); // Execute this statement to update state or produce a result.

    // The fields in the order the visitor fills them in. Each check returns an error message,
    // or "" when the field is fine. The same checks lock the later fields (setupFormGate)
    // and are used again when the form is submitted.
    // JavaScript statement/expression: const steps = [ // Declare a constant for use in this operation.
    const steps = [ // Declare a constant for use in this operation.
        // JavaScript statement/expression: { input: enquirerType, label: "I am a", check: function () { // Begin this block of code.
        { input: enquirerType, label: "I am a", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return enquirerType.value === "" ? "Please choose whether you are a student or a parent." : ""; // Return the 
            return enquirerType.value === "" ? "Please choose whether you are a student or a parent." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: name, label: "Full name", check: function () { // Begin this block of code.
        { input: name, label: "Full name", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return name.value.trim().length < 2 || name.value.trim().length > 80 ? "Please enter a name between 2 and 80 c
            return name.value.trim().length < 2 || name.value.trim().length > 80 ? "Please enter a name between 2 and 80 characters." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: email, label: "Email address", check: function () { // Begin this block of code.
        { input: email, label: "Email address", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return email.value.trim().length > 120 || !isValidEmail(email.value.trim()) ? "Please enter a valid email addr
            return email.value.trim().length > 120 || !isValidEmail(email.value.trim()) ? "Please enter a valid email address (maximum 120 characters)." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: item, label: "Bundle or product", check: function () { // Begin this block of code.
        { input: item, label: "Bundle or product", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return item.value === "" ? "Please choose a bundle or product." : ""; // Return the result to the code that ca
            return item.value === "" ? "Please choose a bundle or product." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: quantity, label: "Quantity", check: function () { // Begin this block of code.
        { input: quantity, label: "Quantity", check: function () { // Begin this block of code.
            // JavaScript statement/expression: const amount = Number(quantity.value); // Declare a constant for use in this operation.
            const amount = Number(quantity.value); // Declare a constant for use in this operation.
            // JavaScript statement/expression: return (quantity.value === "" || !Number.isInteger(amount) || amount < 1 || amount > 10) ? "Please enter a who
            return (quantity.value === "" || !Number.isInteger(amount) || amount < 1 || amount > 10) ? "Please enter a whole number from 1 to 10." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: method, label: "How do you want to get it?", check: function () { // Begin this block of code.
        { input: method, label: "How do you want to get it?", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return method.value === "" ? "Please choose delivery or collection." : ""; // Return the result to the code th
            return method.value === "" ? "Please choose delivery or collection." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: province, label: "Province", check: function () { // Begin this block of code.
        { input: province, label: "Province", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return province.value === "" ? "Please choose your province." : ""; // Return the result to the code that call
            return province.value === "" ? "Please choose your province." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: institution, label: "Institution", check: function () { // Begin this block of code.
        { input: institution, label: "Institution", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return institution.value === "" ? "Please choose your institution." : ""; // Return the result to the code tha
            return institution.value === "" ? "Please choose your institution." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: other, label: "Name of your institution", check: function () { // Begin this block of code.
        { input: other, label: "Name of your institution", check: function () { // Begin this block of code.
            // If the institution is not on the list, the user must type its name.
            // JavaScript statement/expression: return (institution.value === "My institution is not listed" && (other.value.trim().length < 3 || other.value.
            return (institution.value === "My institution is not listed" && (other.value.trim().length < 3 || other.value.trim().length > 100)) ? "Please enter an institution name between 3 and 100 characters." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } } // Close the current code block.
        } } // Close the current code block.
    // JavaScript statement/expression: ]; // Finish this array or object definition. // Execute this statement to update state or produce a result.
    ]; // Finish this array or object definition. // Execute this statement to update state or produce a result.

    // Runs when the user presses the submit button.
    // JavaScript statement/expression: form.addEventListener("submit", function (event) { // Begin this block of code.
    form.addEventListener("submit", function (event) { // Begin this block of code.

        // Stops the browser from reloading the page.
        // JavaScript statement/expression: event.preventDefault(); // Execute this statement to update state or produce a result.
        event.preventDefault(); // Execute this statement to update state or produce a result.

        // Clears the previous response.
        // JavaScript statement/expression: showBox(result, false);
        showBox(result, false);

        // JavaScript statement/expression: let valid = true; // Declare a variable whose value may change.
        let valid = true; // Declare a variable whose value may change.
        // JavaScript statement/expression: let firstBad = null; // Declare a variable whose value may change.
        let firstBad = null; // Declare a variable whose value may change.

        // Records the error and remembers the first invalid field.
        // JavaScript statement/expression: function fail(input, message) { // Begin this block of code.
        function fail(input, message) { // Begin this block of code.
            // JavaScript statement/expression: showError(input, message); // Execute this statement to update state or produce a result.
            showError(input, message); // Execute this statement to update state or produce a result.
            // JavaScript statement/expression: valid = false; // Execute this statement to update state or produce a result.
            valid = false; // Execute this statement to update state or produce a result.
            // JavaScript statement/expression: if (!firstBad) { firstBad = input; } // Run this block only when the condition is true.
            if (!firstBad) { firstBad = input; } // Run this block only when the condition is true.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // Runs every check from the steps list. Fields that are hidden right now are skipped.
        // JavaScript statement/expression: steps.forEach(function (step) { // Begin this block of code.
        steps.forEach(function (step) { // Begin this block of code.
            // JavaScript statement/expression: if (isHiddenGroup(groupOf(step.input))) { return; } // Run this block only when the condition is true.
            if (isHiddenGroup(groupOf(step.input))) { return; } // Run this block only when the condition is true.
            // JavaScript statement/expression: const message = step.check(); // Declare a constant for use in this operation.
            const message = step.check(); // Declare a constant for use in this operation.
            // JavaScript statement/expression: if (message !== "") { fail(step.input, message); } // Run this block only when the condition is true.
            if (message !== "") { fail(step.input, message); } // Run this block only when the condition is true.
        // JavaScript statement/expression: }); // Close this block or callback.
        }); // Close this block or callback.
        // JavaScript statement/expression: const qty = Number(quantity.value); // Convert the quantity field text into a number for calculations.
        const qty = Number(quantity.value); // Convert the quantity field text into a number for calculations.

        // Stops here and moves the cursor to the first problem field.
        // JavaScript statement/expression: if (!valid) { // Begin this block of code.
        if (!valid) { // Begin this block of code.
            // JavaScript statement/expression: firstBad.focus(); // Execute this statement to update state or produce a result.
            firstBad.focus(); // Execute this statement to update state or produce a result.
            // JavaScript statement/expression: return; // Execute this statement to update state or produce a result.
            return; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // ----- Processing: work out the response from the validated input -----
        // JavaScript statement/expression: const product = productFor(item.value); // Find the selected product in the stock catalogue.
        const product = productFor(item.value); // Find the selected product in the stock catalogue.
        // JavaScript statement/expression: const total = product.price * qty; // Calculate the estimated total before delivery fees.
        const total = product.price * qty; // Calculate the estimated total before delivery fees.
        // JavaScript statement/expression: const prov = getProvince(province.value); // Declare a constant for use in this operation.
        const prov = getProvince(province.value); // Declare a constant for use in this operation.
        // Looks the institution up. National private providers and typed-in institutions have no town,
        // so the province's typical delivery time is used for them.
        // JavaScript statement/expression: let inst = prov.institutions.find(function (i) { return i.name === institution.value; }); // Declare a variabl
        let inst = prov.institutions.find(function (i) { return i.name === institution.value; }); // Declare a variable whose value may change.
        // JavaScript statement/expression: if (!inst) { // Begin this block of code.
        if (!inst) { // Begin this block of code.
            // JavaScript statement/expression: const typed = institution.value === "My institution is not listed"; // Declare a constant for use in this oper
            const typed = institution.value === "My institution is not listed"; // Declare a constant for use in this operation.
            // JavaScript statement/expression: inst = { name: typed ? other.value.trim() : institution.value, type: "Private institution", city: "" }; // Exe
            inst = { name: typed ? other.value.trim() : institution.value, type: "Private institution", city: "" }; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // Availability message from the stock table.
        // JavaScript statement/expression: let availability; // Declare a variable whose value may change.
        let availability; // Declare a variable whose value may change.
        // JavaScript statement/expression: let statusClass; // Declare a variable whose value may change.
        let statusClass; // Declare a variable whose value may change.
        // JavaScript statement/expression: if (product.stock === 0) { // Begin this block of code.
        if (product.stock === 0) { // Begin this block of code.
            // JavaScript statement/expression: availability = "Currently out of stock. Send us a message and we will notify you when it is back."; // Set the
            availability = "Currently out of stock. Send us a message and we will notify you when it is back."; // Set the message shown for this stock situation.
            // JavaScript statement/expression: statusClass = "status-out"; // Choose the CSS class used to style this status.
            statusClass = "status-out"; // Choose the CSS class used to style this status.
        // JavaScript statement/expression: } else if (product.type === "Second-hand" && qty > 1) { // Begin this block of code.
        } else if (product.type === "Second-hand" && qty > 1) { // Begin this block of code.
            // JavaScript statement/expression: availability = "This second-hand item is a single listing, so only 1 is available."; // Set the message shown 
            availability = "This second-hand item is a single listing, so only 1 is available."; // Set the message shown for this stock situation.
            // JavaScript statement/expression: statusClass = "status-low"; // Choose the CSS class used to style this status.
            statusClass = "status-low"; // Choose the CSS class used to style this status.
        // JavaScript statement/expression: } else if (qty > product.stock) { // Begin this block of code.
        } else if (qty > product.stock) { // Begin this block of code.
            // JavaScript statement/expression: availability = "Only " + product.stock + " in stock. We can reserve " + product.stock + " now and the rest on 
            availability = "Only " + product.stock + " in stock. We can reserve " + product.stock + " now and the rest on the next restock."; // Set the message shown for this stock situation.
            // JavaScript statement/expression: statusClass = "status-low"; // Choose the CSS class used to style this status.
            statusClass = "status-low"; // Choose the CSS class used to style this status.
        // JavaScript statement/expression: } else { // Begin this block of code.
        } else { // Begin this block of code.
            // JavaScript statement/expression: availability = "In stock. We can reserve " + qty + " for you."; // Set the message shown for this stock situat
            availability = "In stock. We can reserve " + qty + " for you."; // Set the message shown for this stock situation.
            // JavaScript statement/expression: statusClass = "status-ok"; // Choose the CSS class used to style this status.
            statusClass = "status-ok"; // Choose the CSS class used to style this status.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // Delivery working days: 1 if the institution is in a hub city, otherwise the province's typical time.
        // JavaScript statement/expression: const inHubCity = prov.hubs.some(function (h) { return h.city === inst.city; }); // Declare a constant for use
        const inHubCity = prov.hubs.some(function (h) { return h.city === inst.city; }); // Declare a constant for use in this operation.
        // JavaScript statement/expression: const leadDays = inHubCity ? 1 : prov.leadDays; // Declare a constant for use in this operation.
        const leadDays = inHubCity ? 1 : prov.leadDays; // Declare a constant for use in this operation.

        // Orders placed before 12:00 on a weekday are dispatched the same day; later orders count from the next working day.
        // JavaScript statement/expression: const now = new Date(); // Use the current local date and time for the estimate.
        const now = new Date(); // Use the current local date and time for the estimate.
        // JavaScript statement/expression: const afterCutoff = now.getHours() >= 12 || now.getDay() === 0 || now.getDay() === 6; // Declare a constant fo
        const afterCutoff = now.getHours() >= 12 || now.getDay() === 0 || now.getDay() === 6; // Declare a constant for use in this operation.
        // JavaScript statement/expression: const readyBy = addWorkingDays(now, leadDays + (afterCutoff ? 1 : 0)); // Declare a constant for use in this o
        const readyBy = addWorkingDays(now, leadDays + (afterCutoff ? 1 : 0)); // Declare a constant for use in this operation.

        // Builds the delivery or collection lines for the response.
        // JavaScript statement/expression: let deliveryHtml; // Declare a variable whose value may change.
        let deliveryHtml; // Declare a variable whose value may change.
        // JavaScript statement/expression: let deliveryText; // Declare a variable whose value may change.
        let deliveryText; // Declare a variable whose value may change.
        // JavaScript statement/expression: if (method.value === "Delivery") { // Begin this block of code.
        if (method.value === "Delivery") { // Begin this block of code.
            // JavaScript statement/expression: deliveryText = "Delivery to " + inst.name + (inst.city ? " (" + inst.city + ")" : "") + ", " + prov.name; // B
            deliveryText = "Delivery to " + inst.name + (inst.city ? " (" + inst.city + ")" : "") + ", " + prov.name; // Build the plain-text delivery or collection summary.
            // JavaScript statement/expression: deliveryHtml = // Build the HTML list shown in the result.
            deliveryHtml = // Build the HTML list shown in the result.
                // JavaScript statement/expression: "<li><strong>Delivery to:</strong> " + escapeHtml(inst.name) + (inst.city ? ", " + escapeHtml(inst.city) : "")
                "<li><strong>Delivery to:</strong> " + escapeHtml(inst.name) + (inst.city ? ", " + escapeHtml(inst.city) : "") + ", " + prov.name + "</li>" + // Continue building the text value used in this operation.
                // JavaScript statement/expression: "<li><strong>Earliest arrival:</strong> " + formatDate(readyBy) + " (" + leadDays + " working day" + (leadDays
                "<li><strong>Earliest arrival:</strong> " + formatDate(readyBy) + " (" + leadDays + " working day" + (leadDays > 1 ? "s" : "") + ")</li>" + // Continue building the text value used in this operation.
                // JavaScript statement/expression: "<li><strong>Handover window:</strong> Mon-Fri 10:00-16:00 at the student centre or main gate. Bring your stud
                "<li><strong>Handover window:</strong> Mon-Fri 10:00-16:00 at the student centre or main gate. Bring your student card.</li>" + // Continue building the text value used in this operation.
                // JavaScript statement/expression: "<li><strong>Delivery fee:</strong> quoted and confirmed before you pay.</li>"; // Continue building the text 
                "<li><strong>Delivery fee:</strong> quoted and confirmed before you pay.</li>"; // Continue building the text value used in this operation.
        // JavaScript statement/expression: } else { // Begin this block of code.
        } else { // Begin this block of code.
            // JavaScript statement/expression: const hub = prov.hubs[0]; // Declare a constant for use in this operation.
            const hub = prov.hubs[0]; // Declare a constant for use in this operation.
            // JavaScript statement/expression: deliveryText = "Collection at the " + hub.city + " hub, " + prov.name; // Build the plain-text delivery or col
            deliveryText = "Collection at the " + hub.city + " hub, " + prov.name; // Build the plain-text delivery or collection summary.
            // JavaScript statement/expression: deliveryHtml = // Build the HTML list shown in the result.
            deliveryHtml = // Build the HTML list shown in the result.
                // JavaScript statement/expression: "<li><strong>Collect from:</strong> " + hub.city + " hub, " + escapeHtml(hub.address) + "</li>" + // Continue 
                "<li><strong>Collect from:</strong> " + hub.city + " hub, " + escapeHtml(hub.address) + "</li>" + // Continue building the text value used in this operation.
                // JavaScript statement/expression: "<li><strong>Hub hours:</strong> " + hub.hours + "</li>" + // Continue building the text value used in this op
                "<li><strong>Hub hours:</strong> " + hub.hours + "</li>" + // Continue building the text value used in this operation.
                // JavaScript statement/expression: "<li><strong>Ready from:</strong> " + formatDate(addWorkingDays(now, afterCutoff ? 2 : 1)) + ". Collection is 
                "<li><strong>Ready from:</strong> " + formatDate(addWorkingDays(now, afterCutoff ? 2 : 1)) + ". Collection is free.</li>"; // Continue building the text value used in this operation.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // Builds the pre-filled email the user can send to confirm.
        // It follows a professional layout: a subject that names the request, a polite greeting,
        // the order details, a clear request and a courteous closing.
        // JavaScript statement/expression: const subject = "Availability Enquiry \u2013 " + item.value; // Declare a constant for use in this operation.
        const subject = "Availability Enquiry \u2013 " + item.value; // Declare a constant for use in this operation.
        // JavaScript statement/expression: const body = // Declare a constant for use in this operation.
        const body = // Declare a constant for use in this operation.
            // JavaScript statement/expression: "Dear Campus-Cart Team,\r\n\r\n" + // Continue building the text value used in this operation.
            "Dear Campus-Cart Team,\r\n\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "I am writing to enquire about the availability of the item below and, if it is available, to arrange to purch
            "I am writing to enquire about the availability of the item below and, if it is available, to arrange to purchase it.\r\n\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Item: " + item.value + "\r\n" + // Continue building the text value used in this operation.
            "Item: " + item.value + "\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Quantity: " + qty + "\r\n" + // Continue building the text value used in this operation.
            "Quantity: " + qty + "\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Estimated total: " + formatRand(total) + "\r\n" + // Continue building the text value used in this operation.
            "Estimated total: " + formatRand(total) + "\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Order method: " + deliveryText + "\r\n" + // Continue building the text value used in this operation.
            "Order method: " + deliveryText + "\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Institution: " + inst.name + " (" + prov.name + ")\r\n\r\n" + // Continue building the text value used in thi
            "Institution: " + inst.name + " (" + prov.name + ")\r\n\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Could you please confirm that the item is available and let me know the next steps for payment and " + // Con
            "Could you please confirm that the item is available and let me know the next steps for payment and " + // Continue building the text value used in this operation.
            // JavaScript statement/expression: (method.value === "Delivery" ? "delivery" : "collection") + "?\r\n\r\n" + // This line contributes to the curr
            (method.value === "Delivery" ? "delivery" : "collection") + "?\r\n\r\n" + // This line contributes to the current expression or data structure.
            // JavaScript statement/expression: "Thank you for your assistance. I look forward to your response.\r\n\r\n" + // Continue building the text valu
            "Thank you for your assistance. I look forward to your response.\r\n\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Kind regards,\r\n" + // Continue building the text value used in this operation.
            "Kind regards,\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: name.value.trim() + "\r\n" + // This line contributes to the current expression or data structure.
            name.value.trim() + "\r\n" + // This line contributes to the current expression or data structure.
            // JavaScript statement/expression: "(" + enquirerType.value + ")\r\n" + // Continue building the text value used in this operation.
            "(" + enquirerType.value + ")\r\n" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Email: " + email.value.trim(); // Continue building the text value used in this operation.
            "Email: " + email.value.trim(); // Continue building the text value used in this operation.
        // JavaScript statement/expression: const mailto = "mailto:" + (form.dataset.mailto || "enquiries@campus-cart.co.za") + // Build a link that opens
        const mailto = "mailto:" + (form.dataset.mailto || "enquiries@campus-cart.co.za") + // Build a link that opens the visitor’s email application.
            // JavaScript statement/expression: "?subject=" + encodeURIComponent(subject) + // Continue building the text value used in this operation.
            "?subject=" + encodeURIComponent(subject) + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "&body=" + encodeURIComponent(body); // Continue building the text value used in this operation.
            "&body=" + encodeURIComponent(body); // Continue building the text value used in this operation.

        // innerHTML is used because the response needs headings and a list.
        // User-typed text goes through escapeHtml() first so it cannot inject markup.
        // JavaScript statement/expression: result.innerHTML = // Update or inspect the relevant form or page element.
        result.innerHTML = // Update or inspect the relevant form or page element.
            // JavaScript statement/expression: "<h3>Thank you, " + escapeHtml(name.value.trim()) + "</h3>" + // Continue building the text value used in this
            "<h3>Thank you, " + escapeHtml(name.value.trim()) + "</h3>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<p class=\"" + statusClass + "\"><strong>Availability:</strong> " + availability + "</p>" + // Continue build
            "<p class=\"" + statusClass + "\"><strong>Availability:</strong> " + availability + "</p>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<ul>" + // Continue building the text value used in this operation.
            "<ul>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<li><strong>Item:</strong> " + escapeHtml(item.value) + " (" + product.type + ")</li>" + // Continue building
            "<li><strong>Item:</strong> " + escapeHtml(item.value) + " (" + product.type + ")</li>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<li><strong>Unit price:</strong> " + formatRand(product.price) + "</li>" + // Continue building the text valu
            "<li><strong>Unit price:</strong> " + formatRand(product.price) + "</li>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<li><strong>Quantity:</strong> " + qty + "</li>" + // Continue building the text value used in this operation
            "<li><strong>Quantity:</strong> " + qty + "</li>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<li><strong>Estimated total:</strong> " + formatRand(total) + "</li>" + // Continue building the text value u
            "<li><strong>Estimated total:</strong> " + formatRand(total) + "</li>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: deliveryHtml + // This line contributes to the current expression or data structure.
            deliveryHtml + // This line contributes to the current expression or data structure.
            // JavaScript statement/expression: "</ul>" + // Continue building the text value used in this operation.
            "</ul>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<p class=\"hint\">Estimates exclude public holidays. Stock, prices and delivery times are illustrative for th
            "<p class=\"hint\">Estimates exclude public holidays. Stock, prices and delivery times are illustrative for this demo site.</p>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<a class=\"cc-btn\" href=\"#\">Email this enquiry to us</a>"; // Continue building the text value used in thi
            "<a class=\"cc-btn\" href=\"#\">Email this enquiry to us</a>"; // Continue building the text value used in this operation.

        // Sets the mailto link through the DOM so the & characters in it are never misread as HTML.
        // JavaScript statement/expression: result.querySelector("a.cc-btn").href = mailto; // Update or inspect the relevant form or page element.
        result.querySelector("a.cc-btn").href = mailto; // Update or inspect the relevant form or page element.

        // JavaScript statement/expression: showBox2(result);
        showBox2(result);
        // JavaScript statement/expression: sendViaWeb3Forms(form, { subject: subject, from_name: name.value.trim(), email: email.value.trim(), message: b
        sendViaWeb3Forms(form, { subject: subject, from_name: name.value.trim(), email: email.value.trim(), message: body }, result);
        // JavaScript statement/expression: result.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Update or inspect the relevant form or pag
        result.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Update or inspect the relevant form or page element.
    // JavaScript statement/expression: }); // Close this block or callback.
    }); // Close this block or callback.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Replaces characters that have a special meaning in HTML so user text cannot inject markup.
// JavaScript statement/expression: function escapeHtml(text) { // Begin this block of code.
function escapeHtml(text) { // Begin this block of code.
    // JavaScript statement/expression: return text // Return the result to the code that called this function.
    return text // Return the result to the code that called this function.
        // JavaScript statement/expression: .replace(/&/g, "&amp;") // This line contributes to the current expression or data structure.
        .replace(/&/g, "&amp;") // This line contributes to the current expression or data structure.
        // JavaScript statement/expression: .replace(/</g, "&lt;") // This line contributes to the current expression or data structure.
        .replace(/</g, "&lt;") // This line contributes to the current expression or data structure.
        // JavaScript statement/expression: .replace(/>/g, "&gt;") // This line contributes to the current expression or data structure.
        .replace(/>/g, "&gt;") // This line contributes to the current expression or data structure.
        // JavaScript statement/expression: .replace(/"/g, "&quot;"); // Execute this statement to update state or produce a result.
        .replace(/"/g, "&quot;"); // Execute this statement to update state or produce a result.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.


// ==========================================================
// CONTACT EMAIL WORDING
// ==========================================================

// The answer in the "What would you like us to do?" list that needs a phone number.
// JavaScript statement/expression: const CALL_BACK = "Call or WhatsApp me"; // Shared option text used to decide whether a phone number is requir
const CALL_BACK = "Call or WhatsApp me"; // Shared option text used to decide whether a phone number is required.

// Turns the chosen outcome into a polite sentence for the email.
// JavaScript statement/expression: function outcomeSentence(choice, phoneNumber) { // Begin this block of code.
function outcomeSentence(choice, phoneNumber) { // Begin this block of code.
    // JavaScript statement/expression: if (choice === CALL_BACK) { // Begin this block of code.
    if (choice === CALL_BACK) { // Begin this block of code.
        // JavaScript statement/expression: return "I would appreciate it if you could call or WhatsApp me on " + phoneNumber + "."; // Return the result 
        return "I would appreciate it if you could call or WhatsApp me on " + phoneNumber + "."; // Return the result to the code that called this function.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.
    // JavaScript statement/expression: if (choice === "Arrange a refund") { // Begin this block of code.
    if (choice === "Arrange a refund") { // Begin this block of code.
        // JavaScript statement/expression: return "I would appreciate it if you could arrange a refund for me."; // Return the result to the code that ca
        return "I would appreciate it if you could arrange a refund for me."; // Return the result to the code that called this function.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.
    // JavaScript statement/expression: if (choice === "Arrange a replacement or swap") { // Begin this block of code.
    if (choice === "Arrange a replacement or swap") { // Begin this block of code.
        // JavaScript statement/expression: return "I would appreciate it if you could arrange a replacement or swap for me."; // Return the result to the
        return "I would appreciate it if you could arrange a replacement or swap for me."; // Return the result to the code that called this function.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.
    // JavaScript statement/expression: if (choice === "Update me on my order") { // Begin this block of code.
    if (choice === "Update me on my order") { // Begin this block of code.
        // JavaScript statement/expression: return "I would appreciate an update on the status of my order."; // Return the result to the code that called
        return "I would appreciate an update on the status of my order."; // Return the result to the code that called this function.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.
    // JavaScript statement/expression: return "I would appreciate a reply by email with the information I have requested."; // Return the result to t
    return "I would appreciate a reply by email with the information I have requested."; // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// Builds a clear subject line that names the problem or request, like
// "Complaint Regarding Order CC-1025" or "Order and Collection Query \u2013 Thandi Mokoena".
// JavaScript statement/expression: function buildContactSubject(topicText, orderRef, fullName) { // Begin this block of code.
function buildContactSubject(topicText, orderRef, fullName) { // Begin this block of code.
    // JavaScript statement/expression: const labels = { // Convert form topic labels into concise email subject wording.
    const labels = { // Convert form topic labels into concise email subject wording.
        // JavaScript statement/expression: "Order or collection question": "Order and Collection Query", // Continue building the text value used in this
        "Order or collection question": "Order and Collection Query", // Continue building the text value used in this operation.
        // JavaScript statement/expression: "Complaint or problem with an order": "Complaint Regarding Order", // Continue building the text value used in
        "Complaint or problem with an order": "Complaint Regarding Order", // Continue building the text value used in this operation.
        // JavaScript statement/expression: "Selling second-hand items": "Second-Hand Selling Query", // Continue building the text value used in this ope
        "Selling second-hand items": "Second-Hand Selling Query", // Continue building the text value used in this operation.
        // JavaScript statement/expression: "Parent Hub & bundles": "Parent Hub and Bundle Query", // Continue building the text value used in this operat
        "Parent Hub & bundles": "Parent Hub and Bundle Query", // Continue building the text value used in this operation.
        // JavaScript statement/expression: "Something else": "General Query" // Continue building the text value used in this operation.
        "Something else": "General Query" // Continue building the text value used in this operation.
    // JavaScript statement/expression: }; // Close the current code block.
    }; // Close the current code block.
    // JavaScript statement/expression: const label = labels[topicText] || "General Query"; // Declare a constant for use in this operation.
    const label = labels[topicText] || "General Query"; // Declare a constant for use in this operation.

    // A complaint with an order reference reads naturally as "Complaint Regarding Order CC-1025".
    // JavaScript statement/expression: if (topicText === "Complaint or problem with an order") { // Begin this block of code.
    if (topicText === "Complaint or problem with an order") { // Begin this block of code.
        // JavaScript statement/expression: return orderRef !== "" ? label + " " + orderRef : "Complaint Regarding My Order \u2013 " + fullName; // Return
        return orderRef !== "" ? label + " " + orderRef : "Complaint Regarding My Order \u2013 " + fullName; // Return the result to the code that called this function.
    // JavaScript statement/expression: } // Close this block or callback.
    } // Close this block or callback.
    // JavaScript statement/expression: return label + " \u2013 " + (orderRef !== "" ? "Order " + orderRef : fullName); // Return the result to the co
    return label + " \u2013 " + (orderRef !== "" ? "Order " + orderRef : fullName); // Return the result to the code that called this function.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.


// ==========================================================
// CONTACT FORM
// ==========================================================

// JavaScript statement/expression: function setupContactForm(form) { // Begin this block of code.
function setupContactForm(form) { // Begin this block of code.

    // Finds the fields that the code needs to read.
    // JavaScript statement/expression: const name = document.getElementById("c-name"); // Declare a constant for use in this operation.
    const name = document.getElementById("c-name"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const email = document.getElementById("c-email"); // Declare a constant for use in this operation.
    const email = document.getElementById("c-email"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const phone = document.getElementById("c-phone"); // Declare a constant for use in this operation.
    const phone = document.getElementById("c-phone"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const topic = document.getElementById("c-topic"); // Declare a constant for use in this operation.
    const topic = document.getElementById("c-topic"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const order = document.getElementById("c-order"); // Declare a constant for use in this operation.
    const order = document.getElementById("c-order"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const outcome = document.getElementById("c-outcome"); // Declare a constant for use in this operation.
    const outcome = document.getElementById("c-outcome"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const message = document.getElementById("c-message"); // Declare a constant for use in this operation.
    const message = document.getElementById("c-message"); // Declare a constant for use in this operation.
    // JavaScript statement/expression: const preview = document.getElementById("contact-preview"); // Declare a constant for use in this operation.
    const preview = document.getElementById("contact-preview"); // Declare a constant for use in this operation.

    // JavaScript statement/expression: clearErrorsOnInput(form); // Execute this statement to update state or produce a result.
    clearErrorsOnInput(form); // Execute this statement to update state or produce a result.

    // The fields in the order the visitor fills them in (see setupFormGate for how this list is used).
    // JavaScript statement/expression: const steps = [ // Declare a constant for use in this operation.
    const steps = [ // Declare a constant for use in this operation.
        // JavaScript statement/expression: { input: name, label: "Full name", check: function () { // Begin this block of code.
        { input: name, label: "Full name", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return name.value.trim().length < 2 || name.value.trim().length > 80 ? "Please enter a name between 2 and 80 c
            return name.value.trim().length < 2 || name.value.trim().length > 80 ? "Please enter a name between 2 and 80 characters." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: email, label: "Email address", check: function () { // Begin this block of code.
        { input: email, label: "Email address", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return email.value.trim().length > 120 || !isValidEmail(email.value.trim()) ? "Please enter a valid email addr
            return email.value.trim().length > 120 || !isValidEmail(email.value.trim()) ? "Please enter a valid email address (maximum 120 characters)." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: topic, label: "Topic", check: function () { // Begin this block of code.
        { input: topic, label: "Topic", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return topic.value === "" ? "Please choose a topic." : ""; // Return the result to the code that called this f
            return topic.value === "" ? "Please choose a topic." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: order, label: "Order reference", check: function () { // Begin this block of code.
        { input: order, label: "Order reference", check: function () { // Begin this block of code.
            // Optional, but if something is typed it must look like an order reference.
            // JavaScript statement/expression: return (order.value.trim() !== "" && (order.value.trim().length > 30 || !/^[A-Za-z0-9#\- ]{3,30}$/.test(order.
            return (order.value.trim() !== "" && (order.value.trim().length > 30 || !/^[A-Za-z0-9#\- ]{3,30}$/.test(order.value.trim()))) // Return the result to the code that called this function.
                // JavaScript statement/expression: ? "Use 3 to 30 letters, numbers, # or dashes, e.g. CC-1025." : ""; // Execute this statement to update state o
                ? "Use 3 to 30 letters, numbers, # or dashes, e.g. CC-1025." : ""; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: outcome, label: "What would you like us to do?", check: function () { // Begin this block of code.
        { input: outcome, label: "What would you like us to do?", check: function () { // Begin this block of code.
            // JavaScript statement/expression: return outcome.value === "" ? "Please tell us what you would like us to do." : ""; // Return the result to the
            return outcome.value === "" ? "Please tell us what you would like us to do." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: phone, label: "Phone / WhatsApp", check: function () { // Begin this block of code.
        { input: phone, label: "Phone / WhatsApp", check: function () { // Begin this block of code.
            // A phone number is needed when the visitor asks for a call or WhatsApp message.
            // JavaScript statement/expression: if (outcome.value === CALL_BACK && phone.value.trim() === "") { // Begin this block of code.
            if (outcome.value === CALL_BACK && phone.value.trim() === "") { // Begin this block of code.
                // JavaScript statement/expression: return "Please enter your phone number so we can call or WhatsApp you."; // Return the result to the code that
                return "Please enter your phone number so we can call or WhatsApp you."; // Return the result to the code that called this function.
            // JavaScript statement/expression: } // Close this block or callback.
            } // Close this block or callback.
            // Otherwise optional, but if something is typed it must look like a valid number.
            // JavaScript statement/expression: return (phone.value.trim() !== "" && (phone.value.trim().length > 20 || !isValidPhone(phone.value.trim()))) //
            return (phone.value.trim() !== "" && (phone.value.trim().length > 20 || !isValidPhone(phone.value.trim()))) // Return the result to the code that called this function.
                // JavaScript statement/expression: ? "Please enter a valid number, e.g. 082 000 0000 or +27 82 000 0000." : ""; // Execute this statement to upda
                ? "Please enter a valid number, e.g. 082 000 0000 or +27 82 000 0000." : ""; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } }, // Close the current code block.
        } }, // Close the current code block.
        // JavaScript statement/expression: { input: message, label: "Message", check: function () { // Begin this block of code.
        { input: message, label: "Message", check: function () { // Begin this block of code.
            // At least 10 characters so the message contains something useful.
            // JavaScript statement/expression: return message.value.trim().length < 10 || message.value.trim().length > 1000 ? "Please enter a message betwee
            return message.value.trim().length < 10 || message.value.trim().length > 1000 ? "Please enter a message between 10 and 1,000 characters." : ""; // Return the result to the code that called this function.
        // JavaScript statement/expression: } } // Close the current code block.
        } } // Close the current code block.
    // JavaScript statement/expression: ]; // Finish this array or object definition. // Execute this statement to update state or produce a result.
    ]; // Finish this array or object definition. // Execute this statement to update state or produce a result.

    // Runs when the user presses the submit button.
    // JavaScript statement/expression: form.addEventListener("submit", function (event) { // Begin this block of code.
    form.addEventListener("submit", function (event) { // Begin this block of code.

        // Stops the browser from reloading the page.
        // JavaScript statement/expression: event.preventDefault(); // Execute this statement to update state or produce a result.
        event.preventDefault(); // Execute this statement to update state or produce a result.

        // Hides any earlier preview.
        // JavaScript statement/expression: showBox(preview, false);
        showBox(preview, false);

        // JavaScript statement/expression: let valid = true; // Declare a variable whose value may change.
        let valid = true; // Declare a variable whose value may change.
        // JavaScript statement/expression: let firstBad = null; // Declare a variable whose value may change.
        let firstBad = null; // Declare a variable whose value may change.

        // JavaScript statement/expression: function fail(input, msg) { // Begin this block of code.
        function fail(input, msg) { // Begin this block of code.
            // JavaScript statement/expression: showError(input, msg); // Execute this statement to update state or produce a result.
            showError(input, msg); // Execute this statement to update state or produce a result.
            // JavaScript statement/expression: valid = false; // Execute this statement to update state or produce a result.
            valid = false; // Execute this statement to update state or produce a result.
            // JavaScript statement/expression: if (!firstBad) { firstBad = input; } // Run this block only when the condition is true.
            if (!firstBad) { firstBad = input; } // Run this block only when the condition is true.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // Runs every check from the steps list.
        // JavaScript statement/expression: steps.forEach(function (step) { // Begin this block of code.
        steps.forEach(function (step) { // Begin this block of code.
            // JavaScript statement/expression: const problem = step.check(); // Declare a constant for use in this operation.
            const problem = step.check(); // Declare a constant for use in this operation.
            // JavaScript statement/expression: if (problem !== "") { fail(step.input, problem); } // Run this block only when the condition is true.
            if (problem !== "") { fail(step.input, problem); } // Run this block only when the condition is true.
        // JavaScript statement/expression: }); // Close this block or callback.
        }); // Close this block or callback.

        // Stops here and focuses the first problem field.
        // JavaScript statement/expression: if (!valid) { // Begin this block of code.
        if (!valid) { // Begin this block of code.
            // JavaScript statement/expression: firstBad.focus(); // Execute this statement to update state or produce a result.
            firstBad.focus(); // Execute this statement to update state or produce a result.
            // JavaScript statement/expression: return; // Execute this statement to update state or produce a result.
            return; // Execute this statement to update state or produce a result.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // ----- Compile the validated information into a professional email -----
        // The email follows the layout of a formal message: a clear subject, a polite greeting,
        // relevant details, a clear request and a courteous closing.
        // JavaScript statement/expression: const recipient = form.dataset.mailto || "hello@campus-cart.co.za"; // Read the email address configured in th
        const recipient = form.dataset.mailto || "hello@campus-cart.co.za"; // Read the email address configured in the form's data-mailto attribute.
        // JavaScript statement/expression: const subject = buildContactSubject(topic.value, order.value.trim(), name.value.trim()); // Declare a constant
        const subject = buildContactSubject(topic.value, order.value.trim(), name.value.trim()); // Declare a constant for use in this operation.

        // JavaScript statement/expression: const lines = [ // Build the email body as separate lines before joining them.
        const lines = [ // Build the email body as separate lines before joining them.
            // JavaScript statement/expression: "Dear Campus-Cart Team,", // Continue building the text value used in this operation.
            "Dear Campus-Cart Team,", // Continue building the text value used in this operation.
            // JavaScript statement/expression: "", // Continue building the text value used in this operation.
            "", // Continue building the text value used in this operation.
            // JavaScript statement/expression: "I am writing to you about: " + topic.value + ".", // Continue building the text value used in this operation.
            "I am writing to you about: " + topic.value + ".", // Continue building the text value used in this operation.
            // JavaScript statement/expression: "" // Continue building the text value used in this operation.
            "" // Continue building the text value used in this operation.
        // JavaScript statement/expression: ]; // Finish this array or object definition.
        ]; // Finish this array or object definition.

        // The order reference is only added when the visitor gave one.
        // JavaScript statement/expression: if (order.value.trim() !== "") { // Begin this block of code.
        if (order.value.trim() !== "") { // Begin this block of code.
            // JavaScript statement/expression: lines.push("Order reference: " + order.value.trim(), ""); // Add the next section of text to the email body.
            lines.push("Order reference: " + order.value.trim(), ""); // Add the next section of text to the email body.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // JavaScript statement/expression: lines.push( // Add the next section of text to the email body.
        lines.push( // Add the next section of text to the email body.
            // JavaScript statement/expression: "Details:", // Continue building the text value used in this operation.
            "Details:", // Continue building the text value used in this operation.
            // JavaScript statement/expression: message.value.trim(), // This line contributes to the current expression or data structure.
            message.value.trim(), // This line contributes to the current expression or data structure.
            // JavaScript statement/expression: "", // Continue building the text value used in this operation.
            "", // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Requested outcome:", // Continue building the text value used in this operation.
            "Requested outcome:", // Continue building the text value used in this operation.
            // JavaScript statement/expression: outcomeSentence(outcome.value, phone.value.trim()), // This line contributes to the current expression or data
            outcomeSentence(outcome.value, phone.value.trim()), // This line contributes to the current expression or data structure.
            // JavaScript statement/expression: "", // Continue building the text value used in this operation.
            "", // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Thank you for your time and assistance. I look forward to your response.", // Continue building the text valu
            "Thank you for your time and assistance. I look forward to your response.", // Continue building the text value used in this operation.
            // JavaScript statement/expression: "", // Continue building the text value used in this operation.
            "", // Continue building the text value used in this operation.
            // JavaScript statement/expression: "Kind regards,", // Continue building the text value used in this operation.
            "Kind regards,", // Continue building the text value used in this operation.
            // JavaScript statement/expression: name.value.trim(), // This line contributes to the current expression or data structure.
            name.value.trim(), // This line contributes to the current expression or data structure.
            // JavaScript statement/expression: "Email: " + email.value.trim() // Continue building the text value used in this operation.
            "Email: " + email.value.trim() // Continue building the text value used in this operation.
        // JavaScript statement/expression: ); // Execute this statement to update state or produce a result.
        ); // Execute this statement to update state or produce a result.

        // The phone number is only added when the visitor gave one.
        // JavaScript statement/expression: if (phone.value.trim() !== "") { // Begin this block of code.
        if (phone.value.trim() !== "") { // Begin this block of code.
            // JavaScript statement/expression: lines.push("Phone: " + phone.value.trim()); // Add the next section of text to the email body.
            lines.push("Phone: " + phone.value.trim()); // Add the next section of text to the email body.
        // JavaScript statement/expression: } // Close this block or callback.
        } // Close this block or callback.

        // JavaScript statement/expression: const body = lines.join("\r\n"); // Use CRLF line breaks for the email body.
        const body = lines.join("\r\n"); // Use CRLF line breaks for the email body.

        // Builds the mailto link. encodeURIComponent makes spaces and symbols safe in a URL.
        // JavaScript statement/expression: const mailto = "mailto:" + recipient + // Declare a constant for use in this operation.
        const mailto = "mailto:" + recipient + // Declare a constant for use in this operation.
            // JavaScript statement/expression: "?subject=" + encodeURIComponent(subject) + // Continue building the text value used in this operation.
            "?subject=" + encodeURIComponent(subject) + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "&body=" + encodeURIComponent(body); // Continue building the text value used in this operation.
            "&body=" + encodeURIComponent(body); // Continue building the text value used in this operation.

        // Shows the compiled email so the user can check it before sending.
        // JavaScript statement/expression: preview.innerHTML = // Update or inspect the relevant form or page element.
        preview.innerHTML = // Update or inspect the relevant form or page element.
            // JavaScript statement/expression: "<h3>Your email is ready</h3>" + // Continue building the text value used in this operation.
            "<h3>Your email is ready</h3>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<p><strong>To:</strong> " + escapeHtml(recipient) + "<br>" + // Continue building the text value used in this
            "<p><strong>To:</strong> " + escapeHtml(recipient) + "<br>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<strong>Subject:</strong> " + escapeHtml(subject) + "</p>" + // Continue building the text value used in this
            "<strong>Subject:</strong> " + escapeHtml(subject) + "</p>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<pre>" + escapeHtml(body) + "</pre>" + // Continue building the text value used in this operation.
            "<pre>" + escapeHtml(body) + "</pre>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<a class=\"cc-btn\" href=\"#\">Open in my email app and send</a>" + // Continue building the text value used 
            "<a class=\"cc-btn\" href=\"#\">Open in my email app and send</a>" + // Continue building the text value used in this operation.
            // JavaScript statement/expression: "<p class=\"hint\">Your message is sent to our team automatically. If that fails, use the button above to send
            "<p class=\"hint\">Your message is sent to our team automatically. If that fails, use the button above to send it from your email app.</p>"; // Continue building the text value used in this operation.

        // Sets the mailto link through the DOM so the & characters in it are never misread as HTML.
        // JavaScript statement/expression: preview.querySelector("a.cc-btn").href = mailto; // Update or inspect the relevant form or page element.
        preview.querySelector("a.cc-btn").href = mailto; // Update or inspect the relevant form or page element.

        // Makes the preview visible and scrolls it into view.
        // JavaScript statement/expression: showBox2(preview);
        showBox2(preview);
        // JavaScript statement/expression: sendViaWeb3Forms(form, { subject: subject, from_name: name.value.trim(), email: email.value.trim(), message: b
        sendViaWeb3Forms(form, { subject: subject, from_name: name.value.trim(), email: email.value.trim(), message: body }, preview);
        // JavaScript statement/expression: preview.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Update or inspect the relevant form or pa
        preview.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Update or inspect the relevant form or page element.
    // JavaScript statement/expression: }); // Close this block or callback.
    }); // Close this block or callback.
// JavaScript statement/expression: } // Close this block or callback.
} // Close this block or callback.

// ==========================================================
// CAMPUS-CART
// Forms JavaScript (ICE Task 4 / Part 3)
// - Enquiry form: validates, then shows a cost and availability response
// - Contact form: validates, then compiles an email the user can send
// ==========================================================

// Waits until the HTML page has finished loading before running the code.
document.addEventListener("DOMContentLoaded", function () {

    // Looks for each form on the current page. Only one of them exists on each page.
    const enquiryForm = document.getElementById("enquiry-form");
    const contactForm = document.getElementById("contact-form");

    // Starts the enquiry code only if the enquiry form is on this page.
    if (enquiryForm) {
        loadStockFromFile();
        setupEnquiryForm(enquiryForm);
    }

    // Starts the coverage search only if the search box is on this page.
    const searchBox = document.getElementById("coverage-search");
    if (searchBox) {
        setupCoverageSearch(searchBox);
    }

    // Starts the contact code only if the contact form is on this page.
    if (contactForm) {
        setupContactForm(contactForm);
    }
});


// ==========================================================
// SHARED HELPER FUNCTIONS
// ==========================================================

// Shows an error message under a field and marks the field as invalid for screen readers.
function showError(input, message) {

    // Finds the empty <span> that sits next to this field and holds its error message.
    const errorBox = document.getElementById(input.id + "-error");

    // Writes the message into the span, if the span exists.
    if (errorBox) {
        errorBox.textContent = message;
    }

    // Adds a CSS class so the field gets a red border.
    input.classList.add("input-error");

    // Tells assistive technology that the value in this field is not valid.
    input.setAttribute("aria-invalid", "true");
}

// Clears the error message from a field.
function clearError(input) {

    // Finds the error span for this field.
    const errorBox = document.getElementById(input.id + "-error");

    // Empties the message text.
    if (errorBox) {
        errorBox.textContent = "";
    }

    // Removes the red border and the invalid flag.
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
}

// Checks an email address against a simple pattern: text, an @ sign, text, a dot, text.
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Checks a South African style phone number. Spaces, dashes and a +27 start are allowed.
function isValidPhone(value) {

    // Removes spaces, dashes and brackets so only digits (and a possible +) remain.
    const cleaned = value.replace(/[\s\-()]/g, "");

    // Accepts 0 followed by 9 digits (e.g. 0821234567) or +27 followed by 9 digits.
    return /^(0\d{9}|\+27\d{9})$/.test(cleaned);
}

// Formats a number as South African Rand, e.g. 2799 becomes "R2 799.00".
function formatRand(amount) {

    // toFixed(2) gives two decimal places. The regular expression adds a space every 3 digits.
    return "R" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Removes the "dirty" state from every field in a form when the user starts typing again.
function clearErrorsOnInput(form) {

    // Listens for typing/changes anywhere in the form (event bubbling).
    form.addEventListener("input", function (event) {

        // Only fields (not buttons) are cleared.
        if (event.target.id) {
            clearError(event.target);
        }
    });
}


// ==========================================================
// STEP-BY-STEP FORM GATE
// ==========================================================

// Stops a visitor from continuing with a form until the current field is correct.
// "steps" is the list of fields in the order they are filled in. Each step has:
//   input - the field,  label - its name for the status message,
//   check - a function that returns an error message, or "" when the field is fine.
// A field after an invalid one is locked (made inert, so it cannot be clicked or tabbed to),
// and the submit button stays disabled until every field is valid.
function setupFormGate(form, steps) {

    const submitButton = form.querySelector("[type=submit]");

    // A short message above the button tells the visitor what to do next.
    const status = document.createElement("p");
    status.className = "gate-status";
    status.setAttribute("aria-live", "polite");
    submitButton.parentNode.insertBefore(status, submitButton);

    // Works out which fields are locked and whether the form can be submitted.
    function refresh() {
        let blockedBy = null;

        steps.forEach(function (step) {
            const group = step.input.closest(".form-group");

            // Fields that are hidden right now (such as "Name of your institution") are not part of the path.
            if (group.hidden) {
                group.inert = false;
                return;
            }

            // Everything after the first invalid field is locked.
            const locked = blockedBy !== null;
            group.inert = locked;
            group.classList.toggle("field-locked", locked);

            if (!locked && step.check() !== "") {
                blockedBy = step;
            }
        });

        submitButton.disabled = blockedBy !== null;
        status.textContent = blockedBy
            ? "To continue, please complete \u201C" + blockedBy.label + "\u201D correctly."
            : "All details look good. You can continue.";
    }

    // Checks again whenever the visitor types, picks an option or the browser autofills.
    form.addEventListener("input", refresh);
    form.addEventListener("change", refresh);

    // When the visitor leaves a field, its error appears straight away so they know what to fix.
    steps.forEach(function (step) {
        step.input.addEventListener("blur", function () {
            const message = step.check();
            if (message !== "") {
                showError(step.input, message);
            } else {
                clearError(step.input);
            }
        });
    });

    refresh();
}


// ==========================================================
// ENQUIRY FORM
// ==========================================================

// Illustrative stock levels for the demo site. The site has no database,
// so the availability response is worked out from this table.
const STOCK = {
    "Basic Starter Bundle":       { price: 1499, stock: 12, type: "New" },
    "Standard Starter Bundle":    { price: 2799, stock: 8,  type: "New" },
    "Premium Starter Bundle":     { price: 4499, stock: 3,  type: "New" },
    "Duvet & Linen Set (Double)": { price: 749,  stock: 20, type: "New" },
    "Electric Kettle 1.7L":       { price: 289,  stock: 25, type: "New" },
    "Stationery Mega Pack":       { price: 249,  stock: 30, type: "New" },
    "Load-Shedding Light Kit":    { price: 329,  stock: 0,  type: "New" },
    "Study Desk":                 { price: 650,  stock: 1,  type: "Second-hand" },
    "Mini Bar Fridge":            { price: 1150, stock: 1,  type: "Second-hand" },
    "Accounting Textbook Set":    { price: 420,  stock: 1,  type: "Second-hand" },
    "Laptop Bag 15\"":            { price: 180,  stock: 1,  type: "Second-hand" },
    "Two-Tier Bookshelf":         { price: 380,  stock: 1,  type: "Second-hand" },
    "Study Chair":                { price: 450,  stock: 1,  type: "Second-hand" }
};

// Loads the latest stock levels from assets/data/stock.json using AJAX (fetch),
// so the enquiry page can be updated without editing any JavaScript.
// If the file cannot be loaded (for example when the page is opened straight from a
// folder instead of a web server), the built-in STOCK table above is used instead.
function loadStockFromFile() {
    if (typeof fetch !== "function") { return; }

    fetch("../assets/data/stock.json", { cache: "no-cache" })
        .then(function (response) {
            if (!response.ok) { throw new Error("Stock file not found"); }
            return response.json();
        })
        .then(function (data) {
            Object.keys(data).forEach(function (name) {
                const item = data[name];
                // Only accept entries that have the expected number fields.
                if (item && typeof item.price === "number" && typeof item.stock === "number") {
                    STOCK[name] = { price: item.price, stock: item.stock, type: String(item.type) };
                }
            });
        })
        .catch(function () {
            // Keep the built-in table. The enquiry form still works.
        });
}

// Adds working days to a date, skipping Saturdays and Sundays (public holidays are not counted).
function addWorkingDays(start, days) {
    const d = new Date(start);
    while (days > 0) {
        d.setDate(d.getDate() + 1);
        // getDay() returns 0 for Sunday and 6 for Saturday.
        if (d.getDay() !== 0 && d.getDay() !== 6) { days--; }
    }
    return d;
}

// Formats a date like "Thu, 8 Oct 2026" for South African readers.
function formatDate(d) {
    return d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

// Finds the province object for the chosen province code.
function getProvince(code) {
    return PROVINCES.find(function (p) { return p.code === code; });
}

function setupEnquiryForm(form) {

    // Finds the fields that the code needs to read.
    const enquirerType = document.getElementById("enq-type");
    const name = document.getElementById("enq-name");
    const email = document.getElementById("enq-email");
    const item = document.getElementById("enq-item");
    const quantity = document.getElementById("enq-qty");
    const method = document.getElementById("enq-method");
    const province = document.getElementById("enq-province");
    const institution = document.getElementById("enq-institution");
    const result = document.getElementById("enquiry-result");

    // Fills the province list from data.js (one option per province).
    PROVINCES.forEach(function (p) {
        province.add(new Option(p.name, p.code));
    });

    // The extra text box for an institution that is not on the list.
    const otherGroup = document.getElementById("enq-other-group");
    const other = document.getElementById("enq-other");

    // Adds one <optgroup> (a labelled group of options) to the institution list.
    function addGroup(label, names) {
        if (names.length === 0) { return; }
        const group = document.createElement("optgroup");
        group.label = label;
        names.forEach(function (n) { group.appendChild(new Option(n, n)); });
        institution.appendChild(group);
    }

    // When a province is chosen, fills the institution list with that province's public and private institutions.
    province.addEventListener("change", function () {
        // Removes every option and group after the first "Choose..." option.
        // (Setting institution.length = 1 can leave empty <optgroup> elements behind.)
        while (institution.children.length > 1) {
            institution.removeChild(institution.lastChild);
        }
        otherGroup.hidden = true;
        const chosen = getProvince(province.value);
        if (!chosen) {
            institution.options[0].text = "Choose a province first...";
            institution.disabled = true;
            return;
        }
        institution.options[0].text = "Choose your institution...";

        // Filters the province's institutions by type and adds a group for each type.
        function namesOfType(type) {
            return chosen.institutions.filter(function (i) { return i.type === type; })
                                      .map(function (i) { return i.name; });
        }
        addGroup("Public universities", namesOfType("University"));
        addGroup("Public TVET colleges", namesOfType("TVET college"));
        addGroup("Private institutions in " + chosen.name, namesOfType("Private institution"));
        addGroup("National private providers", NATIONAL_PRIVATE);
        addGroup("Not on the list?", ["My institution is not listed"]);
        institution.disabled = false;
    });

    // Shows the extra text box when the user picks "My institution is not listed".
    institution.addEventListener("change", function () {
        otherGroup.hidden = institution.value !== "My institution is not listed";
    });

    // Clears a field's error message as soon as the user edits that field.
    clearErrorsOnInput(form);

    // The fields in the order the visitor fills them in. Each check returns an error message,
    // or "" when the field is fine. The same checks lock the later fields (setupFormGate)
    // and are used again when the form is submitted.
    const steps = [
        { input: enquirerType, label: "I am a", check: function () {
            return enquirerType.value === "" ? "Please choose whether you are a student or a parent." : "";
        } },
        { input: name, label: "Full name", check: function () {
            return name.value.trim().length < 2 ? "Please enter your full name (at least 2 characters)." : "";
        } },
        { input: email, label: "Email address", check: function () {
            return !isValidEmail(email.value.trim()) ? "Please enter a valid email address, e.g. you@example.co.za." : "";
        } },
        { input: item, label: "Bundle or product", check: function () {
            return item.value === "" ? "Please choose a bundle or product." : "";
        } },
        { input: quantity, label: "Quantity", check: function () {
            const amount = Number(quantity.value);
            return (quantity.value === "" || !Number.isInteger(amount) || amount < 1 || amount > 10) ? "Please enter a whole number from 1 to 10." : "";
        } },
        { input: method, label: "How do you want to get it?", check: function () {
            return method.value === "" ? "Please choose delivery or collection." : "";
        } },
        { input: province, label: "Province", check: function () {
            return province.value === "" ? "Please choose your province." : "";
        } },
        { input: institution, label: "Institution", check: function () {
            return institution.value === "" ? "Please choose your institution." : "";
        } },
        { input: other, label: "Name of your institution", check: function () {
            // If the institution is not on the list, the user must type its name.
            return (institution.value === "My institution is not listed" && other.value.trim().length < 3) ? "Please type the name of your institution." : "";
        } }
    ];

    setupFormGate(form, steps);

    // Runs when the user presses the submit button.
    form.addEventListener("submit", function (event) {

        // Stops the browser from reloading the page.
        event.preventDefault();

        // Clears the previous response.
        result.innerHTML = "";
        result.classList.remove("show");

        let valid = true;
        let firstBad = null;

        // Records the error and remembers the first invalid field.
        function fail(input, message) {
            showError(input, message);
            valid = false;
            if (!firstBad) { firstBad = input; }
        }

        // Runs every check from the steps list. Fields that are hidden right now are skipped.
        steps.forEach(function (step) {
            if (step.input.closest(".form-group").hidden) { return; }
            const message = step.check();
            if (message !== "") { fail(step.input, message); }
        });
        const qty = Number(quantity.value);

        // Stops here and moves the cursor to the first problem field.
        if (!valid) {
            firstBad.focus();
            return;
        }

        // ----- Processing: work out the response from the validated input -----
        const product = STOCK[item.value];
        const total = product.price * qty;
        const prov = getProvince(province.value);
        // Looks the institution up. National private providers and typed-in institutions have no town,
        // so the province's typical delivery time is used for them.
        let inst = prov.institutions.find(function (i) { return i.name === institution.value; });
        if (!inst) {
            const typed = institution.value === "My institution is not listed";
            inst = { name: typed ? other.value.trim() : institution.value, type: "Private institution", city: "" };
        }

        // Availability message from the stock table.
        let availability;
        let statusClass;
        if (product.stock === 0) {
            availability = "Currently out of stock. Send us a message and we will notify you when it is back.";
            statusClass = "status-out";
        } else if (product.type === "Second-hand" && qty > 1) {
            availability = "This second-hand item is a single listing, so only 1 is available.";
            statusClass = "status-low";
        } else if (qty > product.stock) {
            availability = "Only " + product.stock + " in stock. We can reserve " + product.stock + " now and the rest on the next restock.";
            statusClass = "status-low";
        } else {
            availability = "In stock. We can reserve " + qty + " for you.";
            statusClass = "status-ok";
        }

        // Delivery working days: 1 if the institution is in a hub city, otherwise the province's typical time.
        const inHubCity = prov.hubs.some(function (h) { return h.city === inst.city; });
        const leadDays = inHubCity ? 1 : prov.leadDays;

        // Orders placed before 12:00 on a weekday are dispatched the same day; later orders count from the next working day.
        const now = new Date();
        const afterCutoff = now.getHours() >= 12 || now.getDay() === 0 || now.getDay() === 6;
        const readyBy = addWorkingDays(now, leadDays + (afterCutoff ? 1 : 0));

        // Builds the delivery or collection lines for the response.
        let deliveryHtml;
        let deliveryText;
        if (method.value === "Delivery") {
            deliveryText = "Delivery to " + inst.name + (inst.city ? " (" + inst.city + ")" : "") + ", " + prov.name;
            deliveryHtml =
                "<li><strong>Delivery to:</strong> " + escapeHtml(inst.name) + (inst.city ? ", " + escapeHtml(inst.city) : "") + ", " + prov.name + "</li>" +
                "<li><strong>Earliest arrival:</strong> " + formatDate(readyBy) + " (" + leadDays + " working day" + (leadDays > 1 ? "s" : "") + ")</li>" +
                "<li><strong>Handover window:</strong> Mon-Fri 10:00-16:00 at the student centre or main gate. Bring your student card.</li>" +
                "<li><strong>Delivery fee:</strong> quoted and confirmed before you pay.</li>";
        } else {
            const hub = prov.hubs[0];
            deliveryText = "Collection at the " + hub.city + " hub, " + prov.name;
            deliveryHtml =
                "<li><strong>Collect from:</strong> " + hub.city + " hub, " + escapeHtml(hub.address) + "</li>" +
                "<li><strong>Hub hours:</strong> " + hub.hours + "</li>" +
                "<li><strong>Ready from:</strong> " + formatDate(addWorkingDays(now, afterCutoff ? 2 : 1)) + ". Collection is free.</li>";
        }

        // Builds the pre-filled email the user can send to confirm.
        // It follows a professional layout: a subject that names the request, a polite greeting,
        // the order details, a clear request and a courteous closing.
        const subject = "Availability Enquiry \u2013 " + item.value;
        const body =
            "Dear Campus-Cart Team,\r\n\r\n" +
            "I am writing to enquire about the availability of the item below and, if it is available, to arrange to purchase it.\r\n\r\n" +
            "Item: " + item.value + "\r\n" +
            "Quantity: " + qty + "\r\n" +
            "Estimated total: " + formatRand(total) + "\r\n" +
            "Order method: " + deliveryText + "\r\n" +
            "Institution: " + inst.name + " (" + prov.name + ")\r\n\r\n" +
            "Could you please confirm that the item is available and let me know the next steps for payment and " +
            (method.value === "Delivery" ? "delivery" : "collection") + "?\r\n\r\n" +
            "Thank you for your assistance. I look forward to your response.\r\n\r\n" +
            "Kind regards,\r\n" +
            name.value.trim() + "\r\n" +
            "(" + enquirerType.value + ")\r\n" +
            "Email: " + email.value.trim();
        const mailto = "mailto:" + form.dataset.mailto +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        // innerHTML is used because the response needs headings and a list.
        // User-typed text goes through escapeHtml() first so it cannot inject markup.
        result.innerHTML =
            "<h3>Thank you, " + escapeHtml(name.value.trim()) + "</h3>" +
            "<p class=\"" + statusClass + "\"><strong>Availability:</strong> " + availability + "</p>" +
            "<ul>" +
            "<li><strong>Item:</strong> " + escapeHtml(item.value) + " (" + product.type + ")</li>" +
            "<li><strong>Unit price:</strong> " + formatRand(product.price) + "</li>" +
            "<li><strong>Quantity:</strong> " + qty + "</li>" +
            "<li><strong>Estimated total:</strong> " + formatRand(total) + "</li>" +
            deliveryHtml +
            "</ul>" +
            "<p class=\"hint\">Estimates exclude public holidays. Stock, prices and delivery times are illustrative for this demo site.</p>" +
            "<a class=\"btn btn-navy\" href=\"#\">Email this enquiry to us</a>";

        // Sets the mailto link through the DOM so the & characters in it are never misread as HTML.
        result.querySelector("a.btn").href = mailto;

        result.classList.add("show");
        result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
}

// Replaces characters that have a special meaning in HTML so user text cannot inject markup.
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}


// ==========================================================
// CONTACT EMAIL WORDING
// ==========================================================

// The answer in the "What would you like us to do?" list that needs a phone number.
const CALL_BACK = "Call or WhatsApp me";

// Turns the chosen outcome into a polite sentence for the email.
function outcomeSentence(choice, phoneNumber) {
    if (choice === CALL_BACK) {
        return "I would appreciate it if you could call or WhatsApp me on " + phoneNumber + ".";
    }
    if (choice === "Arrange a refund") {
        return "I would appreciate it if you could arrange a refund for me.";
    }
    if (choice === "Arrange a replacement or swap") {
        return "I would appreciate it if you could arrange a replacement or swap for me.";
    }
    if (choice === "Update me on my order") {
        return "I would appreciate an update on the status of my order.";
    }
    return "I would appreciate a reply by email with the information I have requested.";
}

// Builds a clear subject line that names the problem or request, like
// "Complaint Regarding Order CC-1025" or "Order and Collection Query \u2013 Thandi Mokoena".
function buildContactSubject(topicText, orderRef, fullName) {
    const labels = {
        "Order or collection question": "Order and Collection Query",
        "Complaint or problem with an order": "Complaint Regarding Order",
        "Selling second-hand items": "Second-Hand Selling Query",
        "Parent Hub & bundles": "Parent Hub and Bundle Query",
        "Something else": "General Query"
    };
    const label = labels[topicText] || "General Query";

    // A complaint with an order reference reads naturally as "Complaint Regarding Order CC-1025".
    if (topicText === "Complaint or problem with an order") {
        return orderRef !== "" ? label + " " + orderRef : "Complaint Regarding My Order \u2013 " + fullName;
    }
    return label + " \u2013 " + (orderRef !== "" ? "Order " + orderRef : fullName);
}


// ==========================================================
// CONTACT FORM
// ==========================================================

function setupContactForm(form) {

    // Finds the fields that the code needs to read.
    const name = document.getElementById("c-name");
    const email = document.getElementById("c-email");
    const phone = document.getElementById("c-phone");
    const topic = document.getElementById("c-topic");
    const order = document.getElementById("c-order");
    const outcome = document.getElementById("c-outcome");
    const message = document.getElementById("c-message");
    const preview = document.getElementById("contact-preview");

    clearErrorsOnInput(form);

    // The fields in the order the visitor fills them in (see setupFormGate for how this list is used).
    const steps = [
        { input: name, label: "Full name", check: function () {
            return name.value.trim().length < 2 ? "Please enter your full name (at least 2 characters)." : "";
        } },
        { input: email, label: "Email address", check: function () {
            return !isValidEmail(email.value.trim()) ? "Please enter a valid email address, e.g. you@example.co.za." : "";
        } },
        { input: topic, label: "Topic", check: function () {
            return topic.value === "" ? "Please choose a topic." : "";
        } },
        { input: order, label: "Order reference", check: function () {
            // Optional, but if something is typed it must look like an order reference.
            return (order.value.trim() !== "" && !/^[A-Za-z0-9#\- ]{3,30}$/.test(order.value.trim()))
                ? "Use 3 to 30 letters, numbers, # or dashes, e.g. CC-1025." : "";
        } },
        { input: outcome, label: "What would you like us to do?", check: function () {
            return outcome.value === "" ? "Please tell us what you would like us to do." : "";
        } },
        { input: phone, label: "Phone / WhatsApp", check: function () {
            // A phone number is needed when the visitor asks for a call or WhatsApp message.
            if (outcome.value === CALL_BACK && phone.value.trim() === "") {
                return "Please enter your phone number so we can call or WhatsApp you.";
            }
            // Otherwise optional, but if something is typed it must look like a valid number.
            return (phone.value.trim() !== "" && !isValidPhone(phone.value.trim()))
                ? "Please enter a valid number, e.g. 082 000 0000 or +27 82 000 0000." : "";
        } },
        { input: message, label: "Message", check: function () {
            // At least 10 characters so the message contains something useful.
            return message.value.trim().length < 10 ? "Please type a message of at least 10 characters." : "";
        } }
    ];

    setupFormGate(form, steps);

    // Runs when the user presses the submit button.
    form.addEventListener("submit", function (event) {

        // Stops the browser from reloading the page.
        event.preventDefault();

        // Hides any earlier preview.
        preview.innerHTML = "";
        preview.classList.remove("show");

        let valid = true;
        let firstBad = null;

        function fail(input, msg) {
            showError(input, msg);
            valid = false;
            if (!firstBad) { firstBad = input; }
        }

        // Runs every check from the steps list.
        steps.forEach(function (step) {
            const problem = step.check();
            if (problem !== "") { fail(step.input, problem); }
        });

        // Stops here and focuses the first problem field.
        if (!valid) {
            firstBad.focus();
            return;
        }

        // ----- Compile the validated information into a professional email -----
        // The email follows the layout of a formal message: a clear subject, a polite greeting,
        // relevant details, a clear request and a courteous closing.
        const recipient = form.dataset.mailto;
        const subject = buildContactSubject(topic.value, order.value.trim(), name.value.trim());

        const lines = [
            "Dear Campus-Cart Team,",
            "",
            "I am writing to you about: " + topic.value + ".",
            ""
        ];

        // The order reference is only added when the visitor gave one.
        if (order.value.trim() !== "") {
            lines.push("Order reference: " + order.value.trim(), "");
        }

        lines.push(
            "Details:",
            message.value.trim(),
            "",
            "Requested outcome:",
            outcomeSentence(outcome.value, phone.value.trim()),
            "",
            "Thank you for your time and assistance. I look forward to your response.",
            "",
            "Kind regards,",
            name.value.trim(),
            "Email: " + email.value.trim()
        );

        // The phone number is only added when the visitor gave one.
        if (phone.value.trim() !== "") {
            lines.push("Phone: " + phone.value.trim());
        }

        const body = lines.join("\r\n");

        // Builds the mailto link. encodeURIComponent makes spaces and symbols safe in a URL.
        const mailto = "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        // Shows the compiled email so the user can check it before sending.
        preview.innerHTML =
            "<h3>Your email is ready</h3>" +
            "<p><strong>To:</strong> " + escapeHtml(recipient) + "<br>" +
            "<strong>Subject:</strong> " + escapeHtml(subject) + "</p>" +
            "<pre>" + escapeHtml(body) + "</pre>" +
            "<a class=\"btn btn-navy\" href=\"#\">Open in my email app and send</a>" +
            "<p class=\"hint\">Nothing is sent from this website. Your email app opens with the message filled in.</p>";

        // Sets the mailto link through the DOM so the & characters in it are never misread as HTML.
        preview.querySelector("a.btn").href = mailto;

        // Makes the preview visible and scrolls it into view.
        preview.classList.add("show");
        preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
}


// ==========================================================
// COVERAGE PAGE SEARCH
// ==========================================================

function setupCoverageSearch(box) {

    // Every institution on the page is an <li> with a data-name attribute.
    const items = document.querySelectorAll(".inst-list li");
    const provinces = document.querySelectorAll(".province");
    const count = document.getElementById("coverage-count");

    // Runs each time the user types in the search box.
    box.addEventListener("input", function () {
        const term = box.value.trim().toLowerCase();
        let shown = 0;

        // Shows an institution only if its name or city contains the search text.
        items.forEach(function (li) {
            const match = li.dataset.name.includes(term);
            li.hidden = !match;
            if (match) { shown++; }
        });

        // Hides a whole province section when none of its institutions match.
        provinces.forEach(function (sec) {
            sec.hidden = term !== "" && sec.querySelectorAll(".inst-list li:not([hidden])").length === 0;
        });

        count.textContent = term === "" ? "" : shown + " institution" + (shown === 1 ? "" : "s") + " found.";
    });
}

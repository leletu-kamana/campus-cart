(function () {
	"use strict";
	var $ = function (s, c) {
		return (c || document).querySelector(s);
	};
	var $$ = function (s, c) {
		return Array.prototype.slice.call((c || document).querySelectorAll(s));
	};

	/* ---------- Theme toggle ---------- */
	var themeToggle = $("#themeToggle");
	function setTheme(dark, persist) {
		if (dark) {
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
		if (themeToggle)
			themeToggle.setAttribute(
				"aria-label",
				dark ? "Switch to light theme" : "Switch to dark theme",
			);
		if (persist) {
			try {
				localStorage.setItem("cc_theme", dark ? "dark" : "light");
			} catch (e) {}
		}
	}
	if (themeToggle)
		themeToggle.addEventListener("click", function () {
			setTheme(
				document.documentElement.getAttribute("data-theme") === "dark"
					? false
					: true,
				true,
			);
		});

	/* ---------- Mini-cart dropdown (read-only summary of cc_order) ---------- */
	var cartOpen = $("#cartOpen"),
		cartPop = $("#cartPop");
	function fmt(n) {
		return (
			"R" +
			Number(n)
				.toFixed(2)
				.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		);
	}
	function renderMiniCart() {
		var order = [];
		try {
			order = JSON.parse(window.sessionStorage.getItem("cc_order")) || [];
		} catch (e) {
			order = [];
		}
		var qty = order.reduce(function (s, i) {
			return s + i.qty;
		}, 0);
		var total = order.reduce(function (s, i) {
			return s + i.price * i.qty;
		}, 0);
		var b = $("#cartCount");
		if (qty > 0) {
			b.hidden = false;
			b.textContent = qty;
		} else {
			b.hidden = true;
		}
		var list = $("#miniCartList");
		if (!order.length) {
			list.innerHTML =
				'<p class="mini-empty">Nothing added yet — browse the Shop to add items.</p>';
		} else {
			list.innerHTML = order
				.map(function (i) {
					return (
						'<div class="mini-item"><strong>' +
						i.name +
						'</strong><span class="m-qty">×' +
						i.qty +
						'</span><span class="m-price">' +
						fmt(i.price * i.qty) +
						"</span></div>"
					);
				})
				.join("");
		}
		$("#miniCartTotal").textContent = fmt(total);
	}
	if (cartOpen && cartPop) {
		cartOpen.addEventListener("click", function (e) {
			e.stopPropagation();
			renderMiniCart();
			cartPop.classList.toggle("open");
			cartOpen.setAttribute(
				"aria-expanded",
				cartPop.classList.contains("open") ? "true" : "false",
			);
		});
		document.addEventListener("click", function (e) {
			if (!e.target.closest(".cart-wrap")) cartPop.classList.remove("open");
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") cartPop.classList.remove("open");
		});
	}

	/* ---------- Wishlist (localStorage) ---------- */
	var WISH = [];
	try {
		WISH = JSON.parse(localStorage.getItem("cc_wishlist")) || [];
	} catch (e) {
		WISH = [];
	}
	function renderWish() {
		var badge = $("#wishCount");
		if (WISH.length) {
			badge.hidden = false;
			badge.textContent = WISH.length;
		} else {
			badge.hidden = true;
		}
		$$("[data-wish]").forEach(function (btn) {
			var on = WISH.indexOf(btn.getAttribute("data-wish")) > -1;
			btn.classList.toggle("active", on);
			btn.setAttribute("aria-pressed", on ? "true" : "false");
			btn.setAttribute(
				"aria-label",
				(on ? "Remove " : "Add ") +
					btn.getAttribute("data-wish") +
					" " +
					(on ? "from" : "to") +
					" wishlist",
			);
		});
	}
	document.addEventListener("click", function (e) {
		var btn = e.target.closest ? e.target.closest("[data-wish]") : null;
		if (!btn) return;
		var name = btn.getAttribute("data-wish");
		var idx = WISH.indexOf(name);
		if (idx > -1) {
			WISH.splice(idx, 1);
		} else {
			WISH.push(name);
		}
		try {
			localStorage.setItem("cc_wishlist", JSON.stringify(WISH));
		} catch (err) {}
		renderWish();
	});
	renderWish();

	/* ---------- Search overlay ---------- */
	var CATALOG = [
		"Basic Starter Bundle",
		"Standard Starter Bundle",
		"Premium Starter Bundle",
		"Duvet & Linen Set (Double)",
		"Electric Kettle 1.7L",
		"Stationery Mega Pack",
		"Load-Shedding Light Kit",
		"Study Desk",
		"Mini Bar Fridge",
		"Accounting Textbook Set",
		'Laptop Bag 15"',
		"Two-Tier Bookshelf",
		"Study Chair",
		"LED Desk Lamp",
		"Scientific Calculator",
		"Study Backpack",
		"Single Duvet and Linen Set",
		"Microwave Oven 20L",
	];
	var overlay = $("#searchOverlay"),
		sInput = $("#searchInput"),
		sResults = $("#searchResults");
	function openSearch() {
		overlay.hidden = false;
		renderSearch();
		setTimeout(function () {
			sInput.focus();
		}, 50);
		document.body.classList.add("lightbox-open");
	}
	function closeSearch() {
		overlay.hidden = true;
		document.body.classList.remove("lightbox-open");
		var b = $("#searchOpen");
		if (b) b.focus();
	}
	function renderSearch() {
		var term = (sInput.value || "").trim().toLowerCase();
		if (!term) {
			sResults.innerHTML =
				'<p class="search-none">Type to search the catalogue.</p>';
			return;
		}
		var hits = CATALOG.filter(function (n) {
			return n.toLowerCase().indexOf(term) > -1;
		}).slice(0, 8);
		if (!hits.length) {
			sResults.innerHTML =
				'<p class="search-none">No matches — try “bundle”, “kettle” or “desk”.</p>';
			return;
		}
		sResults.innerHTML = hits
			.map(function (n) {
				var price = "View in shop";
				if (n.indexOf("Basic") > -1) price = "R1 499";
				else if (n.indexOf("Standard") > -1) price = "R2 799";
				else if (n.indexOf("Premium") > -1) price = "R4 499";
				else if (n.indexOf("Kettle") > -1) price = "R289";
				else if (n.indexOf("Load") > -1) price = "R329";
				else if (n.indexOf("Desk") > -1) price = "R650";
				else if (n.indexOf("Fridge") > -1) price = "R1 150";
				else if (n.indexOf("Textbook") > -1) price = "R420";
				else if (n.indexOf("Laptop") > -1) price = "R180";
				else if (n.indexOf("Study Chair") > -1) price = "R450";
				else if (n.indexOf("Lamp") > -1) price = "R229";
				else if (n.indexOf("Calculator") > -1) price = "R219";
				return (
					'<a class="search-result" href="pages/products.html"><strong>' +
					n +
					"</strong><span>" +
					price +
					"</span></a>"
				);
			})
			.join("");
	}
	if (overlay) {
		$("#searchOpen").addEventListener("click", openSearch);
		$("#searchClose").addEventListener("click", closeSearch);
		overlay.addEventListener("click", function (e) {
			if (e.target === overlay) closeSearch();
		});
		sInput.addEventListener("input", renderSearch);
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape" && !overlay.hidden) closeSearch();
		});
	}

	/* ---------- Hero slider ---------- */
	var slides = $$("[data-slide]"),
		dotsWrap = $("#slideDots"),
		cur = 0,
		timer = null;
	if (slides.length) {
		slides.forEach(function (_, i) {
			var d = document.createElement("button");
			d.type = "button";
			d.setAttribute("aria-label", "Go to slide " + (i + 1));
			if (i === 0) d.setAttribute("aria-current", "true");
			d.addEventListener("click", function () {
				go(i);
				restart();
			});
			dotsWrap.appendChild(d);
		});
		var dots = $$("button", dotsWrap);
		function go(i) {
			cur = (i + slides.length) % slides.length;
			slides.forEach(function (s, idx) {
				s.classList.toggle("is-active", idx === cur);
			});
			dots.forEach(function (d, idx) {
				if (idx === cur) d.setAttribute("aria-current", "true");
				else d.removeAttribute("aria-current");
			});
		}
		function next() {
			go(cur + 1);
		}
		function restart() {
			clearInterval(timer);
			timer = setInterval(next, 6000);
		}
		$("#slidePrev").addEventListener("click", function () {
			go(cur - 1);
			restart();
		});
		$("#slideNext").addEventListener("click", function () {
			next();
			restart();
		});
		var slider = $("#heroSlider");
		slider.addEventListener("mouseenter", function () {
			clearInterval(timer);
		});
		slider.addEventListener("mouseleave", restart);
		var tx0 = null;
		slider.addEventListener(
			"touchstart",
			function (e) {
				tx0 = e.changedTouches[0].clientX;
			},
			{ passive: true },
		);
		slider.addEventListener(
			"touchend",
			function (e) {
				if (tx0 === null) return;
				var dx = e.changedTouches[0].clientX - tx0;
				if (Math.abs(dx) > 45) {
					dx < 0 ? next() : go(cur - 1);
					restart();
				}
				tx0 = null;
			},
			{ passive: true },
		);
		restart();
	}

	/* ---------- Deal countdown (persisted deadline) ---------- */
	var DEAL_KEY = "cc_deal_end";
	function getDeadline() {
		var dl = null;
		try {
			dl = Number(localStorage.getItem(DEAL_KEY));
		} catch (e) {}
		if (!dl || dl < Date.now()) {
			var d = new Date();
			d.setHours(23, 59, 59, 999);
			var add = (7 - d.getDay()) % 7;
			if (add === 0) add = 7;
			d.setDate(d.getDate() + add);
			dl = d.getTime();
			try {
				localStorage.setItem(DEAL_KEY, String(dl));
			} catch (e) {}
		}
		return dl;
	}
	function tickDeal() {
		var diff = getDeadline() - Date.now();
		if (diff < 0) diff = 0;
		var s = Math.floor(diff / 1000);
		$("#td-days").textContent = Math.floor(s / 86400);
		$("#td-hours").textContent = Math.floor((s % 86400) / 3600);
		$("#td-mins").textContent = Math.floor((s % 3600) / 60);
		$("#td-secs").textContent = s % 60;
	}
	if ($("#td-days")) {
		tickDeal();
		setInterval(tickDeal, 1000);
	}

	/* ---------- Testimonials carousel ---------- */
	var tst = $$(".tst-slide"),
		tstDots = $("#tstDots"),
		tCur = 0,
		tTimer = null;
	if (tst.length) {
		tst.forEach(function (_, i) {
			var d = document.createElement("button");
			d.type = "button";
			d.setAttribute("aria-label", "Show review " + (i + 1));
			if (i === 0) d.setAttribute("aria-current", "true");
			d.addEventListener("click", function () {
				tGo(i);
				tRestart();
			});
			tstDots.appendChild(d);
		});
		var tDots = $$("button", tstDots);
		function tGo(i) {
			tCur = (i + tst.length) % tst.length;
			$("#tstTrack").style.transform = "translateX(-" + tCur * 100 + "%)";
			tDots.forEach(function (d, idx) {
				if (idx === tCur) d.setAttribute("aria-current", "true");
				else d.removeAttribute("aria-current");
			});
		}
		function tNext() {
			tGo(tCur + 1);
		}
		function tRestart() {
			clearInterval(tTimer);
			tTimer = setInterval(tNext, 5000);
		}
		var tShell = $(".tst-shell");
		tShell.addEventListener("mouseenter", function () {
			clearInterval(tTimer);
		});
		tShell.addEventListener("mouseleave", tRestart);
		tRestart();
	}

	/* ---------- Quick view modal (Add reuses the site's data-add delegation) ---------- */
	var qv = $("#quickview-backdrop");
	if (qv) {
		var qvImg = $("#qv-img"),
			qvBadge = $("#qv-badge"),
			qvTitle = $("#qv-title"),
			qvPrice = $("#qv-price"),
			qvDesc = $("#qv-desc"),
			qvAdd = $("#qv-add"),
			qvOpener = null;
		function qvClose() {
			qv.hidden = true;
			document.body.classList.remove("lightbox-open");
			if (qvOpener) qvOpener.focus();
		}
		document.addEventListener("click", function (e) {
			var b = e.target.closest ? e.target.closest("[data-quickview]") : null;
			if (!b) return;
			qvOpener = b;
			qvImg.src = b.getAttribute("data-img");
			qvImg.alt = b.getAttribute("data-alt") || b.getAttribute("data-name");
			qvTitle.textContent = b.getAttribute("data-name");
			qvDesc.textContent = b.getAttribute("data-desc");
			qvPrice.textContent = fmt(Number(b.getAttribute("data-price")));
			var isNew = b.getAttribute("data-condition") === "new";
			qvBadge.textContent = isNew ? "Brand new" : "Second-hand (reviewed)";
			qvBadge.className = "badge " + (isNew ? "badge-new" : "badge-used");
			qvAdd.setAttribute("data-add", b.getAttribute("data-name"));
			qvAdd.setAttribute("data-price", b.getAttribute("data-price"));
			qv.hidden = false;
			document.body.classList.add("lightbox-open");
			$("#qv-close").focus();
		});
		qvAdd.addEventListener("click", function () {
			setTimeout(qvClose, 0);
		});
		$$(".chip", qv).forEach(function (chip) {
			chip.addEventListener("click", function () {
				$$(".chip", qv).forEach(function (c) {
					c.classList.remove("active");
					c.style.background = "";
					c.style.color = "";
					c.style.borderColor = "var(--line)";
				});
				chip.classList.add("active");
				chip.style.background = "var(--navy)";
				chip.style.color = "#fff";
				chip.style.borderColor = "var(--navy)";
			});
		});
		$("#qv-close").addEventListener("click", qvClose);
		qv.addEventListener("click", function (e) {
			if (e.target === qv) qvClose();
		});
		qv.addEventListener("keydown", function (e) {
			if (e.key === "Escape") qvClose();
		});
	}

	/* ---------- Newsletter (mailto hand-off) ---------- */
	var nlForm = $("#newsletter-form");
	if (nlForm) {
		nlForm.addEventListener("submit", function (e) {
			e.preventDefault();
			var input = $("#newsletter-email"),
				status = $("#newsletter-status");
			var val = (input.value || "").trim();
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
				status.textContent = "Please enter a valid email address.";
				input.focus();
				return;
			}
			var subject = "Newsletter signup";
			var body =
				"Please add me to the Campus-Cart monthly newsletter.\r\n\r\nEmail: " +
				val;
			window.location.href =
				"mailto:hello@campus-cart.co.za?subject=" +
				encodeURIComponent(subject) +
				"&body=" +
				encodeURIComponent(body);
			status.textContent = "Opening your email app with the sign-up message…";
		});
	}
})();

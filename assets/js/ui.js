// SHARED UI LAYER — Creates the window.CC interface used by the other scripts, including safe browser-storage access, cart and wishlist state, formatting helpers and reusable page controls. It also updates shared navigation elements, notifications and footer details when their matching HTML elements exist.

(function () {
  'use strict';

  /* ----- Helpers ----- */
  // Declares the state value, configuration setting or DOM reference used by this module.
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  // Declares the state value, configuration setting or DOM reference used by this module.
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  // Declares the state value, configuration setting or DOM reference used by this module.
  const formatRand = (n) => 'R' + Number(n).toLocaleString('en-US').replace(/,/g, ' ');

  /* ----- Disable native browser validation on all forms ----- */
  $$('form').forEach((form) => { form.noValidate = true; });

  /* ----- Cart storage (localStorage wrapped so blocked storage never breaks the page) ----- */
  // Declares the state value, configuration setting or DOM reference used by this module.
  const CART_KEY = 'cc_cart_v1';
  // Declares the state value, configuration setting or DOM reference used by this module.
  const WISHLIST_KEY = 'cc_wishlist_v1';
  // Defines a reusable page-interface operation or callback.
  function loadCart() {
    try {
      // Declares the state value, configuration setting or DOM reference used by this module.
      const raw = localStorage.getItem(CART_KEY);
      // Declares the state value, configuration setting or DOM reference used by this module.
      const parsed = raw ? JSON.parse(raw) : [];
      // Checks the condition before executing the following branch.
      if (!Array.isArray(parsed)) return [];
      // Keep only well-formed rows, so edited or corrupted storage can never break or inject into the page.
      return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)) && Number.isInteger(Number(row.qty)) && Number(row.qty) > 0)
        .map((row) => ({ name: row.name, price: Number(row.price), qty: Number(row.qty) }));
    } catch (e) { return []; }
  }
  // Defines a reusable page-interface operation or callback.
  function loadWishlist() {
    try {
      // Declares the state value, configuration setting or DOM reference used by this module.
      const raw = localStorage.getItem(WISHLIST_KEY);
      // Declares the state value, configuration setting or DOM reference used by this module.
      const parsed = raw ? JSON.parse(raw) : [];
      // Checks the condition before executing the following branch.
      if (!Array.isArray(parsed)) return [];
      // Returns the result or exits this function path.
      return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)))
        .map((row) => ({ name: row.name, price: Number(row.price) }));
    } catch (e) { return []; }
  }
  // Declares the state value, configuration setting or DOM reference used by this module.
  const state = { cart: loadCart(), wishlist: loadWishlist() };

  // Defines a reusable page-interface operation or callback.
  function saveCart() {
    // Uses a browser API to access the DOM, storage or timing facility.
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) { /* storage blocked - keep in memory */ }
  }

  // Defines a reusable page-interface operation or callback.
  function saveWishlist() {
    // Uses a browser API to access the DOM, storage or timing facility.
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist)); } catch (e) { /* storage blocked - keep in memory */ }
  }

  // Defines a reusable page-interface operation or callback.
  function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }
  // Defines a reusable page-interface operation or callback.
  function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
  // Defines a reusable page-interface operation or callback.
  function wishlistCount() { return state.wishlist.length; }
  // Defines a reusable page-interface operation or callback.
  function isWishlisted(name) { return state.wishlist.some((item) => item.name === name); }

  // Defines a reusable page-interface operation or callback.
  function updateBadge() {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const badge = $('#cartCount');
    // Checks the condition before executing the following branch.
    if (badge) {
      // Declares the state value, configuration setting or DOM reference used by this module.
      const before = badge.textContent;
      // Updates the selected page element, form value or visual presentation.
      badge.textContent = String(cartCount());
      // Checks the condition before executing the following branch.
      if (before !== badge.textContent && badge.animate) {
        badge.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 300 });
      }
    }
  }

  // Adds an item, saves, refreshes the badge and tells the other files (the cart drawer and the order summary).
  function addToCart(name, price) {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const existing = state.cart.find((item) => item.name === name);
    // Checks the condition before executing the following branch.
    if (existing) { existing.qty += 1; } else { state.cart.push({ name: name, price: Number(price), qty: 1 }); }
    saveCart();
    updateBadge();
    // Uses a browser API to access the DOM, storage or timing facility.
    document.dispatchEvent(new CustomEvent('cc-cart-change'));
  }

  // Defines a reusable page-interface operation or callback.
  function changeCart() {
    saveCart();
    updateBadge();
    // Uses a browser API to access the DOM, storage or timing facility.
    document.dispatchEvent(new CustomEvent('cc-cart-change'));
  }

  // Defines a reusable page-interface operation or callback.
  function updateWishlistBadge() {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const badge = $('#wishlistCount');
    // Checks the condition before executing the following branch.
    if (badge) badge.textContent = String(wishlistCount());
    $$('[data-add-to-wishlist]').forEach((button) => {
      // Declares the state value, configuration setting or DOM reference used by this module.
      const active = isWishlisted(button.dataset.name);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? 'Remove ' + button.dataset.name + ' from wishlist' : 'Add ' + button.dataset.name + ' to wishlist');
      // Declares the state value, configuration setting or DOM reference used by this module.
      const icon = button.querySelector('[data-wishlist-icon]');
      // Checks the condition before executing the following branch.
      if (icon) icon.textContent = active ? '♥' : '♡';
      button.classList.toggle('is-wishlisted', active);
    });
  }

  // Defines a reusable page-interface operation or callback.
  function toggleWishlist(name, price) {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const index = state.wishlist.findIndex((item) => item.name === name);
    // Checks the condition before executing the following branch.
    if (index >= 0) {
      state.wishlist.splice(index, 1);
      showSnack(name + ' removed from your wishlist.');
    } else {
      state.wishlist.push({ name: name, price: Number(price) || 0 });
      showSnack(name + ' added to your wishlist.');
    }
    saveWishlist();
    updateWishlistBadge();
    renderWishlist();
    // Uses a browser API to access the DOM, storage or timing facility.
    document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
    // Returns the result or exits this function path.
    return index < 0;
  }

  // Defines a reusable page-interface operation or callback.
  function removeFromWishlist(name) {
    // Updates the module state used by the surrounding operation.
    state.wishlist = state.wishlist.filter((item) => item.name !== name);
    saveWishlist();
    updateWishlistBadge();
    renderWishlist();
    // Uses a browser API to access the DOM, storage or timing facility.
    document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
  }

  // Defines a reusable page-interface operation or callback.
  function renderWishlist() {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const list = $('#wishlistItems');
    // Declares the state value, configuration setting or DOM reference used by this module.
    const empty = $('#wishlistEmpty');
    // Checks the condition before executing the following branch.
    if (!list || !empty) return;
    list.replaceChildren();
    empty.classList.toggle('hidden', state.wishlist.length > 0);
    state.wishlist.forEach((item) => {
      // Declares the state value, configuration setting or DOM reference used by this module.
      const row = document.createElement('div');
      // Updates the module state used by the surrounding operation.
      row.className = 'flex items-center justify-between gap-3 border-b border-slate-100 py-3';
      // Declares the state value, configuration setting or DOM reference used by this module.
      const details = document.createElement('div');
      // Updates the module state used by the surrounding operation.
      details.className = 'min-w-0';
      // Declares the state value, configuration setting or DOM reference used by this module.
      const name = document.createElement('p');
      // Updates the module state used by the surrounding operation.
      name.className = 'truncate text-sm font-bold text-[#0d1b3e]';
      // Updates the selected page element, form value or visual presentation.
      name.textContent = item.name;
      // Declares the state value, configuration setting or DOM reference used by this module.
      const price = document.createElement('p');
      // Updates the module state used by the surrounding operation.
      price.className = 'text-xs text-slate-500';
      // Updates the selected page element, form value or visual presentation.
      price.textContent = item.price > 0 ? formatRand(item.price) : 'Price to be confirmed';
      details.append(name, price);
      // Declares the state value, configuration setting or DOM reference used by this module.
      const actions = document.createElement('div');
      // Updates the module state used by the surrounding operation.
      actions.className = 'flex shrink-0 items-center gap-2';
      // Declares the state value, configuration setting or DOM reference used by this module.
      const add = document.createElement('button');
      // Updates the module state used by the surrounding operation.
      add.type = 'button';
      // Updates the module state used by the surrounding operation.
      add.className = 'rounded-full bg-[#0d1b3e] px-3 py-2 text-xs font-bold text-white';
      // Updates the selected page element, form value or visual presentation.
      add.textContent = 'Add to cart';
      // Registers a handler for the specified browser or user interaction event.
      add.addEventListener('click', () => {
        // Checks the condition before executing the following branch.
        if (item.price > 0) addToCart(item.name, item.price);
        removeFromWishlist(item.name);
      });
      // Declares the state value, configuration setting or DOM reference used by this module.
      const remove = document.createElement('button');
      // Updates the module state used by the surrounding operation.
      remove.type = 'button';
      // Updates the module state used by the surrounding operation.
      remove.className = 'rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600';
      // Updates the selected page element, form value or visual presentation.
      remove.textContent = 'Remove';
      // Registers a handler for the specified browser or user interaction event.
      remove.addEventListener('click', () => removeFromWishlist(item.name));
      actions.append(add, remove);
      row.append(details, actions);
      list.appendChild(row);
    });
  }

  // Defines a reusable page-interface operation or callback.
  function setupWishlist() {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const cartButton = $('#cartButton');
    // Declares the state value, configuration setting or DOM reference used by this module.
    const menuButton = $('#navToggle');
    // Declares the state value, configuration setting or DOM reference used by this module.
    const wishlistAnchor = cartButton || menuButton;
    // Checks the condition before executing the following branch.
    if (wishlistAnchor && !$('#wishlistButton')) {
      // Declares the state value, configuration setting or DOM reference used by this module.
      const button = document.createElement('button');
      // Updates the module state used by the surrounding operation.
      button.id = 'wishlistButton';
      // Updates the module state used by the surrounding operation.
      button.type = 'button';
      // Updates the module state used by the surrounding operation.
      button.className = 'relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-[#0d1b3e] transition hover:border-[#0d1b3e]';
      button.setAttribute('aria-label', 'Open wishlist');
      button.setAttribute('aria-expanded', 'false');
      // Updates the selected page element, form value or visual presentation.
      button.innerHTML = '<span aria-hidden="true" class="text-xl leading-none">♡</span><span id="wishlistCount" class="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ffd23f] px-1 text-[11px] font-extrabold text-[#0d1b3e]">0</span>';
      wishlistAnchor.parentNode.insertBefore(button, wishlistAnchor);

      // Declares the state value, configuration setting or DOM reference used by this module.
      const panel = document.createElement('section');
      // Updates the module state used by the surrounding operation.
      panel.id = 'wishlistPanel';
      // Updates the module state used by the surrounding operation.
      panel.className = 'fixed right-4 top-20 z-[85] hidden w-[min(92vw,26rem)] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'false');
      panel.setAttribute('aria-labelledby', 'wishlistTitle');
      // Updates the selected page element, form value or visual presentation.
      panel.innerHTML = '<div class="flex items-center justify-between gap-3"><h2 id="wishlistTitle" class="text-lg font-extrabold text-[#0d1b3e]">Your wishlist</h2><button type="button" id="wishlistClose" class="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600" aria-label="Close wishlist">Close</button></div><p class="mt-1 text-xs text-slate-500">Saved on this device and shared across Campus-Cart pages.</p><p id="wishlistEmpty" class="py-8 text-center text-sm text-slate-500">Your wishlist is empty. Save products using the heart buttons.</p><div id="wishlistItems" class="mt-3 max-h-[55vh] overflow-y-auto"></div>';
      // Uses a browser API to access the DOM, storage or timing facility.
      document.body.appendChild(panel);
      // Registers a handler for the specified browser or user interaction event.
      button.addEventListener('click', () => {
        // Declares the state value, configuration setting or DOM reference used by this module.
        const opening = panel.classList.contains('hidden');
        panel.classList.toggle('hidden', !opening);
        button.setAttribute('aria-expanded', String(opening));
        // Checks the condition before executing the following branch.
        if (opening) renderWishlist();
      });
      // Registers a handler for the specified browser or user interaction event.
      $('#wishlistClose').addEventListener('click', () => {
        panel.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
      });
      // Registers a handler for the specified browser or user interaction event.
      document.addEventListener('click', (event) => {
        // Checks the condition before executing the following branch.
        if (!panel.classList.contains('hidden') && !panel.contains(event.target) && !button.contains(event.target)) {
          panel.classList.add('hidden');
          button.setAttribute('aria-expanded', 'false');
        }
      });
    }

    $$('[data-add-to-cart]').forEach((cartBtn) => {
      // Declares the state value, configuration setting or DOM reference used by this module.
      const name = cartBtn.dataset.name;
      // Declares the state value, configuration setting or DOM reference used by this module.
      const price = Number(cartBtn.dataset.price);
      // Checks the condition before executing the following branch.
      if (!name || cartBtn.parentElement.querySelector('[data-add-to-wishlist]')) return;
      // Declares the state value, configuration setting or DOM reference used by this module.
      const button = document.createElement('button');
      // Updates the module state used by the surrounding operation.
      button.type = 'button';
      // Updates the module state used by the surrounding operation.
      button.dataset.addToWishlist = '';
      // Updates the module state used by the surrounding operation.
      button.dataset.name = name;
      // Updates the module state used by the surrounding operation.
      button.dataset.price = String(price || 0);
      // Declares the state value, configuration setting or DOM reference used by this module.
      const productImage = cartBtn.closest('.relative.overflow-hidden');
      // Updates the module state used by the surrounding operation.
      button.className = productImage
        ? 'absolute bottom-3 right-16 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white text-xl text-[#0d1b3e] shadow-lg transition duration-300 hover:scale-110 hover:bg-[#ffd23f] sm:opacity-0 sm:group-hover:opacity-100'
        : 'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0d1b3e]/25 bg-white text-xl text-[#0d1b3e] transition hover:bg-[#0d1b3e]/5';
      // Updates the selected page element, form value or visual presentation.
      button.innerHTML = '<span data-wishlist-icon aria-hidden="true">♡</span>';
      cartBtn.insertAdjacentElement('beforebegin', button);
    });
    // Event delegation also supports wishlist buttons rendered later by the product catalogue.
    if (!document.documentElement.dataset.ccWishlistListener) {
      // Uses a browser API to access the DOM, storage or timing facility.
      document.documentElement.dataset.ccWishlistListener = 'true';
      // Registers a handler for the specified browser or user interaction event.
      document.addEventListener('click', (event) => {
        // Declares the state value, configuration setting or DOM reference used by this module.
        const wishlistButton = event.target.closest('[data-add-to-wishlist]');
        // Checks the condition before executing the following branch.
        if (!wishlistButton) return;
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(wishlistButton.dataset.name, wishlistButton.dataset.price);
      });
    }
    updateWishlistBadge();
    renderWishlist();
  }

  /* ----- Snack bar (uses #snack when the page has it, otherwise a small toast) ----- */
  // Declares the state value, configuration setting or DOM reference used by this module.
  let snackTimer;
  // Defines a reusable page-interface operation or callback.
  function showSnack(message) {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const snack = $('#snack');
    // Checks the condition before executing the following branch.
    if (snack) {
      // Updates the selected page element, form value or visual presentation.
      snack.textContent = message;
      snack.classList.remove('opacity-0', 'pointer-events-none');
      // Uses a browser API to access the DOM, storage or timing facility.
      clearTimeout(snackTimer);
      // Uses a browser API to access the DOM, storage or timing facility.
      snackTimer = setTimeout(() => snack.classList.add('opacity-0', 'pointer-events-none'), 2600);
      // Returns the result or exits this function path.
      return;
    }
    // Declares the state value, configuration setting or DOM reference used by this module.
    let toast = document.getElementById('toast');
    // Checks the condition before executing the following branch.
    if (!toast) {
      // Uses a browser API to access the DOM, storage or timing facility.
      toast = document.createElement('div');
      // Updates the module state used by the surrounding operation.
      toast.id = 'toast';
      // Updates the module state used by the surrounding operation.
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      // Uses a browser API to access the DOM, storage or timing facility.
      document.body.appendChild(toast);
    }
    // Updates the selected page element, form value or visual presentation.
    toast.textContent = message;
    toast.classList.add('show');
    // Uses a browser API to access the DOM, storage or timing facility.
    clearTimeout(toast._t);
    // Uses a browser API to access the DOM, storage or timing facility.
    toast._t = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  /* ----- Shared cart drawer on every page ----- */
  // Defines a reusable page-interface operation or callback.
  function ensureCartDrawer() {
    // Checks the condition before executing the following branch.
    if ($('#cartDrawer') || !$('#cartButton')) return;
    // Declares the state value, configuration setting or DOM reference used by this module.
    const accountPath = window.location.pathname.indexOf('/pages/') > -1 ? 'account.html#order' : 'pages/account.html#order';
    // Declares the state value, configuration setting or DOM reference used by this module.
    const drawer = document.createElement('div');
    // Updates the module state used by the surrounding operation.
    drawer.id = 'cartDrawer';
    // Updates the module state used by the surrounding operation.
    drawer.className = 'fixed inset-0 z-[80] hidden';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-labelledby', 'cartTitle');
    // Updates the selected page element, form value or visual presentation.
    drawer.innerHTML = '<div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" data-cart-close></div>' +
      '<aside class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">' +
      '<div class="flex items-center justify-between border-b border-slate-200 px-6 py-5"><h2 id="cartTitle" class="text-lg font-extrabold text-[#0d1b3e]">Your cart</h2><button type="button" data-cart-close class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#0d1b3e] hover:text-[#0d1b3e]" aria-label="Close cart"><span aria-hidden="true">×</span></button></div>' +
      '<div id="cartItems" class="flex-1 overflow-y-auto px-6 py-4"></div>' +
      '<div class="border-t border-slate-200 px-6 py-5"><div class="flex items-center justify-between"><span class="text-sm font-medium text-slate-500">Total</span><span id="cartTotal" class="text-xl font-extrabold text-[#0d1b3e]">R0</span></div><p class="mt-1 text-xs text-slate-400">No payment is processed on this demo site.</p><a href="' + accountPath + '" class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0d1b3e] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1c3268]">Go to order form <span aria-hidden="true">→</span></a></div></aside>';
    // Uses a browser API to access the DOM, storage or timing facility.
    document.body.appendChild(drawer);
  }
  ensureCartDrawer();

  // Uses a browser API to access the DOM, storage or timing facility.
  window.CC = {
    $: $, $$: $$, formatRand: formatRand, state: state, CART_KEY: CART_KEY, WISHLIST_KEY: WISHLIST_KEY,
    saveCart: saveCart, cartCount: cartCount, cartTotal: cartTotal,
    updateBadge: updateBadge, addToCart: addToCart, changeCart: changeCart,
    saveWishlist: saveWishlist, wishlistCount: wishlistCount, isWishlisted: isWishlisted,
    toggleWishlist: toggleWishlist, removeFromWishlist: removeFromWishlist, updateWishlistBadge: updateWishlistBadge,
    showSnack: showSnack
  };
  setupWishlist();
  updateBadge();
  updateWishlistBadge();

  /* ----- Live clock (header) ----- */
  // Defines a reusable page-interface operation or callback.
  function tickClock() {
    // Declares the state value, configuration setting or DOM reference used by this module.
    const now = new Date();
    // Declares the state value, configuration setting or DOM reference used by this module.
    const t = $('#navTime');
    // Declares the state value, configuration setting or DOM reference used by this module.
    const d = $('#navDate');
    // Checks the condition before executing the following branch.
    if (t) t.textContent = now.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // Checks the condition before executing the following branch.
    if (d) d.textContent = now.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ----- Mobile menu toggle ----- */
  // Declares the state value, configuration setting or DOM reference used by this module.
  const navToggle = $('#navToggle');
  // Declares the state value, configuration setting or DOM reference used by this module.
  const mobileMenu = $('#mobileMenu');
  // Declares the state value, configuration setting or DOM reference used by this module.
  const navIcon = $('#navIcon');
  // Declares the state value, configuration setting or DOM reference used by this module.
  const ICON_MENU = 'https://unpkg.com/lucide-static@1.44.0/icons/menu.svg';
  // Declares the state value, configuration setting or DOM reference used by this module.
  const ICON_CLOSE = 'https://unpkg.com/lucide-static@1.44.0/icons/x.svg';

  // Defines a reusable page-interface operation or callback.
  function setMenu(open) {
    // Checks the condition before executing the following branch.
    if (!navToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('hidden', !open);
    navToggle.setAttribute('aria-expanded', String(open));
    // Checks the condition before executing the following branch.
    if (navIcon) navIcon.src = open ? ICON_CLOSE : ICON_MENU;
  }
  // Checks the condition before executing the following branch.
  if (navToggle && mobileMenu) {
    // Registers a handler for the specified browser or user interaction event.
    navToggle.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
    // Escape closes the menu and returns focus to its button
    document.addEventListener('keydown', (e) => {
      // Checks the condition before executing the following branch.
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) { setMenu(false); navToggle.focus(); }
    });
    // Picking a link, or widening the window to desktop size, also closes it
    $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    // Registers a handler for the specified browser or user interaction event.
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
  }

  /* ----- Header shadow once the page is scrolled ----- */
  // Declares the state value, configuration setting or DOM reference used by this module.
  const siteHeader = $('#siteHeader');
  // Declares the state value, configuration setting or DOM reference used by this module.
  const toTop = $('#toTop');
  // Defines a reusable page-interface operation or callback.
  function onScroll() {
    // Checks the condition before executing the following branch.
    if (siteHeader) siteHeader.classList.toggle('shadow-md', window.scrollY > 8);
    // Checks the condition before executing the following branch.
    if (toTop) toTop.classList.toggle('hidden', window.scrollY <= 400);
  }
  // Registers a handler for the specified browser or user interaction event.
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Back to top ----- */
  // Checks the condition before executing the following branch.
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ----- Cart badge (shared localStorage, also follows other open tabs) ----- */
  updateBadge();
  // Registers a handler for the specified browser or user interaction event.
  window.addEventListener('storage', (e) => {
    // Checks the condition before executing the following branch.
    if (e.key === CART_KEY) { state.cart = loadCart(); updateBadge(); document.dispatchEvent(new CustomEvent('cc-cart-change')); }
    // Checks the condition before executing the following branch.
    if (e.key === WISHLIST_KEY) { state.wishlist = loadWishlist(); updateWishlistBadge(); renderWishlist(); document.dispatchEvent(new CustomEvent('cc-wishlist-change')); }
  });

  /* ----- Newsletter forms (Web3Forms delivery) ----- */
  // Declares the state value, configuration setting or DOM reference used by this module.
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  // Declares the state value, configuration setting or DOM reference used by this module.
  const WEB3FORMS_KEY = 'ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa';

  // Uses a browser API to access the DOM, storage or timing facility.
  document.querySelectorAll('form[id^="newsletter"]').forEach((form) => {
    // Use JavaScript validation instead of the browser's native validation UI.
    form.noValidate = true;
    // Registers a handler for the specified browser or user interaction event.
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Declares the state value, configuration setting or DOM reference used by this module.
      const emailInput = form.querySelector('input[name="email"]');
      // Declares the state value, configuration setting or DOM reference used by this module.
      const btn = form.querySelector('button[type="submit"]');

      // Checks the condition before executing the following branch.
      if (!emailInput || !btn) return;

      // Declares the state value, configuration setting or DOM reference used by this module.
      const email = emailInput.value.trim();
      // Declares the state value, configuration setting or DOM reference used by this module.
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Checks the condition before executing the following branch.
      if (!emailPattern.test(email) || email.length > 254) {
        // Declares the state value, configuration setting or DOM reference used by this module.
        let error = form.querySelector('.newsletter-status');
        // Checks the condition before executing the following branch.
        if (!error) {
          // Uses a browser API to access the DOM, storage or timing facility.
          error = document.createElement('p');
          // Updates the module state used by the surrounding operation.
          error.className = 'newsletter-status';
          error.setAttribute('role', 'alert');
          error.setAttribute('aria-live', 'polite');
          // Updates the selected page element, form value or visual presentation.
          error.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
          form.appendChild(error);
        }
        // Updates the selected page element, form value or visual presentation.
        error.textContent = 'Please enter a valid email address (maximum 254 characters).';
        // Updates the selected page element, form value or visual presentation.
        error.style.color = '#b91c1c';
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        // Returns the result or exits this function path.
        return;
      }
      emailInput.removeAttribute('aria-invalid');

      // Checks the condition before executing the following branch.
      if (btn.disabled) return;

      // Declares the state value, configuration setting or DOM reference used by this module.
      const originalText = btn.textContent.trim();
      // Declares the state value, configuration setting or DOM reference used by this module.
      const formData = new FormData(form);

      formData.set('access_key', WEB3FORMS_KEY);
      formData.set('email', email);
      formData.set('subject', 'New Campus-Cart Newsletter Subscription');
      formData.set('from_name', 'Campus-Cart Newsletter');
      formData.set('message', 'New newsletter subscription: ' + email);

      // Declares the state value, configuration setting or DOM reference used by this module.
      let status = form.querySelector('.newsletter-status');
      // Checks the condition before executing the following branch.
      if (!status) {
        // Uses a browser API to access the DOM, storage or timing facility.
        status = document.createElement('p');
        // Updates the module state used by the surrounding operation.
        status.className = 'newsletter-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        // Updates the selected page element, form value or visual presentation.
        status.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
        form.appendChild(status);
      }

      // Updates the selected page element, form value or visual presentation.
      btn.textContent = 'Subscribing...';
      // Updates the module state used by the surrounding operation.
      btn.disabled = true;
      // Updates the selected page element, form value or visual presentation.
      status.textContent = 'Submitting your subscription...';
      // Updates the selected page element, form value or visual presentation.
      status.style.color = '#64748b';

      try {
        // Declares the state value, configuration setting or DOM reference used by this module.
        const response = await fetch(WEB3FORMS_URL, {
          method: 'POST',
          body: formData
        });
        // Declares the state value, configuration setting or DOM reference used by this module.
        const data = await response.json();

        // Checks the condition before executing the following branch.
        if (response.ok && data.success) {
          // Updates the selected page element, form value or visual presentation.
          status.textContent = 'Successfully subscribed! Thank you for joining us.';
          // Updates the selected page element, form value or visual presentation.
          status.style.color = '#047857';
          form.reset();
        } else {
          // Updates the selected page element, form value or visual presentation.
          status.textContent = 'Subscription failed: ' + (data.message || 'Please try again.');
          // Updates the selected page element, form value or visual presentation.
          status.style.color = '#b91c1c';
        }
      } catch (error) {
        // Updates the selected page element, form value or visual presentation.
        status.textContent = 'Something went wrong. Please check your connection and try again.';
        // Updates the selected page element, form value or visual presentation.
        status.style.color = '#b91c1c';
      } finally {
        // Updates the selected page element, form value or visual presentation.
        btn.textContent = originalText;
        // Updates the module state used by the surrounding operation.
        btn.disabled = false;
      }
    });
  });

  /* ----- FAQ accordions: keep one answer open per FAQ group ----- */
  $$('details').forEach((detail) => {
    // Registers a handler for the specified browser or user interaction event.
    detail.addEventListener('toggle', () => {
      // Checks the condition before executing the following branch.
      if (!detail.open) return;
      // Declares the state value, configuration setting or DOM reference used by this module.
      const parent = detail.parentElement;
      // Checks the condition before executing the following branch.
      if (!parent) return;
      Array.from(parent.children).forEach((sibling) => {
        // Checks the condition before executing the following branch.
        if (sibling !== detail && sibling.tagName === 'DETAILS' && sibling.open) sibling.open = false;
      });
    });
  });

  /* ----- Footer © year ----- */
  // Declares the state value, configuration setting or DOM reference used by this module.
  const currentYear = new Date().getFullYear();
  // Declares the state value, configuration setting or DOM reference used by this module.
  const yearEl = $('#copyright-year');
  // Declares the state value, configuration setting or DOM reference used by this module.
  const checklistYear = $('#checklist-copyright-year');
  // Checks the condition before executing the following branch.
  if (yearEl) yearEl.textContent = currentYear;
  // Checks the condition before executing the following branch.
  if (checklistYear) checklistYear.textContent = currentYear;
})();

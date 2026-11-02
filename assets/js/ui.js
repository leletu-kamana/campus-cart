// ==========================================================
// CAMPUS-CART
// ui.js - shared interface code used on every page
//   - shared helpers and the cart storage (window.CC)
//   - live SAST clock, mobile menu, header shadow, Escape closes the menu
//   - cart count badge, snack bar / toast messages
//   - back to top button, newsletter forms, footer year
// Loaded first, because the other files read window.CC.
// ==========================================================
// INLINE COMMENTING GUIDE: Explanatory comments identify the purpose of the main logic blocks, state changes, DOM operations and event handling.

// JavaScript statement/expression: (function () {
(function () {
  // JavaScript statement/expression: 'use strict';
  'use strict';

  /* ----- Helpers ----- */
  // JavaScript statement/expression: const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  // JavaScript statement/expression: const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  // JavaScript statement/expression: const formatRand = (n) => 'R' + Number(n).toLocaleString('en-US').replace(/,/g, ' ');
  const formatRand = (n) => 'R' + Number(n).toLocaleString('en-US').replace(/,/g, ' ');

  /* ----- Disable native browser validation on all forms ----- */
  // JavaScript statement/expression: $$('form').forEach((form) => { form.noValidate = true; });
  $$('form').forEach((form) => { form.noValidate = true; });

  /* ----- Cart storage (localStorage wrapped so blocked storage never breaks the page) ----- */
  // JavaScript statement/expression: const CART_KEY = 'cc_cart_v1';
  const CART_KEY = 'cc_cart_v1';
  // JavaScript statement/expression: const WISHLIST_KEY = 'cc_wishlist_v1';
  const WISHLIST_KEY = 'cc_wishlist_v1';
  // loadCart: handles the load cart operation used by this feature.
  // JavaScript statement/expression: function loadCart() {
  function loadCart() {
    // JavaScript statement/expression: try {
    try {
      // JavaScript statement/expression: const raw = localStorage.getItem(CART_KEY);
      const raw = localStorage.getItem(CART_KEY);
      // JavaScript statement/expression: const parsed = raw ? JSON.parse(raw) : [];
      const parsed = raw ? JSON.parse(raw) : [];
      // JavaScript statement/expression: if (!Array.isArray(parsed)) return [];
      if (!Array.isArray(parsed)) return [];
      // Keep only well-formed rows, so edited or corrupted storage can never break or inject into the page.
      // JavaScript statement/expression: return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)) && Num
      return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)) && Number.isInteger(Number(row.qty)) && Number(row.qty) > 0)
        // JavaScript statement/expression: .map((row) => ({ name: row.name, price: Number(row.price), qty: Number(row.qty) }));
        .map((row) => ({ name: row.name, price: Number(row.price), qty: Number(row.qty) }));
    // JavaScript statement/expression: } catch (e) { return []; }
    } catch (e) { return []; }
  // JavaScript statement/expression: }
  }
  // loadWishlist: handles the load wishlist operation used by this feature.
  // JavaScript statement/expression: function loadWishlist() {
  function loadWishlist() {
    // JavaScript statement/expression: try {
    try {
      // JavaScript statement/expression: const raw = localStorage.getItem(WISHLIST_KEY);
      const raw = localStorage.getItem(WISHLIST_KEY);
      // JavaScript statement/expression: const parsed = raw ? JSON.parse(raw) : [];
      const parsed = raw ? JSON.parse(raw) : [];
      // JavaScript statement/expression: if (!Array.isArray(parsed)) return [];
      if (!Array.isArray(parsed)) return [];
      // JavaScript statement/expression: return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)))
      return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)))
        // JavaScript statement/expression: .map((row) => ({ name: row.name, price: Number(row.price) }));
        .map((row) => ({ name: row.name, price: Number(row.price) }));
    // JavaScript statement/expression: } catch (e) { return []; }
    } catch (e) { return []; }
  // JavaScript statement/expression: }
  }
  // JavaScript statement/expression: const state = { cart: loadCart(), wishlist: loadWishlist() };
  const state = { cart: loadCart(), wishlist: loadWishlist() };

  // saveCart: handles the save cart operation used by this feature.

  // JavaScript statement/expression: function saveCart() {
  function saveCart() {
    // JavaScript statement/expression: try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) { /* storage blocked - keep in m
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) { /* storage blocked - keep in memory */ }
  // JavaScript statement/expression: }
  }

  // saveWishlist: handles the save wishlist operation used by this feature.

  // JavaScript statement/expression: function saveWishlist() {
  function saveWishlist() {
    // JavaScript statement/expression: try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist)); } catch (e) { /* storage blocked - k
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist)); } catch (e) { /* storage blocked - keep in memory */ }
  // JavaScript statement/expression: }
  }

  // cartCount: handles the cart count operation used by this feature.

  // JavaScript statement/expression: function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }
  function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }
  // cartTotal: handles the cart total operation used by this feature.
  // JavaScript statement/expression: function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
  function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
  // wishlistCount: handles the wishlist count operation used by this feature.
  // JavaScript statement/expression: function wishlistCount() { return state.wishlist.length; }
  function wishlistCount() { return state.wishlist.length; }
  // isWishlisted: handles the is wishlisted operation used by this feature.
  // JavaScript statement/expression: function isWishlisted(name) { return state.wishlist.some((item) => item.name === name); }
  function isWishlisted(name) { return state.wishlist.some((item) => item.name === name); }

  // updateBadge: handles the update badge operation used by this feature.

  // JavaScript statement/expression: function updateBadge() {
  function updateBadge() {
    // JavaScript statement/expression: const badge = $('#cartCount');
    const badge = $('#cartCount');
    // JavaScript statement/expression: if (badge) {
    if (badge) {
      // JavaScript statement/expression: const before = badge.textContent;
      const before = badge.textContent;
      // JavaScript statement/expression: badge.textContent = String(cartCount());
      badge.textContent = String(cartCount());
      // JavaScript statement/expression: if (before !== badge.textContent && badge.animate) {
      if (before !== badge.textContent && badge.animate) {
        // JavaScript statement/expression: badge.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration
        badge.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 300 });
      // JavaScript statement/expression: }
      }
    // JavaScript statement/expression: }
    }
  // JavaScript statement/expression: }
  }

  // Adds an item, saves, refreshes the badge and tells the other files (the cart drawer and the order summary).
  // JavaScript statement/expression: function addToCart(name, price) {
  function addToCart(name, price) {
    // JavaScript statement/expression: const existing = state.cart.find((item) => item.name === name);
    const existing = state.cart.find((item) => item.name === name);
    // JavaScript statement/expression: if (existing) { existing.qty += 1; } else { state.cart.push({ name: name, price: Number(price), qty: 1 }); }
    if (existing) { existing.qty += 1; } else { state.cart.push({ name: name, price: Number(price), qty: 1 }); }
    // JavaScript statement/expression: saveCart();
    saveCart();
    // JavaScript statement/expression: updateBadge();
    updateBadge();
    // JavaScript statement/expression: document.dispatchEvent(new CustomEvent('cc-cart-change'));
    document.dispatchEvent(new CustomEvent('cc-cart-change'));
  // JavaScript statement/expression: }
  }

  // changeCart: handles the change cart operation used by this feature.

  // JavaScript statement/expression: function changeCart() {
  function changeCart() {
    // JavaScript statement/expression: saveCart();
    saveCart();
    // JavaScript statement/expression: updateBadge();
    updateBadge();
    // JavaScript statement/expression: document.dispatchEvent(new CustomEvent('cc-cart-change'));
    document.dispatchEvent(new CustomEvent('cc-cart-change'));
  // JavaScript statement/expression: }
  }

  // updateWishlistBadge: handles the update wishlist badge operation used by this feature.

  // JavaScript statement/expression: function updateWishlistBadge() {
  function updateWishlistBadge() {
    // JavaScript statement/expression: const badge = $('#wishlistCount');
    const badge = $('#wishlistCount');
    // JavaScript statement/expression: if (badge) badge.textContent = String(wishlistCount());
    if (badge) badge.textContent = String(wishlistCount());
    // JavaScript statement/expression: $$('[data-add-to-wishlist]').forEach((button) => {
    $$('[data-add-to-wishlist]').forEach((button) => {
      // JavaScript statement/expression: const active = isWishlisted(button.dataset.name);
      const active = isWishlisted(button.dataset.name);
      // JavaScript statement/expression: button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-pressed', String(active));
      // JavaScript statement/expression: button.setAttribute('aria-label', active ? 'Remove ' + button.dataset.name + ' from wishlist' : 'Add ' + butto
      button.setAttribute('aria-label', active ? 'Remove ' + button.dataset.name + ' from wishlist' : 'Add ' + button.dataset.name + ' to wishlist');
      // JavaScript statement/expression: const icon = button.querySelector('[data-wishlist-icon]');
      const icon = button.querySelector('[data-wishlist-icon]');
      // JavaScript statement/expression: if (icon) icon.textContent = active ? '♥' : '♡';
      if (icon) icon.textContent = active ? '♥' : '♡';
      // JavaScript statement/expression: button.classList.toggle('is-wishlisted', active);
      button.classList.toggle('is-wishlisted', active);
    // JavaScript statement/expression: });
    });
  // JavaScript statement/expression: }
  }

  // toggleWishlist: handles the toggle wishlist operation used by this feature.

  // JavaScript statement/expression: function toggleWishlist(name, price) {
  function toggleWishlist(name, price) {
    // JavaScript statement/expression: const index = state.wishlist.findIndex((item) => item.name === name);
    const index = state.wishlist.findIndex((item) => item.name === name);
    // JavaScript statement/expression: if (index >= 0) {
    if (index >= 0) {
      // JavaScript statement/expression: state.wishlist.splice(index, 1);
      state.wishlist.splice(index, 1);
      // JavaScript statement/expression: showSnack(name + ' removed from your wishlist.');
      showSnack(name + ' removed from your wishlist.');
    // JavaScript statement/expression: } else {
    } else {
      // JavaScript statement/expression: state.wishlist.push({ name: name, price: Number(price) || 0 });
      state.wishlist.push({ name: name, price: Number(price) || 0 });
      // JavaScript statement/expression: showSnack(name + ' added to your wishlist.');
      showSnack(name + ' added to your wishlist.');
    // JavaScript statement/expression: }
    }
    // JavaScript statement/expression: saveWishlist();
    saveWishlist();
    // JavaScript statement/expression: updateWishlistBadge();
    updateWishlistBadge();
    // JavaScript statement/expression: renderWishlist();
    renderWishlist();
    // JavaScript statement/expression: document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
    document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
    // JavaScript statement/expression: return index < 0;
    return index < 0;
  // JavaScript statement/expression: }
  }

  // removeFromWishlist: handles the remove from wishlist operation used by this feature.

  // JavaScript statement/expression: function removeFromWishlist(name) {
  function removeFromWishlist(name) {
    // JavaScript statement/expression: state.wishlist = state.wishlist.filter((item) => item.name !== name);
    state.wishlist = state.wishlist.filter((item) => item.name !== name);
    // JavaScript statement/expression: saveWishlist();
    saveWishlist();
    // JavaScript statement/expression: updateWishlistBadge();
    updateWishlistBadge();
    // JavaScript statement/expression: renderWishlist();
    renderWishlist();
    // JavaScript statement/expression: document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
    document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
  // JavaScript statement/expression: }
  }

  // renderWishlist: handles the render wishlist operation used by this feature.

  // JavaScript statement/expression: function renderWishlist() {
  function renderWishlist() {
    // JavaScript statement/expression: const list = $('#wishlistItems');
    const list = $('#wishlistItems');
    // JavaScript statement/expression: const empty = $('#wishlistEmpty');
    const empty = $('#wishlistEmpty');
    // JavaScript statement/expression: if (!list || !empty) return;
    if (!list || !empty) return;
    // JavaScript statement/expression: list.replaceChildren();
    list.replaceChildren();
    // JavaScript statement/expression: empty.classList.toggle('hidden', state.wishlist.length > 0);
    empty.classList.toggle('hidden', state.wishlist.length > 0);
    // JavaScript statement/expression: state.wishlist.forEach((item) => {
    state.wishlist.forEach((item) => {
      // JavaScript statement/expression: const row = document.createElement('div');
      const row = document.createElement('div');
      // JavaScript statement/expression: row.className = 'flex items-center justify-between gap-3 border-b border-slate-100 py-3';
      row.className = 'flex items-center justify-between gap-3 border-b border-slate-100 py-3';
      // JavaScript statement/expression: const details = document.createElement('div');
      const details = document.createElement('div');
      // JavaScript statement/expression: details.className = 'min-w-0';
      details.className = 'min-w-0';
      // JavaScript statement/expression: const name = document.createElement('p');
      const name = document.createElement('p');
      // JavaScript statement/expression: name.className = 'truncate text-sm font-bold text-[#0d1b3e]';
      name.className = 'truncate text-sm font-bold text-[#0d1b3e]';
      // JavaScript statement/expression: name.textContent = item.name;
      name.textContent = item.name;
      // JavaScript statement/expression: const price = document.createElement('p');
      const price = document.createElement('p');
      // JavaScript statement/expression: price.className = 'text-xs text-slate-500';
      price.className = 'text-xs text-slate-500';
      // JavaScript statement/expression: price.textContent = item.price > 0 ? formatRand(item.price) : 'Price to be confirmed';
      price.textContent = item.price > 0 ? formatRand(item.price) : 'Price to be confirmed';
      // JavaScript statement/expression: details.append(name, price);
      details.append(name, price);
      // JavaScript statement/expression: const actions = document.createElement('div');
      const actions = document.createElement('div');
      // JavaScript statement/expression: actions.className = 'flex shrink-0 items-center gap-2';
      actions.className = 'flex shrink-0 items-center gap-2';
      // JavaScript statement/expression: const add = document.createElement('button');
      const add = document.createElement('button');
      // JavaScript statement/expression: add.type = 'button';
      add.type = 'button';
      // JavaScript statement/expression: add.className = 'rounded-full bg-[#0d1b3e] px-3 py-2 text-xs font-bold text-white';
      add.className = 'rounded-full bg-[#0d1b3e] px-3 py-2 text-xs font-bold text-white';
      // JavaScript statement/expression: add.textContent = 'Add to cart';
      add.textContent = 'Add to cart';
      // JavaScript statement/expression: add.addEventListener('click', () => {
      add.addEventListener('click', () => {
        // JavaScript statement/expression: if (item.price > 0) addToCart(item.name, item.price);
        if (item.price > 0) addToCart(item.name, item.price);
        // JavaScript statement/expression: removeFromWishlist(item.name);
        removeFromWishlist(item.name);
      // JavaScript statement/expression: });
      });
      // JavaScript statement/expression: const remove = document.createElement('button');
      const remove = document.createElement('button');
      // JavaScript statement/expression: remove.type = 'button';
      remove.type = 'button';
      // JavaScript statement/expression: remove.className = 'rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600';
      remove.className = 'rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600';
      // JavaScript statement/expression: remove.textContent = 'Remove';
      remove.textContent = 'Remove';
      // JavaScript statement/expression: remove.addEventListener('click', () => removeFromWishlist(item.name));
      remove.addEventListener('click', () => removeFromWishlist(item.name));
      // JavaScript statement/expression: actions.append(add, remove);
      actions.append(add, remove);
      // JavaScript statement/expression: row.append(details, actions);
      row.append(details, actions);
      // JavaScript statement/expression: list.appendChild(row);
      list.appendChild(row);
    // JavaScript statement/expression: });
    });
  // JavaScript statement/expression: }
  }

  // setupWishlist: handles the setup wishlist operation used by this feature.

  // JavaScript statement/expression: function setupWishlist() {
  function setupWishlist() {
    // JavaScript statement/expression: const cartButton = $('#cartButton');
    const cartButton = $('#cartButton');
    // JavaScript statement/expression: const menuButton = $('#navToggle');
    const menuButton = $('#navToggle');
    // JavaScript statement/expression: const wishlistAnchor = cartButton || menuButton;
    const wishlistAnchor = cartButton || menuButton;
    // JavaScript statement/expression: if (wishlistAnchor && !$('#wishlistButton')) {
    if (wishlistAnchor && !$('#wishlistButton')) {
      // JavaScript statement/expression: const button = document.createElement('button');
      const button = document.createElement('button');
      // JavaScript statement/expression: button.id = 'wishlistButton';
      button.id = 'wishlistButton';
      // JavaScript statement/expression: button.type = 'button';
      button.type = 'button';
      // JavaScript statement/expression: button.className = 'relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 b
      button.className = 'relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-[#0d1b3e] transition hover:border-[#0d1b3e]';
      // JavaScript statement/expression: button.setAttribute('aria-label', 'Open wishlist');
      button.setAttribute('aria-label', 'Open wishlist');
      // JavaScript statement/expression: button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-expanded', 'false');
      // JavaScript statement/expression: button.innerHTML = '<span aria-hidden="true" class="text-xl leading-none">♡</span><span id="wishlistCount" cla
      button.innerHTML = '<span aria-hidden="true" class="text-xl leading-none">♡</span><span id="wishlistCount" class="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ffd23f] px-1 text-[11px] font-extrabold text-[#0d1b3e]">0</span>';
      // JavaScript statement/expression: wishlistAnchor.parentNode.insertBefore(button, wishlistAnchor);
      wishlistAnchor.parentNode.insertBefore(button, wishlistAnchor);

      // JavaScript statement/expression: const panel = document.createElement('section');
      const panel = document.createElement('section');
      // JavaScript statement/expression: panel.id = 'wishlistPanel';
      panel.id = 'wishlistPanel';
      // JavaScript statement/expression: panel.className = 'fixed right-4 top-20 z-[85] hidden w-[min(92vw,26rem)] rounded-3xl border border-slate-200 
      panel.className = 'fixed right-4 top-20 z-[85] hidden w-[min(92vw,26rem)] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl';
      // JavaScript statement/expression: panel.setAttribute('role', 'dialog');
      panel.setAttribute('role', 'dialog');
      // JavaScript statement/expression: panel.setAttribute('aria-modal', 'false');
      panel.setAttribute('aria-modal', 'false');
      // JavaScript statement/expression: panel.setAttribute('aria-labelledby', 'wishlistTitle');
      panel.setAttribute('aria-labelledby', 'wishlistTitle');
      // JavaScript statement/expression: panel.innerHTML = '<div class="flex items-center justify-between gap-3"><h2 id="wishlistTitle" class="text-lg 
      panel.innerHTML = '<div class="flex items-center justify-between gap-3"><h2 id="wishlistTitle" class="text-lg font-extrabold text-[#0d1b3e]">Your wishlist</h2><button type="button" id="wishlistClose" class="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600" aria-label="Close wishlist">Close</button></div><p class="mt-1 text-xs text-slate-500">Saved on this device and shared across Campus-Cart pages.</p><p id="wishlistEmpty" class="py-8 text-center text-sm text-slate-500">Your wishlist is empty. Save products using the heart buttons.</p><div id="wishlistItems" class="mt-3 max-h-[55vh] overflow-y-auto"></div>';
      // JavaScript statement/expression: document.body.appendChild(panel);
      document.body.appendChild(panel);
      // JavaScript statement/expression: button.addEventListener('click', () => {
      button.addEventListener('click', () => {
        // JavaScript statement/expression: const opening = panel.classList.contains('hidden');
        const opening = panel.classList.contains('hidden');
        // JavaScript statement/expression: panel.classList.toggle('hidden', !opening);
        panel.classList.toggle('hidden', !opening);
        // JavaScript statement/expression: button.setAttribute('aria-expanded', String(opening));
        button.setAttribute('aria-expanded', String(opening));
        // JavaScript statement/expression: if (opening) renderWishlist();
        if (opening) renderWishlist();
      // JavaScript statement/expression: });
      });
      // JavaScript statement/expression: $('#wishlistClose').addEventListener('click', () => {
      $('#wishlistClose').addEventListener('click', () => {
        // JavaScript statement/expression: panel.classList.add('hidden');
        panel.classList.add('hidden');
        // JavaScript statement/expression: button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-expanded', 'false');
      // JavaScript statement/expression: });
      });
      // JavaScript statement/expression: document.addEventListener('click', (event) => {
      document.addEventListener('click', (event) => {
        // JavaScript statement/expression: if (!panel.classList.contains('hidden') && !panel.contains(event.target) && !button.contains(event.target)) {
        if (!panel.classList.contains('hidden') && !panel.contains(event.target) && !button.contains(event.target)) {
          // JavaScript statement/expression: panel.classList.add('hidden');
          panel.classList.add('hidden');
          // JavaScript statement/expression: button.setAttribute('aria-expanded', 'false');
          button.setAttribute('aria-expanded', 'false');
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: }
    }

    // JavaScript statement/expression: $$('[data-add-to-cart]').forEach((cartBtn) => {
    $$('[data-add-to-cart]').forEach((cartBtn) => {
      // JavaScript statement/expression: const name = cartBtn.dataset.name;
      const name = cartBtn.dataset.name;
      // JavaScript statement/expression: const price = Number(cartBtn.dataset.price);
      const price = Number(cartBtn.dataset.price);
      // JavaScript statement/expression: if (!name || cartBtn.parentElement.querySelector('[data-add-to-wishlist]')) return;
      if (!name || cartBtn.parentElement.querySelector('[data-add-to-wishlist]')) return;
      // JavaScript statement/expression: const button = document.createElement('button');
      const button = document.createElement('button');
      // JavaScript statement/expression: button.type = 'button';
      button.type = 'button';
      // JavaScript statement/expression: button.dataset.addToWishlist = '';
      button.dataset.addToWishlist = '';
      // JavaScript statement/expression: button.dataset.name = name;
      button.dataset.name = name;
      // JavaScript statement/expression: button.dataset.price = String(price || 0);
      button.dataset.price = String(price || 0);
      // JavaScript statement/expression: const productImage = cartBtn.closest('.relative.overflow-hidden');
      const productImage = cartBtn.closest('.relative.overflow-hidden');
      // JavaScript statement/expression: button.className = productImage
      button.className = productImage
        // JavaScript statement/expression: ? 'absolute bottom-3 right-16 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-wh
        ? 'absolute bottom-3 right-16 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white text-xl text-[#0d1b3e] shadow-lg transition duration-300 hover:scale-110 hover:bg-[#ffd23f] sm:opacity-0 sm:group-hover:opacity-100'
        // JavaScript statement/expression: : 'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0d1b3e]/25 bg-white text-xl text-[#
        : 'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0d1b3e]/25 bg-white text-xl text-[#0d1b3e] transition hover:bg-[#0d1b3e]/5';
      // JavaScript statement/expression: button.innerHTML = '<span data-wishlist-icon aria-hidden="true">♡</span>';
      button.innerHTML = '<span data-wishlist-icon aria-hidden="true">♡</span>';
      // JavaScript statement/expression: cartBtn.insertAdjacentElement('beforebegin', button);
      cartBtn.insertAdjacentElement('beforebegin', button);
    // JavaScript statement/expression: });
    });
    // Event delegation also supports wishlist buttons rendered later by the product catalogue.
    // JavaScript statement/expression: if (!document.documentElement.dataset.ccWishlistListener) {
    if (!document.documentElement.dataset.ccWishlistListener) {
      // JavaScript statement/expression: document.documentElement.dataset.ccWishlistListener = 'true';
      document.documentElement.dataset.ccWishlistListener = 'true';
      // JavaScript statement/expression: document.addEventListener('click', (event) => {
      document.addEventListener('click', (event) => {
        // JavaScript statement/expression: const wishlistButton = event.target.closest('[data-add-to-wishlist]');
        const wishlistButton = event.target.closest('[data-add-to-wishlist]');
        // JavaScript statement/expression: if (!wishlistButton) return;
        if (!wishlistButton) return;
        // JavaScript statement/expression: event.preventDefault();
        event.preventDefault();
        // JavaScript statement/expression: event.stopPropagation();
        event.stopPropagation();
        // JavaScript statement/expression: toggleWishlist(wishlistButton.dataset.name, wishlistButton.dataset.price);
        toggleWishlist(wishlistButton.dataset.name, wishlistButton.dataset.price);
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: }
    }
    // JavaScript statement/expression: updateWishlistBadge();
    updateWishlistBadge();
    // JavaScript statement/expression: renderWishlist();
    renderWishlist();
  // JavaScript statement/expression: }
  }

  /* ----- Snack bar (uses #snack when the page has it, otherwise a small toast) ----- */
  // JavaScript statement/expression: let snackTimer;
  let snackTimer;
  // showSnack: handles the show snack operation used by this feature.
  // JavaScript statement/expression: function showSnack(message) {
  function showSnack(message) {
    // JavaScript statement/expression: const snack = $('#snack');
    const snack = $('#snack');
    // JavaScript statement/expression: if (snack) {
    if (snack) {
      // JavaScript statement/expression: snack.textContent = message;
      snack.textContent = message;
      // JavaScript statement/expression: snack.classList.remove('opacity-0', 'pointer-events-none');
      snack.classList.remove('opacity-0', 'pointer-events-none');
      // JavaScript statement/expression: clearTimeout(snackTimer);
      clearTimeout(snackTimer);
      // JavaScript statement/expression: snackTimer = setTimeout(() => snack.classList.add('opacity-0', 'pointer-events-none'), 2600);
      snackTimer = setTimeout(() => snack.classList.add('opacity-0', 'pointer-events-none'), 2600);
      // JavaScript statement/expression: return;
      return;
    // JavaScript statement/expression: }
    }
    // JavaScript statement/expression: let toast = document.getElementById('toast');
    let toast = document.getElementById('toast');
    // JavaScript statement/expression: if (!toast) {
    if (!toast) {
      // JavaScript statement/expression: toast = document.createElement('div');
      toast = document.createElement('div');
      // JavaScript statement/expression: toast.id = 'toast';
      toast.id = 'toast';
      // JavaScript statement/expression: toast.className = 'toast';
      toast.className = 'toast';
      // JavaScript statement/expression: toast.setAttribute('role', 'status');
      toast.setAttribute('role', 'status');
      // JavaScript statement/expression: document.body.appendChild(toast);
      document.body.appendChild(toast);
    // JavaScript statement/expression: }
    }
    // JavaScript statement/expression: toast.textContent = message;
    toast.textContent = message;
    // JavaScript statement/expression: toast.classList.add('show');
    toast.classList.add('show');
    // JavaScript statement/expression: clearTimeout(toast._t);
    clearTimeout(toast._t);
    // JavaScript statement/expression: toast._t = setTimeout(() => toast.classList.remove('show'), 2400);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2400);
  // JavaScript statement/expression: }
  }

  /* ----- Shared cart drawer on every page ----- */
  // JavaScript statement/expression: function ensureCartDrawer() {
  function ensureCartDrawer() {
    // JavaScript statement/expression: if ($('#cartDrawer') || !$('#cartButton')) return;
    if ($('#cartDrawer') || !$('#cartButton')) return;
    // JavaScript statement/expression: const accountPath = window.location.pathname.indexOf('/pages/') > -1 ? 'account.html#order' : 'pages/account.h
    const accountPath = window.location.pathname.indexOf('/pages/') > -1 ? 'account.html#order' : 'pages/account.html#order';
    // JavaScript statement/expression: const drawer = document.createElement('div');
    const drawer = document.createElement('div');
    // JavaScript statement/expression: drawer.id = 'cartDrawer';
    drawer.id = 'cartDrawer';
    // JavaScript statement/expression: drawer.className = 'fixed inset-0 z-[80] hidden';
    drawer.className = 'fixed inset-0 z-[80] hidden';
    // JavaScript statement/expression: drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('role', 'dialog');
    // JavaScript statement/expression: drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-modal', 'true');
    // JavaScript statement/expression: drawer.setAttribute('aria-labelledby', 'cartTitle');
    drawer.setAttribute('aria-labelledby', 'cartTitle');
    // JavaScript statement/expression: drawer.innerHTML = '<div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" data-cart-close></div>' +
    drawer.innerHTML = '<div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" data-cart-close></div>' +
      // JavaScript statement/expression: '<aside class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">' +
      '<aside class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">' +
      // JavaScript statement/expression: '<div class="flex items-center justify-between border-b border-slate-200 px-6 py-5"><h2 id="cartTitle" class="
      '<div class="flex items-center justify-between border-b border-slate-200 px-6 py-5"><h2 id="cartTitle" class="text-lg font-extrabold text-[#0d1b3e]">Your cart</h2><button type="button" data-cart-close class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#0d1b3e] hover:text-[#0d1b3e]" aria-label="Close cart"><span aria-hidden="true">×</span></button></div>' +
      // JavaScript statement/expression: '<div id="cartItems" class="flex-1 overflow-y-auto px-6 py-4"></div>' +
      '<div id="cartItems" class="flex-1 overflow-y-auto px-6 py-4"></div>' +
      // JavaScript statement/expression: '<div class="border-t border-slate-200 px-6 py-5"><div class="flex items-center justify-between"><span class="
      '<div class="border-t border-slate-200 px-6 py-5"><div class="flex items-center justify-between"><span class="text-sm font-medium text-slate-500">Total</span><span id="cartTotal" class="text-xl font-extrabold text-[#0d1b3e]">R0</span></div><p class="mt-1 text-xs text-slate-400">No payment is processed on this demo site.</p><a href="' + accountPath + '" class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0d1b3e] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1c3268]">Go to order form <span aria-hidden="true">→</span></a></div></aside>';
    // JavaScript statement/expression: document.body.appendChild(drawer);
    document.body.appendChild(drawer);
  // JavaScript statement/expression: }
  }
  // JavaScript statement/expression: ensureCartDrawer();
  ensureCartDrawer();

  // JavaScript statement/expression: window.CC = {
  window.CC = {
    // JavaScript statement/expression: $: $, $$: $$, formatRand: formatRand, state: state, CART_KEY: CART_KEY, WISHLIST_KEY: WISHLIST_KEY,
    $: $, $$: $$, formatRand: formatRand, state: state, CART_KEY: CART_KEY, WISHLIST_KEY: WISHLIST_KEY,
    // JavaScript statement/expression: saveCart: saveCart, cartCount: cartCount, cartTotal: cartTotal,
    saveCart: saveCart, cartCount: cartCount, cartTotal: cartTotal,
    // JavaScript statement/expression: updateBadge: updateBadge, addToCart: addToCart, changeCart: changeCart,
    updateBadge: updateBadge, addToCart: addToCart, changeCart: changeCart,
    // JavaScript statement/expression: saveWishlist: saveWishlist, wishlistCount: wishlistCount, isWishlisted: isWishlisted,
    saveWishlist: saveWishlist, wishlistCount: wishlistCount, isWishlisted: isWishlisted,
    // JavaScript statement/expression: toggleWishlist: toggleWishlist, removeFromWishlist: removeFromWishlist, updateWishlistBadge: updateWishlistBad
    toggleWishlist: toggleWishlist, removeFromWishlist: removeFromWishlist, updateWishlistBadge: updateWishlistBadge,
    // JavaScript statement/expression: showSnack: showSnack
    showSnack: showSnack
  // JavaScript statement/expression: };
  };
  // JavaScript statement/expression: setupWishlist();
  setupWishlist();
  // JavaScript statement/expression: updateBadge();
  updateBadge();
  // JavaScript statement/expression: updateWishlistBadge();
  updateWishlistBadge();

  /* ----- Live clock (header) ----- */
  // JavaScript statement/expression: function tickClock() {
  function tickClock() {
    // JavaScript statement/expression: const now = new Date();
    const now = new Date();
    // JavaScript statement/expression: const t = $('#navTime');
    const t = $('#navTime');
    // JavaScript statement/expression: const d = $('#navDate');
    const d = $('#navDate');
    // JavaScript statement/expression: if (t) t.textContent = now.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit'
    if (t) t.textContent = now.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // JavaScript statement/expression: if (d) d.textContent = now.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', yea
    if (d) d.textContent = now.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  // JavaScript statement/expression: }
  }
  // JavaScript statement/expression: tickClock();
  tickClock();
  // JavaScript statement/expression: setInterval(tickClock, 1000);
  setInterval(tickClock, 1000);

  /* ----- Mobile menu toggle ----- */
  // JavaScript statement/expression: const navToggle = $('#navToggle');
  const navToggle = $('#navToggle');
  // JavaScript statement/expression: const mobileMenu = $('#mobileMenu');
  const mobileMenu = $('#mobileMenu');
  // JavaScript statement/expression: const navIcon = $('#navIcon');
  const navIcon = $('#navIcon');
  // JavaScript statement/expression: const ICON_MENU = 'https://unpkg.com/lucide-static@1.44.0/icons/menu.svg';
  const ICON_MENU = 'https://unpkg.com/lucide-static@1.44.0/icons/menu.svg';
  // JavaScript statement/expression: const ICON_CLOSE = 'https://unpkg.com/lucide-static@1.44.0/icons/x.svg';
  const ICON_CLOSE = 'https://unpkg.com/lucide-static@1.44.0/icons/x.svg';

  // JavaScript statement/expression: function setMenu(open) {
  function setMenu(open) {
    // JavaScript statement/expression: if (!navToggle || !mobileMenu) return;
    if (!navToggle || !mobileMenu) return;
    // JavaScript statement/expression: mobileMenu.classList.toggle('hidden', !open);
    mobileMenu.classList.toggle('hidden', !open);
    // JavaScript statement/expression: navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-expanded', String(open));
    // JavaScript statement/expression: if (navIcon) navIcon.src = open ? ICON_CLOSE : ICON_MENU;
    if (navIcon) navIcon.src = open ? ICON_CLOSE : ICON_MENU;
  // JavaScript statement/expression: }
  }
  // JavaScript statement/expression: if (navToggle && mobileMenu) {
  if (navToggle && mobileMenu) {
    // JavaScript statement/expression: navToggle.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
    navToggle.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
    // Escape closes the menu and returns focus to its button
    // JavaScript statement/expression: document.addEventListener('keydown', (e) => {
    document.addEventListener('keydown', (e) => {
      // JavaScript statement/expression: if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) { setMenu(false); navToggle.focus(); }
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) { setMenu(false); navToggle.focus(); }
    // JavaScript statement/expression: });
    });
    // Picking a link, or widening the window to desktop size, also closes it
    // JavaScript statement/expression: $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    // JavaScript statement/expression: window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
  // JavaScript statement/expression: }
  }

  /* ----- Header shadow once the page is scrolled ----- */
  // JavaScript statement/expression: const siteHeader = $('#siteHeader');
  const siteHeader = $('#siteHeader');
  // JavaScript statement/expression: const toTop = $('#toTop');
  const toTop = $('#toTop');
  // onScroll: handles the on scroll operation used by this feature.
  // JavaScript statement/expression: function onScroll() {
  function onScroll() {
    // JavaScript statement/expression: if (siteHeader) siteHeader.classList.toggle('shadow-md', window.scrollY > 8);
    if (siteHeader) siteHeader.classList.toggle('shadow-md', window.scrollY > 8);
    // JavaScript statement/expression: if (toTop) toTop.classList.toggle('hidden', window.scrollY <= 400);
    if (toTop) toTop.classList.toggle('hidden', window.scrollY <= 400);
  // JavaScript statement/expression: }
  }
  // JavaScript statement/expression: window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  // JavaScript statement/expression: onScroll();
  onScroll();

  /* ----- Back to top ----- */
  // JavaScript statement/expression: if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ----- Cart badge (shared localStorage, also follows other open tabs) ----- */
  // JavaScript statement/expression: updateBadge();
  updateBadge();
  // JavaScript statement/expression: window.addEventListener('storage', (e) => {
  window.addEventListener('storage', (e) => {
    // JavaScript statement/expression: if (e.key === CART_KEY) { state.cart = loadCart(); updateBadge(); document.dispatchEvent(new CustomEvent('cc-c
    if (e.key === CART_KEY) { state.cart = loadCart(); updateBadge(); document.dispatchEvent(new CustomEvent('cc-cart-change')); }
    // JavaScript statement/expression: if (e.key === WISHLIST_KEY) { state.wishlist = loadWishlist(); updateWishlistBadge(); renderWishlist(); docume
    if (e.key === WISHLIST_KEY) { state.wishlist = loadWishlist(); updateWishlistBadge(); renderWishlist(); document.dispatchEvent(new CustomEvent('cc-wishlist-change')); }
  // JavaScript statement/expression: });
  });

  /* ----- Newsletter forms (Web3Forms delivery) ----- */
  // JavaScript statement/expression: const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  // JavaScript statement/expression: const WEB3FORMS_KEY = 'ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa';
  const WEB3FORMS_KEY = 'ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa';

  // JavaScript statement/expression: document.querySelectorAll('form[id^="newsletter"]').forEach((form) => {
  document.querySelectorAll('form[id^="newsletter"]').forEach((form) => {
    // Use JavaScript validation instead of the browser's native validation UI.
    // JavaScript statement/expression: form.noValidate = true;
    form.noValidate = true;
    // JavaScript statement/expression: form.addEventListener('submit', async (e) => {
    form.addEventListener('submit', async (e) => {
      // JavaScript statement/expression: e.preventDefault();
      e.preventDefault();

      // JavaScript statement/expression: const emailInput = form.querySelector('input[name="email"]');
      const emailInput = form.querySelector('input[name="email"]');
      // JavaScript statement/expression: const btn = form.querySelector('button[type="submit"]');
      const btn = form.querySelector('button[type="submit"]');

      // JavaScript statement/expression: if (!emailInput || !btn) return;
      if (!emailInput || !btn) return;

      // JavaScript statement/expression: const email = emailInput.value.trim();
      const email = emailInput.value.trim();
      // JavaScript statement/expression: const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // JavaScript statement/expression: if (!emailPattern.test(email) || email.length > 254) {
      if (!emailPattern.test(email) || email.length > 254) {
        // JavaScript statement/expression: let error = form.querySelector('.newsletter-status');
        let error = form.querySelector('.newsletter-status');
        // JavaScript statement/expression: if (!error) {
        if (!error) {
          // JavaScript statement/expression: error = document.createElement('p');
          error = document.createElement('p');
          // JavaScript statement/expression: error.className = 'newsletter-status';
          error.className = 'newsletter-status';
          // JavaScript statement/expression: error.setAttribute('role', 'alert');
          error.setAttribute('role', 'alert');
          // JavaScript statement/expression: error.setAttribute('aria-live', 'polite');
          error.setAttribute('aria-live', 'polite');
          // JavaScript statement/expression: error.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
          error.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
          // JavaScript statement/expression: form.appendChild(error);
          form.appendChild(error);
        // JavaScript statement/expression: }
        }
        // JavaScript statement/expression: error.textContent = 'Please enter a valid email address (maximum 254 characters).';
        error.textContent = 'Please enter a valid email address (maximum 254 characters).';
        // JavaScript statement/expression: error.style.color = '#b91c1c';
        error.style.color = '#b91c1c';
        // JavaScript statement/expression: emailInput.setAttribute('aria-invalid', 'true');
        emailInput.setAttribute('aria-invalid', 'true');
        // JavaScript statement/expression: emailInput.focus();
        emailInput.focus();
        // JavaScript statement/expression: return;
        return;
      // JavaScript statement/expression: }
      }
      // JavaScript statement/expression: emailInput.removeAttribute('aria-invalid');
      emailInput.removeAttribute('aria-invalid');

      // JavaScript statement/expression: if (btn.disabled) return;
      if (btn.disabled) return;

      // JavaScript statement/expression: const originalText = btn.textContent.trim();
      const originalText = btn.textContent.trim();
      // JavaScript statement/expression: const formData = new FormData(form);
      const formData = new FormData(form);

      // JavaScript statement/expression: formData.set('access_key', WEB3FORMS_KEY);
      formData.set('access_key', WEB3FORMS_KEY);
      // JavaScript statement/expression: formData.set('email', email);
      formData.set('email', email);
      // JavaScript statement/expression: formData.set('subject', 'New Campus-Cart Newsletter Subscription');
      formData.set('subject', 'New Campus-Cart Newsletter Subscription');
      // JavaScript statement/expression: formData.set('from_name', 'Campus-Cart Newsletter');
      formData.set('from_name', 'Campus-Cart Newsletter');
      // JavaScript statement/expression: formData.set('message', 'New newsletter subscription: ' + email);
      formData.set('message', 'New newsletter subscription: ' + email);

      // JavaScript statement/expression: let status = form.querySelector('.newsletter-status');
      let status = form.querySelector('.newsletter-status');
      // JavaScript statement/expression: if (!status) {
      if (!status) {
        // JavaScript statement/expression: status = document.createElement('p');
        status = document.createElement('p');
        // JavaScript statement/expression: status.className = 'newsletter-status';
        status.className = 'newsletter-status';
        // JavaScript statement/expression: status.setAttribute('role', 'status');
        status.setAttribute('role', 'status');
        // JavaScript statement/expression: status.setAttribute('aria-live', 'polite');
        status.setAttribute('aria-live', 'polite');
        // JavaScript statement/expression: status.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
        status.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
        // JavaScript statement/expression: form.appendChild(status);
        form.appendChild(status);
      // JavaScript statement/expression: }
      }

      // JavaScript statement/expression: btn.textContent = 'Subscribing...';
      btn.textContent = 'Subscribing...';
      // JavaScript statement/expression: btn.disabled = true;
      btn.disabled = true;
      // JavaScript statement/expression: status.textContent = 'Submitting your subscription...';
      status.textContent = 'Submitting your subscription...';
      // JavaScript statement/expression: status.style.color = '#64748b';
      status.style.color = '#64748b';

      // JavaScript statement/expression: try {
      try {
        // JavaScript statement/expression: const response = await fetch(WEB3FORMS_URL, {
        const response = await fetch(WEB3FORMS_URL, {
          // JavaScript statement/expression: method: 'POST',
          method: 'POST',
          // JavaScript statement/expression: body: formData
          body: formData
        // JavaScript statement/expression: });
        });
        // JavaScript statement/expression: const data = await response.json();
        const data = await response.json();

        // JavaScript statement/expression: if (response.ok && data.success) {
        if (response.ok && data.success) {
          // JavaScript statement/expression: status.textContent = 'Successfully subscribed! Thank you for joining us.';
          status.textContent = 'Successfully subscribed! Thank you for joining us.';
          // JavaScript statement/expression: status.style.color = '#047857';
          status.style.color = '#047857';
          // JavaScript statement/expression: form.reset();
          form.reset();
        // JavaScript statement/expression: } else {
        } else {
          // JavaScript statement/expression: status.textContent = 'Subscription failed: ' + (data.message || 'Please try again.');
          status.textContent = 'Subscription failed: ' + (data.message || 'Please try again.');
          // JavaScript statement/expression: status.style.color = '#b91c1c';
          status.style.color = '#b91c1c';
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: } catch (error) {
      } catch (error) {
        // JavaScript statement/expression: status.textContent = 'Something went wrong. Please check your connection and try again.';
        status.textContent = 'Something went wrong. Please check your connection and try again.';
        // JavaScript statement/expression: status.style.color = '#b91c1c';
        status.style.color = '#b91c1c';
      // JavaScript statement/expression: } finally {
      } finally {
        // JavaScript statement/expression: btn.textContent = originalText;
        btn.textContent = originalText;
        // JavaScript statement/expression: btn.disabled = false;
        btn.disabled = false;
      // JavaScript statement/expression: }
      }
    // JavaScript statement/expression: });
    });
  // JavaScript statement/expression: });
  });

  /* ----- FAQ accordions: keep one answer open per FAQ group ----- */
  // JavaScript statement/expression: $$('details').forEach((detail) => {
  $$('details').forEach((detail) => {
    // JavaScript statement/expression: detail.addEventListener('toggle', () => {
    detail.addEventListener('toggle', () => {
      // JavaScript statement/expression: if (!detail.open) return;
      if (!detail.open) return;
      // JavaScript statement/expression: const parent = detail.parentElement;
      const parent = detail.parentElement;
      // JavaScript statement/expression: if (!parent) return;
      if (!parent) return;
      // JavaScript statement/expression: Array.from(parent.children).forEach((sibling) => {
      Array.from(parent.children).forEach((sibling) => {
        // JavaScript statement/expression: if (sibling !== detail && sibling.tagName === 'DETAILS' && sibling.open) sibling.open = false;
        if (sibling !== detail && sibling.tagName === 'DETAILS' && sibling.open) sibling.open = false;
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: });
    });
  // JavaScript statement/expression: });
  });

  /* ----- Footer © year ----- */
  // JavaScript statement/expression: const currentYear = new Date().getFullYear();
  const currentYear = new Date().getFullYear();
  // JavaScript statement/expression: const yearEl = $('#copyright-year');
  const yearEl = $('#copyright-year');
  // JavaScript statement/expression: const checklistYear = $('#checklist-copyright-year');
  const checklistYear = $('#checklist-copyright-year');
  // JavaScript statement/expression: if (yearEl) yearEl.textContent = currentYear;
  if (yearEl) yearEl.textContent = currentYear;
  // JavaScript statement/expression: if (checklistYear) checklistYear.textContent = currentYear;
  if (checklistYear) checklistYear.textContent = currentYear;
// JavaScript statement/expression: })();
})();

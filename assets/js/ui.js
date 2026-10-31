// ==========================================================
// CAMPUS-CART
// ui.js - shared interface code used on every page
//   - shared helpers and the cart storage (window.CC)
//   - live SAST clock, mobile menu, header shadow, Escape closes the menu
//   - cart count badge, snack bar / toast messages
//   - back to top button, newsletter forms, footer year
// Loaded first, because the other files read window.CC.
// ==========================================================

(function () {
  'use strict';

  /* ----- Helpers ----- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const formatRand = (n) => 'R' + Number(n).toLocaleString('en-US').replace(/,/g, ' ');

  /* ----- Disable native browser validation on all forms ----- */
  $$('form').forEach((form) => { form.noValidate = true; });

  /* ----- Cart storage (localStorage wrapped so blocked storage never breaks the page) ----- */
  const CART_KEY = 'cc_cart_v1';
  const WISHLIST_KEY = 'cc_wishlist_v1';
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      // Keep only well-formed rows, so edited or corrupted storage can never break or inject into the page.
      return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)) && Number.isInteger(Number(row.qty)) && Number(row.qty) > 0)
        .map((row) => ({ name: row.name, price: Number(row.price), qty: Number(row.qty) }));
    } catch (e) { return []; }
  }
  function loadWishlist() {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((row) => row && typeof row.name === 'string' && Number.isFinite(Number(row.price)))
        .map((row) => ({ name: row.name, price: Number(row.price) }));
    } catch (e) { return []; }
  }
  const state = { cart: loadCart(), wishlist: loadWishlist() };

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) { /* storage blocked - keep in memory */ }
  }

  function saveWishlist() {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist)); } catch (e) { /* storage blocked - keep in memory */ }
  }

  function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }
  function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
  function wishlistCount() { return state.wishlist.length; }
  function isWishlisted(name) { return state.wishlist.some((item) => item.name === name); }

  function updateBadge() {
    const badge = $('#cartCount');
    if (badge) {
      const before = badge.textContent;
      badge.textContent = String(cartCount());
      if (before !== badge.textContent && badge.animate) {
        badge.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 300 });
      }
    }
  }

  // Adds an item, saves, refreshes the badge and tells the other files (the cart drawer and the order summary).
  function addToCart(name, price) {
    const existing = state.cart.find((item) => item.name === name);
    if (existing) { existing.qty += 1; } else { state.cart.push({ name: name, price: Number(price), qty: 1 }); }
    saveCart();
    updateBadge();
    document.dispatchEvent(new CustomEvent('cc-cart-change'));
  }

  function changeCart() {
    saveCart();
    updateBadge();
    document.dispatchEvent(new CustomEvent('cc-cart-change'));
  }

  function updateWishlistBadge() {
    const badge = $('#wishlistCount');
    if (badge) badge.textContent = String(wishlistCount());
    $$('[data-add-to-wishlist]').forEach((button) => {
      const active = isWishlisted(button.dataset.name);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? 'Remove ' + button.dataset.name + ' from wishlist' : 'Add ' + button.dataset.name + ' to wishlist');
      const icon = button.querySelector('[data-wishlist-icon]');
      if (icon) icon.textContent = active ? '♥' : '♡';
      button.classList.toggle('is-wishlisted', active);
    });
  }

  function toggleWishlist(name, price) {
    const index = state.wishlist.findIndex((item) => item.name === name);
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
    document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
    return index < 0;
  }

  function removeFromWishlist(name) {
    state.wishlist = state.wishlist.filter((item) => item.name !== name);
    saveWishlist();
    updateWishlistBadge();
    renderWishlist();
    document.dispatchEvent(new CustomEvent('cc-wishlist-change'));
  }

  function renderWishlist() {
    const list = $('#wishlistItems');
    const empty = $('#wishlistEmpty');
    if (!list || !empty) return;
    list.replaceChildren();
    empty.classList.toggle('hidden', state.wishlist.length > 0);
    state.wishlist.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between gap-3 border-b border-slate-100 py-3';
      const details = document.createElement('div');
      details.className = 'min-w-0';
      const name = document.createElement('p');
      name.className = 'truncate text-sm font-bold text-[#0d1b3e]';
      name.textContent = item.name;
      const price = document.createElement('p');
      price.className = 'text-xs text-slate-500';
      price.textContent = item.price > 0 ? formatRand(item.price) : 'Price to be confirmed';
      details.append(name, price);
      const actions = document.createElement('div');
      actions.className = 'flex shrink-0 items-center gap-2';
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'rounded-full bg-[#0d1b3e] px-3 py-2 text-xs font-bold text-white';
      add.textContent = 'Add to cart';
      add.addEventListener('click', () => {
        if (item.price > 0) addToCart(item.name, item.price);
        removeFromWishlist(item.name);
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => removeFromWishlist(item.name));
      actions.append(add, remove);
      row.append(details, actions);
      list.appendChild(row);
    });
  }

  function setupWishlist() {
    const cartButton = $('#cartButton');
    const menuButton = $('#navToggle');
    const wishlistAnchor = cartButton || menuButton;
    if (wishlistAnchor && !$('#wishlistButton')) {
      const button = document.createElement('button');
      button.id = 'wishlistButton';
      button.type = 'button';
      button.className = 'relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-[#0d1b3e] transition hover:border-[#0d1b3e]';
      button.setAttribute('aria-label', 'Open wishlist');
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = '<span aria-hidden="true" class="text-xl leading-none">♡</span><span id="wishlistCount" class="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ffd23f] px-1 text-[11px] font-extrabold text-[#0d1b3e]">0</span>';
      wishlistAnchor.parentNode.insertBefore(button, wishlistAnchor);

      const panel = document.createElement('section');
      panel.id = 'wishlistPanel';
      panel.className = 'fixed right-4 top-20 z-[85] hidden w-[min(92vw,26rem)] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'false');
      panel.setAttribute('aria-labelledby', 'wishlistTitle');
      panel.innerHTML = '<div class="flex items-center justify-between gap-3"><h2 id="wishlistTitle" class="text-lg font-extrabold text-[#0d1b3e]">Your wishlist</h2><button type="button" id="wishlistClose" class="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600" aria-label="Close wishlist">Close</button></div><p class="mt-1 text-xs text-slate-500">Saved on this device and shared across Campus-Cart pages.</p><p id="wishlistEmpty" class="py-8 text-center text-sm text-slate-500">Your wishlist is empty. Save products using the heart buttons.</p><div id="wishlistItems" class="mt-3 max-h-[55vh] overflow-y-auto"></div>';
      document.body.appendChild(panel);
      button.addEventListener('click', () => {
        const opening = panel.classList.contains('hidden');
        panel.classList.toggle('hidden', !opening);
        button.setAttribute('aria-expanded', String(opening));
        if (opening) renderWishlist();
      });
      $('#wishlistClose').addEventListener('click', () => {
        panel.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
      });
      document.addEventListener('click', (event) => {
        if (!panel.classList.contains('hidden') && !panel.contains(event.target) && !button.contains(event.target)) {
          panel.classList.add('hidden');
          button.setAttribute('aria-expanded', 'false');
        }
      });
    }

    $$('[data-add-to-cart]').forEach((cartBtn) => {
      const name = cartBtn.dataset.name;
      const price = Number(cartBtn.dataset.price);
      if (!name || cartBtn.parentElement.querySelector('[data-add-to-wishlist]')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.addToWishlist = '';
      button.dataset.name = name;
      button.dataset.price = String(price || 0);
      button.className = 'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0d1b3e]/25 bg-white text-xl text-[#0d1b3e] transition hover:bg-[#0d1b3e]/5';
      button.innerHTML = '<span data-wishlist-icon aria-hidden="true">♡</span>';
      button.addEventListener('click', () => toggleWishlist(name, price));
      cartBtn.insertAdjacentElement('beforebegin', button);
    });
    updateWishlistBadge();
    renderWishlist();
  }

  /* ----- Snack bar (uses #snack when the page has it, otherwise a small toast) ----- */
  let snackTimer;
  function showSnack(message) {
    const snack = $('#snack');
    if (snack) {
      snack.textContent = message;
      snack.classList.remove('opacity-0', 'pointer-events-none');
      clearTimeout(snackTimer);
      snackTimer = setTimeout(() => snack.classList.add('opacity-0', 'pointer-events-none'), 2600);
      return;
    }
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  window.CC = {
    $: $, $: $, formatRand: formatRand, state: state, CART_KEY: CART_KEY, WISHLIST_KEY: WISHLIST_KEY,
    saveCart: saveCart, cartCount: cartCount, cartTotal: cartTotal,
    updateBadge: updateBadge, addToCart: addToCart, changeCart: changeCart,
    saveWishlist: saveWishlist, wishlistCount: wishlistCount, isWishlisted: isWishlisted,
    toggleWishlist: toggleWishlist, removeFromWishlist: removeFromWishlist, updateWishlistBadge: updateWishlistBadge,
    showSnack: showSnack
  };
  setupWishlist();

  /* ----- Live clock (header) ----- */
  function tickClock() {
    const now = new Date();
    const t = $('#navTime');
    const d = $('#navDate');
    if (t) t.textContent = now.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (d) d.textContent = now.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ----- Mobile menu toggle ----- */
  const navToggle = $('#navToggle');
  const mobileMenu = $('#mobileMenu');
  const navIcon = $('#navIcon');
  const ICON_MENU = 'https://unpkg.com/lucide-static@1.44.0/icons/menu.svg';
  const ICON_CLOSE = 'https://unpkg.com/lucide-static@1.44.0/icons/x.svg';

  function setMenu(open) {
    if (!navToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('hidden', !open);
    navToggle.setAttribute('aria-expanded', String(open));
    if (navIcon) navIcon.src = open ? ICON_CLOSE : ICON_MENU;
  }
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
    // Escape closes the menu and returns focus to its button
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) { setMenu(false); navToggle.focus(); }
    });
    // Picking a link, or widening the window to desktop size, also closes it
    $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
  }

  /* ----- Header shadow once the page is scrolled ----- */
  const siteHeader = $('#siteHeader');
  const toTop = $('#toTop');
  function onScroll() {
    if (siteHeader) siteHeader.classList.toggle('shadow-md', window.scrollY > 8);
    if (toTop) toTop.classList.toggle('hidden', window.scrollY <= 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Back to top ----- */
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ----- Cart badge (shared localStorage, also follows other open tabs) ----- */
  updateBadge();
  window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY) { state.cart = loadCart(); updateBadge(); document.dispatchEvent(new CustomEvent('cc-cart-change')); }
    if (e.key === WISHLIST_KEY) { state.wishlist = loadWishlist(); updateWishlistBadge(); renderWishlist(); document.dispatchEvent(new CustomEvent('cc-wishlist-change')); }
  });

  /* ----- Newsletter forms (Web3Forms delivery) ----- */
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  const WEB3FORMS_KEY = 'ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa';

  document.querySelectorAll('form[id^="newsletter"]').forEach((form) => {
    // Use JavaScript validation instead of the browser's native validation UI.
    form.noValidate = true;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = form.querySelector('input[name="email"]');
      const btn = form.querySelector('button[type="submit"]');

      if (!emailInput || !btn) return;

      const email = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email) || email.length > 254) {
        let error = form.querySelector('.newsletter-status');
        if (!error) {
          error = document.createElement('p');
          error.className = 'newsletter-status';
          error.setAttribute('role', 'alert');
          error.setAttribute('aria-live', 'polite');
          error.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
          form.appendChild(error);
        }
        error.textContent = 'Please enter a valid email address (maximum 254 characters).';
        error.style.color = '#b91c1c';
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        return;
      }
      emailInput.removeAttribute('aria-invalid');

      if (btn.disabled) return;

      const originalText = btn.textContent.trim();
      const formData = new FormData(form);

      formData.set('access_key', WEB3FORMS_KEY);
      formData.set('email', email);
      formData.set('subject', 'New Campus-Cart Newsletter Subscription');
      formData.set('from_name', 'Campus-Cart Newsletter');
      formData.set('message', 'New newsletter subscription: ' + email);

      let status = form.querySelector('.newsletter-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'newsletter-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:600;';
        form.appendChild(status);
      }

      btn.textContent = 'Subscribing...';
      btn.disabled = true;
      status.textContent = 'Submitting your subscription...';
      status.style.color = '#64748b';

      try {
        const response = await fetch(WEB3FORMS_URL, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();

        if (response.ok && data.success) {
          status.textContent = 'Successfully subscribed! Thank you for joining us.';
          status.style.color = '#047857';
          form.reset();
        } else {
          status.textContent = 'Subscription failed: ' + (data.message || 'Please try again.');
          status.style.color = '#b91c1c';
        }
      } catch (error) {
        status.textContent = 'Something went wrong. Please check your connection and try again.';
        status.style.color = '#b91c1c';
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  });

  /* ----- FAQ accordions: keep one answer open per FAQ group ----- */
  $$('details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      const parent = detail.parentElement;
      if (!parent) return;
      Array.from(parent.children).forEach((sibling) => {
        if (sibling !== detail && sibling.tagName === 'DETAILS' && sibling.open) sibling.open = false;
      });
    });
  });

  /* ----- Footer © year ----- */
  const currentYear = new Date().getFullYear();
  const yearEl = $('#copyright-year');
  const checklistYear = $('#checklist-copyright-year');
  if (yearEl) yearEl.textContent = currentYear;
  if (checklistYear) checklistYear.textContent = currentYear;
})();

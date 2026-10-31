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

  /* ----- Cart storage (localStorage wrapped so blocked storage never breaks the page) ----- */
  const CART_KEY = 'cc_cart_v1';
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
  const state = { cart: loadCart() };

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) { /* storage blocked - keep in memory */ }
  }

  function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }
  function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0); }

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
    $: $, $$: $$, formatRand: formatRand, state: state, CART_KEY: CART_KEY,
    saveCart: saveCart, cartCount: cartCount, cartTotal: cartTotal,
    updateBadge: updateBadge, addToCart: addToCart, changeCart: changeCart, showSnack: showSnack
  };

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
  });

  /* ----- Newsletter forms (Web3Forms delivery) ----- */
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  const WEB3FORMS_KEY = 'ce1abf2e-a2e8-46b7-b6a5-f9814d57b8aa';

  $('form[id^="newsletter"]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');

      if (!emailInput || !btn || !emailInput.checkValidity()) {
        emailInput?.reportValidity();
        return;
      }

      if (btn.disabled) return;

      const originalText = btn.textContent.trim();
      const email = emailInput.value.trim();
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

  /* ----- Footer © year ----- */
  const yearEl = $('#copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

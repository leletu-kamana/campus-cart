// ==========================================================
// CAMPUS-CART
// interactions.js - what visitors click, search and filter
//   1. Cart drawer and add-to-cart buttons (home page)
//   2. Order summary, hand-off messages and EFT details (account page)
//   3. Shop tabs, deals list (search, filter, sort, see more / less),
//      gallery filter, product detail picker, print checklist (products page)
//   4. Coverage search (coverage page)
// Every block checks that its elements exist, so this one file is safe
// on every page. Needs ui.js (window.CC) and data.js (CC_CATALOGUE).
// INLINE COMMENTING GUIDE: Explanatory comments identify the purpose of the main logic blocks, state changes, DOM operations and event handling.
// ==========================================================

// JavaScript statement/expression: (function () {
(function () {
  // JavaScript statement/expression: 'use strict';
  'use strict';

  // JavaScript statement/expression: const CC = window.CC;
  const CC = window.CC;
  // JavaScript statement/expression: const $ = CC.$;
  const $ = CC.$;
  // JavaScript statement/expression: const $$ = CC.$$;
  const $$ = CC.$$;
  // JavaScript statement/expression: const formatRand = CC.formatRand;
  const formatRand = CC.formatRand;
  // JavaScript statement/expression: const state = CC.state;
  const state = CC.state;
  // JavaScript statement/expression: const showSnack = CC.showSnack;
  const showSnack = CC.showSnack;
  // JavaScript statement/expression: const ICON = 'https://unpkg.com/lucide-static@1.44.0/icons/';
  const ICON = 'https://unpkg.com/lucide-static@1.44.0/icons/';

  // JavaScript statement/expression: const esc = (text) => String(text)
  const esc = (text) => String(text)
    // JavaScript statement/expression: .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // JavaScript statement/expression: .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ===== 1. Cart drawer (home page) ===== */
  // JavaScript statement/expression: const cartDrawer = $('#cartDrawer');
  const cartDrawer = $('#cartDrawer');
  // JavaScript statement/expression: const cartButton = $('#cartButton');
  const cartButton = $('#cartButton');
  // JavaScript statement/expression: const cartItemsEl = $('#cartItems');
  const cartItemsEl = $('#cartItems');
  // JavaScript statement/expression: const cartTotalEl = $('#cartTotal');
  const cartTotalEl = $('#cartTotal');

  // renderCart: handles the render cart operation used by this feature.

  // JavaScript statement/expression: function renderCart() {
  function renderCart() {
    // JavaScript statement/expression: if (!cartItemsEl) return;
    if (!cartItemsEl) return;
    // JavaScript statement/expression: const cart = state.cart;
    const cart = state.cart;
    // JavaScript statement/expression: if (!cart.length) {
    if (!cart.length) {
      // JavaScript statement/expression: cartItemsEl.innerHTML =
      cartItemsEl.innerHTML =
        // JavaScript statement/expression: '<div class="flex h-full flex-col items-center justify-center text-center">' +
        '<div class="flex h-full flex-col items-center justify-center text-center">' +
        // JavaScript statement/expression: '  <img src="' + ICON + 'shopping-bag.svg" alt="" class="h-10 w-10 text-slate-300">' +
        '  <img src="' + ICON + 'shopping-bag.svg" alt="" class="h-10 w-10 text-slate-300">' +
        // JavaScript statement/expression: '  <p class="mt-4 text-sm font-semibold text-[#0d1b3e]">Your cart is empty</p>' +
        '  <p class="mt-4 text-sm font-semibold text-[#0d1b3e]">Your cart is empty</p>' +
        // JavaScript statement/expression: '  <p class="mt-1 text-xs text-slate-500">Add a bundle or a second-hand pick.</p>' +
        '  <p class="mt-1 text-xs text-slate-500">Add a bundle or a second-hand pick.</p>' +
        // JavaScript statement/expression: '</div>';
        '</div>';
      // JavaScript statement/expression: if (cartTotalEl) cartTotalEl.textContent = 'R0';
      if (cartTotalEl) cartTotalEl.textContent = 'R0';
      // JavaScript statement/expression: return;
      return;
    // JavaScript statement/expression: }
    }
    // JavaScript statement/expression: cartItemsEl.innerHTML = cart.map((item, index) =>
    cartItemsEl.innerHTML = cart.map((item, index) =>
      // JavaScript statement/expression: '<div class="flex items-center gap-3 border-b border-slate-100 py-3">' +
      '<div class="flex items-center gap-3 border-b border-slate-100 py-3">' +
      // JavaScript statement/expression: '  <div class="flex-1">' +
      '  <div class="flex-1">' +
      // JavaScript statement/expression: '    <p class="text-sm font-bold text-[#0d1b3e]">' + esc(item.name) + '</p>' +
      '    <p class="text-sm font-bold text-[#0d1b3e]">' + esc(item.name) + '</p>' +
      // JavaScript statement/expression: '    <p class="mt-0.5 text-xs text-slate-500">Qty ' + item.qty + ' × ' + formatRand(item.price) + '</p>' +
      '    <p class="mt-0.5 text-xs text-slate-500">Qty ' + item.qty + ' × ' + formatRand(item.price) + '</p>' +
      // JavaScript statement/expression: '  </div>' +
      '  </div>' +
      // JavaScript statement/expression: '  <p class="text-sm font-extrabold text-[#0d1b3e]">' + formatRand(item.price * item.qty) + '</p>' +
      '  <p class="text-sm font-extrabold text-[#0d1b3e]">' + formatRand(item.price * item.qty) + '</p>' +
      // JavaScript statement/expression: '  <button type="button" data-remove="' + index + '" class="grid h-8 w-8 shrink-0 place-items-center rounded-f
      '  <button type="button" data-remove="' + index + '" class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:border-red-300 hover:text-red-600" aria-label="Remove ' + esc(item.name) + '">' +
      // JavaScript statement/expression: '    <img src="' + ICON + 'x.svg" alt="" class="h-3.5 w-3.5">' +
      '    <img src="' + ICON + 'x.svg" alt="" class="h-3.5 w-3.5">' +
      // JavaScript statement/expression: '  </button>' +
      '  </button>' +
      // JavaScript statement/expression: '</div>'
      '</div>'
    // JavaScript statement/expression: ).join('');
    ).join('');
    // JavaScript statement/expression: if (cartTotalEl) cartTotalEl.textContent = formatRand(CC.cartTotal());
    if (cartTotalEl) cartTotalEl.textContent = formatRand(CC.cartTotal());
  // JavaScript statement/expression: }
  }

  // openCart: handles the open cart operation used by this feature.

  // JavaScript statement/expression: function openCart() { cartDrawer.classList.remove('hidden'); document.body.style.overflow = 'hidden'; if (cart
  function openCart() { cartDrawer.classList.remove('hidden'); document.body.style.overflow = 'hidden'; if (cartButton) cartButton.setAttribute('aria-expanded', 'true'); }
  // closeCart: handles the close cart operation used by this feature.
  // JavaScript statement/expression: function closeCart() { cartDrawer.classList.add('hidden'); document.body.style.overflow = ''; if (cartButton) 
  function closeCart() { cartDrawer.classList.add('hidden'); document.body.style.overflow = ''; if (cartButton) cartButton.setAttribute('aria-expanded', 'false'); }

  // JavaScript statement/expression: if (cartDrawer) {
  if (cartDrawer) {
    // JavaScript statement/expression: if (cartItemsEl) {
    if (cartItemsEl) {
      // JavaScript statement/expression: cartItemsEl.addEventListener('click', (e) => {
      cartItemsEl.addEventListener('click', (e) => {
        // JavaScript statement/expression: const btn = e.target.closest('[data-remove]');
        const btn = e.target.closest('[data-remove]');
        // JavaScript statement/expression: if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
        if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: }
    }
    // JavaScript statement/expression: if (cartButton) cartButton.addEventListener('click', openCart);
    if (cartButton) cartButton.addEventListener('click', openCart);
    // JavaScript statement/expression: $$('[data-cart-close]').forEach((el) => el.addEventListener('click', closeCart));
    $$('[data-cart-close]').forEach((el) => el.addEventListener('click', closeCart));
    // JavaScript statement/expression: document.addEventListener('keydown', (e) => {
    document.addEventListener('keydown', (e) => {
      // JavaScript statement/expression: if (e.key === 'Escape' && !cartDrawer.classList.contains('hidden')) closeCart();
      if (e.key === 'Escape' && !cartDrawer.classList.contains('hidden')) closeCart();
    // JavaScript statement/expression: });
    });
    // JavaScript statement/expression: document.addEventListener('cc-cart-change', renderCart);
    document.addEventListener('cc-cart-change', renderCart);
    // JavaScript statement/expression: renderCart();
    renderCart();
  // JavaScript statement/expression: }
  }

  /* ===== Add-to-cart buttons (event delegation, works for cards drawn later too) ===== */
  // JavaScript statement/expression: document.addEventListener('click', (e) => {
  document.addEventListener('click', (e) => {
    // JavaScript statement/expression: const drawerBtn = e.target.closest('[data-add-to-cart]');
    const drawerBtn = e.target.closest('[data-add-to-cart]');
    // JavaScript statement/expression: if (drawerBtn) { CC.addToCart(drawerBtn.dataset.name, drawerBtn.dataset.price); return; }
    if (drawerBtn) { CC.addToCart(drawerBtn.dataset.name, drawerBtn.dataset.price); return; }
    // JavaScript statement/expression: const orderBtn = e.target.closest('[data-add]');
    const orderBtn = e.target.closest('[data-add]');
    // JavaScript statement/expression: if (orderBtn) {
    if (orderBtn) {
      // JavaScript statement/expression: CC.addToCart(orderBtn.dataset.add, orderBtn.dataset.price);
      CC.addToCart(orderBtn.dataset.add, orderBtn.dataset.price);
      // JavaScript statement/expression: showSnack('Added "' + orderBtn.dataset.add + '" to your order summary.');
      showSnack('Added "' + orderBtn.dataset.add + '" to your order summary.');
    // JavaScript statement/expression: }
    }
  // JavaScript statement/expression: });
  });

  /* ===== 2. Account page: order summary ===== */
  // JavaScript statement/expression: const orderBody = $('#order-body');
  const orderBody = $('#order-body');
  // JavaScript statement/expression: if (orderBody) {
  if (orderBody) {
    // JavaScript statement/expression: const orderEmpty = $('#order-empty');
    const orderEmpty = $('#order-empty');
    // JavaScript statement/expression: const orderWrap = $('#order-table-wrap');
    const orderWrap = $('#order-table-wrap');
    // JavaScript statement/expression: const orderTotal = $('#order-total');
    const orderTotal = $('#order-total');

    // JavaScript statement/expression: const renderOrder = () => {
    const renderOrder = () => {
      // JavaScript statement/expression: const cart = state.cart;
      const cart = state.cart;
      // JavaScript statement/expression: CC.updateBadge();
      CC.updateBadge();
      // JavaScript statement/expression: if (!cart.length) {
      if (!cart.length) {
        // JavaScript statement/expression: orderEmpty.classList.remove('hidden');
        orderEmpty.classList.remove('hidden');
        // JavaScript statement/expression: orderWrap.classList.add('hidden');
        orderWrap.classList.add('hidden');
        // JavaScript statement/expression: return;
        return;
      // JavaScript statement/expression: }
      }
      // JavaScript statement/expression: orderEmpty.classList.add('hidden');
      orderEmpty.classList.add('hidden');
      // JavaScript statement/expression: orderWrap.classList.remove('hidden');
      orderWrap.classList.remove('hidden');
      // JavaScript statement/expression: orderBody.innerHTML = cart.map((item, index) =>
      orderBody.innerHTML = cart.map((item, index) =>
        // JavaScript statement/expression: '<tr>' +
        '<tr>' +
        // JavaScript statement/expression: '  <td class="px-5 py-4 font-semibold text-[#0d1b3e]">' + esc(item.name) + '</td>' +
        '  <td class="px-5 py-4 font-semibold text-[#0d1b3e]">' + esc(item.name) + '</td>' +
        // JavaScript statement/expression: '  <td class="px-5 py-4 text-slate-500">' + formatRand(item.price) + '</td>' +
        '  <td class="px-5 py-4 text-slate-500">' + formatRand(item.price) + '</td>' +
        // JavaScript statement/expression: '  <td class="px-5 py-4 text-slate-600">' + item.qty + '</td>' +
        '  <td class="px-5 py-4 text-slate-600">' + item.qty + '</td>' +
        // JavaScript statement/expression: '  <td class="px-5 py-4 font-bold text-[#0d1b3e]">' + formatRand(item.price * item.qty) + '</td>' +
        '  <td class="px-5 py-4 font-bold text-[#0d1b3e]">' + formatRand(item.price * item.qty) + '</td>' +
        // JavaScript statement/expression: '  <td class="px-5 py-4 text-right">' +
        '  <td class="px-5 py-4 text-right">' +
        // JavaScript statement/expression: '    <button type="button" data-remove="' + index + '" class="inline-grid h-8 w-8 place-items-center rounded-f
        '    <button type="button" data-remove="' + index + '" class="inline-grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:border-red-300 hover:text-red-600" aria-label="Remove ' + esc(item.name) + '">' +
        // JavaScript statement/expression: '      <img src="' + ICON + 'x.svg" alt="" class="h-3.5 w-3.5">' +
        '      <img src="' + ICON + 'x.svg" alt="" class="h-3.5 w-3.5">' +
        // JavaScript statement/expression: '    </button>' +
        '    </button>' +
        // JavaScript statement/expression: '  </td>' +
        '  </td>' +
        // JavaScript statement/expression: '</tr>'
        '</tr>'
      // JavaScript statement/expression: ).join('');
      ).join('');
      // JavaScript statement/expression: orderTotal.textContent = formatRand(CC.cartTotal());
      orderTotal.textContent = formatRand(CC.cartTotal());
    // JavaScript statement/expression: };
    };

    // JavaScript statement/expression: orderBody.addEventListener('click', (e) => {
    orderBody.addEventListener('click', (e) => {
      // JavaScript statement/expression: const btn = e.target.closest('[data-remove]');
      const btn = e.target.closest('[data-remove]');
      // JavaScript statement/expression: if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
      if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
    // JavaScript statement/expression: });
    });
    // JavaScript statement/expression: document.addEventListener('cc-cart-change', renderOrder);
    document.addEventListener('cc-cart-change', renderOrder);

    // JavaScript statement/expression: $('#order-clear').addEventListener('click', () => {
    $('#order-clear').addEventListener('click', () => {
      // JavaScript statement/expression: state.cart = [];
      state.cart = [];
      // JavaScript statement/expression: CC.changeCart();
      CC.changeCart();
      // JavaScript statement/expression: showSnack('Order summary cleared.');
      showSnack('Order summary cleared.');
    // JavaScript statement/expression: });
    });

    // The shared header cart button opens the cart drawer on every page.

    // JavaScript statement/expression: $('#skip-to-address').addEventListener('click', () => {
    $('#skip-to-address').addEventListener('click', () => {
      // JavaScript statement/expression: $('#step-address').scrollIntoView({ behavior: 'smooth', block: 'center' });
      $('#step-address').scrollIntoView({ behavior: 'smooth', block: 'center' });
    // JavaScript statement/expression: });
    });

    // Delivery method hint
    // JavaScript statement/expression: const deliveryMethod = $('#delivery-method');
    const deliveryMethod = $('#delivery-method');
    // JavaScript statement/expression: const deliveryHint = $('#delivery-hint');
    const deliveryHint = $('#delivery-hint');
    // JavaScript statement/expression: deliveryMethod.addEventListener('change', () => {
    deliveryMethod.addEventListener('change', () => {
      // JavaScript statement/expression: deliveryHint.textContent = deliveryMethod.value === 'collection'
      deliveryHint.textContent = deliveryMethod.value === 'collection'
        // JavaScript statement/expression: ? 'Collection is free at any listed campus, residence or locker point.'
        ? 'Collection is free at any listed campus, residence or locker point.'
        // JavaScript statement/expression: : 'Courier delivery is quoted based on your address before we confirm.';
        : 'Courier delivery is quoted based on your address before we confirm.';
    // JavaScript statement/expression: });
    });

    // Hand-off message (WhatsApp / email / EFT)
    // JavaScript statement/expression: const buildOrderMessage = () => {
    const buildOrderMessage = () => {
      // JavaScript statement/expression: const cart = state.cart;
      const cart = state.cart;
      // JavaScript statement/expression: const lines = cart.map((item, i) => (i + 1) + '. ' + item.name + ' × ' + item.qty + ' — ' + formatRand(item.pr
      const lines = cart.map((item, i) => (i + 1) + '. ' + item.name + ' × ' + item.qty + ' — ' + formatRand(item.price * item.qty));
      // JavaScript statement/expression: const method = deliveryMethod.value === 'collection' ? 'collect at a Campus-Cart point' : 'have it delivered b
      const method = deliveryMethod.value === 'collection' ? 'collect at a Campus-Cart point' : 'have it delivered by courier';
      // JavaScript statement/expression: const addr = $('#delivery-address').value.trim();
      const addr = $('#delivery-address').value.trim();
      // JavaScript statement/expression: let msg = 'Hello Campus-Cart! I’d like to order:\n' + lines.join('\n') + '\nTotal: ' + formatRand(CC.cartTotal
      let msg = 'Hello Campus-Cart! I’d like to order:\n' + lines.join('\n') + '\nTotal: ' + formatRand(CC.cartTotal()) + '\nI’d like to ' + method + '.';
      // JavaScript statement/expression: if (addr) msg += '\nLocation: ' + addr;
      if (addr) msg += '\nLocation: ' + addr;
      // JavaScript statement/expression: return msg;
      return msg;
    // JavaScript statement/expression: };
    };

    // JavaScript statement/expression: $('#checkout-whatsapp').addEventListener('click', (e) => {
    $('#checkout-whatsapp').addEventListener('click', (e) => {
      // JavaScript statement/expression: e.preventDefault();
      e.preventDefault();
      // JavaScript statement/expression: if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      // JavaScript statement/expression: window.open('https://wa.me/27123456789?text=' + encodeURIComponent(buildOrderMessage()), '_blank', 'noopener')
      window.open('https://wa.me/27123456789?text=' + encodeURIComponent(buildOrderMessage()), '_blank', 'noopener');
    // JavaScript statement/expression: });
    });

    // JavaScript statement/expression: $('#checkout-email').addEventListener('click', (e) => {
    $('#checkout-email').addEventListener('click', (e) => {
      // JavaScript statement/expression: e.preventDefault();
      e.preventDefault();
      // JavaScript statement/expression: if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      // JavaScript statement/expression: const subject = encodeURIComponent('Campus-Cart order — ' + state.cart.length + ' item(s)');
      const subject = encodeURIComponent('Campus-Cart order — ' + state.cart.length + ' item(s)');
      // JavaScript statement/expression: window.location.href = 'mailto:orders@campus-cart.co.za?subject=' + subject + '&body=' + encodeURIComponent(bu
      window.location.href = 'mailto:orders@campus-cart.co.za?subject=' + subject + '&body=' + encodeURIComponent(buildOrderMessage());
    // JavaScript statement/expression: });
    });

    // JavaScript statement/expression: const eftDetails = $('#eft-details');
    const eftDetails = $('#eft-details');
    // JavaScript statement/expression: const eftBtn = $('#checkout-eft');
    const eftBtn = $('#checkout-eft');
    // JavaScript statement/expression: eftBtn.addEventListener('click', () => {
    eftBtn.addEventListener('click', () => {
      // JavaScript statement/expression: const wasHidden = eftDetails.classList.contains('hidden');
      const wasHidden = eftDetails.classList.contains('hidden');
      // JavaScript statement/expression: eftDetails.classList.toggle('hidden', !wasHidden);
      eftDetails.classList.toggle('hidden', !wasHidden);
      // JavaScript statement/expression: eftBtn.textContent = wasHidden ? 'Hide EFT instructions' : 'Show EFT instructions';
      eftBtn.textContent = wasHidden ? 'Hide EFT instructions' : 'Show EFT instructions';
    // JavaScript statement/expression: });
    });

    // Student / Parent path: scroll to it when the link carries #student or #parent
    // JavaScript statement/expression: const hash = window.location.hash;
    const hash = window.location.hash;
    // JavaScript statement/expression: if (hash === '#parent' || hash === '#student') {
    if (hash === '#parent' || hash === '#student') {
      // JavaScript statement/expression: const target = $(hash);
      const target = $(hash);
      // JavaScript statement/expression: if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 120);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 120);
    // JavaScript statement/expression: }
    }

    // JavaScript statement/expression: renderOrder();
    renderOrder();
  // JavaScript statement/expression: }
  }

  /* ===== 3. Products page ===== */
  // ----- Tabs: bind each tab group to its own page section ----- 
  // JavaScript statement/expression: function bindTabs(sectionSelector) {
  function bindTabs(sectionSelector) {
    // JavaScript statement/expression: const section = $(sectionSelector);
    const section = $(sectionSelector);
    // JavaScript statement/expression: if (!section) return;
    if (!section) return;
    // JavaScript statement/expression: const tablist = section.querySelector('[role="tablist"]');
    const tablist = section.querySelector('[role="tablist"]');
    // JavaScript statement/expression: if (!tablist) return;
    if (!tablist) return;
    // JavaScript statement/expression: const tabs = Array.from(tablist.querySelectorAll('[role="tab"][data-panel]'));
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"][data-panel]'));
    // JavaScript statement/expression: const panels = Array.from(section.querySelectorAll('[role="tabpanel"]'));
    const panels = Array.from(section.querySelectorAll('[role="tabpanel"]'));

    // JavaScript statement/expression: const activateTab = (tab) => {
    const activateTab = (tab) => {
      // JavaScript statement/expression: const panelId = tab.dataset.panel;
      const panelId = tab.dataset.panel;
      // JavaScript statement/expression: const targetPanel = panels.find((panel) => panel.id === panelId);
      const targetPanel = panels.find((panel) => panel.id === panelId);
      // JavaScript statement/expression: if (!targetPanel) return;
      if (!targetPanel) return;

      // JavaScript statement/expression: tabs.forEach((item) => {
      tabs.forEach((item) => {
        // JavaScript statement/expression: const active = item === tab;
        const active = item === tab;
        // JavaScript statement/expression: item.setAttribute('aria-selected', String(active));
        item.setAttribute('aria-selected', String(active));
        // JavaScript statement/expression: item.tabIndex = active ? 0 : -1;
        item.tabIndex = active ? 0 : -1;
        // JavaScript statement/expression: item.className = active
        item.className = active
          // JavaScript statement/expression: ? 'tab-btn rounded-full bg-[#0d1b3e] px-6 py-2.5 text-sm font-bold text-white'
          ? 'tab-btn rounded-full bg-[#0d1b3e] px-6 py-2.5 text-sm font-bold text-white'
          // JavaScript statement/expression: : 'tab-btn rounded-full px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
          : 'tab-btn rounded-full px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
      // JavaScript statement/expression: });
      });

      // JavaScript statement/expression: panels.forEach((panel) => {
      panels.forEach((panel) => {
        // JavaScript statement/expression: const active = panel === targetPanel;
        const active = panel === targetPanel;
        // JavaScript statement/expression: panel.classList.toggle('hidden', !active);
        panel.classList.toggle('hidden', !active);
        // JavaScript statement/expression: panel.classList.toggle('is-active', active);
        panel.classList.toggle('is-active', active);
        // JavaScript statement/expression: panel.setAttribute('aria-hidden', String(!active));
        panel.setAttribute('aria-hidden', String(!active));
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: };
    };

    // JavaScript statement/expression: tabs.forEach((tab) => {
    tabs.forEach((tab) => {
      // JavaScript statement/expression: tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('click', () => activateTab(tab));
      // JavaScript statement/expression: tab.addEventListener('keydown', (event) => {
      tab.addEventListener('keydown', (event) => {
        // JavaScript statement/expression: if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        // JavaScript statement/expression: event.preventDefault();
        event.preventDefault();
        // JavaScript statement/expression: const current = tabs.indexOf(tab);
        const current = tabs.indexOf(tab);
        // JavaScript statement/expression: const direction = event.key === 'ArrowRight' ? 1 : -1;
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        // JavaScript statement/expression: const next = tabs[(current + direction + tabs.length) % tabs.length];
        const next = tabs[(current + direction + tabs.length) % tabs.length];
        // JavaScript statement/expression: activateTab(next);
        activateTab(next);
        // JavaScript statement/expression: next.focus();
        next.focus();
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: });
    });

    // JavaScript statement/expression: const initiallySelected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    const initiallySelected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    // JavaScript statement/expression: if (initiallySelected) activateTab(initiallySelected);
    if (initiallySelected) activateTab(initiallySelected);
  // JavaScript statement/expression: }
  }

  // JavaScript statement/expression: bindTabs('#shop');
  bindTabs('#shop');
  // JavaScript statement/expression: bindTabs('#sell-with-us');
  bindTabs('#sell-with-us');

  // ----- Product cards and Deals: search, category, condition and sorting -----
  // JavaScript statement/expression: const dealsResults = $('#deals-results');
  const dealsResults = $('#deals-results');
  // JavaScript statement/expression: const catalogue = window.CC_CATALOGUE;
  const catalogue = window.CC_CATALOGUE;
  // JavaScript statement/expression: if (dealsResults && catalogue && Array.isArray(catalogue.DEALS)) {
  if (dealsResults && catalogue && Array.isArray(catalogue.DEALS)) {
    // JavaScript statement/expression: const DEALS = catalogue.DEALS;
    const DEALS = catalogue.DEALS;
    // JavaScript statement/expression: const BASE = catalogue.BASE || '../assets/';
    const BASE = catalogue.BASE || '../assets/';
    // JavaScript statement/expression: const dealsCount = $('#deals-count');
    const dealsCount = $('#deals-count');
    // JavaScript statement/expression: const searchInput = $('#product-search');
    const searchInput = $('#product-search');
    // JavaScript statement/expression: const categorySelect = $('#filter-category');
    const categorySelect = $('#filter-category');
    // JavaScript statement/expression: const conditionSelect = $('#filter-condition');
    const conditionSelect = $('#filter-condition');
    // JavaScript statement/expression: const sortSelect = $('#sort-by');
    const sortSelect = $('#sort-by');
    // JavaScript statement/expression: const seeMore = $('#deals-see-more');
    const seeMore = $('#deals-see-more');
    // JavaScript statement/expression: const seeLess = $('#deals-see-less');
    const seeLess = $('#deals-see-less');
    // JavaScript statement/expression: const STEP = 6;
    const STEP = 6;
    // JavaScript statement/expression: let visibleCount = STEP;
    let visibleCount = STEP;

    // JavaScript statement/expression: const card = (product) =>
    const card = (product) =>
      // JavaScript statement/expression: '<article class="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-4 transition dura
      '<article class="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">' +
      // JavaScript statement/expression: '  <div class="relative overflow-hidden rounded-2xl bg-slate-100">' +
      '  <div class="relative overflow-hidden rounded-2xl bg-slate-100">' +
      // JavaScript statement/expression: '    <img src="' + BASE + esc(product.img) + '" width="800" height="800" alt="' + esc(product.alt || product.n
      '    <img src="' + BASE + esc(product.img) + '" width="800" height="800" alt="' + esc(product.alt || product.name) + '" loading="lazy" class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105">' +
      // JavaScript statement/expression: '    <span class="absolute left-3 top-3 rounded-full ' + (product.condition === 'new' ? 'bg-[#0d1b3e] text-[#f
      '    <span class="absolute left-3 top-3 rounded-full ' + (product.condition === 'new' ? 'bg-[#0d1b3e] text-[#ffd23f]' : 'bg-[#c2572f] text-white') + ' px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider">' + (product.condition === 'new' ? 'New' : 'Second-hand') + '</span>' +
      // JavaScript statement/expression: '  </div>' +
      '  </div>' +
      // JavaScript statement/expression: '  <div class="mt-4 flex flex-1 flex-col">' +
      '  <div class="mt-4 flex flex-1 flex-col">' +
      // JavaScript statement/expression: '    <div class="flex items-center justify-between gap-2"><h3 class="text-sm font-bold text-[#0d1b3e]">' + esc
      '    <div class="flex items-center justify-between gap-2"><h3 class="text-sm font-bold text-[#0d1b3e]">' + esc(product.name) + '</h3><span class="shrink-0 text-sm font-extrabold text-[#0d1b3e]">' + formatRand(product.price) + '</span></div>' +
      // JavaScript statement/expression: '    <p class="mt-1 text-xs text-slate-500">' + esc(product.desc) + '</p>' +
      '    <p class="mt-1 text-xs text-slate-500">' + esc(product.desc) + '</p>' +
      // JavaScript statement/expression: '    <div class="mt-4 flex flex-wrap items-center gap-2">' +
      '    <div class="mt-4 flex flex-wrap items-center gap-2">' +
      // JavaScript statement/expression: '      <button type="button" data-add="' + esc(product.name) + '" data-price="' + Number(product.price) + '" a
      '      <button type="button" data-add="' + esc(product.name) + '" data-price="' + Number(product.price) + '" aria-label="Add ' + esc(product.name) + ' to order summary" class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#0d1b3e] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1c3268]"><img src="https://unpkg.com/lucide-static@1.44.0/icons/shopping-cart.svg" alt="" aria-hidden="true" class="h-4 w-4">Add to Order Summary</button>' +
      // JavaScript statement/expression: '      <button type="button" data-add-to-wishlist data-name="' + esc(product.name) + '" data-price="' + Number
      '      <button type="button" data-add-to-wishlist data-name="' + esc(product.name) + '" data-price="' + Number(product.price) + '" aria-label="Add ' + esc(product.name) + ' to wishlist" aria-pressed="false" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0d1b3e]/25 bg-white text-xl text-[#0d1b3e] transition hover:border-[#0d1b3e] hover:bg-[#ffd23f]" ><span data-wishlist-icon aria-hidden="true">♡</span></button>' +
      // JavaScript statement/expression: '      <button type="button" data-quickview data-name="' + esc(product.name) + '" data-price="' + Number(produ
      '      <button type="button" data-quickview data-name="' + esc(product.name) + '" data-price="' + Number(product.price) + '" data-condition="' + esc(product.condition) + '" data-img="' + BASE + esc(product.img) + '" data-alt="' + esc(product.alt || product.name) + '" data-desc="' + esc(product.desc) + '" aria-label="View details for ' + esc(product.name) + '" class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-[#0d1b3e] transition hover:border-[#0d1b3e]"><img src="https://unpkg.com/lucide-static@1.44.0/icons/microscope.svg" alt="" aria-hidden="true" class="h-4 w-4">Quick view</button>' +
      // JavaScript statement/expression: '    </div>' +
      '    </div>' +
      // JavaScript statement/expression: '  </div>' +
      '  </div>' +
      // JavaScript statement/expression: '</article>';
      '</article>';

    // Populate both shop tabs from the same catalogue used by Deals.
    // This prevents the Second-Hand tab from showing only explanatory content.
    // JavaScript statement/expression: const newGrid = $('#panel-new > .grid');
    const newGrid = $('#panel-new > .grid');
    // JavaScript statement/expression: const usedGrid = $('#panel-used .mt-8.grid');
    const usedGrid = $('#panel-used .mt-8.grid');
    // JavaScript statement/expression: if (newGrid) {
    if (newGrid) {
      // JavaScript statement/expression: const newProducts = DEALS.filter((product) => product.condition === 'new').slice(0, 10);
      const newProducts = DEALS.filter((product) => product.condition === 'new').slice(0, 10);
      // JavaScript statement/expression: newGrid.classList.add('cc-shop-new-marquee');
      newGrid.classList.add('cc-shop-new-marquee');
      // JavaScript statement/expression: newGrid.setAttribute('tabindex', '0');
      newGrid.setAttribute('tabindex', '0');
      // JavaScript statement/expression: newGrid.setAttribute('aria-label', 'Shop New products. Scroll horizontally to browse up to ten products.');
      newGrid.setAttribute('aria-label', 'Shop New products. Scroll horizontally to browse up to ten products.');
      // JavaScript statement/expression: newGrid.innerHTML = newProducts.length
      newGrid.innerHTML = newProducts.length
        // JavaScript statement/expression: ? newProducts.map(card).join('')
        ? newProducts.map(card).join('')
        // JavaScript statement/expression: : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No new products are currently list
        : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No new products are currently listed.</p>';
    // JavaScript statement/expression: }
    }
    // JavaScript statement/expression: if (usedGrid) {
    if (usedGrid) {
      // JavaScript statement/expression: const usedProducts = DEALS.filter((product) => product.condition === 'used');
      const usedProducts = DEALS.filter((product) => product.condition === 'used');
      // JavaScript statement/expression: usedGrid.innerHTML = usedProducts.length
      usedGrid.innerHTML = usedProducts.length
        // JavaScript statement/expression: ? usedProducts.map(card).join('')
        ? usedProducts.map(card).join('')
        // JavaScript statement/expression: : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No second-hand products are curren
        : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No second-hand products are currently listed.</p>';
    // JavaScript statement/expression: }
    }
    // Apply saved wishlist state to cards that were just rendered.
    // JavaScript statement/expression: CC.updateWishlistBadge();
    CC.updateWishlistBadge();

    // Give Shop New and Second-Hand the same manually controlled horizontal carousel.
    // JavaScript statement/expression: const setupShopCarousel = (grid, label) => {
    const setupShopCarousel = (grid, label) => {
      // JavaScript statement/expression: if (!grid) return;
      if (!grid) return;

      // JavaScript statement/expression: grid.classList.add('cc-shop-carousel');
      grid.classList.add('cc-shop-carousel');
      // JavaScript statement/expression: grid.setAttribute('tabindex', '0');
      grid.setAttribute('tabindex', '0');
      // JavaScript statement/expression: grid.setAttribute('aria-label', label + ' products. Use the arrow buttons or horizontal scrolling to browse.')
      grid.setAttribute('aria-label', label + ' products. Use the arrow buttons or horizontal scrolling to browse.');

      // JavaScript statement/expression: const controls = document.createElement('div');
      const controls = document.createElement('div');
      // JavaScript statement/expression: controls.className = 'cc-shop-carousel-controls';
      controls.className = 'cc-shop-carousel-controls';
      // JavaScript statement/expression: controls.setAttribute('role', 'group');
      controls.setAttribute('role', 'group');
      // JavaScript statement/expression: controls.setAttribute('aria-label', label + ' carousel controls');
      controls.setAttribute('aria-label', label + ' carousel controls');

      // JavaScript statement/expression: const makeArrow = (direction, icon, accessibleLabel) => {
      const makeArrow = (direction, icon, accessibleLabel) => {
        // JavaScript statement/expression: const button = document.createElement('button');
        const button = document.createElement('button');
        // JavaScript statement/expression: button.type = 'button';
        button.type = 'button';
        // JavaScript statement/expression: button.className = 'cc-shop-carousel-arrow';
        button.className = 'cc-shop-carousel-arrow';
        // JavaScript statement/expression: button.setAttribute('aria-label', accessibleLabel);
        button.setAttribute('aria-label', accessibleLabel);
        // JavaScript statement/expression: button.innerHTML = '<img src="https://unpkg.com/lucide-static@1.44.0/icons/' + icon + '.svg" alt="" aria-hidde
        button.innerHTML = '<img src="https://unpkg.com/lucide-static@1.44.0/icons/' + icon + '.svg" alt="" aria-hidden="true">';
        // JavaScript statement/expression: button.addEventListener('click', () => {
        button.addEventListener('click', () => {
          // JavaScript statement/expression: const firstCard = grid.querySelector('article');
          const firstCard = grid.querySelector('article');
          // JavaScript statement/expression: const distance = firstCard ? firstCard.getBoundingClientRect().width + 16 : grid.clientWidth * 0.8;
          const distance = firstCard ? firstCard.getBoundingClientRect().width + 16 : grid.clientWidth * 0.8;
          // JavaScript statement/expression: grid.scrollBy({ left: direction * distance, behavior: 'smooth' });
          grid.scrollBy({ left: direction * distance, behavior: 'smooth' });
        // JavaScript statement/expression: });
        });
        // JavaScript statement/expression: return button;
        return button;
      // JavaScript statement/expression: };
      };

      // JavaScript statement/expression: controls.append(
      controls.append(
        // JavaScript statement/expression: makeArrow(-1, 'chevron-left', 'Scroll ' + label + ' products left'),
        makeArrow(-1, 'chevron-left', 'Scroll ' + label + ' products left'),
        // JavaScript statement/expression: makeArrow(1, 'chevron-right', 'Scroll ' + label + ' products right')
        makeArrow(1, 'chevron-right', 'Scroll ' + label + ' products right')
      // JavaScript statement/expression: );
      );
      // JavaScript statement/expression: grid.insertAdjacentElement('beforebegin', controls);
      grid.insertAdjacentElement('beforebegin', controls);
    // JavaScript statement/expression: };
    };

    // JavaScript statement/expression: setupShopCarousel(newGrid, 'Shop New');
    setupShopCarousel(newGrid, 'Shop New');
    // JavaScript statement/expression: setupShopCarousel(usedGrid, 'Second-Hand Marketplace');
    setupShopCarousel(usedGrid, 'Second-Hand Marketplace');

    // Build category options from the catalogue so every category can be selected.
    // JavaScript statement/expression: if (categorySelect) {
    if (categorySelect) {
      // JavaScript statement/expression: const selectedCategory = categorySelect.value || 'all';
      const selectedCategory = categorySelect.value || 'all';
      // JavaScript statement/expression: const categories = [...new Set(DEALS.map((product) => product.category).filter(Boolean))].sort();
      const categories = [...new Set(DEALS.map((product) => product.category).filter(Boolean))].sort();
      // JavaScript statement/expression: const labels = {
      const labels = {
        // JavaScript statement/expression: bundles: 'Bundles',
        bundles: 'Bundles',
        // JavaScript statement/expression: appliances: 'Appliances',
        appliances: 'Appliances',
        // JavaScript statement/expression: furniture: 'Furniture',
        furniture: 'Furniture',
        // JavaScript statement/expression: bedding: 'Bedding',
        bedding: 'Bedding',
        // JavaScript statement/expression: textbooks: 'Textbooks',
        textbooks: 'Textbooks',
        // JavaScript statement/expression: stationery: 'Stationery'
        stationery: 'Stationery'
      // JavaScript statement/expression: };
      };
      // JavaScript statement/expression: categorySelect.innerHTML = '<option value="all">All categories</option>' +
      categorySelect.innerHTML = '<option value="all">All categories</option>' +
        // JavaScript statement/expression: categories.map((category) => '<option value="' + esc(category) + '">' + esc(labels[category] || category.repla
        categories.map((category) => '<option value="' + esc(category) + '">' + esc(labels[category] || category.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())) + '</option>').join('');
      // JavaScript statement/expression: categorySelect.value = categories.includes(selectedCategory) ? selectedCategory : 'all';
      categorySelect.value = categories.includes(selectedCategory) ? selectedCategory : 'all';
    // JavaScript statement/expression: }
    }

    // JavaScript statement/expression: const renderDeals = () => {
    const renderDeals = () => {
      // JavaScript statement/expression: const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      // JavaScript statement/expression: const category = categorySelect ? categorySelect.value : 'all';
      const category = categorySelect ? categorySelect.value : 'all';
      // JavaScript statement/expression: const condition = conditionSelect ? conditionSelect.value : 'all';
      const condition = conditionSelect ? conditionSelect.value : 'all';
      // JavaScript statement/expression: const sort = sortSelect ? sortSelect.value : 'default';
      const sort = sortSelect ? sortSelect.value : 'default';

      // JavaScript statement/expression: const items = DEALS.filter((product) => {
      const items = DEALS.filter((product) => {
        // JavaScript statement/expression: const searchable = [product.name, product.category, product.desc, product.condition].join(' ').toLowerCase();
        const searchable = [product.name, product.category, product.desc, product.condition].join(' ').toLowerCase();
        // JavaScript statement/expression: return (!q || searchable.includes(q)) &&
        return (!q || searchable.includes(q)) &&
          // JavaScript statement/expression: (category === 'all' || product.category === category) &&
          (category === 'all' || product.category === category) &&
          // JavaScript statement/expression: (condition === 'all' || product.condition === condition);
          (condition === 'all' || product.condition === condition);
      // JavaScript statement/expression: });
      });

      // JavaScript statement/expression: if (sort === 'price-asc') items.sort((a, b) => Number(a.price) - Number(b.price));
      if (sort === 'price-asc') items.sort((a, b) => Number(a.price) - Number(b.price));
      // JavaScript statement/expression: else if (sort === 'price-desc') items.sort((a, b) => Number(b.price) - Number(a.price));
      else if (sort === 'price-desc') items.sort((a, b) => Number(b.price) - Number(a.price));
      // JavaScript statement/expression: else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
      else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));

      // JavaScript statement/expression: if (dealsCount) dealsCount.textContent = items.length + (items.length === 1 ? ' product found' : ' products fo
      if (dealsCount) dealsCount.textContent = items.length + (items.length === 1 ? ' product found' : ' products found');
      // JavaScript statement/expression: dealsResults.innerHTML = items.length
      dealsResults.innerHTML = items.length
        // JavaScript statement/expression: ? items.slice(0, visibleCount).map(card).join('')
        ? items.slice(0, visibleCount).map(card).join('')
        // JavaScript statement/expression: : '<div class="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 
        : '<div class="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 class="font-bold text-[#0d1b3e]">No matches</h3><p class="mt-1 text-sm text-slate-500">Try a different keyword, category or condition.</p></div>';
      // JavaScript statement/expression: CC.updateWishlistBadge();
      CC.updateWishlistBadge();

      // JavaScript statement/expression: if (seeMore) seeMore.hidden = items.length <= visibleCount;
      if (seeMore) seeMore.hidden = items.length <= visibleCount;
      // JavaScript statement/expression: if (seeLess) seeLess.hidden = visibleCount <= STEP || items.length <= STEP;
      if (seeLess) seeLess.hidden = visibleCount <= STEP || items.length <= STEP;
    // JavaScript statement/expression: };
    };

    // JavaScript statement/expression: if (searchInput) searchInput.addEventListener('input', () => { visibleCount = STEP; renderDeals(); });
    if (searchInput) searchInput.addEventListener('input', () => { visibleCount = STEP; renderDeals(); });
    // JavaScript statement/expression: if (categorySelect) categorySelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    if (categorySelect) categorySelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    // JavaScript statement/expression: if (conditionSelect) conditionSelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); })
    if (conditionSelect) conditionSelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    // JavaScript statement/expression: if (sortSelect) sortSelect.addEventListener('change', renderDeals);
    if (sortSelect) sortSelect.addEventListener('change', renderDeals);
    // JavaScript statement/expression: if (seeMore) seeMore.addEventListener('click', () => { visibleCount += STEP; renderDeals(); });
    if (seeMore) seeMore.addEventListener('click', () => { visibleCount += STEP; renderDeals(); });
    // JavaScript statement/expression: if (seeLess) seeLess.addEventListener('click', () => {
    if (seeLess) seeLess.addEventListener('click', () => {
      // JavaScript statement/expression: visibleCount = STEP;
      visibleCount = STEP;
      // JavaScript statement/expression: renderDeals();
      renderDeals();
      // JavaScript statement/expression: dealsResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
      dealsResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // JavaScript statement/expression: });
    });
    // JavaScript statement/expression: renderDeals();
    renderDeals();

    // Header search icon jumps to the actual product search field.
    // JavaScript statement/expression: const searchFocus = $('#searchFocus');
    const searchFocus = $('#searchFocus');
    // JavaScript statement/expression: if (searchFocus && searchInput) {
    if (searchFocus && searchInput) {
      // JavaScript statement/expression: searchFocus.addEventListener('click', () => {
      searchFocus.addEventListener('click', () => {
        // JavaScript statement/expression: const section = $('#deals-gallery');
        const section = $('#deals-gallery');
        // JavaScript statement/expression: if (section) section.scrollIntoView({ behavior: 'smooth' });
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        // JavaScript statement/expression: setTimeout(() => searchInput.focus(), 600);
        setTimeout(() => searchInput.focus(), 600);
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: }
    }

    // ----- Product detail picker -----
    // JavaScript statement/expression: const detailSelect = $('#detail-select');
    const detailSelect = $('#detail-select');
    // JavaScript statement/expression: if (detailSelect) {
    if (detailSelect) {
      // JavaScript statement/expression: DEALS.forEach((d, i) => {
      DEALS.forEach((d, i) => {
        // JavaScript statement/expression: const opt = document.createElement('option');
        const opt = document.createElement('option');
        // JavaScript statement/expression: opt.value = String(i);
        opt.value = String(i);
        // JavaScript statement/expression: opt.textContent = d.name + ' — ' + formatRand(d.price);
        opt.textContent = d.name + ' — ' + formatRand(d.price);
        // JavaScript statement/expression: detailSelect.appendChild(opt);
        detailSelect.appendChild(opt);
      // JavaScript statement/expression: });
      });
      // JavaScript statement/expression: const renderDetail = (index) => {
      const renderDetail = (index) => {
        // JavaScript statement/expression: const d = DEALS[index] || DEALS[0];
        const d = DEALS[index] || DEALS[0];
        // JavaScript statement/expression: const img = $('#detail-img');
        const img = $('#detail-img');
        // JavaScript statement/expression: img.src = BASE + d.img;
        img.src = BASE + d.img;
        // JavaScript statement/expression: img.alt = d.alt || d.name;
        img.alt = d.alt || d.name;
        // JavaScript statement/expression: $('#detail-name').textContent = d.name;
        $('#detail-name').textContent = d.name;
        // JavaScript statement/expression: $('#detail-price').textContent = formatRand(d.price);
        $('#detail-price').textContent = formatRand(d.price);
        // JavaScript statement/expression: $('#detail-desc').textContent = d.desc;
        $('#detail-desc').textContent = d.desc;
        // JavaScript statement/expression: const label = $('#detail-condition');
        const label = $('#detail-condition');
        // JavaScript statement/expression: label.textContent = d.condition === 'new' ? 'Brand new' : 'Second-hand · verified';
        label.textContent = d.condition === 'new' ? 'Brand new' : 'Second-hand · verified';
        // JavaScript statement/expression: label.className = d.condition === 'new'
        label.className = d.condition === 'new'
          // JavaScript statement/expression: ? 'rounded-full bg-[#ffe9a8] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#7a5800]'
          ? 'rounded-full bg-[#ffe9a8] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#7a5800]'
          // JavaScript statement/expression: : 'rounded-full bg-[#c2572f]/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#c2572f]';
          : 'rounded-full bg-[#c2572f]/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#c2572f]';
        // JavaScript statement/expression: const addBtn = $('#detail-add');
        const addBtn = $('#detail-add');
        // JavaScript statement/expression: addBtn.dataset.add = d.name;
        addBtn.dataset.add = d.name;
        // JavaScript statement/expression: addBtn.dataset.price = String(d.price);
        addBtn.dataset.price = String(d.price);
      // JavaScript statement/expression: };
      };
      // JavaScript statement/expression: detailSelect.addEventListener('change', () => renderDetail(Number(detailSelect.value)));
      detailSelect.addEventListener('change', () => renderDetail(Number(detailSelect.value)));
      // JavaScript statement/expression: renderDetail(0);
      renderDetail(0);
    // JavaScript statement/expression: }
    }
  // JavaScript statement/expression: }
  }

  // ----- Gallery filter -----
  // JavaScript statement/expression: const galleryFilters = $$('.gallery-filter');
  const galleryFilters = $$('.gallery-filter');
  // JavaScript statement/expression: galleryFilters.forEach((btn) => {
  galleryFilters.forEach((btn) => {
    // JavaScript statement/expression: btn.addEventListener('click', () => {
    btn.addEventListener('click', () => {
      // JavaScript statement/expression: const filter = btn.dataset.galleryFilter;
      const filter = btn.dataset.galleryFilter;
      // JavaScript statement/expression: galleryFilters.forEach((b) => {
      galleryFilters.forEach((b) => {
        // JavaScript statement/expression: const active = b === btn;
        const active = b === btn;
        // JavaScript statement/expression: b.className = active
        b.className = active
          // JavaScript statement/expression: ? 'gallery-filter rounded-full bg-[#0d1b3e] px-5 py-2 text-sm font-bold text-white'
          ? 'gallery-filter rounded-full bg-[#0d1b3e] px-5 py-2 text-sm font-bold text-white'
          // JavaScript statement/expression: : 'gallery-filter rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
          : 'gallery-filter rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
      // JavaScript statement/expression: });
      });
      // JavaScript statement/expression: $$('[data-gallery-item]').forEach((fig) => {
      $$('[data-gallery-item]').forEach((fig) => {
        // JavaScript statement/expression: fig.classList.toggle('hidden', !(filter === 'all' || fig.dataset.galleryItem === filter));
        fig.classList.toggle('hidden', !(filter === 'all' || fig.dataset.galleryItem === filter));
      // JavaScript statement/expression: });
      });
    // JavaScript statement/expression: });
    });
  // JavaScript statement/expression: });
  });

  // ----- Print checklist -----
  // JavaScript statement/expression: const printBtn = $('#print-checklist');
  const printBtn = $('#print-checklist');
  // JavaScript statement/expression: if (printBtn) printBtn.addEventListener('click', () => window.print());
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  /* ===== 4. Coverage search ===== */
  // JavaScript statement/expression: const searchInput = $('#coverage-search');
  const searchInput = $('#coverage-search');
  // JavaScript statement/expression: if (searchInput) {
  if (searchInput) {
    // JavaScript statement/expression: const countEl = $('#coverage-count');
    const countEl = $('#coverage-count');
    // JavaScript statement/expression: const allInstitutions = $$('.inst');
    const allInstitutions = $$('.inst');
    // JavaScript statement/expression: const allProvinces = $$('.province');
    const allProvinces = $$('.province');

    // JavaScript statement/expression: const updateSearch = () => {
    const updateSearch = () => {
      // JavaScript statement/expression: const term = (searchInput.value || '').trim().toLowerCase();
      const term = (searchInput.value || '').trim().toLowerCase();
      // JavaScript statement/expression: let visibleCount = 0;
      let visibleCount = 0;
      // JavaScript statement/expression: allInstitutions.forEach((li) => {
      allInstitutions.forEach((li) => {
        // JavaScript statement/expression: const name = (li.getAttribute('data-name') || '').toLowerCase();
        const name = (li.getAttribute('data-name') || '').toLowerCase();
        // JavaScript statement/expression: const matched = !term || name.includes(term);
        const matched = !term || name.includes(term);
        // JavaScript statement/expression: li.classList.toggle('hidden', !matched);
        li.classList.toggle('hidden', !matched);
        // JavaScript statement/expression: if (matched) visibleCount += 1;
        if (matched) visibleCount += 1;
      // JavaScript statement/expression: });
      });
      // JavaScript statement/expression: allProvinces.forEach((sec) => {
      allProvinces.forEach((sec) => {
        // JavaScript statement/expression: sec.classList.toggle('hidden', sec.querySelectorAll('.inst:not(.hidden)').length === 0);
        sec.classList.toggle('hidden', sec.querySelectorAll('.inst:not(.hidden)').length === 0);
      // JavaScript statement/expression: });
      });
      // JavaScript statement/expression: if (term) {
      if (term) {
        // JavaScript statement/expression: countEl.textContent = visibleCount === 1
        countEl.textContent = visibleCount === 1
          // JavaScript statement/expression: ? '1 institution matches "' + searchInput.value.trim() + '".'
          ? '1 institution matches "' + searchInput.value.trim() + '".'
          // JavaScript statement/expression: : visibleCount + ' institutions match "' + searchInput.value.trim() + '".';
          : visibleCount + ' institutions match "' + searchInput.value.trim() + '".';
      // JavaScript statement/expression: } else {
      } else {
        // JavaScript statement/expression: countEl.textContent = allInstitutions.length + ' institutions listed across 9 provinces.';
        countEl.textContent = allInstitutions.length + ' institutions listed across 9 provinces.';
      // JavaScript statement/expression: }
      }
    // JavaScript statement/expression: };
    };
    // JavaScript statement/expression: searchInput.addEventListener('input', updateSearch);
    searchInput.addEventListener('input', updateSearch);
    // JavaScript statement/expression: updateSearch();
    updateSearch();
  // JavaScript statement/expression: }
  }
// JavaScript statement/expression: })();
})();

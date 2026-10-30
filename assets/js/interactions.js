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
// ==========================================================

(function () {
  'use strict';

  const CC = window.CC;
  const $ = CC.$;
  const $$ = CC.$$;
  const formatRand = CC.formatRand;
  const state = CC.state;
  const showSnack = CC.showSnack;
  const ICON = 'https://unpkg.com/lucide-static@1.44.0/icons/';

  const esc = (text) => String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ===== 1. Cart drawer (home page) ===== */
  const cartDrawer = $('#cartDrawer');
  const cartButton = $('#cartButton');
  const cartItemsEl = $('#cartItems');
  const cartTotalEl = $('#cartTotal');

  function renderCart() {
    if (!cartItemsEl) return;
    const cart = state.cart;
    if (!cart.length) {
      cartItemsEl.innerHTML =
        '<div class="flex h-full flex-col items-center justify-center text-center">' +
        '  <img src="' + ICON + 'shopping-bag.svg" alt="" class="h-10 w-10 text-slate-300">' +
        '  <p class="mt-4 text-sm font-semibold text-[#0d1b3e]">Your cart is empty</p>' +
        '  <p class="mt-1 text-xs text-slate-500">Add a bundle or a second-hand pick.</p>' +
        '</div>';
      if (cartTotalEl) cartTotalEl.textContent = 'R0';
      return;
    }
    cartItemsEl.innerHTML = cart.map((item, index) =>
      '<div class="flex items-center gap-3 border-b border-slate-100 py-3">' +
      '  <div class="flex-1">' +
      '    <p class="text-sm font-bold text-[#0d1b3e]">' + esc(item.name) + '</p>' +
      '    <p class="mt-0.5 text-xs text-slate-500">Qty ' + item.qty + ' × ' + formatRand(item.price) + '</p>' +
      '  </div>' +
      '  <p class="text-sm font-extrabold text-[#0d1b3e]">' + formatRand(item.price * item.qty) + '</p>' +
      '  <button type="button" data-remove="' + index + '" class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:border-red-300 hover:text-red-600" aria-label="Remove ' + esc(item.name) + '">' +
      '    <img src="' + ICON + 'x.svg" alt="" class="h-3.5 w-3.5">' +
      '  </button>' +
      '</div>'
    ).join('');
    if (cartTotalEl) cartTotalEl.textContent = formatRand(CC.cartTotal());
  }

  function openCart() { cartDrawer.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function closeCart() { cartDrawer.classList.add('hidden'); document.body.style.overflow = ''; }

  if (cartDrawer) {
    if (cartItemsEl) {
      cartItemsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-remove]');
        if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
      });
    }
    if (cartButton) cartButton.addEventListener('click', openCart);
    $$('[data-cart-close]').forEach((el) => el.addEventListener('click', closeCart));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !cartDrawer.classList.contains('hidden')) closeCart();
    });
    document.addEventListener('cc-cart-change', renderCart);
    renderCart();
  }

  /* ===== Add-to-cart buttons (event delegation, works for cards drawn later too) ===== */
  document.addEventListener('click', (e) => {
    const drawerBtn = e.target.closest('[data-add-to-cart]');
    if (drawerBtn) { CC.addToCart(drawerBtn.dataset.name, drawerBtn.dataset.price); return; }
    const orderBtn = e.target.closest('[data-add]');
    if (orderBtn) {
      CC.addToCart(orderBtn.dataset.add, orderBtn.dataset.price);
      showSnack('Added "' + orderBtn.dataset.add + '" to your order summary.');
    }
  });

  /* ===== 2. Account page: order summary ===== */
  const orderBody = $('#order-body');
  if (orderBody) {
    const orderEmpty = $('#order-empty');
    const orderWrap = $('#order-table-wrap');
    const orderTotal = $('#order-total');

    const renderOrder = () => {
      const cart = state.cart;
      CC.updateBadge();
      if (!cart.length) {
        orderEmpty.classList.remove('hidden');
        orderWrap.classList.add('hidden');
        return;
      }
      orderEmpty.classList.add('hidden');
      orderWrap.classList.remove('hidden');
      orderBody.innerHTML = cart.map((item, index) =>
        '<tr>' +
        '  <td class="px-5 py-4 font-semibold text-[#0d1b3e]">' + esc(item.name) + '</td>' +
        '  <td class="px-5 py-4 text-slate-500">' + formatRand(item.price) + '</td>' +
        '  <td class="px-5 py-4 text-slate-600">' + item.qty + '</td>' +
        '  <td class="px-5 py-4 font-bold text-[#0d1b3e]">' + formatRand(item.price * item.qty) + '</td>' +
        '  <td class="px-5 py-4 text-right">' +
        '    <button type="button" data-remove="' + index + '" class="inline-grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:border-red-300 hover:text-red-600" aria-label="Remove ' + esc(item.name) + '">' +
        '      <img src="' + ICON + 'x.svg" alt="" class="h-3.5 w-3.5">' +
        '    </button>' +
        '  </td>' +
        '</tr>'
      ).join('');
      orderTotal.textContent = formatRand(CC.cartTotal());
    };

    orderBody.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove]');
      if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
    });
    document.addEventListener('cc-cart-change', renderOrder);

    $('#order-clear').addEventListener('click', () => {
      state.cart = [];
      CC.changeCart();
      showSnack('Order summary cleared.');
    });

    // Header cart button scrolls to the order summary
    if (cartButton) cartButton.addEventListener('click', () => $('#order').scrollIntoView({ behavior: 'smooth', block: 'start' }));

    $('#skip-to-address').addEventListener('click', () => {
      $('#step-address').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Delivery method hint
    const deliveryMethod = $('#delivery-method');
    const deliveryHint = $('#delivery-hint');
    deliveryMethod.addEventListener('change', () => {
      deliveryHint.textContent = deliveryMethod.value === 'collection'
        ? 'Collection is free at any listed campus, residence or locker point.'
        : 'Courier delivery is quoted based on your address before we confirm.';
    });

    // Hand-off message (WhatsApp / email / EFT)
    const buildOrderMessage = () => {
      const cart = state.cart;
      const lines = cart.map((item, i) => (i + 1) + '. ' + item.name + ' × ' + item.qty + ' — ' + formatRand(item.price * item.qty));
      const method = deliveryMethod.value === 'collection' ? 'collect at a Campus-Cart point' : 'have it delivered by courier';
      const addr = $('#delivery-address').value.trim();
      let msg = 'Hello Campus-Cart! I’d like to order:\n' + lines.join('\n') + '\nTotal: ' + formatRand(CC.cartTotal()) + '\nI’d like to ' + method + '.';
      if (addr) msg += '\nLocation: ' + addr;
      return msg;
    };

    $('#checkout-whatsapp').addEventListener('click', (e) => {
      e.preventDefault();
      if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      window.open('https://wa.me/27123456789?text=' + encodeURIComponent(buildOrderMessage()), '_blank', 'noopener');
    });

    $('#checkout-email').addEventListener('click', (e) => {
      e.preventDefault();
      if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      const subject = encodeURIComponent('Campus-Cart order — ' + state.cart.length + ' item(s)');
      window.location.href = 'mailto:orders@campus-cart.co.za?subject=' + subject + '&body=' + encodeURIComponent(buildOrderMessage());
    });

    const eftDetails = $('#eft-details');
    const eftBtn = $('#checkout-eft');
    eftBtn.addEventListener('click', () => {
      const wasHidden = eftDetails.classList.contains('hidden');
      eftDetails.classList.toggle('hidden', !wasHidden);
      eftBtn.textContent = wasHidden ? 'Hide EFT instructions' : 'Show EFT instructions';
    });

    // Student / Parent path: scroll to it when the link carries #student or #parent
    const hash = window.location.hash;
    if (hash === '#parent' || hash === '#student') {
      const target = $(hash);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 120);
    }

    renderOrder();
  }

  /* ===== 3. Products page ===== */
  // ----- Tabs (generic) -----
  function bindTabs(root) {
    root.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const panelId = tab.dataset.panel;
        root.querySelectorAll('[role="tab"]').forEach((t) => {
          const active = t === tab;
          t.setAttribute('aria-selected', String(active));
          t.className = active
            ? 'tab-btn rounded-full bg-[#0d1b3e] px-6 py-2.5 text-sm font-bold text-white'
            : 'tab-btn rounded-full px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
        });
        root.querySelectorAll('[role="tabpanel"]').forEach((p) => p.classList.toggle('hidden', p.id !== panelId));
      });
    });
  }
  $$('[data-tabs]').forEach(bindTabs);
  // The shop and Sell With Us tab groups are not wrapped in [data-tabs] on this build
  const shopTabs = $('#shop .flex[role="tablist"]');
  if (shopTabs) bindTabs(shopTabs.closest('.mt-10'));
  const faqTabs = $('#sell-with-us .flex[role="tablist"]');
  if (faqTabs) bindTabs(faqTabs.closest('.mt-6'));

  // ----- Deals list: search, filter, sort, see more / see less -----
  const dealsResults = $('#deals-results');
  if (dealsResults && window.CC_CATALOGUE) {
    const DEALS = window.CC_CATALOGUE.DEALS;
    const BASE = window.CC_CATALOGUE.BASE;
    const dealsCount = $('#deals-count');
    const seeMore = $('#deals-see-more');
    const seeLess = $('#deals-see-less');
    const STEP = 6;
    let visibleCount = STEP;

    const card = (d) =>
      '<article class="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">' +
      '  <div class="relative overflow-hidden rounded-2xl bg-slate-100">' +
      '    <img src="' + BASE + esc(d.img) + '" width="800" height="800" alt="' + esc(d.alt || d.name) + '" loading="lazy" class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105">' +
      '    <span class="absolute left-3 top-3 rounded-full ' + (d.condition === 'new' ? 'bg-[#0d1b3e] text-[#ffd23f]' : 'bg-[#c2572f] text-white') + ' px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider">' + (d.condition === 'new' ? 'New' : '2nd-hand') + '</span>' +
      '  </div>' +
      '  <div class="mt-4 flex flex-1 flex-col">' +
      '    <div class="flex items-center justify-between gap-2"><h3 class="text-sm font-bold text-[#0d1b3e]">' + esc(d.name) + '</h3><span class="text-sm font-extrabold text-[#0d1b3e]">' + formatRand(d.price) + '</span></div>' +
      '    <p class="mt-1 text-xs text-slate-500">' + esc(d.desc) + '</p>' +
      '    <div class="mt-4 flex flex-wrap gap-2">' +
      '      <button type="button" data-add="' + esc(d.name) + '" data-price="' + d.price + '" class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0d1b3e] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1c3268]">Add to Order Summary</button>' +
      '      <button type="button" data-quickview data-name="' + esc(d.name) + '" data-price="' + d.price + '" data-condition="' + d.condition + '" data-img="' + BASE + esc(d.img) + '" data-alt="' + esc(d.alt || d.name) + '" data-desc="' + esc(d.desc) + '" class="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-[#0d1b3e] transition hover:border-[#0d1b3e]">Quick view</button>' +
      '    </div>' +
      '  </div>' +
      '</article>';

    const renderDeals = () => {
      const q = ($('#product-search').value || '').trim().toLowerCase();
      const cat = $('#filter-category').value;
      const cond = $('#filter-condition').value;
      const sort = $('#sort-by').value;

      const items = DEALS.filter((d) => {
        const matchesQ = !q || (d.name + ' ' + d.category + ' ' + d.desc).toLowerCase().includes(q);
        return matchesQ && (cat === 'all' || d.category === cat) && (cond === 'all' || d.condition === cond);
      });

      if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
      else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));

      dealsCount.textContent = items.length + (items.length === 1 ? ' product' : ' products') + ' found';
      dealsResults.innerHTML = items.length
        ? items.slice(0, visibleCount).map(card).join('')
        : '<div class="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 class="font-bold text-[#0d1b3e]">No matches</h3><p class="mt-1 text-sm text-slate-500">Try a different keyword, category or condition.</p></div>';

      seeMore.hidden = items.length <= visibleCount;
      seeLess.hidden = visibleCount <= STEP || items.length <= STEP;
    };

    $('#product-search').addEventListener('input', () => { visibleCount = STEP; renderDeals(); });
    $('#filter-category').addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    $('#filter-condition').addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    $('#sort-by').addEventListener('change', renderDeals);
    seeMore.addEventListener('click', () => { visibleCount += STEP; renderDeals(); if (seeMore.hidden) seeLess.focus(); });
    seeLess.addEventListener('click', () => { visibleCount = STEP; renderDeals(); dealsResults.scrollIntoView({ block: 'start' }); });
    renderDeals();

    // Header search icon jumps to the deals list
    const searchFocus = $('#searchFocus');
    if (searchFocus) {
      searchFocus.addEventListener('click', () => {
        $('#deals-gallery').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => $('#product-search').focus(), 600);
      });
    }

    // ----- Product detail picker -----
    const detailSelect = $('#detail-select');
    if (detailSelect) {
      DEALS.forEach((d, i) => {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = d.name + ' — ' + formatRand(d.price);
        detailSelect.appendChild(opt);
      });
      const renderDetail = (index) => {
        const d = DEALS[index] || DEALS[0];
        const img = $('#detail-img');
        img.src = BASE + d.img;
        img.alt = d.alt || d.name;
        $('#detail-name').textContent = d.name;
        $('#detail-price').textContent = formatRand(d.price);
        $('#detail-desc').textContent = d.desc;
        const label = $('#detail-condition');
        label.textContent = d.condition === 'new' ? 'Brand new' : 'Second-hand · verified';
        label.className = d.condition === 'new'
          ? 'rounded-full bg-[#ffe9a8] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#7a5800]'
          : 'rounded-full bg-[#c2572f]/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#c2572f]';
        const addBtn = $('#detail-add');
        addBtn.dataset.add = d.name;
        addBtn.dataset.price = String(d.price);
      };
      detailSelect.addEventListener('change', () => renderDetail(Number(detailSelect.value)));
      renderDetail(0);
    }
  }

  // ----- Gallery filter -----
  const galleryFilters = $$('.gallery-filter');
  galleryFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.galleryFilter;
      galleryFilters.forEach((b) => {
        const active = b === btn;
        b.className = active
          ? 'gallery-filter rounded-full bg-[#0d1b3e] px-5 py-2 text-sm font-bold text-white'
          : 'gallery-filter rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
      });
      $$('[data-gallery-item]').forEach((fig) => {
        fig.classList.toggle('hidden', !(filter === 'all' || fig.dataset.galleryItem === filter));
      });
    });
  });

  // ----- Print checklist -----
  const printBtn = $('#print-checklist');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  /* ===== 4. Coverage search ===== */
  const searchInput = $('#coverage-search');
  if (searchInput) {
    const countEl = $('#coverage-count');
    const allInstitutions = $$('.inst');
    const allProvinces = $$('.province');

    const updateSearch = () => {
      const term = (searchInput.value || '').trim().toLowerCase();
      let visibleCount = 0;
      allInstitutions.forEach((li) => {
        const name = (li.getAttribute('data-name') || '').toLowerCase();
        const matched = !term || name.includes(term);
        li.classList.toggle('hidden', !matched);
        if (matched) visibleCount += 1;
      });
      allProvinces.forEach((sec) => {
        sec.classList.toggle('hidden', sec.querySelectorAll('.inst:not(.hidden)').length === 0);
      });
      if (term) {
        countEl.textContent = visibleCount === 1
          ? '1 institution matches "' + searchInput.value.trim() + '".'
          : visibleCount + ' institutions match "' + searchInput.value.trim() + '".';
      } else {
        countEl.textContent = allInstitutions.length + ' institutions listed across 9 provinces.';
      }
    };
    searchInput.addEventListener('input', updateSearch);
    updateSearch();
  }
})();

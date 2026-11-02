// INTERACTION LAYER — Connects visitor actions to the shared cart and wishlist, order summary, product browsing controls, gallery filters, product-detail selection and coverage search. Each page-specific section checks for its required elements before registering handlers, and shared cart state comes from ui.js.

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

  function openCart() { cartDrawer.classList.remove('hidden'); document.body.style.overflow = 'hidden'; if (cartButton) cartButton.setAttribute('aria-expanded', 'true'); }
  function closeCart() { cartDrawer.classList.add('hidden'); document.body.style.overflow = ''; if (cartButton) cartButton.setAttribute('aria-expanded', 'false'); }

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

    // The shared header cart button opens the cart drawer on every page.

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
  // ----- Tabs: bind each tab group to its own page section ----- 
  function bindTabs(sectionSelector) {
    const section = $(sectionSelector);
    if (!section) return;
    const tablist = section.querySelector('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"][data-panel]'));
    const panels = Array.from(section.querySelectorAll('[role="tabpanel"]'));

    const activateTab = (tab) => {
      const panelId = tab.dataset.panel;
      const targetPanel = panels.find((panel) => panel.id === panelId);
      if (!targetPanel) return;

      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        item.className = active
          ? 'tab-btn rounded-full bg-[#0d1b3e] px-6 py-2.5 text-sm font-bold text-white'
          : 'tab-btn rounded-full px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
      });

      panels.forEach((panel) => {
        const active = panel === targetPanel;
        panel.classList.toggle('hidden', !active);
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', String(!active));
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const current = tabs.indexOf(tab);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(current + direction + tabs.length) % tabs.length];
        activateTab(next);
        next.focus();
      });
    });

    const initiallySelected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initiallySelected) activateTab(initiallySelected);
  }

  bindTabs('#shop');
  bindTabs('#sell-with-us');

  // ----- Product cards and Deals: search, category, condition and sorting -----
  const dealsResults = $('#deals-results');
  const catalogue = window.CC_CATALOGUE;
  if (dealsResults && catalogue && Array.isArray(catalogue.DEALS)) {
    const DEALS = catalogue.DEALS;
    const BASE = catalogue.BASE || '../assets/';
    const dealsCount = $('#deals-count');
    const searchInput = $('#product-search');
    const categorySelect = $('#filter-category');
    const conditionSelect = $('#filter-condition');
    const sortSelect = $('#sort-by');
    const seeMore = $('#deals-see-more');
    const seeLess = $('#deals-see-less');
    const STEP = 6;
    let visibleCount = STEP;

    const card = (product) =>
      '<article class="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">' +
      '  <div class="relative overflow-hidden rounded-2xl bg-slate-100">' +
      '    <img src="' + BASE + esc(product.img) + '" width="800" height="800" alt="' + esc(product.alt || product.name) + '" loading="lazy" class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105">' +
      '    <span class="absolute left-3 top-3 rounded-full ' + (product.condition === 'new' ? 'bg-[#0d1b3e] text-[#ffd23f]' : 'bg-[#c2572f] text-white') + ' px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider">' + (product.condition === 'new' ? 'New' : 'Second-hand') + '</span>' +
      '  </div>' +
      '  <div class="mt-4 flex flex-1 flex-col">' +
      '    <div class="flex items-center justify-between gap-2"><h3 class="text-sm font-bold text-[#0d1b3e]">' + esc(product.name) + '</h3><span class="shrink-0 text-sm font-extrabold text-[#0d1b3e]">' + formatRand(product.price) + '</span></div>' +
      '    <p class="mt-1 text-xs text-slate-500">' + esc(product.desc) + '</p>' +
      '    <div class="mt-4 flex flex-wrap items-center gap-2">' +
      '      <button type="button" data-add="' + esc(product.name) + '" data-price="' + Number(product.price) + '" aria-label="Add ' + esc(product.name) + ' to order summary" class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#0d1b3e] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1c3268]"><img src="https://unpkg.com/lucide-static@1.44.0/icons/shopping-cart.svg" alt="" aria-hidden="true" class="h-4 w-4">Add to Order Summary</button>' +
      '      <button type="button" data-add-to-wishlist data-name="' + esc(product.name) + '" data-price="' + Number(product.price) + '" aria-label="Add ' + esc(product.name) + ' to wishlist" aria-pressed="false" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0d1b3e]/25 bg-white text-xl text-[#0d1b3e] transition hover:border-[#0d1b3e] hover:bg-[#ffd23f]" ><span data-wishlist-icon aria-hidden="true">♡</span></button>' +
      '      <button type="button" data-quickview data-name="' + esc(product.name) + '" data-price="' + Number(product.price) + '" data-condition="' + esc(product.condition) + '" data-img="' + BASE + esc(product.img) + '" data-alt="' + esc(product.alt || product.name) + '" data-desc="' + esc(product.desc) + '" aria-label="View details for ' + esc(product.name) + '" class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-[#0d1b3e] transition hover:border-[#0d1b3e]"><img src="https://unpkg.com/lucide-static@1.44.0/icons/microscope.svg" alt="" aria-hidden="true" class="h-4 w-4">Quick view</button>' +
      '    </div>' +
      '  </div>' +
      '</article>';

    // Populate both shop tabs from the same catalogue used by Deals.
    // This prevents the Second-Hand tab from showing only explanatory content.
    const newGrid = $('#panel-new > .grid');
    const usedGrid = $('#panel-used .mt-8.grid');
    if (newGrid) {
      const newProducts = DEALS.filter((product) => product.condition === 'new').slice(0, 10);
      newGrid.classList.add('cc-shop-new-marquee');
      newGrid.setAttribute('tabindex', '0');
      newGrid.setAttribute('aria-label', 'Shop New products. Scroll horizontally to browse up to ten products.');
      newGrid.innerHTML = newProducts.length
        ? newProducts.map(card).join('')
        : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No new products are currently listed.</p>';
    }
    if (usedGrid) {
      const usedProducts = DEALS.filter((product) => product.condition === 'used');
      usedGrid.innerHTML = usedProducts.length
        ? usedProducts.map(card).join('')
        : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No second-hand products are currently listed.</p>';
    }
    // Apply saved wishlist state to cards that were just rendered.
    CC.updateWishlistBadge();

    // Give Shop New and Second-Hand the same manually controlled horizontal carousel.
    const setupShopCarousel = (grid, label) => {
      if (!grid) return;

      grid.classList.add('cc-shop-carousel');
      grid.setAttribute('tabindex', '0');
      grid.setAttribute('aria-label', label + ' products. Use the arrow buttons or horizontal scrolling to browse.');

      const controls = document.createElement('div');
      controls.className = 'cc-shop-carousel-controls';
      controls.setAttribute('role', 'group');
      controls.setAttribute('aria-label', label + ' carousel controls');

      const makeArrow = (direction, icon, accessibleLabel) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'cc-shop-carousel-arrow';
        button.setAttribute('aria-label', accessibleLabel);
        button.innerHTML = '<img src="https://unpkg.com/lucide-static@1.44.0/icons/' + icon + '.svg" alt="" aria-hidden="true">';
        button.addEventListener('click', () => {
          const firstCard = grid.querySelector('article');
          const distance = firstCard ? firstCard.getBoundingClientRect().width + 16 : grid.clientWidth * 0.8;
          grid.scrollBy({ left: direction * distance, behavior: 'smooth' });
        });
        return button;
      };

      controls.append(
        makeArrow(-1, 'chevron-left', 'Scroll ' + label + ' products left'),
        makeArrow(1, 'chevron-right', 'Scroll ' + label + ' products right')
      );
      grid.insertAdjacentElement('beforebegin', controls);
    };

    setupShopCarousel(newGrid, 'Shop New');
    setupShopCarousel(usedGrid, 'Second-Hand Marketplace');

    // Build category options from the catalogue so every category can be selected.
    if (categorySelect) {
      const selectedCategory = categorySelect.value || 'all';
      const categories = [...new Set(DEALS.map((product) => product.category).filter(Boolean))].sort();
      const labels = {
        bundles: 'Bundles',
        appliances: 'Appliances',
        furniture: 'Furniture',
        bedding: 'Bedding',
        textbooks: 'Textbooks',
        stationery: 'Stationery'
      };
      categorySelect.innerHTML = '<option value="all">All categories</option>' +
        categories.map((category) => '<option value="' + esc(category) + '">' + esc(labels[category] || category.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())) + '</option>').join('');
      categorySelect.value = categories.includes(selectedCategory) ? selectedCategory : 'all';
    }

    const renderDeals = () => {
      const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const category = categorySelect ? categorySelect.value : 'all';
      const condition = conditionSelect ? conditionSelect.value : 'all';
      const sort = sortSelect ? sortSelect.value : 'default';

      const items = DEALS.filter((product) => {
        const searchable = [product.name, product.category, product.desc, product.condition].join(' ').toLowerCase();
        return (!q || searchable.includes(q)) &&
          (category === 'all' || product.category === category) &&
          (condition === 'all' || product.condition === condition);
      });

      if (sort === 'price-asc') items.sort((a, b) => Number(a.price) - Number(b.price));
      else if (sort === 'price-desc') items.sort((a, b) => Number(b.price) - Number(a.price));
      else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));

      if (dealsCount) dealsCount.textContent = items.length + (items.length === 1 ? ' product found' : ' products found');
      dealsResults.innerHTML = items.length
        ? items.slice(0, visibleCount).map(card).join('')
        : '<div class="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 class="font-bold text-[#0d1b3e]">No matches</h3><p class="mt-1 text-sm text-slate-500">Try a different keyword, category or condition.</p></div>';
      CC.updateWishlistBadge();

      if (seeMore) seeMore.hidden = items.length <= visibleCount;
      if (seeLess) seeLess.hidden = visibleCount <= STEP || items.length <= STEP;
    };

    if (searchInput) searchInput.addEventListener('input', () => { visibleCount = STEP; renderDeals(); });
    if (categorySelect) categorySelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    if (conditionSelect) conditionSelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    if (sortSelect) sortSelect.addEventListener('change', renderDeals);
    if (seeMore) seeMore.addEventListener('click', () => { visibleCount += STEP; renderDeals(); });
    if (seeLess) seeLess.addEventListener('click', () => {
      visibleCount = STEP;
      renderDeals();
      dealsResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    renderDeals();

    // Header search icon jumps to the actual product search field.
    const searchFocus = $('#searchFocus');
    if (searchFocus && searchInput) {
      searchFocus.addEventListener('click', () => {
        const section = $('#deals-gallery');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => searchInput.focus(), 600);
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

// INTERACTION LAYER — Connects visitor actions to the shared cart and wishlist, order summary, product browsing controls, gallery filters, product-detail selection and coverage search. Each page-specific section checks for its required elements before registering handlers, and shared cart state comes from ui.js.

(function () {
  'use strict';

  // undefined
  const CC = window.CC;
  // undefined
  const $ = CC.$;
  // undefined
  const $$ = CC.$$;
  // undefined
  const formatRand = CC.formatRand;
  // undefined
  const state = CC.state;
  // undefined
  const showSnack = CC.showSnack;
  // undefined
  const ICON = 'https://unpkg.com/lucide-static@1.44.0/icons/';

  // undefined
  const esc = (text) => String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ===== 1. Cart drawer (home page) ===== */
  const cartDrawer = $('#cartDrawer');
  const cartButton = $('#cartButton');
  const cartItemsEl = $('#cartItems');
  const cartTotalEl = $('#cartTotal');

  // undefined
  function renderCart() {
    // undefined
    if (!cartItemsEl) return;
    // undefined
    const cart = state.cart;
    // undefined
    if (!cart.length) {
      cartItemsEl.innerHTML =
        '<div class="flex h-full flex-col items-center justify-center text-center">' +
        '  <img src="' + ICON + 'shopping-bag.svg" alt="" class="h-10 w-10 text-slate-300">' +
        '  <p class="mt-4 text-sm font-semibold text-[#0d1b3e]">Your cart is empty</p>' +
        '  <p class="mt-1 text-xs text-slate-500">Add a bundle or a second-hand pick.</p>' +
        '</div>';
      // undefined
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
    // undefined
    if (cartTotalEl) cartTotalEl.textContent = formatRand(CC.cartTotal());
  }

  // undefined
  function openCart() { cartDrawer.classList.remove('hidden'); document.body.style.overflow = 'hidden'; if (cartButton) cartButton.setAttribute('aria-expanded', 'true'); }
  // undefined
  function closeCart() { cartDrawer.classList.add('hidden'); document.body.style.overflow = ''; if (cartButton) cartButton.setAttribute('aria-expanded', 'false'); }

  // undefined
  if (cartDrawer) {
    // undefined
    if (cartItemsEl) {
      // undefined
      cartItemsEl.addEventListener('click', (e) => {
        // undefined
        const btn = e.target.closest('[data-remove]');
        // undefined
        if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
      });
    }
    // undefined
    if (cartButton) cartButton.addEventListener('click', openCart);
    // undefined
    $$('[data-cart-close]').forEach((el) => el.addEventListener('click', closeCart));
    // undefined
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !cartDrawer.classList.contains('hidden')) closeCart();
    });
    // undefined
    document.addEventListener('cc-cart-change', renderCart);
    // undefined
    renderCart();
  }

  /* ===== Add-to-cart buttons (event delegation, works for cards drawn later too) ===== */
  // undefined
  document.addEventListener('click', (e) => {
    // undefined
    const drawerBtn = e.target.closest('[data-add-to-cart]');
    // undefined
    if (drawerBtn) { CC.addToCart(drawerBtn.dataset.name, drawerBtn.dataset.price); return; }
    // undefined
    const orderBtn = e.target.closest('[data-add]');
    // undefined
    if (orderBtn) {
      // undefined
      CC.addToCart(orderBtn.dataset.add, orderBtn.dataset.price);
      // undefined
      showSnack('Added "' + orderBtn.dataset.add + '" to your order summary.');
    }
  });

  /* ===== 2. Account page: order summary ===== */
  // undefined
  const orderBody = $('#order-body');
  // undefined
  if (orderBody) {
    // undefined
    const orderEmpty = $('#order-empty');
    // undefined
    const orderWrap = $('#order-table-wrap');
    // undefined
    const orderTotal = $('#order-total');

    // undefined
    const renderOrder = () => {
      // undefined
      const cart = state.cart;
      // undefined
      CC.updateBadge();
      // undefined
      if (!cart.length) {
        // undefined
        orderEmpty.classList.remove('hidden');
        // undefined
        orderWrap.classList.add('hidden');
        return;
      }
      // undefined
      orderEmpty.classList.add('hidden');
      // undefined
      orderWrap.classList.remove('hidden');
      // undefined
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
      // undefined
      orderTotal.textContent = formatRand(CC.cartTotal());
    };

    // undefined
    orderBody.addEventListener('click', (e) => {
      // undefined
      const btn = e.target.closest('[data-remove]');
      // undefined
      if (btn) { state.cart.splice(Number(btn.dataset.remove), 1); CC.changeCart(); }
    });
    // undefined
    document.addEventListener('cc-cart-change', renderOrder);

    // undefined
    $('#order-clear').addEventListener('click', () => {
      state.cart = [];
      CC.changeCart();
      // undefined
      showSnack('Order summary cleared.');
    });

    // The shared header cart button opens the cart drawer on every page.

    // undefined
    $('#skip-to-address').addEventListener('click', () => {
      $('#step-address').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Delivery method hint
    // undefined
    const deliveryMethod = $('#delivery-method');
    // undefined
    const deliveryHint = $('#delivery-hint');
    // undefined
    deliveryMethod.addEventListener('change', () => {
      deliveryHint.textContent = deliveryMethod.value === 'collection'
        ? 'Collection is free at any listed campus, residence or locker point.'
        : 'Courier delivery is quoted based on your address before we confirm.';
    });

    // Hand-off message (WhatsApp / email / EFT)
    // undefined
    const buildOrderMessage = () => {
      // undefined
      const cart = state.cart;
      // undefined
      const lines = cart.map((item, i) => (i + 1) + '. ' + item.name + ' × ' + item.qty + ' — ' + formatRand(item.price * item.qty));
      // undefined
      const method = deliveryMethod.value === 'collection' ? 'collect at a Campus-Cart point' : 'have it delivered by courier';
      // undefined
      const addr = $('#delivery-address').value.trim();
      // undefined
      let msg = 'Hello Campus-Cart! I’d like to order:\n' + lines.join('\n') + '\nTotal: ' + formatRand(CC.cartTotal()) + '\nI’d like to ' + method + '.';
      // undefined
      if (addr) msg += '\nLocation: ' + addr;
      // undefined
      return msg;
    };

    // undefined
    $('#checkout-whatsapp').addEventListener('click', (e) => {
      // undefined
      e.preventDefault();
      // undefined
      if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      // undefined
      window.open('https://wa.me/27123456789?text=' + encodeURIComponent(buildOrderMessage()), '_blank', 'noopener');
    });

    // undefined
    $('#checkout-email').addEventListener('click', (e) => {
      // undefined
      e.preventDefault();
      // undefined
      if (!state.cart.length) { showSnack('Add items to your summary first.'); return; }
      // undefined
      const subject = encodeURIComponent('Campus-Cart order — ' + state.cart.length + ' item(s)');
      // undefined
      window.location.href = 'mailto:orders@campus-cart.co.za?subject=' + subject + '&body=' + encodeURIComponent(buildOrderMessage());
    });

    // undefined
    const eftDetails = $('#eft-details');
    // undefined
    const eftBtn = $('#checkout-eft');
    // undefined
    eftBtn.addEventListener('click', () => {
      // undefined
      const wasHidden = eftDetails.classList.contains('hidden');
      eftDetails.classList.toggle('hidden', !wasHidden);
      eftBtn.textContent = wasHidden ? 'Hide EFT instructions' : 'Show EFT instructions';
    });

    // Student / Parent path: scroll to it when the link carries #student or #parent
    // undefined
    const hash = window.location.hash;
    // undefined
    if (hash === '#parent' || hash === '#student') {
      // undefined
      const target = $(hash);
      // undefined
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 120);
    }

    // undefined
    renderOrder();
  }

  /* ===== 3. Products page ===== */
  // ----- Tabs: bind each tab group to its own page section ----- 
  // undefined
  function bindTabs(sectionSelector) {
    // undefined
    const section = $(sectionSelector);
    // undefined
    if (!section) return;
    // undefined
    const tablist = section.querySelector('[role="tablist"]');
    // undefined
    if (!tablist) return;
    // undefined
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"][data-panel]'));
    // undefined
    const panels = Array.from(section.querySelectorAll('[role="tabpanel"]'));

    // undefined
    const activateTab = (tab) => {
      // undefined
      const panelId = tab.dataset.panel;
      // undefined
      const targetPanel = panels.find((panel) => panel.id === panelId);
      // undefined
      if (!targetPanel) return;

      // undefined
      tabs.forEach((item) => {
        // undefined
        const active = item === tab;
        // undefined
        item.setAttribute('aria-selected', String(active));
        // undefined
        item.tabIndex = active ? 0 : -1;
        // undefined
        item.className = active
          ? 'tab-btn rounded-full bg-[#0d1b3e] px-6 py-2.5 text-sm font-bold text-white'
          : 'tab-btn rounded-full px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
      });

      // undefined
      panels.forEach((panel) => {
        // undefined
        const active = panel === targetPanel;
        // undefined
        panel.classList.toggle('hidden', !active);
        // undefined
        panel.classList.toggle('is-active', active);
        // undefined
        panel.setAttribute('aria-hidden', String(!active));
      });
    };

    // undefined
    tabs.forEach((tab) => {
      // undefined
      tab.addEventListener('click', () => activateTab(tab));
      // undefined
      tab.addEventListener('keydown', (event) => {
        // undefined
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        // undefined
        event.preventDefault();
        // undefined
        const current = tabs.indexOf(tab);
        // undefined
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        // undefined
        const next = tabs[(current + direction + tabs.length) % tabs.length];
        // undefined
        activateTab(next);
        // undefined
        next.focus();
      });
    });

    // undefined
    const initiallySelected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    // undefined
    if (initiallySelected) activateTab(initiallySelected);
  }

  // undefined
  bindTabs('#shop');
  // undefined
  bindTabs('#sell-with-us');

  // ----- Product cards and Deals: search, category, condition and sorting -----
  // undefined
  const dealsResults = $('#deals-results');
  // undefined
  const catalogue = window.CC_CATALOGUE;
  // undefined
  if (dealsResults && catalogue && Array.isArray(catalogue.DEALS)) {
    // undefined
    const DEALS = catalogue.DEALS;
    // undefined
    const BASE = catalogue.BASE || '../assets/';
    // undefined
    const dealsCount = $('#deals-count');
    // undefined
    const searchInput = $('#product-search');
    // undefined
    const categorySelect = $('#filter-category');
    // undefined
    const conditionSelect = $('#filter-condition');
    // undefined
    const sortSelect = $('#sort-by');
    // undefined
    const seeMore = $('#deals-see-more');
    // undefined
    const seeLess = $('#deals-see-less');
    // undefined
    const STEP = 9;
    // undefined
    let visibleCount = STEP;

    // undefined
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
    // undefined
    const newGrid = $('#panel-new > .grid');
    // undefined
    const usedGrid = $('#panel-used .mt-8.grid');
    // undefined
    if (newGrid) {
      // undefined
      const newProducts = DEALS.filter((product) => product.condition === 'new').slice(0, 10);
      // undefined
      newGrid.classList.add('cc-shop-new-marquee');
      // undefined
      newGrid.setAttribute('tabindex', '0');
      // undefined
      newGrid.setAttribute('aria-label', 'Shop New products. Scroll horizontally to browse up to ten products.');
      // undefined
      newGrid.innerHTML = newProducts.length
        ? newProducts.map(card).join('')
        : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No new products are currently listed.</p>';
    }
    // undefined
    if (usedGrid) {
      // undefined
      const usedProducts = DEALS.filter((product) => product.condition === 'used');
      // undefined
      usedGrid.innerHTML = usedProducts.length
        ? usedProducts.map(card).join('')
        : '<p class="col-span-full rounded-2xl bg-white p-6 text-sm text-slate-500">No second-hand products are currently listed.</p>';
    }
    // Apply saved wishlist state to cards that were just rendered.
    // undefined
    CC.updateWishlistBadge();

    // Give Shop New and Second-Hand the same manually controlled horizontal carousel.
    // undefined
    const setupShopCarousel = (grid, label) => {
      // undefined
      if (!grid) return;

      // undefined
      grid.classList.add('cc-shop-carousel');
      // undefined
      grid.setAttribute('tabindex', '0');
      // undefined
      grid.setAttribute('aria-label', label + ' products. Use the arrow buttons or horizontal scrolling to browse.');

      // undefined
      const controls = document.createElement('div');
      // undefined
      controls.className = 'cc-shop-carousel-controls';
      // undefined
      controls.setAttribute('role', 'group');
      // undefined
      controls.setAttribute('aria-label', label + ' carousel controls');

      // undefined
      const makeArrow = (direction, icon, accessibleLabel) => {
        // undefined
        const button = document.createElement('button');
        // undefined
        button.type = 'button';
        // undefined
        button.className = 'cc-shop-carousel-arrow';
        // undefined
        button.setAttribute('aria-label', accessibleLabel);
        // undefined
        button.innerHTML = '<img src="https://unpkg.com/lucide-static@1.44.0/icons/' + icon + '.svg" alt="" aria-hidden="true">';
        // undefined
        button.addEventListener('click', () => {
          // undefined
          const firstCard = grid.querySelector('article');
          // undefined
          const distance = firstCard ? firstCard.getBoundingClientRect().width + 16 : grid.clientWidth * 0.8;
          // undefined
          grid.scrollBy({ left: direction * distance, behavior: 'smooth' });
        });
        // undefined
        return button;
      };

      // undefined
      controls.append(
        makeArrow(-1, 'chevron-left', 'Scroll ' + label + ' products left'),
        makeArrow(1, 'chevron-right', 'Scroll ' + label + ' products right')
      );
      // undefined
      grid.insertAdjacentElement('beforebegin', controls);
    };

    // undefined
    setupShopCarousel(newGrid, 'Shop New');
    // undefined
    setupShopCarousel(usedGrid, 'Second-Hand Marketplace');

    // Build category options from the catalogue so every category can be selected.
    // undefined
    if (categorySelect) {
      // undefined
      const selectedCategory = categorySelect.value || 'all';
      // undefined
      const categories = [...new Set(DEALS.map((product) => product.category).filter(Boolean))].sort();
      // undefined
      const labels = {
        bundles: 'Bundles',
        appliances: 'Appliances',
        furniture: 'Furniture',
        bedding: 'Bedding',
        textbooks: 'Textbooks',
        stationery: 'Stationery'
      };
      // undefined
      categorySelect.innerHTML = '<option value="all">All categories</option>' +
        categories.map((category) => '<option value="' + esc(category) + '">' + esc(labels[category] || category.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())) + '</option>').join('');
      // undefined
      categorySelect.value = categories.includes(selectedCategory) ? selectedCategory : 'all';
    }

    // Tracks the number of products matching the current filters for automatic loading.
    let matchingDealsCount = DEALS.length;

    // undefined
    const renderDeals = () => {
      // undefined
      const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      // undefined
      const category = categorySelect ? categorySelect.value : 'all';
      // undefined
      const condition = conditionSelect ? conditionSelect.value : 'all';
      // undefined
      const sort = sortSelect ? sortSelect.value : 'default';

      // undefined
      const items = DEALS.filter((product) => {
        // undefined
        const searchable = [product.name, product.category, product.desc, product.condition].join(' ').toLowerCase();
        return (!q || searchable.includes(q)) &&
          (category === 'all' || product.category === category) &&
          (condition === 'all' || product.condition === condition);
      });

      // undefined
      if (sort === 'price-asc') items.sort((a, b) => Number(a.price) - Number(b.price));
      // undefined
      else if (sort === 'price-desc') items.sort((a, b) => Number(b.price) - Number(a.price));
      // undefined
      else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));

      // Updates the total matching count before rendering the visible product batch.
      matchingDealsCount = items.length;
      // undefined
      if (dealsCount) dealsCount.textContent = items.length + (items.length === 1 ? ' product found' : ' products found');
      // undefined
      dealsResults.innerHTML = items.length
        ? items.slice(0, visibleCount).map(card).join('')
        : '<div class="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 class="font-bold text-[#0d1b3e]">No matches</h3><p class="mt-1 text-sm text-slate-500">Try a different keyword, category or condition.</p></div>';
      // undefined
      CC.updateWishlistBadge();

      // undefined
      if (seeMore) seeMore.hidden = items.length <= visibleCount;
      // undefined
      if (seeLess) seeLess.hidden = visibleCount <= STEP || items.length <= STEP;
      // Keeps the automatic-load trigger available only while more matching products remain.
      if (loadMoreSentinel) loadMoreSentinel.hidden = visibleCount >= matchingDealsCount;
    };

    // Adds an invisible scroll trigger after the product grid so the next batch loads near the bottom.
    const loadMoreSentinel = document.createElement('div');
    loadMoreSentinel.id = 'deals-load-more-sentinel';
    loadMoreSentinel.setAttribute('aria-hidden', 'true');
    loadMoreSentinel.style.cssText = 'height: 1px; width: 100%;';
    dealsResults.insertAdjacentElement('afterend', loadMoreSentinel);

    // Uses IntersectionObserver to load four more products as the visitor approaches the end of the grid.
    if ('IntersectionObserver' in window) {
      const dealsLoader = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting) && visibleCount < matchingDealsCount) {
          visibleCount = Math.min(visibleCount + STEP, matchingDealsCount);
          renderDeals();
        }
      }, { rootMargin: '350px 0px' });
      dealsLoader.observe(loadMoreSentinel);
    }

    // undefined
    if (searchInput) searchInput.addEventListener('input', () => { visibleCount = STEP; renderDeals(); });
    // undefined
    if (categorySelect) categorySelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    // undefined
    if (conditionSelect) conditionSelect.addEventListener('change', () => { visibleCount = STEP; renderDeals(); });
    // undefined
    if (sortSelect) sortSelect.addEventListener('change', renderDeals);
    // undefined
    if (seeMore) seeMore.addEventListener('click', () => { visibleCount += STEP; renderDeals(); });
    // undefined
    if (seeLess) seeLess.addEventListener('click', () => {
      visibleCount = STEP;
      // undefined
      renderDeals();
      dealsResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    // undefined
    renderDeals();

    // Header search icon jumps to the actual product search field.
    // undefined
    const searchFocus = $('#searchFocus');
    // undefined
    if (searchFocus && searchInput) {
      // undefined
      searchFocus.addEventListener('click', () => {
        // undefined
        const section = $('#deals-gallery');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => searchInput.focus(), 600);
      });
    }

    // ----- Product detail picker -----
    // undefined
    const detailSelect = $('#detail-select');
    // undefined
    if (detailSelect) {
      // undefined
      DEALS.forEach((d, i) => {
        // undefined
        const opt = document.createElement('option');
        // undefined
        opt.value = String(i);
        // undefined
        opt.textContent = d.name + ' — ' + formatRand(d.price);
        // undefined
        detailSelect.appendChild(opt);
      });
      // undefined
      const renderDetail = (index) => {
        // undefined
        const d = DEALS[index] || DEALS[0];
        // undefined
        const img = $('#detail-img');
        // undefined
        img.src = BASE + d.img;
        // undefined
        img.alt = d.alt || d.name;
        // undefined
        $('#detail-name').textContent = d.name;
        // undefined
        $('#detail-price').textContent = formatRand(d.price);
        // undefined
        $('#detail-desc').textContent = d.desc;
        // undefined
        const label = $('#detail-condition');
        // undefined
        label.textContent = d.condition === 'new' ? 'Brand new' : 'Second-hand · verified';
        // undefined
        label.className = d.condition === 'new'
          ? 'rounded-full bg-[#ffe9a8] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#7a5800]'
          : 'rounded-full bg-[#c2572f]/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#c2572f]';
        // undefined
        const addBtn = $('#detail-add');
        // undefined
        addBtn.dataset.add = d.name;
        // undefined
        addBtn.dataset.price = String(d.price);
      };
      // undefined
      detailSelect.addEventListener('change', () => renderDetail(Number(detailSelect.value)));
      // undefined
      renderDetail(0);
    }
  }

  // ----- Gallery filter -----
  // undefined
  const galleryFilters = $$('.gallery-filter');
  // undefined
  galleryFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      // undefined
      const filter = btn.dataset.galleryFilter;
      // undefined
      galleryFilters.forEach((b) => {
        // undefined
        const active = b === btn;
        // undefined
        b.className = active
          ? 'gallery-filter rounded-full bg-[#0d1b3e] px-5 py-2 text-sm font-bold text-white'
          : 'gallery-filter rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100';
      });
      // undefined
      $$('[data-gallery-item]').forEach((fig) => {
        // undefined
        fig.classList.toggle('hidden', !(filter === 'all' || fig.dataset.galleryItem === filter));
      });
    });
  });

  // ----- Print checklist only -----
  // Finds the checklist print control on the products page.
  const printBtn = $('#print-checklist');
  // Adds a temporary print-mode class so the print stylesheet isolates the checklist.
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      document.body.classList.add('cc-print-checklist');
      // Starts printing after the browser has applied the checklist-only print mode.
      window.print();
    });
    // Removes the temporary print mode after the print dialog closes.
    window.addEventListener('afterprint', () => {
      document.body.classList.remove('cc-print-checklist');
    });
  }

  /* ===== 4. Coverage search ===== */
  // undefined
  const searchInput = $('#coverage-search');
  // undefined
  if (searchInput) {
    // undefined
    const countEl = $('#coverage-count');
    // undefined
    const allInstitutions = $$('.inst');
    // undefined
    const allProvinces = $$('.province');

    // undefined
    const updateSearch = () => {
      // undefined
      const term = (searchInput.value || '').trim().toLowerCase();
      // undefined
      let visibleCount = 0;
      // undefined
      allInstitutions.forEach((li) => {
        // undefined
        const name = (li.getAttribute('data-name') || '').toLowerCase();
        // undefined
        const matched = !term || name.includes(term);
        // undefined
        li.classList.toggle('hidden', !matched);
        // undefined
        if (matched) visibleCount += 1;
      });
      // undefined
      allProvinces.forEach((sec) => {
        // undefined
        sec.classList.toggle('hidden', sec.querySelectorAll('.inst:not(.hidden)').length === 0);
      });
      // undefined
      if (term) {
        // undefined
        countEl.textContent = visibleCount === 1
          ? '1 institution matches "' + searchInput.value.trim() + '".'
          : visibleCount + ' institutions match "' + searchInput.value.trim() + '".';
      } else {
        // undefined
        countEl.textContent = allInstitutions.length + ' institutions listed across 9 provinces.';
      }
    };
    // undefined
    searchInput.addEventListener('input', updateSearch);
    // undefined
    updateSearch();
  }
})();

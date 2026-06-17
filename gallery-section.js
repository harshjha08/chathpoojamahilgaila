/* ============================================================
   gallery-section.js
   Drop this INSTEAD of the old gallery block in main.js.
   Handles: home grid (8 photos) + fixed lightbox.
   Call initHomeGallery() from your DOMContentLoaded block.
============================================================ */

(function () {

  /* ── Sample data used when API has no gallery items ─────── */
  const FALLBACK = [
    { src: "img1.jpeg",         caption: "Devotees offering Arghya at the sacred ghat", category: "sunset", year: 2025 },
    { src: "img9.jpeg", caption: "Community gathering at the village pond",          category: "community", year: 2025 },
    { src: "img3.jpeg",                                   caption: "Sunrise Usha Arghya – first rays of morning",    category: "sunrise", year: 2025 },
    { src: "img4.jpeg",                                   caption: "Traditional earthen diyas lighting the ghat",    category: "prasad",  year: 2025 },
    { src: "img5.jpeg",                                   caption: "Festival decoration & lighting at village chowk", category: "community", year: 2025 },
    { src: "img6.jpeg",                                   caption: "Sacred water offerings at sunset",                category: "sunset", year: 2025 },
    { src: "img7.jpeg",                                   caption: "Bamboo sup filled with thekua and fruits",        category: "prasad",  year: 2025 },
    { src: "img8.jpeg",                                   caption: "Village devotees united in prayer",               category: "community", year: 2025 },
  ];

  let photos = [];   // the 8 shown on homepage
  let lbIndex = 0;   // current lightbox index

  /* ── Init ─────────────────────────────────────────────── */
  async function initHomeGallery() {
    const grid = document.getElementById("galleryHomeGrid");
    if (!grid) return;

    // Try API first
    let apiData = null;
    try {
      const res = await fetch("/api/public/gallery");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          apiData = json.data;
        }
      }
    } catch (_) { /* offline – use fallback */ }

    photos = apiData ? apiData.slice(0, 8) : FALLBACK.slice(0, 8);

    // Update total count label
    const countEl = document.getElementById("galleryTotalCount");
    if (countEl) {
      const total = apiData ? apiData.length : FALLBACK.length;
      countEl.textContent = `Browse all ${total}+ photos from Chhath Pooja celebrations`;
    }

    renderGrid(grid, photos);
    initLightbox();
  }

  /* ── Render 8-item grid ──────────────────────────────── */
  function renderGrid(grid, items) {
    grid.innerHTML = items.map((p, i) =>
      `<div class="g-item" data-index="${i}" role="button" tabindex="0" aria-label="Open photo: ${p.caption || ''}">
        <img
          src="${p.src}"
          alt="${p.caption || 'Chhath Pooja photo'}"
          loading="${i < 4 ? 'eager' : 'lazy'}"
          onerror="this.src='https://placehold.co/600x400/E8690A/fff?text=Chhath+Pooja'"
        />
        <div class="g-item-overlay">
          <p class="g-item-caption">${p.caption || ''}</p>
          <div class="g-item-meta">
            ${p.category ? `<span class="g-tag">${p.category}</span>` : ''}
            ${p.year    ? `<span class="g-tag">${p.year}</span>`     : ''}
            <div class="g-item-expand"><i class="fas fa-expand"></i></div>
          </div>
        </div>
      </div>`
    ).join('');

    // Click & keyboard on each item
    grid.querySelectorAll('.g-item').forEach(el => {
      el.addEventListener('click', () => openLightbox(+el.dataset.index));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(+el.dataset.index); } });
    });
  }

  /* ── Lightbox ────────────────────────────────────────── */
  function initLightbox() {
    const overlay = document.getElementById('glbOverlay');
    const img     = document.getElementById('glbImg');
    const loader  = document.getElementById('glbLoader');
    const caption = document.getElementById('glbCaption');
    const counter = document.getElementById('glbCounter');
    const closeBtn = document.getElementById('glbClose');
    const prevBtn  = document.getElementById('glbPrev');
    const nextBtn  = document.getElementById('glbNext');
    if (!overlay || !img) return;

    /* open */
    function openLightboxInternal(index) {
      lbIndex = ((index % photos.length) + photos.length) % photos.length;
      showPhoto();
      overlay.classList.add('open');
      // document.body.style.overflow = 'hidden';
      overlay.focus();
    }

    /* show current photo */
    function showPhoto() {
      const p = photos[lbIndex];
      if (!p) return;

      // Show loader, hide image
      img.classList.add('loading');
      if (loader) loader.classList.remove('hidden');

      // Set src – onload reveals it
      img.onload = () => {
        img.classList.remove('loading');
        if (loader) loader.classList.add('hidden');
      };
      img.onerror = () => {
        img.src = 'https://placehold.co/800x500/E8690A/fff?text=Chhath+Pooja';
        img.classList.remove('loading');
        if (loader) loader.classList.add('hidden');
      };
      img.src = p.src;
      img.alt = p.caption || '';

      if (caption) caption.textContent = p.caption || '';
      if (counter) counter.textContent = `${lbIndex + 1} / ${photos.length}`;
    }

    /* close */
    function closeLightbox() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      img.src = '';
    }

    /* navigate */
    function prev() { lbIndex = (lbIndex - 1 + photos.length) % photos.length; showPhoto(); }
    function next() { lbIndex = (lbIndex + 1) % photos.length; showPhoto(); }

    // Expose openLightbox to grid items
    window._openHomeGalleryLightbox = openLightboxInternal;

    // Button events
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn)  prevBtn.addEventListener('click',  prev);
    if (nextBtn)  nextBtn.addEventListener('click',  next);

    // Click backdrop (not stage) to close
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLightbox();
    });

    // Keyboard
    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    });

    // Touch swipe
    let touchStartX = 0;
    overlay.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); }
    });
  }

  /* Expose openLightbox for grid item events */
  function openLightbox(i) {
    if (window._openHomeGalleryLightbox) window._openHomeGalleryLightbox(i);
  }

  /* ── Public API ──────────────────────────────────────── */
  window.initHomeGallery = initHomeGallery();

})();
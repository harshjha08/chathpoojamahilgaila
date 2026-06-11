/* ============================================================
   1. PRELOADER
============================================================ */
"strict"
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.style.overflow = "";
  }, 1800);
});
document.body.style.overflow = "hidden";


/* ============================================================
   2. AOS – Animate On Scroll
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }
});


/* ============================================================
   3. NAVBAR – scroll behaviour + active link
============================================================ */
(function initNavbar() {
  const navbar   = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const hamburger = document.getElementById("hamburger");
  const navLinksMenu = document.getElementById("navLinks");

  // Scroll behaviour
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 60);

    // Active link highlight
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // Hamburger toggle
  if (hamburger && navLinksMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinksMenu.classList.toggle("open");
    });

    // Close on link click (mobile)
    navLinksMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinksMenu.classList.remove("open");
      });
    });
  }
})();


/* ============================================================
   4. SCROLL TO TOP BUTTON
============================================================ */
(function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();


/* ============================================================
   5. THEME SWITCHER
============================================================ */
(function initThemeSwitcher() {
  const toggleBtn   = document.getElementById("themeToggleBtn");
  const panel       = document.getElementById("themePanel");
  const themeOptions = document.querySelectorAll(".theme-option");
  const html        = document.documentElement;

  // Load saved theme
  const saved = localStorage.getItem("chhath-theme") || "saffron";
  applyTheme(saved);

  if (toggleBtn && panel) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && e.target !== toggleBtn) {
        panel.classList.remove("open");
      }
    });
  }

  themeOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      localStorage.setItem("chhath-theme", theme);
      panel.classList.remove("open");
    });
  });

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    themeOptions.forEach(o => o.classList.toggle("active", o.dataset.theme === theme));
  }
})();


/* ============================================================
   6. COUNTDOWN TIMER
============================================================ */
(function initCountdown() {
  // Chhath Pooja 2026 – Sandhya Arghya: Nov 13, 2026 17:58
  const target = new Date("2026-11-13T00:00:00+05:30").getTime();
  const cdDays    = document.getElementById("cd-days");
  const cdHours   = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");
  const footerText = document.getElementById("footerCountdownText");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const now  = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      if (cdDays)    cdDays.textContent    = "00";
      if (cdHours)   cdHours.textContent   = "00";
      if (cdMinutes) cdMinutes.textContent = "00";
      if (cdSeconds) cdSeconds.textContent = "00";
      if (footerText) footerText.textContent = "🎉 Chhath Pooja is happening NOW!";
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (cdDays)    animateNumber(cdDays,    pad(days));
    if (cdHours)   animateNumber(cdHours,   pad(hours));
    if (cdMinutes) animateNumber(cdMinutes, pad(minutes));
    if (cdSeconds) animateNumber(cdSeconds, pad(seconds));

    if (footerText) {
      footerText.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s to Sandhya Arghya`;
    }
  }

  function animateNumber(el, val) {
    if (el.textContent !== val) {
      el.style.transform = "translateY(-6px)";
      el.style.opacity   = "0";
      setTimeout(() => {
        el.textContent     = val;
        el.style.transform = "translateY(0)";
        el.style.opacity   = "1";
        el.style.transition = "transform 0.25s ease, opacity 0.25s ease";
      }, 120);
    }
  }

  tick();
  setInterval(tick, 1000);
})();


/* ============================================================
   7. HERO PARTICLES
============================================================ */
(function initParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;

  const count = window.innerWidth < 640 ? 18 : 35;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${Math.random() * 0.6 + 0.2};
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: -${Math.random() * 12}s;
    `;
    container.appendChild(p);
  }
})();


/* ============================================================
   8. LANGUAGE SWITCHER (EN / HI)
============================================================ */
(function initLangSwitcher() {
  const btns = document.querySelectorAll(".lang-btn");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".lang-en").forEach(el => {
        el.style.display = lang === "en" ? "" : "none";
      });
      document.querySelectorAll(".lang-hi").forEach(el => {
        el.style.display = lang === "hi" ? "" : "none";
      });
    });
  });
})();


// /* ============================================================
//    9. RENDER EVENTS
// ============================================================ */
(function renderEvents() {
  const grid = document.getElementById("eventsGrid");
  if (!grid || window.SiteData) return;

  function buildCards(filter) {
    const filtered = filter === "all"
      ? SiteData.events
      : SiteData.events.filter(e => e.category === filter);

    grid.innerHTML = "";
    filtered.forEach((ev, i) => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", String((i % 3) * 100));
      card.innerHTML = `
        <div class="event-card-header">
          <div class="event-icon-wrap">
            <i class="fas ${ev.icon}"></i>
          </div>
          <div class="event-meta">
            <p class="event-category">${ev.category.charAt(0).toUpperCase() + ev.category.slice(1)}</p>
            <h3 class="event-title">${ev.title}</h3>
          </div>
        </div>
        <div class="event-card-body">
          <p class="event-desc">${ev.desc}</p>
          <div class="event-details">
            <span class="event-detail-item"><i class="fas fa-calendar"></i>${ev.date}</span>
            <span class="event-detail-item"><i class="fas fa-clock"></i>${ev.time}</span>
            <span class="event-detail-item"><i class="fas fa-map-marker-alt"></i>${ev.venue}</span>
          </div>
        </div>`;
      grid.appendChild(card);
    });

    if (typeof AOS !== "undefined") AOS.refresh();
  }

  buildCards("all");

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      buildCards(btn.dataset.tab);
    });
  });
})();


/* ============================================================
   10. RENDER TIMELINE
============================================================ */
(function renderTimeline() {
  const wrapper = document.getElementById("timelineItems");
  if (!wrapper || window.SiteData) return;

  SiteData.timeline.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.setAttribute("data-aos", i % 2 === 0 ? "fade-right" : "fade-left");
    div.setAttribute("data-aos-duration", "900");
    div.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-day-badge">${item.day}</span>
        <p class="timeline-time"><i class="fas fa-clock"></i>${item.time}</p>
        <h4 class="timeline-event-name">${item.name}</h4>
        <p class="timeline-event-desc">${item.desc}</p>
      </div>`;
    wrapper.appendChild(div);
  });

  if (typeof AOS !== "undefined") AOS.refresh();
})();


/* ============================================================
//    11. RENDER COMMITTEE
// ============================================================ */
(function renderCommittee() {
  const grid = document.getElementById("committeeGrid");
  if (!grid || window.SiteData) return;

  SiteData.committee.forEach((member, i) => {
    const card = document.createElement("div");
    card.className = "committee-card";
    card.setAttribute("data-aos", "zoom-in");
    card.setAttribute("data-aos-delay", String((i % 4) * 80));
    card.innerHTML = `
      <div class="committee-card-img">
        <div class="avatar-placeholder">${member.emoji}</div>
      </div>
      <div class="committee-card-body">
        <p class="committee-role">${member.role}</p>
        <h3 class="committee-name">${member.name}</h3>
        <p class="committee-since"><i class="fas fa-calendar-check" style="color:var(--primary);margin-right:4px;font-size:.75rem"></i>${member.since}</p>
        <div class="committee-contact">
          <a href="tel:${member.phone}" class="committee-contact-link" title="Call"><i class="fas fa-phone"></i></a>
          <a href="#contact" class="committee-contact-link" title="Message"><i class="fas fa-envelope"></i></a>
          <a href="#" class="committee-contact-link" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  if (typeof AOS !== "undefined") AOS.refresh();
})();


/* ============================================================
   12. RENDER GALLERY + LIGHTBOX + FILTER do not delete 
============================================================ */
(function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  
  if (!grid || window.SiteData) return;

  let currentIndex = 0;
  let activeFilter = "all";

  function getFiltered() {
    return activeFilter === "all"
      ? SiteData.gallery
      : SiteData.gallery.filter(g => g.filter === activeFilter);
  }

  function build() {
    grid.innerHTML = "";
    getFiltered().forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.setAttribute("data-filter", item.filter);
      div.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-overlay">
          <p>${item.caption}</p>
          <i class="fas fa-expand" style="margin-left:auto"></i>
        </div>`;
      div.addEventListener("click", () => openLightbox(i));
      grid.appendChild(div);
    });
  }

  build();

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;

      // Animate out then rebuild
      grid.style.opacity = "0";
      grid.style.transform = "translateY(10px)";
      setTimeout(() => {
        build();
        grid.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        grid.style.opacity = "1";
        grid.style.transform = "translateY(0)";
      }, 250);
    });
  });

  // Lightbox
  const lightbox    = document.getElementById("lightbox");
  const lbImg       = document.getElementById("lightboxImg");
  const lbCaption   = document.getElementById("lightboxCaption");
  const lbClose     = document.getElementById("lightboxClose");
  const lbPrev      = document.getElementById("lightboxPrev");
  const lbNext      = document.getElementById("lightboxNext");

  function openLightbox(i) {
    if (!lightbox) return;
    currentIndex = i;
    showLightboxItem();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function showLightboxItem() {
    const items = getFiltered();
    if (!items[currentIndex]) return;
    lbImg.src = items[currentIndex].src;
    lbImg.alt = items[currentIndex].caption;
    lbCaption.textContent = items[currentIndex].caption;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

  if (lbPrev) lbPrev.addEventListener("click", () => {
    const items = getFiltered();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showLightboxItem();
  });

  if (lbNext) lbNext.addEventListener("click", () => {
    const items = getFiltered();
    currentIndex = (currentIndex + 1) % items.length;
    showLightboxItem();
  });

  // Keyboard navigation
  document.addEventListener("keydown", e => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft")  lbPrev && lbPrev.click();
    if (e.key === "ArrowRight") lbNext && lbNext.click();
  });
})();


/* ============================================================
   13. RENDER FAQ
============================================================ */
(function renderFAQ() {
  const grid = document.getElementById("faqGrid");
  if (!grid || window.SiteData) return;

  SiteData.faq.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "faq-item";
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-delay", String((i % 3) * 80));
    div.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        <span>${item.q}</span>
        <span class="faq-icon"><i class="fas fa-plus"></i></span>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">${item.a}</div>
      </div>`;

    const question = div.querySelector(".faq-question");
    const answer   = div.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = question.classList.contains("open");

      // Close all
      document.querySelectorAll(".faq-question.open").forEach(q => {
        q.classList.remove("open");
        q.setAttribute("aria-expanded", "false");
        q.nextElementSibling.classList.remove("open");
      });

      // Toggle clicked
      if (!isOpen) {
        question.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.classList.add("open");
      }
    });

    grid.appendChild(div);
  });

  if (typeof AOS !== "undefined") AOS.refresh();
})();


/* ============================================================
   14. DONATION TIER SELECTOR
============================================================ */
(function initDonate() {
  const tiers = document.querySelectorAll(".donate-tier");
  const customInput = document.getElementById("customAmount");
  const donateBtn   = document.getElementById("donateBtn");

  tiers.forEach(tier => {
    tier.addEventListener("click", () => {
      tiers.forEach(t => t.classList.remove("active"));
      tier.classList.add("active");
      if (customInput) customInput.value = tier.dataset.amount;
    });
  });

  if (customInput) {
    customInput.addEventListener("input", () => {
      tiers.forEach(t => t.classList.remove("active"));
    });
  }

  if (donateBtn) {
    donateBtn.addEventListener("click", () => {
      const amount = (customInput && customInput.value) || "1100";
      if (!amount || isNaN(amount) || Number(amount) < 1) {
        showToast("Please enter a valid donation amount.", "warning");
        return;
      }
      showToast(`🙏 Thank you for your ₹${Number(amount).toLocaleString('en-IN')} donation! Redirecting to payment...`, "success");
      // In production, redirect to UPI / payment gateway
    });
  }
})();


/* ============================================================
   15. CONTACT FORM
============================================================ */
(function initContactForm() {
  const form    = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
    btn.disabled = true;

    // Simulate network delay (replace with actual fetch to your backend)
    await new Promise(r => setTimeout(r, 1800));

    btn.innerHTML = originalText;
    btn.disabled = false;
    form.reset();

    if (success) {
      success.style.display = "flex";
      setTimeout(() => success.style.display = "none", 6000);
    }

    showToast("Message sent! The committee will contact you soon.", "success");
  });
})();


/* ============================================================
   16. COUNTING ANIMATION FOR STATS
============================================================ */
(function initCountingStats() {
  const counters = document.querySelectorAll(".stat-num[data-target]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1900;
      const step   = target / (duration / 16);
      let current  = 0;

      const update = () => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString('en-IN');
          observer.unobserve(el);
          return;
        }
        el.textContent = Math.floor(current).toLocaleString('en-IN');
        requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
})();


/* ============================================================
   17. SMOOTH SECTION REVEAL (extra parallax feel)
============================================================ */
(function initSectionReveal() {
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(sec => {
    sec.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    sec.style.opacity    = "0";
    sec.style.transform  = "translateY(30px)";
    observer.observe(sec);
  });
})();


/* ============================================================
   18. TOAST NOTIFICATION SYSTEM
============================================================ */
function showToast(message, type = "info") {
  // Create container if needed
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.style.cssText = `
      position: fixed; top: 35px; right: 10px; z-index: 9999;
      display: flex; flex-direction: column; gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const icons = { success: "fa-check-circle", warning: "fa-triangle-exclamation", info: "fa-circle-info", error: "fa-circle-xmark" };
  const colors = { success: "#22C55E", warning: "#F59E0B", info: "#3B82F6", error: "#EF4444" };

  const toast = document.createElement("div");
  toast.style.cssText = `
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-left: 4px solid ${colors[type] || colors.info};
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.88rem;
    font-family: 'Poppins', sans-serif;
    color: var(--text-primary);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    max-width: 340px;
    pointer-events: all;
    transform: translateX(120%);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
  `;
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info}" style="color:${colors[type]};font-size:1.1rem;flex-shrink:0"></i>
    <span>${message}</span>`;

  toast.addEventListener("click", () => dismiss(toast));
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => { toast.style.transform = "translateX(0)"; });
  });

  const timer = setTimeout(() => dismiss(toast), 5000);

  function dismiss(el) {
    clearTimeout(timer);
    el.style.transform = "translateX(120%)";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 400);
  }
}
window.showToast = showToast;


/* ============================================================
   19. ACTIVE NAV HIGHLIGHT ON HASH CHANGE
============================================================ */
window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
});


/* ============================================================
   20. SMOOTH SCROLL for all internal anchor links
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


/* ============================================================
   21. ANNOUNCEMENT BAR – pause on hover
============================================================ */
(function initMarquee() {
  const track = document.querySelector(".announcement-track");
  if (!track) return;
  track.parentElement.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  track.parentElement.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
})();


/* ============================================================
   22. RITUAL CARDS – staggered entry
============================================================ */
(function initRitualCards() {
  const cards = document.querySelectorAll(".ritual-card");
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
  });
})();


/* ============================================================
   23. BACK-TO-TOP + DONATE FLOATING CTA VISIBILITY
============================================================ */
(function initFloatingCTA() {
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const curr = window.scrollY;
    const scrollTop = document.getElementById("scrollTop");
    const themeSwitcher = document.getElementById("themeSwitcher");

    if (scrollTop) {
      const show = curr > 400;
      scrollTop.classList.toggle("visible", show);
    }

    // Hide theme switcher when scrolling fast down
    if (themeSwitcher) {
      if (curr > lastScroll + 80) {
        themeSwitcher.style.transform = "translateX(80px)";
        themeSwitcher.style.opacity = "0.4";
      } else {
        themeSwitcher.style.transform = "translateX(0)";
        themeSwitcher.style.opacity = "1";
      }
    }
    lastScroll = curr;
  }, { passive: true });

  const themeSwitcher = document.getElementById("themeSwitcher");
  if (themeSwitcher) {
    themeSwitcher.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  }
})();


/* ============================================================
   24. IMAGE LAZY LOAD + ERROR FALLBACK
============================================================ */
(function initImageFallbacks() {
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", function () {
      this.src = `https://placehold.co/600x400/E8690A/ffffff?text=Chhath+Pooja+2025`;
    });
  });
})();


/* ============================================================
   25. PRINT SCHEDULE BUTTON (optional utility)
============================================================ */
(function initPrintSchedule() {
  // If a print button is ever added with id="printSchedule"
  const btn = document.getElementById("printSchedule");
  if (btn) btn.addEventListener("click", () => window.print());
})();


/* ============================================================
   26. INITIAL PAGE LOAD – welcome toast
============================================================ */
window.addEventListener("load", () => {
  setTimeout(() => {
    showToast("🙏 Welcome! Jai Chhathi Maiya – Mahil Gaila, Punjab");
  }, 2000);
});


/* ============================================================
   27. RESIZE HANDLER – re-init AOS on resize
============================================================ */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (typeof AOS !== "undefined") AOS.refresh();
  }, 300);
});



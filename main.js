// ============================================================
// CHHATH POOJA 2025 - MAIN.JS
// PART 1
// Preloader, AOS, Navbar, Mobile Menu,
// Scroll Top, Theme Switcher, Language Switcher,
// Countdown, Hero Particles
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    initAOS();
    initPreloader();
    initNavbar();
    initMobileMenu();
    initScrollTop();
    initThemeSwitcher();
    initLanguageSwitcher();
    initCountdown();
    initHeroParticles();

});

// ============================================================
// AOS INITIALIZATION
// ============================================================

function initAOS() {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 100
        });
    }
}

// ============================================================
// PRELOADER
// ============================================================

function initPreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            setTimeout(() => {
                preloader.remove();
            }, 500);

        }, 800);

    });

}

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================

function initNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }

        updateActiveNavLink();

    });

}

// ============================================================
// ACTIVE NAV LINKS
// ============================================================

function updateActiveNavLink() {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

}

// ============================================================
// MOBILE MENU
// ============================================================

function initMobileMenu() {

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });

}

// ============================================================
// SCROLL TO TOP
// ============================================================

function initScrollTop() {

    const scrollBtn = document.getElementById("scrollTop");

    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ============================================================
// THEME SWITCHER
// ============================================================

function initThemeSwitcher() {

    const toggleBtn = document.getElementById("themeToggleBtn");
    const panel = document.getElementById("themePanel");

    if (!toggleBtn || !panel) return;

    const savedTheme =
        localStorage.getItem("chhath-theme") || "saffron";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    document
        .querySelectorAll(".theme-option")
        .forEach(btn => {

            if (btn.dataset.theme === savedTheme) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }

        });

    toggleBtn.addEventListener("click", () => {
        panel.classList.toggle("show");
    });

    document.addEventListener("click", e => {

        if (
            !e.target.closest("#themeSwitcher")
        ) {
            panel.classList.remove("show");
        }

    });

    document
        .querySelectorAll(".theme-option")
        .forEach(option => {

            option.addEventListener("click", () => {

                const theme = option.dataset.theme;

                document.documentElement.setAttribute(
                    "data-theme",
                    theme
                );

                localStorage.setItem(
                    "chhath-theme",
                    theme
                );

                document
                    .querySelectorAll(".theme-option")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                option.classList.add("active");

            });

        });

}

// ============================================================
// LANGUAGE SWITCHER
// ============================================================

function initLanguageSwitcher() {

    const langButtons =
        document.querySelectorAll(".lang-btn");

    if (!langButtons.length) return;

    const savedLang =
        localStorage.getItem("site-language") || "en";

    switchLanguage(savedLang);

    langButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            const lang = btn.dataset.lang;

            switchLanguage(lang);

            localStorage.setItem(
                "site-language",
                lang
            );

        });

    });

}

function switchLanguage(lang) {

    document
        .querySelectorAll(".lang-btn")
        .forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.lang === lang
            );

        });

    document
        .querySelectorAll(".lang-en")
        .forEach(el => {

            el.style.display =
                lang === "en"
                    ? ""
                    : "none";

        });

    document
        .querySelectorAll(".lang-hi")
        .forEach(el => {

            el.style.display =
                lang === "hi"
                    ? ""
                    : "none";

        });

}

// ============================================================
// COUNTDOWN TIMER
// ============================================================

function initCountdown() {

    const daysEl =
        document.getElementById("cd-days");

    const hoursEl =
        document.getElementById("cd-hours");

    const minutesEl =
        document.getElementById("cd-minutes");

    const secondsEl =
        document.getElementById("cd-seconds");

    if (
        !daysEl ||
        !hoursEl ||
        !minutesEl ||
        !secondsEl
    ) return;

    const targetDate =
        new Date("2025-10-26T00:00:00").getTime();

    function updateCountdown() {

        const now = Date.now();

        const distance =
            targetDate - now;

        if (distance <= 0) {

            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";

            return;
        }

        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );

        daysEl.textContent =
            String(days).padStart(2, "0");

        hoursEl.textContent =
            String(hours).padStart(2, "0");

        minutesEl.textContent =
            String(minutes).padStart(2, "0");

        secondsEl.textContent =
            String(seconds).padStart(2, "0");

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

}

// ============================================================
// HERO PARTICLES
// ============================================================

function initHeroParticles() {

    const container =
        document.getElementById("heroParticles");

    if (!container) return;

    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.classList.add("particle");

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particle.style.animationDuration =
            6 + Math.random() * 8 + "s";

        container.appendChild(particle);

    }

}
// ============================================================
// MAIN.JS
// PART 2
// Events, Timeline, Committee
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    initEvents();
    initTimeline();
    initCommittee();

});

// ============================================================
// EVENTS SECTION
// ============================================================

function initEvents() {

    const grid =
        document.getElementById("eventsGrid");

    if (!grid || !window.SiteData) return;

    renderEvents("all");

    document
        .querySelectorAll(".tab-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                document
                    .querySelectorAll(".tab-btn")
                    .forEach(tab =>
                        tab.classList.remove("active")
                    );

                btn.classList.add("active");

                renderEvents(
                    btn.dataset.tab
                );

            });

        });

}

function renderEvents(filter) {

    const grid =
        document.getElementById("eventsGrid");

    if (!grid) return;

    const events =
        filter === "all"
            ? SiteData.events
            : SiteData.events.filter(
                  event =>
                      event.category === filter
              );

    grid.innerHTML = events
        .map(event => `
            <div class="event-card"
                 data-aos="fade-up">

                <div class="event-icon">
                    <i class="fas ${event.icon}"></i>
                </div>

                <div class="event-content">

                    <span class="event-category">
                        ${event.category}
                    </span>

                    <h3>
                        ${event.title}
                    </h3>

                    <p>
                        ${event.desc}
                    </p>

                    <div class="event-meta">

                        <span>
                            <i class="fas fa-calendar"></i>
                            ${event.date}
                        </span>

                        <span>
                            <i class="fas fa-clock"></i>
                            ${event.time}
                        </span>

                        <span>
                            <i class="fas fa-location-dot"></i>
                            ${event.venue}
                        </span>

                    </div>

                </div>

            </div>
        `)
        .join("");

    if (typeof AOS !== "undefined") {
        AOS.refresh();
    }

}

// ============================================================
// TIMELINE SECTION
// ============================================================

function initTimeline() {

    const container =
        document.getElementById("timelineItems");

    if (!container || !window.SiteData)
        return;

    container.innerHTML =
        SiteData.timeline
            .map(item => `
                <div class="timeline-item"
                     data-aos="fade-up">

                    <div class="timeline-icon">
                        <i class="fas ${item.icon}"></i>
                    </div>

                    <div class="timeline-content">

                        <span class="timeline-day">
                            ${item.day}
                        </span>

                        <h3>
                            ${item.name}
                        </h3>

                        <span class="timeline-time">
                            ${item.time}
                        </span>

                        <p>
                            ${item.desc}
                        </p>

                    </div>

                </div>
            `)
            .join("");

}

// ============================================================
// COMMITTEE SECTION
// ============================================================

function initCommittee() {

    const grid =
        document.getElementById(
            "committeeGrid"
        );

    if (!grid || !window.SiteData)
        return;

    grid.innerHTML =
        SiteData.committee
            .map(member => `
                <div class="committee-card"
                     data-aos="zoom-in">

                    <div class="committee-avatar">
                        ${member.emoji}
                    </div>

                    <h3>
                        ${member.name}
                    </h3>

                    <span class="committee-role">
                        ${member.role}
                    </span>

                    <p>
                        ${member.since}
                    </p>

                    <a href="tel:${member.phone}">
                        <i class="fas fa-phone"></i>
                        ${member.phone}
                    </a>

                </div>
            `)
            .join("");

}
// ============================================================
// MAIN.JS
// PART 4 (FINAL)
// Smooth Scroll, Keyboard Controls,
// Stats Counter, Utilities
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    initSmoothScroll();
    initStatsCounter();
    initKeyboardControls();
    initImageFallbacks();

});

// ============================================================
// SMOOTH SCROLL
// ============================================================

function initSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                e => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    e.preventDefault();

                    window.scrollTo({
                        top:
                            target.offsetTop - 80,
                        behavior: "smooth"
                    });

                }
            );

        });

}

// ============================================================
// ABOUT SECTION COUNTER
// ============================================================

function initStatsCounter() {

    const stats =
        document.querySelectorAll(
            ".stat-num"
        );

    if (!stats.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;

                    const el =
                        entry.target;

                    const target =
                        Number(
                            el.dataset.target
                        );

                    let current = 0;

                    const increment =
                        Math.max(
                            1,
                            Math.ceil(
                                target / 100
                            )
                        );

                    const timer =
                        setInterval(() => {

                            current +=
                                increment;

                            if (
                                current >= target
                            ) {

                                current =
                                    target;

                                clearInterval(
                                    timer
                                );

                            }

                            el.textContent =
                                current;

                        }, 20);

                    observer.unobserve(el);

                });

            },
            {
                threshold: 0.5
            }
        );

    stats.forEach(stat =>
        observer.observe(stat)
    );

}

// ============================================================
// KEYBOARD CONTROLS
// ============================================================

function initKeyboardControls() {

    document.addEventListener(
        "keydown",
        e => {

            const lightbox =
                document.getElementById(
                    "lightbox"
                );

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "show"
                )
            ) {
                return;
            }

            if (
                e.key === "Escape"
            ) {
                closeLightbox();
            }

            if (
                e.key === "ArrowLeft"
            ) {
                showPrevImage();
            }

            if (
                e.key === "ArrowRight"
            ) {
                showNextImage();
            }

        }
    );

}

// ============================================================
// IMAGE FALLBACK
// ============================================================

function initImageFallbacks() {

    document.addEventListener(
        "error",
        e => {

            const target =
                e.target;

            if (
                target.tagName === "IMG"
            ) {

                target.src =
                    "https://via.placeholder.com/600x400?text=Image+Unavailable";

            }

        },
        true
    );

}

// ============================================================
// WINDOW RESIZE
// ============================================================

window.addEventListener(
    "resize",
    () => {

        if (
            typeof AOS !== "undefined"
        ) {
            AOS.refresh();
        }

    }
);

// ============================================================
// PAGE VISIBILITY
// ============================================================

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            !document.hidden &&
            typeof AOS !== "undefined"
        ) {
            AOS.refresh();
        }

    }
);

// ============================================================
// CONSOLE MESSAGE
// ============================================================

console.log(
    "%c🙏 Jai Chhath Maiya 🙏",
    `
    color: orange;
    font-size: 20px;
    font-weight: bold;
    `
);

console.log(
    "Chhath Pooja 2025 - Mahil Gaila Website Loaded Successfully"
);

// ============================================================
// END OF MAIN.JS
// ============================================================
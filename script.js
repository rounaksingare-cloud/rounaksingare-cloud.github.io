
/* =========================================================
   ROUNAK SINGARE — PORTFOLIO INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const revealElements = document.querySelectorAll(".reveal");

  /* =========================
     PRELOADER
     ========================= */
  window.setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";

      window.setTimeout(() => {
        preloader.remove();
      }, 550);
    }
  }, 500);


  /* =========================
     HEADER ON SCROLL
     ========================= */
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });


  /* =========================
     MOBILE NAVIGATION
     ========================= */
  const closeMobileMenu = () => {
    if (!navToggle || !mainNav) return;

    navToggle.classList.remove("open");
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (!mainNav.classList.contains("open")) return;

      const target = event.target;

      if (
        target instanceof Node &&
        !mainNav.contains(target) &&
        !navToggle.contains(target)
      ) {
        closeMobileMenu();
      }
    });
  }


  /* =========================
     SCROLL REVEAL
     ========================= */
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }


  /* =========================
     ACTIVE NAVIGATION
     ========================= */
  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            const matches = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", matches);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }


  /* =========================
     SMOOTH INTERNAL LINKS
     ========================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* =========================
     SUBTLE HERO PARALLAX
     ========================= */
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY <= heroHeight * 1.15) {
        const movement = Math.min(scrollY * 0.08, 45);
        heroVisual.style.transform = `translateY(${movement}px)`;
      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }


  /* =========================
     HERO CARD MOUSE TILT
     ========================= */
  const visualCard = document.querySelector(".main-visual-card");

  if (visualCard && window.matchMedia("(pointer: fine)").matches) {
    visualCard.addEventListener("mousemove", (event) => {
      const rect = visualCard.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 7;
      const rotateX = ((y / rect.height) - 0.5) * -5;

      visualCard.style.transform =
        `perspective(1100px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-3px)`;
    });

    visualCard.addEventListener("mouseleave", () => {
      visualCard.style.transform =
        "perspective(1100px) rotateY(-6deg) rotateX(3deg)";
    });
  }


  /* =========================
     KEYBOARD ACCESSIBILITY
     ========================= */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
});

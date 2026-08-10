(() => {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = year;
  });

  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");

  const closeMenu = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.95) {
        element.classList.add("is-visible");
      } else {
        observer.observe(element);
      }
    });
    document.body.classList.add("reveal-ready");
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }
})();

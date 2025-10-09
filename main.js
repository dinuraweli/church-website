// ✅ AOS Animation
AOS.init({
  duration: 800,     // Animation duration in ms
  once: false,       // Trigger every time you scroll back
  offset: 100,       // Distance before element enters viewport
  easing: 'ease-in-out',
});

// ✅ Scroll Effect on Header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) { // make sure header exists
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// ✅ Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("navMenu");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});

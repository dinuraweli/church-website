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
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('navMenu');

// Toggle menu on click
menuToggle.addEventListener('click', (event) => {
  event.stopPropagation(); // prevent click bubbling to document
  navMenu.classList.toggle('open');
});

// Close when clicking outside
document.addEventListener('click', (event) => {
  if (navMenu.classList.contains('open') && !navMenu.contains(event.target) && event.target !== menuToggle) {
    navMenu.classList.remove('open');
  }
});

// Optional: Close with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
  }
});


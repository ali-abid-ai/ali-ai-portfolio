// Site configuration: add a professional email address here when you are ready.
const CONTACT_EMAIL = "";

const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mobile navigation
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Theme preference
try {
  if (localStorage.getItem("portfolio-theme") === "light") body.classList.add("light");
} catch {
  // The site still works if browser storage is unavailable.
}
themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light");
  try {
    localStorage.setItem("portfolio-theme", body.classList.contains("light") ? "light" : "dark");
  } catch {
    // Theme switching remains available for the current page session.
  }
});

// Small role rotation; disabled for visitors who prefer reduced motion.
const roleText = document.getElementById("roleText");
const roles = ["AI Engineer", "Software Developer", "Problem Solver"];
if (roleText && !reducedMotion) {
  let roleIndex = 0;
  window.setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.textContent = roles[roleIndex];
  }, 2600);
}

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Optional email link. It remains hidden until CONTACT_EMAIL is configured.
const emailLink = document.getElementById("emailLink");
const emailNote = document.getElementById("emailNote");
if (emailLink && CONTACT_EMAIL.trim()) {
  emailLink.href = `mailto:${CONTACT_EMAIL.trim()}`;
  emailLink.hidden = false;
  if (emailNote) emailNote.hidden = true;
}

document.getElementById("year").textContent = new Date().getFullYear();

// Enable scroll-reveal styling only after this script has initialized successfully.
// If JavaScript is unavailable or fails to load, all page content stays visible.
document.documentElement.classList.add("js-enabled");

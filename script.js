const menuToggle = document.querySelector(".menu-toggle");
const headerActions = document.querySelector(".header-actions");
const navLinks = document.querySelectorAll(".site-nav a");
const yearTarget = document.querySelector("#year");

if (menuToggle && headerActions) {
  menuToggle.addEventListener("click", () => {
    const isOpen = headerActions.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerActions.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

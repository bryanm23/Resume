(function () {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  menuToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("site-nav--open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("site-nav--open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  document.querySelector(".contact__form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your inquiry. A member of our team will be in touch shortly.");
    e.target.reset();
  });
})();

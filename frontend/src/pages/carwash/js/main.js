(function () {
  const topbar = document.getElementById("topbar");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  window.addEventListener("scroll", function () {
    topbar.classList.toggle("topbar--solid", window.scrollY > 60);
  });

  menuToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("topbar__links--open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("topbar__links--open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  document.querySelector(".visit__form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Welcome to BlueStream! Your unlimited pass will be ready at the member lane.");
    e.target.reset();
  });
})();

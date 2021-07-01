const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");
const modal = document.getElementById("agegate-modal");

menu.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

window.addEventListener("load", (e) => {
  setTimeout(function () {
    modal.style.display = "block";
  }, 2000);
});

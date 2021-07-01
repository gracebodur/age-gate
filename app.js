class App {
  constructor() {
    this.$menu = document.querySelector("#mobile-menu");
    this.$menuLinks = document.querySelector(".nav-menu");
    this.$modal = document.getElementById("agegate-modal");

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("load", () => {
        this.$modal.style.display = "block";
    });

    this.$menu.addEventListener("click", () => {
      this.$menu.classList.toggle("is-active");
      this.$menuLinks.classList.toggle("active");
    });
  }
}

new App();

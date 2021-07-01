class App {
  constructor() {
    this.$menu = document.querySelector("#mobile-menu");
    this.$menuLinks = document.querySelector(".nav-menu");
    this.$modal = document.getElementById("agegate-modal");
    this.$form = document.getElementById("form");
    this.$month = document.getElementById("month");
    this.$day = document.getElementById("day");
    this.$year = document.getElementById("year");
    this.$verify = document.getElementById("verify");

    this.addEventListeners();
    this.monthInput()
    this.dayInput()
    this.yearInput()
  }

  addEventListeners() {
    window.addEventListener("load", () => {
      this.$modal.style.display = "block";
    });

    document.body.addEventListener("click", (e) => {
      this.monthInput(e);
      this.dayInput(e);
      this.yearInput(e);
    });

    this.$menu.addEventListener("click", () => {
      this.$menu.classList.toggle("is-active");
      this.$menuLinks.classList.toggle("active");
    });
  }

  monthInput() {
    const $selectedMonth = this.$month.value;
    console.log("month:", $selectedMonth);
  }

  dayInput() {
    const $selectedDay = this.$day.value
    console.log("day:", $selectedDay);
  }

  yearInput() {
    const $typedYear = this.$year.value
    console.log("year:", $typedYear);
  }
}

new App();

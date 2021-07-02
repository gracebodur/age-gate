const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");
const modal = document.getElementById("agegate-modal");
const form = document.getElementById("form");
const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const enter = document.getElementById("enter");
const message = document.getElementById("message");
const todaysDate = new Date();
const thisYear = todaysDate.getFullYear();
const thisMonth = todaysDate.getMonth();
const thisDay = todaysDate.getDay();
const requiredAge = 21;

let verified;

// -------------EVENT LISTENERS---------------------------
window.addEventListener("load", () => {
  setTimeout(function () {
    modal.style.display = "block";
  }, 0000);
});

menu.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ageVerification();
});

enter.addEventListener("submit", (e) => {
  e.preventDefault();
  ageVerification();
});

month.addEventListener("keyup", ageVerification);
day.addEventListener("keyup", ageVerification);
year.addEventListener("keyup", ageVerification);

const isRequiredAge = (month = "MM", day = "DD", year = "YYYY") =>
  new Date(year + requiredAge, month - 1, day) <= new Date();

function removeModal() {
  const myModal = setTimeout(() => {
    modal.style.display = "none";
  }, 5000);
}

function showModal() {
  clearTimeout(myModal);
}

function ageVerification() {
  let monthValue = parseFloat(month.value);
  let dayValue = parseFloat(day.value);
  let yearValue = parseFloat(year.value);
  let userAge = Math.abs(yearValue - thisYear);
  let query = isRequiredAge(monthValue, dayValue, yearValue);

  /*-------VALUE LOGS-------------------*/
  monthValue ? console.log(`Month selected ${monthValue}`) : "";
  dayValue ? console.log(`Day selected ${dayValue}`) : "";
  yearValue ? console.log(`Year typed ${yearValue}`) : "";
  userAge ? console.log(`You are ${userAge} years old`) : "";

  if (userAge < requiredAge) {
    message.innerHTML = `Sorry, please come back when you're ${requiredAge}`;
    showModal();
  } else if (userAge >= requiredAge) {
    message.innerHTML = "Enjoy your visit!";
    removeModal();
  } else if (monthValue == thisMonth && dayValue == thisDay) {
    message.innerHTML = "Happy Birthday!";
  } else {
    message.innerHTML = "You must be of legal drinking age to enter this site.";
    successChecker(query);
  }
}

function successChecker(e) {
  if (e) {
    verified = true;
    rememberMeCheck();
  } else {
    verified = false;
    rememberMeCheck();
  }
}

/* CHECKS FOR REMEMBER ME SELECTION */
function rememberMeCheck() {
  let wantsACookie = document.getElementById("rememberMe").checked;
  if (wantsACookie && verified) {
    document.cookie = "verified";
  } else if (wantsACookie && !verified) {
    document.cookie = "notVerified";
  }
}

/* CHECKS FOR COOKIES ON SITE LOAD */
function cookieCheck() {
  if (document.cookie === "verified") {
    successChecker(true);
    console.log(`Cookie checked`);
  } else if (document.cookie === "notVerified") {
    successChecker(false);
    console.log("no cookies found");
  }
}

document.onload = cookieCheck();
//------------GLOBAL VARIABLES----------------------
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");
const modal = document.getElementById("agegate-modal");
const form = document.getElementById("form");
const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const enter = document.getElementById("enter");
const message = document.getElementById("message");
const header = document.getElementById("hide");
const navbar = document.getElementById("nav-wrapper");
const modalImg = document.getElementById("modal-img");
const bannerBtn = document.getElementById("banner-btn");
const errorTitle = document.getElementById("message-title");
const errorSubtitle = document.getElementById("message-subtitle");

const todaysDate = new Date();
const thisYear = todaysDate.getFullYear();
const thisMonth = todaysDate.getMonth() + 1;
const thisDay = todaysDate.getDay() + 4;
const requiredAge = 21;

const items = document.querySelectorAll(".item");
const controls = document.querySelectorAll(".control");
const headerItems = document.querySelectorAll(".item-header");
const descriptionItems = document.querySelectorAll(".item-description");
const activeDelay = 0.76;
const interval = 5000;

let current = 0;

let verified;

//------------END OF GLOBAL VARIABLES--------------------

// -------------EVENT LISTENERS---------------------------
window.addEventListener("load", () => {
  setTimeout(function () {
    modal.style.display = "block";
  }, 0000);
  header.style.display = "none";
  console.log(thisMonth, thisDay, thisYear);
});

menu.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  ageVerification();
  checkInputLength(month, 2, 12);
  checkInputLength(day, 2, 31);
  checkInputLength(year, 4, 2025);
});

enter.addEventListener("submit", (e) => {
  e.preventDefault();

  ageVerification();
  checkInputLength(month, 2, 12);
  checkInputLength(day, 2, 31);
  checkInputLength(year, 4, 2025);
});

month.addEventListener("keyup", ageVerification);
day.addEventListener("keyup", ageVerification);
year.addEventListener("keyup", ageVerification);

// -------------END OF EVENT LISTENERS---------------------------

const isRequiredAge = (month = "MM", day = "DD", year = "YYYY") =>
  new Date(year + requiredAge, month - 1, day) <= new Date();

// -------------AGE VALIDATION---------------------------
function ageVerification() {
  let monthValue = parseInt(month.value);
  let dayValue = parseInt(day.value);
  let yearValue = parseInt(year.value);
  let userAge = Math.abs(yearValue - thisYear);
  let query = isRequiredAge(monthValue, dayValue, yearValue);

  /*-------VALUE LOGS-------------------*/
  monthValue ? console.log(`Month selected ${monthValue}`) : "";
  dayValue ? console.log(`Day selected ${dayValue}`) : "";
  yearValue ? console.log(`Year typed ${yearValue}`) : "";
  userAge ? console.log(`You are ${userAge} years old`) : "";

  if (userAge < requiredAge && yearValue >= thisYear) {
    modal.style.display = "none";
    errorTitle.innerHTML = "Sorry, ";
    errorSubtitle.innerHTML = `you must be ${requiredAge} or older to view this site.`;
    bannerBtn.style.display = "none";
    navbar.style.display = "none";
  } else if (userAge >= requiredAge) {
    setTimeout(() => {
      modal.style.display = "none";
    }, 2000);
    setTimeout(() => {
      header.style.display = "initial";
    }, 2500);
  } else if (monthValue == thisMonth && dayValue == thisDay) {
    message.innerHTML = "Happy Birthday!";
    message.style.fontWeight = "800";
    message.style.fontSize = "1.5rem";
    message.style.color = "#026920";
    modalImg.src = "assets/bday.jpg";
  } else {
    message.innerHTML = "You must be of legal drinking age to enter this site.";
    successChecker(query);
    checkRequired([month, day, year]);
  }
}

// -------------SHOW ERROR---------------------------
function showError(input, messages) {
  const formValidation = input.parentElement;
  formValidation.className = "form-validation error";

  const errorMessage = formValidation.querySelector("p");
  errorMessage.innerHTML = messages;
}

// -------------SHOW VALID---------------------------
function showValid(input) {
  const formValidation = input.parentElement;
  formValidation.className = "form-validation valid";
}

function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

// -------------CHECK REQUIRED FIELDS-----------------------
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showValid(input);
    }
  });
}

// -------------CHECK INPUT LENGTH-----------------------
function checkInputLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName} must be less than ${max} characters`);
  } else {
    showValid(input);
  }
}

// -------------ADD ABOOLENA VALUE TO VERIFIED-----------------------
function successChecker(e) {
  if (e) {
    verified = true;
    rememberMeCheck();
  } else {
    verified = false;
    rememberMeCheck();
  }
}

// -------------CHECKS FOR REMEMBER ME SELECTION-------------
function rememberMeCheck() {
  let wantsACookie = document.getElementById("rememberMe").checked;
  if (wantsACookie && verified) {
    document.cookie = "verified";
  } else if (wantsACookie && !verified) {
    document.cookie = "notVerified";
  }
}

// -------------CHECKS FOR COOKIES ON SITE LOAD-------------
function cookieCheck() {
  if (document.cookie === "verified") {
    successChecker(true);
    console.log(`Cookie checked`);
  } else if (document.cookie === "notVerified") {
    successChecker(false);
    console.log("no cookies found");
  }
}

// -------------SLIDESHOW-------------
const slider = {
  init: () => {
    controls.forEach((control) =>
      control.addEventListener("click", (e) => {
        slider.clickedControl(e);
      })
    );
    controls[current].classList.add("active");
    items[current].classList.add("active");
  },
  nextSlide: () => {
    // Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add("active");
    items[current].classList.add("active");
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: (e) => {
    // Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
      dataIndex = Number(control.dataset.index);

    control.classList.add("active");
    items.forEach((item, index) => {
      if (index === dataIndex) {
        // Add active class to corresponding slide
        item.classList.add("active");
      }
    });
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => {
    // Remove active classes
    items.forEach((item) => item.classList.remove("active"));
    controls.forEach((control) => control.classList.remove("active"));
  },
  transitionDelay: (items) => {
    // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;

    items.forEach((item) => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
        delay;

      item.classList.value === "item-header"
        ? (seconds = 0.015)
        : (seconds = 0.007);

      children.forEach((child) => {
        // iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains("active")
            ? (delay = count * seconds + activeDelay)
            : (delay = count * seconds);
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      });
    });
  },
};

let intervalF = setInterval(slider.nextSlide, interval);
slider.init();

document.onload = cookieCheck();

// (function init() {
//   initInputValidation();
//   initSearchButton();
//   printHii();
// })();
// const btn = document.getElementById("email-btn");
// console.log(btn);
// btn.addEventListener("click", printHii);

const email_btn = document.getElementById("email-btn");
email_btn.onclick = (e) => {
  const emailInput = document.getElementById("email-search-input");
  // console.log(emailInput);
  emailInput.placeholder = "Enter Your Email Address";
  emailInput.type = "email";
  email_btn.classList.add("active");
  email_btn.classList.remove("inactive");
  phone_btn.classList.add("inactive");
  phone_btn.classList.remove("active");
};

const phone_btn = document.getElementById("phone-btn");
phone_btn.onclick = (e) => {
  const phoneInput = document.getElementById("email-search-input");
  // console.log(emailInput);
  phoneInput.placeholder = "Enter Your Phone Number";
  phoneInput.type = "tel";
  phone_btn.classList.add("active");
  phone_btn.classList.remove("inactive");
  email_btn.classList.add("inactive");
  email_btn.classList.remove("active");
};

const main_form = document.getElementById("main-form");
// const go_btn = document.getElementById("go-btn");
const searchAgain = document.getElementById("search-again");
const result = document.getElementById("results");
main_form.onsubmit = initInputValidation();
function flow() {
  e.preventDefault();
  const pageLoader = document.getElementById("pageLoader");
  pageLoader.classList.remove("hidden");
  pageLoader.classList.add("loader");
  pageLoader.scrollIntoView();
  setTimeout(() => {
    pageLoader.classList.remove("loader");
    pageLoader.classList.add("hidden");
    searchAgain.classList.remove("hidden");
    result.classList.remove("hidden");
    const email_btn = document.getElementById("email-again-btn");
    email_btn.onclick = (e) => {
      const emailInput = document.getElementById("email-search-again-input");
      // console.log(emailInput);
      emailInput.placeholder = "Enter Your Email Address";
      emailInput.type = "email";
      email_btn.classList.add("active");
      email_btn.classList.remove("inactive");
      phone_btn.classList.add("inactive");
      phone_btn.classList.remove("active");
    };

    const phone_btn = document.getElementById("phone-again-btn");
    phone_btn.onclick = (e) => {
      const phoneInput = document.getElementById("email-search-again-input");
      // console.log(emailInput);
      phoneInput.placeholder = "Enter Your Phone Number";
      phoneInput.type = "tel";
      phone_btn.classList.add("active");
      phone_btn.classList.remove("inactive");
      email_btn.classList.add("inactive");
      email_btn.classList.remove("active");
    };
  }, 4000);
}

function initInputValidation() {
  console.log("hii");
  document.querySelectorAll('input[type="email"]').forEach(function (input) {
    input.addEventListener("keypress", function (event) {
      const email = input.value.toLowerCase();
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        var x = true;
        input.parentNode.classList.remove("error");
      } else {
        var x = false;
      }
      const keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == "13") {
        event.preventDefault();
        localStorage.clear();

        if (x === true) {
          const proxyurl = "";
          const url =
            "https://ltvdataapi.devltv.co/api/v1/records?email=" + email;
          fetch(proxyurl + url)
            .then(function (response) {
              console.log(response);
              return response.text();
            })
            .then(function (contents) {
              localStorage.setItem("userObject", contents);
              showResultsSection();
            })
            .catch(function (e) {
              console.log(e);
            })
            .finally(flow());
        } else if (x !== true) {
          input.parentNode.classList.add("error");
        }
      }
    });
  });
}

function initSearchButton() {
  document.querySelectorAll(".js-btn-search").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.clear(); // Clears storage for next request
      const selector = e.currentTarget.dataset.form;
      const emailInput = document.getElementById(`email-${selector}-input`);
      const email = emailInput.value.toLowerCase();

      let x;
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        x = true;
      } else {
        x = false;
      }

      if (x === true) {
        emailInput.parentNode.classList.remove("error");
        const proxyurl = "";
        const url =
          "https://ltvdataapi.devltv.co/api/v1/records?email=" + email;
        fetch(proxyurl + url)
          .then(function (response) {
            console.log("hii");
            return response.text();
          })
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            showResultsSection();
          })
          .catch(function (e) {
            console.log(e);
          });
      } else if (x !== true) {
        emailInput.parentNode.classList.add("error");
      }
    });
  });
}

function populateResultsData() {
  const pageLoader = document.getElementById("pageLoader");
  pageLoader.classList.remove("hidden");
  pageLoader.classList.add("loader");
  pageLoader.scrollIntoView();
  setTimeout(() => {
    pageLoader.classList.remove("loader");
    pageLoader.classList.add("hidden");
    searchAgain.classList.remove("hidden");
    result.classList.remove("hidden");
    const email_btn = document.getElementById("email-again-btn");
    email_btn.onclick = (e) => {
      const emailInput = document.getElementById("email-search-again-input");
      // console.log(emailInput);
      emailInput.placeholder = "Enter Your Email Address";
      emailInput.type = "email";
      email_btn.classList.add("active");
      email_btn.classList.remove("inactive");
      phone_btn.classList.add("inactive");
      phone_btn.classList.remove("active");
    };

    const phone_btn = document.getElementById("phone-again-btn");
    phone_btn.onclick = (e) => {
      const phoneInput = document.getElementById("email-search-again-input");
      // console.log(emailInput);
      phoneInput.placeholder = "Enter Your Phone Number";
      phoneInput.type = "tel";
      phone_btn.classList.add("active");
      phone_btn.classList.remove("inactive");
      email_btn.classList.add("inactive");
      email_btn.classList.remove("active");
    };
  }, 4000);
  // document.getElementById("results").scrollIntoView();

  if (window.localStorage) {
    if (localStorage.userObject) {
      const user_object = localStorage.getItem("userObject");
      let testVar;
      const retreivedObject = JSON.parse(user_object); //parses the retrieved object into an JSON object
      if (JSON.stringify(retreivedObject) == "[]") {
        document.getElementById("result-count").textContent = "0 Results";
        document.querySelector(".result-desc").textContent =
          "Try starting a new search below";
        document.querySelector(".js-result-wrap").classList.add("d-none");
        document.getElementById("result-card").classList.add("hidden");
      } else {
        document.getElementById("result-card").classList.remove("hidden");
        document.getElementById("result-count").textContent = "1 Result";
        document.getElementById("result-subtext").innerHTML =
          "Look at the result below to see the details of the person you’re searched for.";
        document.querySelector(".name").innerHTML =
          retreivedObject.first_name + " " + retreivedObject.last_name;
        document.querySelector(".user-description").innerHTML =
          retreivedObject.description;
        document.getElementById("address").innerHTML =
          "<p>" + retreivedObject.address + "</p>";
        document.querySelector(".email").innerHTML =
          "<p>" + retreivedObject.email + "</p>";

        document.querySelector(".phone-num").innerHTML = "";
        document.querySelector(".relatives").innerHTML = "";
        for (const phone_number in retreivedObject.phone_numbers) {
          const phone = retreivedObject.phone_numbers[phone_number];
          const formatted_phone =
            "(" +
            phone.substring(0, 3) +
            ") " +
            phone.substring(3, 6) +
            "-" +
            phone.substring(6, 10);

          document.querySelector(".phone-num").innerHTML +=
            "<a href='tel:" +
            phone +
            "' style='display: block;color: #004A80;'>" +
            formatted_phone +
            "</a>";
        }

        for (const relative in retreivedObject.relatives) {
          document.querySelector(".relatives").innerHTML +=
            "<p style='margin-bottom: 0'>" +
            retreivedObject.relatives[relative] +
            "</p>";
        }

        document.querySelector(".js-result-wrap").classList.remove("d-none");
      }
    }
  }
}

function showResultsSection() {
  const mainFormSection = document.getElementById("main-form");
  const searchAgainSection = document.getElementById("search-again");
  const featuresSection = document.getElementById("features");
  const resultsSection = document.getElementById("results");

  populateResultsData();

  mainFormSection.classList.add("d-none");
  featuresSection.classList.add("d-none");
  searchAgainSection.classList.remove("d-none");
  resultsSection.classList.remove("d-none");
}

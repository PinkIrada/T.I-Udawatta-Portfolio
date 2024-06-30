
/*Index Page Banner Text */
$(document).ready(function () {
  $(".banner-text").hide().fadeIn(2000);

});

/*Menu Item Button */
var menu = document.querySelector("#menu-button");
var navMenu = document.querySelector('.navlinks');

menu.addEventListener("click", mobileMenu);

function mobileMenu() {
  menu.classList.toggle("fa-window-close");
  navMenu.classList.toggle("open")
}

const navlink = document.querySelectorAll(".nav-link");

navlink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
  menu.classList.remove("active");
  navMenu.classList.remove("active");
}

var urlmenu = document.querySelector('.navlinks');
urlmenu.onchange = function () {
  window.location = this.options[this.selectedIndex].value;
};

/*Contact Form */
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const phone = document.getElementById("contact");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const note = document.getElementById("message");

function sendEmail() {
  Email.send({
    SecureToken: "da918ce3-b75a-4805-a239-3b9d1da2acb0",
    To: 'thithiiru@gmail.com',
    From: email.value,
    Subject: subject.value,
    Body: "Full Name: " + fullName.value
      + "<br> Email: " + email.value
      + "<br> Phone Number: " + phone.value
      + "<br> Message: " + note.value
  }).then(
    message => {
      if (message == "OK") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success"
        })
      }
    }
  );
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      }
      else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    })
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTextEmail = document.querySelector(".error-text.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTextEmail.innerHTML = "Enter a valid email address";
    }
    else {
      errorTextEmail.innerHTML = "Email is required"
    }
  }
  else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

if (form != null) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") &&
      !phone.classList.contains("error") && !subject.classList.contains("error") &&
      !note.classList.contains("error")) {
      sendEmail();

      form.reset();
      return false;
    }
  });
}

/* ================= NAVBAR + HAMBURGER ================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});


/* ================= REQUEST TO CONNECT – FORM SUBMIT ================= */

const connectForm = document.getElementById("connectForm");

if (connectForm) {
  connectForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("role", document.getElementById("role").value);
    formData.append("name", document.getElementById("fullName").value);
    formData.append("city", document.getElementById("city").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("requirement", document.getElementById("requirement").value);

    fetch("https://script.google.com/macros/s/AKfycbxLNToEkL0SEDjnW3LbqvAj60cLAS5Z90US7Httnj8rWKdHBZTI5ucp6OEnkyVJqynrhQ/exec", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "success") {
          alert("Thank you! We’ll get in touch shortly.");
          connectForm.reset();
        } else if (res.status === "duplicate") {
          alert("This request already exists.");
        } else {
          alert("Submission failed.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Something went wrong.");
      });
  });
}

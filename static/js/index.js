// Select element function
const selectElement = (element) =>
  document.querySelector(element);
const getAllWithClass = (className) =>
  document.getElementsByClassName(className);

const
  body = selectElement('body'),
  // Converts the returned collection to a proper Array
  navLinks = Array.from(getAllWithClass("nav-link"));

// Close menu on .nav-link click
navLinks.forEach(link => { // The Array method `forEach` loops through
  link.addEventListener('click', function() {
    document.getElementById("check").checked = false;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const navIcon1 = document.getElementById("nav-icon");
  navIcon1.addEventListener("click", function() {
    navIcon1.classList.toggle("open");
  });
});
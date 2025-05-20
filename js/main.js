const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navLinks.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});



// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  });
}
);
// Form validation

const form = document.getElementById('bookingForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // stop form submitting for validation

    // Clear previous errors (if you want to show errors differently, adjust this)
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(e => e.remove());

    let isValid = true;

    // Helper to show error message after input
    function showError(input, message) {
      isValid = false;
      const error = document.createElement('div');
      error.className = 'error-message';
      error.style.color = 'red';
      error.style.fontSize = '0.85rem';
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
    }

    // Validate Name
    const name = form.name;
    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
    }

    // Validate Email
    const email = form.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'Please enter your email.');
    } else if (!emailRegex.test(email.value)) {
      showError(email, 'Please enter a valid email address.');
    }

    // Validate Pickup Location
    const pickup = form['pickup-location'];
    if (!pickup.value.trim()) {
      showError(pickup, 'Please enter the pickup location.');
    }

    // Validate Dropoff Location
    const dropoff = form['dropoff-location'];
    if (!dropoff.value.trim()) {
      showError(dropoff, 'Please enter the dropoff location.');
    }

    // Validate Date (not empty and not past)
    const date = form.date;
    if (!date.value) {
      showError(date, 'Please select a date.');
    } else {
      const selectedDate = new Date(date.value);
      const today = new Date();
      today.setHours(0,0,0,0); // reset time to midnight
      if (selectedDate < today) {
        showError(date, 'Date cannot be in the past.');
      }
    }

    if (isValid) {
      // All validations passed, submit the form
      form.submit();
    }
  });
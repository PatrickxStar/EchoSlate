// Add smooth scrolling or any other JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Example: Smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    for (let link of links) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  });
  
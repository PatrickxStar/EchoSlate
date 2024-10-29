document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      console.log('Dark mode enabled'); // Debugging log
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
      console.log('Dark mode disabled'); // Debugging log
    }
  
    darkModeToggle.addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
      sunIcon.classList.toggle('hidden');
      moonIcon.classList.toggle('hidden');
  
      if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        console.log('Dark mode activated');
      } else {
        localStorage.setItem('theme', 'light');
        console.log('Dark mode deactivated');
      }
    });
  });
  
// Loader
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
  console.log('Portfolio page loaded');
});

// Profile Image Check
document.querySelectorAll('img').forEach(img => {
  if (img.classList.contains('profile-img')) {
    img.addEventListener('load', () => console.log('Profile image loaded successfully'));
    img.addEventListener('error', () => console.error('Profile image failed to load'));
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (name && email && message && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Message sent! (Mock submission)');
    e.target.reset();
  } else {
    alert('Please fill all fields correctly.');
  }
});

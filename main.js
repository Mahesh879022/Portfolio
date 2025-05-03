// WebGL Background with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-bg').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);
camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
  body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', body.dataset.theme);
  themeToggle.innerHTML = body.dataset.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  material.color.setHex(body.dataset.theme === 'dark' ? 0x60a5fa : 0x3b82f6);
});

// Load Theme
if (localStorage.getItem('theme') === 'dark') {
  body.dataset.theme = 'dark';
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  material.color.setHex(0x60a5fa);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Loader
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
});

// Lazy Loading and Profile Image Check
document.querySelectorAll('img').forEach(img => {
  img.setAttribute('loading', 'lazy');
  if (img.classList.contains('profile-img')) {
    img.addEventListener('load', () => console.log('Profile image loaded successfully'));
    img.addEventListener('error', () => console.error('Profile image failed to load'));
  }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
});

// Project Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    gsap.to('.project-card', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        document.querySelectorAll('.project-card').forEach(card => {
          card.style.display = filter === 'all' || card.dataset.category.includes(filter) ? 'block' : 'none';
        });
        gsap.fromTo('.project-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
      }
    });
  });
});

// Modal Functionality
document.querySelectorAll('.project-details, .preview-resume').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    gsap.from(modal.querySelector('.modal-content'), { y: -50, opacity: 0, duration: 0.5 });
  });
});
document.querySelectorAll('.modal .close').forEach(close => {
  close.addEventListener('click', () => {
    close.closest('.modal').style.display = 'none';
  });
});
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

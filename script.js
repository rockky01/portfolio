document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check for saved theme or use dark as default
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add a quick animation effect on toggle
    themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 500);
  });

  // Sticky Header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Reveal Animations on Scroll
  const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  };

  window.addEventListener('scroll', reveal);
  reveal(); // Initial check

  // Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('mobile-active');
    menuToggle.classList.toggle('active');

    // Animate burger to X
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    }
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Contact Form Handling with EmailJS
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;

    // IMPORTANT: In 3 values ko apne EmailJS Dashboard se verify karke yahan likhein
    const SERVICE_ID = 'service_u9mx00o'; // Dashboard -> Email Services tab se copy karein
    const TEMPLATE_ID = 'template_pa00aei';
    const PUBLIC_KEY = 'DphkarqAnFmHYBtud';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => {
        showStatus('Message sent successfully!', 'success');
        contactForm.reset();
      }, (error) => {
        console.error('EmailJS Error Details:', error);
        // Agar "Account not found" aata hai, toh PUBLIC_KEY galat hai
        showStatus(`Error: ${error.text || 'Failed to send'}`, 'error');
      })
      .finally(() => {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
      });
  });

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    formStatus.style.color = type === 'success' ? '#10b981' : '#f43f5e';

    showToast(message);

    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Parallax Effect for iPhone Mockup
  document.addEventListener('mousemove', (e) => {
    const iphone = document.querySelector('.iphone-frame');
    if (!iphone) return;

    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    iphone.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Reset iPhone transform when mouse leaves
  document.querySelector('.hero-visual').addEventListener('mouseleave', () => {
    const iphone = document.querySelector('.iphone-frame');
    if (!iphone) return;
    iphone.style.transition = 'all 0.5s ease';
    iphone.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });

  document.querySelector('.hero-visual').addEventListener('mouseenter', () => {
    const iphone = document.querySelector('.iphone-frame');
    if (!iphone) return;
    iphone.style.transition = 'none';
  });
});
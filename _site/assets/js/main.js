// ARTIZAN - Main JavaScript
// NikeLab × Cyberpunk × Creative Agency

(function() {
  'use strict';

  // Smooth scroll behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide/show header on scroll
      if (currentScroll > lastScroll && currentScroll > 300) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });
  }

  // Remove all scroll animations - static dense layout
  // All content is immediately visible for maximum information density

  // Glitch effect on hover for hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.dataset.text = heroTitle.textContent;
    heroTitle.classList.add('glitch-effect');
  }

  // Active navigation highlighting
  const currentPath = window.location.pathname;
  document.querySelectorAll('.site-nav .page-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // No parallax effects - static technical layout

  // Mouse follower for enhanced interactivity
  const createMouseFollower = () => {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 1px solid var(--color-gold);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      opacity: 0;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      follower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      follower.style.opacity = '0';
    });

    // Animate follower
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      follower.style.left = followerX - 10 + 'px';
      follower.style.top = followerY - 10 + 'px';

      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Expand on hover over interactive elements
    document.querySelectorAll('a, button, .service-card, .portfolio-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width = '40px';
        follower.style.height = '40px';
        follower.style.borderColor = 'var(--color-pink)';
      });

      el.addEventListener('mouseleave', () => {
        follower.style.width = '20px';
        follower.style.height = '20px';
        follower.style.borderColor = 'var(--color-gold)';
      });
    });
  };

  // Enable mouse follower only on desktop
  if (window.innerWidth > 1024) {
    createMouseFollower();
  }

  // Add stagger animation to grid items
  const staggerElements = () => {
    document.querySelectorAll('.services-grid > *, .portfolio-grid > *').forEach((el, index) => {
      el.dataset.delay = index * 100;
    });
  };
  staggerElements();

  // Technical measurement overlay
  const addTechnicalMeasurements = () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && !heroSection.querySelector('.technical-measurements')) {
      const measurements = document.createElement('div');
      measurements.className = 'technical-measurements';
      measurements.innerHTML = `
        <div class="measure-line measure-h" style="top: 25%; left: 5%; width: 300px;">
          <span class="measure-text">847.2px</span>
        </div>
        <div class="measure-line measure-v" style="left: 15%; top: 20%; height: 200px;">
          <span class="measure-text">432.1px</span>
        </div>
      `;
      heroSection.appendChild(measurements);
    }
  };
  addTechnicalMeasurements();

})();
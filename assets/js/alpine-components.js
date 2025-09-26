// ARTIZAN - Alpine.js Components
// Street Baroque Systems with Alpine.js

// Initialize Alpine components before Alpine starts
document.addEventListener('alpine:init', () => {

  // Header Component - Scroll effects and mobile navigation
  Alpine.data('header', () => ({
    scrolled: false,
    lastScroll: 0,
    hidden: false,
    mobileMenuOpen: false,

    init() {
      // Set initial scroll state
      this.handleScroll();

      // Add scroll listener
      window.addEventListener('scroll', () => this.handleScroll());

      // Set active navigation
      this.setActiveNav();
    },

    handleScroll() {
      const currentScroll = window.pageYOffset;

      // Add scrolled class
      this.scrolled = currentScroll > 100;

      // Hide/show header on scroll
      if (currentScroll > this.lastScroll && currentScroll > 300) {
        this.hidden = true;
      } else {
        this.hidden = false;
      }

      this.lastScroll = currentScroll;
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },

    setActiveNav() {
      const currentPath = window.location.pathname;
      document.querySelectorAll('.site-nav .page-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        }
      });
    }
  }));

  // Mode Toggle Component - REMOVED
  // Poster/Proof mode toggle removed - now available as easter egg

  // Mouse Follower Component (Desktop only)
  Alpine.data('mouseFollower', () => ({
    enabled: window.innerWidth > 1024,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    expanded: false,
    visible: false,

    init() {
      if (!this.enabled) return;

      // Start animation loop
      this.animate();

      // Mouse move handler
      document.addEventListener('mousemove', (e) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
        this.visible = true;
      });

      // Mouse leave handler
      document.addEventListener('mouseleave', () => {
        this.visible = false;
      });

      // Hover effects on interactive elements
      this.setupHoverEffects();
    },

    animate() {
      if (!this.enabled) return;

      // Smooth animation
      this.x += (this.targetX - this.x) * 0.1;
      this.y += (this.targetY - this.y) * 0.1;

      requestAnimationFrame(() => this.animate());
    },

    setupHoverEffects() {
      document.querySelectorAll('a, button, .work-card, .case-study-feature').forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.expanded = true;
        });

        el.addEventListener('mouseleave', () => {
          this.expanded = false;
        });
      });
    }
  }));

  // Smooth Scroll Component
  Alpine.data('smoothScroll', () => ({
    init() {
      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }
  }));

  // Glitch Effect Component
  Alpine.data('glitchEffect', () => ({
    text: '',

    init() {
      this.text = this.$el.textContent;
      this.$el.dataset.text = this.text;
      this.$el.classList.add('glitch-subtle');
    }
  }));

  // Technical Measurements Component (Decorative)
  Alpine.data('technicalMeasurements', () => ({
    measurements: [],

    init() {
      // Generate random measurements for aesthetic effect
      this.measurements = [
        { type: 'h', top: '25%', left: '5%', width: '300px', text: '847.2px' },
        { type: 'v', left: '15%', top: '20%', height: '200px', text: '432.1px' }
      ];
    }
  }));

  // Form Validation Component
  Alpine.data('formValidation', () => ({
    errors: {},
    touched: {},

    validateField(field, value) {
      // Email validation
      if (field === 'email') {
        if (!value) {
          this.errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          this.errors.email = 'Please enter a valid email';
        } else {
          delete this.errors.email;
        }
      }

      // Required field validation
      if (field === 'message' && !value) {
        this.errors.message = 'Message is required';
      } else if (field === 'message' && value) {
        delete this.errors.message;
      }

      this.touched[field] = true;
    },

    get isValid() {
      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      // Validate all fields
      const formData = new FormData(this.$el);
      for (let [key, value] of formData.entries()) {
        this.validateField(key, value);
      }

      if (this.isValid) {
        // Submit form
        this.$el.submit();
      }
    }
  }));

  // Case Study Mode Component - REMOVED
  // Poster/Proof mode toggle removed - functionality available as easter egg

  // Artifact Sidebar Component (for case studies)
  Alpine.data('artifactSidebar', () => ({
    open: false,
    artifacts: [],

    init() {
      // Load artifacts from data attributes or API
      this.loadArtifacts();
    },

    toggle() {
      this.open = !this.open;
    },

    loadArtifacts() {
      // This would typically load from Jekyll front matter or API
      this.artifacts = [
        { type: 'sketch', title: 'Initial Wireframe', date: '2024-01-15' },
        { type: 'prototype', title: 'Interactive Prototype', date: '2024-01-20' },
        { type: 'documentation', title: 'Technical Spec', date: '2024-01-25' }
      ];
    }
  }));
});

// Initialize smooth scroll for all internal links (non-Alpine approach for simplicity)
document.addEventListener('DOMContentLoaded', () => {
  // Add any non-Alpine initialization here if needed
});
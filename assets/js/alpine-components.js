// lowlevelmagic - Alpine.js Components
// Street Baroque Systems with Alpine.js

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
    },

    handleScroll() {
      const currentScroll = window.pageYOffset;

      // Add scrolled class - triggers at 50px to hide top bar sooner
      this.scrolled = currentScroll > 50;

      // Keep header visible (sticky) - no hiding
      this.hidden = false;

      this.lastScroll = currentScroll;
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
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
          const targetId = anchor.getAttribute('href');
          if (!targetId || targetId === '#') return;

          const target = document.querySelector(targetId);
          if (!target) return;

          e.preventDefault();
          target.setAttribute('tabindex', '-1');
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          target.focus({ preventScroll: true });
          history.pushState(null, '', targetId);
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

  // Kessler Video Component
  Alpine.data('kesslerVideo', () => ({
    videos: [],
    videoSrc: '',
    playing: false,
    hovering: false,

    init() {
      fetch('/assets/data/kessler-videos.json')
        .then(response => response.json())
        .then(data => {
          this.videos = data.videos;
          if (this.videos.length > 0) {
            this.videoSrc = this.videos[Math.floor(Math.random() * this.videos.length)];
          }
        })
        .catch(err => console.error('Error loading Kessler videos:', err));
    },

    toggleVideo() {
      if (this.playing) {
        this.stopVideo();
      } else {
        this.playVideo();
      }
    },

    playVideo() {
      if (this.$refs.video && this.videos.length > 0) {
        const video = this.$refs.video;
        const img = this.$el.querySelector('img');

        // Pick a new random video each time
        this.videoSrc = this.videos[Math.floor(Math.random() * this.videos.length)];

        // Wait for Alpine to update the src binding, then load and play
        this.$nextTick(() => {
          video.load();

          // Hide image, show video
          if (img) img.classList.add('hidden');
          video.classList.remove('hidden');

          video.play().catch(err => console.error('Video play error:', err));
          this.playing = true;
        });
      }
    },

    stopVideo() {
      if (this.$refs.video) {
        const video = this.$refs.video;
        const img = this.$el.querySelector('img');

        video.pause();
        video.currentTime = 0;

        // Show image, hide video
        video.classList.add('hidden');
        if (img) img.classList.remove('hidden');

        this.playing = false;
      }
    }
  }));

  // Shoddy Body Audio Component
  Alpine.data('shoddyAudio', () => ({
    audioFiles: [],
    currentAudio: null,
    isPlaying: false,
    hovering: false,

    init() {
      fetch('/assets/data/shoddy-audio.json')
        .then(response => response.json())
        .then(data => {
          this.audioFiles = data.audio;
        })
        .catch(err => console.error('Error loading Shoddy audio:', err));
    },

    playRandomAudio() {
      if (this.audioFiles.length === 0) return;

      // Toggle: if playing, stop it
      if (this.isPlaying && this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
        this.isPlaying = false;
        return;
      }

      // Pick a random audio file
      const randomAudio = this.audioFiles[Math.floor(Math.random() * this.audioFiles.length)];
      this.currentAudio = new Audio(randomAudio);
      this.isPlaying = true;

      this.currentAudio.play().catch(err => {
        console.error('Error playing audio:', err);
        this.isPlaying = false;
      });

      this.currentAudio.onended = () => {
        this.isPlaying = false;
        this.currentAudio = null;
      };
    }
  }));

  // Start Alpine after components are registered
  if (window.startAlpine) {
    window.startAlpine();
  }
});
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

  // KWLX Easter Egg Component
  Alpine.data('kwlxEasterEgg', () => ({
    secretActivated: false,
    modalVisible: false,
    stationIds: [],
    currentAudio: null,
    isPlaying: false,
    konami: [],
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],

    init() {
      // Manually bind click handlers to KWLX letters and assign random hover colors
      this.$nextTick(() => {
        const colors = ['#FF006E', '#00F5FF', '#FFD60A']; // hot-magenta, spray-cyan, radio-mustard
        const letters = this.$el.querySelectorAll('.kwlx-letter');

        letters.forEach(letter => {
          // Bind click handler
          letter.addEventListener('click', () => this.activateSecret());

          // Assign random hover color
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          letter.addEventListener('mouseenter', () => {
            letter.style.color = randomColor;
          });
          letter.addEventListener('mouseleave', () => {
            letter.style.color = '';
          });
        });
      });

      // Fetch station IDs
      fetch('/assets/data/kwlx-station-ids.json')
        .then(response => response.json())
        .then(data => {
          this.stationIds = data.station_ids;
        })
        .catch(err => console.error('Error loading station IDs:', err));

      // Konami code listener
      document.addEventListener('keydown', (e) => {
        this.konami.push(e.code);
        if (this.konami.length > this.konamiCode.length) {
          this.konami.shift();
        }
        if (this.konami.length === this.konamiCode.length &&
            this.konami.every((key, i) => key === this.konamiCode[i])) {
          this.activateKonami();
          this.konami = [];
        }
      });

      // Start signal animation when modal opens
      this.$watch('modalVisible', (value) => {
        if (value) {
          setTimeout(() => this.animateSignal(), 100);
          setTimeout(() => this.typeMessage(), 1000);
        }
      });
    },

    activateSecret() {
      if (this.secretActivated) return;
      this.modalVisible = true;
      this.secretActivated = true;
      this.addStaticEffect();
    },

    closeModal() {
      this.modalVisible = false;
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }
      this.isPlaying = false;
    },

    playArchive() {
      if (this.currentAudio && !this.currentAudio.paused) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.isPlaying = false;
        return;
      }

      if (this.stationIds.length === 0) {
        console.error('No station IDs available');
        return;
      }

      const randomId = this.stationIds[Math.floor(Math.random() * this.stationIds.length)];
      this.currentAudio = new Audio(randomId);
      this.isPlaying = true;

      this.currentAudio.play().catch(err => {
        console.error('Error playing audio:', err);
        this.isPlaying = false;
      });

      this.currentAudio.onended = () => {
        this.isPlaying = false;
      };
    },

    addStaticEffect() {
      const staticOverlay = document.createElement('div');
      staticOverlay.className = 'kwlx-static-overlay';
      document.body.appendChild(staticOverlay);
      setTimeout(() => {
        if (staticOverlay.parentNode) {
          staticOverlay.parentNode.removeChild(staticOverlay);
        }
      }, 5000);
    },

    animateSignal() {
      const signalBars = this.$refs.signalBars?.querySelectorAll('.signal-bar');
      if (!signalBars) return;

      setInterval(() => {
        signalBars.forEach((bar) => {
          const shouldGlow = Math.random() > 0.3;
          bar.style.opacity = shouldGlow ? '1' : '0.2';
          bar.style.backgroundColor = shouldGlow ? '#00ff41' : '#333';
        });
      }, 200);
    },

    typeMessage() {
      const messages = [
        "We never really went away...",
        "The frequencies are still active",
        "Mobius says the new engine is nearly ready",
        "Character persistence protocols stable",
        "KWLX WILL RISE AGAIN"
      ];
      let messageIndex = 0;
      let charIndex = 0;
      const typingElement = this.$refs.typingText;

      const typeChar = () => {
        if (!typingElement || messageIndex >= messages.length) return;

        const currentMessage = messages[messageIndex];
        typingElement.textContent = currentMessage.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentMessage.length) {
          setTimeout(() => {
            charIndex = 0;
            messageIndex++;
            setTimeout(typeChar, 2000);
          }, 3000);
        } else {
          setTimeout(typeChar, 100);
        }
      };

      typeChar();
    },

    activateKonami() {
      const body = document.body;
      body.classList.add('konami-activated');

      const terminal = document.createElement('div');
      terminal.className = 'konami-terminal';
      terminal.innerHTML = `
        <div class="terminal-header">lowlevelmagic SYSTEMS - KWLX DEVELOPMENT CONSOLE</div>
        <div class="terminal-content">
          <div class="terminal-line">$ accessing kwlx development branch...</div>
          <div class="terminal-line">$ character_engine_v2 STATUS: IN_DEVELOPMENT</div>
          <div class="terminal-line">$ prompt_optimization MODULE: ACTIVE</div>
          <div class="terminal-line">$ narrative_memory_system VERSION: 2.1.3-alpha</div>
          <div class="terminal-line">$ </div>
          <div class="terminal-line">Available commands:</div>
          <div class="terminal-line">  • show_character_sheets</div>
          <div class="terminal-line">  • display_memory_fragments</div>
          <div class="terminal-line">  • preview_new_frequencies</div>
          <div class="terminal-line">$ <span class="cursor">▊</span></div>
        </div>
      `;

      body.appendChild(terminal);
      setTimeout(() => terminal.style.opacity = '1', 100);
      setTimeout(() => {
        terminal.style.opacity = '0';
        setTimeout(() => {
          if (terminal.parentNode) terminal.parentNode.removeChild(terminal);
          body.classList.remove('konami-activated');
        }, 500);
      }, 10000);
    }
  }));

  // Kessler Video Component
  Alpine.data('kesslerVideo', () => ({
    videos: [],
    videoSrc: '',

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

    playVideo() {
      if (this.$refs.video) {
        this.$refs.video.play().catch(err => console.error('Video play error:', err));
      }
    },

    pauseVideo() {
      if (this.$refs.video) {
        this.$refs.video.pause();
        this.$refs.video.currentTime = 0;
      }
    }
  }));
});
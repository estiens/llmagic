// Mode Toggle System for Street Baroque Case Studies
// Implements poster/proof mode switching with localStorage persistence

document.addEventListener('DOMContentLoaded', function() {
  const modeToggle = document.getElementById('modeToggle');
  const artifactSidebar = document.getElementById('artifactSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const articleElement = document.querySelector('.case-study');

  if (!modeToggle || !articleElement) return;

  // Mode management
  const MODES = {
    poster: {
      name: 'Poster Mode Active',
      icon: '🎨',
      description: 'Expressive layouts with full textures'
    },
    auto: {
      name: 'Auto Mode Active',
      icon: '⚡',
      description: 'Adapts to time and preference'
    },
    proof: {
      name: 'Proof Mode Active',
      icon: '📋',
      description: 'Clinical clarity for reading'
    }
  };

  let currentMode = getCurrentMode();
  let sidebarOpen = getSidebarState();

  // Initialize
  initializeMode();
  initializeSidebar();

  // Event listeners
  modeToggle.addEventListener('click', handleModeToggle);
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  // Create artifact trigger button if sidebar exists but isn't visible
  if (artifactSidebar && !sidebarOpen) {
    createArtifactTrigger();
  }

  // Functions
  function getCurrentMode() {
    // Check localStorage first
    const savedMode = localStorage.getItem('streetBaroque.mode');
    if (savedMode && MODES[savedMode]) {
      return savedMode;
    }

    // Auto mode logic: time-based switching
    const hour = new Date().getHours();
    const isWorkHours = hour >= 9 && hour <= 17;
    const preferredMode = localStorage.getItem('streetBaroque.preferredMode');

    if (preferredMode && MODES[preferredMode]) {
      return preferredMode;
    }

    // Default heuristics
    return isWorkHours ? 'proof' : 'poster';
  }

  function getSidebarState() {
    const saved = localStorage.getItem('streetBaroque.sidebarOpen');
    return saved === 'true';
  }

  function initializeMode() {
    // Set root data attribute
    document.documentElement.setAttribute('data-mode', currentMode);
    articleElement.setAttribute('data-mode', currentMode);

    // Update toggle UI
    updateModeToggleUI();

    // Update mode description
    const modeDescription = document.querySelector('.current-mode-text');
    if (modeDescription) {
      modeDescription.textContent = MODES[currentMode].name;
    }

    // Apply CSS custom properties
    appleModeStyles();
  }

  function initializeSidebar() {
    if (!artifactSidebar) return;

    if (sidebarOpen) {
      artifactSidebar.classList.add('open');
    }

    // Auto-hide sidebar in poster mode on mobile
    if (window.innerWidth <= 768 && currentMode === 'poster') {
      artifactSidebar.classList.remove('open');
      sidebarOpen = false;
      saveSidebarState(false);
    }
  }

  function handleModeToggle(event) {
    const clickedButton = event.target.closest('.mode-option');
    if (!clickedButton) return;

    const newMode = clickedButton.dataset.mode;
    if (!MODES[newMode] || newMode === currentMode) return;

    // Handle auto mode
    if (newMode === 'auto') {
      const hour = new Date().getHours();
      const actualMode = hour >= 9 && hour <= 17 ? 'proof' : 'poster';
      switchToMode(actualMode);
      localStorage.setItem('streetBaroque.mode', 'auto');
    } else {
      switchToMode(newMode);
      localStorage.setItem('streetBaroque.mode', newMode);
      localStorage.setItem('streetBaroque.preferredMode', newMode);
    }
  }

  function switchToMode(newMode) {
    if (currentMode === newMode) return;

    const oldMode = currentMode;
    currentMode = newMode;

    // Animate transition
    articleElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    // Update attributes
    document.documentElement.setAttribute('data-mode', newMode);
    articleElement.setAttribute('data-mode', newMode);

    // Update UI
    updateModeToggleUI();

    // Update description
    const modeDescription = document.querySelector('.current-mode-text');
    if (modeDescription) {
      modeDescription.textContent = MODES[newMode].name;
    }

    // Apply styles
    appleModeStyles();

    // Handle sidebar behavior
    handleSidebarModeChange(oldMode, newMode);

    // Clean up transition after animation
    setTimeout(() => {
      articleElement.style.transition = '';
    }, 300);

    // Analytics/tracking
    trackModeSwitch(oldMode, newMode);
  }

  function updateModeToggleUI() {
    const options = modeToggle.querySelectorAll('.mode-option');
    const indicator = modeToggle.querySelector('.mode-indicator');

    options.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.mode === currentMode) {
        option.classList.add('active');
      }
    });

    // Move indicator
    if (indicator) {
      indicator.className = `mode-indicator ${currentMode}`;
    }
  }

  function appleModeStyles() {
    const root = document.documentElement;

    switch (currentMode) {
      case 'poster':
        root.style.setProperty('--texture-opacity', '0.8');
        root.style.setProperty('--sidebar-width', '25vw');
        root.style.setProperty('--content-max', '80ch');
        break;

      case 'proof':
        root.style.setProperty('--texture-opacity', '0.1');
        root.style.setProperty('--sidebar-width', '20vw');
        root.style.setProperty('--content-max', '65ch');
        break;

      case 'auto':
        // Auto uses the determined mode's settings
        appleModeStyles();
        break;
    }
  }

  function handleSidebarModeChange(oldMode, newMode) {
    if (!artifactSidebar) return;

    // Auto-close sidebar when switching to poster mode on mobile
    if (newMode === 'poster' && window.innerWidth <= 768 && sidebarOpen) {
      toggleSidebar();
    }

    // Auto-open sidebar when switching to proof mode on desktop
    if (newMode === 'proof' && window.innerWidth > 1024 && !sidebarOpen) {
      toggleSidebar();
    }
  }

  function toggleSidebar() {
    if (!artifactSidebar) return;

    sidebarOpen = !sidebarOpen;

    if (sidebarOpen) {
      artifactSidebar.classList.add('open');
    } else {
      artifactSidebar.classList.remove('open');
    }

    saveSidebarState(sidebarOpen);

    // Update trigger button visibility
    updateArtifactTrigger();
  }

  function saveSidebarState(isOpen) {
    localStorage.setItem('streetBaroque.sidebarOpen', isOpen.toString());
  }

  function createArtifactTrigger() {
    if (document.querySelector('.artifact-trigger')) return;

    const trigger = document.createElement('button');
    trigger.className = 'artifact-trigger';
    trigger.textContent = 'Artifacts';
    trigger.addEventListener('click', toggleSidebar);

    document.body.appendChild(trigger);
  }

  function updateArtifactTrigger() {
    const trigger = document.querySelector('.artifact-trigger');
    if (!trigger) return;

    if (sidebarOpen) {
      trigger.style.opacity = '0';
      trigger.style.pointerEvents = 'none';
    } else {
      trigger.style.opacity = '1';
      trigger.style.pointerEvents = 'auto';
    }
  }

  function trackModeSwitch(oldMode, newMode) {
    // Analytics tracking for mode switches
    if (typeof gtag !== 'undefined') {
      gtag('event', 'mode_switch', {
        'previous_mode': oldMode,
        'new_mode': newMode,
        'page_path': window.location.pathname
      });
    }

    // Console logging for development
    console.log(`Street Baroque: Mode switched from ${oldMode} to ${newMode}`);
  }

  // Responsive handling
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Re-evaluate sidebar behavior on resize
      if (window.innerWidth <= 768 && currentMode === 'poster' && sidebarOpen) {
        toggleSidebar();
      }

      // Update CSS custom properties
      appleModeStyles();
    }, 250);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    // Only activate if no input elements are focused
    if (document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.contentEditable === 'true') {
      return;
    }

    switch (event.key) {
      case '1':
        if (event.altKey) {
          event.preventDefault();
          switchToMode('poster');
          localStorage.setItem('streetBaroque.mode', 'poster');
        }
        break;
      case '2':
        if (event.altKey) {
          event.preventDefault();
          switchToMode('proof');
          localStorage.setItem('streetBaroque.mode', 'proof');
        }
        break;
      case 'a':
      case 'A':
        if (event.altKey && artifactSidebar) {
          event.preventDefault();
          toggleSidebar();
        }
        break;
    }
  });

  // Auto mode time checking (runs every hour)
  if (localStorage.getItem('streetBaroque.mode') === 'auto') {
    setInterval(function() {
      const hour = new Date().getHours();
      const shouldBeProof = hour >= 9 && hour <= 17;
      const shouldBeMode = shouldBeProof ? 'proof' : 'poster';

      if (currentMode !== shouldBeMode) {
        switchToMode(shouldBeMode);
      }
    }, 60000 * 60); // Check every hour
  }
});
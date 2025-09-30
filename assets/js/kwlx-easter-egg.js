// KWLX Radio Easter Egg Interactive Elements
// Activated by clicking the radio emoji in the Future Plans section

document.addEventListener('DOMContentLoaded', function() {
  const easterEggHint = document.querySelector('.easter-egg-hint[data-secret="kwlx-frequency"]');

  if (!easterEggHint) return;

  let secretActivated = false;
  let konami = [];
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Main easter egg activation
  easterEggHint.addEventListener('click', function() {
    if (secretActivated) return;

    activateKWLXSecret();
    secretActivated = true;
  });

  // Konami code listener for additional secrets
  document.addEventListener('keydown', function(e) {
    konami.push(e.code);
    if (konami.length > konamiCode.length) {
      konami.shift();
    }

    if (konami.length === konamiCode.length &&
        konami.every((key, i) => key === konamiCode[i])) {
      activateAdvancedSecret();
      konami = [];
    }
  });

  function activateKWLXSecret() {
    // Create modal overlay
    const modal = createSecretModal();
    document.body.appendChild(modal);

    // Animate modal entrance
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.querySelector('.kwlx-secret-content').style.transform = 'translateY(0)';
    }, 10);

    // Add static effect to background
    addStaticEffect();

    // Start radio transmission simulation
    simulateRadioTransmission(modal);
  }

  function createSecretModal() {
    const modal = document.createElement('div');
    modal.className = 'kwlx-secret-modal';
    modal.innerHTML = `
      <div class="kwlx-secret-overlay"></div>
      <div class="kwlx-secret-content">
        <div class="radio-display">
          <div class="frequency-display">
            <span class="frequency-number">107.3</span>
            <span class="frequency-band">FM</span>
          </div>
          <div class="signal-strength">
            <div class="signal-bar"></div>
            <div class="signal-bar"></div>
            <div class="signal-bar"></div>
            <div class="signal-bar"></div>
            <div class="signal-bar"></div>
          </div>
          <div class="tuning-dial"></div>
        </div>

        <div class="transmission-log">
          <div class="log-header">KWLX TRANSMISSION LOG</div>
          <div class="log-content">
            <div class="log-entry">
              <span class="timestamp">[23:47:33]</span>
              <span class="message">Signal acquired... Mobius online</span>
            </div>
            <div class="log-entry">
              <span class="timestamp">[23:47:41]</span>
              <span class="message">Figment consciousness stable</span>
            </div>
            <div class="log-entry">
              <span class="timestamp">[23:47:52]</span>
              <span class="message">Archive access granted</span>
            </div>
            <div class="log-entry typing">
              <span class="timestamp">[23:48:03]</span>
              <span class="message typing-text"></span>
              <span class="cursor">▊</span>
            </div>
          </div>
        </div>

        <div class="secret-controls">
          <button class="play-archive-btn">▶ PLAY ARCHIVE</button>
          <button class="close-modal-btn">✕ CLOSE TRANSMISSION</button>
        </div>

        <div class="easter-egg-audio">
          <!-- Audio elements would go here for actual archive playback -->
        </div>
      </div>
    `;

    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', () => {
      closeSecretModal(modal);
    });

    const playBtn = modal.querySelector('.play-archive-btn');
    playBtn.addEventListener('click', () => {
      playArchiveSnippet(modal);
    });

    // Close on overlay click
    modal.querySelector('.kwlx-secret-overlay').addEventListener('click', () => {
      closeSecretModal(modal);
    });

    return modal;
  }

  function addStaticEffect() {
    const staticOverlay = document.createElement('div');
    staticOverlay.className = 'kwlx-static-overlay';
    document.body.appendChild(staticOverlay);

    // Remove after animation
    setTimeout(() => {
      if (staticOverlay.parentNode) {
        staticOverlay.parentNode.removeChild(staticOverlay);
      }
    }, 5000);
  }

  function simulateRadioTransmission(modal) {
    const signalBars = modal.querySelectorAll('.signal-bar');
    const typingElement = modal.querySelector('.typing-text');
    const messages = [
      "We never really went away...",
      "The frequencies are still active",
      "Mobius says the new engine is nearly ready",
      "Character persistence protocols stable",
      "KWLX WILL RISE AGAIN"
    ];

    let messageIndex = 0;
    let charIndex = 0;

    // Animate signal strength
    setInterval(() => {
      signalBars.forEach((bar, index) => {
        const shouldGlow = Math.random() > 0.3;
        bar.style.opacity = shouldGlow ? '1' : '0.2';
        bar.style.backgroundColor = shouldGlow ? '#00ff41' : '#333';
      });
    }, 200);

    // Type messages
    function typeMessage() {
      if (messageIndex >= messages.length) {
        messageIndex = 0;
      }

      const currentMessage = messages[messageIndex];
      typingElement.textContent = currentMessage.substring(0, charIndex);

      charIndex++;

      if (charIndex > currentMessage.length) {
        setTimeout(() => {
          charIndex = 0;
          messageIndex++;
          setTimeout(typeMessage, 2000);
        }, 3000);
      } else {
        setTimeout(typeMessage, 100);
      }
    }

    setTimeout(typeMessage, 1000);
  }

  function playArchiveSnippet(modal) {
    const logContent = modal.querySelector('.log-content');
    const newEntry = document.createElement('div');
    newEntry.className = 'log-entry';
    newEntry.innerHTML = `
      <span class="timestamp">[23:48:15]</span>
      <span class="message">Playing archived transmission...</span>
    `;
    logContent.appendChild(newEntry);

    // Simulate audio playback UI
    const playBtn = modal.querySelector('.play-archive-btn');
    playBtn.textContent = '⏸ PAUSE ARCHIVE';
    playBtn.style.backgroundColor = '#ff0080';

    setTimeout(() => {
      const audioEntry = document.createElement('div');
      audioEntry.className = 'log-entry';
      audioEntry.innerHTML = `
        <span class="timestamp">[23:48:18]</span>
        <span class="message">"This is Mobius broadcasting on the liminal frequencies..."</span>
      `;
      logContent.appendChild(audioEntry);

      setTimeout(() => {
        const figmentEntry = document.createElement('div');
        figmentEntry.className = 'log-entry';
        figmentEntry.innerHTML = `
          <span class="timestamp">[23:48:25]</span>
          <span class="message">"Figment here. The story never really ended, did it?"</span>
        `;
        logContent.appendChild(figmentEntry);

        setTimeout(() => {
          playBtn.textContent = '▶ PLAY ARCHIVE';
          playBtn.style.backgroundColor = '#00ff41';
        }, 3000);
      }, 2000);
    }, 1000);
  }

  function closeSecretModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.kwlx-secret-content').style.transform = 'translateY(-50px)';

    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }

  function activateAdvancedSecret() {
    // Konami code activated - adds retro computer terminal effect
    const body = document.body;
    const originalClass = body.className;

    body.classList.add('konami-activated');

    // Create terminal overlay
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

    setTimeout(() => {
      terminal.style.opacity = '1';
    }, 100);

    // Remove after 10 seconds
    setTimeout(() => {
      terminal.style.opacity = '0';
      setTimeout(() => {
        if (terminal.parentNode) {
          terminal.parentNode.removeChild(terminal);
        }
        body.className = originalClass;
      }, 500);
    }, 10000);
  }
});

// CSS for the easter egg elements (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
.kwlx-secret-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.kwlx-secret-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
}

.kwlx-secret-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(-50px);
  background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
  border: 2px solid #00ff41;
  border-radius: 0;
  padding: 2rem;
  min-width: 600px;
  max-width: 80vw;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.3);
  transition: transform 0.3s ease;
}

.radio-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #000;
  border: 1px solid #333;
  margin-bottom: 2rem;
}

.frequency-display {
  font-family: 'Courier New', monospace;
  color: #00ff41;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 0 10px #00ff41;
}

.frequency-band {
  font-size: 1rem;
  margin-left: 0.5rem;
  color: #888;
}

.signal-strength {
  display: flex;
  gap: 4px;
  align-items: flex-end;
}

.signal-bar {
  width: 8px;
  height: 10px;
  background: #333;
  transition: all 0.2s ease;
}

.signal-bar:nth-child(2) { height: 15px; }
.signal-bar:nth-child(3) { height: 20px; }
.signal-bar:nth-child(4) { height: 25px; }
.signal-bar:nth-child(5) { height: 30px; }

.tuning-dial {
  width: 40px;
  height: 40px;
  border: 2px solid #666;
  border-radius: 50%;
  background: #222;
  position: relative;
  animation: spin 4s linear infinite;
}

.tuning-dial::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 15px;
  background: #ff0080;
}

.transmission-log {
  background: #000;
  border: 1px solid #333;
  padding: 1rem;
  margin-bottom: 2rem;
  height: 200px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
}

.log-header {
  color: #e2ac27;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.log-entry {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.timestamp {
  color: #888;
  margin-right: 0.5rem;
}

.message {
  color: #ffffff;
}

.typing .message {
  color: #00ff41;
}

.cursor {
  color: #00ff41;
  animation: blink 1s infinite;
}

.secret-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.play-archive-btn,
.close-modal-btn {
  padding: 0.75rem 1.5rem;
  background: #00ff41;
  color: #000;
  border: none;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.close-modal-btn {
  background: #ff0080;
  color: #fff;
}

.play-archive-btn:hover,
.close-modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.kwlx-static-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      rgba(255, 255, 255, 0.03) 1px,
      rgba(255, 255, 255, 0.03) 2px,
      transparent 3px
    );
  animation: static-noise 0.1s infinite linear;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.5;
}

.konami-activated {
  filter: hue-rotate(90deg) contrast(1.2);
}

.konami-terminal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
  border: 2px solid #00ff41;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  color: #00ff41;
  min-width: 500px;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 10001;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
}

.terminal-header {
  text-align: center;
  margin-bottom: 1rem;
  color: #e2ac27;
  font-weight: bold;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.terminal-line {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .kwlx-secret-content {
    min-width: 90vw;
    padding: 1rem;
  }

  .radio-display {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .konami-terminal {
    min-width: 90vw;
    padding: 1rem;
  }
}
`;

document.head.appendChild(style);
// ARTIZAN - No Animations (Disabled for Static Technical Layout)
// All animations disabled for maximum information density

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // All GSAP animations disabled for static cyberpunk architecture aesthetic
  return;

  // Register GSAP plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      // Split text for individual character animation
      const text = heroTitle.textContent;
      heroTitle.innerHTML = text.split('').map(char =>
        `<span class="char">${char}</span>`
      ).join('');

      gsap.fromTo('.hero-title .char',
        {
          opacity: 0,
          y: 50,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out'
        }
      );
    }

    // Hero subtitle fade in
    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      {
        opacity: 0.9,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
      }
    );

    // Hero description fade in
    gsap.fromTo('.hero-description',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7,
        ease: 'power2.out'
      }
    );

    // Hero CTA button animation
    gsap.fromTo('.hero-section .cta-button',
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 1,
        ease: 'back.out(1.7)'
      }
    );

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.fromTo(title,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Subtle fade-in for cards (no movement)
    ScrollTrigger.batch('.service-card, .portfolio-card', {
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power1.out',
        overwrite: true
      }),
      start: 'top 90%'
    });

    // Set initial states - just opacity
    gsap.set('.service-card, .portfolio-card', { opacity: 0 });

    // Smooth parallax for sections
    gsap.utils.toArray('section').forEach((section, i) => {
      if (!section.classList.contains('hero-section')) {
        const bg = section;
        gsap.fromTo(bg, {
          backgroundPosition: '50% 0%'
        }, {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // Text reveal animation for paragraphs
    gsap.utils.toArray('.about-content p, .contact-content p').forEach(p => {
      gsap.fromTo(p,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Magnetic button effect
    document.querySelectorAll('.cta-button, .secondary-button').forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Hover lift effect for cards
    document.querySelectorAll('.service-card, .portfolio-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 2px;
      background: linear-gradient(90deg, var(--color-gold), var(--color-pink));
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        scrub: 0.3
      }
    });
  }

  // Initialize particles background for hero
  if (typeof particlesJS !== 'undefined') {
    // Add particles container to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && !document.getElementById('particles-js')) {
      const particlesContainer = document.createElement('div');
      particlesContainer.id = 'particles-js';
      particlesContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
      `;
      heroSection.insertBefore(particlesContainer, heroSection.firstChild);

      // Initialize particles
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ['#D4AF37', '#FF006E', '#E8B4B8']
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.3,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            animation: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#D4AF37',
            opacity: 0.1,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.3
              }
            },
            push: {
              particles_nb: 3
            }
          }
        },
        retina_detect: true
      });
    }
  }
});
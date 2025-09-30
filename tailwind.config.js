/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './_posts/**/*.{html,md}',
    './_practices/**/*.{html,md}',
    './_labs/**/*.{html,md}',
    './_case_studies/**/*.{html,md}',
    './*.{html,md}',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Base Surfaces - WARM PAPER & INK
        'paper': '#F5F1E6',
        'paper-quiet': '#FCFAF4',
        'ink': '#0F0F10',
        'inkwell': '#0F0F10', // Alias for ink
        'graphite': '#2A2C2E',
        'graphite-light': '#3C3F42',

        // Street Baroque Accent Palette
        'spray-cyan': '#35D0E2',
        'hot-magenta': '#FF3D9A',
        'radio-mustard': '#E2AC27',
        'oxide-teal': '#1D6F73',
        'safety-orange': '#FF6A00'
      },
      fontFamily: {
        'display': ['Fraunces', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace']
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 8vw, 5rem)',
        'hero-xl': 'clamp(3rem, 10vw, 6rem)',
        'section': 'clamp(1.75rem, 4vw, 2.5rem)',
        'subsection': 'clamp(1.25rem, 3vw, 1.75rem)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      borderWidth: {
        '3': '3px'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'container': '1440px'
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'subtle-glitch': 'subtle-glitch 0.3s ease-out'
      },
      keyframes: {
        'subtle-glitch': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-1px)' },
          '40%': { transform: 'translateX(1px)' },
          '60%': { transform: 'translateX(-0.5px)' },
          '80%': { transform: 'translateX(0.5px)' }
        }
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding'
      },
      transitionDuration: {
        '400': '400ms'
      },
      boxShadow: {
        'spray': '0 0 20px rgba(53, 208, 226, 0.3), 0 0 40px rgba(53, 208, 226, 0.1)',
        'magenta': '0 0 20px rgba(255, 61, 154, 0.3), 0 0 40px rgba(255, 61, 154, 0.1)',
        'mustard': '0 0 20px rgba(226, 172, 39, 0.3), 0 0 40px rgba(226, 172, 39, 0.1)',
        'brutalist': '4px 4px 0 rgb(15, 15, 16)',
        'brutalist-hover': '6px 6px 0 rgb(15, 15, 16)'
      },
      backgroundImage: {
        'paper-texture': `repeating-radial-gradient(circle at 20% 80%, transparent 0, rgba(0,0,0,0.01) 50px),
                         repeating-radial-gradient(circle at 80% 20%, transparent 0, rgba(0,0,0,0.01) 50px),
                         radial-gradient(circle at 40% 40%, rgba(0,0,0,0.005) 1px, transparent 2px)`,
        'grid-pattern': `linear-gradient(rgba(42,44,46,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(42,44,46,0.1) 1px, transparent 1px)`
      },
      backgroundSize: {
        'paper-texture': '100px 100px, 100px 100px, 8px 8px',
        'grid-pattern': '24px 8px'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h3: {
              marginTop: '1.5rem',
              marginBottom: '1rem',
              fontWeight: '700',
            },
            'h3 + ul': {
              marginTop: '0.75rem',
            },
            'h3 + ol': {
              marginTop: '0.75rem',
            },
            'ul > li': {
              paddingLeft: '0.5rem',
            },
            ul: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities, theme }) {
      // Brutalist shadow utilities
      addUtilities({
        '.shadow-brutal-sm': {
          'box-shadow': `2px 2px 0 ${theme('colors.inkwell')}`
        },
        '.shadow-brutal': {
          'box-shadow': `4px 4px 0 ${theme('colors.inkwell')}`
        },
        '.shadow-brutal-lg': {
          'box-shadow': `6px 6px 0 ${theme('colors.inkwell')}`
        },
        '.shadow-brutal-xl': {
          'box-shadow': `8px 8px 0 ${theme('colors.inkwell')}`
        },
        '.shadow-brutal-cyan': {
          'box-shadow': `4px 4px 0 ${theme('colors.spray-cyan')}`
        },
        '.shadow-brutal-magenta': {
          'box-shadow': `4px 4px 0 ${theme('colors.hot-magenta')}`
        },
        '.shadow-brutal-mustard': {
          'box-shadow': `4px 4px 0 ${theme('colors.radio-mustard')}`
        },
        '.shadow-brutal-double': {
          'box-shadow': `4px 4px 0 ${theme('colors.hot-magenta')}, 8px 8px 0 ${theme('colors.spray-cyan')}`
        }
      })

      // Clip-path utilities for geometric shapes
      addUtilities({
        '.clip-angular-tl': {
          'clip-path': 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
        },
        '.clip-angular-tr': {
          'clip-path': 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        },
        '.clip-angular-bl': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        },
        '.clip-angular-br': {
          'clip-path': 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
        },
        '.clip-triangle-tl': {
          'clip-path': 'polygon(0 0, 100% 0, 0 100%)'
        },
        '.clip-triangle-tr': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%)'
        },
        '.clip-triangle-bl': {
          'clip-path': 'polygon(0 0, 0 100%, 100% 100%)'
        },
        '.clip-triangle-br': {
          'clip-path': 'polygon(100% 0, 100% 100%, 0 100%)'
        },
        '.clip-diamond': {
          'clip-path': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        },
        '.clip-hexagon': {
          'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
        },
        '.clip-parallelogram': {
          'clip-path': 'polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%)'
        }
      })

      // Responsive gap utilities
      addUtilities({
        '.gap-gutter': {
          gap: 'var(--grid-gutter, 1.5rem)'
        },
        '.gap-gutter-sm': {
          gap: 'calc(var(--grid-gutter, 1.5rem) * 0.5)'
        },
        '.gap-gutter-lg': {
          gap: 'calc(var(--grid-gutter, 1.5rem) * 1.5)'
        }
      })

      // Font display utilities for performance
      addUtilities({
        '.font-display-swap': {
          'font-display': 'swap'
        },
        '.font-display-fallback': {
          'font-display': 'fallback'
        },
        '.font-display-optional': {
          'font-display': 'optional'
        }
      })

      // Case study button components - simple and stable
      addUtilities({
        '.btn-case-study': {
          'display': 'inline-block',
          'font-family': 'IBM Plex Mono, monospace',
          'font-size': '0.75rem',
          'font-weight': '900',
          'text-transform': 'uppercase',
          'letter-spacing': '0.1em',
          'padding': '0.75rem 1.5rem',
          'border': '2px solid #0F0F10',
          'background': '#0F0F10',
          'color': '#F5F1E6',
          'transition': 'all 0.2s ease',
          'cursor': 'pointer'
        },
        '.btn-case-study:hover': {
          'background': '#35D0E2',
          'border-color': '#35D0E2',
          'color': '#0F0F10'
        }
      })
    })
  ],
  safelist: [
    // Pattern-based safelist for Jekyll cycle classes used in index.html
    {
      pattern: /bg-(inkwell|hot-magenta|spray-cyan|radio-mustard|oxide-teal|safety-orange)/,
    },
    {
      pattern: /text-(paper|inkwell|spray-cyan|hot-magenta|radio-mustard|oxide-teal)/,
    },
    {
      pattern: /border-(inkwell|hot-magenta|spray-cyan|radio-mustard|oxide-teal|safety-orange)/,
    }
  ]
}
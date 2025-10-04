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
        'paper-muted': '#D4D0C5',        // Muted paper for placeholders/backgrounds
        'paper-light': '#E5E5E0',         // Light paper variant
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
        // Display Scale - Fraunces (serif) for hero and major headings
        'display-massive': ['clamp(6rem, 15vw, 14rem)', { lineHeight: '0.85', letterSpacing: '-0.06em', fontWeight: '900' }],
        'display-hero': ['clamp(3rem, 8vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '900' }],
        'display-large': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-medium': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],

        // Section Scale - For section headers and subheadings
        'section-xl': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section-lg': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'section-md': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],

        // Body Scale - Inter (sans) for content
        'body-xl': ['1.25rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-base': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],

        // Technical Scale - IBM Plex Mono for labels and metadata
        'technical-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '600' }],
        'technical-base': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.15em', fontWeight: '500' }],
        'technical-sm': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.15em', fontWeight: '500' }]
      },
      lineHeight: {
        'tightest': '0.85',
        'tighter': '0.95',
        'tight': '1.1',
        'snug': '1.3',
        'normal': '1.5',
        'relaxed': '1.7',
        'loose': '1.8'
      },
      letterSpacing: {
        'tighter': '-0.06em',
        'tight': '-0.04em',
        'snug': '-0.02em',
        'normal': '0',
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.15em'
      },
      spacing: {
        // 8px baseline grid - all custom spacing in multiples of 8px
        '18': '4.5rem',     // 72px (9 * 8px)
        '88': '22rem',      // 352px (44 * 8px)
        '128': '32rem',     // 512px (64 * 8px)
        // Additional baseline grid values
        '1.5': '0.375rem',  // 6px - exception for fine adjustments (not baseline but needed)
        '2.5': '0.625rem',  // 10px - exception for fine adjustments
        '3.5': '0.875rem',  // 14px - exception for fine adjustments
        '5': '1.25rem',     // 20px - exception for fine adjustments
        '7': '1.75rem'      // 28px - exception for fine adjustments
        // Note: Default Tailwind spacing already follows 4px increments
        // which are compatible with 8px baseline: 0, 4, 8, 12, 16, 24, 32, etc.
      },
      borderWidth: {
        '3': '3px'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'container': '1440px',
        'prose': '65ch',      // Standard readable measure
        'prose-narrow': '50ch' // Emphasis/callouts
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
        '16': 'repeat(16, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))'  // Used in editorial case study layouts
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
        'brutalist-hover': '6px 6px 0 rgb(15, 15, 16)',
        'brutal-sm': '2px 2px 0 rgb(15, 15, 16)',
        'brutal-cyan': '4px 4px 0 #35D0E2',
        'brutal-hot': '4px 4px 0 #FF3D9A'
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
      // Semantic spacing utilities - 8px baseline grid
      addUtilities({
        '.spacing-compact': {
          'margin-bottom': '1rem'  // 16px = 2 * 8px
        },
        '.spacing-standard': {
          'margin-bottom': '1.5rem'  // 24px = 3 * 8px
        },
        '.spacing-generous': {
          'margin-bottom': '2rem'  // 32px = 4 * 8px
        },
        '.spacing-expansive': {
          'margin-bottom': '3rem'  // 48px = 6 * 8px
        }
      })

      // Component internal padding utilities
      addUtilities({
        '.padding-tight': {
          'padding': '1rem'  // 16px = 2 * 8px
        },
        '.padding-comfortable': {
          'padding': '1.5rem'  // 24px = 3 * 8px
        },
        '.padding-spacious': {
          'padding': '2rem'  // 32px = 4 * 8px
        }
      })

      // Brutalist shadow utilities - reference config values
      addUtilities({
        '.shadow-brutal-sm': {
          'box-shadow': theme('boxShadow.brutal-sm')
        },
        '.shadow-brutal': {
          'box-shadow': theme('boxShadow.brutalist')
        },
        '.shadow-brutal-lg': {
          'box-shadow': theme('boxShadow.brutalist-hover')
        },
        '.shadow-brutal-xl': {
          'box-shadow': `8px 8px 0 ${theme('colors.inkwell')}`
        },
        '.shadow-brutal-cyan': {
          'box-shadow': theme('boxShadow.brutal-cyan')
        },
        '.shadow-brutal-magenta': {
          'box-shadow': theme('boxShadow.brutal-hot')
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
    // Pattern-based safelist for Jekyll cycle classes with opacity support
    {
      pattern: /bg-(inkwell|hot-magenta|spray-cyan|radio-mustard|oxide-teal|safety-orange)(\/(?:5|10|20|30|40|50|60|70|80|90))?/,
    },
    {
      pattern: /(hover:)?bg-(hot-magenta|spray-cyan|radio-mustard|oxide-teal)(\/(?:5|10|20|30|40|50|60|70|80|90))?/,
    },
    {
      pattern: /(text|border)-(paper|inkwell|spray-cyan|hot-magenta|radio-mustard|oxide-teal)(\/(?:5|10|20|30|40|50|60|70|80|90))?/,
    }
  ]
}
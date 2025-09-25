# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Build the site
bundle exec jekyll build
```

### Testing
```bash
# Check if the site builds without errors
bundle exec jekyll build --strict_front_matter

# Validate HTML (requires html-proofer gem)
bundle exec htmlproofer ./_site
```

## Architecture Overview

### Jekyll Theme Structure
This is a Jekyll theme gem called "artizan-theme" with a grunge/punk aesthetic designed for creative consulting websites. The theme is both:
- A standalone Jekyll site (for development/demonstration)
- A packaged gem theme (defined in `artizan-theme.gemspec`)

### Content Collections
The site uses three Jekyll collections that automatically generate pages:

1. **`_practices/`** - Emerging methodologies and practices
   - Layout: `_layouts/practice.html`
   - Index page: `/practices.html`
   - Front matter requires: `title`, `subtitle`, `date`, `category`, `status`, `tools`

2. **`_labs/`** - Experimental projects and research
   - Layout: `_layouts/lab.html`
   - Index page: `/labs.html`
   - Front matter requires: `title`, `description`, `date`, `status`, `team`, `technologies`

3. **`_case_studies/`** - Client work showcases
   - Layout: `_layouts/case_study.html`
   - Index page: `/case-studies.html`
   - Front matter requires: `title`, `client`, `summary`, `date`, `duration`, `industry`, `technologies`

### Styling Architecture (100% Custom - No CSS Frameworks)
- **`_sass/artizan.scss`** - Core theme: spacing, typography, colors, grid, homepage sections
- **`_sass/content.scss`** - Collection-specific styles (practices, labs, case studies)
- **`_sass/components.scss`** - Reusable UI components
- **`_sass/case-study-modes.scss`** - Poster/Proof mode toggle system
- **`_sass/utilities.scss`** - Helper classes
- **`assets/css/main.scss`** - Entry point that imports all Sass files

**Design System:**
- Custom CSS variables for theming (no framework dependencies)
- Tightened spacing scale for dense, poster-like layout
- Typography: Fraunces (display), Inter (body), IBM Plex Mono (technical)
- Colors: spray-cyan, hot-magenta, radio-mustard, oxide-teal on paper/ink base

### Key Configuration
- **`_config.yml`** - Main Jekyll configuration, navigation menu, and collection settings
- **`Gemfile`** - Ruby dependencies, includes Jekyll and theme plugins
- **`artizan-theme.gemspec`** - Gem specification for packaging as a theme

### Layout Hierarchy
```
_layouts/default.html     # Base layout with HTML structure
├── _layouts/page.html    # Generic page layout
├── _layouts/post.html    # Blog post layout
├── _layouts/practice.html # Emerging practices layout
├── _layouts/lab.html     # Lab projects layout
└── _layouts/case_study.html # Case studies layout
```

All layouts inherit from `default.html` which includes `_includes/head.html`, `_includes/header.html`, and `_includes/footer.html`.

### JavaScript Files
- **`assets/js/main.js`** - Core functionality: smooth scroll, header effects, navigation
- **`assets/js/mode-toggle.js`** - Poster/Proof mode switching for case studies
- **`assets/js/animations.js`** - **DEPRECATED/DISABLED** - can be removed
- **`assets/js/kwlx-easter-egg.js`** - Special feature for KWLX case study

**Note:** GSAP and particles.js are loaded but unused - can be removed from `_includes/head.html`

### Known Issues to Fix
- Remove deprecated `animations.js` and its script references
- Remove unused GSAP/particles.js CDN links
- Fix or remove toggleMode() function referenced in index.html
- Migrate Sass @import to @use/@forward to fix deprecation warnings
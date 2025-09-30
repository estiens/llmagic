# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies (required for Tailwind CSS)
npm install

# Development with auto-reload CSS and Jekyll
npm run start  # Runs both CSS watch and Jekyll serve

# Or run separately:
npm run css:watch  # Watch and rebuild Tailwind CSS
bundle exec jekyll serve  # In another terminal

# IMPORTANT: Jekyll ALWAYS runs on port 4001
# Site is available at http://localhost:4001

# Build for production
npm run build  # Builds minified CSS
bundle exec jekyll build  # Builds Jekyll site
```

### CSS Development
```bash
# Watch mode for Tailwind CSS changes
npm run css:watch

# Build minified CSS for production
npm run css:build
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
This is a Jekyll theme gem called "lowlevelmagic-theme" with a grunge/punk aesthetic designed for creative consulting websites. The theme is both:
- A standalone Jekyll site (for development/demonstration)
- A packaged gem theme (defined in `lowlevelmagic-theme.gemspec`)

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

### Styling Architecture (Tailwind CSS + Alpine.js)
The site has been migrated to use Tailwind CSS for styling and Alpine.js for interactivity.

**Current Structure:**
- **`assets/css/tailwind.css`** - Tailwind directives and custom component classes
- **`tailwind.config.js`** - Theme configuration with custom design tokens
- **`assets/css/main.css`** - Generated CSS (do not edit directly)
- **`assets/css/compatibility.css`** - Fallback styles for legacy support

**Archived SCSS (in `_archived_scss/`):**
- Original SCSS files preserved but no longer used
- Can reference for design patterns during migration

**Design System (preserved in Tailwind config):**
- Custom colors: paper, spray-cyan, hot-magenta, radio-mustard, oxide-teal, ink
- Typography: Fraunces (display), Inter (body), IBM Plex Mono (technical)
- Custom spacing, shadows, and animations

**Standardized Button System:**
- `.btn-case-study` - Primary case study button component with brutalist shadow effects
- Project-specific action verbs:
  - KWLX Radio: "TUNE IN"
  - GlitchCube: "ENCOUNTER"
  - Nexus RPG: "DIVE IN"
  - Void.Wink: "READ"
  - Shoddy Body: "PLAY"
  - Kessler's Cantina: "VISIT"
  - Default: "EXPLORE"
- Implemented with Jekyll conditional logic based on case study titles
- Consistent brutalist shadow hover effects across all buttons
- Responsive font sizing with clamp() functions

### Key Configuration
- **`_config.yml`** - Main Jekyll configuration, navigation menu, and collection settings
- **`Gemfile`** - Ruby dependencies, includes Jekyll and theme plugins
- **`lowlevelmagic-theme.gemspec`** - Gem specification for packaging as a theme

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

### JavaScript Architecture
- **`assets/js/alpine-components.js`** - All Alpine.js components in one file:
  - `header`: Scroll effects and mobile navigation
  - `modeToggle`: Poster/Proof/Auto display modes
  - `smoothScroll`: Smooth anchor link scrolling
  - `mouseFollower`: Interactive cursor effects
  - `caseStudyModeToggle`: Mode switching for case studies
- **`assets/js/kwlx-easter-egg.js`** - Special interactive feature for KWLX Radio case study

**Note:** Alpine.js is loaded via CDN in the head template. Components are initialized with x-data attributes.

### Technology Stack
- **Jekyll 4.3** - Static site generator
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Alpine.js 3.13** - Lightweight reactive framework (loaded via CDN)
- **PostCSS** - CSS processing with Autoprefixer
- **Ruby 3.x** - Required for Jekyll
- **Node.js** - Required for Tailwind build process

### Build Process Overview
1. **Tailwind CSS** processes `assets/css/tailwind.css` → `assets/css/main.css`
2. **Jekyll** builds the static site with the generated CSS
3. **Alpine.js** initializes interactive components on page load

**Important:** Always run `npm run css:watch` when developing to ensure Tailwind classes are compiled.

# important-instruction-reminders
NO ARROWS NO EMOJIS - Never use arrows or emojis in any code or text
Do what has been asked; nothing more, nothing less.
NEVER change carefully copyedited web content or case studies - do not alter the actual text content unless explicitly asked
Create documentation files as needed for development purposes
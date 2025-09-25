# ARTIZAN Theme Architecture Guide

## Overview
ARTIZAN is a custom Jekyll theme with a "Street Baroque" aesthetic - combining Swiss Brutalism, grunge/punk elements, and technical precision. The theme is built entirely from scratch without any CSS frameworks.

## Core Design System

### CSS Architecture
- **No CSS Framework** - All styles are custom-built from scratch
- **CSS Variables** - Uses CSS custom properties for theming
- **Modular SCSS** - Split across multiple files for organization
- **BEM-inspired naming** - Component-based class naming

### Key SCSS Files
1. **`_sass/artizan.scss`** - Core theme variables, layout system, and base components
   - Spacing system (recently tightened for density)
   - Typography scale with Fraunces (display) and Inter (body)
   - Color palette (spray-cyan, hot-magenta, radio-mustard, oxide-teal)
   - Grid system (12-column)
   - Hero, work, about, contact section styles

2. **`_sass/content.scss`** - Content-specific styles for collections
   - Page headers and meta information
   - Article typography and formatting
   - Status indicators and tags
   - Collection card layouts

3. **`_sass/components.scss`** - Reusable UI components
4. **`_sass/case-study-modes.scss`** - Case study specific mode toggle system
5. **`_sass/utilities.scss`** - Helper classes and utilities
6. **`_sass/artizan-old.scss`** - **DEPRECATED** - Old theme file, can be removed

## JavaScript Architecture

### Active JS Files

#### 1. **`main.js`** - Core functionality
- Smooth scroll for anchor links ✅
- Header scroll effects (hide/show on scroll) ✅
- Active navigation highlighting ✅
- Mouse follower effect (desktop only) ❌ (uses non-existent CSS variables)
- Technical measurement overlays ✅ (adds decorative measurements)

#### 2. **`animations.js`** - **MOSTLY DISABLED**
- Line 8: `return;` - All animations are disabled!
- Contains GSAP and particles.js code but never executes
- **Can be removed entirely** as it's non-functional

#### 3. **`mode-toggle.js`** - Case study mode system
- Poster/Proof/Auto mode switching ✅
- LocalStorage persistence ✅
- Sidebar toggle functionality ✅
- Only used on case study pages

#### 4. **`kwlx-easter-egg.js`** - Special case study feature
- Specific to KWLX Radio case study

### External Dependencies
- **GSAP + ScrollTrigger** - Loaded but NOT USED (animations.js is disabled)
- **particles.js** - Loaded but NOT USED (animations.js is disabled)
- **These can be removed from _includes/head.html**

## Deprecated Code & Cleanup Opportunities

### To Remove
1. **GSAP & ScrollTrigger scripts** in `_includes/head.html` (lines 26-27)
2. **particles.js script** in `_includes/head.html` (line 30)
3. **`animations.js`** file entirely - it's disabled and non-functional
4. **`_sass/artizan-old.scss`** - deprecated theme file
5. **Mouse follower code** in main.js (lines 67-130) - references non-existent CSS variables

### To Fix
1. **Sass @import deprecation warnings** - Should migrate to @use/@forward
2. **Mode toggle on homepage** - The toggleMode() function in index.html doesn't exist
3. **Mouse follower** - Either implement the CSS variables or remove the feature

## Theme Features

### Working Features
- ✅ Responsive grid system
- ✅ Typography hierarchy with custom fonts
- ✅ Color system with CSS variables
- ✅ Smooth scrolling
- ✅ Header hide/show on scroll
- ✅ Active navigation highlighting
- ✅ Technical measurement overlays
- ✅ Mode toggle for case studies (Poster/Proof modes)

### Non-functional/Deprecated
- ❌ All GSAP animations (disabled)
- ❌ Particle background effects (disabled)
- ❌ Mouse follower (broken CSS variables)
- ❌ Homepage mode toggle (missing function)

## Content Collections
The theme supports three Jekyll collections:
- **`_practices/`** - Emerging methodologies
- **`_labs/`** - Experimental projects
- **`_case_studies/`** - Client work showcases

Each has dedicated layouts and styling.

## Recent Changes
- Tightened spacing system by ~50% for denser layout
- Simplified hero section from 50vh to 35vh
- Converted work modes from cards to compact list
- Enhanced case study prominence with larger boxes
- Restructured content hierarchy for better information architecture

## Recommendations

### Immediate Cleanup
```bash
# Remove deprecated files
rm _sass/artizan-old.scss
rm assets/js/animations.js

# Remove unused script tags from _includes/head.html
# Lines 26-27 (GSAP) and line 30 (particles.js)
```

### Fix Mode Toggle
Either remove the mode toggle from homepage or create the missing function:
```javascript
// Add to main.js or remove from index.html
function toggleMode() {
  // Implementation for homepage mode toggle
}
```

### Modernize Sass
Convert @import to @use/@forward to eliminate deprecation warnings.

## Performance Impact
Removing unused JavaScript libraries will:
- Reduce page load by ~150KB
- Eliminate unnecessary HTTP requests
- Remove unused code execution

## Maintenance Notes
- The theme is entirely custom - no framework updates needed
- Focus on removing deprecated code rather than adding features
- The "disabled animations" approach suggests a preference for static, dense layouts
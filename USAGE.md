# LOW LEVEL MAGIC Theme Usage Guide

This guide will help you get started with the LOW LEVEL MAGIC Jekyll theme and customize it for your consulting website.

## Quick Start

### 1. Installation

Choose one of the following installation methods:

#### Method A: Fork and Customize (Recommended)

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/yourusername/low-level-magic-jekyll-theme.git
cd low-level-magic-jekyll-theme

# Install dependencies
bundle install

# Start the development server
bundle exec jekyll serve
```

#### Method B: Use as Gem Theme

Add to your `Gemfile`:
```ruby
gem "low-level-magic-theme"
```

Add to your `_config.yml`:
```yaml
theme: low-level-magic-theme
```

Then run:
```bash
bundle install
bundle exec jekyll serve
```

### 2. Basic Configuration

Edit `_config.yml` with your information:

```yaml
title: Your Company Name
email: contact@yourcompany.com
description: Your company description
url: "https://yourcompany.com"

author:
  name: Your Name
  email: your@email.com

social:
  github: yourcompany
  linkedin: yourcompany
  twitter: yourcompany
```

## Content Creation

### Homepage Customization

Edit `index.html` to customize your homepage content:

- **Hero Section**: Update the main title, subtitle, and description
- **About Section**: Modify the about text to reflect your company
- **Services Section**: Update the three service cards
- **Contact Section**: Customize the contact information

### Creating Emerging Practices

Create files in the `_practices/` directory:

```markdown
---
title: "Your Practice Name"
subtitle: "Brief description"
date: 2024-01-01
category: "AI Development"
status: "active"
tools:
  - "OpenAI GPT-4"
  - "Custom Tools"
---

## Overview

Your practice description here...

## Methodology

Explain your approach...

## Applications

How this practice is applied...
```

### Creating Lab Projects

Create files in the `_labs/` directory:

```markdown
---
title: "Project Name"
description: "What this project does"
date: 2024-01-01
status: "active"
team:
  - "Lead Developer"
  - "Researcher"
technologies:
  - "Python"
  - "TensorFlow"
github_url: "https://github.com/user/repo"
demo_url: "https://demo.example.com"
---

## Project Overview

Describe your project...

## Technical Details

Explain the technology...

## Results

Share your findings...
```

### Creating Case Studies

Create files in the `_case_studies/` directory:

```markdown
---
title: "Client Project Name"
client: "Client Company"
summary: "Brief project summary"
date: 2024-01-01
duration: "3 months"
industry: "Gaming"
technologies:
  - "Unity"
  - "AI Systems"
team:
  - "Project Manager"
  - "Developer"
results:
  - "50% improvement in engagement"
  - "Successful launch"
---

## Project Background

Describe the client's needs...

## Our Approach

Explain your solution...

## Results

Share the outcomes...
```

## Customization Options

### Color Scheme

To change the color scheme, edit `_sass/artizan.scss`:

```scss
:root {
  --color-primary: #your-primary-color;
  --color-accent: #your-accent-color;
  // ... other colors
}
```

### Typography

To use different fonts, update the Google Fonts import and variables:

```scss
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-heading: 'Your Font', monospace;
  --font-body: 'Your Font', sans-serif;
}
```

### Background Textures

Replace texture images in `assets/images/` or modify the CSS to remove textures:

```scss
body {
  // Remove or replace background-image
  background-image: none; // For solid color background
}
```

### Navigation Menu

Update the navigation in `_config.yml`:

```yaml
navigation:
  - title: Home
    url: /
  - title: Services
    url: /services/
  - title: Portfolio
    url: /portfolio/
  - title: About
    url: /about/
  - title: Contact
    url: /contact/
```

## Advanced Customization

### Adding New Page Types

1. Create a new layout in `_layouts/`
2. Add corresponding SCSS styling in `_sass/content.scss`
3. Create pages using the new layout

### Custom Sections

To add new sections to the homepage:

1. Edit `index.html`
2. Add corresponding CSS in `_sass/artizan.scss`
3. Follow the existing pattern for consistency

### SEO Optimization

The theme includes Jekyll SEO tag. Customize meta information:

```yaml
# In _config.yml
title: Your Site Title
description: Your site description
author: Your Name
twitter:
  username: yourusername
  card: summary
logo: /assets/images/logo.png
```

## Deployment

### GitHub Pages

1. Push your repository to GitHub
2. Enable GitHub Pages in repository settings
3. Choose source branch (usually `main` or `gh-pages`)

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `bundle exec jekyll build`
3. Set publish directory: `_site`

### Custom Server

1. Build the site: `bundle exec jekyll build`
2. Upload the `_site` directory to your web server

## Troubleshooting

### Common Issues

**Gem installation errors:**
```bash
# Try installing with sudo (not recommended for production)
sudo bundle install

# Or use rbenv/rvm for Ruby version management
```

**Missing dependencies:**
```bash
# Install missing gems
bundle install

# Update gems
bundle update
```

**CSS not loading:**
- Check that `assets/css/main.scss` has front matter (the `---` lines)
- Ensure SCSS files are in the `_sass/` directory
- Verify the `@import` statements

### Performance Optimization

- Optimize images before adding them to `assets/images/`
- Minimize custom CSS additions
- Use Jekyll's built-in minification in production

## Support

For questions or issues:

1. Check the [README.md](README.md) file
2. Review existing GitHub issues
3. Create a new issue with detailed information
4. Include your Jekyll version and error messages

## Best Practices

1. **Content Organization**: Keep content files well-organized with clear naming
2. **Image Optimization**: Compress images for web use
3. **SEO**: Use descriptive titles and meta descriptions
4. **Accessibility**: Ensure good color contrast and semantic HTML
5. **Performance**: Test loading times and optimize as needed

---

Happy building with the ARTIZAN theme!

# ARTIZAN Jekyll Theme

A grunge/punk-inspired Jekyll theme designed for creative consulting websites, specifically tailored for AI-driven creativity and character design services.

## Features

- **Grunge/Punk Aesthetic**: Dark color scheme with neon green accents, grunge textures, and typewriter-style fonts
- **Professional Layout**: Clean, readable structure that maintains professionalism while embracing edgy design
- **Responsive Design**: Fully responsive across all device sizes
- **Content Collections**: Built-in support for Emerging Practices, Labs, and Case Studies
- **SEO Optimized**: Includes Jekyll SEO tag and sitemap generation
- **Fast Loading**: Optimized CSS and minimal JavaScript for quick page loads

## Design Elements

### Color Palette
- **Primary**: Off-Black (`#1A1A1A`)
- **Secondary**: Dark Grey (`#2B2B2B`)
- **Accent**: Neon Green (`#39FF14`)
- **Text**: Light Grey (`#E0E0E0`)
- **Headings**: White (`#FFFFFF`)

### Typography
- **Headings**: Special Elite (typewriter-style font)
- **Body Text**: Roboto Mono (clean, readable monospace)

### Visual Effects
- Grunge texture overlays
- Glitch animation on hero title
- Hover effects with neon glow
- Subtle backdrop blur effects

## Installation

### As a Gem Theme

1. Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "artizan-theme"
```

2. Add this line to your Jekyll site's `_config.yml`:

```yaml
theme: artizan-theme
```

3. Execute:

```bash
bundle install
```

4. Run Jekyll:

```bash
bundle exec jekyll serve
```

### Fork and Customize

1. Fork this repository
2. Clone your fork:

```bash
git clone https://github.com/yourusername/artizan-jekyll-theme.git
cd artizan-jekyll-theme
```

3. Install dependencies:

```bash
bundle install
```

4. Customize the theme to your needs
5. Build and serve:

```bash
bundle exec jekyll serve
```

## Configuration

### Basic Setup

Update your `_config.yml` file with your site information:

```yaml
title: Your Site Title
email: your-email@example.com
description: Your site description
baseurl: ""
url: "https://yoursite.com"

author:
  name: Your Name
  email: your-email@example.com

social:
  github: yourusername
  linkedin: yourcompany
  twitter: yourusername
```

### Navigation

Customize the navigation menu in `_config.yml`:

```yaml
navigation:
  - title: Home
    url: /
  - title: Emerging Practices
    url: /practices/
  - title: Labs
    url: /labs/
  - title: Case Studies
    url: /case-studies/
  - title: About
    url: /#about
  - title: Contact
    url: /#contact
```

## Content Structure

### Collections

The theme includes three main content collections:

#### Emerging Practices (`_practices/`)

For documenting emerging methodologies and practices:

```yaml
---
title: "Your Practice Title"
subtitle: "Brief subtitle"
date: 2024-01-01
category: "Category Name"
status: "active" # active, experimental, prototype
tools:
  - "Tool 1"
  - "Tool 2"
related_practices:
  - "practice-slug"
---

Your content here...
```

#### Labs (`_labs/`)

For experimental projects and research:

```yaml
---
title: "Lab Project Title"
description: "Brief description"
date: 2024-01-01
status: "active" # active, prototype, completed
team:
  - "Team Member 1"
  - "Team Member 2"
technologies:
  - "Technology 1"
  - "Technology 2"
github_url: "https://github.com/user/repo"
demo_url: "https://demo.example.com"
related_labs:
  - "lab-slug"
---

Your content here...
```

#### Case Studies (`_case_studies/`)

For client work and project showcases:

```yaml
---
title: "Case Study Title"
client: "Client Name"
summary: "Brief project summary"
date: 2024-01-01
duration: "6 months"
industry: "Industry Name"
hero_image: "/assets/images/case-studies/hero.jpg"
technologies:
  - "Technology 1"
  - "Technology 2"
team:
  - "Team Member 1"
  - "Team Member 2"
results:
  - "Result 1"
  - "Result 2"
related_case_studies:
  - "case-study-slug"
---

Your content here...
```

## Customization

### Colors

To customize the color scheme, edit the CSS variables in `_sass/artizan.scss`:

```scss
:root {
  --color-primary: #1A1A1A;
  --color-secondary: #2B2B2B;
  --color-accent: #39FF14;
  --color-text: #E0E0E0;
  --color-heading: #FFFFFF;
}
```

### Fonts

To change fonts, update the Google Fonts import and variables in `_sass/artizan.scss`:

```scss
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-heading: 'Your Heading Font', monospace;
  --font-body: 'Your Body Font', monospace;
}
```

### Background Textures

Replace the grunge texture images in `assets/images/` with your own textures, or remove the background-image properties from the CSS to use solid colors.

## File Structure

```
artizan-jekyll-theme/
├── _includes/
│   ├── head.html
│   ├── header.html
│   └── footer.html
├── _layouts/
│   ├── default.html
│   ├── page.html
│   ├── post.html
│   ├── practice.html
│   ├── lab.html
│   └── case_study.html
├── _sass/
│   ├── artizan.scss
│   └── content.scss
├── assets/
│   ├── css/
│   │   └── main.scss
│   └── images/
│       ├── grunge-texture-1.jpg
│       └── grunge-texture-2.jpg
├── _practices/
├── _labs/
├── _case_studies/
├── _config.yml
├── index.html
├── practices.html
├── labs.html
├── case-studies.html
├── Gemfile
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This theme is available as open source under the terms of the [MIT License](LICENSE).

## Credits

- Grunge textures: Various sources (ensure you have proper licensing for production use)
- Fonts: Google Fonts (Special Elite, Roboto Mono)
- Built with Jekyll and Sass

## Support

For support, please open an issue on the GitHub repository or contact the theme maintainers.

---

**ARTIZAN Theme** - Where creativity meets technology in the digital punk aesthetic.

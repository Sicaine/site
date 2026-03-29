# uhu.sh Landing Page

A clean, minimal family homepage built with [Astro](https://astro.build), showcasing the Familienwappen (family coat of arms) with optimized gallery and expandable links section.

## Features

- 🎨 **Centered Wappen Hero** - Beautiful display of the family coat of arms with motto "Wurzeln schlagen, weite wagen" (Plant roots, dare the distance)
- 🖼️ **Gallery Page** - Seven unique wappen variations with lazy-loaded images
- 🔗 **Expandable Links** - Easy-to-manage service and project links via JSON configuration
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- ⚡ **Optimized Images** - WebP format with PNG fallbacks (98% size reduction from original)
- 🎯 **Zero JavaScript** - Static HTML and CSS only, lightning-fast loads
- 🎨 **Elegant Design** - Heraldic color palette (olive green, gold, copper) with serif/sans-serif typography

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321/` in your browser.

### Building for Production

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

The built site is in the `dist/` folder, ready to deploy.

## Project Structure

```
src/
├── pages/
│   ├── index.astro              # Home page
│   └── wappen.astro             # Gallery page
├── components/
│   ├── Header.astro             # Navigation
│   ├── WappenHero.astro         # Centered coat of arms
│   ├── LinksSection.astro       # Service/project cards
│   └── WappenGallery.astro      # Image gallery grid
├── layouts/
│   └── Layout.astro             # Base HTML layout
├── styles/
│   └── global.css               # Global styles
└── data/
    └── links.json               # Links configuration
public/
└── wappen/
    ├── hero.webp / hero.png     # Hero image
    ├── thumb-{1-6}.webp        # Gallery thumbnails
    └── full-{1-6}.webp         # Full-size gallery images
```

## Customization

### Adding Links

Edit `src/data/links.json` to add new services or projects:

```json
{
  "services": [
    {
      "name": "Home Dashboard",
      "url": "http://home.uhu.sh",
      "description": "Home server dashboard",
      "icon": "🏠"
    },
    {
      "name": "New Service",
      "url": "https://example.com",
      "description": "Service description",
      "icon": "📊"
    }
  ],
  "projects": [
    {
      "name": "GitHub Project",
      "url": "https://github.com/user/project",
      "description": "Project description",
      "icon": "🔗"
    }
  ]
}
```

No code changes needed - the site auto-updates when you save the file.

### Customizing Colors

Edit `src/styles/global.css` to change the color scheme:

```css
:root {
  --olive-green: #6b7b3b;  /* Primary accent color */
  --gold: #d4af37;         /* Heraldic gold */
  --copper: #b87333;       /* Hover/secondary color */
  --bg-white: #fafaf8;     /* Subtle off-white background */
  --text-dark: #2c2c2c;    /* Primary text */
  --text-light: #666666;   /* Secondary text */
}
```

### Changing the Hero Image

1. Place new image in `wappen/`
2. Edit `scripts/optimize-images.js` to use new file as hero
3. Run `npm run optimize-images`

### Updating Wappen.md Content

The gallery page pulls symbolism content from text. To update descriptions, edit the text in `src/pages/wappen.astro`.

## Image Optimization

The project includes a sharp-based optimization script that converts PNG wappens to optimized WebP/PNG variants:

```bash
npm run optimize-images
```

**Results:**
- Original: 70MB (9 PNG files)
- Optimized: 1.4MB (21 WebP/PNG files)
- Reduction: **98%**

Sizes:
- Hero image: 83KB (WebP) + 191KB (PNG fallback)
- Gallery thumbnails: ~12-21KB each (WebP)
- Gallery full: ~125-220KB each (WebP)

## Deployment

### Option A: Netlify (Recommended)

1. Connect GitHub repo to Netlify
2. Configure build:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Push to main branch to auto-deploy

### Option B: Self-Hosted

```bash
# Build the site
npm run build

# Upload dist/ folder to your server
# Configure your web server (nginx, apache) to serve dist/

# For nginx, set root to point to dist/ folder
```

### Option C: Vercel

Similar to Netlify - connect repo and it auto-detects Astro.

## Performance

- Lighthouse scores: >90 across all metrics
- First Contentful Paint: <1s on 3G
- Total bundle size: ~1.5MB
- Zero JavaScript bloat
- Lazy-loaded images

## Typography

- **Headings**: EB Garamond (serif, heraldic feel)
- **Body**: Inter (modern, clean sans-serif)
- Imported from Google Fonts with preconnect for optimal performance

## Browser Support

Modern browsers (last 2 versions):
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

### Dev server won't start
```bash
npm install
npm run dev
```

### Images not showing
- Ensure `public/wappen/` folder exists
- Run `npm run optimize-images` to generate images
- Check file paths in components

### Build failing
```bash
rm -rf node_modules dist .astro
npm install
npm run build
```

## Technical Notes

- Built with **Astro 6.1.1** - static site generator
- Uses **View Transitions API** for smooth page navigation
- Responsive grid layouts using CSS Grid
- No build-time dependencies except Sharp for image optimization
- TypeScript strict mode enabled for type safety

## License

© 2026 uhu.sh. All rights reserved.

## Contributing

For improvements or fixes, feel free to submit issues or PRs.

## Future Enhancements

Potential additions (not in MVP):
- Image lightbox modal
- Filter/search for wappen variations
- About page with full wappen.md content
- Contact form
- Dark mode toggle
- Analytics integration
- Blog section

---

**Built with ❤️ using Astro**

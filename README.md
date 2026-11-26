# TERANOX — Commercial HTML Template

A responsive, static architecture/construction company website built with plain HTML, CSS and JavaScript. No build tools, framework, database or server-side code are required.

## Quick start
1. Extract the ZIP archive.
2. Open `config.js` in a text editor and replace the demo business details, contact email, copy, statistics, services and project entries.
3. Replace the image files in `images/` with images you own or are licensed to use. Keep filenames the same, or update the paths in `config.js`.
4. Open `index.html` in a browser, or upload the complete folder to any static web host.

## Main files
- `index.html` — homepage structure
- `projects.html` — full project portfolio
- `style.css` — layout, colors, responsive styling
- `config.js` — central editable content and theme settings
- `script.js` — navigation, filters, image preview and config rendering
- `images/` — bundled local image assets

## Editing content
All main content settings are in `config.js`. Edit `brand`, `contact`, `theme`, `hero`, `stats`, `services` and `projects`. The two project pages use the same project list; keep the six project entries in their current order unless you also change the `data-project-index` values in the HTML. The statistics and sample company claims are demonstration content: change them to accurate figures before publishing.

## Contact details
Change `contact.email` in `config.js`. The template updates its email links automatically. Replace the sample email before launch. `contact.phone` is ready for use in any element with `data-contact-phone`.

## Images and third-party assets
The two externally hosted project photos from the original version have been removed. Project image paths now point to bundled local images or a gradient placeholder. The three bundled photographs were identified by the template owner as their own. Confirm that you have the necessary rights for every image, font and other asset you publish. The Inter font is loaded from Google Fonts; the site falls back to Arial if the external font is unavailable.

## Deployment checklist
- [ ] Replace all sample copy, statistics, project names and contact details.
- [ ] Use only images, logos and fonts you own or are licensed to use.
- [ ] Test both pages on mobile and desktop browsers.
- [ ] Add your own favicon and social sharing image if needed.
- [ ] Configure your domain and HTTPS with your hosting provider.
- [ ] Test email links and all navigation links after deployment.

## Browser support
Designed for current evergreen browsers (Chrome, Edge, Firefox and Safari).

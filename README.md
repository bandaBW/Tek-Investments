# TEK Investments Website

Static website for TEK Investments, built from the company profile and branded with the client's purple and coral identity.

## Files

- `index.html` - main site markup
- `styles.css` - site styling and responsive layout
- `script.js` - mobile navigation and footer year
- `assets/tek-logo.png` - TEK logo used across the site
- `benchmark-notes.md` - notes from similar consultancy website benchmarks

## GitHub Pages Hosting

This site is ready to publish on GitHub Pages as a static site.

Recommended setup:

1. Push the repository to GitHub.
2. In the GitHub repository, open `Settings` > `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main` and folder `/(root)`.
5. Save the settings.

The `.nojekyll` file is included so GitHub Pages serves the site as plain static files without Jekyll processing.

## Local Preview

From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

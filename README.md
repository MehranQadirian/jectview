
# Projects View - Static Template

This is a modular static site intended for GitHub Pages. It includes:

- `index.html` — main page with projects grid, filters, language & theme toggles.
- `project.html` — project detail page (use `project.html?id=PROJECT_ID`).
- `user.html` — user profile (use `user.html?user=USERNAME`).
- `data/projects.json` & `data/users.json` — editable JSON files to add projects and users manually.
- `assets/js/` — modular ES modules.
- `assets/css/style.css` — main stylesheet.
- `assets/js/bgCanvas.js` — animated background (moving particle graph).
- Watermark with links to Mehran and Nima GitHub profiles.

## How to use

1. Edit `data/projects.json` and `data/users.json` — add items, set `id` fields for projects (unique).
2. Deploy to GitHub Pages by pushing the repository to GitHub and enabling Pages from the `main` branch (root).
3. Project pages are available at `project.html?id=PROJECT_ID`.

## Testing locally

Run a local static server (recommended):
- Python 3: `python -m http.server 8000`
- or `npx http-server .`

Open `http://127.0.0.1:8000/index.html`.


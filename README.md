# 👑 Happy Princess Day

A small interactive surprise page for Princess Day. It opens with a soft intro screen, then reveals a love letter, a swipeable row of memories, a few reasons she's special, and a confetti hug button. A gentle music-box tune plays in the background (with a mute button).

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Make it yours

Open `script.js` and edit the `CONFIG` block at the top:

| Field | What it changes |
| --- | --- |
| `herName` / `yourName` | Names used in the title, letter and footer |
| `eventName` / `eventDate` | The celebration name and date shown on the page |
| `introText` | The message on the first screen |
| `letter` | Paragraphs of the love letter |
| `memories` | Cards in the swipe row (`emoji`, `title`, `text`) |
| `reasons` | The list of reasons |
| `finalTitle` / `finalText` | The closing card |
| `musicFile` | Path to your own song, e.g. `music/our-song.mp3`. Leave empty for the built-in tune |

Colors live at the top of `style.css` under `:root`.

## Run it locally

Just open `index.html` in a browser, or start a tiny server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Put it on GitHub

```bash
git init
git add .
git commit -m "Happy Princess Day page"
git branch -M main
git remote add origin https://github.com/<your-username>/happy-princess-day.git
git push -u origin main
```

## Host it for free

**GitHub Pages:** repo → Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)` → Save. Your link will be `https://<your-username>.github.io/happy-princess-day/`.

**Netlify:** New site → Import from Git → pick this repo. No build command needed; `netlify.toml` already sets the publish folder.

## Project structure

```
index.html     page structure
style.css      colors, layout, animations
script.js      content (CONFIG), music and interactions
netlify.toml   Netlify settings
```

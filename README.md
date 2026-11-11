# 11:11 — A Little Universe

A static romantic microsite made with HTML, CSS and vanilla JavaScript. It is designed for GitHub Pages.

## Preview locally
Open `index.html` in a browser. For the best experience, use a local static server or GitHub Pages.

## Personalize before publishing
Edit **config.js**:
- `recipientName`: the recipient's displayed name.
- `senderName` / `signature`: your name.
- `subtitle`, `introLine`, `letterTitle`, `letter`, `memories`, `finalMessage`: all copy.
- `music`, `photos`, `video`: paths to your media files.

Put your files in `assets/`. Example:
- `assets/song.mp3`
- `assets/photo-1.jpg`
- `assets/photo-2.jpg`
- `assets/photo-3.jpg`
- `assets/memory.mp4`

If you do not have a video or song yet, set `video: ""` or `music: ""` in `config.js`.
Remove unused photo paths from the `photos` array. Keep media files reasonably compressed so the page loads quickly on mobile.

## Publish on GitHub Pages
1. Create a new public GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, `config.js`, and the `assets` folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish and share the generated URL.

## Notes
- No account, database, backend, or paid service is required.
- The recipient sees only the experience; there are no editing controls on the public page.
- Music is not autoplayed. The visitor must press play because browsers restrict autoplay with sound.
- Any media included in the public repository can be accessed by anyone who has the URL (and potentially by others if the repository is public). Do not include private or sensitive content without permission.
- The date in the intro and copyright year update automatically.

# Valentine “Open When” Website 🌹

This is a static website (HTML/CSS/JS). No build tools needed.

## Pages

- `index.html` — roses + “I made something for you. Do you want to see?” (Yes/No)
- `no.html` — “HOW DARE YOU 😤” + Go Back button
- `gift.html` — the main gift page (Open-When envelopes + extras)

## Customize

### 1) Edit text & settings

Open `content.js` and update:

- `girlfriendName`, `yourName`
- `relationshipStartDate`, `nextMeetDate`
- `whatsappNumber`
- `passcode` (set `""` to disable)
- `valentineUnlockDate`
- Envelope messages in `envelopes[]`
- Timeline, gallery, playlist, coupons, reasons, quiz

### 2) Replace photos

Overwrite these files with your own images:

- `assets/photos/me.jpg`
- `assets/photos/roses-bg.jpg`
- `assets/photos/env-<id>.jpg` (example: `assets/photos/env-miss-me.jpg`)

> You can keep the file names the same and just replace the files.

### 3) Replace voice notes

Overwrite these files with your own voice notes (WAV/MP3/M4A):

- `assets/audio/voice-<id>.wav` (example: `assets/audio/voice-miss-me.wav`)

If you use `.mp3` or `.m4a`, update the extension in `content.js` for that envelope.

## GitHub Pages deploy

1) Create a GitHub repo and push these files.
2) In the repo: **Settings → Pages**
3) Under **Build and deployment → Source** choose **Deploy from a branch**
4) Select **Branch: main** and **Folder: /(root)**, then **Save**.
5) Visit the site using the URL shown in **Settings → Pages**.

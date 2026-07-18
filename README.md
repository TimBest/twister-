# Twister Caller

A simple web app that calls out Twister moves for you — a random color and body part every 15 seconds — so everyone can play without a caller.

## Features

- Random color (Red, Blue, Yellow, Green) + limb (left/right hand/foot) call
- Configurable interval (5–30 seconds, defaults to 15)
- Spoken announcements via the browser's speech synthesis
- Countdown ring showing time until the next call
- Start / Pause / Next Call / Reset controls
- Call history log
- Option to avoid repeating the previous call

## Running locally

No build step required — it's plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

You can also just open `index.html` directly in a browser.

## Files

- `index.html` — page structure
- `style.css` — styling
- `script.js` — game logic (call generation, timer, speech synthesis)

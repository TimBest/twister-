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

## Deploying to Netlify

This is a static site, so no build step is needed — `netlify.toml` sets the publish directory to the repo root.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TimBest/twister-)

Or connect it manually:

1. Log in to [Netlify](https://app.netlify.com) and click **Add new site → Import an existing project**.
2. Choose GitHub and select the `twister-` repository.
3. Pick the branch to deploy (`main` recommended).
4. Leave the build command empty and set the publish directory to `.` (this is already configured in `netlify.toml`, so Netlify should pick it up automatically).
5. Click **Deploy site**.

Every push to the connected branch will trigger a new deploy.

## Files

- `index.html` — page structure
- `style.css` — styling
- `script.js` — game logic (call generation, timer, speech synthesis)

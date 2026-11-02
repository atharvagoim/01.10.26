# Pages of Us — 10 months 💌

A scrolling scrapbook website for our 10th month anniversary (01/11/2026). React 18 + Vite, plain JavaScript.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the build locally
```

## Add the song
Put the mp3 in `public/` named **`song.mp3`**. It starts when the envelope is opened.
Without it, tapping "our song" lets the viewer pick the file from their phone.

## Change the words, names or dates
Everything personal is in `src/config.js`: your name, the start date (drives the live counter),
the calendar month, the "I love…" list, the letter and the song note.
Photos live in `public/img/` (`*-sq.jpg` are the square face crops used in hearts and strips).

## Structure
```
src/
  App.jsx                 page shell: intro, progress bar, spreads, music button
  config.js               all personal content
  styles.css              every style (flat colours, no gradients)
  components/
    Spreads.jsx           the 16 pages in 8 spreads
    Bits.jsx              Page (scroll reveal), HeartPhoto, Locket, Calendar, Counter
    Intro.jsx             envelope opening screen
    HeartBurst.jsx        canvas heart burst (envelope + "read it again")
    useSong.js            audio hook with file-picker fallback
    MusicButton.jsx, ProgressBar.jsx, Toast.jsx
```

## Deploy
Vercel / Netlify: build command `npm run build`, output folder `dist`.
`vite.config.js` uses `base: './'`, so the build also works from any sub-folder (GitHub Pages etc).

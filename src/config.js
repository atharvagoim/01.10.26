// Everything personal lives here — edit this file to change names, dates, words or the song.
const base = import.meta.env.BASE_URL;
export const img = (name) => `${base}img/${name}`;

export const config = {
  from: 'Atharva',
  // 00:00 IST on the day it all began — drives the live counter
  startedAt: '2026-01-01T00:00:00+05:30',
  beganLabel: '01 · 01 · 26',
  anniversaryLabel: '01/11/26',
  monthNumber: 10,
  // calendar page: year and month (0 = January) of this anniversary
  calendar: { year: 2026, month: 10, name: 'November', day: 1 },

  // the word that opens the site (not case sensitive) — set VITE_PASSWORD in .env
  password: import.meta.env.VITE_PASSWORD || '',
  song: {
    title: 'Pyaar Encore',
    artist: 'Nanku',
    // drop the mp3 into /public as song.mp3
    src: `${base}song.mp3`,
    // first play starts here (seconds)
    start: 11,
  },

  loveList: [
    'your smile', 'your laugh', 'your eyes', 'your voice', 'your hugs',
    'your craziness', 'your kindness', 'how you say my name', 'how you look at me', 'you',
  ],

  letter:
    'Ten months ago a very simple "us" started, and somehow every month since has been better than the one before. Thank you for the laughs, the late nights, the long rides and every small moment in between. Here\'s to everything we\'ve already made, and to everything that\'s still coming.',

  songNote:
    "Every time this one plays I'm back in the little moments: the rides, the late-night walks, the way you sing along. Ten months in, it already sounds like us. Here's to more songs and more months to add to our story ♡",
};

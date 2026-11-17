"use strict";

/* =========================================================
   EDIT THIS PART: everything on the page comes from CONFIG.
   ========================================================= */
const CONFIG = {
  herName: "Bhavika",
  yourName: "Lakshay",
  eventName: "Princess Day",
  eventDate: "November 18",

  introText:
    "I wanted to do something special for you, so I made something just for you... Click below to see what it is! ✨",

  letter: [
    "Baby i have made this just for you i know im not a techie i have tried making this for first time for you only hope you like it.",
    " You are my favourite person and my safe space thank you for being there for me i like you bahaut saaraaaa♥️♥️♥️♥️♥️.",
    "Today is yours. You deserve a crown, a castle and all the happiness in the world, but all I could build was this little page. I hope it makes you smile.",
  ],

  memories: [
    { emoji: "🌅", title: "The First Hello", text: "The moment everything quietly changed for me." },
    { emoji: "🍦", title: "Our Silly Dates", text: "Ice cream, laughter and zero plans. Perfect." },
    { emoji: "🎶", title: "Our Song", text: "Whenever it plays, I'm thinking of you." },
    { emoji: "🌙", title: "Late Night Talks", text: "Hours felt like minutes with you." },
  ],

  reasons: [
    "You're kind to everyone, even when no one is watching.",
    "You turn small moments into memories.",
    "Your strength inspires me every single day.",
    "You make me want to be a better person.",
  ],

  finalTitle: "Happy Princess Day! 👑",
  finalText:
    "Thank you for being you. You are loved, you are special, and you are my favorite person in the whole kingdom.",

  // Optional: path to your own song (e.g. "music/our-song.mp3").
  // Leave empty to use the built-in soft music-box tune.
  musicFile: "",
};

/* =========================================================
   Code below: you shouldn't need to change it.
   ========================================================= */
const $ = (sel) => document.querySelector(sel);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ---------- fill the page from CONFIG ---------- */
function render() {
  document.title = `Happy ${CONFIG.eventName} 👑`;

  $("#introTitle").textContent = `Hey ${CONFIG.herName}! 💕`;
  $("#introText").textContent = CONFIG.introText;

  $("#eventLabel").textContent = `${CONFIG.eventName} · ${CONFIG.eventDate}`;
  $("#expTitle").textContent = `Happy ${CONFIG.eventName}, ${CONFIG.herName}!`;

  const body = $("#letterText");
  body.append(el("p", "greet", `Dear ${CONFIG.herName},`));
  CONFIG.letter.forEach((line) => body.append(el("p", "", line)));
  body.append(el("p", "sign", `Forever yours, ${CONFIG.yourName} 💖`));

  const memories = $("#memories");
  CONFIG.memories.forEach((m) => {
    const card = el("article", "memory");
    card.append(el("span", "emoji", m.emoji), el("h4", "", m.title), el("p", "", m.text));
    memories.append(card);
  });

  const reasons = $("#reasons");
  CONFIG.reasons.forEach((r, i) => {
    const li = el("li", "", r);
    li.style.transitionDelay = `${i * 120}ms`;
    reasons.append(li);
  });

  $("#finalTitle").textContent = CONFIG.finalTitle;
  $("#finalText").textContent = CONFIG.finalText;
  $("#footerText").textContent = `Made with 💕 by ${CONFIG.yourName}`;
}

/* ---------- floating background emojis ---------- */
function spawnFloaters() {
  const layer = $("#floaters");
  const icons = ["💕", "💖", "✨", "🌸", "👑", "💗"];
  for (let i = 0; i < 16; i++) {
    const s = el("span", "", icons[i % icons.length]);
    s.style.left = `${Math.random() * 100}%`;
    s.style.fontSize = `${14 + Math.random() * 20}px`;
    s.style.animationDuration = `${9 + Math.random() * 9}s`;
    s.style.animationDelay = `${-Math.random() * 12}s`;
    layer.append(s);
  }
}

/* ---------- confetti ---------- */
function burst(count) {
  const icons = ["💖", "✨", "🌸", "👑", "💕", "⭐"];
  for (let i = 0; i < count; i++) {
    const c = el("span", "confetti", icons[Math.floor(Math.random() * icons.length)]);
    c.style.left = `${Math.random() * 100}%`;
    c.style.fontSize = `${16 + Math.random() * 18}px`;
    c.style.animationDuration = `${2.2 + Math.random() * 2}s`;
    c.style.animationDelay = `${Math.random() * 0.6}s`;
    c.addEventListener("animationend", () => c.remove());
    document.body.append(c);
  }
}

/* ---------- music ---------- */
const NOTES = [
  523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33,
  523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 587.33,
];
let audioCtx = null;
let fileAudio = null;
let musicTimer = null;
let step = 0;
let playing = false;

function playNote(freq, when) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(0.1, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 1.2);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(when);
  osc.stop(when + 1.25);
}

function startMusic() {
  playing = true;
  if (CONFIG.musicFile) {
    if (!fileAudio) {
      fileAudio = new Audio(CONFIG.musicFile);
      fileAudio.loop = true;
    }
    fileAudio.play().catch(() => {});
  } else {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    audioCtx.resume();
    const tick = () => {
      if (!playing) return;
      playNote(NOTES[step % NOTES.length], audioCtx.currentTime + 0.05);
      step++;
      musicTimer = setTimeout(tick, 450);
    };
    tick();
  }
  syncMusicButton();
}

function stopMusic() {
  playing = false;
  clearTimeout(musicTimer);
  if (fileAudio) fileAudio.pause();
  syncMusicButton();
}

function syncMusicButton() {
  const btn = $("#musicBtn");
  btn.textContent = playing ? "🎵" : "🔇";
  btn.setAttribute("aria-pressed", String(playing));
}

/* ---------- interactions ---------- */
function bindEvents() {
  $("#openBtn").addEventListener("click", () => {
    $("#intro").classList.add("leaving");
    burst(24);
    startMusic();
    setTimeout(() => {
      $("#intro").hidden = true;
      $("#experience").hidden = false;
      window.scrollTo({ top: 0, behavior: "instant" });
      observeReveals();
    }, 600);
  });

  $("#musicBtn").addEventListener("click", () => (playing ? stopMusic() : startMusic()));

  $("#sealBtn").addEventListener("click", () => {
    $("#letter").classList.add("open");
    [...$("#letterText").children].forEach((p, i) => {
      setTimeout(() => p.classList.add("show"), 500 + i * 900);
    });
  });

  $("#hugBtn").addEventListener("click", () => burst(40));
}

function observeReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        entry.target.querySelectorAll(".reasons li").forEach((li) => li.classList.add("in"));
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
}

render();
spawnFloaters();
bindEvents();

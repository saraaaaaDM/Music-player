// ======================
// 🎵 MUSIC PLAYER DATA
// ======================

const songs = [
  {
    name: "Song Title 1",
    artist: "Artist 1",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpg",
  },
  {
    name: "Song Title 2",
    artist: "Artist 2",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpg",
  }
];

// ======================
// 🎛️ SELECT ELEMENTS
// ======================

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// ======================
// 🎵 STATE
// ======================

let songIndex = 0;
let isPlaying = false;

// ======================
// 🎶 LOAD SONG
// ======================

function loadSong(index) {
  const song = songs[index];

  title.textContent = song.name;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

// ======================
// ▶️ PLAY SONG
// ======================

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

// ======================
// ⏸ PAUSE SONG
// ======================

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

// ======================
// 🔁 TOGGLE PLAY
// ======================

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// ======================
// ⏭ NEXT SONG
// ======================

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

// ======================
// ⏮ PREVIOUS SONG
// ======================

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// ======================
// 📊 UPDATE PROGRESS BAR
// ======================

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;

  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent || 0;

  // time update
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

// ======================
// 📍 SEEK SONG
// ======================

progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// ======================
// 🔊 VOLUME CONTROL
// ======================

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// ======================
// ⏱ FORMAT TIME
// ======================

function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// ======================
// 🔁 AUTO NEXT SONG
// ======================

audio.addEventListener("ended", nextSong);

// ======================
// 🚀 INIT
// ======================

loadSong(songIndex);

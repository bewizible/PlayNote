// Vars for DOM elements
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

// Variables for track control and state
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// All my music
const music_list = [
  // List of track objects with 'name' and 'music' properties
  // ...
  { name: "L's theme A", music: "./music/L's theme A.m4a" },
  { name: "L's Theme ULTRA EPIC", music: "./music/L's Theme ULTRA EPIC.mp3" },
  { name: "Light's Theme RUDE", music: "./music/Light's Theme RUDE.m4a" },
  { name: "Light's Theme", music: "./music/Light's Theme.m4a" },
  { name: "Near's Theme A", music: "./music/Near's Theme A.m4a" },
  { name: "Near's Theme B", music: "./music/Near's Theme B.m4a" },
  { name: "Harleys In Hawaii", music: "./music/Harleys In Hawaii.m4a" },
  { name: "High Beams", music: "./music/High Beams.mp3" },
  {
    name: "LIVING LIFE IN THE NIGHT",
    music: "./music/LIVING LIFE IN THE NIGHT.m4a",
  },
  { name: "My Ordinary Life", music: "./music/My Ordinary Life.m4a" },
  { name: "Shinunoga E-Wa", music: "./music/Shinunoga E-Wa.m4a" },
  { name: "Starboy", music: "./music/Starboy.mp3" },
  { name: "Under The Influence", music: "./music/Under The Influence.m4a" },
];
loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

// Kbd Shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    event.preventDefault();
    playpauseTrack();
  } else if (event.key === "j") {
    event.preventDefault();
    prevTrack();
  } else if (event.key === "k") {
    event.preventDefault();
    nextTrack();
  } else if (event.key === "s") {
    event.preventDefault();
    randomTrack();
  } else if (event.key === "l") {
    event.preventDefault();
    repeatTrack();
  } else if (event.key === "?") {
    event.preventDefault();
    toggleHelp();
  } else if (event.key === "c") {
    event.preventDefault();
    toggleColumn();
  }
});

function toggleColumn() {
  var sidebar = document.getElementById("mySidebar");
  var columnContent = document.getElementById("columnContent");
  let width = "250px";

  if (sidebar.style.width === width) {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = width;
    generateColumnContent(columnContent); // Generate content when sidebar is opened
  }
}

// Close the column if user clicks outside of it
document.addEventListener("click", function (event) {
  const columnContainer = document.querySelector(".column-container");
  const columnBtn = document.querySelector(".column-btn");

  // Check if the click is outside the popup and its button
  if (
    !columnContainer.contains(event.target) &&
    !columnBtn.contains(event.target)
  ) {
    // Close the popup by removing the 'active' class
    columnContainer.classList.remove("active");

    // Also close the sidebar
    var sidebar = document.getElementById("mySidebar");
    sidebar.style.width = "0";
  }
});

function generateColumnContent(columnContent) {
  var content = "";
  music_list.forEach((track, index) => {
    content += `<a href="#" onclick="clickPlay(${index})">${track.name}</a>`;
  });
  columnContent.innerHTML = content;
}

// Helper function to use in the column
function clickPlay(index) {
  track_index = index;
  loadTrack(index);
  playTrack();
}

// Reset Track
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Set random track
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

// Repeat the track
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

// Variables for rotation animation
let rotationInterval;
let rotationDegree = 0;
const rotationFPS = 16;

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  clearInterval(rotationInterval);
  rotationInterval = setInterval(rotateTrackArt, rotationFPS);
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  clearInterval(rotationInterval); // Stop the rotation animation
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// Function responsible for rotating the picture
function rotateTrackArt() {
  rotationDegree += 1; // Increase the rotation degree by 1 degree each time the function is called
  track_art.style.transform = `rotate(${rotationDegree}deg)`;
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

// Current seconds into the track
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Function to toggle the help popup
function toggleHelp() {
  const popupContainer = document.querySelector(".popup-container");

  // Toggle the visibility of the popup by adding or removing the 'active' class
  popupContainer.classList.toggle("active");
}

// Function to close the help popup when clicking outside the popup
document.addEventListener("click", function (event) {
  const popupContainer = document.querySelector(".popup-container");
  const popupBtn = document.querySelector(".popup-btn");

  // Check if the click is outside the popup and its button
  if (
    !popupContainer.contains(event.target) &&
    !popupBtn.contains(event.target)
  ) {
    // Close the popup by removing the 'active' class
    popupContainer.classList.remove("active");
  }
});

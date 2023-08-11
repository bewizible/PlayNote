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
  { music: "./music/after dark.mp3", name: "after dark" },
  { music: "./music/after hours.mp3", name: "after hours" },
  { music: "./music/ainsi bas la vida.mp3", name: "ainsi bas la vida" },
  { music: "./music/bad blood.mp3", name: "bad blood" },
  { music: "./music/bad girls.mp3", name: "bad girls" },
  { music: "./music/big boy.mp3", name: "big boy" },
  {
    music:
      "./music/bloody mary (dum dum, da-di-da) - lady gaga [edit audio].mp3",
    name: "bloody mary (dum dum, da-di-da)",
  },
  {
    music: "./music/brazilian phonk mano - slowboy [edit audio].mp3",
    name: "brazilian phonk mano",
  },
  {
    music:
      "music/cant hold us (southend revolution remix) - macklemore ryan lewis ft. ray dalton [edit audio].mp3",
    name: "cant hold us",
  },
  {
    music: "./music/carol of the bells.mp3",
    name: "carol of the bells",
  },
  {
    music: "./music/cataclysm (Im stronger Im smarter.. Im better!).mp3",
    name: "cataclysm (Im stronger Im smarter.. Im better!)",
  },
  {
    music: "music/collide - justine skye ft. tyga [edit audio].mp3",
    name: "collide",
  },
  { music: "./music/danza kuduro.mp3", name: "danza kuduro" },
  {
    music: "music/demons in my soul - scxr soul x sx1nxwy [edit audio].mp3",
    name: "demons in my soul",
  },
  {
    music:
      "music/dernière danse x the real slim shady - indila eminem [edit audio].mp3",
    name: "dernière danse x the real slim shady",
  },
  {
    music: "music/devil eyes - zodvik [edit audio].mp3",
    name: "devil eyes",
  },
  { music: "./music/drunk-dazed.mp3", name: "drunk-dazed" },
  {
    music: "music/enemy - imagine dragons jid [edit audio].mp3",
    name: "enemy",
  },
  {
    music: "music/enemy x genius - imagine dragons lsd [edit audio].mp3",
    name: "enemy x genius",
  },
  {
    music: "music/fairytale - alexander rybak [edit audio].mp3",
    name: "fairytale",
  },
  { music: "./music/flashbacks.mp3", name: "flashbacks" },
  {
    music: "./music/habibi (albanian remix).mp3",
    name: "habibi (albanian remix)",
  },
  {
    music:
      "music/heat waves - glass animals x highcloud cover [edit audio].mp3",
    name: "heat waves",
  },
  {
    music: "music/industry baby x e.t. - lil nas x katy perry [edit audio].mp3",
    name: "industry baby x e.t.",
  },
  {
    music: "music/jalebi baby x gta s.a - tesher [edit audio].mp3",
    name: "jalebi baby x gta s.a",
  },
  {
    music:
      "music/kiss me more x bananza (belly dancer) - doja cat ft. sza akon [edit audio].mp3",
    name: "kiss me more x bananza",
  },
  { music: "./music/la la la.mp3", name: "la la la" },
  {
    music: "./music/la la la (brazil 2014).mp3",
    name: "la la la (brazil 2014)",
  },
  {
    music: "./music/la la la (k theory remix).mp3",
    name: "la la la (k theory remix)",
  },
  {
    music: "music/LIFE IN RIO (BRAZILIAN PHONK) - SLOWBOY [EDIT AUDIO].mp3",
    name: "LIFE IN RIO",
  },
  {
    music:
      "music/living life in the night - cheriimoya, sierra kidd [edit audio].mp3",
    name: "living life in the night",
  },
  {
    music: "./music/love nwantiti (tiktok remix).mp3",
    name: "love nwantiti (tiktok remix)",
  },
  {
    music: "./music/masquerade x my ordinary life.mp3",
    name: "masquerade x my ordinary life",
  },
  {
    music: "music/metamorphosis - interworld [edit audio].mp3",
    name: "metamorphosis",
  },
  { music: "./music/money.mp3", name: "money" },
  { music: "./music/monëy so big.mp3", name: "monëy so big" },
  {
    music: "music/money trees - kendrick lamar ft. jay rock [edit audio].mp3",
    name: "money trees",
  },
  {
    music: "./music/montagem orquestra sinfônica.mp3",
    name: "montagem orquestra sinfônica",
  },
  {
    music: "music/montero (call me by your name) - lil nas x [edit audio].mp3",
    name: "montero",
  },
  {
    music: "music/murder in my mind - kordhell [edit audio].mp3",
    name: "murder in my mind",
  },
  {
    music: "music/my ordinary life - the living tombstoneedit audio.mp3",
    name: "my ordinary life",
  },
  {
    music: "music/no lie - sean paul ft. dua lipa [edit audio].mp3",
    name: "no lie",
  },
  {
    music: "music/often (kygo remix) - the weeknd [edit audio].mp3",
    name: "often (kygo remix)",
  },
  {
    music: "music/on my own - darci [edit audio].mp3",
    name: "on my own",
  },
  { music: "./music/on the floor.mp3", name: "on the floor" },
  {
    music: "music/Drake - One Dance (audio edit).mp3",
    name: "One Dance",
  },
  {
    music:
      "music/one kiss x i was never there - dua lipa the weeknd [edit audio].mp3",
    name: "one kiss x i was never there",
  },
  {
    music:
      "music/one kiss x stereo love - edward maya dua lipa [edit audio].mp3",
    name: "one kiss x stereo love",
  },
  { music: "./music/paro (sped up).mp3", name: "paro (sped up)" },
  {
    music:
      "music/rockstar (crankdat remix) - post malone ft. 21 savage [edit audio].mp3",
    name: "rockstar (crankdat remix)",
  },
  {
    music: "./music/royalty x masquerade.mp3",
    name: "royalty x masquerade",
  },
  { music: "music/scopin - kordhell [edit audio].mp3", name: "scopin" },
  { music: "./music/she knows.mp3", name: "she knows" },
  {
    music: "./music/sing for the moment.mp3",
    name: "sing for the moment",
  },
  {
    music: "music/slow motion (sped up) - amaria bb [edit audio].mp3",
    name: "slow motion (sped up)",
  },
  {
    music: "music/stereo love - edward maya vika jigulina [edit audio].mp3",
    name: "stereo love",
  },
  {
    music: "music/such a whre - jvla [edit audio].mp3",
    name: "such a whre",
  },
  {
    music: "./music/temperature x bananza (belly dancer).mp3",
    name: "temperature x bananza (belly dancer)",
  },
  {
    music: "music/the lost soul down x lost soul [edit audio].mp3",
    name: "the lost soul down x lost soul",
  },
  {
    music: "music/the real slim shady - eminem [edit audio].mp3",
    name: "the real slim shady",
  },
  { music: "./music/tous les mêmes.mp3", name: "tous les mêmes" },
  {
    music: "music/under the influence - chris brown [edit audio].mp3",
    name: "under the influence",
  },
  {
    music:
      "music/under the influence x i was never there - chris brown the weeknd [edit audio].mp3",
    name: "under the influence x i was never there",
  },
  {
    music:
      "music/under the influence x renegade - chris brown aaryan shah [edit audio].mp3",
    name: "under the influence x renegade",
  },
  { music: "./music/unforgettable.mp3", name: "unforgettable" },
  { music: "./music/unholy.mp3", name: "unholy" },
  {
    music: "music/vur yüreğim x gangsta s paradise - coolio [edit audio].mp3",
    name: "vur yüreğim x gangsta s paradise",
  },
  {
    music: "music/way down we go (instrumental) - kaleo [edit audio].mp3",
    name: "way down we go (instrumental)",
  },
  {
    music: "music/whoopty - cj [edit audio].mp3",
    name: "whoopty - cj",
  },
  {
    music: "./music/world is spinning x rich boy.mp3",
    name: "world is spinning x rich boy",
  },
  {
    music:
      "music/worth it (instrumental) - fifth harmony ft. kid ink [edit audio].mp3",
    name: "worth it (instrumental)",
  },
  {
    music: "music/ты и я (tiktok remix) - xcho [edit audio].mp3",
    name: "ты и я (tiktok remix)",
  },
  { music: "./music/yo voy.mp3", name: "yo voy" },
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
    // Prevent the default browser behavior for the 'Spacebar' key
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
function clickPlay(index) {
  track_index = index;
  loadTrack(index);
  playTrack();
}

function toggleColumn() {
  var sidebar = document.getElementById("mySidebar");
  var columnContent = document.getElementById("columnContent");

  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "250px";
    generateColumnContent(columnContent); // Generate content when sidebar is opened
  }
}

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
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
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
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

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
